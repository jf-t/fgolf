import React from 'react';

export default class SignupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password1: '',
            password2: ''
        };

        this.signup = this.signup.bind(this);
        this.update = this.update.bind(this);
    }

    signup () {
        evt.preventDefault();

        this.props.signup(this.state);
    }

    update (prop) {
        return (evt) => {
            this.setState({ [prop]: evt.target.value });
        };
    }

    render () {
        return (
            <div className="signup main">
                <form onSubmit{this.signup}>
                    <input type="text" onChange={this.update('username')} placeholder="Username" />
                    <input type="email" onChange={this.update('email')} placeholder="Email" />
                    <input type="password" onChange={this.update('password1')} placeholder="Password" />
                    <input type="password" onChange={this.update('password2')} placeholder="Confirm Password" />
                    <input type="submit" name="Submit" />
                </form>
            </div>
        );
    }
}
