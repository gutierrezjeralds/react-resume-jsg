import React from 'react'
import FormSplash from "./includes/form-splash"
import FormHome from './includes/form-home'
import { 
    MDBBox, MDBContainer, MDBRow, MDBCol
} from "mdbreact"

class Panel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            category: "splash"
        }
    }

    // Category change
    handleCatChange(event) {
        this.setState({
            category: event.target.value
        })
    }

    renderElement() {
        if ( this.state.category === "splash" ) {
            return (
                <FormSplash />
            )

        } else if ( this.state.category === "home" ) {
            return (
                <FormHome />
            )

        } else if ( this.state.category === "portfolio" ) {
            console.log(this.state.category)

        } else if ( this.state.category === "resume" ) {
            console.log(this.state.category)

        } else if ( this.state.category === "contact" ) {
            console.log(this.state.category)

        } else {
            console.log(this.state.category)
            return (
                // Has error
                <MDBBox tag="div" className="error-section flex-center">
                    <MDBBox tag="span" className="font-size-2rem">Unexpected error, please reload the page.</MDBBox>
                </MDBBox>
            )
        }
    }

    render() {
        document.title = "Control Panel | Jerald Gutierrez"
        return (
            <MDBBox tag="div" className="control-panel-wrapper">
                <MDBContainer className="py-5 position-relative">
                    <MDBRow className="justify-content-between">
                        <MDBCol md="5" className="mb-3">
                            <MDBBox tag="span" className="content-title d-block font-size-3rem font-family-architects-daughter text-md-left text-sm-center">Control Panel</MDBBox>
                        </MDBCol>
                        <MDBCol md="4" className="mb-3">
                            <MDBBox tag="div" className="select-mdb-custom">
                                <MDBBox tag="select" className="select-mdb-content" onChange={this.handleCatChange.bind(this)}>
                                    <MDBBox tag="option" value="splash">Splash</MDBBox>
                                    <MDBBox tag="option" value="home">Home</MDBBox>
                                    <MDBBox tag="option" value="portfolio">Portfolio</MDBBox>
                                    <MDBBox tag="option" value="resume">Resume</MDBBox>
                                    <MDBBox tag="option" value="contact">Contact</MDBBox>
                                </MDBBox>
                                <MDBBox tag="span" className="select-mdb-bar"></MDBBox>
                                <MDBBox tag="label" className="col select-mdb-label"></MDBBox>
                            </MDBBox>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="justify-content-center">
                        {this.renderElement()}
                    </MDBRow>
                </MDBContainer>
            </MDBBox>
        )
    }
}

export default Panel