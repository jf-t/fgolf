import React from 'react';
import { Redirect } from 'react-router-dom'
import lodash from 'lodash';


export default class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loggedIn: false
        };

        this.login = this.login.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidUpdate () {
        if (!lodash.isEmpty(this.props.user)) {
            this.setState({ 'loggedIn': true });
        }
    }

    login (evt) {
        evt.preventDefault();

        this.props.login(this.state);
    }

    update(prop) {
        return (evt) => {
            this.setState({ [prop]: evt.target.value });
        };
    }

    render () {
        if (this.state.loggedIn) {
            return (<Redirect to='/' />);
        }

        return (
            <div className="login main">
                <form onSubmit={this.login}>
                    <input type="text" onChange={this.update('username')} placeholder="Username" />
                    <input type="password" onChange={this.update('password')} placeholder="Password" />
                    <input type="submit" name="Submit" />
                </form>
            </div>
        );
    }
}
