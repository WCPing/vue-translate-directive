(function(i,n){typeof exports=="object"&&typeof module<"u"?module.exports=n():typeof define=="function"&&define.amd?define(n):(i=typeof globalThis<"u"?globalThis:i||self,i["vue-translate-directive"]=n())})(this,function(){"use strict";var i={};const n={childList:!0,subtree:!0,characterData:!0},d=e=>{e.forEach(t=>{t.type==="childList"&&t.addedNodes&&t.addedNodes.length&&u(t)})},u=e=>{a(e.target.childNodes)},a=e=>{Array.from(e).forEach(l)},l=e=>{e.childNodes&&e.childNodes.length?a(e.childNodes):(e.nodeType===3&&(e.nodeValue=o(e.nodeValue)),e.nodeType===1&&c(e))},o=e=>{if(!e)return e;const t=e.trim().split("/");return t.length===1||JSON.stringify(i)==="{}"?e:f(t,i)},c=e=>{(e.nodeName==="INPUT"||e.nodeName==="TEXTAREA")&&Array.from(e.attributes).forEach(t=>{t.nodeName==="placeholder"&&(t.nodeValue=o(t.nodeValue))})},f=(e,t)=>e.reduce((r,s)=>r&&r[s]?r[s]:null,t),h=new MutationObserver(d),v={created(e,t,r,s){t.value&&t.value.i18n&&(i=Object.assign({},i,t.value.i18n)),l(e)},mounted(e){h.observe(e,n)}};return{installed:!1,install(e,t){this.installed||e.directive("trans",v)}}});