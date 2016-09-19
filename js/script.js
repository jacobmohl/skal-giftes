/* RUNTIME */


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


//GALLERY
function setOverlay() {
    var overlay     = $("#overlay");
    $("img", overlay).attr("src", "");

    var activeImage = $("#pictures img.active");
    var prevImage   = activeImage.prev();
    var nextImage   = activeImage.next();

    
    var id = activeImage.attr("data-link");
    
    

    var baseUrl = "http://res.cloudinary.com/jacobmohl/";
    var imageSrc = baseUrl + "image/upload/w_1200/" + id + ".jpg";

    // Set the images
    $("img", overlay).attr("src", imageSrc);

    // Toogle prev button
    if(prevImage.length == 0) {
        $("#overlay #prev").hide();
    } else {
        $("#overlay #prev").show();
    }

    //Toggle next button
    if(nextImage.length == 0) {
        $("#overlay #next").hide();
    } else {
        $("#overlay #next").show();
    }

    // Show overlay
    overlay.css("display", "flex");  
}

function nextImage() {
    var currentImage = $("#pictures img.active");
    var nextImage = currentImage.next();

    if(nextImage.length > 0) {

        currentImage.removeClass("active");
        nextImage.addClass("active");

        setOverlay();
    }
}

function prevImage() {
    var currentImage = $("#pictures img.active");
    var prevImage = currentImage.prev();

    if(prevImage.length > 0) {

        currentImage.removeClass("active");
        prevImage.addClass("active");

        setOverlay();    
    }
}

function closeOverlay() {
    $("#overlay").css("display", "none");
    $("#pictures img").removeClass("active");
}

function initGallery() {
    console.log("Init gallery");
    $("#pictures img").click(function(event){
        // Reset all images to not active
        $("#pictures img").removeClass("active");
        
        // Set the current images to active
        $(this).addClass("active");

        setOverlay();       
    });

    $("#overlay #close").click(function(event){
        closeOverlay();
    });

    $("#overlay #next").click(function(){
        nextImage();
    });

    $("#overlay #prev").click(function(){
        prevImage();
    });


    $( "html" ).keydown(function( event ) {
        if ( event.which == 39 ) { //prev arrow
            nextImage();
        } else if ( event.which == 37 ) { //next arrow
            prevImage();
        } else if ( event.which == 27 ) { //esc
            closeOverlay();
        }
    });
}

function fetchImages() {
    //Load JSON with images
    // Populate #pictures with images
    var baseUrl = "http://res.cloudinary.com/jacobmohl/";
    var url = baseUrl + "image/list/online.json";
    

    $.get(url, function( data ) {

data.resources.sort(function(a, b) {
    return parseFloat(a.public_id) - parseFloat(b.public_id);
});        

        data.resources.forEach(function(element) {
            var imageSrc = baseUrl + "image/" + element.type + "/w_300,h_300,c_thumb/" + element.public_id + "." + element.format; 

            jQuery('<img/>', {
                src : imageSrc,
                "data-link": element.public_id
            }).appendTo('#pictures');

            //http://res.cloudinary.com/jacobmohl/image/upload/c_fill,g_auto/w_auto,q_auto,f_auto/JacobOgLine/Galleri/20160827_134446.jpg
        }, this);

        initGallery();
        
    });

    

}
jQuery(document).ready(function($){
    fetchImages();
})