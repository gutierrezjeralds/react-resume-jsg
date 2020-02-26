import React from 'react'
import { MDBBox, MDBContainer, MDBRow, MDBCol } from "mdbreact"
import ProgressBar from 'react-bootstrap/ProgressBar'
import { Fade } from 'react-reveal';
import $ from 'jquery'
import Parallax from './includes/Parallax'
import Timeline from './includes/Timeline'
import Snackbar from "../views/includes/Snackbar"

class Resume extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isNotif: false,
            notifCat: "default",
            notifStr: "",
            error: false,
            isLoaded: false,
            isSkillLoaded: false,
            skillItems: [],
            isExperienceLoaded: false,
            experienceItems: [],
            isEducationalLoaded: false,
            educationalItems: []
        }
    }

    UNSAFE_componentWillMount() {
        this.getSkills()
    }

    getSkills = () => {
        $.ajax({
            url: "https://gutierrez-jerald-cv-be.herokuapp.com/api/getSkills",
            dataType: "json",
            cache: false
        })
        .then(
            (result) => {
                this.setState({
                    isSkillLoaded: true,
                    skillItems: result
                })

                // Get Experience data ajax
                this.getExperience()
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                    isLoaded: true,
                    isNotif: true,
                    notifCat: "error",
                    notifStr: "Unexpected error, please reload the page!",
                    error: true
                })
                    
                console.error('Oh well, you failed. Here some thoughts on the error that occured:', error)
            }
        )
        .catch(
            (err) => {
                this.setState({
                    isLoaded: true,
                    isNotif: true,
                    notifCat: "error",
                    notifStr: "Unexpected error, please reload the page!",
                    error: true
                })
                    
                console.error('Oh well, you failed. Here some thoughts on the error that occured:', err)
            }
        )
    }

    getExperience() {
        $.ajax({
            url: "https://gutierrez-jerald-cv-be.herokuapp.com/api/get-all-experience",
            dataType: "json",
            cache: false
        })
        .then(
            (result) => {
                this.setState({
                    isExperienceLoaded: true,
                    experienceItems: result
                })

                // Get Educational data ajax
                this.getEducational()
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                    isLoaded: true,
                    isNotif: true,
                    notifCat: "error",
                    notifStr: "Unexpected error, please reload the page!",
                    error: true
                })
                    
                console.error('Oh well, you failed. Here some thoughts on the error that occured:', error)
            }
        )
        .catch(
            (err) => {
                this.setState({
                    isLoaded: true,
                    isNotif: true,
                    notifCat: "error",
                    notifStr: "Unexpected error, please reload the page!",
                    error: true
                })
                    
                console.error('Oh well, you failed. Here some thoughts on the error that occured:', err)
            }
        )
    }

    getEducational() {
        $.ajax({
            url: "https://gutierrez-jerald-cv-be.herokuapp.com/api/getEducational",
            dataType: "json",
            cache: false
        })
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    isEducationalLoaded: true,
                    educationalItems: result
                })
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                    isLoaded: true,
                    isNotif: true,
                    notifCat: "error",
                    notifStr: "Unexpected error, please reload the page!",
                    error: true
                })
                    
                console.error('Oh well, you failed. Here some thoughts on the error that occured:', error)
            }
        )
        .catch(
            (err) => {
                this.setState({
                    isLoaded: true,
                    isNotif: true,
                    notifCat: "error",
                    notifStr: "Unexpected error, please reload the page!",
                    error: true
                })
                    
                console.error('Oh well, you failed. Here some thoughts on the error that occured:', err)
            }
        )
    }
    
    renderSkills(data, counter, title, titleClass) {
        if ( counter === 1 ) {
            return (
                <React.Fragment key={data.id}>
                    <MDBBox tag="span" display="block" className={titleClass + " sub-content-title font-size-2rem font-family-architects-daughter text-center w-100"}>{title}</MDBBox>
                    <MDBCol lg="4" className="mb-3">
                        <MDBRow className="justify-content-between">
                            <MDBCol size="6">
                                <MDBBox tag="span" display="block" className="content-description skill-title font-size-1rem">{data.title}</MDBBox>
                            </MDBCol>
                            <MDBCol size="6" className="text-right">
                                <MDBBox tag="span" display="block" className="content-description skill-title font-size-1rem">{data.start_in}</MDBBox>
                            </MDBCol>
                        </MDBRow>
                        <ProgressBar striped variant="default" now={data.percent} label={data.percent + "%"} className="progress-holder"/>
                    </MDBCol>
                </React.Fragment>
            )
        }

        return (
            <MDBCol key={data.id} lg="4" className="mb-3">
                <MDBRow className="justify-content-between">
                    <MDBCol size="6">
                        <MDBBox tag="span" display="block" className="content-description skill-title font-size-1rem">{data.title}</MDBBox>
                    </MDBCol>
                    <MDBCol size="6" className="text-right">
                        <MDBBox tag="span" display="block" className="content-description skill-title font-size-1rem">{data.start_in}</MDBBox>
                    </MDBCol>
                </MDBRow>
                <ProgressBar striped variant="default" now={data.percent} label={data.percent + "%"} className="progress-holder"/>
            </MDBCol>
        )
    }

    renderTechnologies() {
        let skillAdvnc = 0, skillBasic = 0
        if ( this.state.isSkillLoaded ) {
            if ( Object.keys(this.state.skillItems).length !== 0 ) {
                return (
                    <MDBContainer>
                        <Fade>
                            <MDBRow>
                                <MDBCol lg="12" className="mb-3">
                                    <MDBBox tag="span" display="block" className="content-title font-size-3rem font-family-architects-daughter text-center">Technologies</MDBBox>
                                </MDBCol>
                                {
                                    this.state.skillItems.sort((a, b) =>  b.percent - a.percent ).map(item => (
                                        item.percent >= 90 ? (
                                            this.renderSkills(item, skillAdvnc+=1, "Day-To-Day Comfort", "")
                                        ) : (
                                            this.renderSkills(item, skillBasic+=1, "Experience With", "mt-4")
                                        )
                                    ))
                                }
                            </MDBRow>
                        </Fade>
                    </MDBContainer>
                )
            }
        }
    }

    renderExperience(){
        if ( this.state.isExperienceLoaded ) {
            if ( Object.keys(this.state.experienceItems).length !== 0 ) {
                return (
                    <Fade>
                        <Timeline title="Experience" data={this.state.experienceItems} counter=""/>
                    </Fade>
                )
            }
        }
    }

    renderEducational(){
        if ( this.state.isEducationalLoaded ) {
            if ( Object.keys(this.state.educationalItems).length !== 0 ) {
                return (
                    <Fade>
                        <Timeline title="Educational" data={this.state.educationalItems} counter=""/>
                    </Fade>
                )
            }
        }
    }

    render() {
        document.title = "Resume | Jerald Gutierrez"
        return (
            <MDBBox tag="div" className="resume-wrapper">
                {
                    !this.state.isLoaded ? (
                        // Loading
                    <MDBBox tag="div" className="loader-section">
                        <MDBBox tag="div" className="position-fixed z-index-9999 l-0 t-0 r-0 b-0 m-auto overflow-visible flex-center">
                            <MDBBox tag="span" className="loader-spin-dual-ring"></MDBBox>
                            <MDBBox tag="span" className="ml-2 font-size-1rem white-text">Loading, please wait...</MDBBox>
                        </MDBBox>
                        <MDBBox tag="div" className="loader-backdrop position-fixed z-index-1040 l-0 t-0 r-0 b-0 black"></MDBBox>
                    </MDBBox>
                    ) : ("")
                }

                {
                    this.state.isNotif ? (
                        <Snackbar category={this.state.notifCat} string={this.state.notifStr} />
                    ) : ("")
                }

                <MDBContainer fluid className="py-5 position-relative">
                    {this.renderTechnologies()}
                </MDBContainer>
                <Parallax 
                    container="parallax-palette bg-parallax-1"
                    description="Feel free to take a deeper look at what I've done."
                    overlay="black-strong"
                    color="default"
                    colorText=""
                    btnTitle="View My Portfolio"
                    btnIcon="link"
                    btnUri="/portfolio"
                />
                <MDBContainer fluid className="py-5 position-relative white">
                    {this.renderExperience()}
                </MDBContainer>
                <Parallax 
                    container="parallax-palette bg-parallax-2"
                    description="Feel free to download my resume for hard copy of yours."
                    overlay="black-strong"
                    color="default"
                    colorText=""
                    btnTitle="Download My Resume"
                    btnIcon="download"
                    btnUri="/"
                />
                <MDBContainer fluid className="py-5 position-relative">
                    {this.renderEducational()}
                </MDBContainer>
                <Parallax
                    container="parallax-bottom-palette"
                    description="Now that you know what I'm able to do and what experienced and educational background I have, feel free to reach out and start a conversation."
                    overlay="stylish-slight"
                    color="black"
                    colorText=""
                    btnTitle="Contact Me Today"
                    btnIcon="id-card"
                    btnUri="/contact"
                />
            </MDBBox>
        )
    }
}

export default Resume