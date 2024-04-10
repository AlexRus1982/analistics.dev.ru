import './bootstrap';
import { createApp } from 'vue/dist/vue.esm-bundler';
import RootVue from './Components/RootVue.vue';
import { reactive } from 'vue'

// const vueGlobals = {
//     globalMess : 'Hello',
//     globalVar : 1,
// }

// window.vueGlobals = vueGlobals; 

const app = createApp({
    components: {
        'root-vue' : RootVue,
    }
});

const globalObject = reactive({
    nested              : { count: 0 },
    arr                 : ['foo', 'bar'],
    mess                : '12334325345',
    groupsModalWindow   : null,
    campaignsMap        : new Map(),
    groupsMap           : new Map(),
})

globalObject.groupsMap.set('1', { 'groupId' : '1', 'groupName' : 'Группа №1', 'parentGroupId' : "-1", 'chosen' : false, campaignsExtednded : true, groupsExtended : true, })
globalObject.groupsMap.set('2', { 'groupId' : '2', 'groupName' : 'Группа №2', 'parentGroupId' : "1",  'chosen' : false, campaignsExtednded : true, groupsExtended : true, })
globalObject.groupsMap.set('3', { 'groupId' : '3', 'groupName' : 'Группа №3', 'parentGroupId' : "2",  'chosen' : false, campaignsExtednded : true, groupsExtended : true, })
globalObject.groupsMap.set('4', { 'groupId' : '4', 'groupName' : 'Группа №4', 'parentGroupId' : "-1", 'chosen' : false, campaignsExtednded : true, groupsExtended : true, })
globalObject.groupsMap.set('5', { 'groupId' : '5', 'groupName' : 'Группа №5', 'parentGroupId' : "-1", 'chosen' : false, campaignsExtednded : true, groupsExtended : true, })
globalObject.groupsMap.set('6', { 'groupId' : '6', 'groupName' : 'Группа №6', 'parentGroupId' : "-1", 'chosen' : false, campaignsExtednded : true, groupsExtended : true, })
globalObject.groupsMap.set('7', { 'groupId' : '7', 'groupName' : 'Группа №7', 'parentGroupId' : "-1", 'chosen' : false, campaignsExtednded : true, groupsExtended : true, })

window._vueStore = globalObject;

// setup(){
//     // --- Входные данные ---
//     // Адрес сервиса Reports для отправки JSON-запросов (регистрозависимый)
//     let ReportsURL = 'https://api.direct.yandex.com/json/v5/reports'

//     // OAuth-токен пользователя, от имени которого будут выполняться запросы
//     let token = 'y0_AgAAAABT-UwxAAZAOQAAAAEA2YPLAAAMYYqB_uFJspxfKYad38plb8j-_Q'

//     // Логин клиента рекламного агентства
//     // Обязательный параметр, если запросы выполняются от имени рекламного агентства
//     let clientLogin = 'artfabric-int'

//     fetch(ReportsURL, {
//         method: "POST", // или 'PUT'
//         body: {
//             "params": {
//                 "SelectionCriteria": {
//                     // "DateFrom": "2024-04-04",
//                     // "DateTo": "2024-04-04"
//                 },
//                 // "FieldNames": [
//                 //     "Date",
//                 //     "CampaignName",
//                 //     "LocationOfPresenceName",
//                 //     "Impressions",
//                 //     "Clicks",
//                 //     "Cost"
//                 // ],
//                 "FieldNames": [
//                     // "CampaignId", 
//                     // "CampaignType", 
//                     "CampaignName", 
//                     "Clicks", 
//                     "Impressions", 
//                     "Cost"
//                 ],
//                 "ReportName": "test_otchet",
//                 "ReportType": "CAMPAIGN_PERFORMANCE_REPORT",
//                 // "DateRangeType": "CUSTOM_DATE",
//                 // "DateRangeType": "YESTERDAY",
//                 // "DateRangeType": "LAST_WEEK",
//                 "DateRangeType": "THIS_MONTH",
//                 "Format": "TSV",
//                 "IncludeVAT": "YES",
//                 "IncludeDiscount": "NO"
//             }
//         },
//         headers: {
//             // OAuth-токен. Использование слова Bearer обязательно
//             "Authorization": "Bearer " + token,
//             // Логин клиента рекламного агентства
//             "Client-Login": clientLogin,
//             // Язык ответных сообщений
//             "Accept-Language": "ru",
//             // Режим формирования отчета
//             "processingMode": "auto"
//             // Формат денежных значений в отчете
//             // "returnMoneyInMicros": "false",
//             // Не выводить в отчете строку с названием отчета и диапазоном дат
//             // "skipReportHeader": "true",
//             // Не выводить в отчете строку с названиями полей
//             // "skipColumnHeader": "true",
//             // Не выводить в отчете строку с количеством строк статистики
//             // "skipReportSummary": "true"
//         },
//     })
//     .then(response => console.debug(response))

// }

fetch('/yandex-direct-info')
.then(response => response.text())
.then((text) => {
    const lines = text.split('\n').slice(1, -2);
    const header = lines.shift().split('\t');
    // delete(lines[0]);
    console.debug(header);
    const data = new Array();
    lines.forEach(line => {
        const lineArray = line.split('\t');

        const lineObject = {};
        lineObject[`${header[0]}`] = lineArray[0].trim()
        lineObject[`${header[1]}`] = lineArray[1].trim()
        lineObject[`${header[2]}`] = parseInt(lineArray[2])
        lineObject[`${header[3]}`] = parseInt(lineArray[3])
        lineObject[`${header[4]}`] = parseFloat(lineArray[4]) / 1000000
        lineObject[`parentId`] = '-1'

        const id = lineArray[0].trim();
        window._vueStore.campaignsMap.set(`${id}`, lineObject);
    })

    console.debug(window._vueStore.campaignsMap);
})

app.mount('#app');