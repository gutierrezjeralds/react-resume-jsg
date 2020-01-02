import React from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBBtn, MDBInput, MDBContainer, MDBBox } from "mdbreact"

class Contact extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            in_name: "",
            in_email: "",
            in_subject: "",
            in_message: "",
            form: [
                {
                    id: 1,
                    label: "Enter your name",
                    icon: "user",
                    type: "text",
                    fid: "in_name"
                },
                {
                    id: 2,
                    label: "Enter your email",
                    icon: "envelope",
                    type: "email",
                    fid: "in_email"
                },
                {
                    id: 3,
                    label: "Enter your subject",
                    icon: "tag",
                    type: "text",
                    fid: "in_subject",
                    iconClass: "fa-flip-horizontal"
                },
                {
                    id: 4,
                    label: "Write your message",
                    icon: "pencil-alt",
                    type: "textarea",
                    fid: "in_message",
                    maxlength: 250
                }
            ],
            info: [
                {
                    id: 1,
                    text: "Alitagtag, Batangas, 4205",
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

    handleChange(fid, event) {
        this.setState({
            [fid]: event.target.value
        })
    }

    handleSubmit (event) {
        event.preventDefault();
        this.sendMessage(
            "template_gwqFwjqA", //Template ID
            {
                from_name: this.state.in_name,
                reply_to: this.state.in_email,
                subject: this.state.in_subject,
                message: this.state.in_message
            }
        )
    }

    sendMessage (templateId, variables) {
        window.emailjs.send(
            'gmail', templateId, variables
        ).then(
            (res) => {
                console.log('Message successfully sent!', res)
                alert("Message successfully sent!")
                window.location.reload()
            }
        )
        .catch(
            // Handle errors here
            (err) => {
                console.error('Oh well, you failed. Here some thoughts on the error that occured:', err)
                alert("Unexpected error, please reload the page!")
            }
        )
    }

    render() {
        document.title = "Contact | Jerald Gutierrez"
        return (
            <MDBBox tag="div" className="contact-wrapper">
                <MDBBox tag="div" className="position-absolute py-4 mt-6rem-neg" id="contactContent"></MDBBox>
                <MDBContainer className="py-5 my-5 contact-wrapper">
                    <MDBRow>
                        <MDBCol lg="5" className="lg-0 mb-4">
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBBox tag="div" className="form-header contact-form-header blue accent-2">
                                        <MDBBox tag="h3" className="mt-2">
                                            <MDBIcon icon="envelope" /> Message me!
                                        </MDBBox>
                                    </MDBBox>
                                    <form onSubmit={this.handleSubmit.bind(this)}>
                                        {
                                            this.state.form.map(items => (
                                                <MDBBox tag="div" className="md-form" key={items.id}>
                                                    {items.type === "textarea" ? (
                                                        <MDBInput onChange={this.handleChange.bind(this, items.fid)} icon={items.icon} label={items.label} iconClass="grey-text" type={items.type} id={items.fid} length={items.maxlength} maxLength={items.maxlength} required />
                                                    ) : (
                                                        <MDBInput onChange={this.handleChange.bind(this, items.fid)} icon={items.icon} label={items.label} iconClass={items.iconClass + " grey-text"} type={items.type} id={items.fid} required />
                                                    )}
                                                </MDBBox>
                                            ))
                                        }
                                        <MDBBox tag="div" className="text-center">
                                            <MDBBtn type="submit" color="primary">
                                                <MDBIcon icon="paper-plane" className="mr-2" />
                                                Submit
                                            </MDBBtn>
                                        </MDBBox>
                                    </form>
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