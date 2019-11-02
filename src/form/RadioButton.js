import React from 'react';
import { FormGroup, Label, CustomInput } from 'reactstrap';
import PropTypes from 'prop-types';

// Render Type 3 - RadioButton
const RadioButton = ({
    input, label, className, meta: { touched, error }, options
}) => (
    <FormGroup className={`${className || ''} ${touched && error ? 'is-invalid' : ''}`}>
        { label && <Label>{label}</Label> }
        {
            options.map((option, i) => <CustomInput className={i === 0 ? 'mb-2' : ''} type="radio" {...input} checked={`${option.id}` === input.value} value={option.id} key={`${option + i}`} id={option.id} label={option.name} />)
        }
        { (touched && error) && <div>{error}</div> }
    </FormGroup>
);

// Default props for RadioButton
RadioButton.defaultProps = {
    label: false,
    meta: {},
    className: undefined
};

// PropType for RadioButton
RadioButton.propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    meta: PropTypes.object,
    className: PropTypes.string,
    options: PropTypes.array.isRequired
};

export default RadioButton;
