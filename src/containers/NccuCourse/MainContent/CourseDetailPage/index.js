import React from 'react';
import PropTypes from 'prop-types';
import history from 'utils/history';
import { Map } from 'immutable';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { findAttributeInEvent } from 'utils/event';
import gtag from 'utils/tracking';

import Spinner from 'components/Spinner';
import NoData from 'components/NoData';

import {
    selectCoursesListMap,
} from 'containers/NccuCourse/selectors';
import {
    fetchCoursesList,
} from 'containers/NccuCourse/actions';
import {
    StyledCourseDetailPage,
} from 'containers/NccuCourse/MainContent/CourseDetailPage/Styled';

const lengthText = (length) => length === '1' ? '學期課' : '學年課';

const CourseDetailBlock = ({ label, labelEng, value }) => (
    <div className="course-detail__block-wrapper">
        <div className="course-detail__block-value">{value}</div>
        <div className="course-detail__block-label">{label}</div>
    </div>
);

const CourseDetailRow = ({ label, value }) => (
    <div className="course-detail__block-row-wrapper">
        <div className="course-detail__block-row-label">{label}</div>
        <div className="course-detail__block-row-value">{value}</div>
    </div>
);

const CourseDetailInfo = ({ label, value }) => (
    <div className="course-detail__info-wrapper">
        <div className="course-detail__info-label">{label}</div>
        <div className="course-detail__info-value">{value}</div>
    </div>
);

class CourseDetailPage extends React.Component {
    static propTypes = {
        coursesListMap: PropTypes.instanceOf(Map),
        semester: PropTypes.string,
        courseId: PropTypes.string,
        location: PropTypes.object,
        isLoading: PropTypes.bool,
        handlefetchCoursesList: PropTypes.func,
    }
    static defaultProps = {
        coursesListMap: Map(),
        semester: '',
        courseId: '',
        location: {},
        isLoading: false,
        handlefetchCoursesList: () => { },
    }
    state = {};
    componentDidMount() {
        const {
            coursesListMap,
            match: {
                params: {
                    semester,
                },
            },
            handlefetchCoursesList,
        } = this.props;
        if (!coursesListMap.get(semester)) {
            handlefetchCoursesList(semester);
            return;
        }
    }
    handleOnCourseNameClick = (event) => {
        const agenda = findAttributeInEvent(event, 'data-agenda');
        window.open(agenda);
        gtag('event', '教學大綱', {
            'event_label': event.target.innerText,
        });
    }
    handleOnBackBtnClick = () => {
        gtag('event', '回上一頁');
        history.goBack();
    }
    handleOnInstructorClick = (event) => {
        const instructor = findAttributeInEvent(event, 'data-instructor');
        const evaluationPagePath = `/evaluation/${instructor}`;
        gtag('event', '點擊教師名稱', {
            'event_label': instructor,
        });
        history.push(evaluationPagePath);
    }
    render() {
        const {
            coursesListMap,
            match: {
                params: {
                    semester,
                    courseId,
                },
            },
        } = this.props;
        if (!coursesListMap.get(semester)) {
            return <Spinner />;
        }
        const courseData = coursesListMap.get(semester).find((courses) => courses.get('id') === courseId);
        const instructorList = courseData.get('instructor').split('、');
        const instructorEngList = courseData.get('instructor_eng').split('/');

        return (
            <StyledCourseDetailPage instrNum={instructorList.length}>
                {
                    courseData
                        ? <div className="course-detail__content">
                            <div className="course-detail__course-id">科目代號: {courseData.get('id')}</div>
                            <div className="course-detail__course-name-wrapper" data-agenda={courseData.get('agenda')} onClick={this.handleOnCourseNameClick}>
                                <div>{courseData.get('name')}</div>
                                <div className="course-detail__course-name-eng">{courseData.get('name_eng')}</div>
                            </div>
                            <div className="course-detail__course-field-pair">
                                <CourseDetailBlock label={`修別: ${courseData.get('choose_eng')}`} value={`${courseData.get('choose')}`} />
                                <CourseDetailBlock label={'學分'} value={courseData.get('point')} />
                            </div>
                            <div className="course-detail__course-field-pair">
                                <CourseDetailBlock label={`學期數: ${courseData.get('length')}`} value={lengthText(courseData.get('length'))} />
                                <CourseDetailBlock label={'授課語言'} value={courseData.get('language')} />
                            </div>
                            <div style={{ marginTop: '5px' }}>
                                <CourseDetailRow label={'學年學期'} value={`${courseData.get('year')}-${courseData.get('semester')}`} />
                                <CourseDetailRow label={'開課系所'} value={courseData.get('department')} />
                                <div className="course-detail__session-wrapper">
                                    <div className="course-detail__session-label">上課時間</div>
                                    <div className="course-detail__balloon-wrapper">
                                        {
                                            courseData.get('session').map((session, index) => (
                                                <div key={index} className="course-detail__session-balloon">
                                                    <span>{session.get('weekday')}|{session.get('class')}</span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <CourseDetailRow label={'教室'} value={courseData.get('place')} />
                                <CourseDetailRow label={'得充抵通識'} value={courseData.get('asgeneral')} />
                                <CourseDetailRow label={'核心通識'} value={courseData.get('coregeneral')} />
                                {
                                    courseData.get('generalclass') &&
                                    <CourseDetailRow label={'通識類別'} value={courseData.get('generalclass')} />
                                }
                            </div>
                            <div>
                                <CourseDetailInfo label={'備註'} value={courseData.get('note')} />
                                <CourseDetailInfo label={'異動資訊'} value={courseData.get('change')} />
                            </div>
                            <div className="course-detail__instr-group">
                                {
                                    instructorList.map((instr, index) => (
                                        <button
                                            key={instr}
                                            data-instructor={instr}
                                            className="course-detail__instr-btn"
                                            onClick={this.handleOnInstructorClick}
                                        >
                                            {`${instr}(${instructorEngList[index]})`}
                                        </button>
                                    ))
                                }
                            </div>
                            <button className="course-detail__button" onClick={this.handleOnBackBtnClick}>回上一頁</button>
                        </div>
                        : <NoData />
                }
            </StyledCourseDetailPage>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    coursesListMap: selectCoursesListMap(),
});

const mapDispatchToProps = (dispatch) => ({
    handlefetchCoursesList: (semester) => dispatch(fetchCoursesList(semester)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetailPage);
