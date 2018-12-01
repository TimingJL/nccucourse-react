import React from 'react';
import styled from 'styled-components';

const StyledCourseListRow = styled.div`
    margin-top: 3px;
    display: flex;
    justify-content: space-around;
    padding: 5px 15px;
    min-height: 70px;
    background: #ffffff26;
    color: #fcfdfc;
    cursor: pointer;
    transition: all 0.8s;
    border-radius: 2px;
    &:hover {
        box-shadow: 0 0 18px 1px #888888;
        transition: all 0.2s;
        background: #363636;
    }
    @media only screen and (max-width: 600px) {
        min-height: 50px;
    }
    .course-list-row__item-wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .course-id {
        flex: 0 0 100px;
        span {
            width: 100px;
            letter-spacing:1px;
        }
    }
    .course-name {
        flex: 1 0 100px;
        @media only screen and (max-width: 600px) {
            justify-content: start;
        }
    }
    .course-instructor {
        flex: 0 1 200px;
    }
    .course-start {
        justify-content: start;
    }
    .course-end {
        justify-content: flex-end;
    }
`;

const CourseListRow = ({ course }) => (
    <StyledCourseListRow>
        <div className="course-list-row__item-wrapper course-id course-start"><span>{course.get('id')}</span></div>
        <div className="course-list-row__item-wrapper course-name"><span>{course.get('name')}</span></div>
        <div className="course-list-row__item-wrapper course-instructor course-end"><span>{course.get('instructor')}</span></div>
    </StyledCourseListRow>
);

export default CourseListRow;
