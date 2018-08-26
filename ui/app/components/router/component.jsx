import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import LoginContainer from '../login/container';
import LeaguesContainer from '../league_list/container';
import { isLoggedIn } from '../../util/session';

export default class AppRouter extends React.Component {
    render () {
        return (
            <BrowserRouter>
                <div>
                    <Route path="/" render={() => (
                            isLoggedIn() ? (
                                <LeaguesContainer />
                            ) : (
                                <Redirect to="/login/" />
                            )
                        )}/>
                    <Route path="/login" component={LoginContainer} />
                </div>
            </BrowserRouter>
        );
    }
}
