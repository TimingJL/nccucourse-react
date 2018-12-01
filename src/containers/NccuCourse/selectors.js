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

export {
  selectSemesterList,
  selectCoursesListMap,
  selectIsLoading,
};