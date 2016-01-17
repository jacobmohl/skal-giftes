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