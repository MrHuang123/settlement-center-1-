/* eslint-disable  */
export const stateList=[{
    id:'01',
    name:'有效',
},{
    id:'02',
    name:'失效',
}]
export const columnsOptions = (sysAllDictItems) => [
    {
        name: '序号',
        dataindex: 'index',
        width: 80,
    }, {
        name: '备用金账户',
        dataindex: 'pettyCashAccount',
        width: 180,
    }, {
        name: '备用金账户名称',
        dataindex: 'pettyCashAccountname',
        width: 120,
    }, {
        name: '账户额度',
        dataindex: 'accountQuota',
    }, {
        name: '当前可用额度',
        dataindex: 'availableCredit',
    }, {
        name: '账户状态',
        dataindex: 'state',
        render:(text)=>{
            let result='';
            stateList.forEach(item=>{
                if(item.id==text){
                    result=item.name;
                }
            });
            return result;
        },
    }, {
        name: '最后修改时间',
        dataindex: 'updatetime',
        width: 240,
    }
];
