import React from 'react';
import PropTypes from 'prop-types';
import { IoMdCreate, IoMdTrash } from 'react-icons/io';
import tableWrapper from '../hoc/tableWrapper';
import { modalAction } from '../modal/modalAction';
import { editGlobal, addUserDetails, editDetails } from './userAction';

const ReactTable = tableWrapper();

class UserList extends React.Component {
    componentDidMount() {
        //
    }

    editData = (editData) => {
        this.props.dispatch(editGlobal(editData));
        this.props.dispatch(modalAction({ edit: true }));
    }

    deleteData = (data) => {
        this.props.dispatch(editDetails({ delete: 1, id: data.id }));
    }
    openInNewTab = (url) => {
        let pdfWindow = window.open("")

        pdfWindow.document.write(`<iframe width='100%' height='100%' src=${url}></iframe>`)
      }
    render() {
        const { userdetails } = this.props;
        const data = [
            {
                name: 'A',
                age: 1
            }
        ];

        const columns = [
            {
                Header: 'Photo',
                Cell: props => (
                    <div className="d-flex">
                        <img alt="img" src={props.original.photo} className="landscape" />
                    </div>
                )
            },
            {
                Header: 'Name',
                Cell: props => (
                    <div className="form-label text-capitalize">{props.original.first_name} {props.original.last_name}</div>
                )
            },
            {
                Header: 'Age',
                accessor: 'age',
            },
            {
                Header: 'Gender',
                Cell: prop => (
                    <div className="text-capitalize">{prop.original.gender.name}</div>
                )
            },
            {
                Header: 'Resume',
                Cell: prop => (
                    <a onClick={() => this.openInNewTab(prop.original.resume)}  className="c-pointer">View File</a>
                )
            },
            {
                Header: '',
                width: 100,
                Cell: props => (
                    <div className="table-action d-none">
                        <IoMdCreate onClick={(e) => { e.stopPropagation(); this.editData(props.original); }} />
                        <IoMdTrash onClick={(e) => { e.stopPropagation(); this.deleteData(props.original); }} />
                    </div>
                )
            }];

        return (
            <ReactTable
                data={userdetails}
                columns={columns}
            />
        );
    }
}

UserList.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default UserList;
