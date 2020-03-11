import React from 'react'
import { 
    MDBBox, MDBRow, MDBCol, MDBCard, MDBIcon, MDBBtn, MDBInput
} from "mdbreact"
import Snackbar from "../../includes/Snackbar"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import $ from 'jquery'

class FormSkills extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            isLoaded: false,
            isNotif: false,
            notifCat: "default",
            notifStr: "",
            skillId: "",
            titleItems: [],
            isPresentDate: false,
            in_method: "edit",
            in_skillOptShow: true,
            in_key: 0,
            in_active_title: "",
            in_title: "",
            in_description: "",
            in_percent: "",
            in_code: "",
            in_start_in: "",
            in_end_in: ""
        }
    }

    // First load
    UNSAFE_componentWillMount() {
        this.getSkillsTitle()
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

    handleSkillsChange(event) {
        this.setState({
            isLoaded: false,
            isNotif: false,
            skillId: event.target.value
        })

        // Load ajax of get skills by id
        this.getSkillsById(event.target.value)
    }

    handleInputChange(fid, event) {
        this.setState({
            [fid]: event.target.value
        })
    }

    handleCheckChange(event) {
        this.setState({
            isPresentDate: event.target.checked
        })
    }

    handleDateChange(fid, date) {
        this.setState({
            [fid]: date
        })
    }

    handleDateKeyDown = event => {
        event.stopPropagation()
        event.preventDefault()
    }
    
    handleButtonAdd = () => {
        this.setState({
            in_method: "add",
            in_skillOptShow: false,
            isPresentDate: false,
            in_key: 0,
            in_active_title: "",
            in_title: "",
            in_description: "",
            in_percent: "",
            in_code: "",
            in_start_in: new Date(),
            in_end_in: new Date()
        })
    }

    handleButtonDelete = () => {
        this.setState({
            in_method: "delete",
            isLoaded: false,
            isNotif: false,
            notifCat: "default",
        })
        
        this.setSkillsData("delete")
    }

    handleButtonCancel = () => {
        this.setState({
            isLoaded: false,
            in_method: "edit",
            in_skillOptShow: true
        })

        // Load ajax of get skills by id
        this.getSkillsById(this.state.skillId)
    }

    handleButtonSubmit = () => {
        this.setState({
            isLoaded: false,
            isNotif: false,
            notifCat: "default",
        })
        
        
        // Run ajax of set skills data
        this.setSkillsData(this.state.in_method)
    }

    setSkillsData = (method) => {
        let endIn = this.state.in_end_in
        if ( this.state.isPresentDate ) {
            endIn = new Date("5000-12-31")
        }

        const data = {
            method: method,
            key: this.state.in_key,
            prev_title: this.state.in_active_title,
            title: this.state.in_title,
            description: this.state.in_description,
            percent: this.state.in_percent,
            code: this.state.in_code,
            start_in: this.state.in_start_in,
            end_in: endIn
        }

        $.ajax({
            url: "https://gutierrez-jerald-cv-be.herokuapp.com/api/setSkills",
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            cache: false
        }).then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    isNotif: true
                })
                console.log(result.response)

                // Conditional alert message
                if ( result.response || !result.response ) {
                    if ( this.state.in_method === "add" ) {
                        this.setState({
                            isLoaded: false,
                            in_skillOptShow: true,
                            notifCat: "success",
                            notifStr: "Added successfully!"
                        })

                        // Rerun all over the function of ajax from start
                        this.getSkillsTitle()

                    } else if ( this.state.in_method === "edit" ) {
                        this.setState({
                            prev_title: this.state.title,
                            notifCat: "success",
                            notifStr: "Successfully update!"
                        })
                    } else if ( this.state.in_method === "delete" ) {
                        this.setState({
                            isLoaded: false,
                            notifCat: "success",
                            notifStr: "Successfully deleted!"
                        })

                        // Rerun all over the function of ajax from start
                        this.getSkillsTitle()

                    } else {
                        this.setState({
                            notifCat: "warning",
                            notifStr: "Something went wrong!",
                        })
                    }
                } else if ( result.response === "duplicate" ) {
                    this.setState({
                        notifCat: "warning",
                        notifStr: "Duplicate record!",
                    })
                } else {
                    this.setState({
                        notifCat: "error",
                        notifStr: "Unexpected error, please reload the page!",
                        error: true
                    })
                }
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
            }
        )
    }

    getSkillsTitle = () => {
        $.ajax({
            url: "https://gutierrez-jerald-cv-be.herokuapp.com/api/getSkillsTitle",
            dataType: "json",
            cache: false
        })
        .then(
            (result) => {
                this.setState({
                    titleItems: result
                })

                if ( Object.keys(result).length !== 0 ) {
                    this.setState({
                        skillId: result[0].id
                    })

                    // Load ajax of get skills by id
                    this.getSkillsById(result[0].id)
                }
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

    getSkillsById(id) {
        $.ajax({
            url: "https://gutierrez-jerald-cv-be.herokuapp.com/api/getSkillById",
            dataType: "json",
            data: {
                'id': id
            },
            cache: false
        })
        .then(
            (result) => {
                let startInRes = result[0].start_in
                let endInRes = result[0].end_in
                let startIn = startInRes !== "" && startInRes !== undefined ? ( new Date(startInRes).getFullYear() + "-" + ( "0" + ( new Date(startInRes).getMonth()+1 ) ).slice(-2) + "-" + new Date(startInRes).getDate() ) : ( new Date() )
                let endIn = new Date()

                if ( endInRes !== "" && endInRes !== undefined ) {
                    this.setState({
                        // Default
                        isPresentDate: false
                    })
                    // Configuration for end date whether is it present date or not
                    new Date().getTime() > new Date(endInRes).getTime() ? (
                        // Already past the date
                        endIn = new Date(endInRes).getFullYear() + "-" + ( "0" + ( new Date(endInRes).getMonth()+1 ) ).slice(-2) + "-" + new Date(endInRes).getDate()
                    ) : (
                        // Still in this date
                        this.setState({
                            isPresentDate: true
                        })
                    )
                }
                
                this.setState({
                    isLoaded: true,
                    in_method: "edit",
                    in_key: result[0].id,
                    in_tag: this.returnStr(result[0].tag),
                    in_active_title: this.returnStr(result[0].title),
                    in_title: this.returnStr(result[0].title),
                    in_description: this.returnStr(result[0].description),
                    in_percent: this.returnStr(result[0].percent),
                    in_code: this.returnStr(result[0].code),
                    in_start_in: new Date(startIn),
                    in_end_in: new Date(endIn)
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

    renderButtonAction() {
        const method = this.state.in_method
        if ( method === 'edit' || method === 'delete' ) {
            return (
                <React.Fragment>
                    <MDBBtn type="button" className="btn-palette-2 btn-block mb-3" onClick={this.handleButtonAdd.bind(this)}>
                        <MDBIcon icon="plus" className="mr-2" />
                        Add Skill
                    </MDBBtn>
                    <MDBBtn type="button" color="danger" className="btn-block mb-3" onClick={this.handleButtonDelete.bind(this)}>
                        <MDBIcon icon="trash" className="mr-2" />
                        Delete
                    </MDBBtn>
                </React.Fragment>
            )
        } else if ( method === 'add' ) {
            return (
                <React.Fragment>
                    <MDBBtn type="button" color="danger" className="btn-block mb-3" onClick={this.handleButtonCancel.bind(this)}>
                        <MDBIcon icon="ban" className="mr-2" />
                        Cancel
                    </MDBBtn>
                </React.Fragment>
            )
        } else {
            // Do Nothing
        }
    }

    render() {
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
                        {
                            this.state.in_skillOptShow ? (
                                // Show this if editing
                                <MDBRow>
                                    <MDBCol md="3" className="d-flex align-self-center">
                                        <MDBBox tag="p" className="content-description m-0">Skill:</MDBBox>
                                    </MDBCol>
                                    <MDBCol md="9">
                                        <MDBBox tag="div" className="select-mdb-custom">
                                            <MDBBox tag="select" className="select-mdb-content" onChange={this.handleSkillsChange.bind(this)} value={this.state.skillId}>
                                                {
                                                    this.state.titleItems.map((item) => (
                                                        <MDBBox tag="option" key={item.id} value={item.id}>
                                                            {
                                                                item.code !== "" && item.code !== undefined ? (
                                                                    item.code.toUpperCase()
                                                                ) : (
                                                                    item.id
                                                                )
                                                            } - {item.title}
                                                        </MDBBox>
                                                    ))
                                                }
                                            </MDBBox>
                                            <MDBBox tag="span" className="select-mdb-bar"></MDBBox>
                                            <MDBBox tag="label" className="col select-mdb-label"></MDBBox>
                                        </MDBBox>
                                    </MDBCol>
                                </MDBRow>
                            ) : ("")
                        }

                        <MDBRow className="justify-content-center mt-3">
                            <MDBCol md="12">
                                <MDBCard className="card-body">
                                    <MDBInput containerClass="mt-0" label="Title" value={this.state.in_title} onChange={this.handleInputChange.bind(this, "in_title")} />
                                    <MDBInput containerClass="mt-0" label="Description" value={this.state.in_description} onChange={this.handleInputChange.bind(this, "in_description")} />
                                    <MDBInput containerClass="mt-0" label="Percent" value={this.state.in_percent} onChange={this.handleInputChange.bind(this, "in_percent")} />
                                    {
                                        this.state.in_method === "add" ? (
                                            <MDBInput containerClass="mt-0" label="Code" value={this.state.in_code} onChange={this.handleInputChange.bind(this, "in_code")} />
                                        ) : ("")
                                    }
                                    <MDBBox tag="div" className="md-form mt-0 mb-0">
                                        <MDBBox tag="label" className="active">Start In</MDBBox>
                                        <DatePicker
                                            selected={this.state.in_start_in}
                                            placeholderText="Choose date"
                                            className="form-control w-100"
                                            onChange={this.handleDateChange.bind(this, "in_start_in")}
                                            onKeyDown={this.handleDateKeyDown}
                                        />
                                    </MDBBox>
                                    <MDBInput containerClass="md-form mt-0 checkbox-mdb-custom" label="Is Present?" type="checkbox" id="isPresent-checkbox" checked={this.state.isPresentDate} onChange={this.handleCheckChange.bind(this)} />
                                    {
                                        !this.state.isPresentDate ? (
                                            <MDBBox tag="div" className="md-form mt-0">
                                                <MDBBox tag="label" className="active">End In</MDBBox>
                                                <DatePicker
                                                    selected={this.state.in_end_in}
                                                    placeholderText="Choose date"
                                                    className="form-control w-100"
                                                    onChange={this.handleDateChange.bind(this, "in_end_in")}
                                                    onKeyDown={this.handleDateKeyDown}
                                                />
                                            </MDBBox>
                                        ) : ("")
                                    }
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBCard>
                </MDBCol>
                <MDBCol md="4">
                    {this.renderButtonAction()}
                    <MDBBtn type="submit" className="btn-palette-1 btn-block" onClick={this.handleButtonSubmit.bind(this)}>
                        <MDBIcon icon="save" className="mr-2" />
                        Save
                    </MDBBtn>
                </MDBCol>
            </React.Fragment>
        )
    }
}

export default FormSkills