!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).bodyScrollLock={})}(this,function(e){"use strict";var t=function(){return"undefined"==typeof window},o=function(e){return document.querySelector(e)},n=function(e){e=e||navigator.userAgent;var t=/(iPad).*OS\s([\d_]+)/.test(e);return{ios:!t&&/(iPhone\sOS)\s([\d_]+)/.test(e)||t,android:/(Android);?[\s\/]+([\d.]+)?/.test(e)}};var i=0,r=0,s=0,c=null,l=!1,d=[],u=function(e){if(t())return!1;if(!e)throw new Error("options must be provided");var o=!1,n={get passive(){o=!0}},i=function(){};window.addEventListener("__TUA_BSL_TEST_PASSIVE__",i,n),window.removeEventListener("__TUA_BSL_TEST_PASSIVE__",i,n);var r=e.capture;return o?e:void 0!==r&&r}({passive:!1}),f=function(e){e.cancelable&&e.preventDefault()};e.lock=function(e){var a,h,v,p,y;t()||(n().ios?(e&&-1===d.indexOf(e)&&(e.ontouchstart=function(e){r=e.targetTouches[0].clientY,s=e.targetTouches[0].clientX},e.ontouchmove=function(t){1===t.targetTouches.length&&function(e,t){if(t){var o=t.scrollTop,n=t.scrollLeft,i=t.scrollWidth,c=t.scrollHeight,l=t.clientWidth,d=t.clientHeight,u=e.targetTouches[0].clientX-s,a=e.targetTouches[0].clientY-r,h=Math.abs(a)>Math.abs(u);if(h&&(a>0&&0===o||a<0&&o+d+1>=c)||!h&&(u>0&&0===n||u<0&&n+l+1>=i))return f(e)}e.stopPropagation()}(t,e)},d.push(e)),l||(document.addEventListener("touchmove",f,u),l=!0)):i<=0&&(c=n().android?(a=o("html"),h=o("body"),v=a.scrollTop||h.scrollTop,p=Object.assign({},a.style),y=Object.assign({},h.style),a.style.height="100%",a.style.overflow="hidden",h.style.top="-".concat(v,"px"),h.style.width="100%",h.style.height="auto",h.style.position="fixed",h.style.overflow="hidden",function(){a.style.height=p.height||"",a.style.overflow=p.overflow||"",["top","width","height","overflow","position"].forEach(function(e){h.style[e]=y[e]||""}),window.scrollTo(0,v)}):function(){var e=o("body"),t=Object.assign({},e.style),n=window.innerWidth-document.body.clientWidth;return e.style.overflow="hidden",e.style.boxSizing="border-box",e.style.paddingRight="".concat(n,"px"),function(){["overflow","boxSizing","paddingRight"].forEach(function(o){e.style[o]=t[o]||""})}}()),i+=1)},e.unlock=function(e){if(!(t()||(i-=1)>0))if(n().ios||"function"!=typeof c){if(e){var o=d.indexOf(e);-1!==o&&(e.ontouchmove=null,e.ontouchstart=null,d.splice(o,1))}l&&(document.removeEventListener("touchmove",f,u),l=!1)}else c()},Object.defineProperty(e,"__esModule",{value:!0})});