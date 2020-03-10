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

    render() {
        return (
            <React.Fragment>
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
                <script async src={`https://www.googletagmanager.com/gtag/js?id=UA-160193157-1`}></script>
                <script>
                    {
                        `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments)}
                            gtag('js', new Date());
                            gtag('config', 'UA-160193157-1');
                        `
                    }
                </script>
            </React.Fragment>
        )
    }
}

export default Main