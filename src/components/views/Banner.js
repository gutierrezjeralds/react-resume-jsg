import React from 'react'
import { MDBAnimation, MDBView, MDBMask, MDBBtn, MDBBox, MDBIcon } from "mdbreact";
import { Link } from 'react-router-dom';

class Banner extends React.Component {
    render() {
        return (
            <MDBBox tag="div" className="banner-wrapper">
                <MDBView className={this.props.wrapper + "-banner banner-content"}>
                    <MDBMask className="flex-center" overlay="black-strong">
                            {this.props.wrapper === "home" ? (
                                <MDBAnimation type="fadeIn" className="text-center white-text mx-5 wow font-family-fantasy">
                                    <MDBBox tag="span" className="title font-weight-light font-size-6rem d-block">Jerald Gutierrez</MDBBox>
                                    <MDBBox tag="span" className="sub-title font-weight-light font-size-3rem d-block">Web Developer</MDBBox>
                                    <MDBBox tag="span" className="slogan font-weight-light d-block">Trust me, I'm a Developer and I'll do it with style!<span>|</span></MDBBox>
                                    <MDBBtn outline color="white">
                                        <Link to="/contact" className="white-text">
                                            Hire me today
                                            <MDBIcon icon="id-card" className="ml-2" />
                                        </Link>
                                    </MDBBtn>
                                </MDBAnimation>
                            ) : (
                                this.props.wrapper === "contact" ? (
                                    <MDBAnimation type="fadeIn" className="text-center white-text mx-5 wow font-family-fantasy">
                                        <MDBBox tag="span" className="title font-weight-light font-size-6rem d-block">Connect with me.</MDBBox>
                                        <MDBBox tag="a" className="white-text" onClick={() => {
                                            let elemId = document.getElementById("contactContent")
                                            window.scrollTo({
                                                top: elemId.offsetTop,
                                                behavior: "smooth"
                                            })
                                        }}>
                                            <MDBAnimation type="bounce" infinite>
                                                <MDBIcon icon="chevron-down" className="fa-3x ml-2" />
                                            </MDBAnimation>
                                        </MDBBox>
                                    </MDBAnimation>
                                ) : (
                                    // 404 Error
                                    <MDBAnimation type="fadeIn" className="text-center white-text mx-5 wow font-family-fantasy">
                                        <MDBBox tag="span" className="title font-weight-light font-size-6rem d-block">Page not Found</MDBBox>
                                        <MDBBox tag="span" className="sub-title font-weight-light font-size-2rem d-block">Sorry but it looks like this page no longer available.</MDBBox>
                                        <MDBBtn outline color="white">
                                            <Link to="/" className="white-text">
                                                Back To Home
                                                <MDBIcon icon="home" className="ml-2" />
                                            </Link>
                                        </MDBBtn>
                                    </MDBAnimation>
                                )
                            )}
                    </MDBMask>
                </MDBView>
            </MDBBox>
        )
    }
}

export default Banner