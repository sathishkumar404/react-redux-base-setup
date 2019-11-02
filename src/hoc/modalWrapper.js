import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { modalAction } from '../modal/modalAction';
import { EDIT } from '../addForm/userAction';

export default function modalWrapper(WrappedComponent) {
    class ModalWrapper extends React.Component {
        componentDidUpdate(prevPros) {
            if (prevPros.isOpen && !this.props.isOpen) {
                this.clearData();
            }
        }

       clearData = () => {
           this.props.dispatch({ type: EDIT, payload: null });
       } // returning the payload to null.

        toggle = () => {
            const { dispatch, name } = this.props;
            dispatch(modalAction({ [name]: false }));
        }

        render() {
            const {
                isOpen, className, modalClassName, dispatch, modalHeader, title, modalFooter, btnName, formName
            } = this.props;
            return (
                <React.Fragment>
                    <Modal
                        isOpen={isOpen}
                        className={className}
                        modalClassName={modalClassName}
                        toggle={this.toggle}
                    >
                        {
                            modalHeader && <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
                        }
                        <ModalBody>
                            <WrappedComponent toggle={this.toggle} {...this.props} />
                        </ModalBody>
                        {
                            modalFooter
                            && (
                                <ModalFooter>
                                    <Button color="primary" onClick={() => dispatch(submit(`${formName}`))}>{btnName}</Button>{' '}
                                    <Button color="default" onClick={this.toggle}>Cancel</Button>
                                </ModalFooter>
                            )
                        }
                    </Modal>
                </React.Fragment>
            );
        }
    }
    ModalWrapper.defaultProps = {
        className: '',
        modalClassName: '',
        modalHeader: true,
        title: false,
        modalFooter: false,
        btnName: '',
        formName: '',
        name: ''
    };

    ModalWrapper.propTypes = {
        isOpen: PropTypes.bool.isRequired,
        className: PropTypes.string,
        modalClassName: PropTypes.string,
        dispatch: PropTypes.func.isRequired,
        modalHeader: PropTypes.bool,
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
        modalFooter: PropTypes.bool,
        btnName: PropTypes.string,
        formName: PropTypes.string,
        name: PropTypes.string
    };

    return connect()(ModalWrapper);
}
