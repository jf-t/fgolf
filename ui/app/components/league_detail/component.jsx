import React from 'react';
import { getLeague } from '../../actions/league_actions';

export default class LeagueDetail extends React.Component {
    constructor (props) {
        super(props);
    }

    componentWillMount () {
        this.props.getLeague(this.props.location.pathname.split('/')[2]);
    }

    render () {
        return (<div>League detail</div>);
    }
}
