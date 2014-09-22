$(document).ready(function(){
   
//Current page control

	hash = document.location.hash;

	var current_page = null;

	switch(hash) {
	    case "#portfolio":
	        show_page("#portfolio");
	        current_page = "#portfolio";
	        break;
	    case "#about":
	        show_page("#about");
	        current_page = "#about"
	        break;
		default:
	    show_page("#welcome");
	    	document.location.hash = "#welcome";
	    	current_page = "#welcome";
	        break;
	}	


	function show_page(page) {
		hideall();
		$(page).css("margin-left","225px");
		document.location.hash = page;
	}

  	function hideall() {
		$(".page").css("margin-left","100%");
	}

	function switch_to_page(page) {
		if (current_page!=page) {
			var page_list = ["#welcome", "#portfolio", "#about"];
			var length = page_list.length;
			var element = null;
			for (var i = 0; i < length; i++) {
  				element = page_list[i];
  				if (element!=current_page) {
  					$(element).css("margin-left","100%");
  				}
  			}
			$(current_page).css("z-index","0");
			$(page).css("z-index","1");
			$(page).animate({marginLeft:"225px"},{duration: 700});
			document.location.hash = page;
			current_page=page;
		}
	}

	$("#menu a").click(function() {
		switch_to_page($(this).attr("href"));
	});

// Current page control end 











//welcome page window adjustments 

function adjust_welcome_divs() {

	var window_height = $(window).height();
	if($("#welcome_intro").height()<window_height) {
	$("#welcome_intro").css("height",window_height);
	}
	if($("#welcome_end").height()<window_height) {
		var excess_space = $(window).height() - $("#welcome_end").height();
		$("#welcome_end").css("padding-top",(excess_space/2));
		$("#welcome_end").css("padding-bottom",(excess_space/2));
	}

}
adjust_welcome_divs();
$(window).resize(function() { adjust_welcome_divs(); });

//welcome page window adjustments end







//welcome page animations

if (current_page=="#welcome") { //preparations
		
	$("#hey").css("margin-top","-200px");
	$("#imkfir").css("margin-left","100%");
	$("#andim").css("opacity","0");
	$(".welcome_content").css("opacity","0");
	$("#welcome_end").css("opacity","0");
	$(".welcome_content").hide();
	$("#welcome_end").hide();
	$("#arrow").hide();
	$("#arrow").css("opacity","0");


}

$(function(){ //wait for background to load
   	 $('<img>').attr('src',function(){
   	     var imgUrl = $('.page').css('background-image');
   	     imgUrl = imgUrl .substring(4, imgUrl .length-1);
   	     return imgUrl;
   	 }).load(function(){
	
			if (current_page=="#welcome") {
		
				

		
				setTimeout(function() { //give all animations 1000 to start
		
					$("#hey").animate({marginTop:"20px"},{duration: 350});
					$("#hey").animate({marginTop:"10px"},{duration: 100});
					$("#hey").animate({marginTop:"20px"},{duration: 100});
					$("#hey").animate({opacity:"1"},{duration: 700});
			
			
			
					setTimeout(function() {
						$("#imkfir").animate({marginLeft:"100px"},{duration: 500});
						$("#imkfir").animate({marginLeft:"110px"},{duration: 100});
						$("#imkfir").animate({marginLeft:"100px"},{duration: 100});
					}, 1100)
			
			
					setTimeout(function() {
						$("#andim").animate({opacity:"1"},{duration: 500});
					}, 2500)

					setTimeout(function() {
						$(".welcome_content").show()
						$("#welcome_end").show();
						$("#arrow").show();
						$("#arrow").animate({opacity:".5"},{duration: 500});

					}, 3000)
		
				}, 1000)
			}
		
	    });
	});

	$("#welcome").scroll(function() {

		function isVisible(item) {
			if ($(item).css('opacity') == '1') {
				return true;
			}	
			else {
				return
			}
		}

		//Divs that appear based on scroll position

		if (arrow_click!=true) {
			$(".welcome_content").toggleWhenVisible(200);

			$("#welcome_end").toggleWhenVisible(500);
		}

		//Hide arrow while scrolling
		$('#arrow').fadeOut();
	
		var scrollA = $('#welcome').scrollTop();
	
		welcome_end = $("#welcome_end");

		//console.log((welcome_end).hasClass("showed"));

		if (!(welcome_end).hasClass("showed") & arrow_click!=true) {
			setTimeout(function(){
				if(scrollA == $('#welcome').scrollTop()){
					$('#arrow').fadeIn();
				}
			}, 500);
		}


	});

	//Arrow animations

	arrow_click = false;

	$("#arrow").click(function() {



		window_height = $(window).height();
		distance_top = $("#welcome").scrollTop();
		content_height = $("#welcome_content").height();

		console.log(content_height)

		var container = $('#welcome');
		var scrollTo1 = $('#webdesigner');
		var scrollTo2 = $('#welcome_end');

		if (distance_top < window_height) {
			arrow_click = true;
			console.log(arrow_click);
			container.animate({
			    scrollTop: scrollTo1.offset().top - container.offset().top + container.scrollTop()
			}, function() {
				$("#webdesigner").animate({opacity:1},800);
				setTimeout(function() {
					$("#developer").animate({opacity:1},800);
				}, 800)
				setTimeout(function() {
					$("#physicist").animate({opacity:1},800);
				}, 1600)
				setTimeout(function() {
					$('#arrow').fadeIn();
					arrow_click = false;
				}, 2400)

    		})

 		}
 		else {
			container.animate({
			    scrollTop: scrollTo2.offset().top - container.offset().top + container.scrollTop()
			})
 		}
	});


});



//welcome page animations end

jQuery.fn.extend({ //Library of extended functions
	toggleWhenVisible: function(minimum_scroll_distance) { //shows an object if it's in the window
		this.each(function() {
			var element_from_top = $(window).height() - $(this).position().top;
			
			//console.log(element_from_top);

			if (element_from_top > minimum_scroll_distance) {
				if (!$(this).hasClass("showed")) {
					$(this).animate({opacity:"1"},{duration: 800});
					$(this).addClass("showed");
				}
			}
			else {
				if ($(this).hasClass("showed")) {
					$(this).animate({opacity:"0"},{duration: 800});
					$(this).removeClass("showed");
				}
			}
		});
	}
});
