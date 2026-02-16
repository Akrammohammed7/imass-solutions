(function($) {
	
   $.fn.smallSlider = function(options) {
    
        // Defaults
        var defaults = {
            pauseTime: 4000,
            pauseOnHover: true,
            startSlide: 0,
            directionNav: '',
            directionNavPrevBuilder: '',
            directionNavNextBuilder: '',
            controlNav: '',
            controlNavBuilder: '',
            prevText: 'Prev',
            nextText: 'Next',
            prevNav:'',
            nextNav:''
            };
        
        // Set up plugin vars
         var _smallSlider = this,
            settings = {},
            slider = $(this),
            slides = slider.children(),
            currentslide = 0,
            noofslides=0,
            timer = 0;

			var init = function() {
          
					settings = $.extend( {} , defaults, options);     
				   noofslides = slider.children().length;
					
					slides = slider.children();	
					                 				
					//prevNav = slider.parent().find("[id^='backward']");
					//nextNav = slider.parent().find("button[id^='forward']");
					
					if(settings.prevNav && $(settings.prevNav).length){
						prevNav = $(settings.prevNav);					 				
					   prevNav.on('click', function(e){
	                    e.preventDefault();
	                    backwardslide();
	                });
               }
               if(settings.nextNav && $(settings.nextNav).length){
               	 nextNav = $(settings.nextNav);
	                nextNav.on('click', function(e){
	                    e.preventDefault();
	                    forwardslide();
	                });	
					}
				
				// Set up pauseOnHover
            if(settings.pauseOnHover && settings.pauseTime && settings.pauseTime > 0){
                slider.hover(
                    function () {
                        clearTimeout(timer);
                    },
                    function () {
                        doTimer();
                    }
                );
            }				
				
				
				// Set up controlNav

            if(settings.controlNav && $(settings.controlNav).length){

                $(slides).each(function(i){
                    var controlNav1 = $('<a href="#" class="slider-control-nav">'+ (i + 1) +'</a>');
                    controlNav1.on('click', function(e){
                        e.preventDefault();
                        clearTimeout(timer);
								        currentslide=i;      
								        //clearTimeout(timer);                  
                        navigate(i);
                        //forwardslide();
                    });
                     
                    $(settings.controlNav).append(controlNav1);
                });
                $(settings.controlNav).show();
            }								
				//$(slides[index]).addClass('current');				           
        		navigate(0);
        		
       };
 
		 // Call constructor
        return init();


function forwardslide() {
						currentslide = currentslide + 1;
						//alert(currentslide);
						if (currentslide >= noofslides)
						{ currentslide=0 }	        		   
		        		   navigate(currentslide);
	        		       
}

function backwardslide() {
						currentslide = currentslide - 1;
						if (currentslide < 0)
						{ currentslide = noofslides-1 }	        		   
		        		   navigate(currentslide);

}

function navigate(index) {

	//$(slider).children().hide();
	////$(slider).children().not(':eq(' + index + ')').fadeOut().eq(index).fadeIn("fast","jswing",updateControlNav(index));	
	//$(slides[index]).fadeIn( 10,"jswing",updateControlNav());	
	//$(slides[index]).bind('show',updateControlNav());
		
	//$(slider).children().css('display','none'); //.hide();
	//$(slider).children().removeClass('current');
	//$(slides[index]).addClass('current');	
	

      var $active = $(slider).children().not(':eq(' + index + ')'); //hasClass('current');
      var $next = $(slides[index]) ; // ($active.next().length > 0) ? $active.next() : $('#cycler img:first');
		//$active.css('z-index',1).hide();      
      $next.css('z-index',2).addClass('current');//move the next image up the pile
      $active.css('z-index',1).hide();//.show();	
	   $next.css('z-index',3).show() ; //addClass('current');//make the next image the top one
		//$active.hide();
			
      /*
      $active.fadeOut(10,function(){//fade out the top image
	    //.removeClass('current');//reset the z-index and unhide the image
			 $active.css('z-index',1);//.show();	
	       $next.css('z-index',3).show() ; //addClass('current');//make the next image the top one
			 //$active.hide();      
 
          updateControlNav(index);
			 doTimer();   
 
      });	

 	*/

    updateControlNav(index);
	  doTimer();   

	
	//slides.children().css('display','none');   
   //$(slider).children().css({'display':'none',"z-index":'0'});   
   //$(slides[index]).css({'display':'block','z-index':'1'});	
   //$(slider).children().css({'z-index':'0'});   
   //$(slides[index]).css({'z-index':'1'}); 
     
  /*    
   $('.fadein img:gt(0)').hide();
    setInterval(function(){
      $('.fadein :first-child').fadeOut()
         .next('img').fadeIn()
         .end().appendTo('.fadein');}, 
      settings.pauseTime);	
*/

	 //.fadeOut(10);	
	//$(slides[index]).fadeIn( 10,"jswing",updateControlNav()).css({'display':'block','z-index':'10'}); //.fadeIn('slow');
	//$(slides[index]).fadeIn(1,"jswing",updateControlNav()).css({'display':'block','z-index':'10'}) ;	
	//
	//$(slider).children().not(':eq(' + index + ')').fadeOut('normal');	
	//currentslide = index;		
	//$(slider).children().eq(index).fadeIn('fast',"jswing",updateControlNav(index));
	
	 //$(slider).children().hide();
	 //$(slider).children().eq(index).fadeIn('fast',"jswing",updateControlNav(index));//.addClass('current');

	//updateControlNav(index); 	
	 
   
	
	//alert('here');
	
	
}

  // Update controlNav
 function updateControlNav(index){
 	
      if(settings.controlNav){
          //alert(currentslide);	
          $('.slider-control-nav', settings.controlNav).removeClass('active');
          $($('.slider-control-nav', settings.controlNav).get(index)).addClass('active');
      }  
 
  }        	


// Process timer
 function doTimer(){
 
    if(settings.pauseTime && settings.pauseTime > 0){
          clearTimeout(timer);
          timer = setTimeout(function(){ forwardslide(); }, settings.pauseTime);
    }
  
 }

   }; 
   
})(jQuery);   