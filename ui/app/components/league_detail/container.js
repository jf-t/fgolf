import { connect } from 'react-redux';
import LeagueDetailComponent from './component';

import { getLeague } from '../../actions/league_actions';

const mapStateToProps = state => ({
    league: state.league
});

const mapDispatchToProps = dispatch => ({
    getLeague: (id) => dispatch(getLeague(id))

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeagueDetailComponent);
