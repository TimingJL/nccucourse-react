import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import styled, { keyframes } from 'styled-components';

const breathShadow = props => keyframes`
    0% {
        box-shadow: 0 0 18px 0px #888888;
    }
    100% {
        box-shadow: 0 0 18px 8px #888888;
    }
`;

const StyledCourseListRow = styled.div`
    margin-top: 3px;
    display: flex;
    justify-content: space-around;
    padding: 5px 15px;
    min-height: 70px;
    background: #ffffff26;
    color: #fcfdfc;
    cursor: pointer;
    transition: all 1.2s;
    border-radius: 2px;
    &:hover {
        animation: ${breathShadow} 1s infinite alternate-reverse;
        transition: all 0.5s;
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
        @media only screen and (max-width: 600px) {
            justify-content: start;
        }
    }
    .course-instructor {
        flex: 1 1 200px;
        @media only screen and (max-width: 600px) {
            max-width: 60px;
        }
    }
    .course-start {
        justify-content: start;
    }
    .course-end {
        justify-content: flex-end;
    }
`;

class CourseListRow extends React.PureComponent {
    static propTypes = {
        course: PropTypes.instanceOf(Map),
    }
    static defaultProps = {
        course: Map(),
    }

    render() {
        const {
            course,
        } = this.props;
        return (
            <StyledCourseListRow data-field={"course-list-row"}>
                <div className="course-list-row__item-wrapper course-id course-start" data-field={"course-id"}><span>{course.get('id')}</span></div>
                <div className="course-list-row__item-wrapper course-name"><span>{course.get('name')}</span></div>
                <div className="course-list-row__item-wrapper course-instructor course-end"><span>{course.get('instructor')}</span></div>
            </StyledCourseListRow>
        );
    }
}

export default CourseListRow;
