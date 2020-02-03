import React from 'react'
import { 
    MDBBox, MDBContainer, MDBRow, MDBCol
} from "mdbreact"
// import Splash from './includes/Splash'

class Panel extends React.Component {
    render() {
        document.title = "Control Panel | Jerald Gutierrez"
        return (
            <MDBBox tag="div" className="control-panel-wrapper">
                <MDBContainer className="py-5 position-relative">
                    <MDBRow className="justify-content-center">
                        <MDBCol md="12" className="mb-3">
                            <MDBBox tag="span" className="content-title d-block font-size-3rem font-family-architects-daughter text-center">Control Panel</MDBBox>
                        </MDBCol>
                        <MDBCol md="4" className="mb-3">
                            <MDBBox tag="div" className="select-mdb-custom">
                                <MDBBox tag="select" className="select-mdb-content">
                                    <MDBBox tag="option">Splash</MDBBox>
                                    <MDBBox tag="option">Home</MDBBox>
                                    <MDBBox tag="option">Portfolio</MDBBox>
                                    <MDBBox tag="option">Resume</MDBBox>
                                    <MDBBox tag="option">Contact</MDBBox>
                                </MDBBox>
                                <MDBBox tag="span" className="select-mdb-bar"></MDBBox>
                                <MDBBox tag="label" className="col select-mdb-label"></MDBBox>
                            </MDBBox>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </MDBBox>
        )
    }
}

export default Panel