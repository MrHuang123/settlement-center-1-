export const columnsOptions = () => {
    return [
        {
            name: '销售日期',
            dataindex: 'saleDate',
            width: 180,
        }, {
            name: '门店',
            dataindex: 'shopName',
            width: 240,
        }, {
            name: '处理所需金额',
            dataindex: 'withdrawAmount',
            width: 180,
        }, {
            name: '业务类型',
            dataindex: 'withdrawType',
            width: 180,
        },
        {
            name: '处理时间',
            dataindex: 'createDate',
            width: 180,
        },
    ];
};

export const searchOptions = ({ shopList }) => {
    return [
        {
            selfname: '销售日期',
            selfid: 'saleDate',
            selftype: 'datepicker',
            selfDatePickerType: 'rangepicker',
            format: 'YYYY/MM/DD',
        }, {
            selfname: '门店号',
            selfid: 'shopCode',
            selftype: 'searchSelect',
            selfOptions: shopList.map((item) => {
                return {
                    id: item.shopCode,
                    name: item.shopName,
                };
            }),
        }, {
            selfname: '业务类型',
            selfid: 'withdrawType',
            selftype: 'searchSelect',
            // selfOptions: sysAllDictItems.tax_type.map((item) => {
            //     return {
            //         id: item.value,
            //         name: item.text,
            //     };
            // }),
        },
    ];
};
