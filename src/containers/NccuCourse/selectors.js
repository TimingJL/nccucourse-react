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

const selectIsLoading = () =>
  createSelector(nccuCourse, nccuCourseState =>
    nccuCourseState.get('isLoading'),
  );

const selectFilter = () =>
  createSelector(nccuCourse, nccuCourseState =>
    nccuCourseState.get('filter'),
  );

export {
  selectSemesterList,
  selectCoursesListMap,
  selectIsLoading,
  selectFilter,
};
