import React from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBBtn, MDBInput, MDBContainer } from "mdbreact";
import { MDBAnimation, MDBView, MDBMask, MDBBox } from "mdbreact";
import { Link } from 'react-router-dom';

class Contact extends React.Component {
    render() {
        return (
            <MDBBox tag="div" className="contact-wrapper">
                <MDBView className="contact-banner">
                    <MDBMask className="flex-center" overlay="black-strong">
                        <MDBAnimation type="fadeIn" className="text-center white-text mx-5 wow">
                            <MDBBox tag="h1" className="mb-4 font-weight-light">Connect with me today.</MDBBox>
                                <MDBBox tag="a" href="#contactContent" className="white-text">
                                    <MDBAnimation type="bounce" infinite>
                                        <MDBIcon icon="chevron-down" className="fa-3x ml-2" />
                                    </MDBAnimation>
                                </MDBBox>
                        </MDBAnimation>
                    </MDBMask>
                </MDBView>
                <MDBContainer className="pt-5" id="contactContent">
                    <MDBRow>
                        <MDBCol lg="5" className="lg-0 mb-4">
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBBox tag="div" className="form-header blue accent-1">
                                        <MDBBox tag="h3" className="mt-2">
                                            <MDBIcon icon="envelope" /> Write to us:
                                        </MDBBox>
                                    </MDBBox>
                                    <MDBBox tag="p" className="dark-grey-text">
                                        We'll write rarely, but only the best content.
                                    </MDBBox>
                                    <MDBBox tag="div" className="md-form">
                                        <MDBInput icon="user" abel="Your name" iconClass="grey-text" type="text" id="form-name" />
                                    </MDBBox>
                                    <MDBBox tag="div" className="md-form">
                                        <MDBInput icon="envelope" label="Your email" iconClass="grey-text" type="text" id="form-email" />
                                    </MDBBox>
                                    <MDBBox tag="div" className="md-form">
                                        <MDBInput icon="tag" label="Subject" iconClass="grey-text" type="text" id="form-subject" />
                                    </MDBBox>
                                    <MDBBox tag="div" className="md-form">
                                        <MDBInput icon="pencil-alt" label="Icon Prefix" iconClass="grey-text" type="textarea" id="form-text" />
                                    </MDBBox>
                                    <MDBBox tag="div" className="text-center">
                                        <MDBBtn color="light-blue">Submit</MDBBtn>
                                    </MDBBox>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol lg="7">
                            <MDBBox tag="div" id="map-container" className="rounded z-depth-1-half map-container" style={{ height: "400px" }}  >
                                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d76765.98321148289!2d-73.96694563267306!3d40.751663750099084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spl!2spl!4v1525939514494"
                                title="This is a unique title" width="100%" height="100%" frameBorder="0" style={{ border: 0 }} />
                            </MDBBox>
                            <br />
                            <MDBRow className="text-center">
                                <MDBCol md="4">
                                    <MDBBtn tag="a" floating color="blue" className="accent-1">
                                        <MDBIcon icon="map-marker-alt" />
                                    </MDBBtn>
                                    <p>New York, 94126</p>
                                    <p className="mb-md-0">United States</p>
                                    </MDBCol>
                                    <MDBCol md="4">
                                <MDBBtn tag="a" floating color="blue" className="accent-1">
                                    <MDBIcon icon="phone" />
                                    </MDBBtn>
                                    <p>+ 01 234 567 89</p>
                                    <p className="mb-md-0">Mon - Fri, 8:00-22:00</p>
                                </MDBCol>
                                <MDBCol md="4">
                                    <MDBBtn tag="a" floating color="blue" className="accent-1">
                                        <MDBIcon icon="envelope" />
                                    </MDBBtn>
                                    <p>info@gmail.com</p>
                                    <p className="mb-md-0">sale@gmail.com</p>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </MDBBox>
        )
    }
}

export default Contact;