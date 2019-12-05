import React from 'react'
import { MDBBox, MDBContainer } from "mdbreact"

class Portfolio extends React.Component {
    render() {
        document.title = "Portfolio | Jerald Gutierrez"
        return (
            <MDBBox tag="div" className="portfolio-wrapper">
                <MDBBox tag="div" className="position-absolute py-4" id="portfolioContent"></MDBBox>
                <MDBContainer className="py-5 my-5 portfolio-wrapper">

                </MDBContainer>
            </MDBBox>
        )
    }
}

export default Portfolio