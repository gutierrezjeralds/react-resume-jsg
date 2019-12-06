import React from 'react'
import { MDBBox, MDBContainer, MDBRow, MDBCol } from "mdbreact"
import { Fade } from 'react-reveal';

class Resume extends React.Component {
    render() {
        document.title = "Resume | Jerald Gutierrez"
        return (
            <MDBBox tag="div" className="resume-wrapper">
                <MDBContainer fluid className="py-5 position-relative home-about-content">
                    <MDBContainer>
                        <MDBRow className="justify-content-center">
                            <MDBCol md="12" className="mb-3">
                                <MDBBox tag="span" display="block" className="content-title font-size-3rem font-family-fantasy text-center">Technologies</MDBBox>
                            </MDBCol>
                            <MDBCol lg="6" display="block">
                                <Fade>
                                    
                                </Fade>
                            </MDBCol>
                            <MDBCol lg="6" md="12">
                                <Fade>
                                    
                                </Fade>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </MDBContainer>
                <MDBContainer fluid style={{background: "white"}}>
                    <div style={{height: "100vh"}}></div>
                </MDBContainer>
            </MDBBox>
        )
    }
}

export default Resume