export const columnsOptions = () => {
    return [
        {
            name: '序号',
            dataindex: 'index',
            width: 80,
        }, {
            name: '领取备用金日期',
            dataindex: 'receiveDate',
            width: 180,
        }, {
            name: '门店',
            dataindex: 'shopName',
            width: 240,
        }, {
            name: '收银员名称',
            dataindex: 'employeeName',
            width: 180,
        }, {
            name: '合计领取金额',
            dataindex: 'receiveAmount',
            width: 180,
        }, {
            name: '操作人',
            dataindex: 'operatorName',
            width: 180,
        }, {
            name: '操作时间',
            dataindex: 'updateTime',
            width: 120,
        },
    ];
};
export const searchOptions = ({
    shopList, onShopChange, employees, shopEmployees,
}) => {
    return [
        {
            selfname: '领取日期',
            selfid: 'receiveDate',
            selftype: 'datepicker',
            selfDatePickerType: 'rangepicker',
            format: 'YYYY/MM/DD',
        }, {
            selfname: '所属门店',
            selfid: 'shopCode',
            selftype: 'searchSelect',
            selfOptions: shopList.map((item) => {
                return {
                    id: item.shopCode,
                    name: item.shopName,
                };
            }),
            onChange: onShopChange,
        }, {
            selfname: '收银员',
            selfid: 'jobNo',
            selftype: 'searchSelect',
            selfOptions: employees.map((item) => {
                return {
                    id: item.jobNo,
                    name: item.employeeName,
                };
            }),
        }, {
            selfname: '操作人',
            selfid: 'operatorNo',
            selftype: 'searchSelect',
            selfOptions: shopEmployees.map((item) => {
                return {
                    id: item.employeeId,
                    name: item.employeeName,
                };
            }),
        },
    ];
};
