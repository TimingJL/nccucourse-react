import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import {
    StyledCourse,
} from './Styled';

const Course = ({ course }) => (
    <StyledCourse>
        <div className="course__title-wrapper">
            <div className="course__course-id">科目代碼：{course.get('id')}</div>
            <div className="course__course-name-wrapper">
                <div className="course__course-name">{course.get('name')}</div>
                <div className="course__course-semester">學年學期： {`${course.get('year')}-${course.get('semester')}`}</div>
            </div>
        </div>
        <div className="course__block-wrapper">
            <div className="course__block">
                <div className="course__value">{course.get('score') ? course.get('score') : '無'}</div>
                <div className="course__label">評鑑分數</div>
            </div>
            <div className="course__block">
                <div className="course__value">{course.get('student_num')}</div>
                <div className="course__label">學生人數</div>
            </div>
        </div>
        <div className="course__comments-wrapper">
            {
                (typeof course.get('comments') === 'string')
                ? <div className="course__comment">{course.get('comments')}</div>
                : course.get('comments').map((comment, index) => (
                    <div key={index} className="course__comment">
                        {comment}
                    </div>
                ))
            }
        </div>
    </StyledCourse>
);

Course.propTypes = {
    course: PropTypes.instanceOf(Map),
};

Course.defaultProps = {
    course: () => { },
};

export default Course;
