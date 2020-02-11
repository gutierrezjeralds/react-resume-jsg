import React from 'react'
import { MDBAnimation, MDBView, MDBMask, MDBBtn, MDBBox, MDBIcon } from "mdbreact"
import { Link } from 'react-router-dom'
import $ from 'jquery'

class Splash extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: this.props.wrapper,
            error: false,
            isLoaded: false,
            items: []
        }
    }

    UNSAFE_componentWillMount() {
        this.getSplashData()
    }

    getSplashData() {
        // const uri = "./assets/json/splash/" + this.state.page + ".json"
        const uri = "https://gutierrez-jerald-cv-be.herokuapp.com/api/getSplash/" + this.state.page
        $.ajax({
            url: uri,
            dataType: "json",
            cache: false
        })
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result
                })
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                    isLoaded: true,
                    error: true
                })
                    
                console.error('Oh well, you failed. Here some thoughts on the error that occured:', error)
                alert("Unexpected error, please reload the page!")
            }
        )
        .catch(
            (err) => {
                this.setState({
                    isLoaded: true,
                    error: true
                })
                    
                console.error('Oh well, you failed. Here some thoughts on the error that occured:', err)
                alert("Unexpected error, please reload the page!")
            }
        )
    }

    displayChevronDown(anchor) {
        // Display arrow down
        const id = this.state.page + "Content" //"Content" based in other class function
        if ( !anchor ) {
            return (
                <MDBBox tag="a" onClick={this.handleClickedAnchor.bind(this, id)}>
                    <MDBAnimation type="bounce" infinite>
                        <MDBIcon icon="chevron-down" className="fa-3x ml-2" />
                    </MDBAnimation>
                </MDBBox>
            )
        }
    }

    handleClickedAnchor(id) {
        let elemId = document.getElementById(id)
        window.scrollTo({
            top: elemId.offsetTop,
            behavior: "smooth"
        })
    }

    renderData = () => {
        if ( this.state.error ) {
            return (
                // Has error
                <MDBBox tag="div" className="error-section flex-center">
                    <MDBBox tag="span" className="font-size-2rem">Unexpected error, please reload the page.</MDBBox>
                </MDBBox>
            )
        } else if ( !this.state.isLoaded ) {
            return (
                // Loading
                <MDBBox tag="div" className="loader-section">
                    <MDBBox tag="div" className="position-fixed z-index-9999 l-0 t-0 r-0 b-0 m-auto overflow-visible flex-center">
                        <MDBBox tag="span" className="loader-spin-dual-ring"></MDBBox>
                        <MDBBox tag="span" className="ml-2 font-size-1rem">Loading, please wait...</MDBBox>
                    </MDBBox>
                    <MDBBox tag="div" className="loader-backdrop position-fixed z-index-1040 l-0 t-0 r-0 b-0 black"></MDBBox>
                </MDBBox>
            )
        } else {
            if ( Object.keys(this.state.items).length !== 0 ) {
                return (
                    // Success render
                    <MDBAnimation type="fadeIn" className="text-center mx-5 wow font-family-architects-daughter">
                        {
                            this.state.items.map((item, index) => (
                                Object.keys(this.state.items).length === index + 1 ? (
                                    <MDBBox tag="div" key={item.id}>
                                        {
                                            item.title !== "" ? (
                                                <MDBBox tag="span" className="title font-weight-light font-size-6rem d-block">{item.title}</MDBBox>
                                            ) : ("")
                                        }
                                        {
                                            item.description !== "" ? (
                                                <MDBBox tag="span" className="sub-title font-weight-light font-size-3rem d-block">{item.description}</MDBBox>
                                            ) : ("")
                                        }
                                        {
                                            item.slogan !== "" ? (
                                                <MDBBox tag="span" className="slogan font-weight-light d-block">{item.slogan} <span>|</span></MDBBox>
                                            ) : ("")
                                        }
                                        {
                                            item.button_string !== "" ? (
                                                <MDBBtn outline>
                                                    <Link to={item.button_link}>
                                                        <MDBIcon icon={item.button_icon} className="mr-2" />
                                                        {item.button_string}
                                                    </Link>
                                                </MDBBtn>
                                            ) : (this.displayChevronDown(false))
                                        }
                                    </MDBBox>
                                ) : ("")
                            ))
                        }
                    </MDBAnimation>
                )
            }
        }
    }

    render() {
        return (
            <MDBBox tag="div" className="splash-wrapper">
                <MDBView className={this.props.wrapper + "-splash splash-content"}>
                    <MDBMask className="flex-center" overlay="black-strong">
                        {this.renderData()}
                    </MDBMask>
                </MDBView>
            </MDBBox>
        )
    }
}

export default Splash