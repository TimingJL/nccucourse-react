import { combineReducers } from 'redux-immutable';
import nccuCourseReducer from 'containers/NccuCourse/reducer';

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(injectedReducers) {
    return combineReducers({
        nccuCourse: nccuCourseReducer,
    });
};
