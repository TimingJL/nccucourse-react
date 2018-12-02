import { fromJS } from 'immutable';
import {
    SET_SEMESTER_LIST,
    SET_COURSES_LIST_MAP,
    SET_SEMESTER_LIST_LOADING,
    SET_COURSES_LIST_LOADING,
    SET_SEARCH_KEY,
    ADD_FILTER_KEYS,
    REMOVE_FILTER_KEY,
} from './constants';

//  nccucourse-data/10701/courses.json
//  nccucourse-data/10701/evaluation.json

const initialState = fromJS({
    semesterList: [],
    coursesListMap: {},
    filter: {
        searchKey: "",
        filterKeys: [],
    },
    isLoading: {
        semesterList: false,
        coursesList: false,
    },
});

// coursesListMap: {
//   10701: [{...}, {...}, ...],
//   10702: [{...}, {...}, ...],
// }

function nccuCourseReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SEMESTER_LIST: {
            return state
                .set('semesterList', fromJS(action.payload.semesterList))
                // .set('semesterList', fromJS([
                //     {semester: '10701'},
                //     {semester: '10702'},
                // ]))
                .setIn(['isLoading', 'semesterList'], false);
        }
        case SET_COURSES_LIST_MAP: {
            const {
                semester,
                coursesList,
            } = action.payload;
            return state
                .updateIn(['coursesListMap'], (coursesListMap) =>
                    coursesListMap.set(semester, fromJS(coursesList)))
                .setIn(['isLoading', 'coursesList'], false);
        }
        case SET_SEMESTER_LIST_LOADING: {
            const {
                isLoading,
            } = action.payload;
            return state.setIn(['isLoading', 'semesterList'], isLoading);
        }
        case SET_COURSES_LIST_LOADING: {
            const {
                isLoading,
            } = action.payload;
            return state.setIn(['isLoading', 'coursesList'], isLoading);
        }
        case SET_SEARCH_KEY: {
            const {
                searchKey,
            } = action.payload;
            return state.setIn(['filter', 'searchKey'], searchKey);
        }
        case ADD_FILTER_KEYS: {
            const {
                keys,
            } = action.payload;
            return state
                .updateIn(['filter', 'filterKeys'], (filterKeys) => {
                    let updatedFilterKeys = filterKeys;
                    keys.forEach((key) => {
                        if (!filterKeys.includes(key)) {
                            updatedFilterKeys = updatedFilterKeys.push(key);
                        }
                    });
                    return updatedFilterKeys;
                })
                .setIn(['filter', 'searchKey'], "");
        }
        case REMOVE_FILTER_KEY: {
            const {
                key,
            } = action.payload;
            return state
                .updateIn(['filter', 'filterKeys'], (filterKeys) => filterKeys.remove(filterKeys.indexOf(key)));
        }
        default: {
            return state;
        }
    }
};

export default nccuCourseReducer;
