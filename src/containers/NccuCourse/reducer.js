import { fromJS } from 'immutable';
import {
    SET_SEMESTER_LIST,
} from './constants';

//  nccucourse-data/10701/courses.json
//  nccucourse-data/10701/evaluation.json

const initialState = fromJS({
    semesterList: [],
});

function nccuCourseReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SEMESTER_LIST: {
            return state
                .set('semesterList', fromJS(action.payload.semesterList));
        }
        default: {
            return state;
        }
    }
};

export default nccuCourseReducer;
