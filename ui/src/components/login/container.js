import { connect } from 'react-redux';
import LoginComponent from './component';

import { login } from './actions';

const mapStateToProps = state => ({
    user: state.currentUser
});

const mapDispatchToProps = dispatch => ({
    login: (user) => dispatch(login(user))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginComponent);
