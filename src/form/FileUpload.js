import React from 'react';
import { FormGroup, Label, FormFeedback } from 'reactstrap';
import {
    IoIosDocument, IoIosClose, IoMdDownload, IoMdTrash
} from 'react-icons/io';

import PropTypes from 'prop-types';
import { errorMsg } from '../constants';

function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return 'n/a';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) return `${bytes} ${sizes[i]}`;
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
}
// Render Type 8 - File Upload
export default class FileUpload extends React.Component {
state = {
    file: '',
    fileInfo: {},
    field: ''
}

componentDidMount() {
    const { name } = this.props.input;
    Object.keys(this.props.initialValues).length > 0 && this.props.initialValues[name] !== null && this.initialLoad(name);
}

componentDidUpdate(prevProps) {
    const { name } = this.props.input;
    if (this.props.initialValues[name] === null
    && this.props.initialValues[name] !== null) {
        this.initialLoad(name);
    }
}
initialLoad = (fileName) => {
    console.log(this.props.initialValues[fileName])
    this.setState({
        file: this.props.initialValues[fileName],
        fileInfo: null
    });
}

closeFile = () => {
    this.setState({
        file: ''
    });
    this.props.change(this.props.input.name, null);
}

inputClick = () => {
    return false;
}

handleChange = (event) => {
    const reader = new FileReader();
    this.setState({
        fileInfo: event.target.files[0]
    });
    // If file size less than 2 MB
    if (event.target.files[0].size < 2111100) {
        reader.readAsDataURL(event.target.files[0]);
        reader.onloadend = () => {
            const base64data = reader.result;
            this.setState({
                file: base64data
            });
            this.props.change(this.props.input.name, base64data);
        };
    } else {
        alert(errorMsg.fileLimit);
    }
}

render() {
    const {
        input, label, className, meta: { touched, error }, colClass, placeholder, accept, fileName, onDelete, type
    } = this.props;
    const { file, fileInfo } = this.state;
    return (
        <div className={colClass}>
            <FormGroup className={`${className || ''} ${touched && error ? 'is-invalid' : ''}`}>
                { label && <Label>{label}</Label> }
                <React.Fragment>
                    <div className="custom-file">
                        <input value={this.state.field} onClick={this.inputClick} type="file" className="custom-file-input" onChange={this.handleChange} accept={accept} />
                        <label className="custom-file-label"> { file !== '' ? 'Edit' : 'Choose' } {placeholder}</label>
                    </div>
                    {
                        (file !== '' && file !== null && fileInfo !== null)
                            && (
                                <div className="custom-file-preview d-flex align-items-center mt-3">
                                    {
                                        type === 'img'
                                            ? <img src={file} alt="..." className="img-thumbnail img-file-preview" />
                                            : (
                                                <React.Fragment>
                                                    <IoIosDocument className="file-preview-icon" />
                                                    <h6 className="text-primary text-truncate mb-0">{fileInfo.name}
                                                        {
                                                            fileInfo.size !== null && <span className="text-muted d-block mt-2 font-weight-light">{bytesToSize(fileInfo.size)}</span>
                                                        }
                                                    </h6>
                                                </React.Fragment>
                                            )

                                    }
                                    <div onClick={this.closeFile} className="file-close-icon"><IoIosClose /></div>
                                </div>
                            )
                    }
                    {
                        (file !== '' && file !== null && fileInfo == null)
                    && (
                        <div className="custom-file-preview d-flex align-items-center mt-3">
                            {
                                type === 'img'
                                    ? <img src={file} alt="..." className="img-thumbnail img-file-preview" />
                                    : (
                                        <React.Fragment>
                                            <IoIosDocument className="file-preview-icon" />
                                            {
                                                fileName && <h6 className="text-primary text-truncate mb-0">{fileName}</h6>
                                            }
                                            {
                                                // eslint-disable-next-line react/jsx-no-target-blank
                                                <a href={file} target="_blank" className="download-file" download={fileName}><IoMdDownload /></a>
                                            }
                                            <div onClick={onDelete} className="delete-file"><IoMdTrash /></div>
                                        </React.Fragment>
                                    )
                            }
                        </div>
                    )
                    }
                </React.Fragment>
                { (touched && error && error !== 'required') && <FormFeedback>{error}</FormFeedback> }
            </FormGroup>
        </div>
    );
}
}
// Default props for renderInput
FileUpload.defaultProps = {
    label: false,
    meta: {},
    className: undefined,
    colClass: undefined,
    initialValues: {},
    fileName: false,
    type: '',
    onDelete: () => {}
};

// PropType for renderInput
FileUpload.propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    fileName: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    meta: PropTypes.object,
    className: PropTypes.string,
    colClass: PropTypes.string,
    change: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    placeholder: PropTypes.string.isRequired,
    onDelete: PropTypes.func,
    type: PropTypes.string,
    accept: PropTypes.string.isRequired
};
