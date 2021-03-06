import React from 'react'
import { 
    MDBBox, MDBRow, MDBCol, MDBCard, MDBIcon, MDBBtn, MDBInput
} from "mdbreact"
import Snackbar from "../../includes/Snackbar"
import { Multiselect } from 'multiselect-react-dropdown'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import $ from 'jquery'

class FormProjects extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            isLoaded: false,
            isNotif: false,
            notifCat: "default",
            notifStr: "",
            projectId: "",
            titleItems: [],
            expItems: [],
            skillItems: [],
            fileSrc: "",
            fileLoaded: false,
            fileChange: false,
            in_method: "edit",
            in_projOptShow: true,
            in_key: 0,
            in_tag: "",
            in_company: "",
            in_title: "",
            in_category: "",
            in_skills: "",
            in_description: "",
            in_image: "",
            in_website: "",
            in_start_in: ""
        }
    }

    // First load
    UNSAFE_componentWillMount() {
        this.getProjectsTitle()
    }

    isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
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

    handleProjectChange(event) {
        this.setState({
            isLoaded: false,
            isNotif: false,
            projectId: event.target.value
        })

        // Load ajax of get projects by id
        this.getProjectById(event.target.value)
    }

    handleInputChange(fid, event) {
        this.setState({
            [fid]: event.target.value
        })
    }

    handleCatChange(event) {
        this.setState({
            in_category: event.target.value
        })
    }

    onSelectSkills = (selectedList, selectedItem) => {
        let skillsLength = this.state.skillItems.length
        let selectedLength = selectedList.length

        // Update in_skills item
        this.setState({
            in_skills: selectedList
        })

        if ( selectedLength - 1 >= skillsLength ) {
            // Hide input search
            $(".project-form-skills").find("input.searchBox").addClass("d-none")
        }
    }
    
    onRemoveSkills = (selectedList, removedItem) => {
        let skillsLength = this.state.skillItems.length
        let selectedLength = selectedList.length

        // Update in_skills item
        this.setState({
            in_skills: selectedList
        })

        if ( selectedLength - 1 < skillsLength ) {
            // Show input search
            $(".project-form-skills").find("input.searchBox").removeClass("d-none")
        }
    }

    handleDateChange = date => {
        this.setState({
            in_start_in: date
        })
    }

    handleDateKeyDown = event => {
        event.stopPropagation()
        event.preventDefault()
    }

    handleUploadClick(fid){
        let input = document.getElementById(fid);
        input.click();
    };

    handleUploadChange(fileType, fileSize, event) {
        try {
            if(window.FileReader){
                let fileTypeArr = []
                let file = event.target.files[0]
    
                if ( file !== "" && file !== undefined ) {
                    let extension = file.name.split('.').pop().toLowerCase()
                    let fileTypeAccept = false
                    let fileSizeAccept = false
    
                    // Check if file is allowed by filetypes
                    if ( fileType !== "" && fileType !== undefined ) {
                        fileType.split(",").map(type => (
                            fileTypeArr.push(type)
                        ))

                        fileTypeAccept = fileTypeArr.indexOf(extension) > -1
                    }

                    // Check if file is allowed by file size
                    if ( fileSize !== "" && fileSize !== undefined ) {
                        let size = fileSize.match(/\d+/)
                        let bytes = (size * 1024) * 1024
                        if ( file.size < bytes ) {
                            fileSizeAccept =  true
                        }
                    }
                    
                    // Run reader function
                    if ( fileTypeAccept || fileType === "" ) {
                        if ( fileSizeAccept || fileSize === "" ) {
                            let reader = new FileReader()
                            let set = this
        
                            reader.onload = function(evnt){
                                set.setState({
                                    fileSrc: evnt.target.result,
                                    fileLoaded: true,
                                    fileChange: true
                                });
                            }
        
                            reader.readAsDataURL(file);
                            this.setState({
                                in_image: reader
                            });

                        } else {
                            this.setState({
                                fileLoaded: false,
                                fileChange: false,
                                isNotif: true,
                                notifCat: "error",
                                notifStr: "File is not allowed! Maximum file size: " + fileSize
                            })
                        }
                    } else {
                        this.setState({
                            fileLoaded: false,
                            fileChange: false,
                            isNotif: true,
                            notifCat: "error",
                            notifStr: "File is not supported! Availabe file types: " + fileType
                        })
                    }
                }
            } else {
                this.setState({
                    fileLoaded: false,
                    fileChange: false,
                    isNotif: true,
                    notifCat: "error",
                    notifStr: "Sorry, your browser does'nt support file upload!"
                })
            }
        } catch (error) {
            this.setState({
                fileLoaded: false,
                fileChange: false,
                isNotif: true,
                notifCat: "error",
                notifStr: "Unexpected error, please reload the page!",
            })
                
            console.error('Oh well, you failed. Here some thoughts on the error that occured:', error)
        }
    }

    handleUploadSubmit = event => {
        event.preventDefault()
        let formData = new FormData( $("#fileUploadForm")[0] )

        $.ajax({
            url: "https://gutierrez-jerald-cv-be.herokuapp.com/api/set-file-upload/project",
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            cache: false
        }).then(
            (result) => {
                this.setState({
                    in_image: result.response !== "fail" ? result.response : ""
                })

                // Run ajax of set project data
                this.setProjectsData(this.state.in_method)
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                // Handle errors here
                this.setState({
                    isNotif: true,
                    notifCat: "error",
                    notifStr: "Something went wrong while uploading image!",
                    error: true
                })

                // Run ajax of set project data
                this.setProjectsData(this.state.in_method)

                console.error('Oh well, you failed. Here some thoughts on the error that occured:', error)
            }
        )
        .catch(
            (err) => {
                // Handle errors here
                this.setState({
                    isNotif: true,
                    notifCat: "error",
                    notifStr: "Something went wrong while uploading image!",
                    error: true
                })

                // Run ajax of set project data
                this.setProjectsData(this.state.in_method)
                
                console.error('Oh well, you failed. Here some thoughts on the error that occured:', err)
            }
        )
    }

    handleButtonAdd = () => {
        this.setState({
            in_method: "add",
            in_projOptShow: false,
            in_key: 0,
            in_title: "",
            in_skills: [],
            in_description: "",
            in_image: "",
            in_website: "",
            in_start_in: new Date(),
            fileSrc: "",
            fileLoaded: false,
            fileChange: false,
        })
    }

    handleButtonDelete = () => {
        this.setState({
            in_method: "delete",
            isLoaded: false,
            isNotif: false,
            notifCat: "default",
        })
        
        this.setProjectsData("delete")
    }

    handleButtonCancel = () => {
        this.setState({
            isLoaded: false,
            in_method: "edit",
            in_projOptShow: true
        })

        // Load ajax of get projects by id
        this.getProjectById(this.state.projectId)
    }

    handleButtonSubmit = () => {
        this.setState({
            isLoaded: false,
            isNotif: false,
            notifCat: "default",
        })
        
        if ( this.state.fileChange ) {
            // Run file upload first / fileChange is global variable when input file has change
            let input = document.getElementById("fileUploadForm-id");
            input.click();
        } else {
            // Run ajax of set project data
            this.setProjectsData(this.state.in_method)
        }
    }

    setProjectsData = (method) => {
        const { in_key, in_tag, in_company, in_title, in_category, in_description, in_image, in_website, in_start_in, in_skills } = this.state
        // Validation
        let errorCount = ""
        $(".md-form, .has-error").removeClass("has-error")
        if ( in_title === "" || in_title === undefined ) {
            $(".in_title").addClass("has-error")
            errorCount ++
        }
        if ( in_start_in === "" || in_start_in === undefined ) {
            $(".in_start_in").addClass("has-error")
            errorCount ++
        }

        let errorMsg = errorCount.length === 0
        if ( !errorMsg ) {
            this.setState({
                isLoaded: true,
                isNotif: true,
                notifCat: "error",
                notifStr: "Please fill in the required fields!",
            })
        } else {
            const data = {
                method: method,
                key: in_key,
                tag: in_tag,
                company: in_company,
                title: in_title,
                category: in_category,
                description: in_description,
                image: in_image,
                website: in_website,
                start_in: in_start_in,
                skills: JSON.stringify(in_skills)
            }
    
            $.ajax({
                url: "https://gutierrez-jerald-cv-be.herokuapp.com/api/setProjects",
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
    
                    // Conditional alert message
                    console.log(result)
                    if ( result.response ) {
                        if ( this.state.in_method === "add" ) {
                            this.setState({
                                isLoaded: false,
                                in_projOptShow: true,
                                notifCat: "success",
                                notifStr: "Added successfully!"
                            })
    
                            // Rerun all over the function of ajax from start
                            this.getProjectsTitle()

                        } else if ( this.state.in_method === "edit" ) {
                            this.setState({
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
                            this.getProjectsTitle()
    
                        } else {
                            this.setState({
                                notifCat: "warning",
                                notifStr: "Something went wrong!",
                            })
                        }
                    } else if ( !result.response ) {
                        this.setState({
                            notifCat: "warning",
                            notifStr: "Something went wrong!",
                        })
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
    }

    getProjectsTitle = () => {
        $.ajax({
            url: "https://gutierrez-jerald-cv-be.herokuapp.com/api/getProjectsTitle",
            dataType: "json",
            cache: false
        })
        .then(
            (result) => {
                this.setState({
                    titleItems: result
                })

                // Set the first id of title to call in get project by id
                if ( Object.keys(result).length !== 0 ) {
                    this.setState({
                        projectId: result[0].id
                    })
                }

                // Load ajax of get projects by id
                this.getExperience()
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

    getExperience(){
        $.ajax({
            url: "https://gutierrez-jerald-cv-be.herokuapp.com/api/getExperienceTag",
            dataType: "json",
            cache: false
        })
        .then(
            (result) => {
                this.setState({
                    expItems: result
                })

                // Load ajax of get skills for multi select option
                this.getSkillsMultiSelect()
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

    getSkillsMultiSelect(){
        $.ajax({
            url: "https://gutierrez-jerald-cv-be.herokuapp.com/api/multi-select-skills",
            dataType: "json",
            cache: false
        })
        .then(
            (result) => {
                this.setState({
                    skillItems: result
                })

                // Load ajax of get projects by id
                this.getProjectById(this.state.projectId)
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

    getProjectById(id) {
        $(".md-form, .has-error").removeClass("has-error")

        $.ajax({
            url: "https://gutierrez-jerald-cv-be.herokuapp.com/api/getProjectById",
            dataType: "json",
            data: {
                'id': id
            },
            cache: false
        })
        .then(
            (result) => {
                let startInRes = result[0].start_in
                let startIn = startInRes !== "" && startInRes !== undefined ? ( new Date(startInRes).getFullYear() + "-" + ( "0" + ( new Date(startInRes).getMonth()+1 ) ).slice(-2) + "-" + new Date(startInRes).getDate() ) : ( new Date() )
                this.setState({
                    isLoaded: true,
                    in_method: "edit",
                    in_key: result[0].id,
                    in_tag: this.returnStr(result[0].tag),
                    in_company: this.returnStr(result[0].company),
                    in_title: this.returnStr(result[0].title),
                    in_category: this.returnStr(result[0].category),
                    in_skills: JSON.parse(result[0].skills),
                    in_description: this.returnStr(result[0].description),
                    in_image: this.returnStr(result[0].image),
                    in_website: this.returnStr(result[0].website),
                    in_start_in: new Date(startIn)
                })

                if ( result[0].image !== "" && result[0].image !== undefined ) {
                    this.setState({
                        fileSrc: result[0].image,
                        fileLoaded: true
                    })
                }

                // Run skills multi select option to be selected
                // this.skillSelected( result[0].skills )
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

    skillSelected(skills) {
        if ( skills !== "" && skills !== undefined ) {
            skills.split(", ").map(code => (
                (
                    this.setState({
                        skillItems: this.state.skillItems.map(item => {
                            /* 
                                This map function is for addting json value with key based in equality of item
                                Can be use also in edit json
                            */
                            if (item.value === code) {
                                item['selected'] = true;
                                return item;
                            }
                    
                            return item;
                        })
                    })
                )
            ))
        }

        this.setState({
            isLoaded: true
        })
    }

    renderButtonAction() {
        const method = this.state.in_method
        if ( method === 'edit' || method === 'delete' ) {
            return (
                <React.Fragment>
                    <MDBBtn type="button" className="btn-palette-2 btn-block mb-3" onClick={this.handleButtonAdd.bind(this)}>
                        <MDBIcon icon="plus" className="mr-2" />
                        Add Project
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
        const { fileType, fileSize } = this.props;
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
                            this.state.in_projOptShow ? (
                                // Show this if editing
                                <MDBRow>
                                    <MDBCol md="3" className="d-flex align-self-center">
                                        <MDBBox tag="p" className="content-description m-0">Project:</MDBBox>
                                    </MDBCol>
                                    <MDBCol md="9">
                                        <MDBBox tag="div" className="select-mdb-custom">
                                            <MDBBox tag="select" className="select-mdb-content" onChange={this.handleProjectChange.bind(this)} value={this.state.projectId}>
                                                {
                                                    this.state.titleItems.map((item) => (
                                                        <MDBBox tag="option" key={item.id} value={item.id}>
                                                            {
                                                                item.tag !== "" && item.tag !== undefined ? (
                                                                    item.tag.toUpperCase()
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
                                    <MDBBox tag="div" className="select-mdb-custom">
                                        <MDBBox tag="select" className="select-mdb-content" value={this.state.in_tag} onChange={this.handleInputChange.bind(this, "in_tag")} >
                                            {
                                                this.state.expItems.map((item) => (
                                                    <MDBBox tag="option" key={item.id} value={item.tag}>
                                                        {item.tag.toUpperCase()}
                                                    </MDBBox>
                                                ))
                                            }
                                        </MDBBox>
                                        <MDBBox tag="span" className="select-mdb-bar"></MDBBox>
                                        <MDBBox tag="label" className="col select-mdb-label">Tag</MDBBox>
                                    </MDBBox>
                                    <MDBBox tag="div" className="select-mdb-custom mt-4">
                                        <MDBBox tag="select" className="select-mdb-content" value={this.state.in_company} onChange={this.handleInputChange.bind(this, "in_company")} >
                                            {
                                                this.state.expItems.map((item) => (
                                                    <MDBBox tag="option" key={item.id} value={item.company}>
                                                        {item.company}
                                                    </MDBBox>
                                                ))
                                            }
                                        </MDBBox>
                                        <MDBBox tag="span" className="select-mdb-bar"></MDBBox>
                                        <MDBBox tag="label" className="col select-mdb-label">Company</MDBBox>
                                    </MDBBox>
                                    <MDBBox tag="div" className="select-mdb-custom mt-4">
                                        <MDBBox tag="select" className="select-mdb-content" onChange={this.handleCatChange.bind(this)} value={this.state.in_category}>
                                            <MDBBox tag="option" value="development">Development</MDBBox>
                                            <MDBBox tag="option" value="maintenance">Maintenance</MDBBox>
                                        </MDBBox>
                                        <MDBBox tag="span" className="select-mdb-bar"></MDBBox>
                                        <MDBBox tag="label" className="col select-mdb-label">Category</MDBBox>
                                    </MDBBox>
                                    <MDBInput containerClass="in_title" label="Title *" value={this.state.in_title} onChange={this.handleInputChange.bind(this, "in_title")} />
                                    <MDBBox tag="div" className="multi-select-custom project-form-skills">
                                        <MDBBox tag="span" className="col select-mdb-label">Skills</MDBBox>
                                        <Multiselect 
                                            options={this.state.skillItems}
                                            selectedValues={this.state.in_skills}
                                            onSelect={this.onSelectSkills}
                                            onRemove={this.onRemoveSkills}
                                            placeholder="Choose skills"
                                            closeIcon="cancel"
                                            displayValue="title" 
                                        />
                                    </MDBBox>
                                    <MDBInput containerClass="" label="Description" value={this.state.in_description} onChange={this.handleInputChange.bind(this, "in_description")} />
                                    <MDBInput containerClass="mt-0" label="Website URL" value={this.state.in_website} onChange={this.handleInputChange.bind(this, "in_website")} />
                                    <MDBBox tag="div" className="md-form mt-0 in_start_in">
                                        <MDBBox tag="label" className="active">Start In *</MDBBox>
                                        <DatePicker
                                            selected={this.state.in_start_in}
                                            placeholderText="Choose date"
                                            className="form-control w-100"
                                            onChange={this.handleDateChange}
                                            onKeyDown={this.handleDateKeyDown}
                                        />
                                    </MDBBox>
                                    <MDBBox tag="div" className="image-upload-holder">
                                        {
                                            this.state.fileLoaded ? (
                                                // Show preview
                                                <React.Fragment>
                                                    <MDBBox tag="img" src={this.state.fileSrc} alt="Uploaded" className="w-100 border"></MDBBox>
                                                    <MDBBtn onClick={this.handleUploadClick.bind(this, "inputFileReader")} type="submit" className="btn-palette-1 btn-block mt-3">
                                                        <MDBIcon icon="image" className="mr-2" />
                                                        Select file
                                                    </MDBBtn>
                                                </React.Fragment>
                                            ) : (
                                                // Show default upload button
                                                <MDBBox onClick={this.handleUploadClick.bind(this, "inputFileReader")} tag="div" className="text-center border rounded w-100 px-3 py-5 cursor-pointer">
                                                    <MDBIcon icon="image" className="mr-1 fa-3x d-block"></MDBIcon>
                                                    <MDBBox tag="span" className="d-block">Select file</MDBBox>
                                                    <MDBBox tag="span" className="d-block">Allowed files: {fileType}</MDBBox>
                                                    <MDBBox tag="span" className="d-block">Maximum file size: {fileSize}</MDBBox>
                                                </MDBBox>
                                            )
                                        }
                                        {/* Hidden input file upload */}
                                        <form method="POST" encType="multipart/form-data" id="fileUploadForm" onSubmit={this.handleUploadSubmit.bind(this)} >
                                            <MDBInput containerClass="m-0 d-none" type="file" id="inputFileReader" name="image" onChange={this.handleUploadChange.bind(this, fileType, fileSize)} />
                                            <MDBBtn type="submit" id="fileUploadForm-id" className="btn-default mt-3 d-none">Upload</MDBBtn>
                                        </form>
                                    </MDBBox>
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

FormProjects.defaultProps = {
    fileType: "png,jpg,jpeg,webm",
    fileSize: "2MB"
}

export default FormProjects