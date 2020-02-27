import React from 'react'
import { 
    MDBBox, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon,
    MDBCardImage, MDBView, MDBMask
} from "mdbreact"
import { MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
import { CardColumns } from 'react-bootstrap'
import { Fade } from 'react-reveal';
import $ from 'jquery'
import ReactHtmlParser from 'react-html-parser';
import Parallax from './includes/Parallax'
import Snackbar from "../views/includes/Snackbar"

class Portfolio extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isNotif: false,
            notifCat: "default",
            notifStr: "",
            error: false,
            isLoaded: false,
            items: [],
            isOpen: false,
            imgModal: ""
        }
    }

    UNSAFE_componentWillMount() {
        this.getProjects()
    }

    thisDefaultSrc(event){
        event.target.src = "/assets/img/background/bg-item-3.png"
    }

    getProjects() {
        $.ajax({
            url: "https://gutierrez-jerald-cv-be.herokuapp.com/api/getProjects",
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

    renderCard(data, title) {
        if( this.state.isLoaded && !this.state.error ) {
            if ( Object.keys(data).length !== 0 ) {
                return (
                    <MDBRow>
                        <MDBCol md="12" className="mb-3">
                            <MDBBox tag="span" className="content-title d-block font-size-3rem font-family-architects-daughter text-center">{title}</MDBBox>
                        </MDBCol>
                        <CardColumns>
                            {
                                data.sort((a, b) =>  b.start_in - a.start_in ).map(items => (
                                    items.category.toLowerCase() === title.split(' ').pop().toLowerCase() ? (
                                        // <MDBCol md="4" className="mb-3">
                                            <Fade key={items.id}>
                                                <MDBView className="overlay mb-4 z-depth-2 img-opacity-dark">
                                                    <MDBCardImage className="img-fluid min-h-233px" src={items.image} onError={this.thisDefaultSrc} alt={items.title} waves />
                                                    <MDBMask className="flex-center" overlay="black-strong" >
                                                        <MDBBox tag="div" className="d-block text-center white-text px-1">
                                                            <MDBBox tag="p" className="content-title d-block font-size-2rem font-family-architects-daughter mb-1">{items.title}</MDBBox>
                                                            <MDBBox tag="p" className="content-company d-block font-size-1rem font-weight-bold mb-1">{items.company}</MDBBox>
                                                            <MDBBox tag="p" className="content-description d-block card-text mb-2">{ ReactHtmlParser(items.description) }</MDBBox>
                                                            <MDBBox tag="div">
                                                                <MDBBtn outline color="white" onClick={this.modalToggle(items.image)} className="m-0 mr-2 py-2 px-4">
                                                                    <MDBIcon icon="camera" />
                                                                </MDBBtn>
                                                                {
                                                                    items.uri !== "" ? (
                                                                        <MDBBtn outline color="white" href={items.website} target="_blank" className="m-0 py-2 px-4">
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
                                    ) : ("")
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
                    <img className="img-fluid" src={this.state.imgModal} onError={this.thisDefaultSrc} alt="" />
                </MDBModalBody>
            </MDBModal>
        )
    }

    render() {
        document.title = "Portfolio | Jerald Gutierrez"
        return (
            <MDBBox tag="div" className="portfolio-wrapper" id="portfolioContent">
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
                    <MDBContainer>
                        {this.renderCard(this.state.items, "Web Development")}
                    </MDBContainer>
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
                <MDBContainer fluid className="py-5 position-relative white">
                    <MDBContainer>
                        {this.renderCard(this.state.items, "Web Maintenance")}
                    </MDBContainer>
                </MDBContainer>
                <Parallax
                    container="parallax-bottom-palette"
                    description="Now that you know what I've done, feel free to reach out and start a conversation."
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

export default Portfolio