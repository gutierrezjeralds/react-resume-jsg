import React from 'react'
import { 
    MDBBox, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon,
    MDBCardImage, MDBView, MDBMask
} from "mdbreact"
import { MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
import { CardColumns } from 'react-bootstrap'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { Fade } from 'react-reveal';
import $ from 'jquery'
import ReactHtmlParser from 'react-html-parser';
import Parallax from './includes/Parallax'
import Timeline from './includes/Timeline'
import Snackbar from "../views/includes/Snackbar"

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isNotif: false,
            notifCat: "default",
            notifStr: "",
            resumeError: false,
            resumeIsLoaded: false,
            resumeItems: [],
            portfolioError: false,
            portfolioIsLoaded: false,
            portfolioItems: []
        }
    }

    UNSAFE_componentWillMount() {
        this.getResumeData()
        this.getPortfolioCards()
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
                    resumeIsLoaded: true,
                    resumeItems: result
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

    getPortfolioCards() {
        $.ajax({
            url: "./assets/json/content/portfolio.json",
            dataType: "json",
            cache: false
        })
        .then(
            (result) => {
                this.setState({
                    portfolioIsLoaded: true,
                    portfolioItems: result
                })
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                    portfolioIsLoaded: true,
                    portfolioError: true,
                    isNotif: true,
                    notifCat: "error",
                    notifStr: "Unexpected error, please reload the page!",
                })

                console.log(error.statusText)
            }
        )
        .catch(
            (err) => {
                this.setState({
                    isNotif: true,
                    notifCat: "error",
                    notifStr: "Unexpected error, please reload the page!",
                })

                console.error(err)
            }
        )
    }

    renderSkills() {
        if( this.state.resumeIsLoaded && !this.state.resumeError ) {
            if ( Object.keys(this.state.resumeItems.skills).length !== 0 ) {
                return (
                    <MDBContainer>
                        <Fade>
                            <MDBRow>
                                <MDBCol lg="12" className="mb-3">
                                    <MDBBox tag="span" display="block" className="content-title d-block font-size-3rem font-family-architects-daughter text-center">Day-To-Day-Comfort</MDBBox>
                                </MDBCol>
                                {
                                    this.state.resumeItems.skills.sort((a, b) =>  b.percent - a.percent ).map(item => (
                                        item.percent >= 80 ? (
                                            <MDBCol key={item.id} lg="4" className="mb-3">
                                                <MDBBox tag="span" display="block" className="content-description skill-title font-size-1rem">{item.title}</MDBBox>
                                                <ProgressBar striped variant="default" now={item.percent} label={item.percent + "%"} className="progress-holder"/>
                                            </MDBCol>
                                        ) : ("")
                                    ))
                                }
                            </MDBRow>
                        </Fade>
                    </MDBContainer>
                )
            }
        }
    }

    renderPortfolio() {
        if( this.state.portfolioIsLoaded && !this.state.portfolioError ) {
            if ( Object.keys(this.state.portfolioItems.development).length !== 0 ) {
                return (
                    <MDBRow>
                        <MDBCol md="12" className="mb-3">
                            <MDBBox tag="span" className="content-title d-block font-size-3rem font-family-architects-daughter text-center">Web Development</MDBBox>
                        </MDBCol>
                        <CardColumns>
                            {
                                this.state.portfolioItems.development.sort((a, b) =>  b.order - a.order ).map(items => (
                                    // <MDBCol md="4" className="mb-3">
                                        <Fade key={items.id}>
                                            <MDBView className="overlay mb-4 z-depth-2 img-opacity-dark">
                                                <MDBCardImage className="img-fluid min-h-233px" src={items.src} alt={items.alt} waves />
                                                <MDBMask className="flex-center" overlay="black-strong" >
                                                    <MDBBox tag="div" className="d-block text-center white-text px-1">
                                                        <MDBBox tag="p" className="content-title d-block font-size-2rem font-family-architects-daughter mb-1">{items.title}</MDBBox>
                                                        <MDBBox tag="p" className="content-sub-title d-block font-size-1rem font-weight-bold mb-1">{items.company}</MDBBox>
                                                        <MDBBox tag="p" className="content-description d-block card-text mb-2">{ ReactHtmlParser(items.description) }</MDBBox>
                                                        <MDBBox tag="div" className="content-action">
                                                            <MDBBtn outline onClick={this.modalToggle(items.src)} className="m-0 mr-2 py-2 px-4">
                                                                <MDBIcon icon="camera" />
                                                            </MDBBtn>
                                                            {
                                                                items.uri !== "" ? (
                                                                    <MDBBtn outline href={items.uri} target="_blank" className="m-0 py-2 px-4">
                                                                        <MDBIcon icon="link" />
                                                                    </MDBBtn>
                                                                ) : ("")
                                                            }
                                                        </MDBBox>
                                                    </MDBBox>
                                                </MDBMask>
                                            </MDBView>
                                        </Fade>
                                    // </MDBCol>
                                ))
                            }
                        </CardColumns>
                    </MDBRow>
                )
            }
        }
    }

    modalToggle = img => () => {
        this.setState({
            isOpen: !this.state.isOpen,
            imgModal: img
        });
    }

    renderImgModal() {
        return (
            <MDBModal isOpen={this.state.isOpen} size="lg">
                <MDBModalHeader toggle={this.modalToggle()} className="position-absolute r-0 z-index-5 border-0"></MDBModalHeader>
                <MDBModalBody className="p-0 flex-center">
                    <img className="img-fluid" src={this.state.imgModal} alt="" />
                </MDBModalBody>
            </MDBModal>
        )
    }

    renderTimeline(items, title){
        if( this.state.resumeIsLoaded && !this.state.resumeError ) {
            if ( Object.keys(items).length !== 0 ) {
                return (
                    <Fade>
                        <Timeline title={title} data={items[0][title.toLowerCase()]} counter="1"/>
                    </Fade>
                )
            }
        }
    }

    render() {
        document.title = "Home | Jerald Gutierrez"
        return (
            <MDBBox tag="div" className="home-wrapper">
                {
                    this.state.isNotif ? (
                        <Snackbar category={this.state.notifCat} string={this.state.notifStr} />
                    ) : ("")
                }

                <MDBContainer fluid className="py-5 position-relative home-about-content">
                    <MDBContainer>
                        <MDBRow className="flex-center">
                            <MDBCol md="12" className="mb-3">
                                <MDBBox tag="span" className="content-title d-block font-size-3rem font-family-architects-daughter text-center">My Passions &amp; Personality</MDBBox>
                            </MDBCol>
                            <MDBCol lg="4" className="d-none d-lg-block home-carousel">
                                <Fade right>
                                    <MDBBox tag="div">
                                        <img className="img-fluid" src="/assets/img/chibi-about.png" alt="Chibi About" />
                                    </MDBBox>
                                </Fade>
                            </MDBCol>
                            <MDBCol lg="6" md="12" className="mb-5">
                                <Fade left>
                                    <MDBBox tag="span" className="content-sub-title d-block font-size-2rem font-weight-light text-center text-lg-left">A few fun facts about myself</MDBBox>
                                    <MDBBox tag="p" className="content-description">I am ambitious and hardworking individual, with broad skills and experience in Web Development (Front-End) and I am able to handle multiple tasks on a daily basis and at working well under pressure.</MDBBox>
                                    <MDBBox tag="p" className="content-description">Furthermore, I am adventurous person, I love to hike in different mountains and experience extreme activities. I am a online gamer (Special Force) and aslo I like to watch and play basketball.</MDBBox>
                                </Fade>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </MDBContainer>
                <MDBContainer fluid className="py-5 position-relative white">
                    {this.renderSkills()}
                </MDBContainer>
                <Parallax 
                    container="parallax-palette bg-parallax-1"
                    description="Feel free to take a deeper look at what I'm able to do and what experienced and educational background I have."
                    overlay="black-strong"
                    color="default"
                    colorText=""
                    btnTitle="View My Resume"
                    btnIcon="link"
                    btnUri="/resume"
                />
                <MDBContainer fluid className="py-5 position-relative">
                    <MDBContainer>
                        {this.renderPortfolio()}
                    </MDBContainer>
                </MDBContainer>
                <Parallax 
                    container="parallax-palette bg-parallax-2"
                    description="Feel free to take a deeper look at what I've done."
                    overlay="black-strong"
                    color="default"
                    colorText=""
                    btnTitle="View My Portfolio"
                    btnIcon="link"
                    btnUri="/portfolio"
                />
                <MDBContainer fluid className="py-5 position-relative white">
                    {this.renderTimeline(this.state.resumeItems.timeline, "Experience")}
                </MDBContainer>
                <Parallax
                    container="parallax-bottom-palette"
                    description="Now that you know you have a brief introduction about me, feel free to reach out and start a conversation."
                    overlay=""
                    color="black"
                    colorText=""
                    btnTitle="Contact Me Today"
                    btnIcon="id-card"
                    btnUri="/contact"
                />
                {this.renderImgModal()}
            </MDBBox>
        )
    }
}

export default Home