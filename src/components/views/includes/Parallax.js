import React from 'react'
import { MDBBox, MDBBtn, MDBIcon, MDBView, MDBMask } from "mdbreact"
import { Link } from 'react-router-dom'

class Parallax extends React.Component{
    render () {
        return (
            <MDBView className={"parallax-content " + this.props.container}>
                <MDBMask className="flex-center" overlay={this.props.overlay} >
                    <MDBBox tag="div" className="d-block text-center">
                        <MDBBox tag="p" className={this.props.colorText}>{this.props.description}</MDBBox>
                        <MDBBtn outline color={this.props.color}>
                            <Link to={this.props.btnUri} className={this.props.colorText}>
                                <MDBIcon icon={this.props.btnIcon} className="mr-2" />
                                {this.props.btnTitle}
                            </Link>
                        </MDBBtn>
                    </MDBBox>
                </MDBMask>
            </MDBView>
        )
    }
}

export default Parallax