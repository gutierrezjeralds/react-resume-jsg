import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Home from './views/Home'
import Contact from './views/Contact'
import { MDBBox } from 'mdbreact'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class Main extends React.Component {
    render() {
        return (
            <MDBBox tag="div" className="Resume-App">
                <Router>
                    <Header />
                        {/* Body */}
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/contact" component={Contact} />
                        </Switch>
                        {/* Body */}
                    <Footer />
                </Router>
            </MDBBox>
        )
    }
}

export default Main