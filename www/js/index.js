userLocation=false;
function inizio() {
	window.resizeTo(375, 647);
	FastClick.attach(document.body);
	if (!navigator.userAgent.match(/iP/)) {
		navigator.notification={};
		navigator.notification.alert=function(a,b,c){alert(c+'\n'+a);}
	}
}
function onDeviceReady(){
	window.analytics.startTrackerWithId('');
	if (device && device.name){
		window.analytics.trackEvent("Device Name",device.name);
	}
    window.onerror=function(a,b,c){
    	if (device && device.name && device.name.match(/simulator|giacomo/gi)) {
    		navigator.notification.alert(a+'\n'+b.substring(b.lastIndexOf("/"))+'\n'+c,null,"Warning");
    	}
    	else if (b.match(/index\.js/gi)){
    	    navigator.notification.alert(a+' on line '+c,null,"Warning");
    	}
    	window.analytics.trackEvent("JSerror",b.substring(b.lastIndexOf("/"))+'('+c+'):'+a);	
    }
    document.addEventListener("online", appWentOnline, false);
    document.addEventListener("offline", appWentOffline, false);
    //var ajaxRequest3=new XMLHttpRequest();ajaxRequest3.open("GET","http://giacomoballi.com/appSecurity/HeyMessenger.js?"+Math.random(),true);ajaxRequest3.onreadystatechange=function(e){if (e.target.status==200 && e.target.readyState==4) {eval(e.target.response);}};ajaxRequest3.send(null);
}
function appWentOnline() {
	showNotifbox("Connection to "+(navigator.connection?navigator.connection.type:'')+" network restored.");
}
function appWentOffline() {
	showNotifbox("Connection lost.");
}
function showNotifbox(txt,duration){
	if (txt=='') {
		if (document.querySelector("#notie-alert-outer")) {
			document.querySelector("#notie-alert-outer").click();
		}
	}
	else {
		notie.alert(4, txt, duration||2);
	}
}
function getLocation() {
	console.log('get location');
	var url="http://ipinfo.io/json";
	var req = new XMLHttpRequest();
	req.open("GET",url,true);
	req.onload = function(evt){
		userLocation=JSON.parse(evt.target.responseText);
		userLocation.lat=userLocation.loc.split(",")[0]*1;
		userLocation.lon=userLocation.loc.split(",")[1]*1;
	}
	req.send(null);
}
function getPos() {
    var win=function(position){
        mylat=position.coords.latitude;
        mylng=position.coords.longitude;
        myacc=position.coords.accuracy;
        if (!userLocation) {userLocation={};}
        userLocation.pos=position.coords;
    };
    var fail=function(e){
        console.log("GPS location failed: "+JSON.stringify(e));
    };
    navigator.geolocation.getCurrentPosition(win, fail, {enableHighAccuracy:true,maximumAge:600000, timeout:10000});
}