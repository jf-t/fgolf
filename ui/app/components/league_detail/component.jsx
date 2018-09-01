import React from 'react';
import { getLeague } from '../../actions/league_actions';

export default class LeagueDetail extends React.Component {
    constructor (props) {
        super(props);
        // PROPS: {info (id, name, commish), standings (live league standings), leaderboard (pga tournament leaderboard)}
    }

    componentWillMount () {
        this.props.getLeague(this.props.location.pathname.split('/')[2]); // need better way to do this
    }

    render () {
        return (<div>League detail</div>);
    }
}
