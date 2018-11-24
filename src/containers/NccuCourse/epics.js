import { Observable } from 'rxjs/Rx';
import { COURSE_DATA_DOMAIN } from 'config';
import { request, fetchErrorEpic } from 'utils/request';

import {
    INIT,
    FETCH_SEMESTER_LIST,
    FETCH_COURSES_LIST,
} from './constants';

import {
    setSemesterList,
    setCoursesListMap,
} from './actions';

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
                    return Observable.of(setSemesterList(semesterList));
                })
                .catch(fetchErrorEpic);
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
                    return Observable.of(setCoursesListMap(
                        semester,
                        coursesList,
                    ));
                })
                .catch(fetchErrorEpic);
        })
);

export default [
    setInit,
    fetchSemesterListEpic,
    fetchCoursesListEpic,
];
