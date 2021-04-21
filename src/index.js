import 'babel-polyfill';
import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigProvider, message } from 'antd';
import providerZhCN from 'antd/lib/locale-provider/zh_CN';
import Home from './app/Home';
import store from './store/index';
import './style/common.css';

// message全局配置
message.config({
    top: '45%',
    duration: 3,
    maxCount: 1,
});
/* eslint-disable */
ReactDOM.render(
    <ConfigProvider locale={providerZhCN}>
        <Provider store={store}>
            <Home />
        </Provider>
    </ConfigProvider>,
    document.getElementById('app'),
);
/* eslint-enable */
