/*
Jeffrey Stewart
jls317
CSE264
04/12/2017
HW5-MagneticPoetry
*/

//onload
	//get words from local storage and display
	
var selected = null,
	x_pos = 0, y_pos = 0,
	x_element = 0, y_element = 0;
var id = 0;

$(function(){
	$("#custom").spectrum({
	});
});

$(window).on("load", function(){
	var getMyWord = JSON.parse(localStorage.getItem("myWords"));
	console.log("loaded");
	var cnt;
	for(cnt = 0; cnt < getMyWord.length; cnt++){
		console.log("generating");
		var n = document.createElement("BUTTON");
		n.setAttribute("class", "words");
		
		n.id = "words"+id;
		console.log("NEW BUTTON ID: "+n.id);
		id++;
		var t = document.createTextNode(getMyWord[cnt].word);
	
		n.appendChild(t);
		document.getElementById('backgrounddiv').appendChild(n);
		n.style.fontSize = getMyWord[cnt].size;
		n.style.color = getMyWord[cnt].color;
		n.style.left = (getMyWord[cnt].leftPos -8)+'px';
		n.style.top = (getMyWord[cnt].topPos - 8)+'px';
	}
	localStorage.removeItem("myWords");
});



function addWord(){
	
if(document.getElementById('inWord').validity.valid){
	var string = document.getElementById("inWord").value;
	var color = $("#custom").spectrum("get");
	color = color.toHexString();
	$("#custom").spectrum("set", color);
	document.getElementById('inWord').value=null;
	var btn = document.createElement("BUTTON");
	btn.setAttribute("class", "words");
	btn.id="words"+id;
	id++;
	var t = document.createTextNode(string);
	
	btn.appendChild(t);
	document.getElementById('backgrounddiv').appendChild(btn);
	btn.style.fontSize = "30px";
	btn.style.color = color;
	}
}
 //var boun=document.getElementById("backgrounddiv").offsetWidth;

     
function drag(element){
	selected = element;
	//if((x_element>0)&&(x_element<boun)&&(y_element>0)&&(y_element<boun)){
		x_element = x_pos - selected.offsetLeft;
		y_element = y_pos - selected.offsetTop;
}//}

function moveEle(element){
	x_pos = document.all ? window.event.clientX : element.pageX;
	y_pos = document.all ? window.event.clientY : element.pageY;
	if(selected !== null) {
		selected.style.left = (x_pos - x_element) + 'px';
		selected.style.top = (y_pos - y_element) + 'px';
	}
}

function destroyEle(){
	if(selected !== null){
	if(isOverlap(selected, trash)){
		var del = document.getElementById(selected.id);
		del.parentNode.removeChild(del);
	}
	}
	selected = null;
}

$('#backgrounddiv').on('mousedown', '[id^=words]', function() {
	drag(this);
	return false;
});

document.onmousemove = moveEle;
document.onmouseup = destroyEle;

//overlap rectangles for trashcan function
//in: 2 rectangle elements
//out: boolean (true=overlap)
//get 2 opposite corners (upperleft, lowerright) of each
function isOverlap(element1, element2){
	var overlap = false;
	var left1 = element1.getBoundingClientRect().left;
	var top1 = element1.getBoundingClientRect().top;
	var right1 = element1.getBoundingClientRect().right;
	var bottom1 = element1.getBoundingClientRect().bottom;
	
	var left2 = element2.getBoundingClientRect().left;
	var top2 = element2.getBoundingClientRect().top;
	var right2 = element2.getBoundingClientRect().right;
	var bottom2 = element2.getBoundingClientRect().bottom;
	
	if(top1 > bottom2 || top2 > bottom1){
		overlap = false;
		return overlap;
	}
	if(left1 > right2 || left2 > right1){
		overlap = false;
		return overlap;
	}	
	overlap = true;
	return overlap;
}

$(document).click(
function (e) {
	var obj = e.target; // Get reference to element that was clicked
	if ($(obj).attr("class") == "words") { // If it was a "word" button
	console.log($(obj).attr("class"));
		if (e.altKey || e.ctrlKey) { // If the user was pressing the alt or ctrl keys while clicking
			var fontSize = $(obj).css("fontSize"); // Grab the font size of the button in pixels (eg. "10px")
			var pixels = fontSize.substring(0, fontSize.length - 2); // Isolate the numeric part
			if (e.altKey)
				fontSize = (pixels * 1.5) + "px"; // Scale up
			else
				fontSize = (pixels / 1.5) + "px"; // Scale down
				$(obj).css("fontSize", fontSize); // Restore the new font size
		}
	}
});

//create word class
var wordItem = function (w, t, l, c, s) {
	this.word = w;
	this.topPos = t;
	this.leftPos = l;
	this.color = c;
	this.size = s;
}

//local storage
	//create words class with following data
		//ID
		//words (string)
		//location (leftoffset and topoffset)
		//color
		//size
	//store words class locally onunload

$(window).on("unload", function(){
	var storeElement = document.getElementsByClassName("words");
	var num;		
	var myWord = [];
	for (num = 0; num < storeElement.length; num++){
		var w, t, l, c;
		w = storeElement[num].textContent;
		t = storeElement[num].getBoundingClientRect().top;
		l = storeElement[num].getBoundingClientRect().left;
		c = storeElement[num].style.color;
		s = storeElement[num].style.fontSize;
		console.log(w);
		console.log(t);
		console.log(l);
		console.log(c);
		console.log(s);
		myWord[num] = new wordItem(w,t,l,c,s);
	}
	//create word objects
	if(typeof(Storage) !== "undefined") {
		localStorage.setItem("myWords", JSON.stringify(myWord));
		console.log("stored");
	}
	else{
		alert("Local Storage Not Supported.");
	}	
});
	
