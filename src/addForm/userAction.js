import { axiosInstance } from '../config';
import { modalAction } from '../modal/modalAction';


export const GET_USER_DETAIL = 'GET_USER_DETAIL';

export const EDIT = 'EDIT';

export const editGlobal = payload => ({
    type: EDIT,
    payload
});

export const getUserDetails = () => {
    const method = 'get';
    const url = '/users/listusers/';
    return (dispatch) => {
        return axiosInstance()({ method, url })
            .then((response) => {
                console.log(response);
                dispatch({
                    type: GET_USER_DETAIL,
                    payload: response.data
                });
            });
    };
};

export const editDetails = (data) => {
    const method = 'post';
    const url = '/users/editusers/';
    return (dispatch) => {
        return axiosInstance()({ method, url, data })
            .then((response) => {
                dispatch(getUserDetails());
                dispatch(modalAction({ edit: false }));
            });
    };
};

export const addUserDetails = (data) => {
    const method = 'post';
    const url = '/users/addusers/';
    return (dispatch) => {
        return axiosInstance()({ method, url, data })
            .then((response) => {
                dispatch(getUserDetails());
                dispatch(modalAction({ add: false, edit: false }));
            });
    };
};
