import React from 'react';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';
import 'react-table/react-table.css';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { connect } from 'react-redux';


export default function tableWrapper() {
    // eslint-disable-next-line react/prefer-stateless-function
    class TableWrapper extends React.Component {
        render() {
            const {
                data, columns,
                defaultPageSize, showPaginationTop = false, showPaginationBottom = true, customClass, getTrProps, previousText, nextText,
                minRows
            } = this.props;
            return (
                <React.Fragment>
                    <ReactTable
                        className={`${customClass || 'site-table'}`}
                        data={data}
                        columns={columns}
                        showPaginationTop={showPaginationTop}
                        showPaginationBottom={showPaginationBottom}
                        getTrProps={getTrProps}
                        defaultPageSize={defaultPageSize}
                        previousText={previousText}
                        nextText={nextText}
                        sortable={false}
                        minRows={minRows}
                        resizable={false}
                    />
                </React.Fragment>
            );
        }
    }

    TableWrapper.defaultProps = {
        defaultPageSize: 10,
        minRows: 10,
        showPaginationTop: false,
        showPaginationBottom: true,
        customClass: undefined,
        getTrProps: undefined,
        previousText: <IoIosArrowBack size={18} />,
        nextText: <IoIosArrowForward size={18} />
    };
    TableWrapper.propTypes = {
        columns: PropTypes.array.isRequired,
        data: PropTypes.array.isRequired,
        defaultPageSize: PropTypes.number,
        showPaginationTop: PropTypes.bool,
        showPaginationBottom: PropTypes.bool,
        customClass: PropTypes.string,
        previousText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        nextText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        getTrProps: PropTypes.func,
        minRows: PropTypes.number
    };

    const mapStateToProps = state => ({
        success: state.success,
        error: state.error
    });

    return connect(mapStateToProps)(TableWrapper);
}
