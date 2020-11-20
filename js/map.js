var map;
var mapLocation = [37.7792618, -122.4450884];
var mapZoom = 13;
var drawMap = function () {
    map = L.map("mapid").setView(mapLocation, mapZoom),
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    var scale = L.control.scale();
    scale.addTo(map);

    var attrOptions = {
        prefix: 'Made by <a href="https://karthiksuresh.me/">Karthik Suresh</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    };
    var attr = L.control.attribution(attrOptions);
    attr.addTo(map);
};

var linkTag = function (a, e) {
    return "<div class='popup-header'><a href='" + ("https://en.wikipedia.org/wiki/" + encodeURIComponent(a).replace(/[!'()*]/g, escape)) + "' target='_blank'>" + e + "</a></div>"
};

var subheaderTag = function (a) {
    return "<div class='popup-subheader'>" + a + "</div>"
};

var popupContent = function (a) {
    if (0 < a.title.indexOf("(")) {
        var e = a.title.indexOf("("),
            t = a.title.substring(0, e - 1),
            n = a.title.substring(e);
        return linkTag(a.title, t) + subheaderTag(n)
    }
    return linkTag(a.title, a.title)
};

var drawMarkers = function () {
    for (var a = L.markerClusterGroup(), e = 0; e < places.length; e++) {
        var t = places[e],
            n = L.marker([t.lat, t.lon]).bindPopup(popupContent(t));
        a.addLayer(n)
    }
    map.addLayer(a)
};

var drawButtons = function () {
    L.easyButton('&#127968',
        function (_, e) {
            e.setView(mapLocation, mapZoom)
        }).addTo(map)

    L.easyButton('&#63',
        function (_, e) {
            var random = Math.floor(Math.random() * places.length);
            e.setView([places[random].lat, places[random].lon], 20);
        }).addTo(map)
};

drawMap(), drawMarkers(), drawButtons();