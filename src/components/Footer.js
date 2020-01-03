import React from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBBox } from "mdbreact";

class Footer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            social: [
                {
                    id: '1',
                    title: 'Facebook',
                    icon: "fa-facebook-f",
                    class: "fab fa-lg white-text mr-md-5 mr-3 fa-2x",
                    link: "/"
                },
                {
                    id: '2',
                    title: 'Instagram',
                    icon: "fa-instagram",
                    class: "fab fa-lg white-text mr-md-5 mr-3 fa-2x",
                    link: "/"
                },
                {
                    id: '3',
                    title: 'LinkedIn',
                    icon: "fa-linkedin-in",
                    class: "fab fa-lg white-text mr-md-5 mr-3 fa-2x",
                    link: "/"
                }
            ]
        }
    }

    render() {
        return (
            <MDBFooter color="unique-color-dark" className="font-small pt-4">
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="12" className="py-5">
                            <MDBBox tag="div" className="mb-5 flex-center">
                                {
                                    this.state.social.map(items => (
                                        <a className="fb-ic" key={items.id} href={items.link} title={items.title}>
                                            <i className={items.icon + " " + items.class}> </i>
                                        </a>
                                    ))
                                }
                            </MDBBox>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            <div className="footer-copyright text-center py-3">
              <MDBContainer fluid>
                &copy; {new Date().getFullYear()} Copyright: Jerald Seña Gutierrez ® All Rights Reserved.
              </MDBContainer>
            </div>
          </MDBFooter>
        )
    }
}

export default Footer