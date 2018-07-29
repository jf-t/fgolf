import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import LoginContainer from '../login/container';
import LeaguesContainer from '../league_list/container';


export default class AppRouter extends React.Component {
    render () {
        const isLoggedIn = localStorage.getItem('user');
        console.log(isLoggedIn);

        return (
            <BrowserRouter>
                <div>
                    <Route path="/" render={() => (
                            isLoggedIn ? (
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
