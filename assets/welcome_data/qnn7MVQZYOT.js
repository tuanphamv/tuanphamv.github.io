;/*FB_PKG_DELIM*/

__d("resolveWindow",[],(function(a,b,c,d,e,f){function a(a){if(a==null)return null;var b=window;a=a.split(".");try{for(var c=0;c<a.length;c++){var d=a[c],e=/^frames\[[\'\"]?([a-zA-Z0-9\-_]+)[\'\"]?\]$/.exec(d);if(e)b=b.frames[e[1]];else if(d==="opener"||d==="parent"||d==="top")b=b[d];else return null}}catch(a){return null}return b}f["default"]=a}),66);
__d("ObservableMixin",[],(function(a,b,c,d,e,f){function a(){this.__observableEvents={}}a.prototype={inform:function(a){var b=Array.prototype.slice.call(arguments,1),c=Array.prototype.slice.call(this.getSubscribers(a));for(var d=0;d<c.length;d++){if(c[d]===null)continue;try{c[d].apply(this,b)}catch(a){window.setTimeout(function(){throw a},0)}}return this},getSubscribers:function(a){return this.__observableEvents[a]||(this.__observableEvents[a]=[])},clearSubscribers:function(a){a&&(this.__observableEvents[a]=[]);return this},subscribe:function(a,b){a=this.getSubscribers(a);a.push(b);return this},unsubscribe:function(a,b){a=this.getSubscribers(a);for(var c=0;c<a.length;c++)if(a[c]===b){a.splice(c,1);break}return this}};e.exports=a}),null);
__d("ManagedError",[],(function(a,b,c,d,e,f){a=function(a){babelHelpers.inheritsLoose(b,a);function b(b,c){var d;d=a.call(this,b!==null&&b!==void 0?b:"")||this;b!==null&&b!==void 0?d.message=b:d.message="";d.innerError=c;return d}return b}(babelHelpers.wrapNativeSuper(Error));f["default"]=a}),66);
__d("AssertionError",["ManagedError"],(function(a,b,c,d,e,f,g){a=function(a){babelHelpers.inheritsLoose(b,a);function b(b){return a.call(this,b)||this}return b}(c("ManagedError"));g["default"]=a}),98);
__d("Assert",["AssertionError","sprintf"],(function(a,b,c,d,e,f,g){function h(a,b){if(typeof a!=="boolean"||a===!1)throw new(c("AssertionError"))(b);return a}function i(a,b,d){var e;if(b===void 0)e="undefined";else if(b===null)e="null";else{var f=Object.prototype.toString.call(b);f=/\s(\w*)/.exec(f);e=f==null?typeof f:f[1].toLowerCase()}h(a.indexOf(e)!==-1,(f=d)!=null?f:c("sprintf")("Expression is of type %s, not %s",e,a));return b}function a(a,b,c){h(b instanceof a,(a=c)!=null?a:"Expression not instance of type");return b}function j(a,b){k["is"+a]=b,k["maybe"+a]=function(a,c){return a==null?a:b(a,c)}}b=function(a,b){return a};var k={isInstanceOf:a,isTrue:h,isTruthy:function(a,b){return h(!!a,b)},isBoolean:b,isFunction:b,isNumber:b,isObject:b,isString:b,isUndefined:b,maybeObject:b,maybeNumber:b,maybeFunction:b};["Boolean","Function","Number","Object","String","Undefined"].forEach(function(a){j(a,i.bind(null,a.toLowerCase()))});d=k;g["default"]=d}),98);
__d("Type",["Assert"],(function(a,b,c,d,e,f){function g(){var a=this.__mixins;if(a)for(var b=0;b<a.length;b++)a[b].apply(this,arguments)}function h(a,b){if(b instanceof a)return!0;if(b instanceof g)for(var c=0;c<b.__mixins.length;c++)if(b.__mixins[c]==a)return!0;return!1}function i(a,b){var c=a.prototype;Array.isArray(b)||(b=[b]);for(a=0;a<b.length;a++){var d=b[a];typeof d==="function"&&(c.__mixins.push(d),d=d.prototype);Object.keys(d).forEach(function(a){c[a]=d[a]})}}function j(a,c,d){var e=c&&Object.prototype.hasOwnProperty.call(c,"constructor")?c.constructor:function(){this.parent.apply(this,arguments)};b("Assert").isFunction(e);if(a&&a.prototype instanceof g===!1)throw new Error("parent type does not inherit from Type");a=a||g;function f(){}f.prototype=a.prototype;e.prototype=new f();c&&Object.assign(e.prototype,c);e.prototype.constructor=e;e.parent=a;e.prototype.__mixins=a.prototype.__mixins?Array.prototype.slice.call(a.prototype.__mixins):[];d&&i(e,d);e.prototype.parent=function(){this.parent=a.prototype.parent,a.apply(this,arguments)};e.prototype.parentCall=function(b){return a.prototype[b].apply(this,Array.prototype.slice.call(arguments,1))};e.extend=function(a,b){return j(this,a,b)};return e}Object.assign(g.prototype,{instanceOf:function(a){return h(a,this)}});Object.assign(g,{extend:function(a,b){return typeof a==="function"?j.apply(null,arguments):j(null,a,b)},instanceOf:h});e.exports=g}),null);
__d("sdk.Model",["ObservableMixin","Type"],(function(a,b,c,d,e,f,g){"use strict";a=c("Type").extend({constructor:function(a){this.parent();var b={},c=this;Object.keys(a).forEach(function(d){b[d]=a[d],c["set"+d]=function(a){if(a===b[d])return c;b[d]=a;c.inform(d+".change",a);return c},c["get"+d]=function(){return b[d]}})}},c("ObservableMixin"));b=a;g["default"]=b}),98);
__d("sdk.Runtime",["JSSDKRuntimeConfig","sdk.Model"],(function(a,b,c,d,e,f,g){var h={UNKNOWN:0,PAGETAB:1,CANVAS:2,PLATFORM:4},i=new(c("sdk.Model"))({AccessToken:"",AutoLogAppEvents:!1,ClientID:"",CookieUserID:"",EnforceHttps:!1,Environment:h.UNKNOWN,FamilyLoginLoaded:!1,GraphDomain:"",Initialized:!1,IsSPIN:Boolean((a=d("JSSDKRuntimeConfig")).isSPIN),IsVersioned:!1,KidDirectedSite:void 0,Locale:a.locale,LoggedIntoFacebook:void 0,LoginStatus:void 0,Revision:a.revision,Rtl:a.rtl,Scope:void 0,SDKAB:a.sdkab,SDKUrl:a.sdkurl,SDKNS:a.sdkns,ShouldLoadFamilyLogin:!1,UseCookie:!1,UseLocalStorage:!0,UserID:"",Version:void 0});Object.assign(i,{ENVIRONMENTS:h,isEnvironment:function(a){var b=this.getEnvironment();return(a|b)===b},isCanvasEnvironment:function(){return this.isEnvironment(h.CANVAS)||this.isEnvironment(h.PAGETAB)}});(function(){var a=/app_runner/.test(window.name)?h.PAGETAB:/iframe_canvas/.test(window.name)?h.CANVAS:h.UNKNOWN;(a|h.PAGETAB)===a&&(a|=h.CANVAS);i.setEnvironment(a)})();b=i;g["default"]=b}),98);
__d("UrlMap",["invariant","UrlMapConfig","sdk.Runtime"],(function(a,b,c,d,e,f,g,h){function a(a){var b="https";if(a==="graph_domain"){var e=c("sdk.Runtime").getGraphDomain();e?a="graph_".concat(e):a="graph"}if(a in d("UrlMapConfig"))return b+"://"+d("UrlMapConfig")[a];a in d("UrlMapConfig")||h(0,2511,a);return""}g.resolve=a}),98);
__d("sdk.Scribe",["QueryString","UrlMap","sdk.Runtime"],(function(a,b,c,d,e,f,g){var h={};function a(a,b,e){e===void 0&&(e=!1);if(a==="jssdk_error"){var f=JSON.stringify(b);if(Object.prototype.hasOwnProperty.call(h,f))return;else h[f]=!0}if(b.extra!=null&&typeof b.extra==="object"){f=b.extra;f.revision=c("sdk.Runtime").getRevision()}f=new Image();var g=d("UrlMap").resolve("www")+"/platform/scribe_endpoint.php/";e||(f.crossOrigin="anonymous");f.src=c("QueryString").appendToUrl(g,{c:a,m:JSON.stringify(babelHelpers["extends"]({},b,{isSPIN:c("sdk.Runtime").getIsSPIN()}))})}g.log=a}),98);
__d("XD",["Arbiter","DOM","DOMDimensions","Log","PHPQuerySerializer","Queue","URI","isFacebookURI","isInIframe","resolveWindow","sdk.Scribe"],(function(a,b,c,d,e,f,g){var h,i,j={_callbacks:[],_opts:{autoResize:!1,allowShrink:!0,channelUrl:null,hideOverflow:!1,resizeTimeout:1e3,resizeWidth:!1},_lastResizeAckId:0,_resizeCount:0,_resizeTimestamp:0,_shrinker:null,_forcedMinWidth:100,init:function(a){var b=this;this._opts=babelHelpers["extends"]({},this._opts,a);this._opts.autoResize&&this._startResizeMonitor();c("Arbiter").subscribe("Connect.Unsafe.resize.ack",function(a,c){c.id||(c.id=b._resizeCount),c.id>b._lastResizeAckId&&(b._lastResizeAckId=c.id)})},getQueue:function(){this._queue||(this._queue=new(c("Queue"))());return this._queue},setChannelUrl:function(a){var b=this;this.getQueue().start(function(c){return b.send(c,a)})},send:function(a,b){a===void 0&&(a=null);b===void 0&&(b=null);b=b||this._opts.channelUrl;if(!b){this.getQueue().enqueue(a);return}var e={};b=new(i||(i=c("URI")))(b);Object.assign(e,a,(h||(h=d("PHPQuerySerializer"))).deserialize(b.getFragment()));b=new i(e.origin);if(b.getDomain()===""){d("Log").error("No valid domain for XD message target.");return}var f=b.getOrigin();if(typeof e.relation!=="string"){d("Log").error("No relation specified to resolve XD target window.");return}var g=c("resolveWindow")(e.relation.replace(/^parent\./,"")),j=1;b=function b(){try{g.postMessage((h||(h=d("PHPQuerySerializer"))).serialize(e),f)}catch(c){--j?window.setTimeout(b,200):d("sdk.Scribe").log("jssdk_error",{error:"POST_MESSAGE",extra:{message:c.message+", html/js/modules/XD.js:139",ancestor_origins:JSON.stringify(location.ancestorOrigins),referrer:document.referrer,data:a}})}};b()},_computeSize:function(){var a=d("DOMDimensions").getDocumentDimensions(),b=0;if(this._opts.resizeWidth){var e=document.body;if(e!=null){if(e.clientWidth<e.scrollWidth)b=a.width;else{e=e.lastElementChild;if(e!=null&&e instanceof HTMLElement){e=e;e=e.offsetLeft+e.offsetWidth;e>b&&(b=e)}}b=Math.max(b,j._forcedMinWidth)}else b=j._forcedMinWidth}a.width=b;this._opts.allowShrink&&(this._shrinker||(this._shrinker=c("DOM").create("div")),c("DOM").appendContent(document.body,this._shrinker),a.height=Math.max(this._shrinker.offsetTop,0));return a},_startResizeMonitor:function(){var a,b=this,d;a=(a=document.documentElement)!=null?a:{};if(this._opts.hideOverflow){a.style.overflow="hidden";((a=document.body)!=null?a:{}).style.overflow="hidden"}a=function(){var a=b._computeSize(),e=Date.now();if(!d||b._opts.allowShrink&&d.width!=a.width||!b._opts.allowShrink&&d.width<a.width||b._opts.allowShrink&&d.height!=a.height||!b._opts.allowShrink&&d.height<a.height){d=a;b._resizeCount++;b._resizeTimestamp=e;e={type:"resize",height:a.height,ackData:{id:b._resizeCount},width:0};a.width&&a.width!=0&&(e.width=a.width);try{if(c("isFacebookURI")(new(i||(i=c("URI")))(document.referrer))&&c("isInIframe")()&&window.name&&window.parent.location&&window.parent.location.toString&&c("isFacebookURI")(new(i||(i=c("URI")))(window.parent.location))){a=window.parent.document.getElementsByTagName("iframe");for(var f=0;f<a.length;f++)a[f].name==window.name&&(b._opts.resizeWidth&&(a[f].style.width=e.width+"px"),a[f].style.height=e.height+"px")}b.send(e)}catch(a){b.send(e)}}};a();window.setInterval(a,this._opts.resizeTimeout)}};b=babelHelpers["extends"]({},j);a.UnverifiedXD=b;a.XD=j;g.XD=j;g.UnverifiedXD=b}),98);
__d("PluginDOMEventListener",["DOMEventListener","Log","UserAgent","promiseDone"],(function(a,b,c,d,e,f,g){var h=!c("UserAgent").isBrowser("Safari < 12")&&typeof document.hasStorageAccess==="function",i=!h,j=!1;!i&&h&&c("promiseDone")(document.hasStorageAccess(),function(a){d("Log").debug("hasStorageAccess=%s",a),i=a},function(a){return d("Log").warn("Storage access check failed: %s",a)});function a(a,b,e,f){f===void 0&&(f=!1);if(!h||i||j)return d("DOMEventListener").add.apply(this,arguments);else{var g=function(){var a=this;for(var b=arguments.length,f=new Array(b),g=0;g<b;g++)f[g]=arguments[g];if(i||j)return e.apply(this,f);else{var h=document.requestStorageAccess().then(function(b){d("Log").debug("Storage access request granted.");i=!0;return e.apply(a,f)},function(b){d("Log").warn("Storage access request denied.");j=!0;return e.apply(a,f)});c("promiseDone")(h)}};return d("DOMEventListener").add.call(null,a,b,g,f)}}g.add=a;g.remove=d("DOMEventListener").remove}),98);
__d("PluginITP",["PluginDOMEventListener","promiseDone"],(function(a,b,c,d,e,f,g){function a(){if(!("hasStorageAccess"in document))return;c("promiseDone")(document.hasStorageAccess(),function(a){document.body&&!a&&d("PluginDOMEventListener").add(document.body,"click",function(){location.reload()})})}g.init=a}),98);
__d("UnverifiedXD",["XD"],(function(a,b,c,d,e,f,g){g["default"]=d("XD").UnverifiedXD}),98);
__d("PluginResize",["Locale","Log","UnverifiedXD","getOffsetParent","getStyleProperty"],(function(a,b,c,d,e,f){function g(a){a=a||document.body;var c=0,d=b("getOffsetParent")(a);b("Locale").isRTL()&&d?c=d.offsetWidth-a.offsetLeft-a.offsetWidth:b("Locale").isRTL()||(c=a.offsetLeft);return h(a)+c}function h(a){return Math.ceil(parseFloat(b("getStyleProperty")(a,"width")))||a.offsetWidth}function i(a){a=a||document.body;return a.offsetHeight+a.offsetTop}function j(a,b,c){this.calcWidth=a||g,this.calcHeight=b||i,this.width=void 0,this.height=void 0,this.event=c||"resize"}Object.assign(j.prototype,{resize:function(){var a=this.calcWidth(),c=this.calcHeight();(a!==this.width||c!==this.height)&&(b("Log").debug("Resizing Plugin: (%s, %s, %s, %s)",a,c,this.event),this.width=a,this.height=c,b("UnverifiedXD").send({type:this.event,width:a,height:c}));return this},auto:function(a){setInterval(this.resize.bind(this),a||250);return this}});j.auto=function(a,b,c){return new j(g.bind(null,a),i.bind(null,a),b).resize().auto(c)};j.autoHeight=function(a,b,c,d){return new j(function(){return a},i.bind(null,b),c).resize().auto(d)};j.getElementWidth=h;e.exports=j}),null);
__d("SecurePostMessage",["invariant"],(function(a,b,c,d,e,f,g){"use strict";var h="*";a={sendMessageToSpecificOrigin:function(a,b,c,d){c!==h||g(0,21157),a.postMessage(b,c,d)},sendMessageForCurrentOrigin:function(a,b){a.postMessage(b)},sendMessageAllowAnyOrigin_UNSAFE:function(a,b,c){a.postMessage(b,h,c)}};e.exports=a}),null);
__d("PluginXDReady",["Arbiter","Log","SecurePostMessage","UnverifiedXD"],(function(a,b,c,d,e,f,g){b={handleMessage:function(a){d("Log").debug("PluginXDReady at "+window.name+" handleMessage "+JSON.stringify(a));if(!a.method)return;try{c("Arbiter").inform("Connect.Unsafe."+a.method,JSON.parse(a.params),"persistent")}catch(a){}}};window.addEventListener("message",function(a){d("Log").debug("PluginXDReady at "+window.name+" received message "+JSON.stringify(a.data.message));if(a.data.xdArbiterSyn)d("SecurePostMessage").sendMessageAllowAnyOrigin_UNSAFE(a.source,{xdArbiterAck:!0});else if(a.data.xdArbiterHandleMessage){if(!a.data.message.method)return;try{c("Arbiter").inform("Connect.Unsafe."+a.data.message.method,JSON.parse(a.data.message.params),"persistent")}catch(a){}}},!1);a.XdArbiter=b;c("UnverifiedXD").send({xd_action:"plugin_ready",name:window.name});e=null;g["default"]=e}),98);