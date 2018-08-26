import React from 'react';
import { Link } from 'react-router-dom';

export default class LeagueList extends React.Component {
    constructor (props) {
        super(props);
    }
    componentDidMount() {
        this.props.getLeagues();
    }

    leaguesList (leagues) {
        let leaguesBlock = [];
        for (var i = 0; i < leagues.length; i++) {
            let league = leagues[i];
            leaguesBlock.push(<li className="league" key={league.id}><Link to={`/league/${league.id}`}>{league.name}</Link></li>)
        }

        return leaguesBlock;
    }

    render() {
        if (this.props.leagues) {
            let leagues = this.leaguesList(this.props.leagues);
            return (<ul className="league-list">{leagues}</ul>)
        } else {
            return (<h1>Loading...</h1>)
        }
    }
}
