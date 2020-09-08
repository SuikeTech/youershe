function scaleToWindow(canvas, backgroundColor, app) {
	var btnContainer = document.getElementById("btnContainer");

	var scaleX, scaleY, scale, center;
	var ratio = window.innerWidth / window.innerHeight;


	if (ratio <= 1) {

		app.view.setAttribute("width", 720);
		app.view.setAttribute("height", 1280);
		app.stage.rotation = Math.PI / 2;
		app.stage.x = 720;

		btnContainer.style.transform = "rotate(90deg)";
		btnContainer.style.left = "-2.8rem";
		btnContainer.style.top = "2.8rem";
	} else {
		app.view.setAttribute("width", 1280);
		app.view.setAttribute("height", 720);
		app.stage.rotation = 0;
		app.stage.x = 0;
		btnContainer.style.transform = "rotate(0deg)";
		btnContainer.style.left = "0rem";
		btnContainer.style.top = "0rem";

	}
	if (ratio < 720 / 1280) {
		var rScale = window.innerWidth / 720;
	} else if (ratio < 1 && ratio > 720 / 1280) {
		var rScale = window.innerHeight / 1280;
	} else if (ratio >= 1 && ratio < 1280 / 720) {
		var rScale = window.innerWidth / 1280;
	} else if (ratio >= 1280 / 720) {
		var rScale = window.innerHeight / 720;
	}
	document.documentElement.style.fontSize = 100 * rScale + "px";

	//1. Scale the canvas to the correct size
	//Figure out the scale amount on each axis
	scaleX = window.innerWidth / canvas.offsetWidth;
	scaleY = window.innerHeight / canvas.offsetHeight;

	//Scale the canvas based on whichever value is less: `scaleX` or `scaleY`
	scale = Math.min(scaleX, scaleY);
	canvas.style.transformOrigin = "0 0";
	canvas.style.transform = "scale(" + scale + ")";


	//2. Center the canvas.
	//Decide whether to center the canvas vertically or horizontally.
	//Wide canvases should be centered vertically, and 
	//square or tall canvases should be centered horizontally
	if (canvas.offsetWidth > canvas.offsetHeight) {
		if (canvas.offsetWidth * scale < window.innerWidth) {
			center = "horizontally";
		} else {
			center = "vertically";
		}
	} else {
		if (canvas.offsetHeight * scale < window.innerHeight) {
			center = "vertically";
		} else {
			center = "horizontally";
		}
	}
	//Center horizontally (for square or tall canvases)
	var margin;
	if (center === "horizontally") {
		margin = (window.innerWidth - canvas.offsetWidth * scale) / 2;
		canvas.style.marginTop = 0 + "px";
		canvas.style.marginBottom = 0 + "px";
		canvas.style.marginLeft = margin + "px";
		canvas.style.marginRight = margin + "px";

		btnContainer.style.marginTop = 0 + "px";
		btnContainer.style.marginBottom = 0 + "px";
		btnContainer.style.marginLeft = margin + "px";
		btnContainer.style.marginRight = margin + "px";

	}

	//Center vertically (for wide canvases) 
	if (center === "vertically") {
		margin = (window.innerHeight - canvas.offsetHeight * scale) / 2;
		canvas.style.marginTop = margin + "px";
		canvas.style.marginBottom = margin + "px";
		canvas.style.marginLeft = 0 + "px";
		canvas.style.marginRight = 0 + "px";

		btnContainer.style.marginTop = margin + "px";
		btnContainer.style.marginBottom = margin + "px";
		btnContainer.style.marginLeft = 0 + "px";
		btnContainer.style.marginRight = 0 + "px";
	}
	//3. Remove any padding from the canvas  and body and set the canvas
	//display style to "block"
	canvas.style.paddingLeft = 0 + "px";
	canvas.style.paddingRight = 0 + "px";
	canvas.style.paddingTop = 0 + "px";
	canvas.style.paddingBottom = 0 + "px";
	canvas.style.display = "block";
	btnContainer.style.paddingLeft = 0 + "px";
	btnContainer.style.paddingRight = 0 + "px";
	btnContainer.style.paddingTop = 0 + "px";
	btnContainer.style.paddingBottom = 0 + "px";
	btnContainer.style.display = "block";
	//4. Set the color of the HTML body background
	document.body.style.backgroundColor = backgroundColor;

	//Fix some quirkiness in scaling for Safari
	var ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf("safari") != -1) {
		if (ua.indexOf("chrome") > -1) {
			// Chrome
		} else {
			// Safari
			canvas.style.maxHeight = "100%";
			canvas.style.minHeight = "100%";
		}
	}

	//5. Return the `scale` value. This is important, because you'll nee this value 
	//for correct hit testing between the pointer and sprites
	return scale;
}
