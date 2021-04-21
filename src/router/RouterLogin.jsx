import React from 'react';
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Loading } from 'bnq-sys-react-component';

export default class RouterLogin {
    static getRouters() {
        return (
            <Route
                exact
                path="/login"
                component={Loadable({
                    loader: () => { return import('../app/Login'); },
                    loading: Loading,
                })}
            />
        );
    }
}
