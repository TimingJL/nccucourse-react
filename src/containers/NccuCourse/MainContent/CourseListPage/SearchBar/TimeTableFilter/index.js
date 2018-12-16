import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Content from './Content';

class TimeTableFitler extends React.Component {
    static propTypes = {
        handleOnHideModal: PropTypes.func,
    }
    static defaultProps = {
        handleOnHideModal: () => { },
    }
    render() {
        const {
            handleOnHideModal,
        } = this.props;
        return (
            <div>
                <Header handleOnHideModal={handleOnHideModal} />
                <Content />
            </div>
        );
    }
}

export default TimeTableFitler;
