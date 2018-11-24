import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SemesterSelectPage from './SemesterSelectPage';
import CourseListPage from './CourseListPage';

export const routePathConfig = {
    semesterSelectPagePath: process.env.PUBLIC_URL + '/',
    courseListPagePath: process.env.PUBLIC_URL + '/:semester',
};


export default () => (
    <Switch>
        <Route exact path={routePathConfig.semesterSelectPagePath} component={SemesterSelectPage} />
        <Route path={routePathConfig.courseListPagePath} component={CourseListPage} />
    </Switch>
)
