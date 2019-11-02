import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import layoutWrapper from '../hoc/layoutWrapper';
import User from '../addForm';

const AppRouter = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={layoutWrapper(User)} exact />
        </Switch>
    </BrowserRouter>
);

export default AppRouter;
