import React from 'react'
import { MDBBox } from "mdbreact"

class NotFound extends React.Component {
    render() {
        document.title = "Not Found | Jerald Gutierrez"
        return (
            <MDBBox tag="div" className="notFound-wrapper">
                <div className="d-none">404 Error</div>
            </MDBBox>
        )
    }
}

export default NotFound