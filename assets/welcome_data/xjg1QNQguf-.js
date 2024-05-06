;/*FB_PKG_DELIM*/

__d("EventEmitterWithValidation",["BaseEventEmitter"],(function(a,b,c,d,e,f){"use strict";a=function(a){babelHelpers.inheritsLoose(b,a);function b(b,c){var d;d=a.call(this)||this;d.$EventEmitterWithValidation1=Object.keys(b);d.$EventEmitterWithValidation2=Boolean(c);return d}var c=b.prototype;c.emit=function(b){if(this.$EventEmitterWithValidation1.indexOf(b)===-1){if(this.$EventEmitterWithValidation2)return;throw new TypeError(g(b,this.$EventEmitterWithValidation1))}return a.prototype.emit.apply(this,arguments)};return b}(b("BaseEventEmitter"));function g(a,b){a='Unknown event type "'+a+'". ';a+="Known event types: "+b.join(", ")+".";return a}e.exports=a}),null);
__d("mixInEventEmitter",["invariant","EventEmitterWithHolding","EventEmitterWithValidation","EventHolder"],(function(a,b,c,d,e,f,g,h){"use strict";function a(a,b,c){b||h(0,3159);var d=a.prototype||a;d.__eventEmitter&&h(0,3160);a=a.constructor;a&&(a===Object||a===Function||h(0,3161));d.__types=babelHelpers["extends"]({},d.__types,b);d.__ignoreUnknownEvents=Boolean(c);Object.assign(d,i)}var i={emit:function(a,b,c,d,e,f,g){return this.__getEventEmitter().emit(a,b,c,d,e,f,g)},emitAndHold:function(a,b,c,d,e,f,g){return this.__getEventEmitter().emitAndHold(a,b,c,d,e,f,g)},addListener:function(a,b,c){return this.__getEventEmitter().addListener(a,b,c)},once:function(a,b,c){return this.__getEventEmitter().once(a,b,c)},addRetroactiveListener:function(a,b,c){return this.__getEventEmitter().addRetroactiveListener(a,b,c)},listeners:function(a){return this.__getEventEmitter().listeners(a)},removeAllListeners:function(){this.__getEventEmitter().removeAllListeners()},removeCurrentListener:function(){this.__getEventEmitter().removeCurrentListener()},releaseHeldEventType:function(a){this.__getEventEmitter().releaseHeldEventType(a)},__getEventEmitter:function(){if(!this.__eventEmitter){var a=new(c("EventEmitterWithValidation"))(this.__types,this.__ignoreUnknownEvents),b=new(c("EventHolder"))();this.__eventEmitter=new(c("EventEmitterWithHolding"))(a,b)}return this.__eventEmitter}};g["default"]=a}),98);
__d("NavigationMetricsCore",["mixInEventEmitter","pageID"],(function(a,b,c,d,e,f,g){var h={NAVIGATION_DONE:"NAVIGATION_DONE",EVENT_OCCURRED:"EVENT_OCCURRED"},i={tti:"tti",e2e:"e2e",all_pagelets_loaded:"all_pagelets_loaded",all_pagelets_displayed:"all_pagelets_displayed"},j=0,k={},l=function(){function a(){this.eventTimings={tti:null,e2e:null,all_pagelets_loaded:null,all_pagelets_displayed:null},this.lid=c("pageID")+":"+j++,this.extras={}}var b=a.prototype;b.getLID=function(){return this.lid};b.setRequestStart=function(a){this.start=a;return this};b.setTTI=function(a){this.eventTimings.tti=a;this.$1(i.tti,a);return this};b.setE2E=function(a){this.eventTimings.e2e=a;this.$1(i.e2e,a);return this};b.setExtra=function(a,b){this.extras[a]=b;return this};b.setDisplayDone=function(a){this.eventTimings.all_pagelets_displayed=a;this.setExtra("all_pagelets_displayed",a);this.$1(i.all_pagelets_displayed,a);return this};b.setAllPageletsLoaded=function(a){this.eventTimings.all_pagelets_loaded=a;this.setExtra("all_pagelets_loaded",a);this.$1(i.all_pagelets_loaded,a);return this};b.setServerLID=function(a){this.serverLID=a;return this};b.$1=function(a,b){var c={};k!=null&&this.serverLID!=null&&k[this.serverLID]!=null&&(c=k[this.serverLID]);c=babelHelpers["extends"]({},c,{event:a,timestamp:b});m.emitAndHold(h.EVENT_OCCURRED,this.serverLID,c);return this};b.doneNavigation=function(){var a=babelHelpers["extends"]({start:this.start,extras:this.extras},this.eventTimings);if(this.serverLID&&k[this.serverLID]){var b=this.serverLID;Object.assign(a,k[b]);delete k[b]}m.emitAndHold(h.NAVIGATION_DONE,this.lid,a)};return a}(),m={Events:h,postPagelet:function(a,b,c){},siteInit:function(a){a(l)},setPage:function(a){if(!a.serverLID)return;k[a.serverLID]={page:a.page,pageType:a.page_type,pageURI:a.page_uri,serverLID:a.serverLID}},getFullPageLoadLid:function(){throw new Error("getFullPageLoadLid is not implemented on this site")}};c("mixInEventEmitter")(m,h);a=m;g["default"]=a}),98);
__d("NavigationMetricsWWW",["Arbiter","BigPipeInstance","NavigationMetricsCore","PageEvents","performance"],(function(a,b,c,d,e,f,g){var h,i="0";c("NavigationMetricsCore").getFullPageLoadLid=function(){return i};c("NavigationMetricsCore").siteInit(function(a){var b=new a(),e=!0;c("Arbiter").subscribe(d("BigPipeInstance").Events.init,function(f,g){var h=e?b:new a();e&&(i=g.lid);e=!1;h.setServerLID(g.lid);f=g.arbiter;f.subscribe(d("BigPipeInstance").Events.tti,function(a,b){a=b.ts;h.setTTI(a)});f.subscribe(c("PageEvents").AJAXPIPE_SEND,function(a,b){a=b.ts;h.setRequestStart(a)});f.subscribe(c("PageEvents").AJAXPIPE_ONLOAD,function(a,b){a=b.ts;h.setE2E(a).doneNavigation()});f.subscribe(d("BigPipeInstance").Events.displayed,function(a,b){a=b.ts;h.setDisplayDone(a)});f.subscribe(d("BigPipeInstance").Events.loaded,function(a,b){a=b.ts;h.setAllPageletsLoaded(a)})});c("Arbiter").subscribe(c("PageEvents").BIGPIPE_ONLOAD,function(a,d){a=d.ts;e=!1;b.setRequestStart((h||(h=c("performance"))).timing&&(h||(h=c("performance"))).timing.navigationStart).setE2E(a).doneNavigation()})});g["default"]=c("NavigationMetricsCore")}),98);
__d("FbtResultBase",[],(function(a,b,c,d,e,f){"use strict";var g=function(){function a(a,b){this.$1=a,this.__errorListener=b,this.$3=!1,this.$2=null}var b=a.prototype;b.flattenToArray=function(){return a.flattenToArray(this.$1)};b.getContents=function(){return this.$1};b.toString=function(){if(Object.isFrozen(this))return this.$4();if(this.$3)return"<<Reentering fbt.toString() is forbidden>>";this.$3=!0;try{return this.$4()}finally{this.$3=!1}};b.$4=function(){if(this.$2!=null)return this.$2;var b="",c=this.flattenToArray();for(var d=0;d<c.length;++d){var e=c[d];if(typeof e==="string"||e instanceof a)b+=e.toString();else{var f;(f=this.__errorListener)==null?void 0:f.onStringSerializationError==null?void 0:f.onStringSerializationError(e)}}Object.isFrozen(this)||(this.$2=b);return b};b.toJSON=function(){return this.toString()};a.flattenToArray=function(b){var c=[];for(var d=0;d<b.length;++d){var e=b[d];Array.isArray(e)?c.push.apply(c,a.flattenToArray(e)):e instanceof a?c.push.apply(c,e.flattenToArray()):c.push(e)}return c};return a}();["anchor","big","blink","bold","charAt","charCodeAt","codePointAt","contains","endsWith","fixed","fontcolor","fontsize","includes","indexOf","italics","lastIndexOf","link","localeCompare","match","normalize","repeat","replace","search","slice","small","split","startsWith","strike","sub","substr","substring","sup","toLocaleLowerCase","toLocaleUpperCase","toLowerCase","toUpperCase","trim","trimLeft","trimRight"].forEach(function(a){g.prototype[a]=function(){var b;(b=this.__errorListener)==null?void 0:b.onStringMethodUsed==null?void 0:b.onStringMethodUsed(a);for(var c=arguments.length,d=new Array(c),e=0;e<c;e++)d[e]=arguments[e];return String.prototype[a].apply(this,d)}});a=g;e.exports=a}),null);
__d("TrustedTypesIEFixDOMPolicy",["TrustedTypes"],(function(a,b,c,d,e,f,g){"use strict";a={createHTML:function(a){return a}};b=c("TrustedTypes").createPolicy("dom-ie-fix",a);d=b;g["default"]=d}),98);
__d("UserAgent_DEPRECATED",[],(function(a,b,c,d,e,f){var g=!1,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w;function x(){if(g)return;g=!0;var a=navigator.userAgent,b=/(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(a),c=/(Mac OS X)|(Windows)|(Linux)/.exec(a);s=/\b(iPhone|iP[ao]d)/.exec(a);t=/\b(iP[ao]d)/.exec(a);q=/Android/i.exec(a);u=/FBAN\/\w+;/i.exec(a);v=/FBAN\/mLite;/i.exec(a);w=/Mobile/i.exec(a);r=!!/Win64/.exec(a);if(b){h=b[1]?parseFloat(b[1]):b[5]?parseFloat(b[5]):NaN;h&&document&&document.documentMode&&(h=document.documentMode);var d=/(?:Trident\/(\d+.\d+))/.exec(a);m=d?parseFloat(d[1])+4:h;i=b[2]?parseFloat(b[2]):NaN;j=b[3]?parseFloat(b[3]):NaN;k=b[4]?parseFloat(b[4]):NaN;k?(b=/(?:Chrome\/(\d+\.\d+))/.exec(a),l=b&&b[1]?parseFloat(b[1]):NaN):l=NaN}else h=i=j=l=k=NaN;if(c){if(c[1]){d=/(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(a);n=d?parseFloat(d[1].replace("_",".")):!0}else n=!1;o=!!c[2];p=!!c[3]}else n=o=p=!1}function y(){return x()||h}function a(){return x()||m>h}function b(){return y()&&r}function c(){return x()||i}function d(){return x()||j}function z(){return x()||k}function e(){return z()}function A(){return x()||l}function B(){return x()||o}function C(){return x()||n}function D(){return x()||p}function E(){return x()||s}function F(){return x()||s||t||q||w}function G(){return x()||v!=null?null:u}function H(){return x()||q}function I(){return x()||t}f.ie=y;f.ieCompatibilityMode=a;f.ie64=b;f.firefox=c;f.opera=d;f.webkit=z;f.safari=e;f.chrome=A;f.windows=B;f.osx=C;f.linux=D;f.iphone=E;f.mobile=F;f.nativeApp=G;f.android=H;f.ipad=I}),66);
__d("isScalar",[],(function(a,b,c,d,e,f){function a(a){return/string|number|boolean/.test(typeof a)}f["default"]=a}),66);
__d("DOM",["$","DOMQuery","Event","FBLogger","FbtResultBase","HTML","TrustedTypesIEFixDOMPolicy","UserAgent_DEPRECATED","createArrayFromMixed","fb-error","isNode","isScalar","isTextNode"],(function(a,b,c,d,e,f,g){a=function(a,b,c){a=document.createElement(a);b&&h.setAttributes(a,b);c!=null&&h.setContent(a,c);return a};var h={find:(b=d("DOMQuery")).find,findPushSafe:b.findPushSafe,scry:b.scry,getSelection:b.getSelection,contains:b.contains,getRootElement:b.getRootElement,isNodeOfType:b.isNodeOfType,isInputNode:b.isInputNode,create:a,setAttributes:function(a,b){b.type&&(a.type=b.type);for(var d in b){var e=b[d],f=/^on/i.test(d);f&&typeof e!=="function"&&c("FBLogger")("dom").warn("Handlers passed to DOM.setAttributes must be functions. Handler passed for %s was %s",d,typeof e);if(d=="type")continue;else d=="style"?typeof e==="string"?a.style.cssText=e:Object.assign(a.style,e):f?c("Event").listen(a,d.substr(2),e):d in a?a[d]=e:a.setAttribute&&a.setAttribute(d,e)}},prependContent:function(a,b){if(!a)throw c("fb-error").TAAL.blameToPreviousFile(new Error("reference element is not a node"));return j(b,a,function(b){a.firstChild?a.insertBefore(b,a.firstChild):a.appendChild(b)})},insertAfter:function(a,b){if(!a||!a.parentNode)throw c("fb-error").TAAL.blameToPreviousFile(new Error("reference element does not have a parent"));var d=a.parentNode;return j(b,d,function(b){a.nextSibling?d.insertBefore(b,a.nextSibling):d.appendChild(b)})},insertBefore:function(a,b){if(!a||!a.parentNode)throw c("fb-error").TAAL.blameToPreviousFile(new Error("reference element does not have a parent"));var d=a.parentNode;return j(b,d,function(b){d.insertBefore(b,a)})},setContent:function(a,b){if(!a)throw c("fb-error").TAAL.blameToPreviousFile(new Error("reference element is not a node"));while(a.firstChild)i(a.firstChild);return h.appendContent(a,b)},appendContent:function(a,b){if(!a)throw c("fb-error").TAAL.blameToPreviousFile(new Error("reference element is not a node"));return j(b,a,function(b){a.appendChild(b)})},replace:function(a,b){if(!a||!a.parentNode)throw c("fb-error").TAAL.blameToPreviousFile(new Error("reference element does not have a parent"));var d=a.parentNode;return j(b,d,function(b){d.replaceChild(b,a)})},remove:function(a){i(typeof a==="string"?c("$")(a):a)},empty:function(a){a=typeof a==="string"?c("$")(a):a;while(a.firstChild)i(a.firstChild)}};function i(a){a.parentNode&&a.parentNode.removeChild(a)}function j(a,b,e){a=c("HTML").replaceJSONWrapper(a);if(a instanceof c("HTML")&&b.firstChild===null&&-1===a.toString().indexOf("<script")){var f=d("UserAgent_DEPRECATED").ie();if(!f||f>7&&!d("DOMQuery").isNodeOfType(b,["table","tbody","thead","tfoot","tr","select","fieldset"])){var g=f?'<em style="display:none;">&nbsp;</em>':"";b.innerHTML=c("TrustedTypesIEFixDOMPolicy").createHTML(g+a);f&&b.removeChild(b.firstChild);return Array.from(b.childNodes)}}else if(c("isTextNode")(b)){b.data=a;return[a]}g=document.createDocumentFragment();var h;f=[];b=[];var i=!1;a=c("createArrayFromMixed")(a);a.length===1&&a[0]instanceof c("FbtResultBase")&&(a=a[0].getContents());for(var j=0;j<a.length;j++){h=c("HTML").replaceJSONWrapper(a[j]);if(h instanceof c("HTML")){b.push(h.getAction());var k=h.getNodes();!i&&h.hasInlineJs()&&(c("FBLogger")("staticresources").warn("DOM: adding HTML which contains inline JS"),i=!0);for(var l=0;l<k.length;l++)f.push(k[l]),g.appendChild(k[l])}else if(c("isScalar")(h)||h instanceof c("FbtResultBase")){l=document.createTextNode(h);f.push(l);g.appendChild(l)}else c("isNode")(h)?(f.push(h),g.appendChild(h)):(Array.isArray(h)&&c("FBLogger")("dom").warn("Nest arrays not supported"),h!==null&&c("FBLogger")("dom").warn("No way to set content %s",h))}e(g);b.forEach(function(a){a()});return f}e=h;g["default"]=e}),98);
__d("PluginDefaultLink",[],(function(a,b,c,d,e,f){"use strict";a={register:function(a){var b;(b=window)==null?void 0:b.addEventListener("click",function(b){b.srcElement.tagName!=="A"&&b.srcElement.tagName!=="BUTTON"&&b.srcElement.closest("a")==null&&a.click()})}};b=a;f["default"]=b}),66);
__d("Deferred",["Promise"],(function(a,b,c,d,e,f){"use strict";var g;(g||(g=b("Promise"))).resolve();a=function(){function a(a){var c=this;a=a||g||(g=b("Promise"));this.$1=!1;this.$2=new a(function(a,b){c.$3=a,c.$4=b})}var c=a.prototype;c.getPromise=function(){return this.$2};c.resolve=function(a){this.$1=!0,this.$3(a)};c.reject=function(a){this.$1=!0,this.$4(a)};c.isSettled=function(){return this.$1};return a}();f["default"]=a}),66);
__d("NavigationMetrics",["cr:6016"],(function(a,b,c,d,e,f,g){g["default"]=b("cr:6016")}),98);
__d("IdleCallbackImplementation",["performanceNow","requestAnimationFramePolyfill"],(function(a,b,c,d,e,f,g){var h,i=[],j=0,k=0,l=-1,m=!1,n=1e3/60,o=2;function p(a){return a}function q(a){return a}function b(b,c){var d=k++;i[d]=b;s();if(c!=null&&c.timeout>0){var e=p(d);a.setTimeout(function(){return y(e)},c.timeout)}return p(d)}function r(a){a=q(a);i[a]=null}function s(){m||(m=!0,c("requestAnimationFramePolyfill")(function(a){m=!1,u((h||(h=c("performanceNow")))()-a)}))}function t(a){var b=n-o;if(a<b)return b-a;a=a%n;if(a>b||a<o)return 0;else return b-a}function u(a){var b=(h||(h=c("performanceNow")))();if(b>l){a=t(a);if(a>0){b=b+a;x(b);l=b}}v()&&s()}function v(){return j<i.length}function w(){while(v()){var a=i[j];j++;if(a)return a}return null}function x(a){var b;while((h||(h=c("performanceNow")))()<a&&(b=w()))b(new z(a))}function y(a){var b=q(a);b=i[b];b&&(r(a),b(new z(null)))}var z=function(){function a(a){this.didTimeout=a==null,this.$1=a}var b=a.prototype;b.timeRemaining=function(){var a=this.$1;if(a!=null){var b=(h||(h=c("performanceNow")))();if(b<a)return a-b}return 0};return a}();g.requestIdleCallback=b;g.cancelIdleCallback=r}),98);
__d("Log",[],(function(a,b,c,d,e,f){"use strict";var g=-1;b={DEBUG:3,INFO:2,WARNING:1,ERROR:0};c=function(a,b,c){for(var d=arguments.length,e=new Array(d>3?d-3:0),f=3;f<d;f++)e[f-3]=arguments[f];var h=0,i=c.replace(/%s/g,function(){return String(e[h++])}),j=window.console;j&&g>=b&&j[a in j?a:"log"](i)};function a(a){g=a}d=c.bind(null,"debug",b.DEBUG);e=c.bind(null,"info",b.INFO);var h=c.bind(null,"warn",b.WARNING),i=c.bind(null,"error",b.ERROR);f.Level=b;f.log=c;f.setLevel=a;f.debug=d;f.info=e;f.warn=h;f.error=i}),66);
__d("requestIdleCallbackAcrossTransitions",["IdleCallbackImplementation","TimeSlice"],(function(a,b,c,d,e,f,g){var h=a.requestIdleCallback||d("IdleCallbackImplementation").requestIdleCallback;function b(b,d){b=c("TimeSlice").guard(b,"requestIdleCallback",{propagationType:c("TimeSlice").PropagationType.CONTINUATION,registerCallStack:!0});return h.call(a,b,d)}g["default"]=b}),98);
__d("BDHeaderConfig",[],(function(a,b,c,d,e,f){"use strict";a="129477";f.ASBD_ID=a}),66);
__d("getCrossOriginTransport",["invariant","ExecutionEnvironment","err"],(function(a,b,c,d,e,f,g){var h;function i(){if(!(h||(h=b("ExecutionEnvironment"))).isInBrowser)throw b("err")("getCrossOriginTransport: %s","Cross origin transport unavailable in the server environment.");try{var a=new XMLHttpRequest();!("withCredentials"in a)&&typeof XDomainRequest!=="undefined"&&(a=new XDomainRequest());return a}catch(a){throw b("err")("getCrossOriginTransport: %s",a.message)}}i.withCredentials=function(){var a=i();"withCredentials"in a||g(0,5150);var b=a.open;a.open=function(){b.apply(this,arguments),this.withCredentials=!0};return a};e.exports=i}),null);
__d("ZeroRewrites",["URI","ZeroRewriteRules","getCrossOriginTransport","getSameOriginTransport","isFacebookURI"],(function(a,b,c,d,e,f){var g,h={rewriteURI:function(a){if(!b("isFacebookURI")(a)||h._isWhitelisted(a))return a;var c=h._getRewrittenSubdomain(a);c!==null&&c!==void 0&&(a=a.setSubdomain(c));return a},getTransportBuilderForURI:function(a){return h.isRewritten(a)?b("getCrossOriginTransport").withCredentials:b("getSameOriginTransport")},isRewriteSafe:function(a){if(Object.keys(b("ZeroRewriteRules").rewrite_rules).length===0||!b("isFacebookURI")(a))return!1;var c=h._getCurrentURI().getDomain(),d=new(g||(g=b("URI")))(a).qualify().getDomain();return c===d||h.isRewritten(a)},isRewritten:function(a){a=a.getQualifiedURI();if(Object.keys(b("ZeroRewriteRules").rewrite_rules).length===0||!b("isFacebookURI")(a)||h._isWhitelisted(a))return!1;var c=a.getSubdomain(),d=h._getCurrentURI(),e=h._getRewrittenSubdomain(d);return a.getDomain()!==d.getDomain()&&c===e},_isWhitelisted:function(a){a=a.getPath();a.endsWith("/")||(a+="/");return b("ZeroRewriteRules").whitelist&&b("ZeroRewriteRules").whitelist[a]===1},_getRewrittenSubdomain:function(a){a=a.getQualifiedURI().getSubdomain();return b("ZeroRewriteRules").rewrite_rules[a]},_getCurrentURI:function(){return new(g||(g=b("URI")))("/").qualify()}};e.exports=h}),null);
__d("getAsyncHeaders",["BDHeaderConfig","LSD","ZeroCategoryHeader","isFacebookURI"],(function(a,b,c,d,e,f,g){function a(a){var b={},d=c("isFacebookURI")(a);d&&c("ZeroCategoryHeader").value&&(b[c("ZeroCategoryHeader").header]=c("ZeroCategoryHeader").value);d=h(a);d&&(b["X-FB-LSD"]=d);d=i(a);d&&(b["X-ASBD-ID"]=d);return b}function h(a){return j(a)?null:c("LSD").token}function i(a){return j(a)?null:d("BDHeaderConfig").ASBD_ID}function j(a){return!a.toString().startsWith("/")&&a.getOrigin()!==document.location.origin}g["default"]=a}),98);