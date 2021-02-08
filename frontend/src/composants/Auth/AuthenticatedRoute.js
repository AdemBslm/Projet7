import React from 'react';
import { Redirect } from 'react-router-dom';
import {Auth} from './Auth';

const AuthenticatedRoute = ({ path, component }) => {
    const { isAuthenticated } = useContext(Auth);

    return isAuthenticated ? (
        <Route exact path={path} component={component} />
    ) : (
        <Redirect to='/' />
    )
}

export default AuthenticatedRoute;