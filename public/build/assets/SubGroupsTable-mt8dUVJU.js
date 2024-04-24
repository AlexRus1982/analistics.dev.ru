import{_ as v,o as a,c,F as p,a as b,f as s,t as l,n as d,d as i,p as m,g,h as k,r as I,b as $}from"./app-BaVlKkDk.js";const C={name:"HubTable",computed:{hubGroups(){return Array.from(this.vueStore.groupsMap).filter(o=>o[1].parentGroupId=="-1").sort((o,_)=>o[1].groupOrder-_[1].groupOrder)},allClicks(){return String(this.vueStore.allClicksValue).replace(/(\d)(?=(\d{3})+([^\d]|$))/g,"$1 ")},allCoasts(){return String(this.vueStore.allCostValue.toFixed(0)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g,"$1 ")+" ₽"},allImpressions(){return String(this.vueStore.allImpressionsValue).replace(/(\d)(?=(\d{3})+([^\d]|$))/g,"$1 ")}},setup(){return{vueStore:window._vueStore}}},y=e=>(m("data-v-c5046690"),e=e(),g(),e),x={key:0,class:"table"},G={class:"table_row"},M={class:"table_row_item"},V={class:"table_row_item"},P={class:"front_cell"},E={class:"table_row_item"},z={class:"front_cell"},H={class:"table_row_item"},N={class:"front_cell"},B={class:"table_footer"},A=y(()=>s("div",{class:"table_footer_item"},"Итого",-1)),T={class:"table_footer_item"},O={class:"table_footer_item"},F={class:"table_footer_item"};function q(e,o,_,h,S,t){return h.vueStore.loading==!1?(a(),c("div",x,[(a(!0),c(p,null,b(t.hubGroups,([n,r])=>(a(),c("div",G,[s("div",M,l(r.groupName),1),s("div",V,[s("div",{class:"back_cell",style:d({width:r.CostPerc+"%"})},null,4),s("div",P,l(r.CostStr),1)]),s("div",E,[s("div",{class:"back_cell",style:d({width:r.ImpressionsPerc+"%"})},null,4),s("div",z,l(r.ImpressionsStr),1)]),s("div",H,[s("div",{class:"back_cell",style:d({width:r.ClicksPerc+"%"})},null,4),s("div",N,l(r.ClicksStr),1)])]))),256)),s("div",B,[A,s("div",T,l(t.allCoasts),1),s("div",O,l(t.allImpressions),1),s("div",F,l(t.allClicks),1)])])):i("",!0)}const ys=v(C,[["render",q],["__scopeId","data-v-c5046690"]]),D={name:"SubGroupsItem",props:["groupId"],computed:{group(){return this.vueStore.groupsMap.get(`${this.groupId}`)},campaigns(){return Array.from(this.vueStore.campaignsMap).filter(o=>o[1].parentId==this.groupId)}},setup(){return{vueStore:window._vueStore}},methods:{onExpanderClick(e){const o=this.vueStore.groupsMap.get(`${e}`);o.tableGroupsExtended=!o.tableGroupsExtended}}},u=e=>(m("data-v-d360c7e8"),e=e(),g(),e),L={class:"table_row"},j={class:"table_row_item"},J={key:0,xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",class:"bi bi-plus-square",viewBox:"0 0 16 16"},K=u(()=>s("path",{d:"M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"},null,-1)),Q=u(()=>s("path",{d:"M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"},null,-1)),R=[K,Q],U={key:1,xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",class:"bi bi-dash-square",viewBox:"0 0 16 16"},W=u(()=>s("path",{d:"M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"},null,-1)),X=u(()=>s("path",{d:"M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"},null,-1)),Y=[W,X],Z={class:"name_label"},ss={class:"table_row_item"},es={class:"front_cell"},ts={class:"table_row_item"},os={class:"front_cell"},rs={class:"table_row_item"},ls={class:"front_cell"},as={class:"table_row campaigns"},cs={class:"table_row_item"},ds=u(()=>s("div",{class:"campaign_shift"},null,-1)),_s={class:"table_row_item"},is={class:"front_cell"},us={class:"table_row_item"},ns={class:"front_cell"},ps={class:"table_row_item"},hs={class:"front_cell"};function vs(e,o,_,h,S,t){return a(),c(p,null,[s("div",L,[s("div",j,[t.campaigns.length>0?(a(),c("div",{key:0,class:"group_expander",onClick:o[0]||(o[0]=n=>t.onExpanderClick(t.group.groupId))},[t.group.tableGroupsExtended==!1?(a(),c("svg",J,R)):i("",!0),t.group.tableGroupsExtended==!0?(a(),c("svg",U,Y)):i("",!0)])):i("",!0),s("div",Z,l(t.group.groupName),1)]),s("div",ss,[s("div",{class:"back_cell",style:d({width:t.group.CostPerc+"%"})},null,4),s("div",es,l(t.group.CostStr),1)]),s("div",ts,[s("div",{class:"back_cell",style:d({width:t.group.ImpressionsPerc+"%"})},null,4),s("div",os,l(t.group.ImpressionsStr),1)]),s("div",rs,[s("div",{class:"back_cell",style:d({width:t.group.ClicksPerc+"%"})},null,4),s("div",ls,l(t.group.ClicksStr),1)])]),t.group.tableGroupsExtended?(a(!0),c(p,{key:0},b(t.campaigns,([n,r])=>(a(),c("div",as,[s("div",cs,[ds,k(" "+l(r.CampaignName),1)]),s("div",_s,[s("div",{class:"back_cell",style:d({width:r.CostPerc+"%"})},null,4),s("div",is,l(r.CostStr),1)]),s("div",us,[s("div",{class:"back_cell",style:d({width:r.ImpressionsPerc+"%"})},null,4),s("div",ns,l(r.ImpressionsStr),1)]),s("div",ps,[s("div",{class:"back_cell",style:d({width:r.ClicksPerc+"%"})},null,4),s("div",hs,l(r.ClicksStr),1)])]))),256)):i("",!0)],64)}const bs=v(D,[["render",vs],["__scopeId","data-v-d360c7e8"]]),ms={name:"SubGroupsTable",props:["groupId"],components:{"sub-groups-item":bs},computed:{group(){return this.vueStore.groupsMap.get(`${this.groupId}`)},subGroups(){return Array.from(this.vueStore.groupsMap).filter(o=>o[1].parentGroupId==this.groupId).sort((o,_)=>o[1].groupOrder-_[1].groupOrder)}},setup(){return{vueStore:window._vueStore}},methods:{}},w=e=>(m("data-v-dc621127"),e=e(),g(),e),gs={class:"hubs_groups"},ws={class:"table_header"},Ss={class:"table_header_item"},fs=w(()=>s("div",{class:"table_header_item"},null,-1)),ks=w(()=>s("div",{class:"table_header_item"},null,-1)),Is=w(()=>s("div",{class:"table_header_item"},null,-1));function $s(e,o,_,h,S,t){const n=I("sub-groups-item");return a(),c("div",gs,[s("div",ws,[s("div",Ss,l(t.group.groupName),1),fs,ks,Is]),(a(!0),c(p,null,b(t.subGroups,([r,f])=>(a(),$(n,{groupId:f.groupId},null,8,["groupId"]))),256))])}const xs=v(ms,[["render",$s],["__scopeId","data-v-dc621127"]]);export{ys as H,xs as S};
