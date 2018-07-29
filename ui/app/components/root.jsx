import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from './router/component';

export default class Root extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Provider store={this.props.store}>
                <AppRouter />
            </Provider>
        );
    }
}
