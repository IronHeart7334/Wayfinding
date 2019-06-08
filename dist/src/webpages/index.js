!function(t){var e={};function s(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=t,s.c=e,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)s.d(n,i,function(e){return t[e]}.bind(null,i));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=0)}([function(t,e,s){"use strict";s.r(e);class n{constructor(){this.draw=void 0,this.image=void 0,this.destWidth=0,this.destHeight=0,this.sourceMinX=0,this.sourceMinY=0,this.sourceMaxX=0,this.sourceMaxY=0,this.color=void 0}link(t){this.draw=t}async setImage(t){return new Promise((e,s)=>{this.image=this.draw.image(t),this.image.loaded(()=>{this.resize(),e()})})}setColor(t){this.color=t}clear(){let t=this.draw.children();for(let e=t.length-1;e>=0;e--)"rect"!==t[e].type&&"line"!==t[e].type&&"text"!==t[e].type||t[e].remove()}rect(t,e,s,n){return this.draw.rect(s,n).attr({fill:this.color}).move(this.x(t),this.y(e))}text(t,e,s){return this.draw.text(t.toString()).move(this.x(e)-10,this.y(s)-20).attr({fill:this.color})}line(t,e,s,n){return this.draw.line(this.x(t),this.y(e),this.x(s),this.y(n)).stroke({color:this.color,width:3})}setCorners(t,e,s,n){this.sourceMinX=t,this.sourceMinY=e,this.sourceMaxX=s,this.sourceMaxY=n,this.calcSize()}resize(){this.destWidth=this.image.node.width.baseVal.value,this.destHeight=this.image.node.height.baseVal.value}calcSize(){this.mapWidth=this.sourceMaxX-this.sourceMinX,this.mapHeight=this.sourceMaxY-this.sourceMinY}x(t){return(t-this.sourceMinX)/this.mapWidth*this.destWidth}y(t){return(t-this.sourceMinY)/this.mapHeight*this.destHeight}}class i{constructor(t,e,s){this.mode=s.mode,this.startId=parseInt(t),this.endId=parseInt(e),this.dataSource=s,this.valid=!0,this.idPath=[],this.nodePath=[],this.pathLength=0,this.loadPath(),this.decodeIds(),this.images=this.getImages(),this.imgInd=-1}decodeIds(){this.nodePath=[];for(let t=0;t<this.idPath.length;t++)this.nodePath[t]=this.dataSource.getNodeDB().getNode(this.idPath[t])}loadPath(){if(this.startId===this.endId)return this.idPath=[this.startId],void(this.pathLength=0);let t=this.dataSource.getNodeDB(),e=t.getAll(),s=[],n={},i={};for(let t=0;t<e.length;t++)s[t]=e[t],n[e[t].id]=1/0,i[e[t].id]=void 0;function o(){let t=0;for(let e=0;e<s.length;e++)n[s[e].id]<n[s[t].id]&&(t=e);return t}for(n[this.startId]=0;s.length>0;){let e=o(),a=s[e];s.splice(e,1);for(let e=0;e<a.adj.length;e++)if(s.includes(a.adj[e])){let s=n[a.id]+a.distanceFrom(a.adj[e]);(n[a.adj[e].id]===1/0||s<a.adj[e].distanceFrom(t.getNode(this.startId)))&&(n[a.adj[e].id]=s,i[a.adj[e].id]=a.id)}}let a=[],r=this.endId;for(;void 0!==i[r];)a.push(r),r=i[r];-1!==t.getNode(this.startId).adjIds.indexOf(a[a.length-1])&&a.push(this.startId),a=a.reverse(),this.idPath=a,this.pathLength=n[this.endId],this.startId===this.idPath[0]&&this.endId===this.idPath[this.idPath.length-1]||this.invalidate(),(this.startId<0||this.endId<0)&&this.invalidate()}invalidate(){if(this.valid){this.valid=!1;try{throw console.log("Invalid path detected: "),console.log(this),new Error}catch(t){console.log(t.stack)}}}getURL(){return window.location.href.split("?")[0]+"?startID="+this.idPath[0]+"&endID="+this.idPath[this.idPath.length-1]+"&mode="+this.mode}draw(t){t.clear(),t.setColor("red");let e=this.nodePath;e[0].draw(t);for(let s=1;s<e.length;s++)t.line(e[s-1].x,e[s-1].y,e[s].x,e[s].y),e[s].draw(t)}getImages(){let t=[],e=0;for(;e+1<this.idPath.length;){e++;let s=this.nodePath[e-1],n=this.nodePath[e];if(s.getHasImage(n.id)){let e=s.getImageTo(n.id);-1===t.indexOf(e)&&t.push(e)}}return t}nextImage(){return this.imgInd+1<this.images.length?this.imgInd++:this.imgInd=0,0!==this.images.length?this.images[this.imgInd]:" "}}function o(){const t=window.location.href;let e=new Map;if(e.set("startID",14),e.set("endID",96),e.set("mode","WAYFINDING"),e.set("dev",!1),t.indexOf("?")>-1){let s=t.split("?")[1].split("&");for(let t=0;t<s.length;t++){let n=s[t].split("=");n[0].toUpperCase().includes("START")?e.set("startID",n[1]):n[0].toUpperCase().includes("END")?e.set("endID",n[1]):n[0].toUpperCase().includes("MODE")?e.set("mode",n[1].toUpperCase()):n[0].toUpperCase().includes("DEV")&&e.set("dev",!0)}}return e}class a{constructor(t,e,s){try{if(this.id=parseInt(t),isNaN(this.id))throw new TypeError("Node id must be an integer")}catch(t){console.log(t.stack)}try{if(this.x=parseFloat(e),this.y=parseFloat(s),isNaN(this.x)||isNaN(this.y))throw new TypeError("X and Y must be numbers")}catch(t){console.log(t)}this.adjIds=[],this.connectionImages={}}loadAdj(t){let e;this.adj=[];for(let s=0;s<this.adjIds.length;s++)(e=t.getNode(this.adjIds[s]))&&this.adj.push(e)}distanceFrom(t){return Math.sqrt(Math.pow(this.x-t.x,2)+Math.pow(this.y-t.y,2))}addAdjId(t){this.adjIds.push(t)}setConnectionImage(t,e){this.connectionImages[t]=e}getHasImage(t){return this.connectionImages.hasOwnProperty(t)}getImageTo(t){return this.connectionImages[t]}draw(t){t.setColor("red"),t.rect(this.x,this.y,5,5)}drawId(t){t.setColor("red"),t.text(this.id,this.x,this.y)}drawLinks(t){t.setColor("red"),this.drawId(t);for(let e=0;e<this.adj.length;e++)this.adj[e].draw(t),t.line(this.x,this.y,this.adj[e].x,this.adj[e].y)}generateDiv(t){let e=this,s=t.getCanvas();e.drawId(s),s.rect(this.x,this.y,10,10).mouseover(function(){e.draw(s),e.drawLinks(s)}).mouseout(function(){s.clear();let e=t.getPath();void 0!==e&&e.draw(s),t.getNodeDB().generateDivs(t)}).click(function(){console.log(e)})}}function r(t){let e=[];try{(Array.isArray(t)?t:t.split(/\r?\n|\r/)).forEach(t=>{e.push(Array.isArray(t)?t:t.split(","))})}catch(e){console.log(e.stack),console.log("response text is: "),console.log(t)}return e}class l{constructor(){this.nodes=new Map,this.stuffToNodeId=new Map}parseNodeData(t){let e,s,n,i,o=r(t),l=[];for(let t=1;t<o.length;t++)e=o[t],s=parseInt(e[0]),n=parseFloat(e[1]),i=parseFloat(e[2]),isNaN(s)||isNaN(n)||isNaN(i)?l.push("An error occured for the line "+e.join()):this.nodes.set(s,new a(s,n,i));l.length>0&&(console.log("Something went wrong with parsing the node data:"),l.forEach(t=>console.log("--"+t)))}parseNameToId(t){let e,s,n=this;r(t).forEach(t=>{try{e=t[0].toString().toUpperCase(),s=parseInt(t[1]),isNaN(s)?console.log("Oops! Node ID of "+t[1]):n.stuffToNodeId.set(e,s)}catch(e){console.log("Invalid row: "+t),console.log(e.message)}})}parseConnData(t){let e,s=r(t);for(let t=1;t<s.length;t++){e=s[t];try{this.getNode(parseInt(e[0])).addAdjId(parseInt(e[1]))}catch(t){console.log("Node not found: "+parseInt(e[1])),console.log(t.stack)}}let n=this;this.getAll().forEach(t=>t.loadAdj(n))}parseImageResponse(t){let e=t.getNonHeaders(),s=t.indexOfCol(["From","node1","n1"]),n=t.indexOfCol(["to","node2","n2"]),i=t.indexOfCol(["image","img","photo","url"]);for(let t=1;t<e.length;t++)if(""!==e[t][s]&&""!==e[t][n]&&""!==e[t][i])try{this.getNode(parseInt(e[t][s])).setConnectionImage(e[t][n],e[t][i])}catch(t){console.log("An error occured while parsing image data:"),console.log(t.stack)}}parseClassResponse(t){let e,s,n=[],i=t.getNonHeaders(),o=t.indexOfCol(["CLASS NUMBER","CLASS"]),a=t.indexOfCol(["BUILDING"]),r=t.indexOfCol(["ROOM"]);for(let t=1;t<i.length;t++)e=i[t],null==(s=this.getIdByString((e[a]+" "+e[r]).toUpperCase()))?n.includes(e[a]+" "+e[r])||n.push(e[a]+" "+e[r]):isNaN(parseInt(s))||this.stuffToNodeId.set(e[o].toString().toUpperCase(),parseInt(s));0!==n.length&&(console.log("Could not find a node connected to rooms..."),n.forEach(t=>console.log("-"+t)),console.log("Check the current room to node file in the google drive to see if these rooms are missing nodes."))}getNode(t){let e=null;try{if(!((e=this.nodes.get(parseInt(t)))instanceof a))throw Error("Node with id of "+t+" does not exist")}catch(t){console.log(t.stack)}return e}getIdByString(t){let e=this.stuffToNodeId.get(t.toString().toUpperCase());return void 0===e&&console.log("Couldn't find node identified by "+t),e}getStringsById(t){let e=[];return this.stuffToNodeId.forEach((s,n)=>{s===t&&e.push(n)}),e}getAllNames(){return Array.from(this.stuffToNodeId.keys())}getAll(){return Array.from(this.nodes.values())}prettyPrintStuffToId(){let t=0;this.getAllNames().forEach(e=>{e.length>t&&(t=e.length)});let e,s=0,n=" ";this.stuffToNodeId.forEach((i,o)=>{for(s=t-o.length,n=" ",e=0;e<s;e++)n+=" ";console.log(o+n+i)})}generateDivs(t){this.getAll().forEach(e=>e.generateDiv(t))}drawAll(t){this.getAll().forEach(e=>{e.draw(t),e.drawLinks(t)})}}class d{constructor(){this.canvas=void 0,this.start=void 0,this.end=void 0,this.pathButton=void 0,this.infoElement=void 0,this.currentPath=void 0,this.nodeDatabase=new l,this.mode="WAYFINDING"}setCanvas(t){this.canvas=t}getCanvas(){return this.canvas}setInput(t,e){this.start=t,this.end=e}setInfoElement(t){this.infoElement=t}setPathButton(t){this.pathButton=document.getElementById(t),null===this.pathButton&&(this.pathButton=document.createElement("button"),this.pathButton.setAttribute("id",t),this.pathButton.innerHTML="Draw Path",document.body.appendChild(this.pathButton));let e=this;this.pathButton.onclick=function(){e.start.isValid()&&e.end.isValid()?e.updatePath():console.log("Not valid: "+e.start.getResult()+" "+e.end.getResult())}}setPath(t){if(t.valid){this.currentPath=t,this.infoElement.update(this);try{t.draw(this.canvas)}catch(t){console.log("Main's canvas is not defined yet"),console.log(t.stack)}}else console.log("Not valid: "+t)}getPath(){return this.currentPath}updatePath(){try{let t=this.getNodeDB().getIdByString(this.start.getResult()),e=this.getNodeDB().getIdByString(this.end.getResult());if(null==t||null==e)throw new Error("Invalid start and end points: "+this.start.getResult()+" "+this.end.getResult());{let s=new i(t,e,this);if(!s.valid)throw new Error("Invalid path: "+s.idPath);this.setPath(s)}}catch(t){console.log(t.stack)}}addDevTools(){function t(t,e){let s=document.getElementById(t);null===s&&((s=document.createElement("div")).setAttribute("id",t),document.body.appendChild(s)),s.onclick=e,s.innerHTML=t}let e=this;t("Test all paths",()=>e.testAllPaths()),t("get current path URL",()=>document.getElementById("get current path URL").innerHTML=e.getPath().getURL()),t("Save as SVG",()=>e.saveAsSvg())}saveAsSvg(){let t={name:this.currentPath.getURL()+".svg",mimeType:"image/svg+xml",parents:["176GK1W_9BOqWf0rHpM3cMNhQjSHIjfF2"]},e=new FormData;e.append("metadata",new Blob([JSON.stringify(t)],{type:"application/json"})),gapi.auth2.getAuthInstance().signIn().then(t=>{let s=new Headers({Authorization:"Bearer "+gapi.auth.getToken().access_token});fetch("https://www.googleapis.com/upload/drive/v3/files",{method:"POST",headers:s,body:e}).then(t=>{console.log(t),t.json().then(t=>{let e=t.id;console.log(e),fetch("https://www.googleapis.com/upload/drive/v3/files/"+e+"?uploadType=media",{method:"PATCH",headers:s,"Content-Type":"image/svg+xml",body:this.canvas.draw.svg()})})}).catch(t=>{console.log(t)})})}notifyImportDone(){let t=this.nodeDatabase.getNode(-1),e=this.nodeDatabase.getNode(-2),s=o();this.canvas.setCorners(t.x,t.y,e.x,e.y),this.start.addOptions(this.getNodeDB().getAllNames()),this.end.addOptions(this.getNodeDB().getAllNames()),this.setPath(new i(s.get("startID"),s.get("endID"),this)),s.get("dev")&&(this.addDevTools(),console.log("adding dev"))}testAllPaths(){let t=this,e=t.getNodeDB(),s=[];function n(s,n){try{let o=e.getIdByString(s),a=e.getIdByString(n);if(null!=o&&null!=a){let e=new i(o,a,t);if(!e.valid)throw new Error("Invalid Path: "+e.idPath)}}catch(t){console.log(t.stack)}}s=s.concat(e.getAllNames()),alert("Please wait while I process "+s.length*s.length+" paths...");for(let t=0;t<s.length;t++)for(let e=0;e<s.length;e++)n(s[t],s[e]);alert("Done.")}setNodeDB(t){this.nodeDatabase=t}getNodeDB(){return this.nodeDatabase}}class h{constructor(t,e){this.box=document.getElementById(t),this.resultElement=document.getElementById(e),null===this.box&&(this.box=document.createElement("input"),this.box.setAttribute("type","text"),this.box.setAttribute("id",t),document.body.appendChild(this.box)),null===this.resultElement&&(this.resultElement=document.createElement("div"),this.resultElement.setAttribute("id",e),document.body.appendChild(this.resultElement)),this.options=["your result will appear here!"],this.resultElement.innerHTML="your result will appear here!",this.box.oninput=this.updateResult.bind(this)}addOptions(t){let e=this;Array.isArray(t)||(t=[t]),t.forEach(t=>{t&&e.options.push(t.toString().toUpperCase())})}updateResult(){this.resultElement.innerHTML=function(t,e){let s,n=t.trim().toUpperCase(),i=[],o=0,a=t.length,r=e[0];for(let t=0;t<e.length;t++)i.push(e[t].trim().toUpperCase()),(s=c(n,i[t])).matches>o?(o=s.matches,a=s.spaces,r=e[t]):s.matches===o&&s.spaces<a&&(o=s.matches,a=s.spaces,r=e[t]);return r}(this.box.value,this.options)}isValid(){return this.options.indexOf(this.resultElement.innerText.toUpperCase())>0}setInput(t){this.box.value=t,this.box.oninput()}getResult(){return this.resultElement.innerText}}function c(t,e){t=t.toUpperCase(),e=e.toUpperCase();let s,n,i,o=0,a=0;for(let r=0;r<t.length-o;r++){n=0,i=0,s=0;for(let o=0;o<e.length&&r+n<t.length;o++)t[r+n]===e[o]&&(i+=++n>1?o-s-1:o,s=o);n>o&&(o=n,a=i)}return{matches:o,spaces:a}}class g{constructor(t){this.element=document.getElementById(t),null===this.element&&(this.element=document.createElement("ul"),this.element.setAttribute("id","moreInfo"),document.body.appendChild(this.element)),this.element.setAttribute("type","button"),this.element.setAttribute("target","_blank"),this.element.innerHTML=" ",this.element.setAttribute("href","javascript:void(0)")}update(t){let e=t.getNodeDB(),s=t.getPath();for(;this.element.hasChildNodes();)this.element.removeChild(this.element.childNodes[0]);e.getStringsById(s.endId).forEach(t=>{if((t=t.toLowerCase()).includes("http")){let e=document.createElement("li"),s=document.createElement("a");s.innerHTML=t,s.setAttribute("href",t),s.setAttribute("target","_blank"),e.appendChild(s),this.element.appendChild(e)}})}}const u=/\r?\n|\r/,p="https://drive.google.com/export=download?id=1Q99ku0cMctu3kTN9OerjFsM9Aj-nW6H5",m={contents:[],add(t){this.contents.push(t)},displayAll(){for(let t=0;t<this.contents.length;t++)console.log(this.contents[t])}};async function f(t){return new Promise((e,s)=>{gapi.client.drive.files.get({fileId:t}).then(s=>{s.result.mimeType.includes("image")?e("https://drive.google.com/uc?export=download&id="+s.result.id):gapi.client.drive.files.get({fileId:t,alt:"media"}).then(s=>{m.add("Response from "+t+":"),m.add(s),m.add(s.body),e(s.body)}).catch(t=>{throw new Error(t)})}).catch(t=>{throw new Error(t)})})}async function I(t){return new Promise((e,s)=>{f(t).then(t=>{let s=r(t),n=new Map;for(let t=1;t<s.length;t++)s[t].length>=2&&""!==s[t][1]&&(s[t][1].indexOf("id=")>-1?n.set(s[t][1].split("id=")[1],s[t][0]):n.set(s[t][1],s[t][0]));(async function(t){return new Promise((e,s)=>{let n=new Map,i=0;for(let s=0;s<t.length;s++)n.set(t[s],"No response from file ID "+t[s]),f(t[s]).then(o=>{n.set(t[s],o),++i===t.length&&e(n)})})})(Array.from(n.keys())).then(t=>{let s=new Map;t.forEach((t,e)=>{s.set(n.get(e),t)}),e(s)})})})}async function y(){let t=-1===p.indexOf("id=")?p:p.split("id=")[1];return new Promise((e,s)=>{f(t).then(t=>{let s=t.split(u);(s=s.map(t=>t.split(",")))[0]=s[0].map(t=>t.toUpperCase());let n,i,a=s[0].indexOf(o().get("mode"));-1===a&&(a=0),function t(o,a){0===o&&0===a?console.log("No valid manifests exist. Something went very wrong."):0===o?(console.log("No valid manifests were found for "+s[o][a]+". Switching to default wayfinding."),t(s.length-1,0)):""===s[o][a]?t(o-1,a):(n=s[o][a],i=-1===n.indexOf("id=")?n:n.split("id=")[1],console.log("Checking "+i),async function(t){return gapi.client.drive.files.get({fileId:t}).then(()=>!0).catch(()=>!1)}(i).then(s=>{s?(console.log("Yup, that works!"),e(i)):(console.log("Nope."),t(o-1,a))}))}(s.length-1,a)}).catch(t=>{console.log(t)})})}function w(){console.time("Time to load (wayfinding)");let t=new d,e=new h("start box","start hint"),s=new h("end box","end hint"),i=new g("moreInfo"),a=SVG("wrapper").size(1e3,1e3).panZoom(),r=new n;r.link(a),t.setCanvas(r),t.setInput(e,s),t.setInfoElement(i),t.setPathButton("button"),async function(t){return t.mode=o().get("mode"),new Promise((e,s)=>{y().then(s=>{console.log("id is "+s),I(s).then(s=>{let n=t.getNodeDB();t.getCanvas(),n.parseNodeData(s.get("Node coordinates")),n.parseConnData(s.get("Node connections")),n.parseNameToId(s.get("labels")),t.getCanvas().setImage(s.get("map image")).then(()=>{t.notifyImportDone(),e(s)})})})})}(t).then(t=>{console.timeEnd("Time to load (wayfinding)")})}s.d(e,"init",function(){return w}),document.getElementById("wrapper").onload=function(){w()},console.log("done with index.js")}]);