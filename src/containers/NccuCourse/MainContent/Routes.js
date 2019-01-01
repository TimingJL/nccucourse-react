import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import SemesterSelectPage from './SemesterSelectPage';
import CourseListPage from './CourseListPage';
import CourseDetailPage from './CourseDetailPage';
import history from 'utils/history';

export const routePathConfig = {
    semesterSelectPagePath: '/',
    courseListPagePath: '/:semester',
    courseDetailPagePath: '/:semester/:courseId',
};

export default () => (
    <Router history={history}>
        <Switch>
            <Route exact path={routePathConfig.semesterSelectPagePath} component={SemesterSelectPage} />
            <Route exact path={routePathConfig.courseListPagePath} component={CourseListPage} />
            <Route exact path={routePathConfig.courseDetailPagePath} component={CourseDetailPage} />
        </Switch>
    </Router>
);
