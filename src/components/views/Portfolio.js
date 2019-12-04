import React from 'react'
import { MDBBox, MDBContainer } from "mdbreact"
import Banner from './Banner'

class Portfolio extends React.Component {
    render() {
        document.title = "Portfolio | Jerald Gutierrez"
        return (
            <MDBBox tag="div" className="portfolio-wrapper">
                <Banner wrapper="portfolio" />
                <MDBBox tag="div" className="position-absolute py-4" id="portfolioContent"></MDBBox>
                <MDBContainer className="py-5 my-5 portfolio-wrapper">

                </MDBContainer>
            </MDBBox>
        )
    }
}

export default Portfolio