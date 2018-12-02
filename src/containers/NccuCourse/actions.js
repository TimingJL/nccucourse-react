import {
    FETCH_SEMESTER_LIST,
    SET_SEMESTER_LIST,
    FETCH_COURSES_LIST,
    SET_COURSES_LIST_MAP,
    SET_SEMESTER_LIST_LOADING,
    SET_COURSES_LIST_LOADING,
    SET_SEARCH_KEY,
} from './constants';

export const fetchSemesterList = () => ({
    type: FETCH_SEMESTER_LIST,
});

export const setSemesterList = (semesterList) => ({
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

export const setCoursesListMap = (semester, coursesList) => ({
    type: SET_COURSES_LIST_MAP,
    payload: {
        semester,
        coursesList,
    },
});

export const setSemesterListLoading = (isLoading) => ({
    type: SET_SEMESTER_LIST_LOADING,
    payload: {
        isLoading,
    },
});

export const setCoursesListLoading = (isLoading) => ({
    type: SET_COURSES_LIST_LOADING,
    payload: {
        isLoading,
    },
});

export const setSearchKey = (searchKey) => ({
    type: SET_SEARCH_KEY,
    payload: {
        searchKey,
    }
});
