import React from 'react'
import { MDBBox, MDBContainer, MDBRow, MDBCol } from "mdbreact"
import { Fade } from 'react-reveal';
import $ from 'jquery'
import Parallax from './includes/Parallax'
import Bottom from './includes/Bottom'
import Timeline from './includes/Timeline'

class Resume extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            isLoaded: false,
            items: []
        }
    }

    UNSAFE_componentWillMount() {
        this.getResumeData()
    }

    getResumeData() {
        $.ajax({
            url: "./assets/json/content/resume.json",
            dataType: "json",
            cache: false
        })
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result
                })
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                console.log(error.statusText)
                this.setState({
                    isLoaded: true,
                    error: true
                })
            }
        )
        .catch(
            (err) => {
                console.error(err)
            }
        )
    }

    renderData() {
        if( this.state.isLoaded && !this.state.error ) {
            if ( Object.keys(this.state.items).length !== 0 ) {
                return (
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol md="12" className="mb-3">
                                <MDBBox tag="span" display="block" className="content-title font-size-3rem font-family-fantasy text-center">Technologies</MDBBox>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                )
            }
        }
    }

    renderTimeline(items, title){
        if ( this.state.isLoaded && !this.state.error ) {
            return (
                <Fade>
                    <Timeline title={title} data={items[0][title.toLowerCase()]}/>
                </Fade>
            )
        }
    }

    render() {
        document.title = "Resume | Jerald Gutierrez"
        return (
            <MDBBox tag="div" className="resume-wrapper">
                <MDBContainer fluid className="py-5 position-relative">
                    {this.renderData()}
                </MDBContainer>
                <Parallax 
                    container="commmon-parallax"
                    description="Feel free to take a deeper look at what I've done."
                    overlay="black-strong"
                    color="white"
                    colorText="white-text"
                    btnTitle="View My Portfolio"
                    btnIcon="link"
                    btnUri="/portfolio"
                />
                <MDBContainer fluid className="py-5 position-relative white">
                    {this.renderTimeline(this.state.items.timeline, "Experience")}
                </MDBContainer>
                <Parallax 
                    container="commmon-parallax"
                    description="Feel free to download my resume for hard copy of yours."
                    overlay="black-strong"
                    color="white"
                    colorText="white-text"
                    btnTitle="Download My Resume"
                    btnIcon="download"
                    btnUri="/"
                />
                <MDBContainer fluid className="py-5 position-relative very-light-gray-bg">
                    {this.renderTimeline(this.state.items.timeline, "Educational")}
                </MDBContainer>
                <Bottom
                    container=""
                    description="Now that you know what I'm able to do and what experienced and educational background I have, feel free to reach out and start a conversation."
                    overlay="stylish-slight"
                    color="black"
                    colorText="black-text"
                    btnTitle="Contact Me Today"
                    btnIcon="id-card"
                    btnUri="/contact"
                />
            </MDBBox>
        )
    }
}

export default Resume