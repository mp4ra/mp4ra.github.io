var helper =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
const loadScript = url => {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}

const loadCSS = url => {
    var head = document.getElementsByTagName('head')[0];
	var newSS=document.createElement('link');
	newSS.rel='stylesheet';
	newSS.href=url;
	head.appendChild(newSS);
}
/* harmony export (immutable) */ __webpack_exports__["loadCSS"] = loadCSS;


const loadLibs = () => {
	loadScript("lib/papaparse.min.js");
}

loadLibs();

const loadCSV = (url, callback) => {
	var xhr = new XMLHttpRequest;
	xhr.open('GET', url);
	xhr.onload = function() {
		if (this.status == 200 || this.status == 0) {
			var o = Papa.parse(this.responseText, { header: true });
			callback(o.data);
			reloadHash();
		}
	}
	xhr.send();
}
/* harmony export (immutable) */ __webpack_exports__["loadCSV"] = loadCSV;


const reloadHash = () => {
	var loc = location.hash;
	location.hash = "";
	location.hash = loc;
}

const buildTable = (array, specs, div, handlers, linkField) => {	
	var i;
	var s = "<table class='codes' border=4 cellpadding=0 cellspacing=2>";
	s += "<thead>";
	s += "<tr>";
	for (var prop in array[0]) {
		s += "<th>";
		s += prop;
		s += "</th>";
	}
	s += "</tr>";
	s += "</thead>";
	s += "<tbody>";	
	for (i = 0; i < array.length; i++) {
		s += "<tr>";
		for (var prop in array[i]) {
			if (prop === 'code') {
				s += "<td class='code'>";
			} else {
				s += "<td>";
			}
			if (prop === "specification") {
				var spec = specs.find(function (e) {
					return e.specification === array[i][prop];
				})
				if (spec) {
					s += "<a href='specs.html#"+spec.linkname+"'>"+spec.specification+"</a>";
				} else {
					s += array[i][prop];
				}
			} else if (prop === "handler") {
				var handler = handlers.find(function (e) {
					return e.description === array[i][prop];
				});
				if (handler) {
					s += "<a href='handler.html#"+handler.code+"'>"+handler.description+"</a>";
				} else {
					s += array[i][prop];
				}
 			} else {
 				if (linkField && prop === linkField) {
 					s += "<a id='"+array[i][prop]+"' name='"+array[i][prop]+"'></a>";
 				}
				s += array[i][prop];
			}
			s += "</td>";
		}
		s += "</tr>";
	}
	s += "</tbody>";	
	s += "</table>";
	div.innerHTML = s;
}
/* harmony export (immutable) */ __webpack_exports__["buildTable"] = buildTable;


const buildSpecsTable = (array, div) => {	
	var i;
	var s = "<table border=4 cellpadding=0 cellspacing=2>";
	s += "<thead>";
	s += "<tr>";
	s += "<th>";
	s += "Name";
	s += "</th>";
	s += "<th>";
	s += "Specification or Source";
	s += "</th>";
	s += "</tr>";
	s += "</thead>";
	s += "<tbody>";	
	for (i = 0; i < array.length; i++) {
		s += "<tr>";
		s += "<td>";
		s += "<a id='"+array[i].linkname+"' name='"+array[i].linkname+"'></a>"+array[i].specification;
		s += "</td>";
		s += "<td>";
		s += array[i].description;
		s += "</td>";
		s += "</tr>";
	}
	s += "</tbody>";	
	s += "</table>";
	div.innerHTML = s;
}
/* harmony export (immutable) */ __webpack_exports__["buildSpecsTable"] = buildSpecsTable;



/***/ })
/******/ ]);