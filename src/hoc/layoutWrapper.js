import React from 'react';
import { connect } from 'react-redux';

export default function layoutWrapper(WrapperComponent) {
    // eslint-disable-next-line react/prefer-stateless-function
    class LayoutWrapper extends React.Component {
        render() {
            return (
                <React.Fragment>
                    <WrapperComponent {...this.props} />
                </React.Fragment>
            );
        }
    }
    return connect()(LayoutWrapper);
}
