import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import history from 'utils/history';
import { Map, fromJS } from 'immutable';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
    fetchSemesterList,
    fetchCoursesList,
    setSemesterListLoading,
    setCoursesListLoading,
} from 'containers/NccuCourse/actions'
import {
    selectSemesterList,
    selectCoursesListMap,
    selectIsLoading,
    selectFilter,
} from 'containers/NccuCourse/selectors';
import {
    ROW_RANGE,
} from 'containers/NccuCourse/constants';
import { findAttributeInEvent } from 'utils/event';
import message from 'antd/lib/message';
import Spinner from 'components/Spinner';
import PageSelector from 'components/PageSelector';
import SearchBar from 'containers/NccuCourse/MainContent/CourseListPage/SearchBar';
import CourseListRow from './CourseListRow';
import {
    coursesFilter,
    coursesFilterBySession,
} from './utils';

const isLoadingData = (isLoadingSemester, coursesList) => isLoadingSemester || !coursesList;

const StyledCourseListPage = styled.div`
    margin: 40px 0px;
`;

class CourseListPage extends React.Component {
    static propTypes = {
        match: PropTypes.object,
        coursesListMap: PropTypes.instanceOf(Map),
        handlefetchCoursesList: PropTypes.func,
    }
    static defaultProps = {
        match: {},
        coursesListMap: Map(),
        handlefetchCoursesList: () => { },
    }
    state = {
        defaultCurrentPage: 1, // default current page number
    }
    componentDidMount() {
        const {
            semesterList,
            coursesListMap,
            match,
            handlefetchSemesterList,
            handlefetchCoursesList,
            setSemesterListLoading,
            setCoursesListLoading,
        } = this.props;
        document.addEventListener('click', this.handleOnClick);
        const semester = match.params.semester;
        const findSemester = semesterList.find((item) => item.get('semester') === semester);
        if (!semesterList.size) {
            // it go to the url directly. So it has not fetch semesterList yet.
            // Fetch the semesterList.
            setSemesterListLoading(true);
            handlefetchSemesterList();
        }
        if (findSemester &&
            semesterList.size &&
            !coursesListMap.get(semester)) {
            // it redirect from '/'.
            // Althought it has fetch semesterList, it has not fetch coursesList yet.
            setCoursesListLoading(true);
            handlefetchCoursesList(semester);
        }
    }
    componentDidUpdate() {
        const {
            semesterList,
            coursesListMap,
            match,
            handlefetchCoursesList,
            setCoursesListLoading,
        } = this.props;
        const semester = match.params.semester;
        const findSemester = semesterList.find((item) => item.get('semester') === semester);
        if (findSemester && !coursesListMap.get(semester)) {
            // it go to the url directly and it has fetch semesterList in DidMount.
            // But it has not fetch coursesList yet.
            setCoursesListLoading(true);
            handlefetchCoursesList(semester);
        }
        if (semesterList.size && !findSemester) {
            // if the url not exist, then go to homepage.
            history.push('/');
        }
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.handleOnClick);
    }

    handleOnClick = (event) => {
        const {
            location: {
                pathname,
            },
        } = this.props;
        const dataField = findAttributeInEvent(event, 'data-field');
        if (!dataField) {
            return;
        }
        if (dataField === 'course-id') {
            const TextRange = document.createRange();
            TextRange.selectNode(event.target);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(TextRange);
            document.execCommand("copy");

            const courseId = event.target.innerText;
            message.success(`複製科目代號：${courseId}`)
            return;
        }

        const courseId = findAttributeInEvent(event, 'data-course-id');
        const courseDetailPagePath = `${pathname}/${courseId}`;
        history.push(courseDetailPagePath);
    }
    handleOnPageChange = (page) => {
        this.setState({
            defaultCurrentPage: page,
        });
    }
    renderPageSelector = (pageRange, currentPage, handleOnPageChange) => {
        return <PageSelector pageRange={pageRange} currentPage={currentPage} handleOnPageChange={handleOnPageChange} />;
    }

    render() {
        const {
            match,
            coursesListMap,
            isLoading,
            filter,
        } = this.props;
        const {
            defaultCurrentPage,
        } = this.state;
        const semester = match.params.semester;
        const coursesList = coursesListMap.get(semester);
        if (isLoadingData(isLoading.get('semesterList'), coursesList)) {
            return <Spinner />;
        }
        // eslint-disable-next-line no-useless-escape
        const searchKey = fromJS(filter.get('searchKey').split(/[.,\/ -+]/));
        const searchParams = filter.get('filterKeys').concat(searchKey);
        const selectedSession = filter.get('selectedSession');
        const filteredCourseList = coursesFilterBySession(
            coursesFilter(coursesListMap.get(semester), searchParams),
            selectedSession);
        const pageRange = Math.ceil(filteredCourseList.size / ROW_RANGE);
        const currentPage = (defaultCurrentPage > pageRange ? 1 : defaultCurrentPage);
        const end = currentPage * ROW_RANGE;
        const start = end - ROW_RANGE;
        const updatedCoursesList = filteredCourseList.slice(start, end);

        return (
            <React.Fragment>
                {
                    <StyledCourseListPage>
                        <SearchBar />
                        {
                            Boolean(pageRange > 1) &&
                            this.renderPageSelector(pageRange, currentPage, this.handleOnPageChange)
                        }
                        {
                            updatedCoursesList.map((course) => (
                                <CourseListRow
                                    key={course}
                                    course={course}
                                />
                            ))
                        }
                        {
                            Boolean(pageRange > 1) &&
                            this.renderPageSelector(pageRange, currentPage, this.handleOnPageChange)
                        }
                    </StyledCourseListPage>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    semesterList: selectSemesterList(),
    coursesListMap: selectCoursesListMap(),
    isLoading: selectIsLoading(),
    filter: selectFilter(),
});

const mapDispatchToProps = (dispatch) => ({
    handlefetchSemesterList: () => dispatch(fetchSemesterList()),
    handlefetchCoursesList: (semester) => dispatch(fetchCoursesList(semester)),
    setSemesterListLoading: (isLoading) => dispatch(setSemesterListLoading(isLoading)),
    setCoursesListLoading: (isLoading) => dispatch(setCoursesListLoading(isLoading)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseListPage);
