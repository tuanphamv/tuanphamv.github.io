;/*FB_PKG_DELIM*/

__d("Base64",[],(function(a,b,c,d,e,f){var g="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function h(a){a=a.charCodeAt(0)<<16|a.charCodeAt(1)<<8|a.charCodeAt(2);return String.fromCharCode(g.charCodeAt(a>>>18),g.charCodeAt(a>>>12&63),g.charCodeAt(a>>>6&63),g.charCodeAt(a&63))}var i=">___?456789:;<=_______\0\x01\x02\x03\x04\x05\x06\x07\b\t\n\v\f\r\x0e\x0f\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19______\x1a\x1b\x1c\x1d\x1e\x1f !\"#$%&'()*+,-./0123";function j(a){a=i.charCodeAt(a.charCodeAt(0)-43)<<18|i.charCodeAt(a.charCodeAt(1)-43)<<12|i.charCodeAt(a.charCodeAt(2)-43)<<6|i.charCodeAt(a.charCodeAt(3)-43);return String.fromCharCode(a>>>16,a>>>8&255,a&255)}var k={encode:function(a){a=unescape(encodeURI(a));var b=(a.length+2)%3;a=(a+"\0\0".slice(b)).replace(/[\s\S]{3}/g,h);return a.slice(0,a.length+b-2)+"==".slice(b)},decode:function(a){a=a.replace(/[^A-Za-z0-9+\/]/g,"");var b=a.length+3&3;a=(a+"AAA".slice(b)).replace(/..../g,j);a=a.slice(0,a.length+b-3);try{return decodeURIComponent(escape(a))}catch(a){throw new Error("Not valid UTF-8")}},encodeObject:function(a){return k.encode(JSON.stringify(a))},decodeObject:function(a){return JSON.parse(k.decode(a))},encodeNums:function(a){return String.fromCharCode.apply(String,a.map(function(a){return g.charCodeAt((a|-(a>63?1:0))&-(a>0?1:0)&63)}))}};a=k;f["default"]=a}),66);
__d("isLinkshimURI",["LinkshimHandlerConfig","isBulletinDotComURI","isFacebookURI","isMessengerDotComURI"],(function(a,b,c,d,e,f,g){"use strict";b=c("LinkshimHandlerConfig").linkshim_host.split(".");var h=b[b.length-1];function a(a){var b=a.getPath();if((b==="/l.php"||b.indexOf("/si/ajax/l/")===0||b.indexOf("/l/")===0||b.indexOf("l/")===0)&&(c("isFacebookURI")(a)||c("isMessengerDotComURI")(a)||c("isBulletinDotComURI")(a)))return!0;if(b===c("LinkshimHandlerConfig").linkshim_path&&a.isSubdomainOfDomain(h)){b=a.getQueryData();if(b[c("LinkshimHandlerConfig").linkshim_enc_param]!=null&&b[c("LinkshimHandlerConfig").linkshim_url_param]!=null)return!0}return!1}g["default"]=a}),98);
__d("FBLynxBase",["$","LinkshimHandlerConfig","URI","cr:7736","isLinkshimURI"],(function(a,b,c,d,e,f){"use strict";var g;function h(a){if(!b("isLinkshimURI")(a))return null;a=a.getQueryData().u;return!a?null:a}var i={logAsyncClick:function(a){i.swapLinkWithUnshimmedLink(a);a=a.getAttribute("data-lynx-uri");if(!a)return;b("cr:7736").log(a)},originReferrerPolicyClick:function(a){var c=b("$")("meta_referrer");c.content=b("LinkshimHandlerConfig").switched_meta_referrer_policy;i.logAsyncClick(a);setTimeout(function(){c.content=b("LinkshimHandlerConfig").default_meta_referrer_policy},100)},swapLinkWithUnshimmedLink:function(a){var c=a.href,d=h(new(g||(g=b("URI")))(c));if(!d)return;a.setAttribute("data-lynx-uri",c);a.href=d},revertSwapIfLynxURIPresent:function(a){var b=a.getAttribute("data-lynx-uri");if(!b)return;a.removeAttribute("data-lynx-uri");a.href=b}};e.exports=i}),null);
__d("FBLynx",["Base64","Event","FBLynxBase","LinkshimHandlerConfig","Parent","URI"],(function(a,b,c,d,e,f){"use strict";var g,h=(g||(g=b("URI"))).goURIOnWindow,i={alreadySetup:!1,setupDelegation:function(a){a===void 0&&(a=!1);if(!document.documentElement)return;if(document.body==null){if(a)return;window.setTimeout(function(){i.setupDelegation(!0)},100);return}if(i.alreadySetup)return;i.alreadySetup=!0;var c=function(a){var c=i.getMaybeLynxLink(a.target);if(!c)return;var d=c[0];c=c[1];var e=c,f=new(g||(g=b("URI")))(c.href),j;if(b("LinkshimHandlerConfig").ghl_param_link_shim&&d!=="hover"&&(c.dataset&&c.dataset.attributes)){j=b("Base64").decodeObject(c.dataset.attributes);if(j&&j.open_link){var k;for(k in j)k!=="open_link"&&f.addQueryData(k,j[k]);k=c.cloneNode(!0);k.href=f.toString();e=k}}switch(d){case"async":case"asynclazy":b("FBLynxBase").logAsyncClick(e);break;case"origin":b("FBLynxBase").originReferrerPolicyClick(e);break;case"hover":i.hoverClick(e);break}b("LinkshimHandlerConfig").ghl_param_link_shim&&d!=="hover"&&j&&j.open_link&&(a.preventDefault(),h(f,window.open("",e.target),!0))};b("Event").listen(document.body,"click",c);b("LinkshimHandlerConfig").middle_click_requires_event&&b("Event").listen(document.body,"mouseup",function(a){a.button==1&&c(a)});b("Event").listen(document.body,"mouseover",function(a){a=i.getMaybeLynxLink(a.target);if(!a)return;var b=a[0];a=a[1];switch(b){case"async":case"asynclazy":case"origin":case"hover":i.mouseover(a);break}});b("Event").listen(document.body,"contextmenu",function(a){a=i.getMaybeLynxLink(a.target);if(!a)return;var b=a[0];a=a[1];switch(b){case"async":case"hover":case"origin":i.contextmenu(a);break;case"asynclazy":break}})},getMaybeLynxLink:function(a){a=b("Parent").byAttribute(a,"data-lynx-mode");if(a instanceof HTMLAnchorElement){var c=a.getAttribute("data-lynx-mode");switch(c){case"async":case"asynclazy":case"hover":case"origin":return[c,a];default:return null}}return null},hoverClick:function(a){b("FBLynxBase").revertSwapIfLynxURIPresent(a)},mouseover:function(a){b("FBLynxBase").swapLinkWithUnshimmedLink(a)},contextmenu:function(a){b("FBLynxBase").revertSwapIfLynxURIPresent(a)}};e.exports=i}),null);
__d("CometLruCache",["recoverableViolation"],(function(a,b,c,d,e,f,g){"use strict";var h=function(){function a(a){this.$1=a,a<=0&&c("recoverableViolation")("CometLruCache: Unable to create instance of cache with zero or negative capacity.","CometLruCache"),this.$2=new Map()}var b=a.prototype;b.set=function(a,b){this.$2["delete"](a);this.$2.set(a,b);if(this.$2.size>this.$1){a=this.$2.keys().next();a.done||this.$2["delete"](a.value)}};b.get=function(a){var b=this.$2.get(a);b!=null&&(this.$2["delete"](a),this.$2.set(a,b));return b};b.has=function(a){return this.$2.has(a)};b["delete"]=function(a){this.$2["delete"](a)};b.size=function(){return this.$2.size};b.capacity=function(){return this.$1-this.$2.size};b.clear=function(){this.$2.clear()};return a}();function a(a){return new h(a)}g.create=a}),98);
__d("structuredClone",[],(function(a,b,c,d,e,f){"use strict";b=(a=window)==null?void 0:a.structuredClone;f["default"]=b}),66);
__d("ConstUriUtils",["CometLruCache","ExecutionEnvironment","FBLogger","PHPQuerySerializer","PHPQuerySerializerNoEncoding","URIRFC3986","URISchemes","UriNeedRawQuerySVConfig","isSameOrigin","recoverableViolation","structuredClone"],(function(a,b,c,d,e,f,g){"use strict";var h,i,j,k,l=d("CometLruCache").create(5e3),m=new RegExp("(^|\\.)facebook\\.com$","i"),n=new RegExp("^(?:[^/]*:|[\\x00-\\x1f]*/[\\x00-\\x1f]*/)"),o=new RegExp("[\\x00-\\x2c\\x2f\\x3b-\\x40\\x5c\\x5e\\x60\\x7b-\\x7f\\uFDD0-\\uFDEF\\uFFF0-\\uFFFF\\u2047\\u2048\\uFE56\\uFE5F\\uFF03\\uFF0F\\uFF1F]"),p=c("UriNeedRawQuerySVConfig").uris.map(function(a){return{domain:a,valid:w(a)}}),q=[],r=[];function s(a,b){var d={};if(a!=null)for(var a=a.entries(),e=Array.isArray(a),f=0,a=e?a:a[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var g;if(e){if(f>=a.length)break;g=a[f++]}else{f=a.next();if(f.done)break;g=f.value}g=g;d[g[0]]=g[1]}else c("FBLogger")("ConstUriUtils").warn("Passed a null query map in, this means poor client side flow coverage or client/server boundary type issue.");return b.serialize(d)}function t(a,b,d){var e=k||(k=c("PHPQuerySerializer"));if(["http","https"].includes(b)&&u(a)){if(a.includes("doubleclick.net")&&d!=null&&!d.startsWith("http"))return e;e=c("PHPQuerySerializerNoEncoding")}return e}function u(a){return a!=null&&p.some(function(b){return b.valid&&v(a,b.domain)})}function v(a,b){if(b===""||a==="")return!1;if(a.endsWith(b)){b=a.length-b.length-1;if(b===-1||a[b]===".")return!0}return!1}function w(a){return!o.test(a)}function x(a,b){var c=b.protocol!=null&&b.protocol!==""?b.protocol:a.getProtocol();c=b.domain!=null?t(b.domain,c):a.getSerializer();c={domain:a.getDomain(),fragment:a.getFragment(),fragmentSeparator:a.hasFragmentSeparator(),isGeneric:a.isGeneric(),originalRawQuery:a.getOriginalRawQuery(),path:a.getPath(),port:a.getPort(),protocol:a.getProtocol(),queryParams:a.getQueryParams(),serializer:c,subdomain:a.getSubdomain()};a=babelHelpers["extends"]({},c,b);c=b.queryParams!=null&&b.queryParams.size!==0;return C.getUribyObject(a,c)}function y(a,b,c,d){c===void 0&&(c=!1);var e=a.protocol!==""?a.protocol+":"+(a.isGeneric?"":"//"):"",f=a.domain!==""?a.domain:"",g=a.port!==""?":"+a.port:"",h=a.path!==""?a.path:e!==""&&e!=="mailto:"||f!==""||g!==""?"/":"";c=z(f,a.originalRawQuery,a.queryParams,b,c,(b=d)!=null?b:a.serializer);d=c.length>0?"?":"";b=a.fragment!==""?"#"+a.fragment:"";a=a.fragment===""&&a.fragmentSeparator?"#":"";return""+e+f+g+h+d+c+a+b}function z(a,b,c,d,e,f){e===void 0&&(e=!1);if(!d&&(e||u(a))){return(d=b)!=null?d:""}return s(c,f)}function A(a){var b=a.trim();b=(h||(h=d("URIRFC3986"))).parse(b)||{fragment:null,host:null,isGenericURI:!1,query:null,scheme:null,userinfo:null};var c=b.host||"",e=c.split(".");e=e.length>=3?e[0]:"";var f=t(c,b.scheme||"",b.query),g=f.deserialize(b.query||"")||{};g=new Map(Object.entries(g));g=B({domain:c,fragment:b.fragment||"",fragmentSeparator:b.fragment==="",isGeneric:b.isGenericURI,originalRawQuery:b.query,path:b.path||"",port:b.port!=null?String(b.port):"",protocol:(b.scheme||"").toLowerCase(),queryParams:g,serializer:f,subdomain:e,userInfo:(c=b==null?void 0:b.userinfo)!=null?c:""},a);return g}function B(a,b,c,e){c===void 0&&(c=(j||(j=d("URISchemes"))).Options.INCLUDE_DEFAULTS);var f={components:babelHelpers["extends"]({},a),error:"",valid:!0},g=f.components;if(!(j||(j=d("URISchemes"))).isAllowed(a.protocol,c,e)){f.valid=!1;f.error='The URI protocol "'+String(a.protocol)+'" is not allowed.';return f}if(!w(a.domain||"")){f.valid=!1;f.error="This is an unsafe domain "+String(a.domain);return f}g.port=a.port!=null&&String(a.port)||"";if(Boolean(a.userInfo)){f.valid=!1;f.error="Invalid URI: (userinfo is not allowed in a URI "+String(a.userInfo)+")";return f}c=b!=null&&b!==""?b:y(g,!1);if(g.domain===""&&g.path.indexOf("\\")!==-1){f.valid=!1;f.error="Invalid URI: (no domain but multiple back-slashes "+c+")";return f}if(!g.protocol&&n.test(c)){f.valid=!1;f.error="Invalid URI: (unsafe protocol-relative URI "+c+")";return f}if(g.domain!==""&&g.path!==""&&!g.path.startsWith("/")){f.valid=!1;f.error="Invalid URI: (domain and pathwhere path lacks leading slash "+c+")";return f}return f}var C=function(){function a(a){this.queryParams=new Map(),this.domain=a.domain,this.fragment=a.fragment,this.fragmentSeparator=Boolean(a.fragmentSeparator),this.isGenericProtocol=Boolean(a.isGeneric),this.path=a.path,this.originalRawQuery=a.originalRawQuery,this.port=a.port,this.protocol=a.protocol,this.queryParams=a.queryParams,this.serializer=a.serializer,this.subdomain=a.subdomain}var b=a.prototype;b.addQueryParam=function(a,b){if(Boolean(a)){var c=this.getQueryParams();c.set(a,b);return x(this,{queryParams:c})}return this};b.addQueryParams=function(a){if(a.size>0){var b=this.getQueryParams();a.forEach(function(a,c){b.set(c,a)});return x(this,{queryParams:b})}return this};b.addQueryParamString=function(a){if(Boolean(a)){a=a.startsWith("?")?a.slice(1):a;var b=this.getQueryParams();a.split("&").map(function(a){a=a.split("=");var c=a[0];a=a[1];b.set(c,a)});return x(this,{queryParams:b})}return this};b.addTrailingSlash=function(){var a=this.getPath();return a.length>0&&a[a.length-1]!=="/"?this.setPath(a+"/"):this};b.getDomain=function(){return this.domain};b.getFragment=function(){return this.fragment};b.getOrigin=function(){var a=this.getPort();return this.getProtocol()+"://"+this.getDomain()+(a?":"+a:"")};b.getOriginalRawQuery=function(){return this.originalRawQuery};b.getPath=function(){return this.path};b.getPort=function(){return this.port};b.getProtocol=function(){return this.protocol.toLowerCase()};b.getQualifiedUri=function(){if(!this.getDomain()){var b;b=(b=typeof window!=="undefined"?window:self)==null?void 0:(b=b.location)==null?void 0:b.href;if(b==null){c("FBLogger")("ConstUriUtils").blameToPreviousFile().warn("Cannot get qualified URI for current URI as there is no current location");return null}(i||(i=c("ExecutionEnvironment"))).isInWorker&&b.startsWith("blob:")&&(b=b.substring(5,b.length));b=b.slice(0,b.indexOf("/",b.indexOf(":")+3));return a.getUri(b+this.toString())}return this};b.getQueryParam=function(a){a=this.queryParams.get(a);if(typeof a==="string")return a;else{a=JSON.stringify(a);return a==null?a:JSON.parse(a)}};b.getQueryData=function(){return Object.fromEntries(this.getQueryParams())};b.getQueryParams=function(){if(c("structuredClone")!=null)return c("structuredClone")(this.queryParams);var a=JSON.stringify(Array.from(this.queryParams),function(a,b){return Array.isArray(b)?{__CUUArr:!0,value:babelHelpers["extends"]({},b)}:b});a=JSON.parse(a,function(a,b){return b!=null&&typeof b==="object"&&b.__CUUArr?Object.keys(b.value).reduce(function(a,c){a[c]=b.value[c];return a},[]):b});return new Map(a)};b.getQueryString=function(a){a===void 0&&(a=!1);return z(this.domain,this.originalRawQuery,this.queryParams,!1,a,this.serializer)};b.getRegisteredDomain=function(){if(!this.getDomain())return"";if(!this.isFacebookUri())return null;var a=this.getDomain().split("."),b=a.indexOf("facebook");b===-1&&(b=a.indexOf("workplace"));return a.slice(b).join(".")};b.getSerializer=function(){return this.serializer};b.getSubdomain=function(){return this.subdomain};b.getUnqualifiedUri=function(){if(this.getDomain()){var b=this.toString();return a.getUri(b.slice(b.indexOf("/",b.indexOf(":")+3)))}return this};a.getUri=function(b){b=b.trim();var d=l.get(b);if(d==null){var e=A(b);if(e.valid)d=new a(e.components),l.set(b,d);else{c("FBLogger")("ConstUriUtils").blameToPreviousFrame().warn(e.error);return null}}return d};a.getUribyObject=function(b,d){var e=y(b,d),f=l.get(e);if(f==null){d&&(b.originalRawQuery=s(b.queryParams,b.serializer));d=B(b);if(d.valid)f=new a(d.components),l.set(e,f);else{c("recoverableViolation")(d.error,"ConstUri");return null}}return f};b.hasFragmentSeparator=function(){return this.fragmentSeparator};b.isEmpty=function(){return!(this.getPath()||this.getProtocol()||this.getDomain()||this.getPort()||this.queryParams.size>0||this.getFragment())};b.isFacebookUri=function(){var a=this.toString();if(a==="")return!1;return!this.getDomain()&&!this.getProtocol()?!0:["https","http"].indexOf(this.getProtocol())!==-1&&m.test(this.getDomain())};b.isGeneric=function(){return this.isGenericProtocol};b.isSameOrigin=function(a){return c("isSameOrigin")(this,a)};b.isSubdomainOfDomain=function(b){var c=a.getUri(b);return c!=null&&v(this.domain,b)};b.isSecure=function(){return this.getProtocol()==="https"};b.removeQueryParams=function(a){if(Array.isArray(a)&&a.length>0){var b=this.getQueryParams();a.map(function(a){return b["delete"](a)});return x(this,{queryParams:b})}return this};b.removeQueryParam=function(a){if(Boolean(a)){var b=this.getQueryParams();b["delete"](a);return x(this,{queryParams:b})}return this};b.replaceQueryParam=function(a,b){if(Boolean(a)){var c=this.getQueryParams();c.set(a,b);return x(this,{queryParams:c})}return this};b.replaceQueryParams=function(a){return x(this,{queryParams:a})};b.replaceQueryParamString=function(a){if(a!=null){a=a.startsWith("?")?a.slice(1):a;var b=this.getQueryParams();a.split("&").map(function(a){a=a.split("=");var c=a[0];a=a[1];b.set(c,a)});return x(this,{queryParams:b})}return this};b.setDomain=function(a){if(Boolean(a)){var b=a.split(".");b=b.length>=3?b[0]:"";return x(this,{domain:a,subdomain:b})}return this};b.setFragment=function(a){return a==="#"?x(this,{fragment:"",fragmentSeparator:!0}):x(this,{fragment:a,fragmentSeparator:a!==""})};b.setPath=function(a){return a!=null?x(this,{path:a}):this};b.setPort=function(a){return Boolean(a)?x(this,{port:a}):this};b.setProtocol=function(a){return Boolean(a)?x(this,{protocol:a}):this};b.setSecure=function(a){return this.setProtocol(a?"https":"http")};b.setSubDomain=function(a){if(Boolean(a)){var b=this.getQualifiedUri();if(b==null)return null;var c=b.getDomain();c=c.split(".");c.length>=3?c[0]=a:c.unshift(a);return x(b,{domain:c.join("."),subdomain:a})}return this};b.stripTrailingSlash=function(){return this.setPath(this.getPath().replace(/\/$/,""))};a.$1=function(a){a=a;for(var b=0;b<q.length;b++){var c=q[b];a=c(a)}return a};a.$2=function(a,b){b=b;for(var c=0;c<r.length;c++){var d=r[c];b=d(a,b)}return b};b.$3=function(b,c){c===void 0&&(c=!1);return y({domain:a.$1(this.domain),fragment:this.fragment,fragmentSeparator:this.fragmentSeparator,isGeneric:this.isGenericProtocol,originalRawQuery:this.originalRawQuery,path:this.path,port:this.port,protocol:this.protocol,queryParams:a.$2(this.domain,this.queryParams),serializer:b,subdomain:this.subdomain,userInfo:""},!1,c)};b.toStringRawQuery=function(){this.rawStringValue==null&&(this.rawStringValue=this.$3(c("PHPQuerySerializerNoEncoding")));return this.rawStringValue};b.toString=function(){this.stringValue==null&&(this.stringValue=this.$3(this.serializer));return this.stringValue};b.toStringPreserveQuery=function(){return this.$3(this.serializer,!0)};a.isValidUri=function(b){var c=l.get(b);if(c!=null)return!0;c=A(b);if(c.valid){l.set(b,new a(c.components));return!0}return!1};return a}();function a(a){if(a instanceof C)return a;else return null}function b(a){q.push(a)}function e(a){r.push(a)}f=C.getUri;var D=C.isValidUri;g.isSubdomainOfDomain=v;g.isConstUri=a;g.registerDomainFilter=b;g.registerQueryParamsFilter=e;g.getUri=f;g.isValidUri=D}),98);
__d("routeBuilderUtils",[],(function(a,b,c,d,e,f){"use strict";function a(a){a=a.split("/");return a.filter(function(a){return a!==""}).map(function(a){var b=a.split(/{|}/);if(b.length<3)return{isToken:!1,part:a};else{a=b[0];var c=b[1];b=b[2];var d=c[0]==="?",e=c[d?1:0]==="*";c=c.substring((d?1:0)+(e?1:0));return{isToken:!0,optional:d,catchAll:e,prefix:a,suffix:b,token:c}}})}f.getPathParts=a}),66);
__d("jsRouteBuilder",["ConstUriUtils","FBLogger","routeBuilderUtils"],(function(a,b,c,d,e,f,g){"use strict";var h="#";function a(a,b,e,f,g){g===void 0&&(g=!1);var i=d("routeBuilderUtils").getPathParts(a);function j(j){try{var k=f!=null?babelHelpers["extends"]({},f,j):(j=j)!=null?j:{},l={};j="";var m=!1;j=i.reduce(function(a,c){if(!c.isToken)return a+"/"+c.part;else{var d,e=c.optional,f=c.prefix,g=c.suffix;c=c.token;if(e&&m)return a;d=(d=k[c])!=null?d:b[c];if(d==null&&e){m=!0;return a}if(d==null)throw new Error("Missing required template parameter: "+c);if(d==="")throw new Error("Required template parameter is an empty string: "+c);l[c]=!0;return a+"/"+f+d+g}},"");a.slice(-1)==="/"&&(j+="/");j===""&&(j="/");var n=d("ConstUriUtils").getUri(j);for(var o in k){var p=k[o];!l[o]&&p!=null&&n!=null&&(e!=null&&e.has(o)?p!==!1&&(n=n.addQueryParam(o,null)):n=n.addQueryParam(o,p))}return[n,j]}catch(b){p=b==null?void 0:b.message;o=c("FBLogger")("JSRouteBuilder").blameToPreviousFrame().blameToPreviousFrame();g&&(o=o.blameToPreviousFrame());o.mustfix("Failed building URI for base path: %s message: %s",a,p);return[null,h]}}return{buildUri:function(a){a=(a=j(a)[0])!=null?a:d("ConstUriUtils").getUri(h);if(a==null)throw new Error("Not even the fallback URL parsed validly!");return a},buildUriNullable:function(a){return j(a)[0]},buildURL:function(a){a=j(a);var b=a[0];a=a[1];return(b=b==null?void 0:b.toString())!=null?b:a},buildURLStringDEPRECATED:function(a){a=j(a);var b=a[0];a=a[1];return(b=b==null?void 0:b.toString())!=null?b:a}}}g["default"]=a}),98);
__d("XLynxAsyncCallbackControllerRouteBuilder",["jsRouteBuilder"],(function(a,b,c,d,e,f,g){a=c("jsRouteBuilder")("/si/linkclick/ajax_callback/",Object.freeze({}),void 0);b=a;g["default"]=b}),98);
__d("FBLynxLogging",["AsyncRequest","ODS","XLynxAsyncCallbackControllerRouteBuilder"],(function(a,b,c,d,e,f,g){"use strict";var h;function a(a){var b=c("XLynxAsyncCallbackControllerRouteBuilder").buildURL({});new(c("AsyncRequest"))(b).setData({lynx_uri:a}).setErrorHandler(function(a){a=a.getError();(h||(h=d("ODS"))).bumpEntityKey(3861,"linkshim","click_log.post.fail."+a)}).setTransportErrorHandler(function(a){a=a.getError();(h||(h=d("ODS"))).bumpEntityKey(3861,"linkshim","click_log.post.transport_fail."+a)}).send()}g.log=a}),98);
__d("SubscriptionsHandler",["invariant"],(function(a,b,c,d,e,f,g,h){"use strict";function i(a){return a.remove||a.reset||a.unsubscribe||a.cancel||a.dispose}function j(a){i(a).call(a)}a=function(){function a(){this.$1=[]}var b=a.prototype;b.addSubscriptions=function(){for(var a=arguments.length,b=new Array(a),c=0;c<a;c++)b[c]=arguments[c];b.every(i)||h(0,3659);this.$1!=null?this.$1=this.$1.concat(b):b.forEach(j)};b.engage=function(){this.$1==null&&(this.$1=[])};b.release=function(){this.$1!=null&&(this.$1.forEach(j),this.$1=null)};b.releaseOne=function(a){var b=this.$1;if(b==null)return;var c=b.indexOf(a);c!==-1&&(j(a),b.splice(c,1),b.length===0&&(this.$1=null))};return a}();g["default"]=a}),98);
__d("LogHistory",[],(function(a,b,c,d,e,f){var g=500,h={},i=[];function j(a,b,c,d){var e=d[0];if(typeof e!=="string"||d.length!==1)return;i.push({date:Date.now(),level:a,category:b,event:c,args:e});i.length>g&&i.shift()}var k=function(){function a(a){this.category=a}var b=a.prototype;b.debug=function(a){for(var b=arguments.length,c=new Array(b>1?b-1:0),d=1;d<b;d++)c[d-1]=arguments[d];j("debug",this.category,a,c);return this};b.log=function(a){for(var b=arguments.length,c=new Array(b>1?b-1:0),d=1;d<b;d++)c[d-1]=arguments[d];j("log",this.category,a,c);return this};b.warn=function(a){for(var b=arguments.length,c=new Array(b>1?b-1:0),d=1;d<b;d++)c[d-1]=arguments[d];j("warn",this.category,a,c);return this};b.error=function(a){for(var b=arguments.length,c=new Array(b>1?b-1:0),d=1;d<b;d++)c[d-1]=arguments[d];j("error",this.category,a,c);return this};return a}();function a(a){h[a]||(h[a]=new k(a));return h[a]}function b(){return i}function c(){i.length=0}function d(a){return a.map(function(a){var b=new Date(a.date).toISOString();return[b,a.level,a.category,a.event,a.args].join(" | ")}).join("\n")}f.getInstance=a;f.getEntries=b;f.clearEntries=c;f.formatEntries=d}),66);