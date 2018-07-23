// set the date we're counting down to
var target_date = new Date('Jul, 31, 2018').getTime();

// variables for time units
var days, hours, minutes, seconds;

// get tag element
var countdown = document.getElementById('countdown');

// update the tag with id "countdown" every 1 second
setInterval(function () {

    // find the amount of "seconds" between now and target
    var current_date = new Date().getTime();
    var seconds_left = (target_date - current_date) / 1000;

    // do some time calculations
    days = parseInt(seconds_left / 86400);
    seconds_left = seconds_left % 86400;

    hours = parseInt(seconds_left / 3600);
    seconds_left = seconds_left % 3600;

    minutes = parseInt(seconds_left / 60);
    seconds = parseInt(seconds_left % 60);

    // format countdown string + set tag value
    countdown.innerHTML = '<span class="days">' + days + ' <strong>Días</strong></span> <span class="hours">' + hours + ' <strong>Horas</strong></span> <span class="minutes">' + minutes + ' <strong>Minutos</strong></span> <span class="seconds">' + seconds + ' <strong>Segundos</strong></span>';

}, 1000);


$(function () {
    var $window = $(window); // 1. Window Object.
    var $featuredMedia = $("#featured-media"); // 1. The Video Container.
    var $featuredVideo = $("#featured-video"); // 2. The Youtube Video.

    var player; // 3. Youtube player object.
    var top = $featuredMedia.offset().top; // 4. The video position from the top of the document;
    var offset = Math.floor(top + ( $featuredMedia.outerHeight() / 2 )); //5. offset.
    function onPlayerStateChange(event) {
        console.log('changed'); //deleteinbuild
        console.log(event.data, 'event.data '); //deleteinbuild
        var $featuredVideo = $("#featured-video"); // 2. The Youtube Video.
        var isPlay = 1 === event.data;
        var isPause = 2 === event.data;
        var isEnd = 0 === event.data;

        if (isPlay) {
            $featuredVideo.removeClass("is-paused");
            $featuredVideo.toggleClass("is-playing");
        }

        if (isPause) {
            $featuredVideo.removeClass("is-playing");
            $featuredVideo.toggleClass("is-paused");
        }

        if (isEnd) {
            $featuredVideo.removeClass("is-playing", "is-paused");
        }
    }

    window.onYouTubeIframeAPIReady = function () {
        console.log('ready'); //deleteinbuild

        player = new YT.Player("featured-video", {
            videoId: 'WNTCfeuZNoA',

            playerVars: {'autoplay': 1, 'controls': 0, rel: 0, controls: 0, showinfo: 0, autoplay: 1},

            events: {
                "onStateChange": onPlayerStateChange
            }
        });
    };
    $window
        .on("resize", function () {
            top = $featuredMedia.offset().top;
            offset = Math.floor(top + ( $featuredMedia.outerHeight() / 2 ));
        })

        .on("scroll", function () {
            console.log('bioy'); //deleteinbuild
            var $featuredVideo = $("#featured-video"); // 2. The Youtube Video.
            $featuredVideo.toggleClass("is-sticky",
                $window.scrollTop() > offset && $featuredVideo.hasClass( "is-playing" )
            );
        });


})


