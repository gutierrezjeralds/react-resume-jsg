import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Home from './views/Home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class Main extends React.Component {
    render() {
        return (
            <div className="Resume-App">
                <Router>
                    <Header />
                        {/* Body */}
                        <Switch>
                            <Route exact path="/" component={Home} />
                        </Switch>
                        {/* Body */}
                    <Footer />
                </Router>
            </div>
        )
    }
}

export default Main