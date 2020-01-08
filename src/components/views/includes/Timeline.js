import React from 'react'
import { MDBBox, MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdbreact"

class Timeline extends React.Component{
    renderJobsDesc(data) {
        if ( Object.keys(data).length !== 0 ) {
            return (
                <MDBBox tag="div" className="details-job-decs d-block">
                    <MDBBox tag="span" className=""><u>Job Description</u></MDBBox>
                    <MDBBox tag="ul">
                        {
                            data.map(items => (
                                <MDBBox key={items.id} tag="li">
                                    <MDBBox tag="span">{items.title}</MDBBox>
                                    <MDBBox tag="ul">
                                        {
                                            items.sub.map(subItems => (
                                                <MDBBox key={subItems.id} tag="li">
                                                    <MDBBox tag="span">{subItems.title}</MDBBox>
                                                    {
                                                        subItems.desc !== "" ? (
                                                            <MDBBox tag="ul">
                                                                <MDBBox tag="li">
                                                                    <MDBBox tag="span">{subItems.desc}</MDBBox>
                                                                </MDBBox>
                                                            </MDBBox>
                                                        ) : ("")
                                                    }
                                                </MDBBox>
                                            ))
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
                                        <MDBBox tag="span">{items.title}</MDBBox>
                                    </MDBBox>
                                ))
                            }
                        </MDBBox>
                </MDBBox>
            )
        }
    }

    render () {
        return (
            <MDBContainer className="timeline-content-wrapper">
                <MDBRow>
                    <MDBCol lg="12" className="mb-3">
                        <MDBBox tag="span" display="block" className="content-title font-size-3rem font-family-fantasy text-center">{this.props.title}</MDBBox>
                    </MDBCol>
                    <MDBCol lg="12">
                        <MDBBox tag="ul" className="list-group timeline-content position-relative list-style-none p-0">
                            {
                                this.props.data.sort((a, b) =>  b.order - a.order ).map(items => (
                                    <MDBBox key={items.id} tag="li" className="list-group-item content-list position-relative border-0 bg-transparent">
                                        <MDBBox tag="div" className="content-date d-none d-md-block position-absolute w-13">
                                            <MDBBox tag="span" className="text-uppercase">{items.date}</MDBBox>
                                        </MDBBox>
                                        <MDBIcon icon={items.icon} className="content-icon z-index-2 text-center t-0 h-40px w-40px position-absolute very-light-gray-bg rounded-circle z-depth-1 font-size-1pt3rem line-height-2" />
                                        <MDBBox tag="div" className="content-details very-light-gray-bg z-depth-1 rounded position-relative p-4">
                                            <MDBBox tag="span" className="details-title font-size-1pt5rem d-block">{items.title}</MDBBox>
                                            <MDBBox tag="span" className="details-sub-title font-size-1rem d-block">{items.subTitle}</MDBBox>
                                            <MDBBox tag="span" className="details-sub-title font-size-1rem d-block d-md-none">{items.date}</MDBBox>
                                            <MDBBox tag="span" className="details-address font-size-1rem d-block">{items.address}</MDBBox>
                                            {this.renderJobsDesc(items.jobDesc)}
                                            {this.renderAchievement(items.achievement)}
                                        </MDBBox>
                                    </MDBBox>
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