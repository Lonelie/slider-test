var tabindex=1;
$(document).ready(function(){
	// MOVIE API 
	var url = 'https://api.themoviedb.org/3/movie/upcoming?',

	key = '&api_key=e082a5c50ed38ae74299db1d0eb822fe';
	$.ajax({
			type: 'GET',
			url: url + key,
			async: false,
			jsonpCallback: 'testing',
			contentType: 'application/json',
			dataType: 'jsonp',
			success: function(json) {
				var movies = json;
				var mylist= $(".slider");
				var $slide = $("<div class='slide'></div>");

				for(var i = 0; i <= 6; i++) {
					var poster = '<img src="https://image.tmdb.org/t/p/w500/' + movies.results[i].poster_path + '"/>';
					var title = '<h1>' + movies.results[i].title + '</h1>';
					var overview = '<p>' + movies.results[i].overview + '</p>';
					var rating ='<span class="rating" style="background-position:' + Math.round(100 - movies.results[i].vote_average * 10 / 2) +'px ' + '0px"></span>';
					var current = i;

					mylist.append($("<div class='slide'></div>").attr('data-id', i).html(poster + title + overview + rating));

				}
					mylist.appendTo($(".slider-wrap"));
					console.log(json);
			},
			error: function(e) {
					console.log(e.message);
			}
	});
	
	var windowWidthInit = $(".slider-wrap").width(),
			slides = $(".slider .slide").length,
			circle="",
			move="";
			
	$(".slide").css({"width": windowWidthInit});
	for (var i=1;i<slides+1;i++) {
		if (i===tabindex) {
			circle = "<li><span class='circle'></circle></li>";
		} else {
			circle = "<li></li>";
		}
		$(circle).appendTo(".slider-wrap ul").bind("click", function(){
			var oldtabindex = tabindex;
			var windowWidth = $(".slider-wrap").width();
			if ($(this).index()+1!=tabindex) {
				tabindex=$(this).index()+1;
				moveindex=tabindex-oldtabindex;
				move="-="+windowWidth*(moveindex);
				$(".slider").animate({left: move});
			}
			$(".circle").fadeOut().remove();
			$("<span class='circle'></span>").appendTo(this).hide().fadeIn();
		});
	}
	$(".arrow").click(function(){
		var windowWidth = $(".slider-wrap").width();
		if ($(this).attr("id")==="right") {
			if (tabindex===slides) {
				tabindex=1
					move="+="+windowWidth*(slides-1);
			} else {
				tabindex=tabindex+1;
				move="-="+windowWidth;
			}
		} else {
			if (tabindex===1){
				tabindex=slides;
				move="-="+windowWidth*(slides-1);
			} else {
				tabindex=tabindex-1;
				move="+="+windowWidth;
			}
		}
		$(".slider").animate({left: move});
		$(".circle").fadeOut().remove();
		$("<span class='circle'></span>").appendTo(".slider-wrap ul li:nth-child("+tabindex+")").hide().fadeIn();
	});
	var pushLeft = ($(".slider-wrap ul").width()/2);
		$(".slider-wrap ul").css({"margin-left": "-"+pushLeft+"px"});
	});
	$(window).resize(function(){
		var windowWidth = $(".slider-wrap").width();
		$(".slide").css({"width": windowWidth});
	});