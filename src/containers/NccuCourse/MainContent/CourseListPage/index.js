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
import Spinner from 'components/Spinner';
import CourseListRow from './CourseListRow';

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

    render() {
        const {
            match,
            coursesListMap,
            isLoading,
        } = this.props;
        const semester = match.params.semester;
        const coursesList = coursesListMap.get(semester);
        return (
            <React.Fragment>
                {
                    (isLoading.get('semesterList') || isLoading.get('coursesList'))
                        ? <Spinner />
                        : coursesList &&
                        <StyledCourseListPage>
                            {
                                coursesList.map((course) => (
                                    <CourseListRow
                                        key={course}
                                        course={course}
                                    />
                                ))
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
});

const mapDispatchToProps = (dispatch) => ({
    handlefetchSemesterList: () => dispatch(fetchSemesterList()),
    handlefetchCoursesList: (semester) => dispatch(fetchCoursesList(semester)),
    setSemesterListLoading: (isLoading) => dispatch(setSemesterListLoading(isLoading)),
    setCoursesListLoading: (isLoading) => dispatch(setCoursesListLoading(isLoading)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseListPage);
