import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SemesterSelectPage from './SemesterSelectPage';

export default () => (
    <Switch>
        <Route exact path="" component={SemesterSelectPage} />
    </Switch>
)
