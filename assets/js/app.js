// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

var a = location.pathname.split('/').slice(-1)[0];
var CU;
var ctask;
var ctaskObj;
var cassignedObj;
var adminUser;
var cbuilder;
var loaderxs = '<div class="text-center"><div class="spinner"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1" width="28px" height="28px" viewBox="0 0 28 28"><!-- 28= RADIUS*2 + STROKEWIDTH --><!-- 3= STROKEWIDTH --><!-- 14= RADIUS + STROKEWIDTH/2 --><!-- 12.5= RADIUS --><!-- 1.5=  STROKEWIDTH/2 --><!-- ARCSIZE would affect the 1.5,14 part of this... 1.5,14 is specific to 270 degress --><g class="qp-circular-loader"><path class="qp-circular-loader-path" fill="none" d="M 14,1.5 A 12.5,12.5 0 1 1 1.5,14" stroke-linecap="round" /></g></svg></div></div>';
var loaders = '<div class="text-center"><div class="spinner"> <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1" width="40px" height="40px" viewBox="0 0 28 28"> <!-- 28= RADIUS*2 + STROKEWIDTH --> <!-- 3= STROKEWIDTH --> <!-- 14= RADIUS + STROKEWIDTH/2 --> <!-- 12.5= RADIUS --> <!-- 1.5=  STROKEWIDTH/2 --> <!-- ARCSIZE would affect the 1.5,14 part of this... 1.5,14 is specific to 270 degress --> <g class="qp-circular-loader"> <path class="qp-circular-loader-path" fill="none" d="M 14,1.5 A 12.5,12.5 0 1 1 1.5,14" stroke-linecap="round" /> </g> </svg> </div></div>';



function cockpitview(){

    $('#tempbutton').click(function(e){
        e.preventDefault();
        $('#ctapanel').slideUp();
        $('#ctapanel2').slideDown();
    });

    var kpi1=1.2;
var kpi2=32;
var kpi3=24;
var kpi4=16;

var startColor = '#FC5B3F';
var endColor = '#6FD57F';
var midColor = '#F8BA07';

var element = document.getElementById('kpi1');
var element1 = document.getElementById('kpi2');
var element2 = document.getElementById('kpi3');
var element3 = document.getElementById('kpi4');

var circle = new ProgressBar.Circle(element, {
    color: 'rgba(93, 86, 80,0.87)',
    trailColor: '#eee',
    trailWidth: 3,
    duration: 6000,
    easing: 'easeOut',
    strokeWidth: 3,
    value: '0',
    // Set default step function for all animate calls
    step: function(state, circle) {
        circle.path.setAttribute('stroke', state.color);
        circle.setText(kpi1.toFixed(1));
    }
});
circle.animate(kpi1/5, {
    from: {color: startColor},
    to: {color: startColor}
});

var circle1 = new ProgressBar.Circle(element1, {
    color: 'rgba(93, 86, 80,0.87)',
    trailColor: '#eee',
    trailWidth: 3,
    duration: 6000,
    easing: 'easeOut',
    strokeWidth: 3,
    value: '0',
    // Set default step function for all animate calls
    step: function(state, circle1) {
        circle1.path.setAttribute('stroke', state.color);
        circle1.setText(kpi2.toFixed(0)+"<span class='s3 scolor2'> %</span>");
    }
});
circle1.animate(kpi2/100, {
    from: {color: startColor},
    to: {color: midColor}
});

var circle2 = new ProgressBar.Circle(element2, {
    color: 'rgba(93, 86, 80,0.87)',
    trailColor: '#eee',
    trailWidth: 3,
    duration: 6000,
    easing: 'easeOut',
    strokeWidth: 3,
    value: '0',
    // Set default step function for all animate calls
    step: function(state, circle2) {
        circle2.path.setAttribute('stroke', state.color);
        circle2.setText(kpi3.toFixed(0)+"<span class='s3 scolor2'>days</span>");
    }
});
circle2.animate(kpi3/30, {
    from: {color: startColor},
    to: {color: endColor}
});

var circle3 = new ProgressBar.Circle(element3, {
    color: 'rgba(93, 86, 80,0.87)',
    trailColor: '#eee',
    trailWidth: 3,
    duration: 6000,
    easing: 'easeOut',
    strokeWidth: 3,
    value: '0',
    // Set default step function for all animate calls
    step: function(state, circle3) {
        circle3.path.setAttribute('stroke', state.color);
        circle3.setText(kpi4.toFixed(0));
    }
});
circle3.animate(kpi4/100, {
    from: {color: startColor},
    to: {color: startColor}
});
}



function loadingButton_id(id, d)
{
    var Original = $('#' + id).val();
    var d = 1;
    $('#' + id).val("processing");
    $('#' + id).html("processing");
    $("#" + id).attr('disabled', 'disabled');
    var ref = this;
    setTimeout(function()
    {
        $("#" + id).removeAttr('disabled');
        //console.log("Changing value to "+Original);
        $('#' + id).val(Original);
        $('#' + id).html(Original);
    }, d * 10000);
    //console.log("Loading Button was Called!");
}

function loadingButton_id_stop(id, value)
{
    var Original = value;
    $("#" + id).removeAttr('disabled');
    $("#" + id).val(Original);
}

function lb_id(id, d)
{
    //console.log('test')
    var Original = $('#' + id).html();
    var d = 1;
    
    $("#" + id).attr('disabled', 'disabled');
    var ref = this;
    setTimeout(function()
    {
        $("#" + id).removeAttr('disabled');
        //console.log("Changing value to "+Original);
        $('#' + id).html(Original);
    }, d * 10000);
    //console.log("Loading Button was Called!");
}

$('#newidea').submit(function(event)
{
    event.preventDefault();
    loadingButton_id('newideaModal .button','12');
    $('#newideaModal').delay(500).foundation('reveal','close');
     setTimeout(notify("Your idea has been added successfully","success",5), 1000);
    
});

var cp;

function internet()
{
    //console.log('connectivty being monitored');
    window.addEventListener("offline", function(e)
    {
        notify('Internet connectivty lost. Please check your connection.', 'alert', 0);
    }, false);

    window.addEventListener("online", function(e)
    {
        $('.alert-box').removeClass('alert');
        notify('Internet connectivty restored', 'success', 1);
    }, false);
}
internet();

function notify(text, type, duration)
{
    var sArray = ['alert', 'success', 'info', 'warning', 'alert', 'secondary'];
    sArray.splice($.inArray(type, sArray), 1);
    //console.log(sArray);
    $('.alert-box').slideDown().html(text + '<a href="#" class="close">&times;</a>').removeClass(sArray.join(' ')).addClass(type);
    //Types are: alert, success, warning, info
    if (duration != 0)
    {
        setTimeout(function()
        {
            $('.alert-box').slideUp().delay(400).html('loading <a href="#" class="close">&times;</a>').removeClass(type);
        }, duration * 1000);
    }
    // $(document).on('close.alert', function(event) {
    //   $('#alert-hook').html('<div data-alert id="alert-box" class="alert-box-wrapper alert-box alert radius" style="display:none;"> Loading... <a href="#" class="close">&times;</a> </div>');
    // });
}

function parallax()
{
    var scrolled = $(window).scrollTop();
    $('#pbg').css('background-position', 'center ' + -(scrolled * 0.5) + 'px');
}
