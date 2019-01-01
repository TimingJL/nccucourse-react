import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CustomModal from 'components/CustomModal';
import { Map } from 'immutable';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
    selectFilter,
} from 'containers/NccuCourse/selectors';
import {
    setSearchKey,
    setFilterKey,
    addFilterKeys,
    removeFilterKey,
    setSelectedSessionClass,
} from 'containers/NccuCourse/actions'
import _ from 'lodash';
import { findAttributeInEvent } from 'utils/event';
import TimeTableFitler from 'containers/NccuCourse/MainContent/CourseListPage/SearchBar/TimeTableFilter';
import GeneralClassFilter from 'containers/NccuCourse/MainContent/CourseListPage/SearchBar/GeneralClassFilter'

const isKeyEmpty = (keys) => {
    return (keys.length === 1) && (keys[0] === "");
};

const StyledSearchBar = styled.div`
    margin: 10px 0px;
    .search-bar__group {
        display: flex;
        margin: 5px 0px;
    }
    .search-bar__wrapper {
        width: 100%;
        display: flex;
        align-items: center;
        background: white;
        padding: 10px 5px;
        color: black;
        font-size: 1.2em;
        @media only screen and (max-width: 600px) {
            font-size: 1em;
        }
    }
    .search-bar__bar-icon {
        margin-right: 5px;
        color: #e0e0e0;
    }
    .fa-times-circle {
        cursor: pointer;
        &:hover {
            color: #7d7d7d;
        }
    }
    .search-bar__button {
        background: #7edcd9;
        color: white;
        border: none;
        outline: none;
        cursor: pointer;
        width: 50px;
        font-size: 1.2em;
        border-left: 1px solid white;
        &:hover {
            background: #b9fffd;
        }
    }
    .button-state {
        ${(props) => {
        return !props.hasValue
            ? `
                        background: #eee;
                        cursor: not-allowed;
                        &:hover {
                            background: #eee;
                        }
                    `
            : null;
    }}
    }
    input {
        width: 100%;
        background: none;
        border: none;
        outline: none;
        padding: 0px 10px;
        font-size: 1.3em;
    }

    .search-bar__balloon-wrapper {
        display: flex;
        align-items: center;
        flex-wrap: wrap
    }
    .search-bar__balloon-tag {
        background: #ffa300;
        border-radius: 50px;
        padding: 0px 15px;
        padding-right: 10px;
        height: 28px;
        margin-right: 5px;
        margin-top: 5px;
        display: flex;
        align-items: center;
    }
    .search-bar__close {
        margin-left: 5px;
        &:hover {
            color: black;
        }
    }
`;

class SearchBar extends React.PureComponent {
    static propTypes = {
        filter: PropTypes.instanceOf(Map),
        handleSetSearchKey: PropTypes.func,
        handleOnAddFilterKeys: PropTypes.func,
        handleOnRemoveFilterKeys: PropTypes.func,
        handleSetSessionClass: PropTypes.func,
        handleSetFilterKey: PropTypes.func,
    };

    static defaultProps = {
        filter: Map(),
        handleSetSearchKey: () => { },
        handleOnAddFilterKeys: () => { },
        handleOnRemoveFilterKeys: () => { },
        handleSetSessionClass: () => { },
        handleSetFilterKey: () => { },
    };
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
        };
    }

    handleOnSearch = () => {
        const {
            handleSetSearchKey,
        } = this.props;
        const searchKey = document.getElementById('search-bar__input').value;
        handleSetSearchKey(searchKey);
    }
    handleOnGeneralClassFilter = (event) => {
        const {
            handleSetFilterKey,
        } = this.props;
        const filterKey = findAttributeInEvent(event, 'data-filter-key');
        handleSetFilterKey(filterKey);
    }
    handleOnClearSearchKey = () => {
        const {
            handleSetSearchKey,
        } = this.props;
        document.getElementById('search-bar__input').value = null;
        handleSetSearchKey("");
    }
    handleOnGetFilterKeys = () => {
        const {
            handleOnAddFilterKeys,
        } = this.props;
        // eslint-disable-next-line no-useless-escape
        const keys = document.getElementById('search-bar__input').value.split(/[.,\/ -+]/);
        if (isKeyEmpty(keys)) return;
        handleOnAddFilterKeys(keys);
        document.getElementById('search-bar__input').value = null;
    }
    handleOnRemoveFilterKey = (event) => {
        const {
            handleOnRemoveFilterKeys,
        } = this.props;
        const dataFilterType = findAttributeInEvent(event, 'data-filter-type');
        const key = findAttributeInEvent(event, 'data-filter-key');
        handleOnRemoveFilterKeys(dataFilterType, key);
    }
    handleOnShowModal = () => {
        this.setState({
            isModalVisible: true,
        });
    }
    handleOnHideModal = () => {
        this.setState({
            isModalVisible: false,
        });
    }
    handleOnSessionClassSelected = (event) => {
        const {
            handleSetSessionClass,
        } = this.props;
        const weekday = findAttributeInEvent(event, 'data-weekday');
        const sessionClass = findAttributeInEvent(event, 'data-sessionclass');
        handleSetSessionClass(weekday, sessionClass);
    }

    render() {
        const {
            filter,
        } = this.props;
        return (
            <StyledSearchBar hasValue={Boolean(filter.get('searchKey'))}>
                <GeneralClassFilter onClick={this.handleOnGeneralClassFilter} />
                <div className="search-bar__group">
                    <div className="search-bar__wrapper">
                        <input id="search-bar__input" type="text" placeholder="Search..." onChange={_.debounce(this.handleOnSearch, 500)} />
                        {
                            filter.get('searchKey')
                                ? <i className="fas fa-times-circle search-bar__bar-icon" onClick={this.handleOnClearSearchKey} />
                                : <i className="fa fa-search search-bar__bar-icon" />
                        }
                    </div>
                    <button className="search-bar__button button-state" onClick={this.handleOnGetFilterKeys}>
                        <i className="fas fa-plus" />
                    </button>
                    <button className="search-bar__button" onClick={this.handleOnShowModal}>
                        <i className="far fa-calendar-alt" />
                    </button>
                    <CustomModal
                        visible={this.state.isModalVisible}
                        onCancel={this.handleOnHideModal}
                    >
                        <TimeTableFitler
                            handleOnHideModal={this.handleOnHideModal}
                            handleOnSelect={this.handleOnSessionClassSelected}
                            selectedSession={filter.get('selectedSession')}
                        />
                    </CustomModal>
                </div>
                <div className="search-bar__balloon-wrapper">
                    {
                        filter.get('filterKeys').map((filterKey, index) => (
                            <div key={`${filterKey}-${index}`} className="search-bar__balloon-tag">
                                <span>{filterKey}</span>
                                <i data-filter-key={filterKey} data-filter-type="filterKey" className="fas fa-times-circle search-bar__close" onClick={this.handleOnRemoveFilterKey} />
                            </div>
                        ))
                    }
                    {
                        filter.get('selectedSession').map((session) => {
                            if (session.get('sessionClass').length) {
                                return (
                                    <div key={session.get('weekday')} className="search-bar__balloon-tag">
                                        <span>{session.get('weekday')}|{session.get('sessionClass')}</span>
                                        <i data-filter-key={session.get('weekday')} data-filter-type="selectedSession" className="fas fa-times-circle search-bar__close" onClick={this.handleOnRemoveFilterKey} />
                                    </div>
                                );
                            }
                            return null;
                        })
                    }
                </div>
            </StyledSearchBar>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    filter: selectFilter(),
});

const mapDispatchToProps = (dispatch) => ({
    handleSetSearchKey: (searchKey) => dispatch(setSearchKey(searchKey)),
    handleSetFilterKey: (filterKey) => dispatch(setFilterKey(filterKey)),
    handleOnAddFilterKeys: (keys) => dispatch(addFilterKeys(keys)),
    handleOnRemoveFilterKeys: (dataFilterType, key) => dispatch(removeFilterKey(dataFilterType, key)),
    handleSetSessionClass: (weekday, sessionClass) => dispatch(setSelectedSessionClass(weekday, sessionClass)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
