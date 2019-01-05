import { fromJS } from 'immutable';
import meta, {
    updateMetaLoading,
    updateMetaDone,
    updateMetaError,
} from 'utils/meta';
import {
    FETCH_SEMESTER_LIST,
    FETCH_COURSES_LIST,
    FETCH_EVALUATION_LIST,
    SET_SEMESTER_LIST,
    SET_COURSES_LIST_MAP,
    SET_EVALUATION_LIST,
    SET_SEARCH_KEY,
    SET_FILTER_KEY,
    SET_SELECTED_SESSION_CLASS,

    ADD_FILTER_KEYS,
    REMOVE_FILTER_KEY,
    SESSION_WEEKDAYS,
    SESSION_CLASS,
    ALL,
} from './constants';

//  nccucourse-data/10701/courses.json
//  nccucourse-data/10701/evaluation.json

const initialState = fromJS({
    semesterList: [],
    coursesListMap: {},
    evaluationList: [],
    semesterListMeta: meta,
    coursesListMapMeta: meta,
    evaluationListMeta: meta,
    filter: {
        searchKey: "",
        filterKeys: [],
        selectedSession: SESSION_WEEKDAYS.map((weekday) => ({
            weekday,
            sessionClass: '',
        })),
    },
});

// coursesListMap: {
//   10701: [{...}, {...}, ...],
//   10702: [{...}, {...}, ...],
// }

function nccuCourseReducer(state = initialState, action) {
    const {
        error,
    } = action;
    switch (action.type) {
        case FETCH_SEMESTER_LIST: {
            return state.update('semesterListMeta', updateMetaLoading);
        }
        case SET_SEMESTER_LIST: {
            if (error) {
                return state.update('semesterListMeta', updateMetaError);
            }
            return state
                .set('semesterList', fromJS(action.payload.semesterList))
                // .set('semesterList', fromJS([
                //     {semester: '10701'},
                //     {semester: '10702'},
                //     {semester: '10801'},
                //     {semester: '10802'},
                // ]))
                .update('semesterListMeta', updateMetaDone);
        }
        case FETCH_COURSES_LIST: {
            return state.update('coursesListMapMeta', updateMetaLoading);
        }
        case SET_COURSES_LIST_MAP: {
            const {
                semester,
                coursesList,
            } = action.payload;
            if (error) {
                return state.update('coursesListMapMeta', updateMetaError);
            }
            return state
                .updateIn(['coursesListMap'], (coursesListMap) =>
                    coursesListMap.set(semester, fromJS(coursesList)))
                .update('coursesListMapMeta', updateMetaDone);
        }
        case FETCH_EVALUATION_LIST: {
            return state.update('evaluationListMeta', updateMetaLoading);
        }
        case SET_EVALUATION_LIST: {
            if (error) {
                return state.update('evaluationListMeta', updateMetaError);
            }
            return state
                .set('evaluationList', fromJS(action.payload.evaluationList))
                .update('evaluationListMeta', updateMetaDone);
        }
        case SET_SEARCH_KEY: {
            const {
                searchKey,
            } = action.payload;
            return state.setIn(['filter', 'searchKey'], searchKey);
        }
        case SET_FILTER_KEY: {
            const {
                filterKey,
            } = action.payload;
            return state.updateIn(['filter', 'filterKeys'], (filterKeys) => {
                return filterKeys.includes(filterKey)
                    ? filterKeys
                    : filterKeys.push(filterKey);
            });
        }
        case ADD_FILTER_KEYS: {
            const {
                keys,
            } = action.payload;
            return state
                .updateIn(['filter', 'filterKeys'], (filterKeys) => {
                    let updatedFilterKeys = filterKeys;
                    keys.forEach((key) => {
                        if (!filterKeys.includes(key) && key.length) { // to avoid duplicate and empty filterKey
                            updatedFilterKeys = updatedFilterKeys.push(key);
                        }
                    });
                    return updatedFilterKeys;
                })
                .setIn(['filter', 'searchKey'], "");
        }
        case REMOVE_FILTER_KEY: {
            const {
                dataFilterType,
                key,
            } = action.payload;
            if (dataFilterType === 'selectedSession') {
                const updatedState = state.updateIn(['filter', 'selectedSession'], (sessions) => sessions.map((session) => session.get('weekday') === key
                    ? session.set('sessionClass', '')
                    : session));
                return updatedState;
            }
            return state
                .updateIn(['filter', 'filterKeys'], (filterKeys) => filterKeys.remove(filterKeys.indexOf(key)));
        }
        case SET_SELECTED_SESSION_CLASS: {
            const {
                weekday,
                sessionClass,
            } = action.payload;
            return state.updateIn(['filter', 'selectedSession'], (selectedSession) => {
                if (sessionClass === ALL) {
                    return selectedSession.map((session) => {
                        if (session.get('weekday') === weekday) {
                            if (session.get('sessionClass').length === SESSION_CLASS.length) {
                                return session.set('sessionClass', '');
                            }
                            return session.set('sessionClass', SESSION_CLASS.join().replace(/,/g, ''));
                        }
                        return session;
                    })
                }
                return selectedSession.map((session) => {
                    if (session.get('weekday') === weekday) {
                        const foundSessionClass = session.get('sessionClass').includes(sessionClass);
                        const updatedSessionClass = foundSessionClass
                            ? session.get('sessionClass').replace(sessionClass, '')
                            : [...`${session.get('sessionClass')}${sessionClass}`]
                                .sort((a, b) => {
                                    if (SESSION_CLASS.indexOf(a) > SESSION_CLASS.indexOf(b)) {
                                        return 1;
                                    }
                                    return -1;
                                })
                                .join()
                                .replace(/,/g, '');
                        return session.set('sessionClass', fromJS(updatedSessionClass));
                    }
                    return session;
                });
            });
        }
        default: {
            return state;
        }
    }
};

export default nccuCourseReducer;
