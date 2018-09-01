import { connect } from 'react-redux';
import LeagueDetailComponent from './component';

import { getLeague } from '../../actions/league_actions';

const mapStateToProps = state => ({
    standings: state.league.standings
});

const mapDispatchToProps = dispatch => ({
    // Maybe some way of filtering leaderboard?
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeagueDetailComponent);
