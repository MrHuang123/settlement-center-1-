/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    HashRouter,
    BrowserRouter,
    MemoryRouter,
    StaticRouter,
    Switch,
    Route,
} from 'react-router-dom';
import {
    Layout,
    Icon,
    Menu,
    Dropdown,
    Button,
    Spin,
} from 'antd';
import { Loading } from 'bnq-sys-react-component';
import { Tools } from '../../util';
import './index.less';
import Config from '../../../config/config';
import SiderMenu from '../../components/SiderMenu';
import Contents from './Content';
import RouterLogin from '../../router/RouterLogin';

const { Header } = Layout;
const { routeType, hasLogin } = Config;

class Home extends Component {
    static propTypes = {
        getMenus: PropTypes.func,
        menu: PropTypes.array,
        asyncLogout: PropTypes.func,
    };

    static defaultProps = {
        getMenus: () => { },
        menu: [],
        asyncLogout: () => { },
    };

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false, // 当前侧边栏收起状态
            isShowUserOption: false,
        };
    }

    async componentDidMount() {
        const {
            getMenus,
            getSysAllDictItems,
            asyncGetOrg,
        } = this.props;
        if (window.location.pathname !== '/login') {
            getSysAllDictItems();
            asyncGetOrg();
            getMenus();
        }
    }

    /**
     * 渲染左侧菜单
     */
    genMenu = () => {
        // const menu = menus;
        const { menu } = this.props;
        const { collapsed } = this.state;
        return menu
            ? (
                <SiderMenu
                    menu={menu}
                    collapsed={collapsed}
                    setMenuCollapsed={() => { this.setMenuCollapsed(); }}
                    {...this.props}
                />
            ) : null;
    };

    /**
     * 设置菜单收缩状态
     */
    setMenuCollapsed = (iscollapsed) => {
        const collapsed = iscollapsed || !this.state.collapsed;
        this.setState({ collapsed });
    };

    _logout = () => {
        this.setState({ isShowUserOption: false });
        this.props.logOut();
    };

    /**
     * 判断使用的路由方式
     */
    _getRouteType() {
        switch (routeType) {
            case 'browser':
                return BrowserRouter;
            case 'memory':
                return MemoryRouter;
            case 'static':
                return StaticRouter;
            default:
                return HashRouter;
        }
    }

    showDict = (arr, code) => {
        if (arr) {
            // eslint-disable-next-line no-restricted-syntax
            for (const v of arr) {
                // eslint-disable-next-line eqeqeq
                if (v.value == code) {
                    return v.title;
                }
            }
        } else {
            return '';
        }
        return '';
    }

    render() {
        // 获取用户名
        const username=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):'';
        const RouterType = this._getRouteType();
        const { isShowUserOption } = this.state;
        const {
            menu,
        } = this.props;
        const{
            sysAllDictItems,
            orgCode,
        }=this.props;
        const menuLogin = (
            <Menu>
                {/* <Menu.Item>
                    <Link to={`/login`}>登录</Link>
                </Menu.Item> */}
                <Menu.Item onClick={this._logout}>
                    <span>退出</span>
                </Menu.Item>
            </Menu>
        );
        const menuOrg = (
            <Menu>
                {
                    sysAllDictItems.org_no ? sysAllDictItems.org_no.map(item => {
                        return (
                            <Menu.Item key={item.value} onClick={() => {
                                const {
                                    asyncToggleOrg
                                } = this.props;
                                asyncToggleOrg({
                                    orgCode: item.value
                                }).then(data => {
                                    if (data.code === 200) {
                                        // message.success(`切换所在机构:${item.title}`);
                                        window.location.reload();
                                    } else {
                                        message.error(data.message);
                                    }
                                });
                            }}>
                                <span style={{
                                    fontWeight: item.value === orgCode ? 'bold' : '',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    {
                                        item.value === orgCode ?
                                            <Icon type="environment" /> : ''
                                    }
                                    {item.title}
                                </span>
                            </Menu.Item>
                        )
                    }) : ''
                }
            </Menu>
        );
        return (
            <RouterType>
                <Switch>
                    {
                        hasLogin ? RouterLogin.getRouters() : null
                    }
                    <Route render={() => {
                        return (
                            <Layout className="container">
                                
                                    {this.genMenu()}
                                    <Layout className="ant-layout-ie9">
                                        <Header className="header">
                                            <Icon
                                                className="trigger"
                                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                                onClick={() => { this.setMenuCollapsed(); }}
                                            />
                                            <div className='btngroup'>
                                                <Dropdown className="userContainer" overlay={menuOrg} placement="bottomLeft">
                                                    <Button className='userCompany'>
                                                        <Icon type="down" />当前所在机构:{this.showDict(sysAllDictItems.org_no,orgCode)}
                                                    </Button>
                                                </Dropdown>
                                                
                                                <Dropdown className="userContainer" overlay={menuLogin} placement="bottomLeft">
                                                    <Button icon="user">{username?username.realname:'请登录'}</Button>
                                                </Dropdown>
                                            </div>
                                        </Header>
                                        <Layout style={{ background: '#eee' }}>
                                            {this.state.loading
                                                ? <Loading />
                                                : <Contents menus={menu} />
                                            }
                                        </Layout>
                                    </Layout>
                            </Layout>
                        );
                    }}
                    />
                </Switch>
            </RouterType>
        );
    }
}

const mapDispatch = (dispatch) => {
    return {
        asyncLogout: dispatch.home.asyncLogout,
        logOut: dispatch.login.asyncLogout,
        getMenus: dispatch.common.asyncGetMenus,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
        asyncToggleOrg: dispatch.common.asyncToggleOrg,
        asyncGetOrg: dispatch.common.asyncGetOrg,
    };
};

const mapState = (state) => {
    return {
        menu: state.common.menus,
        orgCode: state.common.orgCode,
        sysAllDictItems: state.login.sysAllDictItems,
        loading: state.loading.effects.home.asyncLogout,
    };
};
export default connect(mapState, mapDispatch)(Home);
