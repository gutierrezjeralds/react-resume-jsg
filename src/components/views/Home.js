import React from 'react'
import { MDBBox } from "mdbreact";
import Banner from './Banner'

class Home extends React.Component {
    render() {
        document.title = "Home | Jerald Gutierrez"
        return (
            <MDBBox tag="div" className="home-wrapper">
                <Banner wrapper="home" />
                <div style={{height: "100vh"}}></div>
            </MDBBox>
        )
    }
}

export default Home