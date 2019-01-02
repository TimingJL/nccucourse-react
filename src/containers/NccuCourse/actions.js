import {
    FETCH_SEMESTER_LIST,
    SET_SEMESTER_LIST,
    FETCH_COURSES_LIST,
    SET_COURSES_LIST_MAP,
    FETCH_EVALUATION_LIST,
    SET_EVALUATION_LIST,
    SET_SEARCH_KEY,
    SET_FILTER_KEY,
    ADD_FILTER_KEYS,
    REMOVE_FILTER_KEY,
    SET_SELECTED_SESSION_CLASS,
} from './constants';

export const fetchSemesterList = () => ({
    type: FETCH_SEMESTER_LIST,
});

export const setSemesterList = (error, semesterList) => ({
    error,
    type: SET_SEMESTER_LIST,
    payload: {
        semesterList,
    },
});

export const fetchCoursesList = (semester) => ({
    type: FETCH_COURSES_LIST,
    payload: {
        semester,
    }
});

export const setCoursesListMap = (error, semester, coursesList) => ({
    error,
    type: SET_COURSES_LIST_MAP,
    payload: {
        semester,
        coursesList,
    },
});

export const fetchEvaluationList = () => ({
    type: FETCH_EVALUATION_LIST,
});

export const setEvaluationList = (error, evaluationList) => ({
    error,
    type: SET_EVALUATION_LIST,
    payload: {
        evaluationList,
    },
});

export const setSearchKey = (searchKey) => ({
    type: SET_SEARCH_KEY,
    payload: {
        searchKey,
    }
});

export const setFilterKey = (filterKey) => ({
    type: SET_FILTER_KEY,
    payload: {
        filterKey,
    },
});

export const addFilterKeys = (keys) => ({
    type: ADD_FILTER_KEYS,
    payload: {
        keys,
    },
});

export const removeFilterKey = (dataFilterType, key) => ({
    type: REMOVE_FILTER_KEY,
    payload: {
        dataFilterType,
        key,
    },
});

export const setSelectedSessionClass = (weekday, sessionClass) => ({
    type: SET_SELECTED_SESSION_CLASS,
    payload: {
        weekday,
        sessionClass,
    },
});
