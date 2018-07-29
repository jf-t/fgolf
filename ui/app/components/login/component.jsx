import React from 'react';

export default class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.login = this.login.bind(this);
        this.update = this.update.bind(this);
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
