import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import modalReducer from '../modal/modalReducer';
import { userReducer } from '../addForm/userReducer';

export default history => combineReducers({
    router: connectRouter(history), // By using history we can access history even in the child Component without passing it
    form: formReducer, // Given by redux Form
    modal: modalReducer,
    user: userReducer

});
