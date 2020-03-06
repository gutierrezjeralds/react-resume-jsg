import React from 'react'
import { 
    MDBBox, MDBRow, MDBCol, MDBCard, MDBIcon, MDBBtn, MDBInput
} from "mdbreact"
import Snackbar from "../../includes/Snackbar"
import $ from 'jquery'

class FormSplash extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            isLoaded: false,
            isNotif: false,
            notifCat: "default",
            notifStr: "",
            in_page: "home",
            in_key: 0,
            in_title: "",
            in_description: "",
            in_slogan: "",
            in_button_string: "",
            in_button_link: "",
            in_button_icon: ""
        }
    }

    // First load
    UNSAFE_componentWillMount() {
        this.getSplashData("https://gutierrez-jerald-cv-be.herokuapp.com/api/getSplash/" + this.state.in_page)
    }

    returnStr(str) {
        try {
            if ( str !== null && str !== undefined && str !== "" ) {
                return str;
            } else {
                return "";
            }
        } catch (e) {
            return "";
        }
    }

    handlePageChange(event) {
        this.setState({
            isLoaded: false,
            isNotif: false,
            in_page: event.target.value
        })

        this.getSplashData("https://gutierrez-jerald-cv-be.herokuapp.com/api/getSplash/" + event.target.value)
    }

    handleInputChange(fid, event) {
        this.setState({
            [fid]: event.target.value
        })
    }

    handleButtonSubmit() {
        this.setState({
            isLoaded: false,
            isNotif: false,
            notifCat: "default",
        })
        
        this.setSplashData()
    }

    getSplashData = (uri) => {
        // const uri = "./assets/json/splash/" + this.state.page + ".json"
        $.ajax({
            url: uri,
            dataType: "json",
            cache: false
        })
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    in_key: result[0].id,
                    in_title: this.returnStr(result[0].title),
                    in_description: this.returnStr(result[0].description),
                    in_slogan: this.returnStr(result[0].slogan),
                    in_button_string: this.returnStr(result[0].button_string),
                    in_button_link: this.returnStr(result[0].button_link),
                    in_button_icon: this.returnStr(result[0].button_icon)
                })
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                    isLoaded: true,
                    isNotif: true,
                    notifCat: "error",
                    notifStr: "Unexpected error, please reload the page!",
                    error: true
                })

                console.error('Oh well, you failed. Here some thoughts on the error that occured:', error)
            }
        )
        .catch(
            (err) => {
                this.setState({
                    isLoaded: true,
                    isNotif: true,
                    notifCat: "error",
                    notifStr: "Unexpected error, please reload the page!",
                    error: true
                })
                
                console.error('Oh well, you failed. Here some thoughts on the error that occured:', err)
            }
        )
    }

    setSplashData = () => {
        const data = {
            key: this.state.in_key,
            page: this.state.in_page,
            title: this.state.in_title,
            description: this.state.in_description,
            slogan: this.state.in_slogan,
            button_string: this.state.in_button_string,
            button_link: this.state.in_button_link,
            button_icon: this.state.in_button_icon
        }

        $.ajax({
            url: "https://gutierrez-jerald-cv-be.herokuapp.com/api/setSplash",
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            cache: false
        }).then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    isNotif: true,
                    notifCat: "success",
                    notifStr: "Successfully update!"
                })
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                // Handle errors here
                this.setState({
                    isLoaded: true,
                    isNotif: true,
                    notifCat: "error",
                    notifStr: "Unexpected error, please reload the page!",
                    error: true
                })

                console.error('Oh well, you failed. Here some thoughts on the error that occured:', error)
            }
        )
        .catch(
            (err) => {
                // Handle errors here
                this.setState({
                    isLoaded: true,
                    isNotif: true,
                    notifCat: "error",
                    notifStr: "Unexpected error, please reload the page!",
                    error: true
                })
                
                console.error('Oh well, you failed. Here some thoughts on the error that occured:', err)
                alert("Unexpected error, please reload the page!")
            }
        )
    }

    renderElement() {
        return (
            <React.Fragment>
                {
                    !this.state.isLoaded ? (
                        // Loading
                    <MDBBox tag="div" className="loader-section">
                        <MDBBox tag="div" className="position-fixed z-index-9999 l-0 t-0 r-0 b-0 m-auto overflow-visible flex-center">
                            <MDBBox tag="span" className="loader-spin-dual-ring"></MDBBox>
                            <MDBBox tag="span" className="ml-2 font-size-1rem white-text">Loading, please wait...</MDBBox>
                        </MDBBox>
                        <MDBBox tag="div" className="loader-backdrop position-fixed z-index-1040 l-0 t-0 r-0 b-0 black"></MDBBox>
                    </MDBBox>
                    ) : ("")
                }

                {
                    this.state.isNotif ? (
                        <Snackbar category={this.state.notifCat} string={this.state.notifStr} />
                    ) : ("")
                }

                <MDBCol md="8" className="mb-3">
                    <MDBCard className="card-body">
                        <MDBRow>
                            <MDBCol md="3" className="d-flex align-self-center">
                                <MDBBox tag="p" className="content-description m-0">Page:</MDBBox>
                            </MDBCol>
                            <MDBCol md="9">
                                <MDBBox tag="div" className="select-mdb-custom">
                                    <MDBBox tag="select" className="select-mdb-content" onChange={this.handlePageChange.bind(this)} value={this.state.in_page}>
                                        <MDBBox tag="option" value="home">Home</MDBBox>
                                        <MDBBox tag="option" value="portfolio">Portfolio</MDBBox>
                                        <MDBBox tag="option" value="resume">Resume</MDBBox>
                                        <MDBBox tag="option" value="contact">Contact</MDBBox>
                                        <MDBBox tag="option" value="notFound-404">Not Found 404</MDBBox>
                                    </MDBBox>
                                    <MDBBox tag="span" className="select-mdb-bar"></MDBBox>
                                    <MDBBox tag="label" className="col select-mdb-label"></MDBBox>
                                </MDBBox>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className="justify-content-center mt-3">
                            <MDBCol md="12">
                                <MDBCard className="card-body">
                                    <MDBInput containerClass="mt-0" label="Title" value={this.state.in_title} onChange={this.handleInputChange.bind(this, "in_title")} />
                                    <MDBInput containerClass="mt-0" label="Description" value={this.state.in_description} onChange={this.handleInputChange.bind(this, "in_description")} />
                                    <MDBInput containerClass="mt-0" label="Slogan" value={this.state.in_slogan} onChange={this.handleInputChange.bind(this, "in_slogan")} />
                                    <MDBRow className="justify-content-center">
                                        <MDBCol md="12">
                                            <MDBCard className="card-body">
                                                <MDBBox tag="span" className="w-100 d-block mb-2">Button:</MDBBox>
                                                <MDBInput containerClass="mt-0" label="String" value={this.state.in_button_string} onChange={this.handleInputChange.bind(this, "in_button_string")} />
                                                <MDBInput containerClass="mt-0" label="Link" value={this.state.in_button_link} onChange={this.handleInputChange.bind(this, "in_button_link")} />
                                                <MDBInput containerClass="m-0" label="Icon" value={this.state.in_button_icon} onChange={this.handleInputChange.bind(this, "in_button_icon")} />
                                            </MDBCard>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBCard>
                </MDBCol>
                <MDBCol md="4">
                    <MDBBtn type="submit" className="btn-palette-1 btn-block" onClick={this.handleButtonSubmit.bind(this)}>
                        <MDBIcon icon="save" className="mr-2" />
                        Save
                    </MDBBtn>
                </MDBCol>
            </React.Fragment>
        )
    }

    render() {
        return(
            <React.Fragment>
                {this.renderElement()}
            </React.Fragment>
        )
    }
}

export default FormSplash