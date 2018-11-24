import React from 'react';
import PropTypes from 'prop-types';
import { List, Map } from 'immutable';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
    fetchCoursesList,
} from 'containers/NccuCourse/actions'
import {
    selectSemesterList,
    selectCoursesListMap,
} from 'containers/NccuCourse/selectors';

class CourseListPage extends React.Component {
    static propTypes = {
        match: PropTypes.object,
        semesterList: PropTypes.instanceOf(List),
        coursesListMap: PropTypes.instanceOf(Map),
        handlefetchCoursesList: PropTypes.func,
    }
    static defaultProps = {
        match: {},
        semesterList: List(),
        coursesListMap: Map(),
        handlefetchCoursesList: () => { },
    }
    componentDidUpdate() {
        const {
            semesterList,
            coursesListMap,
            match,
            handlefetchCoursesList,
        } = this.props;
        const semester = match.params.semester;
        const findSemester = semesterList.find((item) => item.get('semester') === semester);
        if (findSemester && !coursesListMap.get(semester)) {
            handlefetchCoursesList(semester);
        }
    }
    render() {
        const {
            match,
            coursesListMap,
        } = this.props;
        const semester = match.params.semester;
        const coursesList = coursesListMap.get(semester);
        return (
            <div>
                {
                    coursesList &&
                    coursesList.map((course) => (
                        <div key={course}>
                            {course.get('name')}
                        </div>
                    ))
                }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    semesterList: selectSemesterList(),
    coursesListMap: selectCoursesListMap(),
});

const mapDispatchToProps = (dispatch) => ({
    handlefetchCoursesList: (semester) => dispatch(fetchCoursesList(semester)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseListPage);
