import React from 'react'
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBContainer
} from "mdbreact";
import { MDBBox } from 'mdbreact'
import { Link } from 'react-router-dom'

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        };
    }
    
    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        return (
            <MDBBox tag="header">
                <MDBNavbar scrolling fixed="top" dark expand="lg">
                    <MDBContainer>
                        <MDBNavbarBrand>
                            <Link to="/">
                                <MDBBox tag="p" className="logo-text d-dlock m-0 text-center font-size-1pt5rem z-depth-0 rounded-circle">JG</MDBBox>
                            </Link>
                        </MDBNavbarBrand>
                        <MDBNavbarToggler onClick={this.toggleCollapse} />
                        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                            <MDBNavbarNav left className="w-100 d-flex align-items-lg-center justify-content-lg-center">
                                <MDBNavItem active>
                                    <MDBNavLink to="/">Home</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBNavLink to="/portfolio">Portfolio</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBNavLink to="/resume">Resume</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBNavLink to="/contact">Contact</MDBNavLink>
                                </MDBNavItem>
                            </MDBNavbarNav>
                        </MDBCollapse>
                    </MDBContainer>
                </MDBNavbar>
            </MDBBox>
        )
    }
}

export default Header