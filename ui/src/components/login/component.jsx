import React from 'react';

export default LoginComponent extends React.component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.login = this.login.bind(this);
        this.update = this.update.bind(this);
    }

    login () {
        return evt => {
            evt.preventDefault();

            this.props.login(this.state);
        }
    }
}
