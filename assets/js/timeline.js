var ses = 1;


function getProject(id)
{

    $('#stop').slideUp(600);
    $('#psingle').fadeOut(300);
    $('#timeline').fadeOut(300);
    $('#loading').delay(300).fadeIn(300);
    $('#search2').hide();
    var project = Parse.Object.extend("Projects");
    var query = new Parse.Query(project);
    query.include("builder");
    query.get(id,
    {
        success: function(result)
        {
            cpObj = result;

            $('#loading').slideUp(300);
            $('#psingle').delay(300).fadeIn(300).queue(function()
            {
                if (ses == 0 || !CU)
                {

                    if (CU && CU.get("type") == 3)
                    {
                        $(document).foundation('joyride', 'reflow');
                        $(document).foundation(
                        {
                            joyride:
                            {
                                start_offset: 1
                            }
                        });
                        $(document).foundation('joyride', 'start');
                    }
                    // else if (!CU)
                    // {
                    //     $(document).foundation('joyride', 'reflow');
                    //     $(document).foundation(
                    //     {
                    //         joyride:
                    //         {
                    //             start_offset: 3
                    //         }
                    //     });
                    //     $(document).foundation('joyride', 'start');
                    // }
                }

            });
            $('#genReport').click(function(e)
            {
                e.stopImmediatePropagation();
                if (CU)
                {
                    if (CU.get("type") == 2)
                    {
                        $('.b2b').show();
                        $('.b2c').hide();
                    }
                    else if (CU.get("type") == 3)
                    {
                        $('.b2b').hide();
                        $('.b2c').show();
                        $('#cpoctel').attr("placeholder", "Your phone number");
                        $("#cpoc").prop('required', false);
                    }
                    $('#genReport').slideUp();
                    $('#newProjectform').delay(300).slideDown();

                }
                else
                {
                    $("#signupModal").foundation('reveal', 'open');
                }

            });

            if (cpObj.get("image"))
            {
                // $('#pcover').attr("src", cpObj.get("image"));
                $('#uploadPicturebtn').hide();
                $("#uploadprojectpic").hide();
                $('#projectpic').html('<a class="btn" href="' + cpObj.get("image") + '" download>View Image</a> <i class="icon-close f-2x" id="editpicture"></i>');
                // reportfile = new File(cpObj.get("image"), cpObj.get("name") + ".jpg");
                // imageSave(cpObj);
            }
            else
            {
                $('#uploadPicturebtn').bind("change", function(e)
                {
                    var files = e.target.files || e.dataTransfer.files;
                    reportfile = files[0];
                    $('#uploadPicturebtn').fadeOut();
                    $('#projectpic').html('<label for="uploadPicturebtn" class="btn"><i class="icon-upload"></i> Upload Picture <input type="file" style="display:none;" id="uploadPicturebtn" accept="image/*" /></label>').append('<div class="row hide" id="pb-' + cpObj.id + '"><div class="progress stripes small-12 radius"><span class="meter" style="width: 0%"></span></div></div>');

                });
            }

            if (cpObj.get("coverimage"))
            {
                $('#pcover').attr("src", cpObj.get("coverimage").url());
                $('#uploadPicturebtn').hide();
                $('#projectpic').html('<a class="btn" href="' + cpObj.get("coverimage").url() + '" download>View Image</a> <i class="icon-close f-2x" id="editpicture"></i>');
            }

            $("#editpicture").click(function()
            {
                $("#uploadprojectpic").show();
                $('#projectpic').html('<label for="uploadPicturebtn" class="btn"><i class="icon-upload"></i> Upload Picture <input type="file" style="display:none;" id="uploadPicturebtn" accept="image/*" /></label>').append('<div class="row hide" id="pb-' + cpObj.id + '"><div class="progress stripes small-12 radius"><span class="meter" style="width: 0%"></span></div></div>');
                $('#uploadPicturebtn').bind("change", function(e)
                {
                    var files = e.target.files || e.dataTransfer.files;
                    reportfile = files[0];
                    $('#uploadPicturebtn').fadeOut();
                    $('#projectpic').html('<label for="uploadPicturebtn" class="btn"><i class="icon-upload"></i> Upload Picture <input type="file" style="display:none;" id="uploadPicturebtn" accept="image/*" /></label>').append('<div class="row hide" id="pb-' + cpObj.id + '"><div class="progress stripes small-12 radius"><span class="meter" style="width: 0%"></span></div></div>');

                });

            });

            // Check if a brochure exists, if not give options to upload a brochure
            if (cpObj.get("brochure"))
            {
                $('#uploadBrochurebtn').hide();
                $('#uploadBrochure').hide();
                $('#projectBrochure').html('<div class="scolor" id = > <a href="' + cpObj.get("brochure").url() + '" download>Download<i class="icon-download"></i></a></div><i class="icon-close f-2x" id="editBrochure"></i>')
            }
            else
            {
                $('#uploadBrochurebtn').bind("change", function(e)
                {
                    var files = e.target.files || e.dataTransfer.files;
                    reportfile = files[0];
                    $('#uploadBrochurebtn').fadeOut();
                    $('#projectBrochure').html('<label for="uploadBrochurebtn" class="btn"><i class="icon-upload"></i> Upload Brochure <input type="file" style="display:none;" id="uploadBrochurebtn" accept="application/pdf" /></label>').append('<div class="row hide" id="pb-' + cpObj.id + '"><div class="progress stripes small-12 radius"><span class="meter" style="width: 0%"></span></div></div>');
                });
            }

            //Edit uploaded brochure
            $("#editBrochure").click(function()
            {
                $("#uploadBrochurebtn").show();
                $('#uploadBrochure').show();
                $('#projectBrochure').html('<label for="uploadBrochurebtn" class="btn"><i class="icon-upload"></i> Upload Brochure <input type="file" style="display:none;" id="uploadBrochurebtn" accept="application/pdf" /></label>').append('<div class="row hide" id="pb-' + cpObj.id + '"><div class="progress stripes small-12 radius"><span class="meter" style="width: 0%"></span></div></div>');
                $('#uploadPicturebtn').bind("change", function(e)
                {
                    var files = e.target.files || e.dataTransfer.files;
                    reportfile = files[0];
                    $('#uploadPicturebtn').fadeOut();
                    $('#projectpic').html('<label for="uploadPicturebtn" class="btn"><i class="icon-upload"></i> Upload Picture <input type="file" style="display:none;" id="uploadPicturebtn" accept="image/*" /></label>').append('<div class="row hide" id="pb-' + cpObj.id + '"><div class="progress stripes small-12 radius"><span class="meter" style="width: 0%"></span></div></div>');
                });

            });


            $('#pname').html(cpObj.get("name"));

            var substring = ":";
            if (cpObj.get("location").indexOf(substring) > -1)
            {
                updateLocation(cpObj.get("location"));
                $('#plocation').html('<i class="icon-location"></i> ' + cpObj.get("location"))

            }
            else
            {
                $('#plocation').html('<i class="icon-location"></i> ' + cpObj.get("location"))
            }

            $('#pposession').html(moment(cpObj.get('posessiondate')).format("LL"));


            cBuilder = cpObj.get("builder");






            if (cpObj.get('pricerange'))
            {
                $("#ppricerange").html(cpObj.get('pricerange'));
            }
            else
            {
                
                var price_query = new Parse.Query("Price");
                price_query.equalTo("project", cpObj);
                price_query.descending("createdAt");
                price_query.first(
                {
                    success: function(price)
                    {
                        
                        var valuationrate = price.get('valuationrate');
                        unitsQuery = new Parse.Query('Units');
                        unitsQuery.equalTo('project',cpObj);
                        unitsQuery.descending('createdAt');
                        unitsQuery.find(
                        {
                            success: function(results)
                            {
                                var max_size = 0;
                                var min_size = 10000;
                                for (var i = 0; i < results.length; i++)
                                {
                                    if (results[i].get('size') > max_size)
                                    {
                                        max_size = results[i].get('size');
                                    }
                                    if (results[i].get('size') < min_size)
                                    {
                                        min_size = results[i].get('size');
                                    }
                                }
                                var flagmax = 0;
                                var flagmin = 0;
                                for (var i = 0; i < results.length; i++)
                                {
                                    if (flagmax == 1 && flagmin == 1)
                                    {
                                        break;
                                    }
                                    else if (flagmax == 0 && results[i].get('size') == max_size)
                                    {
                                        max_area = results[i].get('area');
                                        flagmax++;
                                    }
                                    else if (flagmin == 0 && results[i].get('size') == min_size)
                                    {
                                        min_area = results[i].get('area');
                                        flagmin++;
                                    }
                                }
                                max_valuation = max_area * valuationrate;
                                min_valuation = min_area * valuationrate;
                                if (max_valuation >= 10000000) max_valuation = (max_valuation / 10000000).toFixed(2) + ' Crores';
                                else if (max_valuation >= 100000) max_valuation = (max_valuation / 100000).toFixed(2) + ' Lakhs';
                                else if (max_valuation >= 1000) max_valuation = (max_valuation / 1000).toFixed(2) + ' K';
                                if (min_valuation >= 10000000) min_valuation = (min_valuation / 10000000).toFixed(2) + ' Crores';
                                else if (min_valuation >= 100000) min_valuation = (min_valuation / 100000).toFixed(2) + ' Lakhs';
                                else if (min_valuation >= 1000) min_valuation = (min_valuation / 1000).toFixed(2) + ' K';
                                console.log("max_area " + max_area + " valuationrate " + valuationrate + " min_area " + min_area + " min_valuation " + min_valuation + " max_valuation " + max_valuation);
                                $("#ppricerange").html(min_valuation + " - " + max_valuation);
                                var projectsQuery = new Parse.Query("Projects");
                                projectsQuery.equalTo("objectId",cpObj.id);
                                //console.log("max_area " + max_area + " valuationrate " + valuationrate + " min_area " + min_area + " min_valuation " + min_valuation + " max_valuation " + max_valuation);
                                projectsQuery.first(
                                {
                                    success: function(object)
                                    {
                                        console.log(object);
                                        object.set("pricerange", min_valuation + " INR -" + max_valuation + " INR");
                                        object.save(
                                        {
                                            success: function()
                                            {
                                                console.log("Price range Updated");
                                            },
                                            error: function(error)
                                            {
                                                console.log(error.message);
                                            }
                                        });

                                    },
                                    error: function(error)
                                    {
                                        console.error("errrrrrrrr" + error);
                                    }
                                });
                            },
                            error: function(error) {

                            }
                        });

                    },
                    error: function(error)
                    {
                        response.error(error.message);
                    }
                });
            }
            //console.log(cBuilder);
            // var price = Parse.Object.extend("Price");
            // var priceQuery = new Parse.Query(price);
            // priceQuery.equalTo('project',cpObj);
            // $('#ppricerange').html("");
            // priceQuery.find({
            //     success: function(results)
            //     {
            //        //console.log(results);
            //        var arr = {};
            //         for(var i=0;i<results.length;i++)
            //         {

            //             if(results[i].get('size')&&results[i].get('price'))
            //             {
            //                 arr[results[i].get("size")]=results[i].get("price");
            //                 //console.log(i+" "+results[i].get("price")+" hey");
            //                 //$('#ppricerange').append(results[i].get("size")+" BHK - "+results[i].get("price"));
            //             }  


            //         }
            //          for(x in arr)
            //             {
            //                 $('#ppricerange').append(x+" BHK - "+arr[x]+"<br>");
            //             }
            //     },
            //     error: function(error)
            //     {

            //     }
            // });



            $('#pinventory').html(cpObj.get("units") + ' Units - <small>' + cpObj.get("towers") + ' towers, ' + cpObj.get("floors") + ' Floors</small>');
            $('#pland').html(cpObj.get("area") + ' acres - <small>' + cpObj.get("coverage") + '% coverage</small');
            $('#pstatus').html(pstatus(cpObj.get("status")));
            if (cpObj.get("type") == 1)
            {
                $('#ptype').html("Residential");
            }
            else if (cpObj.get("type") == 2)
            {
                $('#ptype').html("Commercial");
            }
            $('#ptext').html(cpObj.get("about"));
            $('#ppph').html(cpObj.get("pph"));
            $('#plaunch').html(moment(cpObj.get("launchdate")).format("LL"));
            $('#pcontact').html(cpObj.get("customernum"), cpObj.get("customermail"));
            getUnits();
            getStatus();

            //Builder Waale

            if (cBuilder)
            {
                $('#pbuilder').html(cBuilder.get("name"));
                $('#bname').html(cBuilder.get("name"));

                $('#btext').html(cBuilder.get("about"));

                $('#bcadd').html(cBuilder.get("corpaddress"));
                $('#bcompadd').html(cBuilder.get("regaddress"));
                $('#bweb').html('<a href="' + cBuilder.get("website") + '" target="_blank"> Official Website </a>')
                $('#bcin').html(cBuilder.get("cin"));
                if (cBuilder.get("financials"))
                {
                    $('#bfin').html('<a href="' + cBuilder.get("financials").url() + '" download> Financial Reports <i class="icon-download"></i> </a>');
                }
                else
                {
                    $('#bfin').html('...');
                }
                $('#bnum').html(cBuilder.get("buildernum"));
                $('#bmail').html(cBuilder.get("buildermail"));
            }

            if (cpObj.get("brochure"))
            {
                $('#downloadBrochure').html('<div class="scolor" id = > <a href="' + cpObj.get("brochure").url() + '" download>Download<i class="icon-download"></i></a></div>')
            }
            // var locationstring = cpObj.get("name").split(" ");
            // var checkmapstring = "";
            // for (var i = 1; i < locationstring.length; i++) {
            //     checkmapstring = checkmapstring + locationstring[i] + "+";

            // }
            // console.log("https://maps.googleapis.com/maps/api/geocode/json?address=""&key=AIzaSyDP4PekCtfkFgFpPuOpSmG_cIw15ACs4ZE")
            // console.log(checkmapstring);

            //var p1=$('#pmap').width();

            if (cpObj.get("locationgp"))
            {
                $('#pmap').html('<iframe width="738" height="400" frameborder="0" style="border:0; pointer-events:none;"" src="https://www.google.com/maps/embed/v1/place?q=' + cpObj.get("locationgp").latitude + '%2C' + cpObj.get("locationgp").longitude + '&key=AIzaSyDP4PekCtfkFgFpPuOpSmG_cIw15ACs4ZE" allowfullscreen></iframe>');
            }
            else
            {
                $('#pmap').html('<iframe width="738" height="400" frameborder="0" style="border:0; pointer-events:none;" src="https://www.google.com/maps/embed/v1/place?q=' + 0.0 + '%2C' + 0.0 + '&key=AIzaSyDP4PekCtfkFgFpPuOpSmG_cIw15ACs4ZE" allowfullscreen></iframe>');

            }


            if (CU)
            {
                if (CU.get("type") == 2)

                {

                    $('#newProjectform').slideUp();
                    if (CU.get("subtype") == 1)
                    {
                        $('#genReport').slideDown();
                        $('#reqReport').slideUp();
                    }
                    else if (CU.get("subtype") == 2)
                    {
                        $('#genReport').slideDown();
                        $('#reqReport').slideUp();
                    }
                    else if (CU.get("subtype") == 3)
                    {
                        $('#genReport').slideUp();
                        $('#reqReport').slideDown();
                    }
                }

                $('#builders .overlay').remove();
            }
            else
            {
                $('#builders').append('<div class="overlay"><div class="b-ws-top text-center"><a class="button small success op7 hv" href="#" data-reveal-id="signupModal">Get started for Free <i class="icon-lock s-ws-left"></i></a></div></div>');

            }
            getTracking();

            getVerification();

        },
        error: function(object, error)
        {
            notify(error.message, "alert", 3);
        }
    });

    otherinv(5);
}

// getProject("6YGfL8YGSw");

$('#searchnav').click(function(event)
{
    event.preventDefault();
    $('#stop').slideDown();
    $('html, body').animate(
    {
        scrollTop: $("#stop").offset().top
    }, 1000, 'swing');
    search_intermediate();
    //pslistp();
});
$('#stext').focus(function()
{
    $(document).foundation('joyride', 'end');
});

function getVerification()
{
    var project3 = Parse.Object.extend("ProjectsVerification");
    var query3 = new Parse.Query(project3);
    query3.equalTo("projects", cpObj);
    query3.descending("createdAt");
    query3.include("verifiedby")
    query3.first(
    {
        success: function(result)
        {
            // console.log(result);
            if (result)
            {
                $('#vdate').html(moment(result.get("createdAt")).format("LL"));
                if (CU && CU.get("type") == 1 && CU.get("subtype") == 1)
                {
                    // console.log(result.get("verifiedby").get("uname"));
                    // console.log(result.get("verifiedby"));
                    $('#vdate').addClass("bgbg").prepend(result.get("verifiedby").get("uname"));
                }

            }
            else
            {
                $('#vdate').html('<span class="rc">Not yet</span>');
            }

        },
        error: function(object, error)
        {

            notify(error.message, "alert", 3);
        }
    });

}

function getTracking()
{

    if (CU)
    {
        $('#ctaloader').slideDown();
        if (CU.get("type") == 1)
        {
            $('#addTrack').show().html("Mark as Verified").addClass("success");
        }
        else
        {

            if (CU.get("type") == 3)
            {
                Parse.Cloud.run('isTrackingProject',
                {
                    userID: CU.id,
                    projectID: cpObj.id
                }).then(
                    function(result)
                    {
                        $('#ctaloader').slideUp();
                        if (result)
                        {

                            $('#addTrack').show().unbind("click").html('<div class="scolor2">Following <i class="icon-check-circle gc"></i></div><hr>').removeClass("button");
                            if (result.get("paid") == 1)
                            {
                                $('#genReport').show().unbind("click").html("<span class='scolor2'>Order ID:</span> #" + result.get("projectId") + ' <span class="s scolor">' + projectstatus(result.get("status")) + '</span>').removeClass("button");

                                showeta(result);
                            }
                            else
                            {
                                $('#genReport').slideDown();

                            }

                        }
                        else
                        {
                            $('#addTrack').show().addClass("button").html("Follow this project");
                        }
                    },
                    function(error)
                    {
                        notify(error, "alert", 3);
                    }
                );
            }
            else
            {
                var project2 = Parse.Object.extend("Project");
                var query2 = new Parse.Query(project2);
                //query2.include("builder");
                query2.equalTo("projects", cpObj);
                query2.equalTo("company", CU.get("company"));
                query2.first(
                {
                    success: function(result)
                    {
                        // console.log(result);
                        if (result)
                        {
                            $('#ar').slideDown();
                            $('#genReport').unbind("click").html("<span class='scolor2'>Order ID:</span> #" + result.get("projectId") + ' <span class="s scolor">' + projectstatus(result.get("status")) + '</span>').removeClass("button");
                            if (result.get("approved") == 1)
                            {
                                $('#genReport').prepend('<div><span class="f-1-5x">Approved <i class="icon-check-circle gc"></i> </span><span class="scolor2">  on ' + moment(result.get("approvaldate")).format("LL") + '</span></div>')
                            }
                            else if (result.get("approved") == 0)
                            {
                                $('#genReport').prepend('<div><span class="f-1-5x">Not approved <i class="icon-warning rc"></i> </span><span class="scolor2">  on ' + moment(result.get("approvaldate")).format("LL") + '</span></div>')
                            }
                            else
                            {
                                if (result.get("status") == 3)
                                {
                                    $('#genReport').prepend('<div><span class="f-1-5x">Under review <i class="icon-process yc"></i> </span></div>');
                                }

                            }
                            showeta(result)
                                //console.log(result);
                            reportstatus(result);
                        }
                        else
                        {
                            $('#genReport').addClass("button").html("Order a report");

                            $('#status').append('<div class="overlay"><div class="b-ws-top f-1-5x text-center scolor3">You have not ordered these reports yet</div></div>');
                            $('#units').append('<div class="overlay"><div class="b-ws-top f-1-5x text-center scolor3">You have not ordered these reports yet</div></div>');
                            $('#bhkunits').append('<div class="overlay"></div>');
                        }

                    },
                    error: function(object, error)
                    {

                        notify(error.message, "alert", 3);
                    }
                });
            }
        }
    }
}

function getStatus()
{
    $('#status').html(loaderxs);
    var sts = Parse.Object.extend("Status");
    var query3 = new Parse.Query(sts);
    query3.equalTo("project", cpObj);
    //query3.include("price");
    query3.descending("timestamp");

    if (CU)
    {
        if (CU.get("type") == 2 || CU.get("type") == 3)
        {
            query3.limit(1);
        }

    }
    else
    {
        query3.limit(1);
    }

    query3.find(
    {
        success: function(results)
        {
            $("#status").html("");

            if (results.length == 0)
            {
                $("#status").append('<div class="text-center scolor2">Coming soon</div>');
            }



            for (var i = 0; i < results.length; i++)
            {
                object = results[i];
                if (object.get("constructionprogress"))
                {
                    $('#status').append('<div class="row"><div class="small-12 columns s2 scolor2"> <span class="updated at">' + moment(object.get("timestamp")).format("LL") + '</span> <i class="icon-close right cs f-2x hide admin" id="del-' + object.id + '"></i></div> <div class="small-1 columns text-center bgline"> <div class="circle"> <i class="icon-circle scolor2"></i> </div></div><div class="small-4 columns"><span class="f-2x">' + object.get("statusp") + '</span> % completed </div> <div class="small-4 columns"><div class="scolor2 s2">Status</div><div class="scolor">' + projectsstatus(object.get("status")) + ' </div></div> <div class="small-3 columns"><div class="scolor2 s2">Progress update</div><div class="scolor"> <a href="' + object.get("constructionprogress").url() + '" download>Download <i class="icon-download"></i></a></div> </div> </div>');
                }
                else
                {
                    $('#status').append('<div class="row"><div class="small-12 columns s2 scolor2"> <span class="updated at">' + moment(object.get("timestamp")).format("LL") + '</span> <i class="icon-close right cs f-2x hide admin" id="del-' + object.id + '"></i> </div> <div class="small-1 columns text-center bgline"> <div class="circle"> <i class="icon-circle scolor2"></i> </div></div><div class="small-4 columns"><span class="f-2x">' + object.get("statusp") + '</span> % completed </div> <div class="small-4 columns"><div class="scolor2 s2">Status</div><div class="scolor">' + projectsstatus(object.get("status")) + ' </div></div> <div class="small-3 columns"><div class="scolor2 s2">Progress update</div><div class="scolor"> - </div> </div> </div>');

                }
                if (CU && CU.get("type") == 1)
                {
                    $(".admin").show();

                }

                $('#status').append('<div class="row"><div class="small-1 columns text-center bgline sm"> &nbsp;</div><div class="small-11 columns s-ws-top"><h6>Activity seen</h6></div></div><div id="as-' + object.id + '" class="row"><div class="small-1 columns text-center bgline"> &nbsp;</div><div class="small-2 columns text-center"><div><img src="/assets/images/labor.png" class="img-h op1 s1"></div><div class="s2 scolor2">Labor seen <span class="scolor1 lbcount"></span></div></div><div class="small-2 columns end text-center"><div><img src="/assets/images/crane.png" class="img-h op1 s2"></div><div class="s2 scolor2">Cranes moving <span class="scolor3 crcount"></span></div></div></div>');

                var labour_count = object.get("labour");
                var crane_count = object.get("cranes");

                if (labour_count)
                {
                    if (labour_count !== 0)
                    {
                        $('#as-' + object.id + ' .s1').removeClass('op1');
                        $('#as-' + object.id + ' .lbcount').html(":" + labour_count);
                    }
                }

                if (crane_count != 0 && crane_count)
                {
                    $('#as-' + object.id + ' .s2').removeClass('op1');
                    $('#as-' + object.id + ' .crcount').html(":" + crane_count);
                }




            }


            $('#status .icon-close').click(function()
            {
                var statusId = this.id.split('-')[1];
                var delquery = new Parse.Query(sts);
                delquery.equalTo("objectId", statusId)

                delquery.first(
                {
                    success: function(object)
                    {
                        object.destroy(
                        {
                            success: function()
                            {
                                notify("Status got deleted successfully", "success", 5);
                                getStatus();
                            },
                            error: function(error)
                            {
                                console.log(error.message);
                            }
                        });
                    }
                });
            });
            if (!CU)
            {
                console.log(i);
                $('#status').append('<div class="overlay"><div class="b-ws-top text-center"><a class="button small success op7 hv" href="#" data-reveal-id="signupModal">Get started for Free <i class="icon-lock s-ws-left"></i></a></div></div>');

            }

        }

    });
}

var reportfile;

$("#addStatus").click(function()
{

    $('#uploadProgressUpdate').bind("change", function(e)
    {
        var files = e.target.files || e.dataTransfer.files;
        reportfile = files[0];

        $('#uploadProgressUpdate').fadeOut();

    });
    var today = new Date();
    $("#ts").val(today.getFullYear() + "-" + today.getMonth() + 1 + "-" + today.getDate());

    var statusob = Parse.Object.extend("Status");
    var sts = new Parse.Query(statusob);

    sts.equalTo("project", cpObj);
    sts.first(
    {

        success: function(data)
        {
            $('#tspossession').val(moment(data.get("possessiondate")).format().split('T')[0]);

        },
        error: function(error)
        {
            response.error(error.message);
        }

    });



    // sts.get("possessiondate");

    $('#update-status').submit(function(e)
    {
        e.preventDefault();
        loadingButton_id("update-status .button");
        updatestatus();
    });



});

//Jquery Plugin for checkbox Value
jQuery.fn.getCheckboxVal = function()
{
    var vals = [];
    var i = 0;
    this.each(function()
    {
        vals[i++] = jQuery(this).val();
    });
    return vals;
}

var sid;
$("#editUnits").click(function()
{
    var p;
    var units = Parse.Object.extend("Units");
    var query2 = new Parse.Query(units);
    query2.equalTo("project", cpObj);
    query2.include("price");
    query2.find(
    {
        success: function(results)
        {
            $("#unitsinmodal").html("");
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            if (mm < 10)
            {
                mm = "0" + mm;
            }
            if (dd < 10)
            {
                dd = "0" + dd;
            }
            var yyyy = today.getFullYear();
            var today_date = yyyy + "-" + mm + "-" + dd;
            $("#tsi").val(today_date);
            for (var i = 0; i < results.length; i++)
            {
                object = results[i];
                $('#unitsinmodal').append('<option id="s-' + object.id + '" value="' + unitsize(object.get("size")) + '">' + unitsize(object.get("size")) + ' ' + object.get("area") + '</option>')
            }
        }
    });





});
$("#unitsinmodal").change(function()
{
    sid = $(this).children(":selected").attr("id");
    // console.log(sid);
});

$('#update-units').submit(function(e)
{
    loadingButton_id('update-units .button');
    e.preventDefault()


    var priceObj = Parse.Object.extend("Price");
    var price = new priceObj();

    var ts2 = $('#tsi').val()
    price.set("tradedrate", parseInt($('#tri').val()));
    price.set("valuationrate", parseInt($('#vri').val()));
    // price.set("units", gameScore);
    price.set("circlerate", parseInt($('#cri').val()));
    price.set("builderrate", parseInt($('#bri').val()));
    price.set("project", cpObj);
    //console.log(cpObj);
    if (ts2)
    {
        price.set("timestamp", new Date(ts2));
    }

    price.set("type", 2);


    price.save(null,
    {
        success: function(gameScore3)
        {
            datatrail("Units", "Units Update. Traded Rate: " + $('#tri').val() + ", Valuationrate: " + $('#vri').val() + ", Circle Rate: " + $('#cri').val() + ", Builderrate: " + $('#bri').val() + ", Timestamp: " + $('#tsi').val());
            $('#update-units').foundation('reveal', 'close');
            getUnits();
            notify('New object created with objectId: ' + gameScore3.id, "success", 3);
        },
        error: function(gameScore3, error)
        {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            notify('Failed to create new object, with error code: ' + error.message, "alert", 3);
        }
    });


});

$('#add-units').submit(function(e)
{
    loadingButton_id('add-units .button');
    e.preventDefault()
    var GameScore2 = Parse.Object.extend("Units");
    var gameScore2 = new GameScore2();

    gameScore2.set("size", parseInt($('#sizei').val()));
    gameScore2.set("area", parseInt($('#areai').val()));
    gameScore2.set("project", cpObj);
    //console.log(cpObj);#ar
    // if(ts2){
    //   gameScore2.set("timestamp",new Date(ts2));
    // }

    gameScore2.set("type", 1);


    gameScore2.save(null,
    {
        success: function(gameScore3)
        {
            // Execute any logic that should take place after the object is saved.
            $('#addunitsModal').foundation('reveal', 'close');
            notify('New object created with objectId: ' + gameScore3.id, "success", 3);
        },
        error: function(gameScore3, error)
        {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            notify('Failed to create new object, with error code: ' + error.message, "alert", 3);
        }
    });
});

function updatestatus(sts)
{
    //  console.log(reportfile)
    var status, activity, percent, labour_count, crane_count, timestamp, posessiondate;
    var statusob = Parse.Object.extend("Status");
    var sts = new statusob();
    timestamp = $('#ts').val()
    possessiondate = $('#tspossession').val();

    percent = parseInt($("#statusPercentage").val());
    status = parseInt($("input[name='status']:checked").val());
    labour_count = parseInt($('#inputlabour').val())
    crane_count = parseInt($('#inputcrane').val())

    if (reportfile)
    {
        var filextension = reportfile.name.split(".").pop();
        var parsefile = new Parse.File("update" + "." + filextension, reportfile);
        //console.log(parsefile);
        parsefile.save().then(function()
        {


            //console.log(parsefile);

            sts.set("project", cpObj);
            sts.set("statusp", percent);
            sts.set("status", status);
            sts.set("labour", labour_count);
            sts.set("cranes", crane_count);
            sts.set("for", 1);
            //console.log(t1)
            sts.set("timestamp", new Date(timestamp));
            sts.set("possessiondate", new Date(possessiondate));
            sts.set("constructionprogress", parsefile);
            sts.save(null,
            {
                success: function(report)
                {
                    event.stopImmediatePropagation();
                    $('#update-status').foundation('reveal', 'close');
                    getStatus();
                },
                error: function(report, error)
                {
                    notify(error.message, "alert", 3);
                }
            });
        });
    }
    else
    {

        sts.set("project", cpObj);
        sts.set("statusp", percent);
        sts.set("status", status);
        sts.set("labour", labour_count);
        sts.set("cranes", crane_count);
        sts.set("for", 1);
        sts.set("timestamp", new Date(timestamp));
        sts.set("possessiondate", new Date(possessiondate));
        //sts.set("constructionprogress", parsefile);
        sts.save(null,
        {
            success: function(report)
            {
                event.stopImmediatePropagation();
                $('#update-status').foundation('reveal', 'close');
                getStatus();
            },
            error: function(report, error)
            {
                notify(error.message, "alert", 3);
            }
        });
    }



}

function getUnits()
{
    $("#units").html(loaderxs);
    var p;

    // var units = Parse.Object.extend("Units");
    // var query2 = new Parse.Query(units);
    // query2.equalTo("project", cpObj);
    // query2.include("price");
    // query2.find(
    // {
    //     success: function(results)
    //     {
    //         $("#units").html("");
    //         if (results.length == 0)
    //         {
    //             $("#units").html('<div class="text-center scolor2">Coming soon</div>');
    //         }
    //         for (var i = 0; i < results.length; i++)
    //         {
    //             object = results[i];

    //             p = object.get("price");
    //             // console.log(object);
    //             var unit_id = results[i].id;
    //             var price1 = Parse.Object.extend("Price");
    //             var query1 = new Parse.Query(price1);
    //             var unit_ptr = {
    //                 __type: "Pointer",
    //                 className: "Units",
    //                 objectId: unit_id
    //             };
    //             units_timestamp(query1, object, unit_ptr);
    //             //console.log(object);
    //             //$('#units').append('<div class="row"> <div class="small-4 columns m-ws-bottom"><div class="f-1-5x scolor2">' + unitsize(object.get("size")) + ' </div><div class="scolor3">' + object.get("area") + '</div> </div> <div class="small-4 columns scolor m-ws-bottom"><div><span class="scolor3 s"> Circle rate</span> ' + p.get("circlerate") + '</div><div><span class="scolor3 s">Builder rate</span> ' + p.get("builderrate") + '</div></div> <div class="small-4 columns m-ws-bottom"><div><span class="scolor3 s">Traded Rate</span> ' + p.get("tradedrate") + '</div><div><span class="scolor3 s">Valuation rate</span> ' + p.get("valuationrate") + '</div></div></div>');
    //         }
    //     }
    // })

    var priceObj = Parse.Object.extend("Price");
    var priceq = new Parse.Query(priceObj);

    priceq.equalTo("project", cpObj);
    priceq.descending("createdAt");
    priceq.first(
    {
        success: function(result)
        {
            $("#units").html("");
            if (result)
            {
                $("#units").append('<div class="small-4 columns s-ws-top b-ws-bottom"><div class = "f-2x" >₹' + result.get("circlerate") + '<span class="scolor2 s3" > per sq ft </span></div><div class = "scolor2"> Circle rate </div> </div><div class="small-4 columns s-ws-top b-ws-bottom"><div class = "f-2x" >₹' + result.get("builderrate") + '<span class="scolor2 s3" > per sq ft </span></div><div class="scolor2"> Builder rate </div> </div><div class="small-4 columns s-ws-top b-ws-bottom"><div class = "f-2x" >₹' + result.get("valuationrate") + '<span class="scolor2 s3"> per sq ft </span></div><div class = "scolor2"> Valuation rate </div> </div')

            }
            else
            {
                $("#units").append('<div class="text-center scolor2">Coming soon</div>');

            }

            if (!CU)
            {
                $('#units').append('<div class="overlay"><div class="b-ws-top text-center"><a class="button small success op7 hv" href="#" data-reveal-id="signupModal">Get started for Free <i class="icon-lock s-ws-left"></i></a></div></div>');

            }



        },
        error: function(error) {

        }
    });

    var unitObj = Parse.Object.extend("Units");
    var unitq = new Parse.Query(unitObj);
    unitq.equalTo("project", cpObj);
    unitq.descending("createdAt");


    unitq.find(
    {

        success: function(results)
        {
            $("#bhkunits").html("");
            //console.log(results);
            if (results.length == 0)
            {
                $("#bhkunits").html('<div class="text-center scolor2">Coming soon</div>');
            }
            else
            {
                // $("#bhkunits").append('<span class="admin hide"><a href="#" class="right btn" id="editUnits">Edit Units</a></span>');
                for (var i = 0; i < results.length; i++)
                {
                    var result = results[i];

                    $("#bhkunits").append('<div class="small-2 columns end s-ws-top-p s-ws-bottom-p text-center"><i class="icon-edit s right scolor cs admin hide" id="unit-' + result.id + '" ></i><div class="f-1-5x">' + result.get("size") + '<span class="scolor2 s3" > BHK </span></div><div class="scolor2">' + result.get("area") + '<span class="scolor2 s3"> sq ft </span></div></div>')

                }
            }
            if (!CU)
            {
                $('#bhkunits').append('<div class="overlay"></div>');

            }

        },
        error: function(error) {

        }
    });

    $(document).on('click', '#bhkunits .icon-edit', function()
    {
        var unit_id = this.id.split('-')[1];
        var unitObj = Parse.Object.extend("Units");
        var unitq = new Parse.Query(unitObj);
        unitq.equalTo("objectId", unit_id);
        unitq.first(

            {
                success: function(result)
                {
                    //console.log(result);
                    $("#edit_unit_sizei").val(result.get('size'));
                    $("#edit_unit_areai").val(result.get('area'));
                    $("#edit_unit_idi").val(result.id);
                    //$("#editunitsModal").html('<form id="edit-units" class="m-ws-top-p"><input type="text" style="display:none;"id="idi" value="'+ results.id +'"><label>BHK<input type="number" id="sizei" value="'+ results.get("size") +'"></label><label>Area<input type="number" id="areai" value="'+ results.get("area")+'"></label><input type="submit" id="" value="Edit" class="button small fullwidth"></form>');
                    $("#edit_unit_data_reveal").click();
                    $('#edit-units').submit(function(e)
                    {
                        e.preventDefault();
                        //console.log(result);
                        result.set('size', parseInt($("#edit_unit_sizei").val()));
                        result.set('area', parseInt($("#edit_unit_areai").val()));
                        result.save(
                        {
                            success: function(results)
                            {
                                $('#editunitsModal').foundation('reveal', 'close');
                                notify("Units updated", "success", "5");
                                getUnits();
                            },
                            error: function(error) {

                            }
                        });

                    });
                    $("#edit_unit_delete").click(function()
                    {
                        //console.log("1");
                        result.destroy(
                        {
                            success: function()
                            {
                                $('#editunitsModal').foundation('reveal', 'close');
                                notify("Unit got deleted successfully", "success", 5);
                                getUnits();
                            },
                            error: function(error)
                            {
                                console.log(error.message);
                            }
                        });

                    });

                },
                error: function(error) {

                }
            });
        console.log(this.id);

    });






}


function units_timestamp(query1, object, unit_ptr)
{
    query1.equalTo("units", unit_ptr);
    query1.descending("timestamp");
    query1.find(
    {
        success: function(data)
        {
            $('#units').append('<div class="row"> <div class="small-4 columns m-ws-bottom"><div class="f-1-5x scolor2">' + unitsize(object.get("size")) + ' </div><div class="scolor3">' + object.get("area") + '</div> </div> <div class="small-4 columns scolor m-ws-bottom"><div><span class="scolor3 s"> Circle rate</span> ' + data[0].get("circlerate") + '</div><div><span class="scolor3 s">Builder rate</span> ' + data[0].get("builderrate") + '</div></div> <div class="small-4 columns m-ws-bottom"><div><span class="scolor3 s">Traded Rate</span> ' + data[0].get("tradedrate") + '</div><div><span class="scolor3 s">Valuation rate</span> ' + data[0].get("valuationrate") + '</div></div></div>');
        },
        error: function(error)
        {
            response.error(error.message);
        }
    });
}


function unitsize(num)
{
    if (num == 0)
    {
        return '0.5 BHK'
    }
    if (num == 1)
    {
        return '1 BHK'
    }
    if (num == 2)
    {
        return '2 BHK'
    }
    if (num == 3)
    {
        return '3 BHK'
    }
    if (num == 4)
    {
        return '4 BHK'
    }
    if (num == 5)
    {
        return '5 BHK'
    }
    if (num == 6)
    {
        return '6 BHK'
    }
}



function pstatus(num)
{
    if (num == 1)
    {
        return 'Pre Launch'
    }
    if (num == 2)
    {
        return 'Launched'
    }
    if (num == 3)
    {
        return 'Under Construction'
    }
    if (num == 4)
    {
        return 'Ready to move in'
    }
}


function projectsstatus(num)
{
    if (num == 0)
    {
        return 'Not Yet Started'
    }
    if (num == 1)
    {
        return 'In Progress'
    }
    if (num == 2)
    {
        return 'Completed'
    }
}

function projectstatus(num)
{
    if (num == 1)
    {
        return '<span class="yc">Open</span>'
    }
    if (num == 2)
    {
        return '<span class="bc">In Progress</span>'
    }
    if (num == 3)
    {
        return '<span class="gc">Done</span>'
    }
}

function timeline()
{
    $('#loading').fadeOut(200);
    $('#timeline').delay(200).fadeIn(200);
    $('#cuname').html(CU.get("uname"));
    $("#timelinelist").html(loaders);
    $('#cuprjlist').html(loaderxs).removeClass('plist');

    Parse.Cloud.run('getTrackedProject',
    {
        "userID": CU.id
    }).then(
        function(results)
        {
            $('#cuprj').html(results.length);
            $('#cuprjlist').html("").addClass("plist");
            $('#timelinelist').html("");
            ses = 1;
            if (results.length == 0)
            {
                ses = 0;
                $('#cuprjlist').html('<div class="scolor2 s-ws-bottom text-center s-ws-top">You are not tracking any projects yet</div>').removeClass("plist");
                $('#stop').slideDown();
                search_intermediate();
                if (CU.get("type") == 3)
                {
                    $(document).foundation('joyride', 'start');
                }

                //pslistp();
            }
            for (var i = 0; i < results.length; i++)
            {
                object = results[i];
                var GameScore2 = Parse.Object.extend("ProjectsNews");
                var query2 = new Parse.Query(GameScore2);
                var count1 = 0;

                var pcreateAt = object.get("createdAt");
                var projectsObj = Parse.Object.extend("Projects");
                var projectsquery = new Parse.Query(projectsObj);
                projectsquery.equalTo("objectId", object.get("projects").id);



                projectsquery.first(
                {
                    success: function(object)
                    {

                        query2.equalTo("projects", object);
                        query2.find(
                        {
                            success: function(results2)
                            {
                                //console.log(results2);
                                // $("#timelinelist").html("");
                                for (var j = 0; j < results2.length; j++)
                                {
                                    obj = results2[j]
                                    var tago = obj.get("timestamp");

                                    $('#timelinelist').append('<div class="panel" id=post-"' + obj.id + '"> <div class="row"> <div class="small-2 columns"> <img src="../assets/images/project.png"> </div> <div class="small-7 columns"> <h6 class="scolor">' + object.get("name") + '</h6><div class="s2 scolor2"><i class="icon-location"></i> ' + object.get("location") + '</div></div> <div class="small-3 columns scolor2 text-right s2"> <i class="icon-clock"></i> ' + moment(tago).fromNow() + '</div> </div> <hr> <div class="row"> <div class="small-12 columns">' + obj.get("content") + '</div> </div> </div>');
                                    count1 = 1;
                                    if (count1 == 0)
                                    {
                                        $("#timelinelist").html("No projects updates yet");
                                    }
                                }
                            },
                            error: function(error)
                            {
                                notify(error.message, "alert", 3);
                            }
                        });

                        $('#cuprjlist').append('<div class="plistli" id="p-' + object.id + '"><div class="row collapse"><div class="small-3 columns"><img src="../assets/images/project.png"></div><div class="small-9 columns"><div class="s-ws-left-p"><h5 class="nm">' + object.get("name") + '</h5><div class="scolor2 s2"><i class="icon-location"></i>' + object.get("location") + '</div></div><div class="small-12 columns scolor2 text-left s2"> <i class="icon-clock"></i> ' + moment(pcreateAt).format('LL') + '</div></div></div></div>');
                        $('#cuprjlist .plistli').click(function(e)
                        {
                            e.preventDefault();
                            $('#timeline').fadeOut();
                            //$('#psingle').delay().fadeIn();
                            getProject(this.id.split('-')[1]);
                        });

                    },
                    error: function(error)
                    {
                        notify(error.message, "alert", 3);
                    }
                });


            }
        }
    );



    var cd = moment(CU.get("createdAt")).format("LL");
    //console.log(cd);
    $('#cucd').html(cd);

    if (CU.get("type") == 3)
    {
        otherinv(3);
    }
    else
    {
        $('#oinv').hide();
    }

}

function reportstatus(obj2)
{
    //$("#ar").slideDown();
    console.log(obj2)
        //console.log(cpObj.get("name"));
    $('#lsv').html("In progress").addClass('yc').removeClass('gc');
    $('#tsv').html("In progress").addClass('yc').removeClass('gc');
    $('#fsv').html("In progress").addClass('yc').removeClass('gc');
    $('#rsv').html("In progress").addClass('yc').removeClass('gc');
    $('#lsvr').html("");
    $('#tsvr').html("");
    $('#fsvr').html("");
    $('#rsvr').html("");
    // console.log(cpObj);
    // var rpts = Parse.Object.extend("Report");
    // var query = new Parse.Query(rpts);
    // query.equalTo("project", obj2);
    // query.first(
    // {
    //     success: function(result)
    //     {
    //         // The count request succeeded. Show the count
    //         //alert("Sean has played " + count + " games");
    //         if(result)
    //         {
    //             console.log("Count "+result);

    //         }
    //         else
    //         {
    //              $('#ar').hide();
    //         }
    //     },
    //     error: function(error)
    //     {
    //         notify(error.message, "alert", 3);
    //     }
    // });
    // query.first({
    //     success: function(result)
    //     {

    //     },
    //     error: function(error)
    //     {
    //         notify(error.message, "alert", 3);
    //     }
    // });
    $('#ar').hide();
    Parse.Cloud.run('getReportForProject',
    {
        projectID: obj2.id
    }).then(
        function(result)
        {
            if (result.length == 0)
            {
                $('#ar').hide();
            }
            else
            {
                $('#ar').show();
                //console.log("REsult"+result);
                for (var i = 0; i < result.length; i++)
                {
                    //console.log(result);

                    var object = result[i];

                    if (object.get("type") == 1)
                    {
                        $('#lsv').html('Done <a href="' + object.get("file").url() + '" download> <i class="icon-download"></i></a>').addClass("gc").removeClass("yc");
                        $('#lsvr').html(moment(object.get("updatedAt")).format("LL"));
                    }
                    else if (object.get("type") == 2)
                    {
                        $('#tsv').html('Done <a href="' + object.get("file").url() + '" download> <i class="icon-download"></i></a>').addClass("gc").removeClass("yc");
                        $('#tsvr').html(moment(object.get("updatedAt")).format("LL"));
                    }
                    else if (object.get("type") == 3)
                    {
                        $('#fsv').html('Done <a href="' + object.get("file").url() + '" download> <i class="icon-download"></i></a>').addClass("gc").removeClass("yc");
                        $('#fsvr').html(moment(object.get("updatedAt")).format("LL"));
                    }
                    else if (object.get("type") == 4)
                    {
                        $('#rsv').html('Done <a href="' + object.get("file").url() + '" download> <i class="icon-download"></i></a>').addClass("gc").removeClass("yc");
                        $('#rsvr').html(moment(object.get("updatedAt")).format("LL"));
                    }

                }
            }
            if (CU.get("type") == 2 && CU.get("subtype") == 3)
            {
                $('#ar').hide();
                $('#approveProject').hide();
            }
        },
        function(error)
        {
            notify(error.message, "alert", 3);
        }
    );
}

function otherinv(num)
{
    $('#oinv').show();
    $('.otherinv').html(loaderxs).removeClass("plist");
    var GameScore3 = Parse.Object.extend("Projects");
    var query3 = new Parse.Query(GameScore3);
    query3.limit(num);
    query3.find(
    {
        success: function(results4)
        {
            if (results4.length == 0)
            {
                $(".otherinv").html('<div class="text-center scolor2">Coming soon</div>');
            }
            $('.otherinv').html("").addClass("plist");
            for (var k = 0; k < results4.length; k++)
            {
                ob = results4[k];
                $('.otherinv').append('<div class="plistli" id="oi-' + ob.id + '"><div class="row collapse"> <div class="small-3 columns"> <img src="../assets/images/project.png"> </div> <div class="small-9 columns"> <div class="s-ws-left-p"> <h5 class="nm">' + ob.get("name") + '</h5> <div class="scolor2 s2"><i class="icon-location"></i>' + ob.get("location") + '</div> <div class="scolor s">Change in price: <span class="gc">-</span></div> </div> </div></div> </div>');

            }
            $('.otherinv .plistli').click(function(e)
            {
                e.preventDefault();
                console.log(this.id.split('-')[1])
                window.location.search = "id=" + this.id.split('-')[1];
                getProject(this.id.split('-')[1]);
            });
        },
        error: function(error) {

        }
    });
}
$(document).ready(function()
{

    if (CU)
    {
        if (window.location.search)
        {
            var objectID = window.location.search.split("=")[1];
            getProject(objectID);
        }
        else
        {
            $('#timelinenav').addClass("active");
            if (CU.get("type") == 1)
            {
                $("#searchnav").show().click();
                $("#genReport").hide();

            }
            else if (CU.get("type") == 2)
            {

                $("#searchnav").show().click();



                if (CU.get("subtype") == 1 || CU.get("subtype") == 2)
                {
                    $("#addTrack").hide();
                    $("#genReport").show();
                    timeline();
                }
                else
                {
                    $("#addTrack").hide();
                    //$("#genReport").hide();

                }
            }
            else
            {
                $("#addTrack").show();
                $("#genReport").hide();
                timeline();

            }


        }

    }
    else
    {
        if (window.location.search)
        {
            var objectID = window.location.search.split("=")[1];
            getProject(objectID);
        }

        $("#genReport").show().html("Order your first report for free");
    }


    //mixpanel.track_forms("#signup", "signup done");
    //mixpanel.track_forms("#psearch", "search done");

});

$('#ebuilder').click(function(e)
{
    e.preventDefault();
    $('#ebname').val(cBuilder.get("name"));
    $('#ebbio').val(cBuilder.get("about"));
    $('#ebcadd').val(cBuilder.get("corpaddress"));
    $('#ebradd').val(cBuilder.get("regaddress"));
    $('#ebweb').val(cBuilder.get("website"));
    $('#ebcin').val(cBuilder.get("cin"));
    $('#ebph').val(cBuilder.get("buildernum"));
    $('#ebmail').val(cBuilder.get("buildermail"));
});

$('#ebuildermodal').submit(function(e)
{
    e.preventDefault();
    loadingButton_id('ebuildermodal .button');
    cBuilder.set("name", $('#ebname').val());
    cBuilder.set("about", $('#ebbio').val());
    cBuilder.set("corpaddress", $('#ebcadd').val());
    cBuilder.set("regaddress", $('#ebradd').val());
    cBuilder.set("website", $('#ebweb').val());
    cBuilder.set("cin", $('#ebcin').val());
    cBuilder.set("buildernum", $('#ebph').val());
    cBuilder.set("buildermail", $('#ebmail').val());
    cBuilder.save(null,
    {
        success: function(gameScore)
        {
            // console.log("Hello");
            notify("Builder updated", "success", 5);

            datatrail("Builder", "Builder Update. Name: " + $('#ebname').val() + ", About: " + $('#ebbio').val() + ", Corpaddress: " + $('#ebcadd').val() + ", Website" + $('#ebweb').val() + ", CIN: " + $('#ebcin').val() + ", Builder No: " + $('#ebph').val() + ", Website: " + $('#ebmail').val());

            $('#builderModal').foundation('reveal', 'close');
            getProject(cpObj.id);
        },
        error: function(gameScore, error)
        {
            notify(error.message, "alert", 3);
            // console.log(error.message)
        }
    });
});

$('#stopclose').click(function()
{
    $('#stop').slideUp(600);
    // $('#pview').delay(300).fadeIn(300);
    // $('#singleview').fadeOut(300).removeClass('small-centered');
    //populateProjects();
    // timeline();
});


$('#psearch').submit(function(e)
{
    e.preventDefault();
    loadingButton_id('psearch .button', 3);
    var GameScore = Parse.Object.extend("Projects");
    var query = new Parse.Query(GameScore);
    query.equalTo("name", $('#stext').val());
    query.first(
    {
        success: function(object)
        {
            if (object)
            {
                getProject(object.id);

                mixpanel.track(
                    "search done",
                    {
                        "entity_name": object.get("name"),
                        "entity_id": object.id

                    }
                );
            }
            else
            {
                notify("Project index not found", "alert", 2);
                $('#timeline').fadeOut();
                $('#search2').slideDown();
                $('#search2name').val($('#stext').val());

                $('#search2form').submit(function(e)
                {
                    loadingButton_id("search2form button");
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    var GameScore = Parse.Object.extend("TempProject");
                    var gameScore = new GameScore();

                    gameScore.set("name", $('#search2name').val());
                    gameScore.set("createdby", CU);

                    gameScore.save(null,
                    {
                        success: function(gameScore)
                        {
                            // Execute any logic that should take place after the object is saved.
                            notify('Your request has been recieved. We will get back to you within 24 hours', 'success', 3);
                            $("#search2").slideUp();
                            timeline();
                        },
                        error: function(gameScore, error)
                        {
                            // Execute any logic that should take place if the save fails.
                            // error is a Parse.Error with an error code and message.
                            notify('Failed to create new object, with error code: ' + error.message, "alert", 3);
                        }
                    });

                });
            }

        },
        error: function(error)
        {
            notify(error.message, "alert", 3);
        }
    });
});

$('input[name=projecttype]').click(function()
{

    if ($(this).val() == 2 || $(this).val() == 3)
    {
        $('#trackFreqwrapper').slideDown();
    }
    else
    {
        $('#trackFreqwrapper').slideUp();
    }
});

$('#newProjectform').submit(function(event)
{
    mixpanel.track(
        "order init",
        {
            "entity_name": cpObj.get("name"),
            "entity_id": cpObj.id
        }
    );
    event.preventDefault();
    loadingButton_id('newProjectform .button');
    //alert('test');

    if (CU.get("type") == 3)
    {

        Parse.Cloud.run('createB2Cproject',
        {
            userID: CU.id,
            projectID: cpObj.id,
            ptype: parseInt($('input[name="projecttype"]:checked').val()),
            bpoc: $('#bpoc').val(),
            bpoctel: parseInt($('#bpoctel').val()),
            trackfreq: parseInt($('#trackFreq').val())
        }).then(

            function(project)
            {
                getProject(cpObj.id);
                mixpanel.track(
                    "order done",
                    {
                        "entity_name": cpObj.get("name"),
                        "entity_id": cpObj.id
                    }
                );
                notify("Project reports initiated", "success", 5);
                $('#genReport').unbind("click").html("<span class='scolor2'>Order ID:</span> #" + project.get("projectId") + ' <span class="s scolor">' + projectstatus(project.get("status")) + '</span>').removeClass("button");
                $('#newProjectform').slideUp();
                $('#tlist').html('');
                $(function()
                {
                    $('#overlay').fadeOut();
                    $("#newprjform")
                        .css(
                        {
                            'position': 'relative'
                        });

                    $("#newprjpanel").css('position', 'relative');

                });
                $('#timelinenav').show();
                $('#logout').show();
                showeta(project);

            },
            function(error)
            {
                console.log(error.message);
            }
        );
    }
    else
    {
        var Project = Parse.Object.extend("Project");
        var project = new Project();

        //For docsArray
        var projectdocs = Parse.Object.extend("ProjectDocs");
        var query = new Parse.Query(projectdocs);
        query.equalTo("projects", cpObj);

        project.set("projects", cpObj);
        project.set("type", parseInt($('input[name="projecttype"]:checked').val()));
        project.set("status", 1);
        project.set("creator", CU);
        project.set("approved", -1);
        if (CU.get("type") == 2)
        {
            project.set("company", CU.get("company"));
        }
        //project.set("projectId", Math.floor((Math.random() * 999) + 100));

        if (CU.get("type") == 2)
        {
            project.set("cpoc", $('#cpoc').val());
        }

        project.set("bpoc", $('#bpoc').val());
        project.set("bpoctel", parseInt($('#bpoctel').val()));
        project.set("trackfreq", parseInt($('#trackFreq').val()));
        project.set("paid", 1);
        project.set("ctype", CU.get("type"));
        var docsArray = [];

        Parse.Cloud.run('storeProjectDocs',
        {
            projectID: cpObj.id
        }).then(
            function(results)
            {

                if (results.length > 0)
                {
                    project.relation("projectDocs").add(results);
                }
                project.save(null,
                {
                    success: function(project)
                    {

                        notify("Project reports initiated", "success", 5);
                        $('#genReport').unbind("click").html("<span class='scolor2'>Order ID:</span> #" + project.get("projectId") + ' <span class="s scolor">' + projectstatus(project.get("status")) + '</span>').removeClass("button");
                        $('#newProjectform').slideUp();
                        getProject(cpObj.id);
                        showeta(project);
                        $('#tlist').html('');
                        $(function()
                        {
                            $('#overlay').fadeOut();
                            $("#newprjform")
                                .css(
                                {
                                    'position': 'relative'
                                });

                        });

                    },
                    error: function(project, error)
                    {
                        notify('Failed to create new object, with error code: ' + error.message, 'error', 5);

                    }
                });
            },
            function(error)
            {
                console.log("Error: " + error);
            }
        );
    }
});
/*
function pslistp()
{
    mixpanel.track(
        "search init"
    );

    $('#psearch .button').addClass("disabled").val("Initializing");
    var plist2 = Parse.Object.extend("Projects");
    var query2 = new Parse.Query(plist2);
    query2.limit(1000);
    query2.find(
    {
        success: function(results)
        {
            mixpanel.track(
                "search populate done"
            );
            for (var i = 0; i < results.length; i++)
            {
                var object = results[i];
                $('#sList').append('<option value="' + object.get("name") + '"></option>');


            }
            $('#psearch .button').removeClass("disabled").val("Search");
        },
        error: function(error)
        {
            alert("Error: " + error.code + " " + error.message);
        }
    });

}
*/
function populatebottombar()
{
    if (CU.get('type') != 1)
    {
        Parse.Cloud.run('getTrackedProject',
        {
            "userID": CU.id
        }).then(
            function(results)
            {

                $('#userprojs').html("");
                for (var i = 0; i < results.length; i++)
                {
                    var object = results[i];
                    console.log("name" + object.get("projects").get('name'));
                    if (object.get("projects").get("pic"))
                    {
                        $('#userprojs').append('<div id="p-' + object.get("projects").id + '" class="cs"><div class="small-1 columns text-center" style="margin-right:-0.9375rem"><img src="' + object.get("projects").get("pic").url() + '"></div><div class="scolor small-2 columns end">' + object.get("projects").get("name") + '</div></div></div>');
                    }
                    else
                    {
                        $('#userprojs').append('<div id="p-' + object.get("projects").id + '" class="cs"><div class="small-1 columns text-center" style="margin-right:-0.9375rem"><img src="../assets/images/project.png"></div><div class="scolor small-2 columns end">' + object.get("projects").get("name") + '</div></div></div>');
                    }
                }
                if (results.length > 0)
                {
                    $('#projbottom').delay().fadeIn().slideDown();
                }
                $('#userprojs .cs').click(function(e)
                {

                    e.preventDefault();
                    var cproj = this.id.split('-')[1];
                    console.log(cproj);
                    getProject(cproj);
                });
            },
            function(error)
            {
                console.log("Error: " + error.code + " " + error.message);
            }
        );
    }

}


if (CU)
{
    if (CU.get("type") == 2)
    {
        $('#projbottom').hide();
        // populatebottombar();
    }
    else
    {
        populatebottombar();
    }

}




var projectdoc;

function populateProjDocs()
{
    $('.ullist').html(loaders);

    Parse.Cloud.run('getProjectId',
    {
        projectID: cpObj.id
    }).then(
        function(project)
        {
            Parse.Cloud.run('getProjectDocs',
            {
                projectID: project.id
            }).then(
                function(results)
                {
                    $('#uplist').html('');
                    $('#ullist').html('');
                    $('#uclist').html('');
                    for (var i = 0; i < results.length; i++)
                    {
                        projectdoc = results[i];
                        var query = new Parse.Query("Docs");
                        query.equalTo("objectId", results[i].get("docs").id);

                        query.first(
                        {
                            success: function(result)
                            {
                                dname = result.get("name");
                                dtype = result.get("group");
                                // doc = result;
                                if (dtype == 1)
                                {
                                    $('#uplist').append('<div class="row"><div class="small-10 columns xs-ws-top"><label for="id-' + result.id + '">' + dname + '</label></div><div class="small-2 columns xs-ws-top text-right"></div></div>');
                                    $('#uplist').append('<div class="row hide" id="ud-' + result.id + '"><div class="small-12 columns"></div></div>');

                                }
                                else if (dtype == 2)
                                {
                                    $('#ullist').append('<div class="row"><div class="small-10 columns xs-ws-top"><label for="id-' + result.id + '">' + dname + '</label></div><div class="small-2 columns xs-ws-top text-right"></div></div>');
                                    $('#ullist').append('<div class="row hide" id="ud-' + result.id + '"><div class="small-12 columns"></div></div>');

                                }
                                else if (dtype == 3)
                                {
                                    $('#uclist').append('<div class="row"><div class="small-10 columns xs-ws-top"><label for="id-' + result.id + '">' + dname + '</label></div><div class="small-2 columns xs-ws-top text-right"></div></div>');
                                    $('#uclist').append('<div class="row hide" id="ud-' + result.id + '"><div class="small-12 columns"></div></div>');

                                }

                                return result;
                            },
                            error: function(error)
                            {
                                notify(error.message, "alert", 3);
                            }
                        }).then(function(result)
                        {
                            $('#ud-' + result.id).append('<div class="small-6 columns s end scolor2 xs-ws-top"><div class="tbtn"><div>' + projectdoc.get("file").name().split("-").pop() + ' ' + '<a href=' + projectdoc.get("file").url() + ' download class="right"><i class="icon-download gc"></i></a></div><div class="s2 scolor3">' + moment(projectdoc.get("createdAt")).format("LL") + '</div></div></div>');
                            $('#ud-' + result.id).slideDown();
                        }, function(error) {});

                    }
                }
            );
            if (project.get('paid') != 1)
            {
                $('#ulist').append('<div class="overlay"><div class="b-ws-top f-1-5x text-center scolor3">You have not paid for the project yet</div></div>');
            }
        },
        function(error)
        {
            notify(error.message, "alert", 3);
        }
    );
}

$('#uploaddocsbtn2').click(function()
{
    populateProjDocs();
});
$('#addTrack').click(function(e)
{

    //console.log("Add Track is also getting called");
    e.preventDefault();
    // $('#trackFreq').slideDown();

    // if (!$('#trackFreq').val())
    // {
    //     notify("Please enter tracking frequency", "alert", 5);

    // }
    // else
    // {
    loadingButton_id('addTrack');
    addTracking();
});




function addTracking()
{
    if (CU.get("type") == 1)
    {
        var GameScore = Parse.Object.extend("ProjectsVerification");
        var gameScore = new GameScore();

        gameScore.set("verifiedby", CU);
        gameScore.set("projects", cpObj);


        gameScore.save(null,
        {
            success: function(object)
            {
                notify("Project verified successfully by" + CU.get("uname"), "success", 5);
                getVerification();
            },
            error: function(gameScore, error)
            {
                notify('Failed to create new object, with error code: ' + error.message, "alert", 3);
            }
        });
    }
    else
    {
        mixpanel.track(
            "tracking init",
            {
                "entity_name": cpObj.get("name"),
                "entity_id": cpObj.id
            }
        );
        var GameScore = Parse.Object.extend("Project");
        var gameScore = new GameScore();

        gameScore.set("type", 10);
        gameScore.set("projects", cpObj);
        gameScore.set("creator", CU)
        gameScore.set("approved", -1);
        gameScore.set("status", -1);
        gameScore.set("trackfreq", parseInt($('#trackFreq').val()));
        gameScore.set("paid", 0);

        gameScore.save(null,
        {
            success: function(object)
            {
                //  populatebottombar();
                mixpanel.track(
                    "tracking done",
                    {
                        "entity_name": cpObj.get("name"),
                        "entity_id": cpObj.id
                    }
                );
                if (object.get("projects").get("pic"))
                {
                    $('#userprojs').append('<div id="p-' + object.id + '" class="cs"><div class="small-1 columns text-center" style="margin-right:-0.9375rem"><img src="' + object.get("projects").get("pic").url() + '"></div><div class="scolor small-2 columns end">' + object.get("projects").get("name") + '</div></div></div>')

                }
                else
                {
                    $('#userprojs').append('<div id="p-' + object.id + '" class="cs"><div class="small-1 columns text-center" style="margin-right:-0.9375rem"><img src="../assets/images/project.png"></div><div class="scolor small-2 columns end">' + object.get("projects").get("name") + '</div></div></div>')

                }
                $('#addTrack').unbind("click").html('<div class="scolor2">Following <i class="icon-check-circle gc"></i></div><hr>').removeClass("button");
                $("#genReport").slideDown();

                $('#pname').position();
                $('#trackFreq').slideUp();

            },
            error: function(gameScore, error)
            {
                notify('Failed to create new object, with error code: ' + error.message, "alert", 3);
            }
        });
    }


}

$("#editOverview").click(function()
{


    $('#inputpricerange').val(cpObj.get("pricerange"));
    $("#inputimageurl").val(cpObj.get("image"));
    // var units = cpObj.get("units");
    // var towers = cpObj.get("towers");
    $('#inputunits').val(cpObj.get("units"));
    $('#inputtowers').val(cpObj.get("towers"));
    $('#inputfloors').val(cpObj.get("floors"));
    $('#inputarea').val(cpObj.get("area"));
    $('#inputcoverage').val(cpObj.get("coverage"));
    $('#inputp').val(moment(cpObj.get('posessiondate')).format("YYYY-MM-DD"));

    $('#inputbuilder').val(cpObj.get("builder").get("name"));

    if (cpObj.get("type") == 1)
    {
        $('#inputtype').val("Residential");
    }
    else if (cpObj.get("type") == 2)
    {
        $('#inputtype').val("Commercial");

    }

    $("#inputstatus").val(pstatus(cpObj.get("status")));

    Parse.Cloud.run('getBuilders',
    {}).then(
        function(builders)
        {
            for (var i = 0; i < builders.length; i++)
            {
                $('#builderList').append('<option value="' + builders[i] + '"></option>');

            }
        },
        function(error)
        {
            notify("Error: " + error.code + " " + error.message, "alert", 5);
        }
    );

});



function statustonumber(word)
{

    if (word === "Pre Launch")
    {
        return 1
    }
    if (word === "Launched")
    {
        return 2
    }
    if (word === "Under Construction")
    {
        return 3
    }
    if (word === "Ready to move in")
    {
        return 4
    }

}
$("#editProject").click(function()
{


    $('#aboutproject').val(cpObj.get("about"));
    $('#inputpph').val(cpObj.get('pph'));
    $('#inputlaunch').val(moment(cpObj.get("launchdate")).format("YYYY-MM-DD"));

    $('#inputcustomercare').val(cpObj.get("customernum"));

    $('#update-project').submit(function(e)
    {
        loadingButton_id("update-project .button");
        e.preventDefault();
        cpObj.set("about", $('#aboutproject').val());


        cpObj.set("pph", parseInt($("#inputpph").val()));
        cpObj.set("launchdate", new Date($('#inputlaunch').val()));

        cpObj.set("customernum", parseInt($('#inputcustomercare').val()));

        cpObj.save(null,
        {
            success: function(cpObj)
            {
                $('#update-project').foundation('reveal', 'close');
                datatrail("Projects", "Project Update. About: " + $('#aboutproject').val() + ", PPH: " + $("#inputpph").val() + ", Launch Date: " + $('#inputlaunch').val() + ", Customer Number: " + $('#inputcustomercare').val());

                getProject(cpObj.id);
            },
            error: function(report, error)
            {
                notify(error.message, "serror", 3);
            }

        });
    });

});

var builderobject;

$('#update-overview').submit(function(e)
{
    loadingButton_id("update-overview .button");
    e.preventDefault();



    cpObj.set("units", parseInt($("#inputunits").val()));
    cpObj.set("towers", parseInt($("#inputtowers").val()));
    cpObj.set("floors", parseInt($("#inputfloors").val()));
    cpObj.set("area", parseInt($("#inputarea").val()));
    cpObj.set("coverage", parseInt($("#inputcoverage").val()));
    cpObj.set("posessiondate", new Date($("#inputp").val()));
    cpObj.set("image", $("#inputimageurl").val());
    if ($('#inputtype').val() === "Residential")
    {
        cpObj.set("type", 1);
    }
    else if ($('#inputtype').val() === "Commercial")
    {
        cpObj.set("type", 2);
    }

    cpObj.set("status", statustonumber($("#inputstatus").val()));


    var GameScore = Parse.Object.extend("Builder");
    var query = new Parse.Query(GameScore);
    query.equalTo("name", $('#inputbuilder').val());

    Parse.Cloud.run('assignBuilderToProjects',
    {
        projectID: cpObj.id,
        builderName: $('#inputbuilder').val()
    }).then(
        function(result)
        {
            if (result)
            {
                // The builder exists and has been assigned to the cpObj
                $('#update-overview').foundation('reveal', 'close');
                datatrail("Projects", "Overview Update. Units: " + $("#inputunits").val() + ", Towers: " + $("#inputtowers").val() + ", Area: " + $("#inputarea").val() + ", Coverage: " + $("#inputcoverage").val() + ", Possesion Date: " + $("#inputp").val() + ", Project Type:" + $('#inputtype').val() + ", Status: " + $("#inputstatus").val() + ", Builder: " + $('#inputbuilder').val());
                getProject(cpObj.id);
            }
            else
            {
                // The builder did not exists, had been created and assigned to cpObj

                notify("New Builder created with name:" + $('#inputbuilder').val() + " . Please fill in the rest of the details using the edit Builder", "success", 5);
                datatrail("Projects, Builder", "Overview Update + New Builder Created. New Builder: " + $('#inputbuilder').val() + "Units: " + $("#inputunits").val() + ", Towers: " + $("#inputtowers").val() + ", Area: " + $("#inputarea").val() + ", Coverage: " + $("#inputcoverage").val() + ", Possesion Date: " + $("#inputp").val() + ", Project Type:" + $('#inputtype').val() + ", Status: " + $("#inputstatus").val());

                $('#update-overview').foundation('reveal', 'close');
                getProject(cpObj.id);

            }
        },
        function(error)
        {
            notify(error.message, "serror", 3);
        }
    );
    // query.first(
    // {
    //     success: function(result)
    //     {
    //
    //         if (result)
    //         {
    //             cpObj.set("builder", result);
    //
    //             cpObj.save(null,
    //             {
    //                 success: function(cpObj)
    //                 {
    //                 },
    //                 error: function(report, error)
    //                 {
    //                     notify(error.message, "serror", 3);
    //                 }
    //
    //             });
    //         }
    //         else
    //         {
    //
    //             var cBobj = new GameScore();
    //             console.log("Not found");
    //
    //             cBobj.save(null,
    //             {
    //                 success: function(cBobj)
    //                 {
    //                     cpObj.set("builder", cBobj);
    //                     cpObj.save(null,
    //                     {
    //                         success: function(cpObj)
    //                         {
    //                         },
    //                         error: function(report, error)
    //                         {
    //                             notify(error.message, "serror", 3);
    //                         }
    //
    //                     });
    //
    //
    //                 },
    //                 error: function(report, error)
    //                 {
    //                     notify(error.message, "serror", 3);
    //                 }
    //
    //             });
    //
    //         }
    //
    //     },
    //     error: function(error)
    //     {
    //         notify("Error: " + error.code + " " + error.message, "alert", 5);
    //     }
    // });

});


$("#editLocation").click(function()
{

    $('#latitude').val(cpObj.get("locationgp").latitude);
    $('#longitude').val(cpObj.get("locationgp").longitude);


});


$('#new-location').submit(function(e)
{
    loadingButton_id("new-location .button");
    e.preventDefault();
    // var l = cpObj.locationgp;
    var la = parseFloat($("#latitude").val());
    var lo = parseFloat($("#longitude").val());
    var point = new Parse.GeoPoint(
    {
        latitude: la,
        longitude: lo
    });

    // console.log(point);
    cpObj.set("locationgp", point);
    // l.set("latitude", parseInt($("#latitude").val()));
    // l.set("longitude", parseInt($("#longitude").val()));
    cpObj.save(null,
    {
        success: function(cpObj)
        {
            $('#new-location').foundation('reveal', 'close');
            datatrail("Projects", "Location Update. Latitude: " + $("#latitude").val() + ", Longitude: " + $("#longitude").val());

            getProject(cpObj.id);
        },
        error: function(report, error)
        {
            notify(error.message, "serror", 3);
        }

    });
});

$("#uploadprojectpic").click(function(event)
{
    event.preventDefault();
    loadingButton_id("markdone")
    $('#pb-' + cpObj.id).slideDown();
    $('#pb-' + cpObj.id + ' .meter').animate(
    {
        width: "80%"
    }, 25000, 'swing');
    imageSave(cpObj);

});

$("#uploadBrochure").click(function(event)
{
    event.preventDefault();
    loadingButton_id("markdone")
    $('#pb-' + cpObj.id).slideDown();
    $('#pb-' + cpObj.id + ' .meter').animate(
    {
        width: "80%"
    }, 25000, 'swing');
    brochureUpload(cpObj);

});

function imageSave(rObj)
{
    // console.log(reportfile);
    var filextension = reportfile.name.split(".").pop();
    // console.log(filextension);
    var parsefile = new Parse.File(rObj.get("name") + "." + filextension, reportfile, " image/*");
    parsefile.save().then(function()
    {

        cpObj.set("coverimage", parsefile);
        cpObj.save(null,
        {
            success: function(result)
            {
                event.stopImmediatePropagation();
                $('#pb-' + cpObj.id + ' .meter').stop().animate(
                {
                    width: "100%"
                }, 200, function()
                {
                    $('#pb-' + cpObj.id).slideUp();
                });
                $('#pb-' + cpObj.id + ' .progress').addClass('success');
                cpObj.save(null,
                {
                    success: function(result)
                    {
                        event.stopImmediatePropagation();
                        notify("Image submitted", "success", 5);
                        $('#uploadprojectpic').fadeOut();
                        getProject(cpObj.id);
                    },
                    error: function(comment, error)
                    {
                        notify(error.message, "alert", 3);
                    }
                });
            },
            error: function(comment, error)
            {
                notify(error.message, "alert", 3);
            }
        });

    });
}

function brochureUpload(rObj)
{
    // console.log(reportfile);
    var filextension = reportfile.name.split(".").pop();
    // console.log(filextension);
    var parsefile = new Parse.File(rObj.get("name") + "." + filextension, reportfile, "application/pdf");
    parsefile.save().then(function()
    {

        cpObj.set("brochure", parsefile);
        cpObj.save(null,
        {
            success: function(result)
            {
                event.stopImmediatePropagation();
                $('#pb-' + cpObj.id + ' .meter').stop().animate(
                {
                    width: "100%"
                }, 200, function()
                {
                    $('#pb-' + cpObj.id).slideUp();
                });
                $('#pb-' + cpObj.id + ' .progress').addClass('success');
                cpObj.save(null,
                {
                    success: function(result)
                    {
                        event.stopImmediatePropagation();
                        notify("Brochure submitted", "success", 5);
                        $('#uploadBrochure').fadeOut();
                        getProject(cpObj.id);
                    },
                    error: function(comment, error)
                    {
                        notify(error.message, "alert", 3);
                    }
                });
            },
            error: function(comment, error)
            {
                notify(error.message, "alert", 3);
            }
        });

    });
}

function updateLocation(location)
{

    var new_location = location.split(":");
    cpObj.set("location", new_location[0]);

    cpObj.save(null,
    {
        success: function(result)
        {
            notify("Location Updated", "success", 5);
            getProject(cpObj.id);

        },
        error: function(comment, error)
        {
            notify(error.message, "alert", 3);
        }
    });

}




function datatrail(classupdate, comment)
{
    var GameScore = Parse.Object.extend("DataTrail");
    var gameScore = new GameScore();

    gameScore.set("user", CU);
    gameScore.set("projects", cpObj);
    gameScore.set("comment", comment);
    gameScore.set("class", classupdate);

    gameScore.save(null,
    {
        success: function(gameScore) {

        },
        error: function(gameScore, error)
        {
            console.log('Failed to create new object, with error code: ' + error.message);
        }
    });
}

function search_intermediate()
{


    var first, second, counter = 0,
        third;
    window.setInterval(function()
    {
        first = $("#stext").val();
        window.setTimeout(function()
        {
            second = $("#stext").val();

        }, 30);
        if (first == second && first != third && first)
        {
            //$("#demo1").text("Matched");
            loadingButton_id_stop("project_search", "Search");
            // console.log("stop");
            third = first;
            counter++;
            //if(counter==1){
            // console.log("run");
            Parse.Cloud.run("Search",
            {
                "word": first
            },
            {

                success: function(result)
                {
                    var results = [];
                    for (var j = 0; j < result.length; j++)
                    {
                        if (result[j])
                        {
                            results.push(result[j]);
                        }
                    }
                    $("#stext").autocomplete(
                    {
                        source: function(req, response)
                        {
                            var result = $.ui.autocomplete.filter(results, req.term);

                            response(result.slice(0, 50));
                        }
                    });
                    //console.log(result);
                },
                error: function(error)
                {
                    $("#stext").text(error.message);

                }
            });
            //}
        }
        else if (!first && first == second)
        {
            $("#stext").text("");
            loadingButton_id_stop("project_search", "Search");
        }
        else if (first != second)
        {
            loadingButton_id("project_search", 10);
            // console.log("process");
        }

    }, 60);

}

function showeta(object)
{
    $('#prjeta').slideDown();
    //console.log(object.createdAt);
    var ctimetaken = 3;
    var etadate = moment(object.createdAt).add(ctimetaken, 'd');
    //console.log(tempdate);
    $('#eeta').html(etadate.format("LL"));
    $('#eetar').html(etadate.fromNow(true));
    var etavar = etadate.fromNow(true).toString().split(" ")[0];
    //console.log(etavar)
    if (etavar == "a")
    {
        etavar = 1;
    }
    var eta = parseInt(etavar) / ctimetaken;
    var eta1 = 1 - eta;

    if (eta1 == 0)
    {
        eta1 = eta1 + 0.05;
    }
    var eta2 = eta1 * 100;
    if (eta2 > 100)
    {
        eta2 = 100;
    }
    console.log(eta2 + " " + eta1);
    $("#etapb .meter").animate(
    {
        width: eta2 + "%"
    }, 2500, 'swing');

    //console.log(eta)
    if (moment().isAfter(etadate))
    {
        console.log("test")
        $('#etapb').addClass("secondary").removeClass("success");
        $('#eetar').html('<a href="mailto:hi@houseafic.com?Subject=Order%20overdue" target="_top" class="button tiny m-ws-left">Contact Support</a>')

    }
}
