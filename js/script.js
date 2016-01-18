jQuery(document).ready(function($){
	var contentSections = $('.nav-section'),
		navigationItems = $('nav a'),
        isSmallScreen = window.matchMedia( "(max-width: 600px)" );;

	updateNavigation();
	$(window).on('scroll', function(){
		updateNavigation();
	});

	//smooth scroll to the section
	navigationItems.on('click', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });
    //smooth scroll to second section
    $('.cd-scroll-down').on('click', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });

    //open-close navigation on touch devices
    $('.nav-trigger').on('click', function(){
        if(isSmallScreen) {
            $('nav').toggleClass('open');
        }
    });
    //close navigation on touch devices when selectin an elemnt from the list
    $('nav a').on('click', function(){
        if(isSmallScreen) {
            $('nav').removeClass('open');
        }
    	
    });

	function updateNavigation() {
		contentSections.each(function(){
            
			$this = $(this);
            
            console.log($this);
            
			var activeSection = $('nav a[href="#'+$this.attr('id')+'"]').data('number') - 1;
			if ( ( $this.offset().top - $(window).height()/2 < $(window).scrollTop() ) && ( $this.offset().top + $this.height() - $(window).height()/2 > $(window).scrollTop() ) ) {
				navigationItems.eq(activeSection).addClass('active');
			}else {
				navigationItems.eq(activeSection).removeClass('active');
			}
		});
	}

	function smoothScroll(target) {
        $('body,html').animate(
        	{'scrollTop':target.offset().top},
        	600
        );
	}
});



/***************************
 * 
 *  Google Maps implementation
 * 
 * 
 * 
 ****************************/
 
 
function createMaker(map, bounds, position) {
    // Create a marker and set its position.
    var marker = new google.maps.Marker({
        map: map,
        position: position,
        title: 'Hello World!'
    });
    
    bounds.extend(marker.position);
    return marker;
}

var map;
var myLatLng = [{lat: 55.385389, lng: 10.387459}, {lat: 55.504980, lng: 9.689340}];
var markers = [];
  
  
function initMap() {

  var bounds = new google.maps.LatLngBounds();
  
  // Create a map object and specify the DOM element for display.
  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng[0],
    scrollwheel: false,
    draggable: false, 
    zoomControl: false, 
    disableDoubleClickZoom: false,
    zoom: 11,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false
  });
  
  markers.push(createMaker(map, bounds, myLatLng[0]));
  markers.push(createMaker(map, bounds, myLatLng[1]));
  
  map.fitBounds(bounds);

  /*
  // Create a marker and set its position.
  var marker = new google.maps.Marker({
    map: map,
    position: myLatLng[0],
    title: 'Hello World!'
  });
  */
}
jQuery(document).ready(function($){
    $("#btn_map_church").click(function(event){
       map.setCenter(markers[0].getPosition());
       event.preventDefault();
    });
    
    $("#btn_map_castle").click(function(event){
       map.setCenter(markers[1].getPosition());
       event.preventDefault();
    });    
})
