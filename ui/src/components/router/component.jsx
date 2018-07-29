import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import LoginContainer from '../login/container';
import LeaguesContainer from '../league_list/container';


class AppRouter extends React.Component {
    constructor (props) {
        super(props);
    }

    redirectIfNotLoggedIn(nextState, replace) {
        console.log(nextState);
        if (nextState.user) {
            replace("/login");
        } else {
            this.addHighlight(nextState);
        }
    }

    render () {
        return (
            <Router history={history}>
                <Route path="/" component={LeaguesContainer} onEnter={this.redirectIfNotLoggedIn} />
                <Route path="/login" component={LoginContainer} />
            </Router>
        );
    }
}
