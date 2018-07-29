import React from 'react';


export default class LeagueList extends React.Component {
    constructor (props) {
        super(props);
    }
    componentDidMount() {
        this.props.getLeagues();
    }

    render() {
        return (
            <h1>league list!!</h1>
        );
    }
}
