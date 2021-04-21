const url = {
    development: {
        targetUrl: 'https://accm-dev.bnq.com.cn',
        apiUrl: 'http://framework.bnq.com.cn:8888',
        apiUrlFilter: '/accm-web',
        authUrl: 'http://auth-dev.bnq.com.cn',
        loginAddress: 'http://auth-dev.bnq.com.cn/login/login.html',
        authUrlFilter: '/auth',
        port: 8888,
        autoOpenBrowser: true,
        proxyFilter: '/accm-web',
        addressUrl: 'http://web.futureshop.dev-zt.bnq.com.cn:8088/areas/district',
    },
    prodDev: {
        apiUrl: 'https://accm-dev.bnq.com.cn',
        apiUrlFilter: '/accm-web',
        addressUrl: 'http://customer-dev.bnq.com.cn/areas/district',
        authUrl: 'http://auth-dev.bnq.com.cn',
        loginAddress: 'http://auth-dev.bnq.com.cn/login/login.html',
        authUrlFilter: '/auth',
    },
    test: {
        apiUrl: 'https://accm-test.bnq.com.cn',
        apiUrlFilter: '/accm-web',
        addressUrl: 'http://customer-test.bnq.com.cn/areas/district',
        authUrl: 'http://auth-test.bnq.com.cn',
        loginAddress: 'http://auth-test.bnq.com.cn/login/login.html',
        authUrlFilter: '/auth',
    },
    production: {
        apiUrl: 'https://accm.bnq.com.cn',
        apiUrlFilter: '/accm-web',
        addressUrl: 'http://customer.bnq.com.cn/areas/district',
        authUrl: 'http://auth.bnq.com.cn',
        loginAddress: 'http://auth.bnq.com.cn/login/login.html',
        authUrlFilter: '/auth',
    },
};

module.exports = url;
