import{_ as y,r as p,o as r,c as _,F as v,a as C,g as e,t as l,n as h,e as g,d as u,p as f,i as S,f as A,h as $}from"./app-DNW8_hyV.js";import{T as x,H as I,P as R}from"./preloader-ui37DM52.js";const k={name:"CostTable",computed:{statistics(){const s={campaignsTypesList:{},campaignsTypesResult:{Count:0,Cost:0,Clicks:0,Impressions:0,CPC:0,CTR:0}},o=[];for(const[c,t]of this.vueStore.campaignsMap)o.push(t.CampaignType);const d=new Set(o);for(const c of d){const t={Type:c,Count:0,Cost:0,Clicks:0,Impressions:0,CPC:0,CTR:0},i=Array.from(this.vueStore.campaignsMap).filter(n=>n[1].CampaignType==c);for(const[n,a]of i)t.Count++,t.Cost+=a.Cost,t.Clicks+=a.Clicks,t.Impressions+=a.Impressions;t.CPC=t.Clicks?t.Cost/t.Clicks:0,t.CTR=t.Impressions!=0?100*t.Clicks/t.Impressions:0,s.campaignsTypesList[`${c}`]=t,s.campaignsTypesResult.Count+=t.Count,s.campaignsTypesResult.Cost+=t.Cost,s.campaignsTypesResult.Clicks+=t.Clicks,s.campaignsTypesResult.Impressions+=t.Impressions}s.campaignsTypesResult.CPC+=s.campaignsTypesResult.Clicks?s.campaignsTypesResult.Cost/s.campaignsTypesResult.Clicks:0,s.campaignsTypesResult.CTR+=s.campaignsTypesResult.Impressions!=0?100*s.campaignsTypesResult.Clicks/s.campaignsTypesResult.Impressions:0;for(const c of d){const t=s.campaignsTypesList[`${c}`];t.CostPerc=Number(100*t.Cost/s.campaignsTypesResult.Cost),t.ImpressionsPerc=Number(100*t.Impressions/s.campaignsTypesResult.Impressions),t.ClicksPerc=Number(100*t.Clicks/s.campaignsTypesResult.Clicks)}return s},lastDayValue(){const s=Array.from(this.vueStore.coastsAll.values()).pop();return String(s).replace(/(\d)(?=(\d{3})+([^\d]|$))/g,"$1 ")+" ₽"},last10DaysValue(){const s=Array.from(this.vueStore.coastsAll.values()).pop(),o=Array.from(this.vueStore.coastsAll.values()).slice(-10),d=o.reduce((n,a)=>n+a)/o.length,c=String(d.toFixed(0)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g,"$1 ")+" ₽",t=(s-d)/d*100,i=String(t.toFixed(0)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g,"$1 ")+" %";return[c,i]},latsMonthValues(){const s=Array.from(this.vueStore.costsMap.values()).pop(),o=Array.from(this.vueStore.coastsAll.values()).slice(-10),d=o.reduce((t,i)=>t+i)/o.length,c={};console.debug(Object.keys(s).slice(-10));for(const t of Object.keys(s).slice(-10))c[`${t}`]=d;return console.debug(s),[{name:"Значения трат",data:s},{name:"Среднее значение трат зв 10 дней",data:c}]}},setup(){return{vueStore:window._vueStore}},methods:{getMonth(s){const o={"01":"Январь","02":"Февраль","03":"Март","04":"Апрель","05":"Май","06":"Июнь","07":"Июль","08":"Август","09":"Сентябрь",10:"Октябрь",11:"Ноябрь",12:"Декабрь"};return`${s}`in o?o[`${s}`]:""},getCampaignType(s){const o={TEXT_CAMPAIGN:"Текстово-графические объявления",UNIFIED_CAMPAIGN:"Единая перфоманс кампания",SMART_CAMPAIGN:"Смарт-баннеры",DYNAMIC_TEXT_CAMPAIGN:"Динамические объявления",MOBILE_APP_CAMPAIGN:"Реклама мобильных приложений",MCBANNER_CAMPAIGN:"Баннер на поиске",CPM_BANNER_CAMPAIGN:"Медийная кампания",CPM_DEALS_CAMPAIGN:"Медийная кампания со сделками",CPM_FRONTPAGE_CAMPAIGN:"Медийная кампания на Главной",CPM_PRICE:"Кампания с фиксированным СРМ"};return`${s}`in o?o[`${s}`]:""}}},b=s=>(f("data-v-fe97d5cd"),s=s(),S(),s),P={key:0,class:"table"},w={class:"table_row"},M={class:"table_row_item"},N={class:"table_row_item"},D={class:"front_cell"},V={class:"table_row_item"},F={class:"front_cell"},E={class:"table_row_item"},G={class:"front_cell"},L={class:"table_row_item"},B={class:"table_row_item"},O={class:"table_row_item"},j={class:"table_footer"},H=b(()=>e("div",{class:"table_footer_item"},"Итого",-1)),z={class:"table_footer_item"},X={class:"table_footer_item"},q={class:"table_footer_item"},U={class:"table_footer_item"},Y={class:"table_footer_item"},J={class:"table_footer_item"},K=b(()=>e("div",{class:"charts_title"},"Общая динамика трат по месяцам:",-1)),Q={class:"charts_table_wrapper"},W={class:"charts_table"},Z={class:"last_day_coast"},ss={class:"last_day_coast",style:{"margin-top":"10px"}},ts={class:"last_day_coast",style:{"margin-top":"10px"}};function es(s,o,d,c,t,i){const n=p("line-chart");return c.vueStore.loading==!1?(r(),_("div",P,[(r(!0),_(v,null,C(i.statistics.campaignsTypesList,a=>(r(),_("div",w,[e("div",M,l(i.getCampaignType(a.Type)),1),e("div",N,[e("div",{class:"back_cell",style:h({width:a.CostPerc+"%"})},null,4),e("div",D,l(String(a.Cost.toFixed(0)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g,"$1 ")+" ₽"),1)]),e("div",V,[e("div",{class:"back_cell",style:h({width:a.ImpressionsPerc+"%"})},null,4),e("div",F,l(String(a.Impressions).replace(/(\d)(?=(\d{3})+([^\d]|$))/g,"$1 ")),1)]),e("div",E,[e("div",{class:"back_cell",style:h({width:a.ClicksPerc+"%"})},null,4),e("div",G,l(String(a.Clicks).replace(/(\d)(?=(\d{3})+([^\d]|$))/g,"$1 ")),1)]),e("div",L,l(String(a.Count).replace(/(\d)(?=(\d{3})+([^\d]|$))/g,"$1 ")),1),e("div",B,l(String(a.CPC.toFixed(1)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g,"$1 ")+" ₽"),1),e("div",O,l(String(a.CTR.toFixed(3)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g,"$1 ")+" %"),1)]))),256)),e("div",j,[H,e("div",z,l(String(i.statistics.campaignsTypesResult.Cost.toFixed(0)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g,"$1 ")+" ₽"),1),e("div",X,l(String(i.statistics.campaignsTypesResult.Impressions).replace(/(\d)(?=(\d{3})+([^\d]|$))/g,"$1 ")),1),e("div",q,l(String(i.statistics.campaignsTypesResult.Clicks).replace(/(\d)(?=(\d{3})+([^\d]|$))/g,"$1 ")),1),e("div",U,l(String(i.statistics.campaignsTypesResult.Count).replace(/(\d)(?=(\d{3})+([^\d]|$))/g,"$1 ")),1),e("div",Y,l(String(i.statistics.campaignsTypesResult.CPC.toFixed(1)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g,"$1 ")+" ₽"),1),e("div",J,l(String(i.statistics.campaignsTypesResult.CTR.toFixed(3)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g,"$1 ")+" %"),1)]),K,e("div",Q,[(r(!0),_(v,null,C(c.vueStore.costsMap,([a,m])=>(r(),_("div",W,[g(n,{title:i.getMonth(a),data:m,suffix:" ₽",thousands:" "},null,8,["title","data"])]))),256))]),e("div",Z,"Траты за вчерашний день = "+l(i.lastDayValue),1),e("div",ss,"Среднее значение трат за 10 дней = "+l(i.last10DaysValue[0]),1),e("div",ts,"Отклонение от среднего значения = "+l(i.last10DaysValue[1]),1)])):u("",!0)}const as=y(k,[["render",es],["__scopeId","data-v-fe97d5cd"]]),is={name:"statisticsView",components:{"cost-table":as,"table-list-header":x,"header-tabs":I,preloader:R},setup(){const s=A(0),o=window._vueStore;return{activeTab:s,vueStore:o}}},os={class:"work_area"},cs={class:"tabs_area"},ls={class:"tabs_area_header_wrapper"},ds={class:"tabs_area_header"},ns={key:0,class:"table_header_wrapper",style:{position:"relative",top:"0px","z-index":"0"}},rs=$('<div class="table_header" data-v-3a463e38><div class="table_header_item" style="width:200px;padding-left:5px;padding-right:5px;" data-v-3a463e38>Тип кампании</div><div class="table_header_item" style="width:100px;padding-left:5px;padding-right:5px;" data-v-3a463e38>Траты</div><div class="table_header_item" style="width:100px;padding-left:5px;padding-right:5px;" data-v-3a463e38>Показов</div><div class="table_header_item" style="width:100px;padding-left:5px;padding-right:5px;" data-v-3a463e38>Кликов</div><div class="table_header_item" style="width:100px;padding-left:5px;padding-right:5px;margin-left:10px;" data-v-3a463e38>Кол-во</div><div class="table_header_item" style="width:100px;padding-left:5px;padding-right:5px;" data-v-3a463e38>CPC</div><div class="table_header_item" style="width:100px;padding-left:5px;padding-right:5px;" data-v-3a463e38>CTR</div></div>',1),_s=[rs],ps={class:"tabs_area_body_wrapper"},gs={class:"tabs_area_body"},ms={key:0,class:"tab_panel table active"};function hs(s,o,d,c,t,i){const n=p("table-list-header"),a=p("header-tabs"),m=p("preloader"),T=p("cost-table");return r(),_("div",os,[e("div",cs,[e("div",ls,[e("div",ds,[g(n),g(a)])]),c.vueStore.loading==!1?(r(),_("div",ns,_s)):u("",!0),g(m),e("div",ps,[e("div",gs,[c.vueStore.loading==!1?(r(),_("div",ms,[g(T)])):u("",!0)])])])])}const Cs=y(is,[["render",hs],["__scopeId","data-v-3a463e38"]]);export{Cs as default};