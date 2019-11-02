import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field, reduxForm } from 'redux-form';
import { diff } from 'deep-object-diff';
import { connect } from 'react-redux';
import { renderInput, required, renderSelect } from '../form';
import FileUpload from '../form/FileUpload';
import { gender } from '../constants';
import { addUserDetails, editDetails } from './userAction';

class UserForm extends React.Component {
    onSubmit = (values) => {
        const diffValues = diff(this.props.initialValues, values);
        const data = {
            ...diffValues
        };
        if (this.props.edit) {
            const { id } = this.props.initialValues;
            data.id = id;
        }
        Object.keys(data).forEach((field) => {
            if (data[field].id) {
                data[field] = data[field].id;
            }
        });
        if (this.props.edit) {
            this.props.dispatch(editDetails(data));
        } else {
            this.props.dispatch(addUserDetails(data));
        }
    }

    render() {
        const { handleSubmit, change, initialValues } = this.props;
        return (
            <Form onSubmit={handleSubmit(this.onSubmit)}>
                <div className="row">
                    <Field
                        name="first_name"
                        component={renderInput}
                        type="text"
                        label="First Name"
                        colClass="col-sm-6"
                        validate={required}
                    />
                    <Field
                        name="last_name"
                        component={renderInput}
                        type="text"
                        label="Last Name"
                        colClass="col-sm-6"
                        validate={required}
                    />
                    <Field
                        name="age"
                        component={renderInput}
                        type="text"
                        label="Age"
                        colClass="col-sm-6"
                        validate={required}
                    />
                    <Field
                        name="gender"
                        component={renderSelect}
                        label="Gender"
                        type="text"
                        colClass="col-sm-6"
                        options={gender}
                        validate={required}
                    />
                    <div className="col-sm-6">
                        <div className="form-group form-label">
                            <div className="label-val">
                                <Field
                                    name="photo"
                                    component={FileUpload}
                                    initialValues={initialValues}
                                    label="Photo"
                                    fileName="Appointment Letter"
                                    placeholder="Profile Picture"
                                    accept="image/*"
                                    type="img"
                                    change={change}
                                    validate={required}
                                />
                            </div>
                        </div>
                    </div>
                    <Field
                        name="resume"
                        initialValues={initialValues}
                        component={FileUpload}
                        label="Resume"
                        placeholder="Upload Resume"
                        accept="image/*,.pdf,.docx"
                        type="text"
                        colClass="col-sm-6"
                        change={change}
                        validate={required}
                    />
                </div>
            </Form>
        );
    }
}

UserForm.defaultProps = {
    edit: false,
    initialValues: {}
};

UserForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    edit: PropTypes.bool
};

UserForm = reduxForm({
    form: 'UserForm'
})(UserForm);

const mapStateToProps = state => ({
    initialValues: state.user.edit != null ? state.user.edit : {}
});

export default connect(mapStateToProps)(UserForm);
