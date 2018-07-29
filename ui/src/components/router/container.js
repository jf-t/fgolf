import { connect } from 'react-redux';
import AppRouter from './component';

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(AppRouter);
