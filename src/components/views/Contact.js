import React from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBBtn, MDBInput, MDBContainer, MDBBox } from "mdbreact"
import ReCAPTCHA from "react-google-recaptcha";
import Parallax from './includes/Parallax'
import $ from 'jquery'

class Contact extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            in_submit: false,
            in_name: "",
            in_email: "",
            in_subject: "",
            in_message: "",
            in_reCaptcha: "",
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
                    text: "Batangas City, 4200",
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

    handleReCaptchaChange(value) {
        this.setState({
            in_reCaptcha: value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.sendMessage()
    }

    sendMessage() {
        if ( this.state.in_reCaptcha !== "" ) {
            const eDMData = {
                service_id: "gmail",
                template_id: "template_gwqFwjqA",
                user_id: "user_DKcMwG40VRnkIFionziRA",
                template_params: {
                    "from_name": this.state.in_name,
                    "reply_to": this.state.in_email,
                    "subject": this.state.in_subject,
                    "message": this.state.in_message,
                    "g-recaptcha-response": this.state.in_reCaptcha
                }
            }

            this.setState({
                in_submit: true
            })
    
            $.ajax({
                url: "https://api.emailjs.com/api/v1.0/email/send",
                type: 'POST',
                data: JSON.stringify(eDMData),
                contentType: 'application/json',
                cache: false
            })
            .then(
                (result) => {
                    console.log('Message successfully sent!', result)
                    alert("Message successfully sent!")
                    window.location.reload()
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    // Handle errors here
                    this.setState({
                        in_submit: false
                    })

                    console.error('Oh well, you failed. Here some thoughts on the error that occured:', error)
                    alert("Unexpected error, please reload the page!")
                }
            )
            .catch(
                (err) => {
                    // Handle errors here
                    this.setState({
                        in_submit: false
                    })
                    
                    console.error('Oh well, you failed. Here some thoughts on the error that occured:', err)
                    alert("Unexpected error, please reload the page!")
                }
            )
        } else {
            alert("Please accept reCaptcha!")
        }
    }

    renderSubmitElement(){
        if ( this.state.in_submit ) {
            // Already clicked the submit button
            return (
                <MDBBtn type="submit" className="btn-palette-1 cursor-not-allowed" disabled>
                    <MDBIcon icon="spinner" className="fa-spin mr-2" />
                    Loading
                </MDBBtn>
            )
        } else {
            // Onload element display
            return (
                <MDBBtn type="submit" className="btn-palette-1">
                    <MDBIcon icon="paper-plane" className="mr-2" />
                    Submit
                </MDBBtn>
            )
        }
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
                                    <MDBBox tag="div" className="form-header contact-form-header">
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
                                        <MDBBox tag="div" className="md-form flex-center">
                                            <ReCAPTCHA 
                                                sitekey="6Let3csUAAAAANhYJr1yZINe-G7ZZXPP1rPCvXZS" 
                                                onChange={this.handleReCaptchaChange.bind(this)} 
                                            />
                                        </MDBBox>
                                        <MDBBox tag="div" className="text-center">
                                            {this.renderSubmitElement()}
                                        </MDBBox>
                                    </form>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol lg="7">
                            <MDBBox tag="div" id="map-container" className="rounded z-depth-1-half map-container" style={{ height: "400px" }}  >
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248097.06049634505!2d120.96484491363832!3d13.687134028577619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd1b1d4c1cd013%3A0xe4592a820e411177!2sBatangas%2C%20Philippines!5e0!3m2!1sen!2spl!4v1578458215186!5m2!1sen!2spl"
                                title="Google Map" width="100%" height="100%" frameBorder="0" className="boder-0" />
                            </MDBBox>
                            <br />
                            <MDBRow className="text-center">
                                {
                                    this.state.info.map(items => (
                                        <MDBCol md="4" key={items.id}>
                                            <MDBBtn tag="a" floating className="btn-palette-2 contact-info-btn overflow-hidden position-relative p-0 rounded-circle align-middle">
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
                <Parallax
                    container="parallax-bottom-palette"
                    description="Feel free to take a deeper look at what I'm able to do and what experienced and educational background I have."
                    overlay="stylish-slight"
                    color="black"
                    colorText=""
                    btnTitle="View My Resume"
                    btnIcon="link"
                    btnUri="/resume"
                />
            </MDBBox>
        )
    }
}

export default Contact;