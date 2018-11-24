import { fromJS } from 'immutable';
import {
    SET_SEMESTER_LIST,
    SET_COURSES_LIST_MAP,
} from './constants';

//  nccucourse-data/10701/courses.json
//  nccucourse-data/10701/evaluation.json

const initialState = fromJS({
    semesterList: [],
    coursesListMap: {},
});

// coursesListMap: {
//   10701: [{...}, {...}, ...],
//   10702: [{...}, {...}, ...],
// }

function nccuCourseReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SEMESTER_LIST: {
            return state
                .set('semesterList', fromJS(action.payload.semesterList));
        }
        case SET_COURSES_LIST_MAP: {
            const {
                semester,
                coursesList,
            } = action.payload;
            return state
                .updateIn(['coursesListMap'], (coursesListMap) =>
                    coursesListMap.set(semester, fromJS(coursesList)));
        }
        default: {
            return state;
        }
    }
};

export default nccuCourseReducer;
