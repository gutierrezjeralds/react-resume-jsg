import React from 'react'
import { MDBAnimation, MDBView, MDBMask, MDBBtn, MDBBox, MDBIcon } from "mdbreact";
import { Link } from 'react-router-dom';

class Home extends React.Component {
    render() {
        return (
            <MDBBox tag="div" className="home-wrapper">
                <MDBView className="home-banner">
                    <MDBMask className="flex-center" overlay="black-strong">
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
                    </MDBMask>
                </MDBView>
                <div style={{height: "100vh"}}></div>
            </MDBBox>
        )
    }
}

export default Home