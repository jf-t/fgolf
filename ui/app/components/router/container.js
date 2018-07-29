import { connect } from 'react-redux';
import AppRouter from './component';

const mapStateToProps = (state) => ({
  currentUser: state.user
});

export default connect(mapStateToProps)(AppRouter);
