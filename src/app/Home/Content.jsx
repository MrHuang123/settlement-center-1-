import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Layout, Breadcrumb } from 'antd';
import Router from '../../router/Router';
import RouterConfig from '../../router/RouterConfig';
import Config from '../../../config/config';

const { Content } = Layout;

@withRouter
class Contents extends PureComponent {
    static propTypes = {
        location: PropTypes.object,
        menus: PropTypes.array,
    };

    static defaultProps = {
        location: {},
        menus: [],
    };

    constructor(props) {
        super(props);
        if (Config.hasBreadcrum) {
            this.breadcrumbNameMap = {};
            RouterConfig.forEach((item) => {
                if (item.text && item.path) {
                    this.breadcrumbNameMap[item.path] = item.text;
                }
            });
        }
    }

    render() {
        const {
            location = {
                pathname: '',
            },
            menus,
        } = this.props;
        let contentPadding = 24;
        let contentMargin = '24px 16px';
        let pathSnippets = [];
        let extraBreadcrumbItems = [];
        if (location.pathname && ['/welcome', '/permission'].indexOf(location.pathname) > -1) {
            contentPadding = 0;
            contentMargin = 0;
        }
        if (Config.hasBreadcrum) {
            pathSnippets = location.pathname.split('/').filter((i) => { return i; });
            extraBreadcrumbItems = pathSnippets.map((_, index) => {
                const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
                return (
                    <Breadcrumb.Item key={url}>
                        <Link to={url}>{this.breadcrumbNameMap[url]}</Link>
                    </Breadcrumb.Item>
                );
            });
        }
        return (
            <Fragment>
                {
                    Config.hasBreadcrum
                        ? <Breadcrumb style={{ margin: '8px 0 -12px 16px' }}>{extraBreadcrumbItems}</Breadcrumb>
                        : null
                }
                <Content
                    style={{
                        margin: contentMargin,
                        padding: contentPadding,
                        background: '#fff',
                        minHeight: 'auto',
                        position: 'relative',
                    }}
                >
                    {Router.genRouter(menus)}
                </Content>
            </Fragment>
        );
    }
}

export default Contents;
