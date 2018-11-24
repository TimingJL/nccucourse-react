import { Observable } from 'rxjs/Rx';
import { COURSE_DATA_DOMAIN } from 'config';
import { request, fetchErrorEpic } from 'utils/request';

import {
    INIT,
    FETCH_SEMESTER_LIST,
} from './constants';

import {
    setSemesterList
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

export default [
    setInit,
    fetchSemesterListEpic,
];
