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
            )
        }
    }

    render() {
        document.title = "Home | Jerald Gutierrez"
        return (
            <MDBBox tag="div" className="home-wrapper">
                <MDBContainer fluid className="py-5 position-relative home-about-content very-light-gray-bg">
                    <MDBContainer>
                        <MDBRow className="flex-center">
                            <MDBCol md="12" className="mb-3">
                                <MDBBox tag="span" className="content-title d-block font-size-3rem font-family-fantasy text-center">My Passions &amp; Personality</MDBBox>
                            </MDBCol>
                            <MDBCol lg="4" className="d-none d-lg-block home-carousel">
                                <Fade right>
                                    {/* {this.carouselRender(this.state.carousel)} */}
                                    <MDBBox tag="div">
                                        <img className="img-fluid" src="/assets/img/chibi-about.png" alt="Chibi About" />
                                    </MDBBox>
                                </Fade>
                            </MDBCol>
                            <MDBCol lg="6" md="12" className="mb-5">
                                <Fade left>
                                    <MDBBox tag="span" className="content-sub-title d-block font-size-2rem font-weight-light text-center text-lg-left">A few fun facts about myself</MDBBox>
                                    <MDBBox tag="p" clas="content-description">I am ambitious and hardworking individual, with broad skills and experience in Web Development (Front-End) and I am able to handle multiple tasks on a daily basis and at working well under pressure.</MDBBox>
                                    <MDBBox tag="p">Furthermore, I am adventurous person, I love to hike in different mountains and experience extreme activities. I am a online gamer (Special Force) and aslo I like to watch and play basketball.</MDBBox>
                                </Fade>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </MDBContainer>
                <MDBContainer fluid className="white">
                    <div style={{height: "100vh"}}></div>
                </MDBContainer>
            </MDBBox>
        )
    }
}

export default Home