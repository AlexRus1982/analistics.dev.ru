import{T as l,C as n,a as i}from"./CostTableDeltaTelegram-TeNKfteJ.js";import{_,f as d,r as m,o,c as s,g as t,e as u,d as g}from"./app-AHIMWW8m.js";import"./SubGroupsTable-CWNQ0P22.js";const p={name:"TelegramAnalistics3",components:{"table-list-all":l,"cost-table-telegram":n,"cost-table-delta-telegram":i},setup(){const e=d(0),a=window._vueStore;return{activeTab:e,vueStore:a}},computed:{yesterday:function(){let e=new Date;return e.setDate(e.getDate()-1),e.toLocaleString("ru",{day:"numeric",month:"long",year:"numeric"})}},methods:{setActiveTab(e){this.activeTab=e},onPeriodChange(e){console.log(e.target.value),window._vueStore.setup(e.target.value)}}},b={class:"work_area"},v={class:"tabs_area"},T={class:"tabs_area_body_wrapper"},f={class:"tabs_area_body"},h={key:0};function y(e,a,w,r,C,S){const c=m("cost-table-delta-telegram");return o(),s("div",b,[t("div",v,[t("div",T,[t("div",f,[r.vueStore.loading==!1?(o(),s("div",h,[u(c)])):g("",!0)])])])])}const A=_(p,[["render",y]]);export{A as default};