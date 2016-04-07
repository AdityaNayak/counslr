$('#login').submit(function(event)
{
    event.preventDefault();
    loadingButton_id('loginBtn','12');
    
    if ($('#semail2').val()=="reviewer@company.com"){
        $('#landingview').fadeOut(300);
    
        $("#timelineview").delay(300).fadeIn(300);
        $('.rv').fadeIn();
        $('#hout').slideUp(200);
        $('#hin').delay(200).slideDown(200);

        $('#abtn').click(function(){
            $('#abtn').slideUp(300).delay(300).html("Assign").fadeIn().addClass('abtn');
            $('.temp1').slideUp();
            $('.temp2').delay(300).slideDown();

            $('.abtn').click(function(){
                $('.temp2').fadeOut(300);  
                $('#abtn').fadeOut(300);
                notify("Raju Hirani has been assigned","success",5);
                $('#assignarea').delay(400).fadeIn();              
            });
        });

    }
    else if($('#semail2').val()=="submitter@company.com"){
        $('#landingview').fadeOut(300);
        $('.sv').fadeIn();
        $('#timelineview').delay(300).fadeIn(300);
        $('#hout').slideUp(200);
        $('#hin').delay(200).slideDown(200);

    }
    else if($('#semail2').val()=="ceo@company.com"){
        $('#landingview').fadeOut(300);
        $('#cockpitview').delay(300).fadeIn(300);
        $('#hout').slideUp(200);
        $('#hin').delay(200).slideDown(200);
        cockpitview();
    }
    else if($('#semail2').val()=="implementor@company.com"){
        $('#landingview').fadeOut(300);
        $('#implementorview').delay(300).fadeIn(300);
        $('#hout').slideUp(200);
        $('#hin').delay(200).slideDown(200);
        implementorview();
    }
    else{
        notify("You are not authorized yet","error",5)
    }
    $('#loginModal').foundation('reveal','close');
    
    $('.siv').click(function(e){
        e.preventDefault();
        $('#timelineview').fadeOut(300);
        $('#singleideaview').delay(300).fadeIn();

        
    });
});

$("#drop1 a").click(function(e){
    e.preventDefault();
    $("#timelineview").fadeOut(300);
    $("#singleideaview").delay(300).fadeIn();
    $('.rv').delay(300).hide();
    $('.iv').delay(300).show();
});





$('.addpasswordanim').focus(function()
{
    if ($('#signup').attr("name") == "signup")
    {
        $('#confirmPassword').slideDown();
    }
});
$('#fpass').click(function(e)
{
    e.preventDefault();
    $('.fhide').slideUp();
    $('#signupBtn').val('Send reset email');
    $('#login').attr("name", "reset");
    $('#loginBtn').val("Send reset email");
});

function resetPassword()
{
    $('#signin-form').fadeOut(400);
    $('#reset-form').delay(400).fadeIn();
    $("#reset-form").submit(function(event)
    {
        var emailvar = $('#email').val();
        loadingButton_id("reset-btn", 12);
        Parse.User.requestPasswordReset(emailvar,
            {
                success: function()
                {
                    $('.alert-box').show().addClass('success').removeClass('alert');
                    $('.alert-box').html("Reset instructions have been emailed to you");
                    $('#reset-form').removeClass('b-ws-top');
                    loadingButton_id_stop("reset-btn", "Send Reset Email");
                },
                error: function(error)
                {
                    $('.alert-box').show().addClass('alert').removeClass('success');
                    $('.alert-box').html(error.message);
                    $('#reset-form').removeClass('b-ws-top');
                    loadingButton_id_stop("reset-btn", "Send Reset Email");
                }
            }),

            event.preventDefault();
    });
}
$(window).scroll(function(e){
    parallax();
});
$(document).ready(function(){
    parallax();
    //mixpanel.track_forms("#signup", "signup done");
});
