import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import history from 'utils/history';
import { Map } from 'immutable';
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
} from 'containers/NccuCourse/selectors';
import {
    ROW_RANGE,
} from 'containers/NccuCourse/constants';
import Spinner from 'components/Spinner';
import PageSelector from 'components/PageSelector';
import CourseListRow from './CourseListRow';

const isLoadingData = (isLoadingSemester, coursesList) => isLoadingSemester || !coursesList;

const StyledCourseListPage = styled.div`
    margin-top: 40px;
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
        } = this.props;
        const {
            defaultCurrentPage,
        } = this.state;
        const semester = match.params.semester;
        const coursesList = coursesListMap.get(semester);
        if (isLoadingData(isLoading.get('semesterList'), coursesList)) {
            return <Spinner />;
        }
        const pageRange = Math.ceil(coursesList.size / ROW_RANGE);
        const currentPage = (defaultCurrentPage > pageRange ? 1 : defaultCurrentPage);
        const end = currentPage * ROW_RANGE;
        const start = end - ROW_RANGE;
        const updatedCoursesList = coursesList.slice(start, end);

        return (
            <React.Fragment>
                {
                    <StyledCourseListPage>
                        {this.renderPageSelector(pageRange, currentPage, this.handleOnPageChange)}
                        {
                            updatedCoursesList.map((course) => (
                                <CourseListRow
                                    key={course}
                                    course={course}
                                />
                            ))
                        }
                        {this.renderPageSelector(pageRange, currentPage, this.handleOnPageChange)}
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
});

const mapDispatchToProps = (dispatch) => ({
    handlefetchSemesterList: () => dispatch(fetchSemesterList()),
    handlefetchCoursesList: (semester) => dispatch(fetchCoursesList(semester)),
    setSemesterListLoading: (isLoading) => dispatch(setSemesterListLoading(isLoading)),
    setCoursesListLoading: (isLoading) => dispatch(setCoursesListLoading(isLoading)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseListPage);
