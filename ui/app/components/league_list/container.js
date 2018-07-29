import { connect } from 'react-redux';
import LeagueListComponent from './component';

import { getLeagues } from '../../actions/league_actions';

const mapStateToProps = state => ({
    leagues: state.leagues
});

const mapDispatchToProps = dispatch => ({
    getLeagues: () => dispatch(getLeagues())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeagueListComponent);
