import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import SemesterSelectPage from './SemesterSelectPage';
import CourseListPage from './CourseListPage';
import history from 'utils/history';

export const routePathConfig = {
    semesterSelectPagePath: '/',
    courseListPagePath: '/:semester',
};

export default () => (
    <Router history={history}>
        <Switch>
            <Route exact path={routePathConfig.semesterSelectPagePath} component={SemesterSelectPage} />
            <Route path={routePathConfig.courseListPagePath} component={CourseListPage} />
        </Switch>
    </Router>
);
