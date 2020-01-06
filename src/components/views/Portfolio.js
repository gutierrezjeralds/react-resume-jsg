import React from 'react'
import { 
    MDBBox, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon,
    MDBCardImage, MDBView, MDBMask
} from "mdbreact"
import { CardColumns } from 'react-bootstrap'
import $ from 'jquery'
import ReactHtmlParser from 'react-html-parser';
import Parallax from './includes/Parallax'
import Bottom from './includes/Bottom'

class Portfolio extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            isLoaded: false,
            items: []
        }
    }

    UNSAFE_componentWillMount() {
        this.getPortfolioCards()
    }

    getPortfolioCards() {
        $.ajax({
            url: "./assets/json/content/portfolio-cards.json",
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

    renderCard(data, title) {
        if( this.state.isLoaded && !this.state.error ) {
            return (
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <MDBBox tag="span" className="content-title d-block font-size-3rem font-family-fantasy text-center">{title}</MDBBox>
                    </MDBCol>
                    <CardColumns>
                        {
                            data.sort((a, b) =>  b.order - a.order ).map(items => (
                                // <MDBCol md="4" className="mb-3">
                                    <MDBView key={items.id} className="overlay mb-4 z-depth-2 img-opacity-dark">
                                        <MDBCardImage className="img-fluid min-h-233px" src={items.src} alt={items.alt} waves />
                                        <MDBMask className="flex-center" overlay="black-strong" >
                                            <MDBBox tag="div" className="d-block text-center white-text px-1">
                                                <MDBBox tag="p" className="content-title d-block font-size-2rem font-family-fantasy mb-1">{items.title}</MDBBox>
                                                <MDBBox tag="p" className="content-company d-block font-size-1rem font-weight-bold mb-1">{items.company}</MDBBox>
                                                <MDBBox tag="p" className="content-description d-block card-text mb-2">{ ReactHtmlParser(items.description) }</MDBBox>
                                                {
                                                    items.uri !== "" ? (
                                                        <MDBBtn outline color="white" href={items.uri} target="_blank" className="m-0">
                                                            <MDBIcon icon="link" className="mr-2" />
                                                            Visit
                                                        </MDBBtn>
                                                    ) : ("")
                                                }
                                            </MDBBox>
                                        </MDBMask>
                                    </MDBView>
                                // </MDBCol>
                            ))
                        }
                    </CardColumns>
                </MDBRow>
            )
        }
    }

    render() {
        document.title = "Portfolio | Jerald Gutierrez"
        return (
            <MDBBox tag="div" className="portfolio-wrapper">
                <MDBContainer fluid className="py-5 position-relative white">
                    <MDBContainer>
                        {this.renderCard(this.state.items.development, "Web Development")}
                    </MDBContainer>
                </MDBContainer>
                <Parallax 
                    container="portfolio-parallax-resume"
                    description="Feel free to take a deeper look at what I'm able to do and what experienced and educational background I have."
                    overlay="black-strong"
                    color="white"
                    colorText="white-text"
                    btnTitle="View My Resume"
                    btnIcon="link"
                    btnUri="/resume"
                />
                <MDBContainer fluid className="py-5 position-relative very-light-gray-bg">
                    <MDBContainer>
                        {this.renderCard(this.state.items.maintenance, "Web Maintenance")}
                    </MDBContainer>
                </MDBContainer>
                <Bottom
                    container=""
                    description="Now that you know what I've done, feel free to reach out and start a conversation."
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

export default Portfolio