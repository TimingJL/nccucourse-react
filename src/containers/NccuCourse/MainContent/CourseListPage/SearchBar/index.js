import React from 'react';
import PropTypes from 'prop-types';
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
import { findAttributeInEvent } from 'utils/event';
import gtag from 'utils/tracking';
import TimeTableFitler from 'containers/NccuCourse/MainContent/CourseListPage/SearchBar/TimeTableFilter';
import GeneralClassFilter from 'containers/NccuCourse/MainContent/CourseListPage/SearchBar/GeneralClassFilter';
import BalloonTags from 'containers/NccuCourse/MainContent/CourseListPage/SearchBar/BalloonTags';
import {
    StyledSearchBar,
} from './Styled';

const isKeyEmpty = (keys) => {
    return (keys.length === 1) && (keys[0] === "");
};

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
            searchBarValue: '',
        };
    }

    handleOnSearch = (event) => {
        const {
            handleSetSearchKey,
        } = this.props;
        const searchKey = event.target.value;
        handleSetSearchKey(searchKey);
        gtag('event', '搜尋', {
            'event_label': searchKey,
        });
        this.setState({
            searchBarValue: searchKey,
        });
    }
    handleOnGeneralClassFilter = (event) => {
        const {
            handleSetFilterKey,
        } = this.props;
        const filterKey = findAttributeInEvent(event, 'data-filter-key');
        handleSetFilterKey(filterKey);
        gtag('event', '通識篩選按鈕', {
            'event_label': filterKey,
        });
    }
    handleOnClearSearchKey = () => {
        const {
            handleSetSearchKey,
        } = this.props;
        handleSetSearchKey("");
        this.setState({
            searchBarValue: '',
        });
        gtag('event', '清除search bar按鈕');
    }
    handleOnGetFilterKeys = () => {
        const {
            handleOnAddFilterKeys,
        } = this.props;
        const {
            searchBarValue,
        } = this.state;
        // eslint-disable-next-line
        const keys = searchBarValue.split(/[.,\/ -+]/);
        if (isKeyEmpty(keys)) return;
        handleOnAddFilterKeys(keys);
        this.setState({
            searchBarValue: '',
        });
        gtag('event', '新增篩選標籤', {
            'event_label': keys,
        });
    }
    handleOnRemoveFilterKey = (event) => {
        const {
            handleOnRemoveFilterKeys,
        } = this.props;
        const dataFilterType = findAttributeInEvent(event, 'data-filter-type');
        const key = findAttributeInEvent(event, 'data-filter-key');
        handleOnRemoveFilterKeys(dataFilterType, key);
        gtag('event', '移除篩選標籤', {
            'event_category' : dataFilterType,
            'event_label': key,
        });
    }
    handleOnShowModal = () => {
        this.setState({
            isModalVisible: true,
        });
        gtag('event', '上課時間篩選', {
            'event_label': '開啟modal',
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
        gtag('event', '上課時間篩選', {
            'event_label': `${weekday} | ${sessionClass}`,
        });
    }

    render() {
        const {
            filter,
        } = this.props;
        const {
            searchBarValue,
        } = this.state;
        return (
            <StyledSearchBar hasValue={Boolean(filter.get('searchKey'))}>
                <GeneralClassFilter onClick={this.handleOnGeneralClassFilter} />
                <div className="search-bar__group">
                    <div className="search-bar__wrapper">
                        <input id="search-bar__input" type="text" value={searchBarValue} placeholder="Search..." onChange={this.handleOnSearch} />
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
                <BalloonTags filter={filter} handleOnRemoveFilterKey={this.handleOnRemoveFilterKey} />
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
