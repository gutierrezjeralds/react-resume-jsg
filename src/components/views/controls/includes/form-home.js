import React from 'react'
import { 
    MDBBox, MDBRow, MDBCol, MDBCard, MDBIcon, MDBBtn, MDBInput
} from "mdbreact"
import Snackbar from "../../includes/Snackbar"
import $ from 'jquery'

class FormHome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            isLoaded: false,
            isNotif: false,
            notifCat: "default",
            notifStr: "",
            in_key: 0,
            in_title: "",
            in_description: ""
        }
    }

    // First load
    UNSAFE_componentWillMount() {
        this.getHomeData("https://gutierrez-jerald-cv-be.herokuapp.com/api/getHome")
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
        
        this.setHomeData()
    }

    getHomeData = (uri) => {
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

    setHomeData = () => {
        const data = {
            key: this.state.in_key,
            title: this.state.in_title,
            description: this.state.in_description
        }

        $.ajax({
            url: "https://gutierrez-jerald-cv-be.herokuapp.com/api/setHome",
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
                console.log(result)
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

    render() {
        return(
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
                        <MDBRow className="justify-content-center">
                            <MDBCol md="12">
                                <MDBInput containerClass="mt-0" label="Title" value={this.state.in_title} onChange={this.handleInputChange.bind(this, "in_title")} />
                                <MDBInput containerClass="mt-0" label="Description" type="textarea" value={this.state.in_description} onChange={this.handleInputChange.bind(this, "in_description")} />
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
}

export default FormHome