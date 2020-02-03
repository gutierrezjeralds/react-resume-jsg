import React from 'react'
import { 
    MDBBox
} from "mdbreact"

class Splash extends React.Component {
    render() {
        document.title = "Control Panel | Jerald Gutierrez"
        return (
            <MDBBox tag="div" className="control-panel-wrapper">
                Splash
            </MDBBox>
        )
    }
}

export default Splash