import { GET_USER_DETAIL, EDIT } from './userAction';

const userDefaultState = {
    edit: null,
    userdetails: null
};
// eslint-disable-next-line import/prefer-default-export
export const userReducer = (state = userDefaultState, action) => {
    switch (action.type) {
    case GET_USER_DETAIL:
        return { ...state, userdetails: action.payload };
    case EDIT:
        return { ...state, edit: action.payload };
    default:
        return state;
    }
};
