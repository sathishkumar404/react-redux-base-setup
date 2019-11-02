import React from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import {
    FormGroup, Label, Input, CustomInput
} from 'reactstrap';
import { push } from 'connected-react-router';
import Select, { components, createFilter } from 'react-select';
import PropTypes from 'prop-types';

// Render Input Type 1 - Text
export class renderInput extends React.Component {
    state = {
        required: false
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props.meta;
        if (prevProps.meta.error === undefined && error) {
            this.stateUpdate();
        }
    }

    stateUpdate = () => {
        this.setState({
            required: true
        });
    }

    render() {
        const {
            input, label, icon, placeholder, className, type, colClass, meta: {
                touched, error, active, submitFailed
            }, append, btnInput, lowerCase, inputBlur, disabled
        } = this.props;
        const inputText = (
            <React.Fragment>
                <Input
                    type={type}
                    placeholder={placeholder}
                    {...input}
                    disabled={disabled}
                    value={!lowerCase ? input.value : input.value.toLowerCase()}
                    invalid={inputBlur ? (touched && error && true) : !!((!active && (error && submitFailed)) || (touched && error === 'Must be a number'))}
                />
                { (inputBlur ? (touched && error) : (!active && (error && submitFailed)) || (touched && error === 'Must be a number')) && <div className="invalid-tooltip">{error}</div> }
            </React.Fragment>
        );
        return (
            <div className={colClass}>
                <FormGroup className={className}>
                    { label && <Label>{label} { this.state.required && <span className="text-danger field-required">*</span> }</Label> }
                    {
                        (icon || btnInput)
                            ? (
                                <div className="input-group">
                                    {
                                        !append
                            && (
                                <div className="input-group-prepend">
                                    <div className="input-group-text">{icon}</div>
                                </div>
                            )
                                    }
                                    { inputText }
                                    {
                                        append
                                && (
                                    <div className="input-group-append">
                                        {
                                            btnInput || <div className="input-group-text">{icon}</div>
                                        }
                                    </div>
                                )
                                    }
                                </div>
                            )
                            : inputText
                    }
                </FormGroup>
            </div>
        );
    }
}
// Default props for renderInput
renderInput.defaultProps = {
    label: false,
    meta: {},
    icon: false,
    btnInput: false,
    placeholder: undefined,
    className: undefined,
    colClass: undefined,
    append: false,
    lowerCase: false,
    inputBlur: false,
    disabled: false
};

// PropType for renderInput
renderInput.propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    meta: PropTypes.object,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.element]),
    btnInput: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
    placeholder: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string.isRequired,
    colClass: PropTypes.string,
    append: PropTypes.bool,
    inputBlur: PropTypes.bool,
    lowerCase: PropTypes.bool,
    disabled: PropTypes.bool
};


// Required field
export const required = value => ((value && (typeof value !== 'string' || value.replace(/\s/g, '').length !== 0)) || typeof value === 'number' ? undefined : 'This field is required');

// Number validation
// eslint-disable-next-line no-restricted-globals
export const number = value => (value && isNaN(Number(value)) ? 'Must be a number' : undefined);

// String validation
export const alphaNumeric = value => (value && /[^a-zA-Z0-9]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined);

// Email validation
export const email = value => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined);

export const colourStyles = {
    option: (styles) => {
        return {
            ...styles,
            textTransform: 'capitalize'
        };
    }
};

const DropdownIndicator = (props) => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                {
                    props.selectProps.menuIsOpen
                        ? <IoIosArrowUp color="#9aa5ab" size={20} />
                        : <IoIosArrowDown color="#9aa5ab" size={20} />
                }
            </components.DropdownIndicator>
        )
    );
};

// eslint-disable-next-line react/no-multi-comp
export class renderSelect extends React.Component {
    state = {
        required: false
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props.meta;
        if (prevProps.meta.error === undefined && error) {
            this.stateUpdate();
        }
    }

    stateUpdate = () => {
        this.setState({
            required: true
        });
    }

    render() {
        const {
            input, className, disabled, options, meta: { active, submitFailed, error },
            isMulti, colClass, isSearchable, label, isClearable, placeholder, filterOption, Option, formatOptionLabel
        } = this.props;
        return (
            <div className={colClass}>
                <FormGroup className={`${className || ''}`}>
                    { label && <Label>{label} { this.state.required && <span className="text-danger field-required">*</span> }</Label> }
                    <div name={input.name} className={`form-select ${(!active && (error && submitFailed)) ? 'is-invalid' : ''}`}>
                        { (!active && (error && submitFailed)) && <div className="invalid-tooltip">{error}</div> }
                        <Select
                            isDisabled={disabled}
                            className={className}
                            styles={colourStyles}
                            value={input.value}
                            onChange={input.onChange}
                            formatOptionLabel={formatOptionLabel}
                            filterOption={filterOption}
                            getOptionLabel={option => option.name}
                            getOptionValue={option => option.id}
                            onBlur={() => input.onBlur(input.value)}
                            isClearable={isClearable}
                            options={options}
                            isSearchable={isSearchable}
                            components={{ DropdownIndicator, Option }}
                            placeholder={placeholder}
                            isMulti={isMulti}
                        />
                    </div>
                </FormGroup>
            </div>
        );
    }
}

// Default props for renderInput
renderSelect.defaultProps = {
    meta: {},
    className: undefined,
    placeholder: '',
    disabled: false,
    isMulti: false,
    isSearchable: true,
    label: false,
    isClearable: false,
    colClass: undefined,
    Option: props => <components.Option {...props} />,
    formatOptionLabel: option => option.name,
    filterOption: createFilter({
        matchFrom: 'any',
        stringify: option => `${option.label}`,
    })
};

// PropType for renderInput
renderSelect.propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object,
    className: PropTypes.string,
    options: PropTypes.array.isRequired,
    disabled: PropTypes.bool,
    isMulti: PropTypes.bool,
    isSearchable: PropTypes.bool,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    colClass: PropTypes.string,
    isClearable: PropTypes.bool,
    placeholder: PropTypes.string,
    filterOption: PropTypes.func,
    formatOptionLabel: PropTypes.func,
    Option: PropTypes.func
};


// Single checkbox
export const renderCheckBox = ({
    input, id, className, label
}) => {
    return (
        <FormGroup className={className}>
            <div>
                <CustomInput type="checkbox" {...input} id={id} label={`${label}`} />
            </div>
        </FormGroup>
    );
};
renderCheckBox.defaultProps = {
    className: undefined,
    label: false
};
// PropType for checkbox
renderCheckBox.propTypes = {
    input: PropTypes.object.isRequired,
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

export const formSelect = ({
    input, className, meta: { touched, error }, children, option = false
}) => (
    <div className="form-select">
        <select type="select-multiple" className={className} {...input}>
            { option && <option /> }
            {children}
        </select>
        {touched && error && <div className="custom-invalid invalid-feedback d-block">{error}</div>}
    </div>
);
formSelect.defaultProps = {
    className: undefined,
    label: false,
    option: false,
    meta: {}
};
// PropType for checkbox
formSelect.propTypes = {
    input: PropTypes.object.isRequired,
    option: PropTypes.bool,
    meta: PropTypes.object,
    children: PropTypes.array.isRequired,
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};


export const renderText = ({
    input
}) => {
    return input.value;
};
// PropType for checkbox
renderText.propTypes = {
    input: PropTypes.object.isRequired
};
