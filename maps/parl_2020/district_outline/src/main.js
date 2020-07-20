// Style background map (OSM Black & White)

		var tiles = L.tileLayer('http://{s}.tiles.wmflabs.org/fbw-mapnik/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		});
		latlng = L.latLng(42.105628, 43.723102);

// Define map

		var map = L.map('map', {center: latlng, zoom: 7, layers: [tiles]});

// Control that shows data on hover

// 		var info = L.control();
// 
// 		info.onAdd = function (map) {
// 			this._div = L.DomUtil.create('div', 'info');
// 			this.update();
// 			return this._div;
// 		};
// 
// 		info.update = function (props) {
// 			this._div.innerHTML = '<h4>Number of projects in the municipality</h4>' +  (props ?
// 				'<b>' + props.Name + '</b><br />' + props.Projects
// 				: 'Hover over or zoom to a municipality');
// 		};

		info.addTo(map);


		// get color depending on population density value
		function getColor(d) {
			return d > 10 ? '#800026' :
			       d > 7  ? '#BD0026' :
			       d > 5  ? '#E31A1C' :
			       d > 3  ? '#FC4E2A' :
			       d > 2   ? '#FD8D3C' :
			       d > 1   ? '#FEB24C' :
			       d > 0   ? '#FED976' :
			                  '#cccccc';
		}

		function style(feature) {
			return {
				weight: 2,
				opacity: 1,
				color: 'white',
				dashArray: '1',
				fillOpacity: 0.6
				// fillColor: getColor(feature.properties.Projects)
			};
		}

//		function highlightFeature(e) {
//			var layer = e.target;
//
//			layer.setStyle({
//				weight: 5,
//				color: '#666',
//				dashArray: '',
//				fillOpacity: 0.6
//			});
//
//			if (!L.Browser.ie && !L.Browser.opera) {
//				layer.bringToFront();
//			}
//
//			info.update(layer.feature.properties);
//		}
		
		var districts;
		
		function resetHighlight(e) {
			districts.resetStyle(e.target);
			info.update();
		}

		function zoomToFeature(e) {
			map.fitBounds(e.target.getBounds());
		}

		function onEachFeature(feature, layer) {
			layer.on({
				mouseover: highlightFeature,
				mouseout: resetHighlight,
				click: zoomToFeature
			});
		}

		districts = L.geoJson(districts, {
			style: style,
			onEachFeature: onEachFeature
		}).addTo(map);
		
//// Add Legend
//		var legend = L.control({position: 'bottomright'});
//
//		legend.onAdd = function (map) {
//
//			var div = L.DomUtil.create('div', 'info legend');
//
//			div.innerHTML += '<i style="background:' + '#cccccc' + '"></i> ' + 'No projects'+ '<br>'+
//			'<i style="background:' + '#FED976' + '"></i> ' + 'One'+ '<br>'+
//			'<i style="background:' + '#FEB24C' + '"></i> ' + 'Two'+ '<br>'+
//			'<i style="background:' + '#FD8D3C' + '"></i> ' + 'Three'+ '<br>'+
//			'<i style="background:' + '#FC4E2A' + '"></i> ' + '4-5'+ '<br>'+
//			'<i style="background:' + '#E31A1C' + '"></i> ' + '6-7'+ '<br>'+
//			'<i style="background:' + '#BD0026' + '"></i> ' + '8-10'+ '<br>'+
//			'<i style="background:' + '#800026' + '"></i> ' + 'More than 10'+ '<br>'
//			;
//			return div;
//		};
//
//		legend.addTo(map);
//// Define marker clusters
////		var markers = L.markerClusterGroup();
//
//// Import geoJson data file(s)
//	var source = L.geoJson(source, {
//		onEachFeature: function (feature, layer) //functionality on click on feature
//			{
//			layer.addTo(markers);
////			layer.bindPopup("Officer: "+feature.properties.po);
//			    layer.on({
//						click: function populate() {
//						document.getElementById('infobox').innerHTML = "<span class='sp1'>"+feature.properties.appname+"</span>"  + "<br>" 
//						 + "<span class='sp2'>Applicant name: </span>"+ "<span class='sp3'>"+feature.properties.apcname+"</span>"
//						+ "<br>"+"<span class='sp4'>Application number: </span>"+ "<span class='sp5'>"+feature.properties.appno+"</span>"
//						+ "<br>"+"<span class='sp6'>Year: </span>"+ "<span class='sp7'>"+feature.properties.year+"</span>"
//						+ "<br>"+"<span class='sp8'>Project officer: </span>"+ "<span class='sp9'>"+feature.properties.po+"</span>"
//						+ "<br>"+"<span class='sp10'>Grant start date: </span>"+ "<span class='sp11'>"+feature.properties.stdate+"</span>"
//						+ "<br>"+"<span class='sp12'>Grant end date: </span>"+ "<span class='sp13'>"+feature.properties.enddate+"</span>"
//						+ "<br>"+"<span class='sp14'>Grant budget (actual expenses): </span>"+ "<span class='sp15'>"+feature.properties.budget+ feature.properties.currency+"</span>"
//						+ "<br>"+"<span class='sp18'>Geography: </span>"+ "<span class='sp19'>"+feature.properties.geogr+"</span>"
//						+ "<br>"+"<span class='sp20'>Number of beneficiaries: </span>"+ "<span class='sp21'>"+feature.properties.benef+"</span>"
//						+ "<br>"+"<span class='sp22'>"+feature.properties.note+"</span>"
//						;
//						document.getElementById('closeout').innerHTML= "<br>"+"<span class='sp16'>Public statement: </span>"+ "<span class='sp17'>"+feature.properties.copst+"</span>"
//						}
//				});
//			}
//		});
//		
//    map.on('zoomend ', function(e) {
//         if ( map.getZoom() > 9 ){ map.addLayer( markers )}
//         else if ( map.getZoom() <= 9 ){ map.removeLayer( markers )}
//    });

// Add markers to the map
	map.addLayer(districts);		// add it to the map

