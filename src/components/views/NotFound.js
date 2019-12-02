import React from 'react'
import { MDBBox } from "mdbreact";
import Banner from './Banner'

class NotFound extends React.Component {
    render() {
        return (
            <MDBBox tag="div" className="home-wrapper">
                <Banner wrapper="notFound-404" />
                <div className="d-none">404 Error</div>
            </MDBBox>
        )
    }
}

export default NotFound