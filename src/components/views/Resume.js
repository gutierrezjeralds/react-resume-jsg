import React from 'react'
import { MDBBox } from "mdbreact"

class Resume extends React.Component {
    render() {
        document.title = "Resume | Jerald Gutierrez"
        return (
            <MDBBox tag="div" className="resume-wrapper">
                <div style={{height: "100vh"}}></div>
            </MDBBox>
        )
    }
}

export default Resume