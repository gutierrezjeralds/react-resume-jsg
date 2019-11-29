import React from 'react'
import { MDBAnimation, MDBView, MDBMask, MDBBtn, MDBBox } from "mdbreact";
import { Link } from 'react-router-dom';

class Home extends React.Component {
    render() {
        return (
            <main>
                <MDBView className="home-banner">
                    <MDBMask className="flex-center" overlay="black-strong">
                        <MDBAnimation type="fadeIn" className="text-center white-text mx-5 wow">
                            <MDBBox tag="h1" className="mb-4 font-weight-bold">Jerald Gutierrez</MDBBox>
                            <MDBBox tag="h3">Web Developer</MDBBox>
                            <MDBBox tag="p" className="home-slogan">Trust me, I'm a Developer!<span>|</span></MDBBox>
                            <MDBBtn outline color="white">
                                <Link to="/" className="white-text">
                                    Hire me today
                                    <i className="fas fa-id-card ml-2"></i>
                                </Link>
                            </MDBBtn>
                        </MDBAnimation>
                    </MDBMask>
                </MDBView>
                <div style={{height: "100vh"}}></div>
            </main>
        )
    }
}

export default Home