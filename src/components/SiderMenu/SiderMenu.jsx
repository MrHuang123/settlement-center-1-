/**
 * @Description: 对Ant-design pro的SiderMenu进行重写
 * @author 王发靖 Fajing.Wang@b-and-qchina.com
 * @date 2019/2/19
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { TreeIterator } from '../../util';
import { projectName } from '../../../config/config';
import logoImage from '../../../static/img/logo.jpg';

const { Sider } = Layout;
const { SubMenu } = Menu;

@withRouter
export default class SiderMenu extends Component {
    static propTypes = {
        location: PropTypes.object,
        menu: PropTypes.array,
        children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        collapsed: PropTypes.bool,
        isMobile: PropTypes.bool,
        isIframe: PropTypes.bool,
        defaultOpenKeys: PropTypes.array,
    };

    static defaultProps = {
        location: {},
        menu: [],
        children: [],
        collapsed: false,
        isMobile: false,
        isIframe: false,
        defaultOpenKeys: [],
    };

    constructor(props) {
        super(props);
        this.state = {
            openKeys: [],
        };
        this.defaultOpen = true;
    }

    componentWillReceiveProps(nextProps) {
        if (this.defaultOpen && nextProps.menu && nextProps.menu.length > 0) {
            this.setState({
                openKeys: this.getCurrentOpenKey(nextProps.menu),
            });
        }
    }

    /**
     *  根据路由地址获取获取当前展开菜单keys
     */
    getCurrentOpenKey = (menu) => {
        this.defaultOpen = false;
        const { location: { pathname } } = this.props;
        return menu ? TreeIterator.filterIncludesParents(menu, (item) => {
            return pathname.indexOf(item.path) > -1;
        }).map((m) => {
            return m.key || m.path;
        }) : [];
    };

    /**
     *  根据路由地址获取获取当前选中菜单key
     */
    getSelectedMenuKeys = () => {
        const { location: { pathname }, menu } = this.props;
        const tree = TreeIterator.filter(menu, (item) => {
            return pathname.indexOf(item.path) > -1;
        });
        return tree.map((m) => {
            return m.key || m.path;
        });
    };

    /**
     * 生成菜单
     */
    getNavMenuItems(menusData) {
        const { pathname } = this.props.location;
        if (!menusData) {
            return [];
        }
        return menusData.map((item) => {
            if (!item.name) {
                return null;
            }
            // 需要接入权限在这里打开此选项;
            // if (!item.loaded) {
            //     return null;
            // }
            let itemPath;
            if (item.path && item.path.indexOf('http') === 0) {
                itemPath = item.path;
            } else {
                itemPath = `/${item.path || ''}`.replace(/\/+/g, '/');
            }
            if (item.children && item.children.some((child) => { return child.name; })) {
                return item.hideInMenu ? null
                    : (
                        <SubMenu
                            title={
                                item.icon ? (
                                    <span className="menu-item">
                                        <Icon type={item.icon} />
                                        <span>{item.name}</span>
                                    </span>
                                ) : item.name
                            }
                            key={item.key || item.path}
                        >
                            {this.getNavMenuItems(item.children)}
                        </SubMenu>
                    );
            }
            const icon = item.icon && <Icon type={item.icon} />;
            return item.hideInMenu ? null
                : (
                    <Menu.Item key={item.key || item.path} className="menu-item">
                        {
                            /^https?:\/\//.test(itemPath) ? (
                                <a href={itemPath} target={item.target}>
                                    {icon}
                                    <span>{item.name}</span>
                                </a>
                            ) : (
                                <Link
                                    to={itemPath}
                                    target={item.target}
                                    replace={itemPath === pathname}
                                >
                                    {icon}
                                    <span>{item.name}</span>
                                </Link>
                            )
                        }
                    </Menu.Item>
                );
        });
    }

    /**
     * 菜单展开控制
     */
    handleOpenChange = (openKeys) => {
        const { menu = [] } = this.props;
        const lastOpenKey = openKeys[openKeys.length - 1];
        const openKey = TreeIterator.filterIncludesParents(menu, (item) => {
            return item.children && (item.key || item.path) === lastOpenKey;
        }).map((m) => {
            return m.key || m.path;
        });
        this.setState({
            openKeys: openKey,
        });
    };

    /**
     *  菜单顶部logo和标题
     */
    genLogo = () => {
        const {
            collapsed,
        } = this.props;
        return (
            <div className="logoContainer" style={{ overflow: 'hidden' }}>
                <Link to="/"><img src={logoImage} alt={projectName} className="logo" /></Link>
                {collapsed ? '' : <span className="title">{projectName}</span>}
            </div>
        );
    };

    render() {
        const {
            collapsed, menu, defaultOpenKeys,
        } = this.props;
        const menuProps = collapsed ? {} : {
            openKeys: this.state.openKeys,
        };
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                className="ant-layout-sider-ie9 sider"
                mode={collapsed ? 'vertical' : 'inline'}
                width="230px"
            >
                {this.genLogo()}
                <Menu
                    defaultOpenKeys={defaultOpenKeys}
                    theme="dark"
                    mode="inline"
                    {...menuProps}
                    onOpenChange={this.handleOpenChange}
                    selectedKeys={this.getSelectedMenuKeys()}
                    style={{ width: '100%' }}
                >
                    {this.getNavMenuItems(menu)}
                </Menu>
            </Sider>
        );
    }
}
