import {combineReducers} from 'redux';
import {reducer as reduxFormReducer} from 'redux-form';
import submisi from '../submisi';

export default combineReducers({
  submisi,
  form: reduxFormReducer,
});
