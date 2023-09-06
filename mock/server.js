const jsonServer = require('json-server');
const server = require('json-server').create();
const middlewares = jsonServer.defaults();
const port = 2345;
const rootDomain = '/mock-api';
const db = require('./db');

const genRoute = (path = null) => `${path ? rootDomain + path : rootDomain}`;

/**Az api 基本格式*/
const Res = (errCode, msg) => body => ({
    ReturnType: '',
    ReturnCode: errCode || '0',
    ReturnMessage: msg || '',
    ReturnResult: errCode ? '' : body
});

const basicRes = Res();
const err99 = Res('99', 'api發生錯誤');

server.use(middlewares);
server.use(jsonServer.bodyParser);
//---------------------------------api routers
//dev 對應 uat keyId
const id2Data = {
    ZOINragJyQavhRkmtaIOsMQmDZlTugjufGmUYMFA: db.s001,
    /**HIERARCHY_QUERY 組織查詢 */
    SotBPiqkhXOJbzQPvIBBETFwLQNXkpgwPTzaKQqE: db.org001,
    /**TWOMONTH_ATTENDANCE_REC 取得雙月份出勤紀錄 */
    IVDhhlrVMlQQCFkVxMtZiVDEhbBjICRfMXUrgyOD: db.ym001,
    /**ABSENCE_YEAR_REC 年度假別資訊 */
    HPNOplXLeTrOyvBtwOfXLHdImltZTtnVOuKumKgw: db.ym002,
    /**ANNUAL_LEAVE_QUOTA 特別假額度資訊 */
    WnhGWBgjnhjgAsuftRgvBkGGAbATLiNZiDLbiCeR: db.ym003,
    /**PERIOD_ATTENDANCE_REC 區間出勤紀錄 */
    vpxaRXvlnTmQxHJHeYfoBTnselEQuuzfZBNiPUBO: db.tber001,
    /** PERIOD_ABSENCE_REC 區間出勤紀錄 */
    ArAvJRfcYlfnBVCZLcpSWhLTgLZvTSyyDujoRkEV: db.tbof001,
    /**ADD_AGENT_DELEGATE 新增代理人資料 */
    eOSkRvkwBpLflgpDZuGXftZBjwwUXgvoVREkLdWp: db.subp001,
    /**DLT_AGENT_DELEGATE 刪除代理人資料 */
    vsUprdttmErggalwTvQtWAtjarVeqCrjJHUikHzp: db.subp002,
    /**AGENT_DELEGATE_LIST 代理人名單資料 下拉選項 */
    BdibLWDfcvGagGOzRFUnCTFmpSiyKaiZRsKRiECB: db.subp003,
    /**AGENT_DELEGATE_QUERY 代理人歷史資料查詢 */
    CevAXwfjLTpobhoHODKgWCyMPVzGaDxAvszPIScd: db.subp004,
    /**UPD_AGENT_DELEGATE 修改代理人資料 */
    ZZRWdJyCsTasHXhYIIYOXdisfLXVSvjLfsObdRxq: db.subp005,
    /**WORKFLOW_LIST 簽核流程清單資料 */
    LGMOjDaMNqNTuYEAKauWiuXjVJatqdCXHYiRsyCu: db.signgov001,
    /**SIGNOFF_PROC 簽核作業 */
    LmuEQeWfTfUHgWNxIgZtsBjwApjoaUQMhQKGSxNy: db.signgov002,
    /**BATCH_SIGNOFF_PROC 批次簽核作業 */
    ktyaDIDKYLEJuXbvbiilXwIymRRrccepiBAZAaxZ: db.signgov003,
    /**END_AGENT_DELEGATE 終止代理人資料 */
    drrBfdbTWSFymDVGmFjgtKTuUokoHaUUJtwBiYRZ: db.signgov004,
    /**ABSENCE_RECEIPT_CATEGORY 單據類別清單 */
    YcyFkEiCOuHkWoklpTKCVKTjrkcPRFIjxVDvAJbz: db.signgov005,
    /**ABSENCE_ACTION_CODE 簽核動作資料  簽核詳細頁 radios*/
    sMLWGFpRZEotDsSOfgeAymDbtUTvGkXbANCNGjnn: db.signgov006,
    /**ABSENCE_RECEIPT_STATUS 單據狀態清單  簽核狀態對照資料 "PROCESS":"送簽中" */
    PhwZcejhWOJfjqVkyItlLwHxPaEwwBAEeUMKMIRD: db.signgov007,
    /**CHK_AGENT_DELEGATE 檢查是否設定代理人  簽核列表頁*/
    PgNjhxWPUFFndEQmnVeghkQinFKfnOsVflXdvkNl: db.signgov008,
    /**GET_WEB_MENU 取得網頁選單 行政專區主選單 權限功能顯示*/
    yAARveQNJZMgeutaObybFjaquxgafUbiyHtbhyzD: db.config001,
    /**ABSENCE_ATTENDANCE_STATUS 出勤狀況狀態清單*/
    TADZdXFLIMhzcAcbYpmhMdUDJrzPjKnKxLUHSKmT: db.select001,
    /** INSERT_LEAVE_FORM 新增請假單 */
    BwHukQIelXlsIJftkESNmynkEFkucQxnEGqRsfiD: db.ofform001,
    /** GET_LEAVE_FORM 取得請假單 */
    kXevDETsVKonMRrGLbdXTtPrHsPBjWuETCTOGQkz: db.ofform002,
    /**CHANGE_ATTACHMENT 異動附件資料 */
    ICLsUIQkfGmmABwaSGqeVtsWRmVAWpZWjELjEbQN: db.offatcmt001,
    /**CHANGE_LEAVE_FORM 變更請假單 */
    InZZOrxyWisbBfCsYVOOiJMXeVxWLryTUKXKxJrK: db.ofform003,
    /*CANCEL_LEAVE_FORM 銷假單作業 */
    XEzLJvugzGZcFakdjktwpKdOdsNEZNIDqBfPtJuy: db.ofform004,
    /*ABSENCE_CODE 假別設定資料 */
    EttsdxmbzatnlkilifGZiyrNbvUNpooFDsDtHuqU: db.letype001,
    /** GET_ATTACHMENT 取得附件資料 */
    BMBbxfInQGgleBcKQDeZffeNFIMXMybPJLOdbduM: db.ofform005,
    /** GET_CANCEL_LEAVE_FORM 銷假單查詢 */
    OvkmWjiAeIBETMxqgwcuVcTAbVcGTwTycxRkjlkY: db.ofform006,
    /** GET_LEAVE_FORM_SIMPLE 取得請假單(無附件) */
    hQAsLlijgQbqpVCjkLHxZSqftyrprGJNuBCAbNlm: db.ofform007,
    /** SIGNOFF_PERSET_PROC 簽核預設流程 */
    mmMRvljEzWhLHpfWQgAZsbEjmYNhViFwxdisJBsI: db.signgov009,
    /** GET_MONTH_INTERVAL 取得工作月的日期區間 取得工作月 */
    xViyPOjHyAJHXsDFHnkEPjJMEhhIDsNGDrxAlLpX: db.ym004,
    /**ABSENCE_ETHNICITY 族別 下拉清單*/
    LSWnmvBjWmCaqSXrpbkABAnbLgCpnyXJSOYEeqbX: db.ofform009,
    /**GET_MONTH_ABNORMAL_LIST 當月未出勤一覽表 */
    HDIAwnZfDEmBlcsqlXtfBTaVRfGWJcTPOfkfjebw: db.org002,
    /**GET_DAILY_ABNORMAL_DTL 當日未出勤明細表 */
    JpOLIpoUspSJzEuRRadNNuEMmQgiJyXuiaSXVkrV: db.org003
};

server.get(genRoute(''), (req, res) => {
    const { keyid } = req.headers;
    if (!keyid) return res.status(404).jsonp(null);
    // res.status(200).jsonp(err99());
    res.status(200).jsonp(basicRes(id2Data[keyid] || null));
});
server.post('/EngageAPI/Log/WriteCommonLogAPP', (req, res) => {
    return res.status(200).jsonp(db.log001);
});

server.post('/wsUtility/WebAuthorization/TakeToken', (req, res) => {
    return res.status(200).jsonp(db.token001);
});

server.post('/wsUtility/WebAuthorization/VerifyToekn', (req, res) => {
    return res.status(200).jsonp(db.token002);
});

server.post(genRoute(''), (req, res) => {
    const { keyid } = req.headers;
    if (!keyid) return res.status(404).jsonp(null);
    // res.status(200).jsonp(err99());
    switch (keyid) {
        case 'SotBPiqkhXOJbzQPvIBBETFwLQNXkpgwPTzaKQqE':
            const { agent_id, search_basics } = req.body;
            if (search_basics === '') {
                return res.status(200).jsonp(basicRes(id2Data[keyid]['323947'] || null)); // 323947 拿取org.json資料
            }

            if (search_basics.includes('林')) {
                // 測試如果input有值(林). 拿到的mock資料
                return res.status(200).jsonp(basicRes(id2Data[keyid]['2354800'] || null));
            } else {
                return res.status(200).jsonp(basicRes(id2Data[keyid]['empty'] || null));
            }
        default:
            return res.status(200).jsonp(basicRes(id2Data[keyid] || null));
    }
});

//------------------------------------------------------
server.listen(port, () => {
    console.log(`mock api Server is running on http://localhost:${port}`);
});
