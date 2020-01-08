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
        const uri = "./assets/json/splash/" + this.state.page + ".json"
        // const uri = "https://gutierrez-jerald-cv-be.herokuapp.com/getSplash/" + this.state.page
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
                console.log(error.statusText)
                this.setState({
                    isLoaded: true,
                    error: true
                })
            }
        )
        .catch(
            (err) => {
                console.error(err)
            }
        )
    }

    displayChevronDown(anchor) {
        const id = this.state.page + "Content" //"Content" based in other class function
        if ( !anchor ) {
            return (
                <MDBBox tag="a" className="white-text" onClick={this.handleClickedAnchor.bind(this, id)}>
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

    render() {
        const { error, isLoaded, items } = this.state
        let anchor = false
        return (
            <MDBBox tag="div" className="splash-wrapper">
                <MDBView className={this.props.wrapper + "-splash splash-content"}>
                    <MDBMask className="flex-center" overlay="black-strong">
                        {
                            error ? (
                                // Has error
                                <MDBBox tag="div" className="error-section flex-center">
                                    <MDBBox tag="span" className="font-size-2rem white-text">Unexpected error, please reload the page.</MDBBox>
                                </MDBBox>
                            ) : (
                                !isLoaded ? (
                                    // Loading
                                    <MDBBox tag="div" className="loader-section">
                                        <MDBBox tag="div" className="position-fixed z-index-9999 l-0 t-0 r-0 b-0 m-auto overflow-visible flex-center">
                                            <MDBBox tag="span" className="loader-spin-dual-ring"></MDBBox>
                                            <MDBBox tag="span" className="ml-2 white-text font-size-1rem">Loading, please wait...</MDBBox>
                                        </MDBBox>
                                        <MDBBox tag="div" className="loader-backdrop position-fixed z-index-1040 l-0 t-0 r-0 b-0 black"></MDBBox>
                                    </MDBBox>
                                ) : (
                                    // Success render
                                    <MDBAnimation type="fadeIn" className="text-center white-text mx-5 wow font-family-architects-daughter">
                                        {
                                            items.map((item, index) => (
                                                <MDBBox tag="div" key={item.id}>
                                                    {
                                                        item.category === "title" ? (
                                                            <MDBBox tag="span" className="title font-weight-light font-size-6rem d-block">{item.string}</MDBBox>
                                                        ) : (
                                                            item.category === "description" ? (
                                                                <MDBBox tag="span" className="sub-title font-weight-light font-size-3rem d-block">{item.string}</MDBBox>
                                                            ) : (
                                                                item.category === "slogan" ? (
                                                                    <MDBBox tag="span" className="slogan font-weight-light d-block">{item.string} <span>|</span></MDBBox>
                                                                ) : (
                                                                    item.category === "anchor" ? (
                                                                        <MDBBtn outline color="white">
                                                                            <Link to={item.uri} className="white-text">
                                                                                <MDBIcon icon={item.fa_icon} className="mr-2" />
                                                                                {item.string}
                                                                            </Link>
                                                                            {anchor = true}
                                                                        </MDBBtn>
                                                                    ) : ("")
                                                                )
                                                            )
                                                        )
                                                    }
                                                </MDBBox>
                                            ))
                                        }
                                        {/* Display arrow down */}
                                        {this.displayChevronDown(anchor)}
                                    </MDBAnimation>
                                )
                            )
                        }
                    </MDBMask>
                </MDBView>
            </MDBBox>
        )
    }
}

export default Splash