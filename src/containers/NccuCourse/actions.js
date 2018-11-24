import {
    FETCH_SEMESTER_LIST,
    SET_SEMESTER_LIST,
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
