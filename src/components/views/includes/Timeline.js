import React from 'react'
import { MDBBox, MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdbreact"

class Timeline extends React.Component{
    renderData(data, counter, propsCounter, category) {
        if ( Object.keys(data).length !== 0 ) {
            // Get icons needed based in category
            let iconArr = []
            if ( category.toLowerCase() === 'experience' ) {
                iconArr = ['code', 'globe', 'briefcase']
            } else if( category.toLowerCase() === 'educational' ) {
                iconArr = ['hourglass-end', 'certificate', 'graduation-cap']
            } else {
                iconArr = ['info']
            }
            let icon = iconArr[Math.floor(Math.random() * iconArr.length)]
            
            // Render element
            if ( propsCounter === 1 ) {
                if ( counter === propsCounter) {
                    return (
                        this.renderElem(data, category, icon)
                    )
                }
            } else {
                return (
                    this.renderElem(data, category, icon)
                )
            }
        }
    }

    renderElem(data, category, icon) {
        return (
            <MDBBox key={data.id} tag="li" className="list-group-item content-timeline content-list position-relative border-0 bg-transparent">
                <MDBBox tag="div" className="content-date d-none d-md-block position-absolute w-13">
                    <MDBBox tag="span" className="text-uppercase">
                        { 
                            data.start_in !== "" && data.start_in !== undefined ? (
                                data.start_in
                            ) : (
                                data.date !== "" && data.date !== undefined ? (
                                    data.date 
                                ) : ("") 
                            ) 
                        }
                    </MDBBox>
                </MDBBox>
                <MDBIcon icon={icon} className="content-icon z-index-2 text-center t-0 h-40px w-40px position-absolute rounded-circle z-depth-1 font-size-1pt3rem line-height-2" />
                <MDBBox tag="div" className="content-timeline-details content-details z-depth-1 rounded position-relative p-4">
                    <MDBBox tag="span" className="content-title details-title font-size-1pt5rem d-block">
                        {
                            data.company !== "" && data.company !== undefined ? (
                                data.company
                            ) : (
                                data.title !== "" && data.title !== undefined ? (
                                    data.title
                                ) : ("")
                            )
                        }
                    </MDBBox>
                    <MDBBox tag="span" className="content-sub-title details-sub-title font-size-1rem d-block">
                        {
                            data.position !== "" && data.position !== undefined ? (
                                data.position
                            ) : (
                                data.subTitle !== "" && data.subTitle !== undefined ? (
                                    data.subTitle
                                ) : ("")
                            )
                        }
                    </MDBBox>
                    <MDBBox tag="span" className="content-description details-sub-title font-size-1rem d-block d-md-none">
                        {
                            data.start_in !== "" && data.start_in !== undefined ? (
                                data.start_in
                            ) : (
                                data.date !== "" && data.date !== undefined ? (
                                    data.date
                                ) : ("")
                            )
                        }
                    </MDBBox>
                    <MDBBox tag="span" className="content-description details-address font-size-1rem d-block">{data.address}</MDBBox>
                    {
                        category.toLowerCase() === 'experience' ? (
                            <React.Fragment>
                                {this.renderJobsDesc(data.job_description)}
                                {this.renderAchievement(data.achievement)}
                            </React.Fragment>
                        ) : ("")
                    }
                </MDBBox>
            </MDBBox>
        )
    }

    renderJobsDesc(data) {
        if ( Object.keys(data).length !== 0 ) {
            return (
                <MDBBox tag="div" className="details-job-decs d-block content-description">
                    <MDBBox tag="span" className=""><u>Job Description</u></MDBBox>
                    <MDBBox tag="ul">
                        {
                            data.map(items => (
                                <MDBBox key={items.id} tag="li">
                                    <MDBBox tag="span">{items.title}</MDBBox>
                                    <MDBBox tag="ul">
                                        {
                                            Object.keys(items.projects).length !== 0 ? (
                                                items.projects.map(subItems => (
                                                    <MDBBox key={subItems.id} tag="li">
                                                        <MDBBox tag="span">{subItems.title}</MDBBox>
                                                        {
                                                            subItems.description !== "" ? (
                                                                <MDBBox tag="ul">
                                                                    <MDBBox tag="li">
                                                                        <MDBBox tag="span">{subItems.description}</MDBBox>
                                                                    </MDBBox>
                                                                </MDBBox>
                                                            ) : ("")
                                                        }
                                                    </MDBBox>
                                                ))
                                            ) : (
                                                <React.Fragment key={items.id}>
                                                    {
                                                        items.description !== "" ? (
                                                            <MDBBox tag="li">
                                                                <MDBBox tag="span">{items.description}</MDBBox>
                                                            </MDBBox>
                                                        ) : ("")
                                                    }
                                                    {
                                                        items.sub_description !== "" ? (
                                                            <MDBBox tag="li">
                                                                <MDBBox tag="span">{items.sub_description}</MDBBox>
                                                            </MDBBox>
                                                        ) : ("")
                                                    }
                                                </React.Fragment>
                                            )
                                        }
                                    </MDBBox>
                                </MDBBox>
                            ))
                        }
                    </MDBBox>
                </MDBBox>
            )
        }
    }

    renderAchievement(data) {
        if ( Object.keys(data).length !== 0 ) {
            return (
                <MDBBox tag="div" className="details-achievement d-block">
                    <MDBBox tag="span" className=""><u>Achievement</u></MDBBox>
                    <MDBBox tag="ul">
                            {
                                data.sort((a, b) =>  b.order - a.order ).map(items => (
                                    <MDBBox key={items.id} tag="li">
                                        <MDBBox tag="span">{items.title} ( {items.start_in} )</MDBBox>
                                    </MDBBox>
                                ))
                            }
                        </MDBBox>
                </MDBBox>
            )
        }
    }

    render () {
        let counters = 0
        return (
            <MDBContainer className="timeline-content-wrapper">
                <MDBRow>
                    <MDBCol lg="12" className="mb-3">
                        <MDBBox tag="span" display="block" className="content-title font-size-3rem font-family-architects-daughter text-center">{this.props.title}</MDBBox>
                    </MDBCol>
                    <MDBCol lg="12">
                        <MDBBox tag="ul" className="list-group timeline-content position-relative list-style-none p-0">
                            {
                                this.props.data.sort((a, b) =>  b.start_in - a.start_in ).map(items => (
                                    this.renderData(items, counters+=1, parseInt(this.props.counter), this.props.title)
                                ))
                            }
                        </MDBBox>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default Timeline