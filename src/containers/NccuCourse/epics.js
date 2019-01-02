import { Observable } from 'rxjs/Rx';
import { COURSE_DATA_DOMAIN } from 'config';
import { request, fetchErrorEpic } from 'utils/request';

import {
    INIT,
    FETCH_SEMESTER_LIST,
    FETCH_COURSES_LIST,
    FETCH_EVALUATION_LIST,
} from './constants';

import {
    setSemesterList,
    setCoursesListMap,
    setEvaluationList,
} from './actions';

const { of, concat } = Observable;

const setInit = (action$, store) =>
    action$.ofType(INIT).switchMap(() => {
        return Observable.empty();
    });

const fetchSemesterListEpic = (action$) => (
    action$.ofType(FETCH_SEMESTER_LIST)
        .switchMap(() => {
            return request({
                method: 'get',
                url: `${COURSE_DATA_DOMAIN}/index.json`,
            })
                .flatMap((semesterList) => {
                    const error = null;
                    return of(setSemesterList(error, semesterList));
                })
                .catch((error) => concat(
                    of(setSemesterList(error)),
                    fetchErrorEpic(error)
                ));
        })
);

const fetchCoursesListEpic = (action$) => (
    action$.ofType(FETCH_COURSES_LIST)
        .switchMap((action) => {
            const {
                semester,
            } = action.payload;
            return request({
                method: 'get',
                url: `${COURSE_DATA_DOMAIN}/${semester}/courses.json`,
            })
                .flatMap((coursesList) => {
                    const error = null;
                    return of(setCoursesListMap(
                        error,
                        semester,
                        coursesList,
                    ));
                })
                .catch((error) => concat(
                    of(setCoursesListMap(error)),
                    fetchErrorEpic(error)
                ));
        })
);

const fetchEvaluationListEpic = (action$) => (
    action$.ofType(FETCH_EVALUATION_LIST)
        .switchMap((action) => {
            const semester = '10701';
            return request({
                method: 'get',
                url: `${COURSE_DATA_DOMAIN}/${semester}/evaluation.json`, // to be modify
                // https://raw.githubusercontent.com/progeneral777/nccu_course_data_test/master/10701/evaluation.json
            })
                .flatMap((evaluationList) => {
                    const error = null;
                    return of(setEvaluationList(
                        error,
                        evaluationList,
                    ));
                })
                .catch((error) => concat(
                    of(setEvaluationList(error)),
                    fetchErrorEpic(error)
                ));
        })
);

export default [
    setInit,
    fetchSemesterListEpic,
    fetchCoursesListEpic,
    fetchEvaluationListEpic,
];
