// import { Link } from 'react-router-dom';

export const columnsOptions = [
    {
        name: '序号',
        dataindex: 'number',
    }, {
        name: '内部账户号',
        dataindex: 'accountNum',
        width: 180,
    }, {
        name: '内部账户名称',
        dataindex: 'accountName',
        width: 300,
    }, {
        name: '上日账户余额',
        dataindex: 'lastDayBalance',
    }, {
        name: '当前借方金额',
        dataindex: 'currentDayDebitMoney',
    }, {
        name: '当前贷方金额',
        dataindex: 'currentDayCreditMoney',
    }, {
        name: '账户余额',
        dataindex: 'currentDayBalance',
    },
];
