import {
	Main
} from "../main.js";
import {
    Canvas,
	TextBox,
    UrlList
} from "../htmlInterface/elementInterfaces.js";
import {
	importDataInto
} from "../getRequests/importData.js";

export function init(){
	console.time("Time to load (wayfinding)");
	
	let master = new Main();
	
	let start = new TextBox("start box", "start hint");
	let end = new TextBox("end box", "end hint");
	let info = new UrlList("moreInfo");
	
	//http://svgjs.com/
	let svgDrawer = SVG('wrapper')
        .size("100%", "100%")
        .panZoom({zoomMin: 0.5, zoomMax: 5});
	let masterCanvas = new Canvas();
	masterCanvas.linkToSVG(svgDrawer);
	master.setCanvas(masterCanvas);
	
	master.setInput(start, end);
	master.setInfoElement(info);
	
	master.setPathButton("button");
	
	importDataInto(master).then((responses)=>{
		console.timeEnd("Time to load (wayfinding)");
	});
}

init();

/*
function nextImage() {
	if (master.getPath() !== undefined) {
		document.getElementById("image").src = master.getPath().nextImage();
	}
}*/