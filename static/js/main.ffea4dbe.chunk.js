(this["webpackJsonponscreen-sounds"]=this["webpackJsonponscreen-sounds"]||[]).push([[0],{179:function(e,t,n){},180:function(e,t,n){},181:function(e,t,n){},182:function(e,t,n){},183:function(e,t,n){},184:function(e,t,n){"use strict";n.r(t);var s=n(2),c=n.n(s),r=n(35),a=n.n(r),i=n(24),o=n(4),l=n(10),u=n.n(l),d=n(15),j=n(3),m=n(80),b=n(49),f=n(187),h=(n(86),n(1)),v=function(e){var t=e.user,n=e.logout,c=s.useState(!1),r=Object(j.a)(c,2),a=r[0],i=r[1],o=null===t||void 0===t?void 0:t.displayName,l=Object(b.useSpring)({opacity:a?1:0,transform:a?"translateY(0%) translateX(0%) scale(1)":"translateY(-100%) translateX(50%) scale(0)",config:{duration:250,easing:f.a}});return Object(h.jsxs)("div",{className:"header-app",children:[Object(h.jsx)("div",{className:"title",children:Object(h.jsx)("h1",{children:"StreamElements Sounds editor"})}),Object(h.jsx)("div",{className:"buttons",children:Object(h.jsxs)("div",{className:"button-user".concat(a?" active":""),role:"button",onKeyPress:function(e){return"enter"===e.key?i(!a):{}},onClick:function(){return i(!a)},tabIndex:0,children:[Object(h.jsx)("div",{className:"user-image",style:{backgroundImage:"url(".concat(null===t||void 0===t?void 0:t.avatar,")")}}),Object(h.jsx)("div",{className:"name",children:o||Object(h.jsx)("i",{className:"fas fa-spin fa-spinner"})}),Object(h.jsx)("div",{className:"triangle",children:Object(h.jsx)("i",{className:"fas fa-caret-down"})})]})}),Object(h.jsx)(b.animated.div,{className:"user-menu",style:Object(m.a)({},l),children:Object(h.jsx)("button",{className:"button-menu danger",type:"button",onClick:function(){return n()},children:"Log out"})})]})},p=n(76),x=n(50),O=n(188),g=function(e){var t,n,c,r,a,i,o,l=e.item,u=(e.setItem,"waveform-".concat(l._id)),d=s.useRef(null),m=s.useState(!1),b=Object(j.a)(m,2),f=b[0],v=b[1],p=s.useState(),g=Object(j.a)(p,2),N=g[0],y=g[1],C=s.useState(0),k=Object(j.a)(C,2),S=(k[0],k[1]),w=s.useCallback((function(e){var t,n,s,c;(d.current=e,d.current&&(null===(t=l.alert)||void 0===t||null===(n=t.audio)||void 0===n?void 0:n.src))&&(d.current.load(null===(s=l.alert)||void 0===s||null===(c=s.audio)||void 0===c?void 0:c.src),d.current.on("play",(function(){v(!0)})),d.current.on("pause",(function(){v(!1)})),d.current.on("finish",(function(){v(!1)})),d.current.on("seek",(function(){S(d.current.getCurrentTime())})),d.current.on("audioprocess",(function(){S(d.current.getCurrentTime())})))}),[null===(t=l.alert)||void 0===t||null===(n=t.audio)||void 0===n?void 0:n.src]),I=s.useCallback((function(){d.current.playPause()}),[]);return s.useEffect((function(){var e,t;d.current&&d.current.setVolume(null===(e=l.alert)||void 0===e||null===(t=e.audio)||void 0===t?void 0:t.volume)}),[null===(c=l.alert)||void 0===c||null===(r=c.audio)||void 0===r?void 0:r.volume]),s.useEffect((function(){setTimeout((function(){return function(){var e=d.current.getDuration();y(e)}()}),5e3)}),[]),Object(h.jsxs)("tr",{className:"item",children:[Object(h.jsx)("td",{className:"checkbox"}),Object(h.jsx)("td",{className:"play",children:Object(h.jsx)("div",{className:"play-button",role:"button",tabIndex:0,onKeyPress:function(e){var t,n;(e.preventDefault(),e.stopPropagation(),"ENTER"===e.key)&&((null===(t=l.alert)||void 0===t||null===(n=t.audio)||void 0===n?void 0:n.src)&&!f&&I())},onClick:function(e){var t,n;e.preventDefault(),e.stopPropagation(),(null===(t=l.alert)||void 0===t||null===(n=t.audio)||void 0===n?void 0:n.src)&&!f&&I()},children:Object(h.jsx)("i",{className:f?"fas fa-pause":"fas fa-play"})})}),Object(h.jsx)("td",{className:"sound-name",children:Object(h.jsxs)("div",{className:"name-split",children:[Object(h.jsx)("div",{className:"name",children:null===(a=l.bot)||void 0===a?void 0:a.identifier}),Object(h.jsxs)("div",{className:"description",children:[l.name," - ",l.description]})]})}),Object(h.jsx)("td",{className:"cost center",children:l.cost}),Object(h.jsxs)("td",{className:"volume center",children:[Math.round(100*((null===(i=l.alert)||void 0===i||null===(o=i.audio)||void 0===o?void 0:o.volume)||0)),"%"]}),Object(h.jsx)("td",{className:"duration center",children:N?"".concat(Math.round(10*N)/10,"s"):Object(h.jsx)("i",{className:"fas fa-spin fa-spinner"})}),Object(h.jsx)("td",{className:"waveform",children:Object(h.jsx)(x.WaveSurfer,{onMount:w,ref:d,children:Object(h.jsx)(x.WaveForm,{id:u,container:u,p:!0,cursorColor:"#ff000000",waveColor:"#BDBABD",progressColor:"#9a64ff",height:35,barWidth:1,barHeight:3,cursorWidth:1,hideScrollbar:!0})})}),Object(h.jsx)("td",{className:"check center enabled",children:Object(h.jsx)("i",{className:l.enabled?"fas fa-check":"fas fa-times"})}),Object(h.jsx)("td",{className:"check center subs-only",children:Object(h.jsx)("i",{className:l.subscriberOnly?"fas fa-check":"fas fa-times"})}),Object(h.jsx)("td",{className:"dateCreated center",children:Object(O.a)(new Date(l.createdAt),"dd-MM-yyyy HH:mm:ss")})]},l._id)},N=(n(99),function(e){var t=e.allItems,n=e.items,s=e.setItems,c=e.sort,r=e.setSort;return Object(h.jsxs)("table",{className:"item-list",children:[Object(h.jsx)("thead",{children:Object(h.jsxs)("tr",{className:"table-header",children:[Object(h.jsx)("th",{className:"checkbox"}),Object(h.jsx)("th",{className:"play"}),Object(h.jsxs)("th",{className:"sound-name clickable",onClick:function(){return a("soundName")},children:["Sound name",Object(h.jsx)("i",{className:"fas fa-sort".concat("soundName"===c.sort?"asc"===c.order?"-up":"-down":" unset")})]}),Object(h.jsxs)("th",{className:"cost center clickable",onClick:function(){return a("cost")},children:["Cost",Object(h.jsx)("i",{className:"fas fa-sort".concat("cost"===c.sort?"asc"===c.order?"-up":"-down":" unset")})]}),Object(h.jsxs)("th",{className:"volume center clickable",onClick:function(){return a("volume")},children:["Volume",Object(h.jsx)("i",{className:"fas fa-sort".concat("volume"===c.sort?"asc"===c.order?"-up":"-down":" unset")})]}),Object(h.jsx)("th",{className:"duration center",children:"Duration"}),Object(h.jsx)("th",{className:"waveform"}),Object(h.jsxs)("th",{className:"check center enabled clickable",onClick:function(){return a("enabled")},children:["Enabled",Object(h.jsx)("i",{className:"fas fa-sort".concat("enabled"===c.sort?"asc"===c.order?"-up":"-down":" unset")})]}),Object(h.jsxs)("th",{className:"check center subs-only clickable",onClick:function(){return a("subsOnly")},children:["Subs only"," ",Object(h.jsx)("i",{className:"fas fa-sort".concat("subsOnly"===c.sort?"asc"===c.order?"-up":"-down":" unset")})]}),Object(h.jsxs)("th",{className:"age center clickable",onClick:function(){return a("dateCreated")},children:["Date created",Object(h.jsx)("i",{className:"fas fa-sort".concat("dateCreated"===c.sort?"asc"===c.order?"-up":"-down":" unset")})]})]})}),Object(h.jsx)("tbody",{children:n.map((function(e){return Object(h.jsx)(g,{item:e,setItem:i},e._id)}))})]});function a(e){r({sort:e,order:c.sort===e&&"asc"===c.order?"desc":"asc"})}function i(e){var n=t.findIndex((function(t){return t._id===e._id}));if(n){var c=Object(p.cloneDeep)(t);c[n]=e,s(c)}}});function y(e,t,n){var c=function(e){return"onscreensounds-".concat(e)},r=Object(s.useState)((function(){try{var s=window.localStorage.getItem(c(e));return n&&window.localStorage.removeItem(c(e)),s&&!0!==n?JSON.parse(s):t}catch(r){return console.error(r),t}})),a=Object(j.a)(r,2),i=a[0],o=a[1];return[i,function(t){try{var n=t instanceof Function?t(i):t;o(n),window.localStorage.setItem(c(e),JSON.stringify(n))}catch(s){console.error(s)}}]}var C=n(78),k=(n(77),n(51)),S=n.n(k);function w(e){return 0===Object.keys(e).length?"":"?".concat(Object.keys(e).reduce((function(t,n){var s=e[n];return(s||0===s||!1===s)&&t.push("".concat(n,"=").concat(encodeURIComponent(s))),t}),[]).join("&"))}n(179);var I=function(e){var t=e.query,n=e.setQuery,s=e.minVolume,c=e.setMinVolume,r=e.maxVolume,a=e.setMaxVolume,i=e.minCost,o=e.setMinCost,l=e.maxCost,u=e.setMaxCost,d=e.minSeconds,j=e.setMinSeconds,m=e.maxSeconds,b=e.setMaxSeconds;return Object(h.jsxs)("div",{className:"filter-header",children:[Object(h.jsxs)("div",{className:"filter-item",children:[Object(h.jsx)("h3",{children:"Search"}),Object(h.jsx)("input",{placeholder:"Search by sound name",value:t,onChange:function(e){return n(e.target.value)}})]}),Object(h.jsxs)("div",{className:"filter-item",children:[Object(h.jsx)("h3",{children:"Cost"}),Object(h.jsxs)("div",{className:"flex",children:[Object(h.jsx)("input",{className:(i||0)<(l||0)?"warn":"",type:"number",value:i,placeholder:"Min",min:0,max:9999999999,onChange:function(e){return o(parseInt(e.target.value,10))}}),Object(h.jsx)("input",{className:(i||0)<(l||0)?"warn":"",type:"number",value:l,placeholder:"Max",min:1,max:1e9,onChange:function(e){return u(parseInt(e.target.value,10))}})]})]}),Object(h.jsxs)("div",{className:"filter-item",children:[Object(h.jsx)("h3",{children:"Volume"}),Object(h.jsxs)("div",{className:"flex",children:[Object(h.jsx)("input",{className:(s||0)<(r||0)?"warn":"",type:"number",value:s||void 0,placeholder:"Min",min:0,max:99,onChange:function(e){return c(parseInt(e.target.value,10))}}),Object(h.jsx)("input",{className:(s||0)<(r||0)?"warn":"",type:"number",value:r,placeholder:"Max",min:1,max:100,onChange:function(e){return a(parseInt(e.target.value,10))}})]})]}),Object(h.jsxs)("div",{className:"filter-item",children:[Object(h.jsx)("h3",{children:"Duration"}),Object(h.jsxs)("div",{className:"flex",children:[Object(h.jsx)("input",{className:(d||0)<(m||0)?"warn":"",type:"number",value:d,placeholder:"Min",min:0,max:9999999999,onChange:function(e){return j(parseInt(e.target.value,10))}}),Object(h.jsx)("input",{className:(d||0)<(m||0)?"warn":"",type:"number",value:m,placeholder:"Max",min:1,max:1e9,onChange:function(e){return b(parseInt(e.target.value,10))}})]})]})]})},M=function(e){var t=e.items,n=(e.setItems,e.children),c=y("query",""),r=Object(j.a)(c,2),a=r[0],i=r[1],o=y("minVolume",void 0),l=Object(j.a)(o,2),u=l[0],d=l[1],m=y("maxVolume",void 0),b=Object(j.a)(m,2),f=b[0],v=b[1],p=y("minCost",void 0),x=Object(j.a)(p,2),O=x[0],g=x[1],N=y("maxCost",void 0),k=Object(j.a)(N,2),w=k[0],M=k[1],T=y("minSeconds",void 0),E=Object(j.a)(T,2),D=E[0],V=E[1],J=y("maxSeconds",void 0),P=Object(j.a)(J,2),U=P[0],A=P[1],_=y("sort",{sort:"dateCreated",order:"asc"}),F=Object(j.a)(_,2),W=F[0],B=F[1],L=s.useState(t),q=Object(j.a)(L,2),z=q[0],G=q[1],H=s.useCallback((function(e,t){return function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"asc";return Object(C.a)(e,(function(e){return e.sort((function(e,s){var c="asc"===n?-1:1,r="asc"===n?1:-1,a=S()(e,t),i=S()(s,t);return a&&i?a<i?c:a>i?r:0:a?-1:1}))}))}(e.filter((function(e){var t,n,s,c,r,i;return(-1!==e.name.toUpperCase().indexOf(a.toUpperCase())||e.description.toUpperCase().includes(a.toUpperCase())||(null===(t=e.bot)||void 0===t||null===(n=t.identifier)||void 0===n?void 0:n.toUpperCase().includes(a.toUpperCase())))&&100*((null===(s=e.alert)||void 0===s||null===(c=s.audio)||void 0===c?void 0:c.volume)||0)>=(u||0)&&100*((null===(r=e.alert)||void 0===r||null===(i=r.audio)||void 0===i?void 0:i.volume)||0)<=(f||100)&&(e.cost||0)>=(O||0)&&(e.cost||0)<=(w||1e8)&&(e.duration||0)>=(D||0)&&(e.duration||0)<=(U||1e8)})),function(e){switch(e){case"soundName":return"bot.identifier";case"volume":return"alert.audio.volume";case"dateCreated":return"createdAt";default:return e}}(t.sort),t.order)}),[a,u,f,O,w,D,U]);s.useEffect((function(){G(H(t,W))}),[t,H,W]);var R=I({query:a,setQuery:i,minVolume:u,setMinVolume:d,maxVolume:f,setMaxVolume:v,minCost:O,setMinCost:g,maxCost:w,setMaxCost:M,minSeconds:D,setMinSeconds:V,maxSeconds:U,setMaxSeconds:A});return Object(h.jsx)(h.Fragment,{children:n(R,z,W,B)})},T="https://api.streamelements.com/kappa";function E(e,t){return fetch(e,t).then((function(e){if(!e.ok)throw new Error(e.statusText);return e.json()}))}var D=function(e){return{getCurrentUserChannel:function(){var t={method:"GET",headers:{Authorization:e}};return E("".concat(T,"/v2/users/current"),t)},getMeDetails:function(){var t={method:"GET",headers:{Authorization:e}};return E("".concat(T,"/v2/channels/me"),t)},getChannelItems:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:25,s=arguments.length>2?arguments[2]:void 0,c={method:"GET",headers:{Authorization:e}},r=w({limit:n,offset:s});return E("".concat(T,"/v2/store/").concat(t,"/items").concat(r),c)}}},V=c.a.createContext(null);function J(e){var t=e.children,n=c.a.useState(),s=Object(j.a)(n,2),r=s[0],a=s[1],i=y("StreamElementsJWT",null),o=Object(j.a)(i,2),l=o[0],u={user:r,setUser:a,token:l,setToken:o[1],APIService:l?D("Bearer ".concat(l)):null};return Object(h.jsx)(V.Provider,{value:u,children:t})}function P(){return c.a.useContext(V)}n(180);var U=function(){var e=P(),t=e.user,n=e.setUser,c=e.APIService,r=e.setToken,a=Object(s.useState)([]),i=Object(j.a)(a,2),o=i[0],l=i[1],m=Object(s.useCallback)((function(){return f.apply(this,arguments)}),[c,n]),b=Object(s.useCallback)((function(e){return p.apply(this,arguments)}),[c]);return Object(s.useEffect)((function(){m()}),[]),Object(s.useEffect)((function(){(null===t||void 0===t?void 0:t._id)?b(null===t||void 0===t?void 0:t._id):l([])}),[null===t||void 0===t?void 0:t._id,b]),Object(h.jsxs)("div",{className:"home",children:[Object(h.jsx)(v,{user:t,logout:function(){return r(null)}}),Object(h.jsx)("div",{className:"content",children:Object(h.jsx)(M,{items:o,setItems:l,children:function(e,t,n,s){return Object(h.jsxs)(h.Fragment,{children:[e,Object(h.jsx)(N,{items:t,setItems:l,allItems:o,sort:n,setSort:s})]})}})})]});function f(){return(f=Object(d.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!c){e.next=11;break}return e.prev=1,e.next=4,null===c||void 0===c?void 0:c.getMeDetails();case 4:t=e.sent,n(t),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),console.error(e.t0);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})))).apply(this,arguments)}function p(){return(p=Object(d.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!c){e.next=11;break}return e.prev=1,e.next=4,null===c||void 0===c?void 0:c.getChannelItems(t);case 4:n=e.sent,l(n),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),console.error(e.t0);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})))).apply(this,arguments)}},A=n(79),_=(n(181),function(){var e=P(),t=e.token,n=e.setToken,c=Object(o.g)(),r=Object(s.useState)(""),a=Object(j.a)(r,2),i=a[0],l=a[1];return Object(s.useEffect)((function(){t&&c("/")}),[]),Object(h.jsxs)("div",{className:"login-page",children:[Object(h.jsx)("h1",{className:"page-title",children:"StreamElements Sounds editor"}),Object(h.jsxs)("div",{className:"login-block",children:[Object(h.jsxs)("div",{className:"info-box warning",children:[Object(h.jsxs)("div",{className:"header",children:[Object(h.jsx)("i",{className:"fas fa-info-circle"}),Object(h.jsx)("span",{children:"Information"})]}),Object(h.jsxs)("div",{className:"content",children:[Object(h.jsx)("p",{children:"To manage sounds the tool needs your JWT (JSON web token)."}),Object(h.jsx)("p",{children:"You can find this by logging into StreamElements, clicking your image in the top right, then your username and lastly Channel Settings."}),Object(h.jsx)("p",{children:'Then toggle the "Show secrets" button, and copy the JWT in full inside the input field.'})]}),Object(h.jsx)("div",{className:"footer",children:Object(h.jsx)("span",{children:"Do not share this token!"})})]}),Object(h.jsxs)("form",{onSubmit:function(e){e.preventDefault(),n(i),l(""),c("/")},children:[Object(h.jsx)("input",{type:"password",value:i,onChange:function(e){return l(e.target.value)},placeholder:"JWT (JSON web token)"}),Object(h.jsx)("button",{type:"submit",children:"Login"})]})]}),Object(h.jsxs)("div",{className:"copy",children:[Object(h.jsx)("div",{className:"who",children:"\xa9 damon02 - 2021"}),Object(h.jsxs)("div",{className:"version",children:["v",A.version]})]})]})}),F=function(e){var t=e.children,n=P(),s=Object(o.f)();return(null===n||void 0===n?void 0:n.token)?t:Object(h.jsx)(o.a,{to:"/login",state:{from:s}})};n(182);var W=function(){return Object(h.jsx)("div",{className:"App",children:Object(h.jsxs)(o.d,{children:[Object(h.jsx)(o.b,{path:"/",element:Object(h.jsx)(F,{children:Object(h.jsx)(U,{})})}),Object(h.jsx)(o.b,{index:!1,path:"login",element:Object(h.jsx)(_,{})})]})})},B=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,189)).then((function(t){var n=t.getCLS,s=t.getFID,c=t.getFCP,r=t.getLCP,a=t.getTTFB;n(e),s(e),c(e),r(e),a(e)}))};n(183);a.a.render(Object(h.jsx)(c.a.StrictMode,{children:Object(h.jsx)(i.a,{basename:"/streamelements-store-manager",children:Object(h.jsx)(J,{children:Object(h.jsx)(W,{})})})}),document.getElementById("root")),B()},79:function(e){e.exports=JSON.parse('{"name":"onscreen-sounds","version":"0.1.0","homepage":"https://damon02.github.io/streamelements-store-manager","private":true,"dependencies":{"@types/d3-ease":"3.0.0","d3-ease":"3.0.1","date-fns":"2.25.0","immer":"9.0.6","lodash":"4.17.21","node-sass":"6.0.1","react":"17.0.2","react-dom":"17.0.2","react-router-dom":"6.0.2","react-scripts":"4.0.3","react-spring":"9.3.0","typescript":"4.4.4","wavesurfer-react":"2.0.11","wavesurfer.js":"4.6.0","web-vitals":"1.1.2"},"devDependencies":{"@testing-library/jest-dom":"5.15.0","@testing-library/react":"11.2.7","@testing-library/user-event":"12.8.3","@types/date-fns":"2.6.0","@types/jest":"26.0.24","@types/lodash":"4.14.176","@types/node":"12.20.37","@types/react":"17.0.34","@types/react-dom":"17.0.11","eslint":"7.31.0","eslint-config-airbnb":"18.2.1","eslint-config-airbnb-typescript":"12.3.1","eslint-config-prettier":"8.3.0","eslint-config-react-app":"6.0.0","eslint-import-resolver-typescript":"2.4.0","eslint-loader":"4.0.2","eslint-plugin-deprecation":"1.2.1","eslint-plugin-import":"2.23.4","eslint-plugin-jest":"24.3.6","eslint-plugin-jsx-a11y":"6.4.1","eslint-plugin-prettier":"3.4.0","eslint-plugin-react":"7.24.0","eslint-plugin-react-hooks":"4.2.0","prettier":"2.3.1","prettier-eslint":"12.0.0","prettier-eslint-cli":"5.0.1"},"scripts":{"start":"react-scripts start","build":"react-scripts build","test":"react-scripts test","eject":"react-scripts eject","lint":"eslint --ext .js,.jsx,.ts,.tsx src --color && npm run prettier-check","prettier-check":"prettier --check --config ./.prettierrc \\"./src/**/*.ts\\" \\"./src/**/*.tsx\\"","prettier-format-all":"prettier --write --config ./.prettierrc \\"./src/**/*.ts\\" \\"./src/**/*.tsx\\""},"eslintConfig":{"extends":["react-app","react-app/jest"]},"browserslist":{"production":[">0.2%","not dead","not op_mini all"],"development":["last 1 chrome version","last 1 firefox version","last 1 safari version"]},"pre-commit":["prettier-check"]}')},86:function(e,t,n){},99:function(e,t,n){}},[[184,1,2]]]);
//# sourceMappingURL=main.ffea4dbe.chunk.js.map