import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { currentUser } from '../../util/session';

import LoginContainer from '../login/container';
import LeagueListContainer from '../league_list/container';
import LeagueDetailContainer from '../league_detail/container';

export default class AppRouter extends React.Component {
    render () {
        return (
            <BrowserRouter>
                <div>
                    <Route path="/" render={() => (
                            (currentUser() !== null) ? (
                                <Redirect to="/leagues" />
                            ) : (
                                <Redirect to="/login/" />
                            )
                        )}/>
                    <Route path="/login" component={LoginContainer} />
                    <Route path="/leagues" component={LeagueListContainer} />
                    <Route path="/league/:id" component={LeagueDetailContainer} />
                </div>
            </BrowserRouter>
        );
    }
}
