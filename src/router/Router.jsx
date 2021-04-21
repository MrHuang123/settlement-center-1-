/**
 * @Description: 定义路由组件
 * @author 王发靖 Fajing.Wang@b-and-qchina.com
 * @date 2019/2/18
 */

import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Loading, Exception } from 'bnq-sys-react-component';
import Loadable from 'react-loadable';
import RouteConfig from './RouterConfig';
import { openPaths, hasPermission } from '../../config/config';
import { TreeIterator } from '../util';


export default class RouterGenerator {
    static genRouter(menus) {
        const routers = RouterGenerator.getRouters(RouteConfig, menus);
        return (
            <Switch>
                {
                    routers.map((route) => {
                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                exact={route.exact}
                                component={route.main}
                            />
                        );
                    })
                }
                <Redirect exact from="/" to="/welcome" />
                <Route component={() => { return <Exception type="404" />; }} />
            </Switch>
        );
    }

    static routers = null;

    static openPaths = openPaths;

    /**
     *  校验权限
     * @param path
     * @returns {boolean}
     */
    static validatePermission(path, menus) {
        // 可以访问的菜单
        if (RouterGenerator.openPaths.includes(path)) {
            return true;
        }
        const targetMenu = TreeIterator.filter(menus, (item) => {
            return item.path === path;
        });
        return targetMenu.length > 0;
    }

    /**
     *  设置菜单白名单
     * @param path
     */
    static setOpenPaths(path) {
        if (!path) {
            return;
        }
        if (typeof path === 'string') {
            RouterGenerator.openPaths.push(path);
        } else if (path instanceof Array) {
            RouterGenerator.openPaths = RouterGenerator.openPaths.concat(path);
        }
    }

    /**
     *  获取路由
     * @param routerConf
     * @returns {boolean}
     */
    static getRouters(routerConf, menus) {
        RouterGenerator.routers = RouterGenerator.routers || [];
        if (!RouterGenerator.routers.length !== routerConf.length) {
            RouterGenerator.routers = routerConf.map((router) => {
                return {
                    path: router.path,
                    exact: router.exact,
                    main: Loadable({
                        loader: () => { return router.page() || Loading; },
                        loading: (props) => {
                            if (props.error) {
                                window.console.error(props.error);
                            }
                            return <Loading />;
                        },
                        render(loaded, props) {
                            const Component = loaded.default;
                            if (hasPermission) {
                                const flag = RouterGenerator.validatePermission(router.path, menus);
                                return flag ? <Component {...props} /> : <Exception type={403} />;
                            }
                            return <Component {...props} />;
                        },
                    }),
                };
            });
        }
        return RouterGenerator.routers;
    }
}
