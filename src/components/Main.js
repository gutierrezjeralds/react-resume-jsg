import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Home from './views/Home'
import Portfolio from './views/Portfolio'
import Resume from './views/Resume'
import Contact from './views/Contact'
import NotFound from './views/NotFound'
import Splash from './views/Splash'
import Panel from './views/controls/Panel'
import { MDBBox } from 'mdbreact'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import cookie from 'react-cookies'
import $ from 'jquery'

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            csrf_token: "",
            pages: [
                {
                    id: 1,
                    render: <Home />,
                    wrapper: "home",
                    path: "/"
                },
                {
                    id: 2,
                    render: <Portfolio />,
                    wrapper: "portfolio",
                    path: "/portfolio"
                },
                {
                    id: 3,
                    render: <Resume />,
                    wrapper: "resume",
                    path: "/resume"
                },
                {
                    id: 4,
                    render: <Contact />,
                    wrapper: "contact",
                    path: "/contact"
                },
                {
                    id: 6,
                    render: <Panel />,
                    wrapper: "control-panel",
                    path: "/control-panel"
                },
                {
                    id: 5,
                    render: <NotFound />,
                    wrapper: "notFound-404",
                    path: "*"
                }
            ]
        }
    }

    UNSAFE_componentWillMount() {
        this.getCsrfToken()
    }

    getCsrfToken() {
        const uri = "http://gutierrez-jerald-cv-be.herokuapp.com/get-csrf-token"
        $.ajax({
            url: uri,
            dataType: "json",
            cache: false
        })
        .then(
            (result) => {
                this.setState({
                    csrf_token: result.token
                })
                // Save cookie
                cookie.save('jsg-xsrf-token', result.token, { path: '/' })
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                console.error('Oh well, you failed. Here some thoughts on the error that occured:', error)
            }
        )
        .catch(
            (err) => {
                console.error('Oh well, you failed. Here some thoughts on the error that occured:', err)
            }
        )
    }

    render() {
        return (
            <MDBBox tag="div" className="resume-app icy-blues-grays-palette">
                <Router>
                    <Header />
                        {/* Body */}
                        <Switch >
                            {
                                this.state.pages.map(items => (
                                    <Route exact path={items.path} key={items.id}
                                        render = {
                                            () => (
                                                <MDBBox tag="main">
                                                    <Splash wrapper={items.wrapper} />
                                                    {items.render}
                                                </MDBBox>
                                            )
                                        }
                                    />
                                ))
                            }
                        </Switch>
                        {/* Body */}
                    <Footer />
                </Router>
            </MDBBox>
        )
    }
}

export default Main