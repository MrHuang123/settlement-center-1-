import common from './common';
import home from '../app/Home/model';
import changePassword from '../app/ChangePassword/model';
import login from './login';
import categoryNew from '../app/AccountsManage/Category/New/model';
import ruleNew from '../app/AccountsManage/Rule/New/model';
import classList from '../app/AccountsManage/Class/List/model';
import classNew from '../app/AccountsManage/Class/New/model';
import innerList from '../app/AccountsManage/Inner/List/model';
import innerNew from '../app/AccountsManage/Inner/New/model';
import categoryList from '../app/AccountsManage/Category/List/model';
import ruleList from '../app/AccountsManage/Rule/List/model';
import accountManageClass from '../app/AccountsManage/Class/model';
import accountManageInner from '../app/AccountsManage/Inner/model';
import accountManageOut from '../app/AccountsManage/Out/List/model';
import accountManageRule from '../app/AccountsManage/Rule/model';
import flowList from '../app/AccountsQuery/Flow/List/model';
import inoutList from '../app/AccountsQuery/Inout/List/model';
import bussinessList from '../app/AccountsQuery/BussinessList/model';
import innerBalance from '../app/AccountsQuery/InnerBalance/List/model';
import innerHistoryBalance from '../app/AccountsQuery/InnerHistoryBalance/List/model';
import errorHandleList from '../app/VerifyManage/ErrorHandle/List/model';
import errorHandleDetail from '../app/VerifyManage/ErrorHandle/Detail/model';
import errorHandleVerifyList from '../app/VerifyManage/ErrorHandleVerify/List/model';
import errorHandleVerifyDetail from '../app/VerifyManage/ErrorHandleVerify/Detail/model';
import bindIncome from '../app/VerifyManage/BindIncome/List/model';
import bindIncomeDetail from '../app/VerifyManage/BindIncome/Detail/model';
import modal from '../app/VerifyManage/BindIncomeVerify/List/Component/model';
import process from '../app/Treasury/ThirdVerifyManage/Process/model';
import gatherResult from '../app/VerifyManage/GatherResult/List/model';
import bindIncomeNew from '../app/VerifyManage/BindIncome/New/model';
import incomeVerify from '../app/VerifyManage/BindIncomeVerify/List/model';
import warnRuleList from '../app/VerifyWarn/WarnRule/List/model';
import warnContactList from '../app/VerifyWarn/WarnContact/List/model';
import warnContactNew from '../app/VerifyWarn/WarnContact/New/model';
import warnRecordList from '../app/VerifyWarn/WarnRecord/List/model';
import warnAssetList from '../app/VerifyManage/Asset/List/model';
import warnAssetVerifyList from '../app/VerifyManage/AssetVerify/List/model';
import outMoney from '../app/ClearManage/OutMoney/List/model';
import statement from '../app/ClearManage/Statement/List/model';
import payVerify from '../app/ClearManage/PayManage/PayVerify/List/model';
import payProcess from '../app/ClearManage/PayManage/PayProcess/List/model';
import payFail from '../app/ClearManage/PayManage/PayFail/List/model';
import merchant from '../app/ClearInfoManage/MerchantDetail/List/model';
import custom from '../app/ClearInfoManage/CustomDetail/List/model';
import payOperate from '../app/ClearManage/PayManage/PayOperate/List/model';
import payEbank from '../app/ClearManage/PayEbankManage/List/model';
import orgPay from '../app/ClearManage/PayManage/OrgPay/List/model';
import orgBalance from '../app/ClearInfoManage/OrgBalance/model';
import param from '../app/ClearManage/Acc/Param/List/model';
import tradeQuery from '../app/ClearManage/Acc/Trade/List/model';
import taxPush from '../app/Tax/TaxPush/List/model';
import payment from '../app/Payment/Onbehalf/List/model';
import partner from '../app/Payment/Partner/List/model';
import merchantloan from '../app/ClearManage/SettlementPeriod/MerchantLoan/List/model';
import merchantloanSet from '../app/ClearManage/SettlementPeriod/MerchantLoan/Set/model';
import busClear from '../app/ClearManage/SettlementPeriod/BusClear/List/model';
import busClearSet from '../app/ClearManage/SettlementPeriod/BusClear/Set/model';
import spareAccount from '../app/Spare/SpareManage/List/model';
import riskTotal from '../app/Spare/Risk/RiskTotal/model';
import riskRule from '../app/Spare/Risk/RiskRule/model';
import spareInout from '../app/Spare/InoutDetail/model';
import supplier from '../app/ClearManage/SettlementPeriod/Supplier/List/model';
import supplierSet from '../app/ClearManage/SettlementPeriod/Supplier/Set/model';
import treasuryStaffManage from '../app/Treasury/TreasuryPayment/StaffManage/model';
import treasuryReceiveSpare from '../app/Treasury/TreasuryPayment/ReveiveSpare/model';
import turninSpare from '../app/Treasury/TreasuryPayment/TurnInSpare/List/model';
import turninDailyTotal from '../app/Treasury/TreasuryPayment/TurnInDailyTotal/List/model';
import differenceManage from '../app/Treasury/TreasuryPayment/DifferenceManage/List/model';
import differenceVerify from '../app/Treasury/TreasuryPayment/DifferenceVerify/List/model';
import tradeInout from '../app/Treasury/TreasuryPayment/TradeInout/List/model';
import BindIncomeVerifyNew from '../app/Treasury/TreasuryPayment/BindMedia/Cash/New/model';
import storeDaily from '../app/Treasury/StoreDaily/model';
import complaintWithdrawal from '../app/Treasury/TreasuryPayment/ComplaintWithdrawal/model';
import summaryPaymentDate from '../app/Treasury/TreasuryPayment/SummaryPaymentDate/model';
import bindMediaCashList from '../app/Treasury/TreasuryPayment/BindMedia/Cash/List/model';

export default {
    common,
    home,
    changePassword,
    login,
    categoryNew,
    ruleNew,
    classList,
    classNew,
    innerList,
    innerNew,
    accountManageClass,
    accountManageInner,
    accountManageRule,
    categoryList,
    ruleList,
    flowList,
    inoutList,
    bussinessList,
    innerBalance,
    innerHistoryBalance,
    errorHandleList,
    errorHandleDetail,
    errorHandleVerifyList,
    errorHandleVerifyDetail,
    bindIncome,
    modal,
    process,
    gatherResult,
    bindIncomeNew,
    incomeVerify,
    warnRuleList,
    bindIncomeDetail,
    warnContactList,
    warnContactNew,
    warnRecordList,
    warnAssetList,
    warnAssetVerifyList,
    outMoney,
    statement,
    payVerify,
    payProcess,
    payFail,
    accountManageOut,
    merchant,
    payOperate,
    orgPay,
    orgBalance,
    payEbank,
    custom,
    param,
    tradeQuery,
    taxPush,
    payment,
    partner,
    merchantloan,
    merchantloanSet,
    busClear,
    busClearSet,
    spareAccount,
    riskTotal,
    riskRule,
    spareInout,
    supplier,
    supplierSet,
    treasuryStaffManage,
    treasuryReceiveSpare,
    BindIncomeVerifyNew,
    turninSpare,
    turninDailyTotal,
    differenceManage,
    differenceVerify,
    tradeInout,
    storeDaily,
    complaintWithdrawal,
    summaryPaymentDate,
    bindMediaCashList,
};
