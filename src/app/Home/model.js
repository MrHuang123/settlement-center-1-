import Home from './Service';

export default {
    state: {
    },
    reducers: {

    },
    effects: {
        async asyncLogout(params) {
            const data = await Home.logOut(params);
            return data;
        },
    },
};
