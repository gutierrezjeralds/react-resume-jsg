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
                                <MDBAnimation type="fadeIn" className="text-center white-text mx-5 wow">
                                    <MDBBox tag="h1" className="mb-4 font-weight-bold">Jerald Gutierrez</MDBBox>
                                    <MDBBox tag="h3">Web Developer</MDBBox>
                                    <MDBBox tag="p" className="home-slogan">Trust me, I'm a Developer and I'll do it with style!<span>|</span></MDBBox>
                                    <MDBBtn outline color="white">
                                        <Link to="/contact" className="white-text">
                                            Hire me today
                                            <MDBIcon icon="id-card" className="ml-2" />
                                        </Link>
                                    </MDBBtn>
                                </MDBAnimation>
                            ) : (
                                this.props.wrapper === "contact" ? (
                                    <MDBAnimation type="fadeIn" className="text-center white-text mx-5 wow">
                                        <MDBBox tag="h1" className="mb-4 font-weight-light title">Connect with me today.</MDBBox>
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
                                    <MDBAnimation type="fadeIn" className="text-center white-text mx-5 wow">
                                        <MDBBox tag="h1" className="mb-4 font-weight-light title">404 ERROR</MDBBox>
                                        <MDBBox tag="h4">Sorry but it looks like this page no longer available.</MDBBox>
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