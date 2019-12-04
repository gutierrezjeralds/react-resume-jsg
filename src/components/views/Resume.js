import React from 'react'
import { MDBBox } from "mdbreact"
import Banner from './Banner'

class Resume extends React.Component {
    render() {
        document.title = "Resume | Jerald Gutierrez"
        return (
            <MDBBox tag="div" className="resume-wrapper">
                <Banner wrapper="resume" />
                <div style={{height: "100vh"}}></div>
            </MDBBox>
        )
    }
}

export default Resume