import { createSelector } from 'reselect';

const nccuCourse = state => state.get('nccuCourse');

const selectSemesterList = () =>
  createSelector(nccuCourse, nccuCourseState =>
    nccuCourseState.get('semesterList'),
  );

export {
  selectSemesterList
};
