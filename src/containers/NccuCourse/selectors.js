import {
  LOADING,
} from 'utils/meta';
import { createSelector } from 'reselect';

const nccuCourse = state => state.get('nccuCourse');

const selectSemesterList = () =>
  createSelector(nccuCourse, nccuCourseState =>
    nccuCourseState.get('semesterList'),
  );

const selectCoursesListMap = () =>
  createSelector(nccuCourse, nccuCourseState =>
    nccuCourseState.get('coursesListMap'),
  );

const selectEvaluationList = () =>
  createSelector(nccuCourse, nccuCourseState =>
    nccuCourseState.get('evaluationList'),
  );

const selectSemesterListIsLoading = () =>
  createSelector(nccuCourse, nccuCourseState =>
    nccuCourseState.getIn(['semesterListMeta', LOADING]),
  );

const selectCoursesListMapIsLoading = () =>
  createSelector(nccuCourse, nccuCourseState =>
    nccuCourseState.getIn(['coursesListMapMeta', LOADING]),
  );

const selectEvaluationListIsLoading = () =>
  createSelector(nccuCourse, nccuCourseState =>
    nccuCourseState.getIn(['evaluationListMeta', LOADING]),
  );

const selectFilter = () =>
  createSelector(nccuCourse, nccuCourseState =>
    nccuCourseState.get('filter'),
  );

export {
  selectSemesterList,
  selectCoursesListMap,
  selectEvaluationList,
  selectSemesterListIsLoading,
  selectCoursesListMapIsLoading,
  selectEvaluationListIsLoading,
  selectFilter,
};
