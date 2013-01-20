$('document').ready(function(){

	var navWrapper = $('#sidebar'),
		closeTag = $('span.close'),
		$wrapper = $('.pageWrapper'),
		$pallet = $('.colorCanvas'),
    	body = $( 'body' ),
    	solidColor = $('#SCB01').val(),
    	$settings = $('div.settings'),
    	$solid = $('.solid-settings'),
    	$tilt = $('.tilt-settings'),
		id = $('input[name$="modeSelector"]:checked').val(),
		appModeNote = $( "#appModeNote" );;

	// variable to bind and unbind to the detaction of devicemotion
	var makeTilty = function(e) {

	        var movitBaby = e.originalEvent,
	            acelera = movitBaby.accelerationIncludingGravity,
	            x = acelera.x.toFixed(1),
	            y = acelera.y.toFixed(1),
	            z = acelera.z.toFixed(1),
	            color1 = $('#CB01').val(),
				color2 = $('#CB02').val();
				color3 = $('#CB03').val();
				color4 = $('#CB04').val();

			// populates the tilt settings box with live accelerometer info
	    	$('.accX span').html(x);
	    	$('.accY span').html(y);
	    	$('.accZ span').html(z);

	        if ( ( x >= 0.1 ) && ( x <=5 ) ) { // tilt a little right color
	        	$pallet.css({
	        		'background-color' : color3
	        	});
	        } else if ( ( x >= 6 ) && ( x <=10 ) ) { // tilt a lot right color
	        	$pallet.css({
	        		'background-color' : color4
	        	});
	        } else if ( ( x <= -0.1 ) && ( x >=-5 ) ) { // tilt a little left color
	        	$pallet.css({
	        		'background-color' : color1
	        	});
	        } else if ( ( x <= -6 ) && ( x >=-10 ) ) { // tilt a lot left color
	        	$pallet.css({
	        		'background-color' : color2
	        	});
	        };

	};

	// opens note about adding app to homescreen when viewing from safari browser
	if ( ("standalone" in window.navigator) && !window.navigator.standalone ) {
		appModeNote.show();
		body.bind("touchstart.appModeNote touchmove.appModeNote", function(event) {
			event.preventDefault();
			body.unbind( "touchstart.appModeNote touchmove.appModeNote" );
			appModeNote.fadeOut( 500 );

			// welcome message modal
			$('#welcome').reveal({
			     animation: 'fade',
			     animationspeed: 300,
			     closeonbackgroundclick: true
			 });
		});
	} else {
		// welcome message modal in fullscreen mode
		$('#welcome').reveal({
		     animation: 'fade',
		     animationspeed: 300,
		     closeonbackgroundclick: true
		 });
	};

	// closes side menu bar
	closeTag.on('click', function () {
		$wrapper.removeClass('active');
	})

	// swiping left in the sidebar closes itself
	$('#sidebar').on('swipeleft', function(e) {
		$wrapper.removeClass('active');
	});

	// swiping right on the container opens the sidebar
	$('.container').on('swiperight', function(e) {
		$wrapper.addClass('active');
	});

	// swiping right on the container opens the canvas options
	$('.container').on('swipeleft', function(e) {
		$('#canvasOptions').reveal({
		     animation: 'fade',
		     animationspeed: 300,
		     closeonbackgroundclick: true
		 });
	});

	// reveals the menu buttons
	$('.container').on('click', function () {
		event.preventDefault();
		$('.navTrigger, .canvasTrigger').fadeToggle('fast');
	});

	// opens side menu bar
	$('.navTrigger').on('click', function () {
		event.preventDefault();
		$wrapper.addClass('active');
	});

		var palHeight = $pallet.outerWidth(),	// to calculate circle and square canvas heights
			canSz = $('#canvasSize').val()/100,
			$thingsToShow = $("#minCanvasSize, .canvasLabel.minCan, .canvasLabel.maxCan .max, #canvasSpeed, .canvasLabel.canSpeed");

		// Set canvas to a circle
		$('#circle').on('click', function () {
			$pallet.css({
				'height' : palHeight,
				'-webkit-border-radius' : '50%',
				'top' : '10%',
		    	'-webkit-transform' : 'scale('+canSz+')'
			});

			$("#canvasSize, #animCanvas, #minCanvasSize").removeAttr('disabled');
			$('.canvasLabel.maxCan, label[for=animCanvas]').css('opacity', '1');

			$('.button').removeClass('active');
			$(this).addClass('active');
		});

		// Set canvas to a square
		$('#square').on('click', function () {
			$pallet.css({
				'height' : palHeight,
				'-webkit-border-radius' : '0',
				'top' : '10%',
		    	'-webkit-transform' : 'scale('+canSz+')'
			});

			$("#canvasSize, #animCanvas, #minCanvasSize").removeAttr('disabled');
			$('.canvasLabel.maxCan, label[for=animCanvas]').css('opacity', '1');

			$('.button').removeClass('active');
			$(this).addClass('active');
		});

		// Set canvas to full screen
		$('#fullScreen').on('click', function () {
			if ($pallet.hasClass('animate')) {
				$pallet.removeClass('animate');
				$('input[name=animCanvas]').attr('checked', false);
			    $thingsToShow.hide();
			};

			$pallet.stop().css({
				'height' : '100%',
				'-webkit-border-radius' : '0%',
				'top' : '0',
		    	'-webkit-transform' : "scale(1)",
		    	'-webkit-transition' : 'all 0.5s'
			});

			$("#canvasSize, #animCanvas").attr('disabled','disabled');
			$('.canvasLabel.maxCan, label[for=animCanvas]').css('opacity', '0.3');

			$('.button').removeClass('active');
			$(this).addClass('active');
		});

	// Set the value of the canvas scale label
	$('.currentSize').html( $('#canvasSize').val() + "%" );
	
	// change the BASE/MAX scale of the canvas 
	$('#canvasSize').change( function() {
	    canSz = $(this).val()/100;
	    $('.currentSize').html( $(this).val() + "%" );
	    $pallet.css('-webkit-transform', "scale("+canSz+")");
	});

    var minCanSz = $('#minCanvasSize').val()/100;

	// Set the value of the canvas scale label
	$('.minSize').html( $('#minCanvasSize').val() + "%" );

	// change the MIN scale of the canvas 
	$('#minCanvasSize').change( function() {
	    minCanSz = $(this).val()/100;
	    $('.minSize').html( $(this).val() + "%" );
	    // $pallet.css('-webkit-transform', "scale("+minCanSz+")");
	});

    var canSpd = $('#canvasSpeed').val()/1000,
    	canSpdReal = $('#canvasSpeed').attr("value");

	// Set the value of the canvas speed
	$('.animSpd').html( canSpd.toFixed(1) + " sec." );

	// change the animation scale speed 
	$('#canvasSpeed').change( function() {
	    canSpd = $(this).val()/1000;
	    canSpdReal = $(this).attr("value");
	    
	    $('.animSpd').html( canSpd.toFixed(1) + " sec." );
	    // $pallet.css('-webkit-transform', "scale("+minCanSz+")");
	});

	// Sets pallet's animaation state
	$('#animCanvas').on('click', function () {

		$pallet.css({
				'-webkit-transition' : 'all 0s',
				'-webkit-transition' : 'background-color 0.5s'
		});

		if ($(this).is(':checked')) {
		    $thingsToShow.show();
		    $pallet.addClass('animate');
		} else {
		    $thingsToShow.hide();
		    $pallet.removeClass('animate');
		};

		if ($pallet.hasClass('animate')) {
			resizePallet();
		} else {
			$pallet.css({
				'-webkit-transform' : 'scale('+canSz+')',
				'-webkit-transition' : 'all 0.5s'
			});
		};

	});

	function resizePallet() {

		var duration = parseInt(canSpdReal);

		$pallet.animate({transform: "scale("+minCanSz+")"}, duration )
			   .animate({transform: "scale("+canSz+")"}, duration, function(){
			   		if ($pallet.hasClass('animate')) {
	                    resizePallet();
	                }  else {
						return false;
					};
      	      });
	};




	// color picker for tilt color mode
	$(".colorBox").spectrum({
		clickoutFiresChange: true
	});

	// color picker for solid color mode
	$(".solidColorBox").spectrum({
		clickoutFiresChange: true,
		hide: 	function(color) {
					var $pallet = $('.colorCanvas'),
				    	solidColor = color.toHexString(); // #ff0000
					$pallet.css({ 'background-color' : solidColor });
		        }
	});

	// color picker for strobe color mode
	$(".strobeColorBox").spectrum({
		clickoutFiresChange: true
	});


	var makeStrobe = function () {

		var strColor1 = $('#STRCB01').val(),
			strColor2 = $('#STRCB02').val(),
			strColor3 = $('#STRCB03').val(),
			strColor4 = $('#STRCB04').val(),
			solidColor = $('#SCB01').val(),
			delayVal = $('#strobeDelay').val(),
			timerVal = $('#strobeTimer').val(),
			colorDuration = parseInt(timerVal);

		$('.strobeDelayAmount').html(delayVal);
		$('.strobeTimerAmount').html(timerVal);

		$('#strobeDelay').change( function() {
		    delayVal = $(this).val();
		    $('.strobeDelayAmount').html( delayVal );
		});

		$('#strobeTimer').change( function() {
		    timerVal = $(this).val();
		    $('.strobeTimerAmount').html( timerVal );
		});
		if ( body.hasClass('strobe') ) {
			console.log('strobing', strColor1, strColor2, strColor3, strColor4);
			$pallet.delay( delayVal ).animate( {backgroundColor: strColor1,}, colorDuration )
				   .delay( delayVal ).animate( {backgroundColor: strColor2,}, colorDuration )
				   .delay( delayVal ).animate( {backgroundColor: strColor3,}, colorDuration )
				   .delay( delayVal ).animate( {backgroundColor: strColor4,}, colorDuration, function(){
				   		if ( body.hasClass('strobe')) {
		                    makeStrobe();
		                    // console.log(timerVal);
		                }  else {
							$pallet.css({ 'background-color' : solidColor });
							return false;
						};
	                });
		} else {
			$pallet.css({ 'background-color' : solidColor });
			return false;
		};
	};

	// Code to change the color modes
	$('input[name$="modeSelector"]').on('click', function () {

		var $this = $(this).val(),
			$pallet = $('.colorCanvas'),
			body = $('body'),
			$settings = $('div.settings'),
	    	solidColor = $('#SCB01').val(),
	    	$solid = $('.solid-settings'),
	    	$tilt = $('.tilt-settings'),
	    	$strobe = $('.strobe-settings');

	    // conditions for mode change
	    if ( ( $this === 'tiltMode' ) && ( body.hasClass('solid') ) ){ // tilt mode form solid

			$settings.hide();
			$tilt.show();
	    	body.removeClass('solid').addClass('tilt');
		    $(window).bind("devicemotion", makeTilty);    	

	    } else if ( ( $this === 'tiltMode' ) && ( body.hasClass('strobe') ) ){ // tilt mode form strobe

			$settings.hide();
			$tilt.show();
	    	body.removeClass('strobe').addClass('tilt');
	    	// $pallet.stop();
		    $(window).bind("devicemotion", makeTilty);    	

	    } else if ( ( $this === 'solidMode') && ( body.hasClass('tilt') ) ) { // solid mode form tilt

			$settings.hide();
			$solid.show();
	    	body.removeClass('tilt').addClass('solid');
		    $(window).unbind("devicemotion", makeTilty);
			$pallet.css({ 'background-color' : solidColor });

	    } else if ( ( $this === 'solidMode') && ( body.hasClass('strobe') ) ) { // solid mode form strobe

			$settings.hide();
			$solid.show();
	    	body.removeClass('strobe').addClass('solid');
	    	// $pallet.stop();
			$pallet.css({ 'background-color' : solidColor });

	    } else if ( ( $this === 'strobeMode') && ( body.hasClass('solid') ) ) { // strobe mode from solid

			$settings.hide();
			$strobe.show();
	    	body.removeClass('solid').addClass('strobe');
		    // $(this).bind('click', makeStrobe);
			makeStrobe();

	    } else if ( ( $this === 'strobeMode') && ( body.hasClass('tilt') ) ) { // strobe mode from tilt

			$settings.hide();
			$strobe.show();
	    	body.removeClass('tilt').addClass('strobe');
		    $(window).unbind("devicemotion", makeTilty);
			makeStrobe();

	    } else {
	    	return false;
	    };
	});


	// color mode conditions for when page starts
	if ( $('body').hasClass('tilt') ) {

	    $(window).bind("devicemotion", makeTilty);    	

	} else if ( $('body').hasClass('solid') ) {

		$pallet.css({ 'background-color' : solidColor });

	} else if ( $('body').hasClass('strobe') ) {

		makeStrobe();

	} else {
		return false;
	};

});

