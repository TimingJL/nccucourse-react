import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import Header from './Header';
import Content from './Content';

class TimeTableFitler extends React.Component {
    static propTypes = {
        selectedSession: PropTypes.instanceOf(List),
        handleOnHideModal: PropTypes.func,
        handleOnSelect: PropTypes.func,
    }
    static defaultProps = {
        selectedSession: List(),
        handleOnHideModal: () => { },
        handleOnSelect: () => { },
    }
    render() {
        const {
            selectedSession,
            handleOnHideModal,
            handleOnSelect,
        } = this.props;
        return (
            <div>
                <Header handleOnHideModal={handleOnHideModal} />
                <Content selectedSession={selectedSession} handleOnSelect={handleOnSelect} />
            </div>
        );
    }
}

export default TimeTableFitler;
