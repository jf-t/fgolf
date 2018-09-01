import React from 'react';
import { getLeague } from '../../actions/league_actions';
import teamPlayer from './teamPlayer';

export default class Standings extends React.Component {
    constructor (props) {
        super(props);
        // PROPS: standings: [{manager(id, username), players(array[player model]), }]

        this.state = {
            showPlayers: {
                [managerId]: false
            }
        }

        this.createStandings = this.createStandings.bind(this);
        this.showPlayers = this.showPlayers.bind(this);
    }

    componentWillMount () {
        if (this.props.standings.length === 0) {
            this.props.getStandings(); // pass league id
        }
    }

    showPlayers (id) {
        this.setState({players: true});
    }

    createStandings () {
        let standings = this.props.standings;

        let standingsDom = [];
        standings.forEach(team => {
            let teamDom = (<li key={team.id}><a onClick={() => this.showPlayers(team.id)}>{team.manager.username}</a></li>)
        });

        return (<ul id="standings">standingsDom</ul>);
    }

    render () {
        let standings = this.createStandings();
        return (<div>{ standings }</div>);
    }
}
