import React from 'react'
import { 
    MDBBox, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon,
    MDBCardImage, MDBView, MDBMask,
    MDBModal, MDBModalBody, MDBModalHeader
} from "mdbreact"
import { CardColumns } from 'react-bootstrap'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { Fade } from 'react-reveal';
import $ from 'jquery'
import ReactHtmlParser from 'react-html-parser';
import Parallax from './includes/Parallax'
import Timeline from './includes/Timeline'
import Snackbar from "../views/includes/Snackbar"
import Moment from 'react-moment';

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            isLoaded: false,
            isNotif: false,
            notifCat: "default",
            notifStr: "",
            isHomeLoaded: false,
            homeItems: [],
            isSkillLoaded: false,
            skillItems: [],
            isPortfolioLoaded: false,
            portfolioItems: [],
            isExperienceLoaded: false,
            experienceItems: []
        }
    }

    UNSAFE_componentWillMount() {
        this.getHomeData()
    }

    modalToggle = img => () => {
        this.setState({
            isOpen: !this.state.isOpen,
            imgModal: img
        });
    }

    getHomeData = () => {
        $.ajax({
            url: "https://gutierrez-jerald-cv-be.herokuapp.com/api/getHome",
            dataType: "json",
            cache: false
        })
        .then(
            (result) => {
                this.setState({
                    isHomeLoaded: true,
                    homeItems: result
                })

                // Get Resume Skills data ajax
                this.getSkills()
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

                // Get Porfolio data ajax
                this.getPortfolioCards()
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

    getPortfolioCards = () => {
        $.ajax({
            url: "./assets/json/content/portfolio.json",
            dataType: "json",
            cache: false
        })
        .then(
            (result) => {
                this.setState({
                    isPortfolioLoaded: true,
                    portfolioItems: result
                })

                // Get Experience ajax
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

                console.log(error.statusText)
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

                console.error(err)
            }
        )
    }

    getExperience() {
        $.ajax({
            url: "https://gutierrez-jerald-cv-be.herokuapp.com/api/get-all-experience",
            type: 'GET',
            data: {
                'is_single': 1
            },
            dataType: "json",
            cache: false
        })
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    isExperienceLoaded: true,
                    experienceItems: result
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

    renderHomeAbout() {
        if ( this.state.isHomeLoaded && this.state.isLoaded && !this.state.error ) {
            if ( Object.keys(this.state.homeItems).length !== 0 ) {
                return (
                    <MDBContainer>
                        {
                            this.state.homeItems.map((item, index) => (
                                Object.keys(this.state.homeItems).length === index + 1 ? (
                                    <MDBRow className="flex-center" key={item.id}>
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
                                                <MDBBox tag="span" className="content-sub-title d-block font-size-2rem font-weight-light text-center text-lg-left">{item.title}</MDBBox>
                                                <MDBBox tag="p" className="content-description">{item.description}</MDBBox>
                                            </Fade>
                                        </MDBCol>
                                    </MDBRow>
                                ) : ("")
                            ))
                        }
                    </MDBContainer>
                )
            }
        }
    }

    renderSkills() {
        if ( this.state.isSkillLoaded && this.state.isLoaded && !this.state.error ) {
            if ( Object.keys(this.state.skillItems).length !== 0 ) {
                return (
                    <MDBContainer>
                        <Fade>
                            <MDBRow>
                                <MDBCol lg="12" className="mb-3">
                                    <MDBBox tag="span" display="block" className="content-title d-block font-size-3rem font-family-architects-daughter text-center">Day-To-Day-Comfort</MDBBox>
                                </MDBCol>
                                {
                                    this.state.skillItems.sort((a, b) =>  b.percent - a.percent ).map(item => (
                                        item.percent >= 95 ? (
                                            <MDBCol key={item.id} lg="4" className="mb-3">
                                                <MDBRow className="justify-content-between">
                                                    <MDBCol size="6">
                                                        <MDBBox tag="span" display="block" className="content-description skill-title font-size-1rem">{item.title}</MDBBox>
                                                    </MDBCol>
                                                    <MDBCol size="6" className="text-right">
                                                        <MDBBox tag="span" display="block" className="content-description skill-title font-size-1rem">
                                                            {
                                                                new Date().getTime() > new Date(item.end_in).getTime() ? (
                                                                    // Already past the date
                                                                    <Moment from={item.end_in} ago>{item.start_in}</Moment>
                                                                ) : (
                                                                    // Still in this date
                                                                    <Moment fromNow ago>{item.start_in}</Moment>
                                                                )
                                                            }
                                                            </MDBBox>
                                                    </MDBCol>
                                                </MDBRow>
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
        if( this.state.isPortfolioLoaded && this.state.isLoaded && !this.state.error ) {
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
        if( this.state.isExperienceLoaded && this.state.isLoaded && !this.state.error ) {
            if ( Object.keys(items).length !== 0 ) {
                return (
                    <Fade>
                        <Timeline title={title} data={items} counter="1"/>
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

                <MDBContainer fluid className="py-5 position-relative home-about-content">
                    {this.renderHomeAbout()}
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
                    {this.renderTimeline(this.state.experienceItems, "Experience")}
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