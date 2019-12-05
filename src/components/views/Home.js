import React from 'react'
import { MDBBox, MDBContainer, MDBRow, MDBCol } from "mdbreact"
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView } from "mdbreact"
import { Fade } from 'react-reveal';

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            carousel: [
                {
                    id: 1,
                    src: "https://mdbootstrap.com/img/Photos/Slides/img%20(35).jpg",
                    alt: "First"
                },
                {
                    id: 2,
                    src: "https://mdbootstrap.com/img/Photos/Slides/img%20(33).jpg",
                    alt: "Two"
                },
                {
                    id: 3,
                    src: "https://mdbootstrap.com/img/Photos/Slides/img%20(31).jpg",
                    alt: "Three"
                }
            ]
        }
    }

    carouselRender(data) {
        if ( data !== "" ) {
            return (
                <MDBCol lg="4" className="d-none d-lg-block home-carousel">
                    <MDBCarousel activeItem={this.state.carousel[0].id} length={this.state.carousel.length} showControls={false} showIndicators={false} slide>
                        <MDBCarouselInner>
                            {
                                data.map(items => (
                                    <MDBCarouselItem key={items.id} itemId={items.id}>
                                        <MDBView>
                                            <img className="d-block w-100" src={items.src} alt={items.alt} style={{height: "400px"}} />
                                        </MDBView>
                                    </MDBCarouselItem>
                                ))
                            }
                        </MDBCarouselInner>
                    </MDBCarousel>
                </MDBCol>
            )
        }
    }

    render() {
        document.title = "Home | Jerald Gutierrez"
        return (
            <MDBBox tag="div" className="home-wrapper">
                <MDBContainer fluid className="py-5 position-relative home-about-content">
                    <Fade bottom>
                        <MDBContainer>
                            <MDBRow className="justify-content-center">
                                <MDBCol md="12" className="mb-3">
                                    <MDBBox tag="span" className="content-title d-block font-size-3rem font-family-fantasy text-center">My Passions &amp; Personality</MDBBox>
                                </MDBCol>
                                {this.carouselRender(this.state.carousel)}
                                <MDBCol lg="6" md="12">
                                    <MDBBox tag="span" className="content-sub-title d-block font-size-2rem font-weight-light">A few fun facts about myself</MDBBox>
                                    <MDBBox tag="p" clas="content-description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</MDBBox>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </Fade>
                </MDBContainer>
                <MDBContainer fluid style={{background: "white"}}>
                    <div style={{height: "100vh"}}></div>
                </MDBContainer>
            </MDBBox>
        )
    }
}

export default Home