import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Map } from 'immutable';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
    selectFilter,
} from 'containers/NccuCourse/selectors';
import {
    setSearchKey,
} from 'containers/NccuCourse/actions'
import _ from 'lodash';

const StyledSearchBar = styled.div`
    margin: 10px 0px;
    .search-bar__group {
        display: flex;
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
    input {
        width: 100%;
        background: none;
        border: none;
        outline: none;
        padding: 0px 10px;
        font-size: 1.3em;
    }
`;

class SearchBar extends React.PureComponent {
    static propTypes = {
        filter: PropTypes.instanceOf(Map),
        handleSetSearchKey: PropTypes.func,
    };

    static defaultProps = {
        filter: Map(),
        handleSetSearchKey: () => { },
    };

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
        handleSetSearchKey();
    }
    render() {
        const {
            filter,
        } = this.props;
        return (
            <StyledSearchBar>
                <div className="search-bar__group">
                    <div className="search-bar__wrapper">
                        <input id="search-bar__input" type="text" placeholder="Search..." onChange={_.debounce(this.handleOnSearch, 500)} />
                        {
                            filter.get('searchKey')
                                ? <i className="fas fa-times-circle search-bar__bar-icon" onClick={this.handleOnClearSearchKey} />
                                : <i className="fa fa-search search-bar__bar-icon" />
                        }
                    </div>
                    <button className="search-bar__button">
                        <i className="fas fa-plus" />
                    </button>
                    <button className="search-bar__button">
                        <i className="far fa-calendar-alt" />
                    </button>
                </div>
                {/* asdf */}
        </StyledSearchBar>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    filter: selectFilter(),
});

const mapDispatchToProps = (dispatch) => ({
    handleSetSearchKey: (searchKey) => dispatch(setSearchKey(searchKey)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
