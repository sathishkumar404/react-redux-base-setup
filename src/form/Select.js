/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { colourStyles } from './index';

class SelectField extends React.Component {
    render() {
        const {
            defaultValue, options, isSearchable, onChange, className
        } = this.props;
        return (
            <div className="form-select">
                <Select
                    className={className}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    isSearchable={isSearchable}
                    styles={colourStyles}
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option.id}
                    options={options}
                />
            </div>
        );
    }
}

SelectField.defaultProps = {
    defaultValue: {},
    isSearchable: true,
    className: '',
    placeholder: '',
};

SelectField.propTypes = {
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    defaultValue: PropTypes.object,
    isSearchable: PropTypes.bool,
    className: PropTypes.string,
    placeholder: PropTypes.string,
};
export default SelectField;
