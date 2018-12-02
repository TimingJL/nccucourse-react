import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from 'antd/lib/modal';
import { Map } from 'immutable';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
    selectFilter,
} from 'containers/NccuCourse/selectors';
import {
    setSearchKey,
    addFilterKeys,
    removeFilterKey,
} from 'containers/NccuCourse/actions'
import _ from 'lodash';
import { findAttributeInEvent } from 'utils/event';

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
        background: #f2a250;
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
    }
`;

class SearchBar extends React.PureComponent {
    static propTypes = {
        filter: PropTypes.instanceOf(Map),
        handleSetSearchKey: PropTypes.func,
        handleOnAddFilterKeys: PropTypes.func,
        handleOnRemoveFilterKeys: PropTypes.func,
    };

    static defaultProps = {
        filter: Map(),
        handleSetSearchKey: () => { },
        handleOnAddFilterKeys: () => { },
        handleOnRemoveFilterKeys: () => { },
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
        const key = findAttributeInEvent(event, 'data-filter-key');
        handleOnRemoveFilterKeys(key);
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

    render() {
        const {
            filter,
        } = this.props;
        return (
            <StyledSearchBar hasValue={Boolean(filter.get('searchKey'))}>
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
                    <Modal
                        title="上課時間篩選"
                        visible={this.state.isModalVisible}
                        onOk={this.handleOnHideModal}
                        onCancel={this.handleOnHideModal}
                        okText="確定"
                        cancelText="取消"
                    >
                        <div>123</div>
                    </Modal>
                </div>
                <div className="search-bar__balloon-wrapper">
                    {
                        filter.get('filterKeys').map((filterKey, index) => (
                            <div key={`${filterKey}-${index}`} className="search-bar__balloon-tag">
                                <span>{filterKey}</span>
                                <i data-filter-key={filterKey} className="fas fa-times-circle search-bar__close" onClick={this.handleOnRemoveFilterKey} />
                            </div>
                        ))
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
    handleOnAddFilterKeys: (keys) => dispatch(addFilterKeys(keys)),
    handleOnRemoveFilterKeys: (key) => dispatch(removeFilterKey(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
