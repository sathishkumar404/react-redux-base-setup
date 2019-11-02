import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserForm from './UserForm';
import UserList from './UserList';
import modalWrapper from '../hoc/modalWrapper';
import { modalAction } from '../modal/modalAction';
import { getUserDetails } from './userAction';

const FormModal = modalWrapper(UserForm);

class User extends React.Component {
    componentDidMount() {
        this.props.dispatch(getUserDetails());
    }

    addForm = () => {
        this.props.dispatch(modalAction({ add: true }));
    }

    render() {
        const { dispatch, modal, userdetails } = this.props;

        return (
            <React.Fragment>
                <div className="page-head">
                    <div className="container-fluid">
                        <div className=" d-flex justify-content-between align-items-center">
                            <h2 className="page-title flex-1">List</h2>
                            <div className="flex-1 text-right">
                                <button onClick={this.addForm} className="btn btn-primary">Add User</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="page-body">
                    <div className="container-fluid">
                        {
                            userdetails != null
                        && <UserList dispatch={dispatch} userdetails={userdetails} />
                        }
                    </div>
                </div>
                <FormModal modalFooter formName="UserForm" btnName="save" className="modal-lg" name="add" title="Add User" isOpen={modal.add} />
                <FormModal edit modalFooter formName="UserForm" btnName="save" className="modal-lg" name="edit" title="Edit User" isOpen={modal.edit} />
            </React.Fragment>
        );
    }
}

User.defaultProps = {
    userdetails: null
};

User.propTypes = {
    dispatch: PropTypes.func.isRequired,
    modal: PropTypes.object.isRequired,
    userdetails: PropTypes.array
};

const mapStateToProps = state => ({
    modal: state.modal,
    userdetails: state.user.userdetails
});

export default connect(mapStateToProps)(User);
