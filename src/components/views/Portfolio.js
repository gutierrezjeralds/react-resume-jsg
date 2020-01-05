import React from 'react'
import { 
    MDBBox, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon,
    MDBCard, MDBCardBody, MDBCardImage
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
                                    <MDBCard className="mb-4">
                                        <MDBCardImage className="img-fluid" src={items.src} alt={items.alt} waves />
                                        <MDBCardBody>
                                            <MDBBox tag="p" className="content-title d-block font-size-2rem font-family-fantasy mb-1">{items.title}</MDBBox>
                                            <MDBBox tag="p" className="content-company d-block font-size-1rem mb-1">{items.company}</MDBBox>
                                            <MDBBox tag="p" className="content-description d-block card-text mb-2">{ ReactHtmlParser(items.description) }</MDBBox>
                                            <MDBBtn href={items.uri} target="_blank" className="m-0">
                                                <MDBIcon icon="link" className="mr-2" />
                                                Visit
                                            </MDBBtn>
                                        </MDBCardBody>
                                    </MDBCard>
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
                    description="Some quick example text to build on the card title and make up the bulk of the card&apos;s content."
                    overlay="black-strong"
                    color="white"
                    colorText="white-text"
                    btnTitle="Resume"
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
                    description="Some quick example text to build on the card title and make up the bulk of the card&apos;s content."
                    overlay="stylish-slight"
                    color="black"
                    colorText="black-text"
                    btnTitle="Hire Me Today"
                    btnIcon="id-card"
                    btnUri="/contact"
                />
            </MDBBox>
        )
    }
}

export default Portfolio