"use strict";

var black = true;
var blackback = true;
var bgColor = "black";
var alarmColor = "#58002C";
var counter = 0;
var blinkOn, blinkBackOn;
var count;

function init() {
  lightitup(true);
  getCount();
}

function lightitup(start) {
  if (!start)
    increment();
  if (counter)
    blinkback();
  else
    blink();
  counter++;
}

function blink() {
  if (black) {
    getID("point").style.color = "#58002C";
    black = false;
  }
  else {
    getID("point").style.color = "black";
    black = true;
  }
  blinkOn = setTimeout("blink()",200);
}

function blinkback() {
  if (black) {
    getID("body").style.backgroundColor = "#58002C";
    blackback = false;
  }
  else {
    getID("body").style.backgroundColor = "black";
    blackback = true;
  }
  blinkBackOn = setTimeout("blinkback()",500);
}

function getCount() {
  var req = new XMLHttpRequest();
  var url = "getcount.php";
  req.onreadystatechange=function() {
    if (req.readyState==4 && req.status==200) {
      count = JSON.parse(req.responseText)["counter"];
      console.log("count: " + count); 
      getID("constant").innerHTML = "Days Constant: " + count;
      //lightitup();
    }
  };
  req.open("GET", url, true);
  req.send();
}

function increment() {
  var req = new XMLHttpRequest();
  var url = "increment.php?increment=true";
  req.onreadystatechange=function() {
    if (req.readyState==4 && req.status==200 && req.responseText == "success") {
      getCount();
    }
  };
  req.open("GET", url, true);
  req.send();
}

function getID(id) { return document.getElementById(id); }
