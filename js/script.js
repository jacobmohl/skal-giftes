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
            
			var $this = $(this);            
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
 
function makeMaker(map, bounds, position) {
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
var markers = [];

  
function initMap() {
    var myLatLng = [new google.maps.LatLng(55.385389, 10.387459), new google.maps.LatLng(55.504980, 9.689340)];
    var bounds = new google.maps.LatLngBounds();
    
    var options = {
        center: myLatLng[0],
        scrollwheel: false,
        draggable: false, 
        disableDoubleClickZoom: false,
        zoom: 11,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false
    };
    
    // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map'), options);
    
    markers.push(makeMaker(map, bounds, myLatLng[0]));
    markers.push(makeMaker(map, bounds, myLatLng[1]));
    
    map.fitBounds(bounds);
  
};

//RUNTIME
jQuery(document).ready(function($){

    /*
    //Program a custom submit function for the form
    //$("form#guestbook_form").submit(function(event){
    $("form#guestbook_form").on("submit", function(event){
        
        //disable the default form submission
        //event.preventDefault(); 

        // Change the text of the button
        $("#submit").text("Sender besked...");
        
        // Animate the section
        $("#guestbook").animate({
            marginTop:"-530"
        }, 1000, function() {
            console.log("Animation done");
            //event.target.submit;
            //$("form#guestbook_form").unbind();
            //$("form#guestbook_form").submit();
        });
        
    }); 
    */   


    $("#btn_map_church").click(function(event){
       map.setCenter(markers[0].getPosition());
       map.setZoom(14);
       event.preventDefault();
    });
    
    $("#btn_map_castle").click(function(event){
        map.setCenter(markers[1].getPosition());
        map.setZoom(14);
        event.preventDefault();
    });    
    
    $("#btn_map_all").click(function(event){
        initMap();
        event.preventDefault();
    });     
})
