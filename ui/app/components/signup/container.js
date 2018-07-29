import { connect } from 'react-redux';
import SignupComponent from './component';

import { signup } from '../../actions/user_actions';

const mapStateToProps = state => ({
    user: state.currentUser
});

const mapDispatchToProps = dispatch => ({
    signup: (user) => dispatch(signup(user))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignupComponent);
