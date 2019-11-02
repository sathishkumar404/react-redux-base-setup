import { MODAL } from './modalAction';

const modalDefaultState = {
    add: false,
    edit: false
};

export default function (state = modalDefaultState, action) {
    switch (action.type) {
    case MODAL:
        return { ...state, ...action.payload };
    default:
        return state;
    }
}
