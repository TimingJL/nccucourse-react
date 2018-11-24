import {
    FETCH_SEMESTER_LIST,
    SET_SEMESTER_LIST,
    FETCH_COURSES_LIST,
    SET_COURSES_LIST_MAP,
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
