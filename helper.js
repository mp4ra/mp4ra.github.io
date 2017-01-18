function loadJSON(url, callback) {
	var xhr = new XMLHttpRequest;
	xhr.open('GET', url);
	xhr.onload = function() {
		if (this.status == 200 || this.status == 0) {
			var o = JSON.parse(this.responseText);
			callback(o);
		}
	}
	xhr.send();
}

function buildTable(array, specs, div, handlers, linkField) {	
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

function buildSpecsTable(array, div) {	
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