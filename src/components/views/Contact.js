import React from "react";
import Banner from './Banner'
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBBtn, MDBInput, MDBContainer, MDBBox } from "mdbreact";

class Contact extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            form: [
                {
                    id: 1,
                    label: "Enter your name",
                    icon: "user",
                    type: "text",
                    fid: "form-name"
                },
                {
                    id: 2,
                    label: "Enter your email",
                    icon: "envelope",
                    type: "email",
                    fid: "form-name"
                },
                {
                    id: 3,
                    label: "Enter your subject",
                    icon: "tag",
                    type: "text",
                    fid: "form-name",
                    iconClass: "fa-flip-horizontal"
                },
                {
                    id: 4,
                    label: "Write your message",
                    icon: "pencil-alt",
                    type: "textarea",
                    fid: "form-name",
                    maxlength: 250
                }
            ],
            info: [
                {
                    id: 1,
                    text: "Dalipit West, Alitagtag, Batangas, 4205",
                    icon: "map-marker-alt"
                },
                {
                    id: 2,
                    text: "+63 908 893 6797",
                    icon: "phone"
                },
                {
                    id: 3,
                    text: "gutierrez.jeralds@yahoo.com",
                    icon: "envelope"
                }
            ]
        }
    }

    render() {
        return (
            <MDBBox tag="div" className="contact-wrapper">
                <Banner wrapper="contact" />
                <MDBContainer className="pt-5 mt-5 contact-wrapper" id="contactContent">
                    <MDBRow>
                        <MDBCol lg="5" className="lg-0 mb-4">
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBBox tag="div" className="form-header contact-form-header blue accent-1">
                                        <MDBBox tag="h3" className="mt-2">
                                            <MDBIcon icon="envelope" /> Message me!
                                        </MDBBox>
                                    </MDBBox>
                                    {
                                        this.state.form.map(items => (
                                            <MDBBox tag="div" className="md-form" key={items.id}>
                                                {items.type === "textarea" ? (
                                                    <MDBInput icon={items.icon} label={items.label} iconClass="grey-text" type={items.type} id={items.fid} length={items.maxlength} maxLength={items.maxlength} />
                                                ) : (
                                                    <MDBInput icon={items.icon} label={items.label} iconClass={items.iconClass + " grey-text"} type={items.type} id={items.fid} />
                                                )}
                                            </MDBBox>
                                        ))
                                    }
                                    <MDBBox tag="div" className="text-center">
                                        <MDBBtn color="primary">
                                            <MDBIcon icon="paper-plane" className="mr-2" />
                                            Submit
                                        </MDBBtn>
                                    </MDBBox>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol lg="7">
                            <MDBBox tag="div" id="map-container" className="rounded z-depth-1-half map-container" style={{ height: "400px" }}  >
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30987.803371642072!2d121.00103316455555!3d13.870497291667654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd0c1e6a4aef21%3A0xd572d65f900bb6ec!2sAlitagtag%2C%20Batangas%2C%20Philippines!5e0!3m2!1sen!2spl!4v1575251913027!5m2!1sen!2spl"
                                title="This is a unique title" width="100%" height="100%" frameBorder="0" className="boder-0" />
                            </MDBBox>
                            <br />
                            <MDBRow className="text-center">
                                {
                                    this.state.info.map(items => (
                                        <MDBCol md="4" key={items.id}>
                                            <MDBBtn tag="a" floating color="light-blue" className="accent-1 contact-info-btn overflow-hidden position-relative p-0 rounded-circle align-middle">
                                                <MDBIcon icon={items.icon} />
                                            </MDBBtn>
                                            <MDBBox tag="p">{items.text}</MDBBox>
                                        </MDBCol>
                                    ))
                                }
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </MDBBox>
        )
    }
}

export default Contact;