/* jshint esversion: 6 */

import * as __URL__ from '../../config/index';
import React from "react";
import { element } from 'prop-types';

export default class Tools {
    /**
     * 对下拉菜单的数据进行处理，以满足Select公共控件对于字段的要求
     * MakeSearch中select的字段类型为[name, id]
     * @param data 原始数据
     * @param maps 字段匹配配置 {key: [] || '' }
     *  key为数组时，按照数组中拿到的第一个有数据的字段来处理
     *  例如后端数据格式为{ name: xxx, id: 1, code: 'x111'}
     *  传入maps {id: ['code', id]} 则在后端数据code有值时使用code code无数据时使用id
     * @returns {{name: *, id: *}[]}
     */
    static mapSelect = (data = [], maps = {}) => {
        return data.map((item) => {
            let name = 'name';
            let id = 'id';
            if (Array.isArray(maps.name)) {
                name = maps.name.find((findItem) => {
                    return Boolean(item[findItem]);
                });
            } else if (typeof maps.name === 'string') {
                name = maps.name;
            }
            if (Array.isArray(maps.id)) {
                id = maps.id.find((findItem) => {
                    return Boolean(item[findItem]);
                });
            } else if (typeof maps.id === 'string') {
                id = maps.id;
            }
            return {
                name: item[name],
                id: item[id],
            };
        });
    };
    /**
     * 生成tabal的columns方法
     * @param options  [{
     *     name: string.isRequired
     * }]，需传递name dataindex
     * @returns {*}
     */
    static genTableOptions = (options) => {
        return options.map((item) => {
            return {
                ...item,
                title: item.name,
                dataIndex: item.dataindex,
                key: item.dataindex,
                width: item.width || 120,
                className: 'tableStyle',
                render: typeof item.render === 'function' && item.render,
            };
        });
    };

    static createUrl = (request) => {
        let { url } = request;
        const { param } = request;

        if (param) {
            url = !url.includes('?') && `${url}?`;
            for (const key of Object.keys(param)) {
                url = `${url + key}=${encodeURI(param[key])}&`;
            }
            if (url.endsWith('&')) {
                url = url.substring(0, url.length - 1);
            }
        }
        return url;
    };

    static getUrlArg = (name, isSearchFromCookies) => {
        let { search } = window.location;
        // IE9(通过window.history.replaceState来判断IE9和其他浏览器，不考虑IE8及以下浏览器)时，search的值从cookie中获取
        if (isSearchFromCookies && !window.history.replaceState) {
            search = unescape(getCookie('CURRENT_SEARCH'));
        }
        const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
        const arg = search.substr(1).match(reg);
        return arg ? arg[2] : '';
    };

    static getCookie = (cookieName) => {
        const cookieStr = decodeURI(document.cookie);
        const arr = cookieStr.split('; ');
        let cookieValue = '';
        for (let i = 0; i < arr.length; i++) {
            const temp = arr[i].split('=');
            if (temp[0] == cookieName) {
                cookieValue = temp[1];
                break;
            }
        }
        return decodeURI(cookieValue);
    };

    static setCookie = (name, value) => {
        const days = 30;
        const exp = new Date();
        exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${escape(value)};expires=${exp.toGMTString()}`;
    }

    static download=(data,name)=>{
        if (!data) {
          return;
        }
        let BLOB = new Blob([data]);
        let url = window.URL.createObjectURL(BLOB);
        let link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        link.setAttribute('download', name);
        document.body.appendChild(link);
        link.click();
    }

    static print=(elementClassName)=>{
        window.document.body.innerHTML = window.document.getElementsByClassName(elementClassName)[0].innerHTML;
        window.print();
        window.location.reload();
    }
}
