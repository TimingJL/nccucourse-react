import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
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
            coursesListMap,
            match,
            handlefetchCoursesList,
        } = this.props;
        const semester = match.params.semester;
        if (!coursesListMap.get(semester)) {
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
