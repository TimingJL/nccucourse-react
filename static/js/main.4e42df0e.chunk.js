(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{139:function(e,t,n){e.exports=n(395)},390:function(e,t,n){},392:function(e,t,n){},395:function(e,t,n){"use strict";n.r(t);var r=n(6),a=n.n(r),c=n(111),o=n.n(c),i=n(47),u=n(129),s=n.n(u)()(),l=n(116),f=n(38),p=n(115),m=n(89),b=n(131),h="".concat("NCCU_COURSE","/INIT"),d="".concat("NCCU_COURSE","/FETCH_SEMESTER_LIST"),O="".concat("NCCU_COURSE","/SET_SEMESTER_LIST"),v="".concat("NCCU_COURSE","/FETCH_COURSES_LIST"),j="".concat("NCCU_COURSE","/SET_COURSES_LIST_MAP"),y=Object(f.fromJS)({semesterList:[],coursesListMap:{}});var E=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case O:return e.set("semesterList",Object(f.fromJS)(t.payload.semesterList));case j:var n=t.payload,r=n.semester,a=n.coursesList;return e.updateIn(["coursesListMap"],function(e){return e.set(r,Object(f.fromJS)(a))});default:return e}};var _=n(132),w=n(398),g=n(400),C=n(55),S="https://raw.githubusercontent.com/progeneral777/nccu_course_data_test/master",L="APP_API_STATUS",M=new Headers({"Content-Type":"application/json"});function x(e){this.action=e,this.name="ActionException"}var T=function(e){return{type:L,payload:e}};var k=function(e){if(e instanceof x)throw e;throw navigator.onLine?new x(T(503)):new x(T(420))},U=function(e){return C.Observable.of(e.action)},R=function(e){var t=e.method,n=e.url,r=e.download,a=void 0!==r&&r;return C.Observable.from(fetch(n,{method:t,JSON_HEADER:M}).then(function(e){if(400===e.status);else{if(401===e.status)throw new x({type:(localStorage.clear(),sessionStorage.clear(),L),payload:401});if(e.status>=500)throw new x(T(e.status))}return e})).catch(k).mergeMap(function(e){return a?C.Observable.from(e.blob()):C.Observable.from(e.json())}).map(function(e){if(a)return e;if(e.code)throw new x({type:"APP_ERROR_CODE",payload:e});return e})},N=[function(e,t){return e.ofType(h).switchMap(function(){return C.Observable.empty()})},function(e){return e.ofType(d).switchMap(function(){return R({method:"get",url:"".concat(S,"/index.json")}).flatMap(function(e){return C.Observable.of(function(e){return{type:O,payload:{semesterList:e}}}(e))}).catch(U)})},function(e){return e.ofType(v).switchMap(function(e){var t=e.payload.semester;return R({method:"get",url:"".concat(S,"/").concat(t,"/courses.json")}).flatMap(function(e){return C.Observable.of(function(e,t){return{type:j,payload:{semester:e,coursesList:t}}}(t,e))}).catch(U)})}],A=Object(l.a)(N);var I=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0,n=new _.BehaviorSubject(w.a.apply(void 0,Object(l.a)(A))),r=Object(g.a)(),a=[r,Object(p.b)(t)],c=[m.a.apply(void 0,a)],o=m.c,i=Object(m.d)(Object(b.combineReducers)({nccuCourse:E}),Object(f.fromJS)(e),o.apply(void 0,c));return r.run(function(e,t,r){return n.mergeMap(function(n){return n(e,t,r).catch(function(e,t){return setTimeout(function(){throw e},0),t})})}),i}({},s),P=(n(390),n(44)),J=n(45),B=n(48),D=n(46),H=n(49),F=n(402),z=(n(392),n(41)),W=n(60),$=n(61);function q(){var e=Object(W.a)(["\n    .nccu-brand__nccu {\n        color: white;\n        font-size: 32px;\n        font-weight: 900;\n        font-family: 'Archivo Black', sans-serif;\n    }\n    .nccu-brand__course {\n        font-family: 'Francois One', sans-serif;\n        color: #5383d3;\n        font-size: 25px;\n    }\n"]);return q=function(){return e},e}function G(){var e=Object(W.a)(["\n    display: flex;\n    justify-content: center;\n    background: #ffffff0a; /* navigation bar background color */\n    .navigation-bar__main-content {\n        ","\n        height: ","px;\n        line-height: ","px;\n    }\n"]);return G=function(){return e},e}var K=function(){return"\n    width: ".concat(1e3,"px;\n    @media only screen and (max-width: ").concat(1e3,"px) {\n        width: 100%;\n        padding: 0px ").concat(10,"px;\n    }\n")},Q=$.a.div(G(),K(),50,50),V=$.a.div(q()),X=function(){return a.a.createElement(V,null,a.a.createElement("span",{className:"nccu-brand__nccu"},"NCCU"),a.a.createElement("span",{className:"nccu-brand__course"},"course"))},Y=function(){return a.a.createElement(Q,null,a.a.createElement("div",{className:"navigation-bar__main-content"},a.a.createElement(X,null)))},Z=function(e){return e.get("nccuCourse")},ee=function(){return Object(z.a)(Z,function(e){return e.get("semesterList")})};function te(){var e=Object(W.a)(["\n    display: flex;\n    justify-content: center;\n    height: calc(100vh - ","px);\n    overflow-y: auto;\n    .main-content__main-content {\n        ","\n    }\n"]);return te=function(){return e},e}var ne=$.a.div(te(),50,K()),re=n(401),ae=n(399),ce=function(e){function t(){return Object(P.a)(this,t),Object(B.a)(this,Object(D.a)(t).apply(this,arguments))}return Object(H.a)(t,e),Object(J.a)(t,[{key:"render",value:function(){var e=this.props.semesterList;return a.a.createElement("div",null,"SemesterSelectPage",e.map(function(e){return a.a.createElement("div",{key:e},e.get("semester"))}))}}]),t}(a.a.Component),oe=Object(z.b)({semesterList:ee()}),ie=Object(i.b)(oe,function(e){return{}})(ce),ue=function(e){function t(){return Object(P.a)(this,t),Object(B.a)(this,Object(D.a)(t).apply(this,arguments))}return Object(H.a)(t,e),Object(J.a)(t,[{key:"componentDidUpdate",value:function(){var e=this.props,t=e.semesterList,n=e.coursesListMap,r=e.match,a=e.handlefetchCoursesList,c=r.params.semester;t.find(function(e){return e.get("semester")===c})&&!n.get(c)&&a(c)}},{key:"render",value:function(){var e=this.props,t=e.match,n=e.coursesListMap,r=t.params.semester,c=n.get(r);return a.a.createElement("div",null,c&&c.map(function(e){return a.a.createElement("div",{key:e},e.get("name"))}))}}]),t}(a.a.Component);ue.defaultProps={match:{},semesterList:Object(f.List)(),coursesListMap:Object(f.Map)(),handlefetchCoursesList:function(){}};var se=Object(z.b)({semesterList:ee(),coursesListMap:Object(z.a)(Z,function(e){return e.get("coursesListMap")})}),le=Object(i.b)(se,function(e){return{handlefetchCoursesList:function(t){return e(function(e){return{type:v,payload:{semester:e}}}(t))}}})(ue),fe="/",pe="/:semester",me=function(){return a.a.createElement(re.a,null,a.a.createElement(ae.a,{exact:!0,path:fe,component:ie}),a.a.createElement(ae.a,{path:pe,component:le}))},be=function(e){function t(){return Object(P.a)(this,t),Object(B.a)(this,Object(D.a)(t).apply(this,arguments))}return Object(H.a)(t,e),Object(J.a)(t,[{key:"render",value:function(){var e=this.props.location;return a.a.createElement(ne,null,a.a.createElement("div",{className:"main-content__main-content"},a.a.createElement(me,{location:e})))}}]),t}(a.a.Component),he=Object(z.b)({semesterList:ee()}),de=Object(i.b)(he,function(e){return{}})(be);function Oe(){var e=Object(W.a)(["\n    display: flex;\n    flex-direction: column;\n"]);return Oe=function(){return e},e}var ve=$.a.div(Oe()),je=function(e){function t(){return Object(P.a)(this,t),Object(B.a)(this,Object(D.a)(t).apply(this,arguments))}return Object(H.a)(t,e),Object(J.a)(t,[{key:"componentDidMount",value:function(){(0,this.props.handlefetchSemesterList)()}},{key:"render",value:function(){return a.a.createElement(ve,null,a.a.createElement(Y,null),a.a.createElement(de,null))}}]),t}(a.a.Component),ye=Object(z.b)({}),Ee=Object(i.b)(ye,function(e){return{handlefetchSemesterList:function(){return e({type:d})}}})(je),_e=function(e){function t(){return Object(P.a)(this,t),Object(B.a)(this,Object(D.a)(t).apply(this,arguments))}return Object(H.a)(t,e),Object(J.a)(t,[{key:"render",value:function(){return a.a.createElement("div",{className:"App"},a.a.createElement(Ee,null))}}]),t}(r.Component),we=Object(F.a)(_e);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(i.a,{store:I},a.a.createElement(p.a,{history:s},a.a.createElement(we,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[139,2,1]]]);
//# sourceMappingURL=main.4e42df0e.chunk.js.map