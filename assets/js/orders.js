function populateProjects(sts)
{
    $('#plist').html(loaders).removeClass('plist');

    //query.include("Project");
    if (CU.get("type") == 1)
    {
        var req = {
            type: CU.get("type"),
            status: sts,
            company: CU.get("company")
        }

        //since admin's company is undefined
    }
    else if (CU.get("type") == 2)
    {
        var req = {
            type: CU.get("type"),
            status: sts,
            company: CU.get("company").id
        }

    }
    else
    {
        var req = {
            type: CU.get("type"),
            status: sts,
            company: CU.get("company")
        }
    }


    Parse.Cloud.run('getStatusSpecificProject', req).then(

        function(results)
        {
            $('#plist').html('').addClass('plist');
            if (results.length == 0)
            {
                $('#plist').html('<div class="text-center scolor2 b-ws-top">No projects yet. Why dont you create some</div>').removeClass('plist');
            }
            else
            {
                $('#plist').addClass('plist');
            }
            for (var i = 0; i < results.length; i++)
            {
                var object = results[i];
                var pobj = results[i].get("projects");
                //      console.log(pobj);
                if (object.get("approved") == 1)
                {
                    $('#plist').append('<div class="plistli" id="p-' + object.id + '"><h5 class="nm"><small>#' + object.get("projectId") + '</small> ' + pobj.get("name").split("-")[0] + '<i class="icon-check-circle gc right"></i></h5><div class="row collapse"><div class="small-6 columns s scolor2">' + moment(object.get("createdAt")).format("LL") + '</div><div class="small-6 columns s text-right scolor2">' + ptype(object.get("type")) + '</div></div>');

                }
                else if (object.get("approved") == 0)
                {
                    $('#plist').append('<div class="plistli" id="p-' + object.id + '"><h5 class="nm"><small>#' + object.get("projectId") + '</small> ' + pobj.get("name").split("-")[0] + '<i class="icon-warning yc right"></i></h5><div class="row collapse"><div class="small-6 columns s scolor2">' + moment(object.get("createdAt")).format("LL") + '</div><div class="small-6 columns s text-right scolor2">' + ptype(object.get("type")) + '</div></div>');
                }
                else
                {
                    $('#plist').append('<div class="plistli" id="p-' + object.id + '"><h5 class="nm"><small>#' + object.get("projectId") + '</small> ' + pobj.get("name").split("-")[0] + '</h5><div class="row collapse"><div class="small-6 columns s scolor2">' + moment(object.get("createdAt")).format("LL") + '</div><div class="small-6 columns s text-right scolor2">' + ptype(object.get("type")) + '</div></div>');

                }
            }
            $('#plist .plistli').click(function(event)
            {

                $('html, body').animate(
                {
                    'scrollTop': $(".t-nav").position().top
                });

                $('.t-nav').fadeIn();
                $('#tlist').html(loaders);
                cproject = this.id.split('-')[1];
                // console.log(cproject)
                $('.plistli').removeClass('active');
                $('#p-' + cproject).addClass('active');

                if (CU.get("type") == 1)
                {
                    $('#a1').fadeIn();
                }





                var Pjt = Parse.Object.extend("Project");
                var query2 = new Parse.Query(Pjt);
                //console.log(cproj)
                query2.include("projects");
                query2.get(cproject,
                {
                    success: function(result)
                    {
                        cpObj = result;
                        if (CU.get("type") == 1)
                        {
                            if (cpObj.get("status") == 1)
                            {
                                $('#tlist').html('<div class="text-center b-ws-top"><div class="button tiny success">Start order</div></div>');
                            }
                            else
                            {
                                populateTasks(cpObj, 1);
                            }

                        }
                        else if (CU.get("type") == 2 || 3)
                        {
                            populateProjectdetails();
                        }
                        else if (CU.get("type") == 4)
                        {
                            if (cpObj.get("status") == 1)
                            {
                                $('#tlist').html('<div class="text-center b-ws-top"><div class="button tiny success">Start order</div></div>');
                            }
                            else
                            {
                                //populateTasks(cpObj, 1, 2);
                            }
                        }

                        $("#tlist .button").click(function()
                        {

                            cpObj.set("status", 2);
                            cpObj.save(null,
                            {
                                success: function(gameScore)
                                {
                                    notify("Started Order", "success", 5);
                                    populateTasks(cpObj, 1);
                                },
                                error: function(gameScore, error)
                                {
                                    notify(error.message, "alert", 3);
                                }
                            });
                        });


                    },
                    error: function(object, error)
                    {
                        notify(error.message, "alert", 3);
                    }
                });

            });
        },
        function(error)
        {
            notify("Error: " + error.code + " " + error.message, "alert", 3);
        }
    );
}

populateProjects();
$('#ordersnav').addClass("active");

var assignedobj = Parse.Object.extend("User");
var query = new Parse.Query(assignedobj);


query.equalTo("type", 1)
query.equalTo("subtype", 1)
query.first(
{
    success: function(gameScore)
    {

        adminUser = gameScore;
    },
    error: function(object, error)
    {
        notify(error.message, "alert", 3);
    }
});


$('.p-nav dd').click(function()
{
    $(".active").removeClass("active");
    $(this).addClass("active");
});
$('.t-nav dd').click(function()
{
    $(".active").removeClass("active");
    $(this).addClass("active");
});

$('#searchbtn').click(function(e)
{
    e.preventDefault();
    $('#stop').slideDown(500);
    pslist();
});
$('#stopclose').click(function()
{
    $('#stop').slideUp(600);
    $('#pview').delay(300).fadeIn(300);
    $('#singleview').fadeOut(300).removeClass('small-centered');
    populateProjects();
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
            //console.log(object);
            loadingButton_id_stop("psearch .button", "search");
            var GameScore2 = Parse.Object.extend("Project");
            var query2 = new Parse.Query(GameScore2);
            query2.equalTo("company", CU.get("company"));
            query2.equalTo("projects", object);
            query2.include("projects");
            query2.first(
            {
                success: function(object2)
                {
                    cpObj = object2;
                    //console.log(cpObj);
                    cproject = object2.id;
                    $('#pview').fadeOut();
                    $('#singleview').addClass('small-centered');
                    populateProjectdetails();
                },
                error: function(error)
                {
                    notify(error.message, "alert", 3);
                }
            });
        },
        error: function(error)
        {
            notify(error.message, "alert", 3);
        }
    });
});

$('#p-progress').click(function(e)
{
    e.preventDefault();
    populateProjects(2);
});
$('#p-done').click(function(e)
{
    e.preventDefault();
    populateProjects(3);
});

$('#p-all').click(function(e)
{
    e.preventDefault();
    populateProjects();
});
$('#t-you').click(function(e)
{
    e.preventDefault();
    if (cpObj.get("status") == 1)
    {
        $('#tlist').html('<div class="text-center b-ws-top"><div class="button tiny success">Start order</div></div>');
    }
    else
    {
        populateTasks(cpObj, 1);
    }
});
$('#t-agency').click(function(e)
{
    e.preventDefault();
    if (cpObj.get("status") == 1)
    {
        $('#tlist').html('<div class="text-center b-ws-top"><div class="button tiny success">Start order</div></div>');
    }
    else
    {
        populateTasks(cpObj, 2);
    }
});
$('#t-allp').click(function(e)
{
    e.preventDefault();
    if (cpObj.get("status") == 1)
    {
        $('#tlist').html('<div class="text-center b-ws-top"><div class="button tiny success">Start order</div></div>');
    }
    else
    {
        populateTasks(cpObj);
    }
});

$('#t-progress').click(function(e)
{
    e.preventDefault();
    if (cpObj.get("status") == 1)
    {
        $('#tlist').html('<div class="text-center b-ws-top"><div class="button tiny success">Start order</div></div>');
    }
    else
    {
        populateTasks(cpObj, 1, 2);
    }
});
$('#t-done').click(function(e)
{
    e.preventDefault();
    if (cpObj.get("status") == 1)
    {
        $('#tlist').html('<div class="text-center b-ws-top"><div class="button tiny success">Start order</div></div>');
    }
    else
    {
        populateTasks(cpObj, 2, 3);
    }
});
$('#t-all').click(function(e)
{
    e.preventDefault();
    if (cpObj.get("status") == 1)
    {
        $('#tlist').html('<div class="text-center b-ws-top"><div class="button tiny success">Start order</div></div>');
    }
    else
    {
        populateTasks(cpObj);
    }
});

function populateDocs(typ)
{
    $('#ullist').html(loaders);
    $('#uplist').html("");
    $('#uclist').html("");
    var docs = Parse.Object.extend("Docs");
    var query2 = new Parse.Query(docs);
    //query.equalTo("playerName", "Dan Stemkoski");

    query2.find(
    {
        success: function(results)
        {
            $('#uplist').html('');
            $('#ullist').html('');
            $('#uclist').html('');
            for (var i = 0; i < results.length; i++)
            {
                var object = results[i];
                if (object.get('group') == 1)
                {
                    //$('#tplist').append('<div class="row"><div class="small-10 columns xs-ws-top"><label for="id-'+object.id+'">'+object.get("name")+'</label></div><div class="small-2 columns xs-ws-top text-right"><input id="id-'+object.id+'" type="checkbox" name="fu" class="nm chl1"></div></div>');
                    $('#uplist').append('<div class="row" id="lclick-' + object.id + '""><div class="small-10 columns xs-ws-top"><label for="u-' + object.id + '">' + object.get("name") + '</label></div><div class="small-2 columns xs-ws-top text-right ipt"><label for="u-' + object.id + '"><a><i class="icon-upload"></i></a></label><input id="u-' + object.id + '" name="fu" type="file" style="display:none;" accept="application/pdf, image/*" class="nm" /></div></div>');
                    $('#uplist').append('<div class="row hide" id="pb-' + object.id + '"><div class="progress stripes small-12 radius"><span class="meter" style="width: 0%"></span></div></div>');

                    $('#uplist').append('<div class="row collapse hide" id="ud-' + object.id + '"></div>');

                    $(function()
                    {
                        var tobj1 = object;
                        $('#u-' + object.id).bind("change", function(e)
                        {
                            var files = e.target.files || e.dataTransfer.files;
                            file = files[0];
                            //console.log(temp1.id)
                            $('#u-' + tobj1.id).fadeOut();
                            $('#pb-' + tobj1.id).slideDown();
                            $('#pb-' + tobj1.id + ' .meter').animate(
                            {
                                width: "80%"
                            }, 25000, 'swing');
                            // console.log(cproject)
                            fileSave(tobj1, cpObj);
                        });
                    });

                }
                else if (object.get('group') == 2)
                {
                    // $('#tllist').append('<div class="row"><div class="small-10 columns xs-ws-top"><label for="id-'+object.id+'">'+object.get("name")+'</label></div><div class="small-2 columns xs-ws-top text-right"><input id="id-'+object.id+'" type="checkbox" name="fu" class="nm chl2"></div></div>');
                    $('#ullist').append('<div class="row" id="lclick-' + object.id + '""><div class="small-10 columns xs-ws-top"><label for="u-' + object.id + '">' + object.get("name") + '</label></div><div class="small-2 columns xs-ws-top text-right ipt"><label for="u-' + object.id + '"><a><i class="icon-upload"></i></a></label><input name="fu" id="u-' + object.id + '" type="file" style="display:none;" accept="application/pdf, image/*" class="nm" /></div></div>');
                    $('#ullist').append('<div class="row hide" id="pb-' + object.id + '"><div class="progress stripes small-12 radius"><span class="meter" style="width: 0%"></span></div></div>');
                    $('#ullist').append('<div class="row hide" id="ud-' + object.id + '"><div class="small-12 columns"></div></div>');

                    $(function()
                    {
                        var tobj1 = object;
                        $('#u-' + object.id).bind("change", function(e)
                        {
                            var files = e.target.files || e.dataTransfer.files;
                            file = files[0];
                            //console.log(temp1.id)
                            $('#u-' + tobj1.id).fadeOut();
                            $('#pb-' + tobj1.id).slideDown();
                            $('#pb-' + tobj1.id + ' .meter').animate(
                            {
                                width: "80%"
                            }, 25000, 'swing');
                            // console.log(cproject)
                            fileSave(tobj1, cpObj);
                        });
                    });
                }
                else if (object.get('group') == 3)
                {
                    // $('#tclist').append('<div class="row"><div class="small-10 columns xs-ws-top"><label for="id-'+object.id+'">'+object.get("name")+'</label></div><div class="small-2 columns xs-ws-top text-right"><input id="id-'+object.id+'" type="checkbox" name="fu" class="nm chl3"></div></div>');
                    $('#uclist').append('<div class="row" id="lclick-' + object.id + '""><div class="small-10 columns xs-ws-top"><label for="u-' + object.id + '">' + object.get("name") + '</label></div><div class="small-2 columns xs-ws-top text-right ipt"><label for="u-' + object.id + '"><a><i class="icon-upload"></i></a></label><input name="fu" id="u-' + object.id + '" type="file" style="display:none;" accept="application/pdf, image/*" class="nm" /></div></div>');
                    $('#uclist').append('<div class="row hide" id="pb-' + object.id + '"><div class="progress stripes small-12 radius"><span class="meter" style="width: 0%"></span></div></div>');
                    $('#uclist').append('<div class="row hide" id="ud-' + object.id + '"><div class="small-12 columns"></div></div>');


                    $(function()
                    {
                        var tobj1 = object;
                        $('#u-' + object.id).bind("change", function(e)
                        {
                            var files = e.target.files || e.dataTransfer.files;
                            file = files[0];
                            //console.log(temp1.id)
                            $('#u-' + tobj1.id).fadeOut();
                            $('#pb-' + tobj1.id).slideDown();
                            $('#pb-' + tobj1.id + ' .meter').animate(
                            {
                                width: "80%"
                            }, 25000, 'swing');
                            // console.log(cproject)
                            fileSave(tobj1, cpObj);
                        });
                    });
                }
            }
            $('#uplist').append('<a class="btn" id="ad1">Add new type</a><div id="ad1bg" style="display:none;"><form id="ad1f"><label>Doc name <input id="ndname1" type="text" placeholder="Choose something rememberable" required /></label><label> Validity<input id="ndval1" type="number" placeholder="Estimated number of days" /></label><input class="button tiny" id="ndbtn1" type="submit"></form></div>');
            $('#ullist').append('<a class="btn" id="ad2">Add new type</a><div id="ad2bg" style="display:none;"><form id="ad2f"><label>Doc name <input id="ndname2" type="text" placeholder="Choose something rememberable" required /></label><label> Validity<input id="ndval2" type="number" placeholder="Estimated number of days" /></label><input class="button tiny" id="ndbtn2" type="submit"></form></div>');
            $('#uclist').append('<a class="btn" id="ad3">Add new type</a><div id="ad3bg" style="display:none;"><form id="ad3f"><label>Doc name <input id="ndname3" type="text" placeholder="Choose something rememberable" required /></label><label> Validity<input id="ndval3" type="number" placeholder="Estimated number of days" /></label><input class="button tiny" id="ndbtn3" type="submit"></form></div>');
        },
        error: function(error)
        {
            notify(error.message, "alert", 3);
        }
    }).then(
        function(object)
        {
            // the object was saved.
            if (typ == 2)
            {

            }
            else if (typ == 1)
            {

            }
            else
            {
                filterDocsp();
                $('#ad1').click(function()
                {
                    addnewdoctype(1);
                });
                $('#ad2').click(function()
                {
                    addnewdoctype(2);
                });
                $('#ad3').click(function()
                {
                    addnewdoctype(3);
                });
            }

        },
        function(error) {

        });
}

function populateAssDocsNew(triggertype)
{
    $('#tllist').html(loaders);
    $('#tplist').html("");
    $('#tclist').html("");
    var docs = Parse.Object.extend("Docs");
    var query2 = new Parse.Query(docs);
    query2.find(
    {
        success: function(results)
        {
            $('#tplist').html('');
            $('#tllist').html('');
            $('#tclist').html('');
            $('#uplist').html('');
            $('#ullist').html('');
            $('#uclist').html('');

            for (var i = 0; i < results.length; i++)
            {
                var object = results[i];
                if (object.get('group') == 1)
                {
                    if (triggertype == "moredocs")
                    {
                        $('#uplist').append('<div class="row collapse" id="tclick-' + object.id + '""><div class="small-12 columns s-ws-top scolor s">' + object.get("name") + '</div></div>');

                    }
                    else if (triggertype == "newTasktrg")
                    {
                        $('#tplist').append('<div class="row collapse" id="tclick-' + object.id + '""><div class="small-12 columns s-ws-top scolor s">' + object.get("name") + '</div></div>');

                    }
                }
                else if (object.get('group') == 2)
                {
                    if (triggertype == "moredocs")
                    {
                        $('#ullist').append('<div class="row collapse" id="tclick-' + object.id + '""><div class="small-12 columns s-ws-top scolor s">' + object.get("name") + '</div></div>');

                    }
                    else if (triggertype == "newTasktrg")
                    {
                        $('#tllist').append('<div class="row collapse" id="tclick-' + object.id + '""><div class="small-12 columns s-ws-top scolor s">' + object.get("name") + '</div></div>');

                    }
                }
                else if (object.get('group') == 3)
                {
                    if (triggertype == "moredocs")
                    {
                        $('#uclist').append('<div class="row collapse" id="tclick-' + object.id + '""><div class="small-12 columns s-ws-top scolor2">' + object.get("name") + '</div></div>');

                    }
                    else if (triggertype == "newTasktrg")
                    {
                        $('#tclist').append('<div class="row collapse" id="tclick-' + object.id + '""><div class="small-12 columns s-ws-top scolor2">' + object.get("name") + '</div></div>');

                    }
                }
            }
        },
        error: function(error)
        {
            notify(error.message, "alert", 3);
        }
    }).then(
        function(object)
        {
            filterDocst(triggertype);

        },
        function(error) {

        });
}


function addnewdoctype(type)
{
    $('#ad' + type + 'bg').slideDown();
    $('#ad' + type + 'f').submit(function(e)
    {
        var GameScore2 = Parse.Object.extend("Docs");
        var gameScore2 = new GameScore2();
        loadingButton_id('ndbtn' + type, 3);
        gameScore2.set("name", $('#ndname' + type).val());
        gameScore2.set("group", type);
        gameScore2.set("validity", parseInt($('#ndval' + type).val()));

        gameScore2.save(null,
        {
            success: function(gameScore)
            {
                notify("New doc type added", "success", 5);
                populateDocs();
            },
            error: function(gameScore, error)
            {
                notify(error.message, "alert", 3);
            }
        });
        e.preventDefault();
    });
}

function populateTaskDocs(typ)
{
    $('#ullist').html(loaders);
    $('#uplist').html("");
    $('#uclist').html("");
    var docs = Parse.Object.extend("ProjectDocs");
    var query2 = new Parse.Query(docs);
    query2.equalTo("projects", cpObj.get("projects"));
    query2.include("docs");
    query2.find(
    {
        success: function(results)
        {
            // console.log(results);
            $('#uplist').html('');
            $('#ullist').html('');
            $('#uclist').html('');
            for (var i = 0; i < results.length; i++)
            {
                var object = results[i];
                var dobj = object.get("docs");
                if (dobj.get('group') == 1)
                {
                    $('#uplist').append('<div class="row" id="lclick-' + dobj.id + '""><div class="small-10 columns xs-ws-top"><label for="u-' + object.id + '">' + dobj.get("name") + '</label></div><div class="small-2 columns xs-ws-top text-right ipt"><input id="u-' + object.id + '" type="checkbox" name="uad" class="nm chl1"></div></div>');
                    $('#uplist').append('<div class="row hide" id="ud-' + object.id + '"><div class="small-12 columns"></div></div>');

                }
                else if (dobj.get('group') == 2)
                {
                    $('#ullist').append('<div class="row" id="lclick-' + dobj.id + '""><div class="small-10 columns xs-ws-top"><label for="u-' + object.id + '">' + dobj.get("name") + '</label></div><div class="small-2 columns xs-ws-top text-right ipt"><input id="u-' + object.id + '" type="checkbox" name="uad" class="nm chl1"></div></div>');
                    $('#ullist').append('<div class="row hide" id="ud-' + object.id + '"><div class="small-12 columns"></div></div>');

                }
                else if (dobj.get('group') == 3)
                {
                    $('#uclist').append('<div class="row" id="lclick-' + dobj.id + '""><div class="small-10 columns xs-ws-top"><label for="u-' + object.id + '">' + dobj.get("name") + '</label></div><div class="small-2 columns xs-ws-top text-right ipt"><input id="u-' + object.id + '" type="checkbox" name="uad" class="nm chl1"></div></div>');
                    $('#uclist').append('<div class="row hide" id="ud-' + object.id + '"><div class="small-12 columns"></div></div>');

                }
            }

        },
        error: function(error)
        {
            notify(error.message, "alert", 3);
        }
    }).then(
        function(object)
        {
            // the object was saved.
            if (typ == 2)
            {

            }
            else if (typ == 1)
            {
                filterDocs();
                //$('#updateassdocs').fadeOut();
            }
            else
            {

            }

        },
        function(error)
        {
            notify(error.message, "alert", 3);
        });
}




function populateAssDocs()
{
    $('tllist').html(loaders);
    var docs = Parse.Object.extend("ProjectDocs");
    var query2 = new Parse.Query(docs);
    query2.equalTo("projects", cpObj.get("projects"));
    query2.include("docs");
    //query2.include("Docs")
    query2.find(
    {
        success: function(results)
        {
            $('#tplist').html('');
            $('#tllist').html('');
            $('#tclist').html('');
            for (var i = 0; i < results.length; i++)
            {
                var object = results[i];
                var dname;
                var dtype;
                var dobj = object.get("docs");
                var tempobj;
                dname = dobj.get("name");
                dtype = dobj.get("group");


                if (dtype == 1)
                {
                    $('#tplist').append('<div class="row"><div class="small-10 columns xs-ws-top"><label for="id-' + object.id + '">' + dname + '</label></div><div class="small-2 columns xs-ws-top text-right"><input id="id-' + object.id + '" type="checkbox" name="fu" class="nm chl1"></div></div>');
                }
                else if (dtype == 2)
                {
                    $('#tllist').append('<div class="row"><div class="small-10 columns xs-ws-top"><label for="id-' + object.id + '">' + dname + '</label></div><div class="small-2 columns xs-ws-top text-right"><input id="id-' + object.id + '" type="checkbox" name="fu" class="nm chl2"></div></div>');
                }
                else if (dtype == 3)
                {
                    $('#tclist').append('<div class="row"><div class="small-10 columns xs-ws-top"><label for="id-' + object.id + '">' + dname + '</label></div><div class="small-2 columns xs-ws-top text-right"><input id="id-' + object.id + '" type="checkbox" name="fu" class="nm chl3"></div></div>');
                }
            }
        },
        error: function(error)
        {
            notify(error.message, "alert", 3);
        }
    });
    $("#sall1").change(function()
    {
        $(".chl1").prop('checked', $(this).prop("checked"));
    });
    $("#sall2").change(function()
    {
        $(".chl2").prop('checked', $(this).prop("checked"));
    });
    $("#sall3").change(function()
    {
        $(".chl3").prop('checked', $(this).prop("checked"));
    });

}


var projectdoc;

function populateProjDocs()
{
    $('.ullist').html(loaders);

    Parse.Cloud.run('getProjectDocs',
    {
        projectID: cpObj.id
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
            if(cpObj.get('paid')!=1)
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


$('#uploaddocsbtn').click(function()
{
    populateDocs();
});
$('#uploaddocsbtn2').click(function()
{
    populateProjDocs();
});


$('#newTask').submit(function(e)
{
    e.preventDefault();
    loadingButton_id('createTask');

    var docsArray = [];
    $("input:checkbox[name=tad]:checked").each(function()
    {
        var $this = $(this);
        var cd = $this.attr('id').split('-')[1];
        console.log(cd);
        docsArray.push(
        {
            "__type": "Pointer",
            "className": "ProjectDocs",
            "objectId": cd
        });
    });
    console.log(docsArray);
    var Report = Parse.Object.extend("Report");
    var report = new Report();
    report.set("status", 2);
    report.set("project", cpObj);
    var tpname = cpObj.get("name");
    report.set("name", reporttype($('#ttype').val()) + ' for ' + tpname);
    report.set("type", parseInt($('#ttype').val()));
    report.set("docs", docsArray);
    //console.log(Math.floor((Math.random() * 999) + 100));
    report.set("taskid", Math.floor((Math.random() * 999) + 100));

    var temp3 = $('#tassigned').val();

    ListItem = Parse.Object.extend("User");
    var query = new Parse.Query(ListItem);
    query.equalTo("uname", temp3);
    query.first(
    {
        success: function(assignedUser)
        {
            // Do stuff
            report.set("assigned", assignedUser);
            report.set("name", cpObj.get("projects").get("name"));

            report.save(null,
            {
                success: function(report)
                {
                    var agency = assignedUser.get("agency");
                    agency.relation("report").add(report);

                    agency.save(
                    {
                        success: function()
                        {
                            rupdate(2, "Task created and initiated");
                            notify("Task initiated", "success", 5);
                            populateTasks(cpObj, 2, 2);
                            $('#newTaskModal').foundation('reveal', 'close');
                        },
                        error: function(error)
                        {
                            console.log(error.message + "projectId mai aaya");
                        }
                    });

                },
                error: function(report, error)
                {
                    notify(error.message, "alert", 3);
                }
            });
        },
        error: function(error)
        {
            notify(error.message, "alert", 3);
            //return error
        }
    });
});


$('#newTasktrg').click(function()
{
    populateAssDocsNew(this.id);
});

var temp0;

function getUserObj(uid)
{
    ListItem = Parse.Object.extend("User");
    var query = new Parse.Query(ListItem);
    query.equalTo("objectId", uid);
    query.first(
    {
        success: function(u)
        {
            // Do stuff
            temp0 = u;
            return temp0;
        },
        error: function(error)
        {
            notify(error.message, "alert", 3);
            //return error
        }
    });
    //console.log(temp0);
    return temp0;
}
var temp1;

function getUsern(un)
{

    ListItem = Parse.Object.extend("User");
    var query = new Parse.Query(ListItem);
    query.equalTo("uname", un);
    query.first(
    {
        success: function(u)
        {
            temp1 = u;
            return temp1;
        },
        error: function(error)
        {
            notify(error.message, "alert", 3);
        }
    });
    return temp1;
}

function populateAgencies()
{
    $('#userList').html('');
    var assigned = Parse.Object.extend("User");
    var query = new Parse.Query(assigned);
    query.equalTo('type', 4);
    query.find(
    {
        success: function(results)
        {
            for (var i = 0; i < results.length; i++)
            {
                var object = results[i];
                $('#userList').append('<option value="' + object.get("uname") + '"></option>');
            }
        },
        error: function(error)
        {
            notify(error.message, "alert", 3);
        }
    });
}

function edit()
{
    var GameScore = Parse.Object.extend("Projects");
    var query = new Parse.Query(GameScore);
    query.limit(1000);
    query.find(
    {
        success: function(results)
        {
            for (var i = 0; i < results.length; i++)
            {
                var object = results[i];
                var tn = object.get("name");
                if (tn)
                {
                    object.set("location", tn.replace(tn.split("-")[0] + '-', ""));
                    object.set("name", tn.split("-")[0]);
                }
                object.set("city", "Noida");
                if (object.get("builder"))
                {
                    object.set("builder", object.get("builder").split(" ")[0] + " " + object.get("builder").split(" ")[1]);

                }
                object.save();
            }
        },
        error: function(error)
        {
            alert("Error: " + error.code + " " + error.message);
        }
    });
};
var cd;

function filterDocs()
{
    var docsArrayfilter = []
    docsArrayfilter = ctaskObj.get("docs");
    var i;
    for (i = 0; i < docsArrayfilter.length; ++i)
    {
        var GameScore2 = Parse.Object.extend("ProjectDocs");
        var query2 = new Parse.Query(GameScore2);
        query2.include("docs");
        query2.get(docsArrayfilter[i].id,
        {
            success: function(gameScore)
            {
                var d = gameScore.get('docs');
                var docid = gameScore.get('docs').id;
                $('#lclick-' + docid + ' .ipt').fadeOut();
                $('#ud-' + gameScore.id + ' .small-12').append('<a href=' + gameScore.get("file").url() + ' download class="xs-ws-right"><i class="icon-download gc"></i></a>');
                $('#ud-' + gameScore.id).slideDown();
            },
            error: function(object, error)
            {
                notify(error.message, "alert", 3);
            }
        });
    }
};


function showDocs()
{
    $('#uplist').html('');
    $('#ullist').html('');
    $('#uclist').html('');
    var docsArrayfilter = []
    docsArrayfilter = ctaskObj.get("docs");
    var i;
    for (i = 0; i < docsArrayfilter.length; ++i)
    {
        var GameScore2 = Parse.Object.extend("ProjectDocs");
        var query2 = new Parse.Query(GameScore2);
        query2.include("docs");
        query2.get(docsArrayfilter[i].id,
        {
            success: function(gameScore)
            {
                var d = gameScore.get('docs');
                var docid = gameScore.get('docs').id
                populatetDoc(docid, gameScore)
            },
            error: function(object, error)
            {
                notify(error.message, "alert", 3);
            }
        });
    }
};

function populatetDoc(did, d)
{
    var docs = Parse.Object.extend("Docs");
    var query2 = new Parse.Query(docs);
    query2.include("ReportDocs")
        //query.equalTo("playerName", "Dan Stemkoski");
    query2.get(did,
    {
        success: function(object)
        {

            if (object.get('group') == 1)
            {
                $('#uplist').append('<div class="row" id="lclick-' + object.id + '""><div class="small-10 columns xs-ws-top"><label for="u-' + object.id + '">' + object.get("name") + '</label></div><div class="small-2 columns xs-ws-top text-right ipt"><a href="' + d.get("file").url() + '" download><i class="icon-download"></i></a></div></div>');
            }
            else if (object.get('group') == 2)
            {
                $('#ullist').append('<div class="row" id="lclick-' + object.id + '""><div class="small-10 columns xs-ws-top"><label for="u-' + object.id + '">' + object.get("name") + '</label></div><div class="small-2 columns xs-ws-top text-right ipt"><a href="' + d.get("file").url() + '" download><i class="icon-download"></i></a></div></div>');
            }
            else if (object.get('group') == 3)
            {
                $('#uclist').append('<div class="row" id="lclick-' + object.id + '""><div class="small-10 columns xs-ws-top"><label for="u-' + object.id + '">' + object.get("name") + '</label></div><div class="small-2 columns xs-ws-top text-right ipt"><a href="' + d.get("file").url() + '" download><i class="icon-download"></i></a></div></div>');
            }
        },
        error: function(error)
        {
            notify(error.message, "alert", 3);
        }
    });
}

function filterDocsp()
{
    //populateDocs();
    var GameScore = Parse.Object.extend("ProjectDocs");
    var query = new Parse.Query(GameScore);
    Parse.Cloud.run('getProjectsDocs',
    {
        projectID: cpObj.get("projects").id
    }).then(
        function(results)
        {
            for (var i = 0; i < results.length; i++)
            {
                var object = results[i];
                var d = object.get("docs");
                $('#ud-' + d.id).append('<div class="small-6 columns s end scolor2 xs-ws-top"><div class="tbtn"><div>' + object.get("file").name().split("-").pop() + ' ' + '<a href=' + object.get("file").url() + ' download class="right"><i class="icon-download gc"></i></a></div><div class="s2 scolor3">' + moment(object.get("createdAt")).format("LL") + '</div></div></div>');
                $('#ud-' + d.id).slideDown();
            }
        },
        function(error)
        {
            notify(error.message, "alert", 3);
        }
    );
};

function filterDocst(triggertype)
{
    // console.log(triggertype);
    // populateDocs();
    var GameScore = Parse.Object.extend("ProjectDocs");
    var query = new Parse.Query(GameScore);
    query.equalTo("projects", cpObj.get("projects"));



    query.find(
    {
        success: function(results)
        {
            for (var i = 0; i < results.length; i++)
            {
                var object = results[i];
                var d = object.get("docs");
                $('#tclick-' + d.id).append('<div class="small-6 columns s end scolor2 xs-ws-top"><label class="tbtn cs" for="ta-' + object.id + '"><div>' + object.get("file").name().split("-").pop() + ' ' + '<input id="ta-' + object.id + '" type="checkbox" name="tad" class="nm right"></div><div class="s2 scolor3">' + moment(object.get("createdAt")).format("LL") + '</div></label></div>');
                $('#tclick-' + d.id).slideDown();
            }

            if (triggertype == "moredocs")
            {
                var docsArrayfilter = []
                docsArrayfilter = ctaskObj.get("docs");
                for (var i = 0; i < docsArrayfilter.length; i++)
                {
                    if (docsArrayfilter[i].id)
                    {
                        $("#ta-" + docsArrayfilter[i].id).prop('checked', true);

                    }
                    else
                    {
                        $("#ta-" + docsArrayfilter[i].objectId).prop('checked', true);

                    }

                }

            }
        },
        error: function(error)
        {
            notify(error.message, "alert", 3);
        }
    });
};

//$('#landing-video').get(0).playbackRate = 0.5;

function pslist()
{
    var plist2 = Parse.Object.extend("Project");
    var query2 = new Parse.Query(plist2);
    query2.include("Projects");
    query2.equalTo("company", CU.get("company"));
    query2.find(
    {
        success: function(results)
        {
            for (var i = 0; i < results.length; i++)
            {
                var object = results[i];
                //console.log(object);
                $('#sList').append('<option value="' + object.get("projects").get("name") + '"></option>');

            }
            $('#cmodal').removeAttr('id')
        },
        error: function(error)
        {
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

var x;

function populateProjectdetails()
{
    $('#singleview').fadeIn();
    $('#psingle').fadeOut(300);
    $('#loadingsingle').delay(300).fadeIn(300);

    var project = Parse.Object.extend("Project");
    var query = new Parse.Query(project);
    query.include("builder");
    query.include("projects");
    query.get(cproject,
    {
        success: function(object)
        {
            x = object.get("projects");
            getProject(x.id);
            $('#loadingsingle').fadeOut(300);
            $('#psingle').delay(300).fadeIn(300);
            $('#pname').html(object.get('projects').get('name'));
            $('#plocation').html('<i class="icon-location"></i> ' + object.get('projects').get('location'));
            $('#pnames').html(object.get('projects').get('name'));
            $('#plocations').html(object.get('projects').get('location'));
            $('#ptype').html(projtype(object.get('projects').get('type')));
            if (object.get("status") == 3)
            {

                $('#approveProject').hide();
                $('#rejectProject').hide();
                if (object.get("approved") == 1)
                {
                    $('#pstatus').html('<div>Approved <i class="icon-check-circle gc"></i></div><div class="s2 scolor2">' + moment(object.get("approvaldate")).format("LL") + '</div>').fadeIn();

                }
                else if (object.get("approved") == 0)
                {
                    $('#pstatus').html('<div>Rejected <i class="icon-warning rc"></i></div><div class="s2 scolor2">' + moment(object.get("approvaldate")).format("LL") + '</div>').fadeIn();

                }
            }
            else
            {
                if (CU.get("subtype") == 3)
                {
                    $('#approveProject').hide();
                    $('#rejectProject').hide();
                    $('#pstatus').html('Under Review <i class="icon-process yc"></i>').fadeIn();

                }
                else
                {
                    $('#approveProject').show();
                    $('#rejectProject').show();
                    $('#pstatus').hide();
                    $('#rpstatus').hide();
                    getPUpdates(cpObj);
                }
            }

            $('#cpocv').html(object.get('cpoc'));
            $('#cpoctelv').html(object.get('cpoctel'));

            $('#bpocv').html(object.get('bpoc'));
            $('#bpoctelv').html(object.get('bpoctel'));

            $('#pcity').html(object.get('projects').get('location'));
            $('#pposs').html(object.get('projects').get('posession'));

            if (object.get("remarks"))
            {
                $('#admincomment').slideDown();
                $('#acmt').html(object.get("remarks"));
            }
            else
            {
                $('#admincomment').hide();
            }

            if (object.get('type') == 1)
            {
                $('#ar').fadeIn();
                $('.tl-menu').html('<div class="text-center scolor2">No tracking reports yet</div>');
            }
            else if (object.get('type') == 2)
            {
                $('#ar').fadeOut();
                showupdates(2);
            }
            else
            {
                $('#ar').fadeIn();
                showupdates(2);
            }
            // $('#pbuilder').html(x.get("builder").get("name"));
            //
        },
        error: function(error)
        {
            notify(error.message, "alert", 3);
        }
    }).then(function()
    {
        pstatus();

    });
}

$('#addcmt').click(function(e)
{
    e.preventDefault();
    $('#addcommentform textarea').val(cpObj.get("remarks"));
});
$('#addcommentform').submit(function(e)
{
    loadingButton_id('addcommentform .button');
    e.preventDefault();
    cpObj.set("remarks", $('#addcommentform textarea').val());
    cpObj.save(null,
    {
        success: function(result)
        {
            notify("Remark added to " + cpObj.get("name"), "success", 5);
            $('#commentModal').foundation('reveal', 'close');
        },
        error: function(comment, error)
        {
            notify(error.message, "alert", 3);
        }
    });
});

function pstatus()
{
    //console.log(cpObj.get("name"));
    $('#lsv').html("In progress").addClass('yc').removeClass('gc');
    $('#tsv').html("In progress").addClass('yc').removeClass('gc');
    $('#fsv').html("In progress").addClass('yc').removeClass('gc');
    $('#rsv').html("In progress").addClass('yc').removeClass('gc');
    $('#lsvr').html("");
    $('#tsvr').html("");
    $('#fsvr').html("");
    $('#rsvr').html("");
    console.log(cpObj);
    $('#ar').hide();
    Parse.Cloud.run('getReportForProject',
    {
        projectID: cpObj.id
    }).then(
        function(results)
        {
            if (results.length == 0)
            {
                $('#ar').hide();
            }

            for (var i = 0; i < results.length; i++)
            {
                $('#ar').show();
                var object = results[i];

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


function populateTasks(project, type, sts)
{
    $("#cmtbtn").show();
    $('.t-nav dd.active').removeClass("active");
    $('#tlist').html(loaders).removeClass('plist');
    $('#tsingle').hide();

    //console.log(type)
    if (CU.get("type") == 4)
    {
        var agencyptr = CU.get("agency");

        Parse.Cloud.run('getAgencyReports',
        {
            agencyID: agencyptr.id,
            sts: sts
        }).then(
            function(results)
            {
                $('#tlist').html('').addClass('plist');
                for (var i = 0; i < results.length; i++)
                {
                    var object = results[i];

                    //alert(object.id + ' - ' + object.get('playerName'));
                    $('#tlist').append('<div class="plistli" id="t-' + object.id + '"><h5 class="nm"><small>#' + object.get("taskid") + '</small> ' + object.get("name") + '</h5><div class="row collapse"><div class="small-6 columns s scolor2">' + moment(object.get("createdAt")).format("LL") + '</div><div class="small-6 columns s text-right">' + status(object.get("status")) + '</div></div>').fadeIn();
                }
                if (results.length == 0)
                {
                    $('#tlist').html('<p class="scolor2 text-center b-ws-top">No tasks found. Please add some</p>').removeClass('plist');
                }

                getTask();
            },
            function(error)
            {
                alert("Error: " + error.code + " " + error.message);
            }
        );

    }
    else if (CU.get("type") == 1)
    {
        var rpt = Parse.Object.extend("Report");
        var query = new Parse.Query(rpt);
        if (sts)
        {
            query.equalTo("status", sts);
        }

        query.equalTo("project", project);
        if (type == 1)
        {
            query.equalTo("assigned", adminUser);
        }
        else if (type == 2)
        {
            query.notEqualTo("assigned", adminUser);
        }

        query.find(
        {
            success: function(results)
            {
                $('#tlist').html('').addClass('plist');
                for (var i = 0; i < results.length; i++)
                {
                    var object = results[i];
                    //alert(object.id + ' - ' + object.get('playerName'));
                    $('#tlist').append('<div class="plistli" id="t-' + object.id + '"><h5 class="nm"><small>#' + object.get("taskid") + '</small> ' + object.get("name") + '</h5><div class="row collapse"><div class="small-6 columns s scolor2">' + moment(object.get("createdAt")).format("LL") + '</div><div class="small-6 columns s text-right">' + status(object.get("status")) + '</div></div>').fadeIn();
                }
                if (results.length == 0)
                {
                    $('#tlist').html('<p class="scolor2 text-center b-ws-top">No tasks found. Please add some</p>').removeClass('plist');
                }
                getTask();
            },
            error: function(error)
            {
                notify(error.message, "alert", 3);
            }
        });
        populateAgencies();

    }


}


var file;
var reportfile;

function status(num, classes)
{
    if (num == 1)
    {
        return '<span class="yc ' + classes + '">Open</span>';
    }
    else if (num == 2)
    {
        return '<span class="yc ' + classes + '">In progress</span>';
    }
    else if (num == 3)
    {
        return '<span class="gc ' + classes + '">Done</span>';
    }
}

function ptype(num)
{
    if (num == 1)
    {
        return 'Approval';
    }
    else if (num == 2)
    {
        return 'Tracking';
    }
    else if (num == 3)
    {
        return 'Both';
    }
}

function reporttype(num)
{
    if (num == 1)
    {
        return 'Legal';
    }
    else if (num == 2)
    {
        return 'Technical';
    }
    else if (num == 3)
    {
        return 'FCU';
    }
    else if (num == 3)
    {
        return 'ROC';
    }
}

function projtype(num)
{
    if (num == 1)
    {
        return 'Residential';
    }
    else if (num == 2)
    {
        return 'Commercial';
    }
    else if (num == 3)
    {
        return 'Land';
    }
}

function fileSave(doc, cproj)
{
    console.log(file);
    var filename = file.name.split(".")[0];
    var filextension = file.name.split(".").pop();

    var parsefile = new Parse.File(filename + "." + filextension, file);
    parsefile.save().then(function()
    {
        var PDoc = Parse.Object.extend("ProjectDocs");
        var pdoc = new PDoc();

        var docsArray = [];

        for (i = 0; i < cpObj.get("docsArray").length; i++)
        {
            docsArray.push(
            {
                "__type": "Pointer",
                "className": "ProjectDocs",
                "objectId": cpObj.get("docsArray")[i]
            });

        }

        pdoc.set("file", parsefile);
        pdoc.set("docs", doc);
        pdoc.set("projects", cpObj.get("projects"));

        pdoc.save(null,
        {
            success: function(result)
            {
                event.stopImmediatePropagation();
                $('#pb-' + doc.id + ' .meter').stop().animate(
                {
                    width: "100%"
                }, 200, function()
                {
                    docsArray.push(result.id);
                    cpObj.set("docsArray", docsArray);

                    cpObj.save(null,
                    {
                        success: function(cpObj)
                        {
                            //Sucess
                        },
                        error: function(report, error)
                        {
                            notify(error.message, "serror", 3);
                        }

                    });
                    // Animation complete.
                    $('#pb-' + doc.id).slideUp();
                    notify("File saved successfully", "success", 5);
                    populateDocs();
                    //$('#lclick-'+doc.id+' .ipt').hide().html('<i class="icon-check gc"></i>').fadeIn().delay(300).html('<label for="u-'+doc.id+'"><a><i class="icon-upload"></i></a></label><input id="u-'+doc.id+'" name="fu" type="file" style="display:none;" accept="application/pdf, image/*" class="nm" />');
                });
                $('#pb-' + doc.id + ' .progress').addClass('success');
                rupdate(4, 'admin uploaded a file: ' + doc.get("name"));
            },
            error: function(comment, error)
            {
                notify(error.message, "alert", 3);
            }
        });
    });
}

function reportSave(rObj)
{
    // console.log(reportfile);
    var filextension = reportfile.name.split(".").pop();
    // console.log(filextension);
    var parsefile = new Parse.File(rObj.get("name") + "." + filextension, reportfile, "application/pdf, image/*");
    parsefile.save().then(function()
    {

        ctaskObj.set("file", parsefile);
        ctaskObj.save(null,
        {
            success: function(result)
            {
                event.stopImmediatePropagation();
                $('#pb-' + ctaskObj.id + ' .meter').stop().animate(
                {
                    width: "100%"
                }, 200, function()
                {
                    $('#pb-' + ctaskObj.id).slideUp();
                });
                $('#pb-' + ctaskObj.id + ' .progress').addClass('success');
                ctaskObj.set("approved", -1);
                ctaskObj.set("status", 3);
                ctaskObj.set('assigned', adminUser);
                ctaskObj.save(null,
                {
                    success: function(result)
                    {
                        event.stopImmediatePropagation();
                        notify("Report submitted. Comment: " + $('#update-comment textarea').val(), "success", 5);
                        $('#markdone').fadeOut();
                        populateTasks(cpObj, 1, 2);
                        $('#update-comment textarea').val("");
                    },
                    error: function(comment, error)
                    {
                        notify(error.message, "alert", 3);
                    }
                });
                $('#moredocsBtn').fadeOut();
            },
            error: function(comment, error)
            {
                notify(error.message, "alert", 3);
            }
        });

    });
}

$("#rejectreport").click(function()
{

    if ($('#update-comment textarea').val())
    {
        ctaskObj.set("approved", 0);
        ctaskObj.set("status", 2);
        ctaskObj.save(null,
        {
            success: function(report)
            {
                notify("Project report has been rejected. Please assign it again. Reason: " + $('#update-comment textarea').val(), "alert", 5);
                rupdate(1, "Task Rejected. Reassigning in progress. Reason: " + $('#update-comment textarea').val());
                $("#update-comment textarea").val("");
                populateTasks(cpObj);

            },
            error: function(report, error)
            {
                notify(error.message, "alert", 3);
            }
        });

    }
    else
    {
        notify("Please write why you rejected the report & then click on the reject button", "alert", 3);
        $("#cmtbtn").hide();
    }
});

$("#approvereport").click(function()
{

    ctaskObj.set("approved", 1);
    ctaskObj.set("status", 3);
    ctaskObj.save(null,
    {
        success: function(report)
        {
            notify("Project report has been approved", "success", 5);
            rupdate(1, "Report submmited and approval recommended");
            populateTasks(cpObj);
        },
        error: function(report, error)
        {
            notify(error.message, "alert", 3);
        }
    });


});




$("#markdone").click(function(event)
{
    event.preventDefault();
    if ($("#update-comment textarea").val() == "")
    {
        notify("Please write a comment in your submission", "alert", 5);
    }
    else if (!reportfile)
    {
        notify("Please upload a file", "alert", 3);
    }
    else
    {

        loadingButton_id("markdone")
        $('#pb-' + ctaskObj.id).slideDown();
        $('#pb-' + ctaskObj.id + ' .meter').animate(
        {
            width: "80%"
        }, 25000, 'swing');
        reportSave(ctaskObj);
    }
});



$('#markapproved').click(function()
{
    ctaskObj.set("approved", 1);
    ctaskObj.set("status", 3);
    ctaskObj.save();
    rupdate(1, "Report submmited and approval recommended");
    populateTasks(cpObj);
});

$('#moredocs').click(function()
{
    $('#uploadModal').foundation('reveal', 'open');

    if (CU.get("type") == 1)
    {
        $('#updateassdocs').fadeIn();
        populateAssDocsNew(this.id);
        // filterDocsp();
    }
    else
    {
        showDocs();
    }

});
$('#updateassdocs').click(function()
{
    loadingButton_id('updateassdocs');
    var docsArray = [];
    docsArray = ctaskObj.get("docs");
    // console.log(docsArray);
    $("input:checkbox[name=tad]:checked").each(function()
    {
        var $this = $(this);
        var cd = $this.attr('id').split('-')[1];
        docsArray.push(
        {
            "__type": "Pointer",
            "className": "ProjectDocs",
            "objectId": cd
        });
    });

    console.log(docsArray);
    ctaskObj.set("docs", docsArray);
    ctaskObj.save(null,
    {
        success: function(report)
        {
            $('#uploadModal').foundation('reveal', 'close');
            notify("Documents updated for this task", "success", 3);
            getTask();
        },
        error: function(report, error)
        {
            notify(error.message, "alert", 3);
        }
    });
});
var appfile;

$('#uploadapproval').bind("change", function(e)
{
    var files = e.target.files || e.dataTransfer.files;
    appfile = files[0];
});
$('#approveProject.app').click(function()
{
    // $('#approveprojectbg').slideDown(500);
    // $('#approveProject').html('<i class="icon-close f-2x"></i>').removeClass('button tiny');
    var clicks = $(this).data('clicks');
    if (clicks)
    {

        $('#approveprojectbg').slideUp(500);
        $("#closeapproveprojectbg").remove();
        $('#approveProject').empty().html('Approve Project').addClass('button tiny');
        $('#rejectProject').show();

    }
    else
    {

        $('#approveprojectbg').slideDown(500);
        $('#approveProject').html('<i class="icon-close f-2x cs" id="closeapproveprojectbg"></i>').removeClass('button tiny');
        $('#rejectProject').hide();
    }
    $(this).data("clicks", !clicks);

});


$('#rejectProject').click(function()
{
    loadingButton_id('rejectProject', 3);
    cpObj.set("approved", 0);
    cpObj.set("status", 3);
    cpObj.set("approvaldate", new Date());
    cpObj.save(null,
    {
        success: function(result)
        {
            $('#rejectProject').fadeOut();
            $('#pstatus').html('Rejected <i class="icon-warning rc"></i>').fadeIn();
            $('#approveProject').fadeOut();
            //$('#rpstatus').html('Rejected <i class="icon-warning yc"></i>').fadeIn();
            notify("Project" + cpObj.get("projects").get("name") + "rejected", "error", 5);
        },
        error: function(comment, error)
        {
            $('#rejectProject').html('Reject project').addClass('button tiny');
            notify(error.message, "alert", 3);
        }
    });

});

$('#appbtn').click(function()
{
    loadingButton_id('appbtn', 3);
    if (appfile)
    {
        var parsefile = new Parse.File(cpObj.get("name"), appfile);
        parsefile.save().then(function()
        {
            $('#uabtn').fadeOut(300);
            $('#pb-app').delay(300).fadeIn(300);
            $('#pb-app .meter').animate(
            {
                width: "80%"
            }, 25000, 'swing');
            if ($('#appId').val())
            {
                cpObj.set("approvalId", $('#appId').val());
            }
            cpObj.set("letter", parsefile);
            cpObj.set("approved", 1);
            cpObj.set("status", 3);
            cpObj.set("approvaldate", new Date());
            cpObj.save(null,
            {
                success: function(result)
                {
                    event.stopImmediatePropagation();
                    $('#pb-app .meter').stop().animate(
                    {
                        width: "100%"
                    }, 200, function()
                    {
                        $('#pb-app').fadeOut();
                    });

                    $('#pb-app .progress').addClass('success');
                    $('#approveprojectbg').slideUp();
                    $('#approveProject').html('Approve project').addClass('button tiny').hide();
                    $('#rpstatus').html('Approved <i class="icon-check-circle gc"></i>').fadeIn();
                    $('#rejectProject').hide();
                    $('#pstatus').hide();
                    notify("Project" + cpObj.get("projects").get("name") + "approved", "success", 5);
                },
                error: function(comment, error)
                {
                    $('#approveProject').html('Approve project').addClass('button tiny');
                    notify(error.message, "alert", 3);
                }
            });
        });
    }
    else
    {
        $('#uabtn').fadeOut(300);
        $('#pb-app').delay(300).fadeIn(300);
        $('#pb-app .meter').animate(
        {
            width: "80%"
        }, 25000, 'swing');
        if ($('#appId').val())
        {
            cpObj.set("approvalId", $('#appId').val());
        }
        cpObj.set("letter", parsefile);
        cpObj.set("approved", 1);
        cpObj.set("status", 3);
        cpObj.set("approvaldate", new Date());

        cpObj.save(null,
        {
            success: function(result)
            {
                $('#approveprojectbg').slideUp();
                $('#approveProject').html('Approve project').addClass('button tiny').hide();
                $('#rpstatus').html('Approved <i class="icon-check-circle gc"></i>').fadeIn();
                $('#rejectProject').hide();
                $('#pstatus').hide();

                notify("Project" + cpObj.get("projects").get("name") + "approved", "success", 5);
            },
            error: function(comment, error)
            {
                $('#approveProject').html('Approve project').addClass('button tiny');
                notify(error.message, "alert", 3);
            }
        });
    }

});
$('#approveProject.icon-close').click(function()
{
    $('#approveprojectbg').slideUp();
});

$('#moredocsBtn').click(function(e)
{
    e.preventDefault();

    var t2 = $('#update-comment textarea').val();
    if (t2)
    {
        lb_id('moredocsBtn', 1);
        ctaskObj.set('assigned', adminUser);
        ctaskObj.save(null,
        {
            success: function(report)
            {
                populateTasks(cpObj, 1, 2);
                rupdate(1, t2 + ' and asked for more docs');
            },
            error: function(report, error)
            {
                notify(error.message, "alert", 3);
            }
        });

    }
    else
    {
        notify('Please add a comment', "warning", 10)
    }

});

var tempo1;

function getTask()
{

    $('#tlist .plistli').click(function(event)
    {
        $('#tsingle').fadeOut(300);
        $('#loadingsingle').delay(300).fadeIn(300);
        ctask = this.id.split('-')[1];
        $('#tlist .plistli').removeClass('active');
        $('#t-' + ctask).addClass('active');

        var report1 = Parse.Object.extend("Report");
        var query = new Parse.Query(report1);
        query.include('User')
        query.include('project');
        query.include('builder');
        query.include("projects");

        query.get(ctask).then(function(newMyObject)
        {
            object = newMyObject;
            ctaskObj = newMyObject;
            $('#loadingsingle').fadeOut(300);
            $('#tsingle').delay(300).fadeIn(300);
            $('#ts1').html('<h4><small>#' + object.get("taskid") + '</small> ' + object.get("name") + status(object.get("status"), "s2 right") + '</h4>')
            if (CU.get("type") == 4)
            {
                tempo1 = object.get("project").get("builder");
                // console.log(object.get("project"));
                var rew = object.get("project")
                    // console.log(rew.get("projects"))
                    //$('#ts1').append('<h6>' + object.get("project").get("name") + ' <small>' + object.get("project").get("projects").get("location") + '</small></h6>');
            }
            $('#ts2').html(moment(object.get("createdAt")).format("LL"));

            var assigned = Parse.Object.extend("User");
            var query1 = new Parse.Query(assigned);
            query1.get(object.get("assigned").id,
            {
                success: function(gameScore)
                {
                    $('#ts5').html(gameScore.get("uname"));
                    cassignedObj = gameScore;
                    getUpdates(ctaskObj);
                },
                error: function(object, error)
                {
                    notify(error.message, "alert", 3);
                }
            });

            if (CU.get("type") != 4)
            {
                $("#markdone").hide();
                $('#a3').show();
                var query2 = new Parse.Query(assigned);
                query2.get(cpObj.get("creator").id,
                {
                    success: function(gameScore)
                    {
                        $('#ts3').html(gameScore.get("uname"));

                    },
                    error: function(object, error)
                    {
                        notify(error.message, "alert", 3);
                    }
                });


            }
            else
            {
                $('#ts3').html(adminUser.get("uname"));
                $("#approvereport").hide();
                $("#rejectreport").hide();
            }
            if (ctaskObj.get("file"))
            {
                $('#uploadReportBtn').hide();
                $('#a4').html('<a class="btn" href="' + ctaskObj.get("file").url() + '" download>View report</a> <i class="icon-close f-2x" id="editreport"></i>');
                $('#moredocsBtn').fadeOut();
            }

            else
            {


                if (CU.get("type") == 1)
                {
                    $('#a3').hide();
                }
                else
                {
                    $('#uploadReportBtn').bind("change", function(e)
                    {
                        var files = e.target.files || e.dataTransfer.files;
                        reportfile = files[0];
                        $('#uploadReportBtn').fadeOut();
                        $('#a4').html('<label for="uploadReportBtn" class="button small fullwidth nm"><i class="icon-upload"></i> Upload Report <input type="file" style="display:none;" id="uploadReportBtn" accept="application/pdf, image/*" /></label>').append('<div class="row hide" id="pb-' + ctaskObj.id + '"><div class="progress stripes small-12 radius"><span class="meter" style="width: 0%"></span></div></div>');

                    });
                }

            }

            $("#editreport").click(function()
            {
                $('#a4').html('<label for="uploadReportBtn" class="button small fullwidth nm"><i class="icon-upload"></i> Upload Report <input type="file" style="display:none;" id="uploadReportBtn" accept="application/pdf, image/*" /></label>').append('<div class="row hide" id="pb-' + ctaskObj.id + '"><div class="progress stripes small-12 radius"><span class="meter" style="width: 0%"></span></div></div>');
                $('#uploadReportBtn').bind("change", function(e)
                {
                    var files = e.target.files || e.dataTransfer.files;
                    reportfile = files[0];
                    $('#uploadReportBtn').fadeOut();
                    $('#a4').html('<label for="uploadReportBtn" class="button small fullwidth nm"><i class="icon-upload"></i> Upload Report <input type="file" style="display:none;" id="uploadReportBtn" accept="application/pdf, image/*" /></label>').append('<div class="row hide" id="pb-' + ctaskObj.id + '"><div class="progress stripes small-12 radius"><span class="meter" style="width: 0%"></span></div></div>');

                });

            });

        }, function(error)
        {
            notify(error.message, "alert", 3);
        });

    });
    $('#add-agency').click(function()
    {
        $('#add-agency').fadeOut();
        $('#input-agency').slideDown();

    });
    $('#input-agency').submit(function(event)
    {
        event.stopImmediatePropagation();
        loadingButton_id('input-agency input[type="submit"]');
        event.preventDefault();
        var au = Parse.Object.extend("User");
        var query = new Parse.Query(au);
        query.equalTo('uname', $('#as').val());
        query.first(
        {
            success: function(result)
            {

                var agency = object.get("assigned").get("agency");
                agency.relation("report").remove(ctaskObj);
                agency.save(
                {
                    success: function()
                    {
                        // notify("Task removed from " + agency.get("name"), "alert", 3);
                    },
                    error: function()
                    {
                        notify(error.message, "alert", 3);
                    }
                });
                ctaskObj.set("assigned", result);
                ctaskObj.save(null,
                {
                    success: function(report)
                    {
                        var agency = object.get("assigned").get("agency");
                        agency.relation("report").add(report);
                        agency.save(
                        {
                            success: function()
                            {
                                $('#input-agency').slideUp();
                                var t1 = $('#as').val();
                                $('#ts5').html(t1);
                                $('#add-agency').fadeIn();
                                notify("Task assigned to " + result.get("uname"), "success", 5);
                                rupdate(1, "Task assigned to " + result.get("uname"))
                            },
                            error: function()
                            {
                                notify(error.message, "alert", 3);
                            }
                        });
                    },
                    error: function(report, error)
                    {
                        notify(error.message, "alert", 3);
                    }
                });
            },
            error: function(object, error)
            {
                notify(error.message, "alert", 3);
            }
        });
    });
}

function showupdates(type)
{
    $('.tl-menu').html(loaders);
    $('.tl-menu-list').html("");
    var GameScore = Parse.Object.extend("Report");
    var query = new Parse.Query(GameScore);
    query.equalTo("project", cpObj);
    query.equalTo("type", type);
    query.equalTo("status", 3);
    Parse.Cloud.run('getReportForDashboardStatus',
    {
        projectID: cpObj.id,
        type: type
    }).then(
        function(results)
        {
            $('.tl-menu').html("");
            $('.tl-menu-list').html("");
            for (var i = 0; i < results.length; i++)
            {

                var object = results[i];
                $('.tl-menu').append('<li><i class="icon-circle"></i></li>');
                $('.tl-menu-list').append('<li><div class="scolor2 s">' + moment(object.get("updatedAt")).format('LL') + '</div><div class="s"><a href="' + object.get("file").url() + '"><i class="icon-download"></i></a></div></li>');
            }
            if (results.length == 0)
            {
                $('.tl-menu').html('<div class="text-center scolor2">No updates yet</div>');
            }
        },
        function(error)
        {
            alert("Error: " + error.code + " " + error.message);
        }
    );


}
$('#newtask2').click(function(e)
{
    e.preventDefault();
    $('#newtask2').html("processing");
    var Report = Parse.Object.extend("Report");
    var report = new Report();
    report.set("status", 2);
    report.set("project", cpObj);
    report.set("name", "Temp report");
    report.set("type", 2);
    report.set("taskid", Math.floor((Math.random() * 999) + 100));

    report.set("assigned", adminUser);

    report.save(null,
    {
        success: function(report)
        {
            rupdate(2, "On-demand report requested by Client");
            notify("On-demand report initiated", "success", 5);
            $('#newtask2').html("Request a new report");
        },
        error: function(report, error)
        {
            notify(error.message, "alert", 3);
        }

    });

});

function getUpdates(object)
{
    $('#updatesList').html(loaderxs);
    var GameScore = Parse.Object.extend("ReportUpdates");
    var query = new Parse.Query(GameScore);
    query.equalTo("report", object);
    query.include("User");
    query.descending("createdAt");
    query.find(
    {
        success: function(results)
        {

            $('#updatesList').html('');
            for (var i = 0; i < results.length; i++)
            {
                var object1 = results[i];
                var object2 = object1.get("user");
                $('#updatesList').append('<div class="row" id="pu-' + object1.id + '"><div class="small-2 columns text-right"> <i class="icon-user scolor4 f-2x"></i><h6 class="s scolor"><span class="scolor2 right">' + object2.get("uname") + '</span></h6> </div> <div class="small-1 columns text-center bgline"> <div class="circle"> <i class="icon-circle scolor2"></i> </div> </div> <div class="small-9 columns"><div class="scolor2 s">' + object2.get("uname") + ' updated the task <small class="right">' + moment(object1.get("createdAt")).format("LL, h:mm a") + '</small></div><p>' + object1.get("comment") + '</p></div>');
            }

            if (results.length == 0)
            {
                $('#updatesList').html('<div class="text-center scolor2 s-ws-bottom">No updates yet</div>');
            }
        },
        error: function(error)
        {
            notify(error.message, "alert", 3);
        }
    });
}

function getPUpdates(object)
{
    $('#pupdatesList').html(loaderxs);

    Parse.Cloud.run('getProjectUpdatesDashboard',
    {
        projectID: object.id
    }).then(
        function(results)
        {


            $('#pupdatesList').html('');
            for (var i = 0; i < results.length; i++)
            {
                var object1 = results[i];
                var object2 = object1.get("user");
                //$('#pupdatesList').append('<div class="row" id="up-'+object1.id+'"><div class="small-2 columns text-center"><i class="icon-user scolor4 f-2x"></i><h6 class="text-center s scolor">'+object2.get("uname")+'</h6></div><div class="small-10 columns"><div class="panel h"><div class="p-header scolor2 s">'+object2.get("uname")+' updated the task <small>'+moment(object1.get("createdAt")).format("LL, h:mm a")+'</small></div><p>'+object1.get("comment")+'</p></div></div></div>');
                $('#pupdatesList').append('<div class="row" id="pu-' + object1.id + '"><div class="small-2 columns text-right"> <i class="icon-user scolor4 f-2x"></i><h6 class="s scolor"><span class="scolor2 right">' + object2.get("uname") + '</span></h6> </div> <div class="small-1 columns text-center bgline"> <div class="circle"> <i class="icon-circle scolor2"></i> </div> </div> <div class="small-9 columns"><div class="scolor2 s">' + object2.get("uname") + ' updated the task <small class="right">' + moment(object1.get("createdAt")).format("LL, h:mm a") + '</small></div><p>' + object1.get("comment") + '</p></div>');

            }
            if (results.length == 0)
            {
                $('#pupdatesList').html('<div class="text-center scolor2 s-ws-bottom">No updates yet</div>');
            }
        },
        function(error)
        {
            notify(error.message, "alert", 3);
        }
    );
}
$('#update-comment').submit(function(e)
{
    e.preventDefault();
    loadingButton_id('update-comment .button')
    var t2 = $('#update-comment textarea').val();
    rupdate(1, t2);
});


function getProject(id)
{
    // $('#psingle').fadeOut(300);
    // $('#timeline').fadeOut(300);
    // $('#loading').delay(300).fadeIn(300);
    var project = Parse.Object.extend("Projects");
    var query = new Parse.Query(project);
    query.include("builder");
    query.get(id,
    {
        success: function(result)
        {
            $('#loading').fadeOut(300);
            $('#psingle').delay(300).fadeIn(300);
            cpObj2 = result;
            if (cpObj2.get("coverimg"))
            {
                $('#pcover').attr("src", cpObj2.get("coverimg").url());
            }
            $('#pname').html(cpObj.get("name"));

            $('#plocation').html('<i class="icon-location"></i> ' + cpObj2.get("location"))
            $('#pposession').html(moment(cpObj2.get('posessiondate')).format("LL"));
            cBuilder = cpObj2.get("builder");
            $('#pbuilder').html(cBuilder.get("name"));

            $('#ppricerange').html(cpObj2.get("pricerange"));
            $('#pinventory').html(cpObj2.get("units") + ' Units - <small>' + cpObj2.get("towers") + ' towers, ' + cpObj2.get("floors") + ' Floors</small>');

            $('#pland').html(cpObj2.get("area") + ' sq ft - <small>' + cpObj2.get("coverage") + '% coverage</small');
            $('#projectstatus').html(pstatus2(cpObj2.get("status")));
            if (cpObj2.get("type") == 1)
            {
                $('#ptype').html("Residential");
            }
            else if (cpObj2.get("type") == 2)
            {
                $('#ptype').html("Commercial");
            }
            $('#ptext').html(cpObj2.get("about"));
            $('#ppph').html(cpObj2.get("pph"));
            $('#plaunch').html(moment(cpObj2.get("launchdate")).format("LL"));
            $('#pcontact').html(cpObj2.get("customernum"), cpObj2.get("customermail"));
            getUnits();
            getStatus();
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





            Parse.Cloud.run('getProjectFromUserProjects',
            {
                userID: CU.id,
                projectID: cpObj2.id
            }).then(
                function(result)
                {
                    // console.log(result);
                    $('#addTrack').unbind("click").html('<div class="f-1-5x text-center scolor2">Tracking <i class="icon-check-circle gc"></i></div>').removeClass("button");

                },
                function(object, error)
                {

                    notify(error.message, "alert", 3);
                }
            );

        },
        error: function(object, error)
        {
            notify(error.message, "alert", 3);
        }
    });
}

function getUnits()
{
    $("#units").html(loaderxs);
    var p;

    var units = Parse.Object.extend("Units");
    var query2 = new Parse.Query(units);
    query2.equalTo("project", cpObj2);
    query2.include("price");
    query2.find(
    {
        success: function(results)
        {
            $("#units").html("");
            for (var i = 0; i < results.length; i++)
            {
                object = results[i];

                p = object.get("price");
                //console.log(object);
                $('#units').append('<div class="row"> <div class="small-4 columns m-ws-bottom"><div class="f-1-5x scolor2">' + unitsize(object.get("size")) + ' </div><div class="scolor3">' + object.get("area") + '</div> </div> <div class="small-4 columns scolor m-ws-bottom"><div><span class="scolor3 s"> Circle rate</span> ' + p.get("circlerate") + '</div><div><span class="scolor3 s">Builder rate</span> ' + p.get("builderrate") + '</div></div> <div class="small-4 columns m-ws-bottom"><div><span class="scolor3 s">Traded Rate</span> ' + p.get("tradedrate") + '</div><div><span class="scolor3 s">Valuation rate</span> ' + p.get("valuationrate") + '</div></div></div>');
            }
        }
    })
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

function getStatus()
{
    $('#status').html(loaderxs);
    var sts = Parse.Object.extend("Status");
    var query3 = new Parse.Query(sts);
    query3.equalTo("project", cpObj2);
    //query3.include("price");
    query3.find(
    {
        success: function(results)
        {
            $("#status").html("");
            for (var i = 0; i < results.length; i++)
            {
                object = results[i];
                if (object.get("constructionprogress"))
                {
                    $('#status').append('<div class="row"><div class="small-12 columns s2 scolor2"> <span class="updated at">' + moment(object.get("timestamp")).format("LL") + '</span> </div> <div class="small-1 columns text-center bgline"> <div class="circle"> <i class="icon-circle scolor2"></i> </div></div><div class="small-4 columns"><span class="f-2x">' + object.get("statusp") + '</span> % completed </div> <div class="small-4 columns"><div class="scolor2 s2">Status</div><div class="scolor">' + projectstatus(object.get("status")) + ' </div></div> <div class="small-3 columns"><div class="scolor2 s2">Progress update</div><div class="scolor"> <a href="' + object.get("constructionprogress").url() + '" download>Download <i class="icon-download"></i></a></div> </div> </div>');
                }
                else
                {
                    $('#status').append('<div class="row"><div class="small-12 columns s2 scolor2"> <span class="updated at">' + moment(object.get("timestamp")).format("LL") + '</span> </div> <div class="small-1 columns text-center bgline"> <div class="circle"> <i class="icon-circle scolor2"></i> </div></div><div class="small-4 columns"><span class="f-2x">' + object.get("statusp") + '</span> % completed </div> <div class="small-4 columns"><div class="scolor2 s2">Status</div><div class="scolor">' + projectstatus(object.get("status")) + ' </div></div> <div class="small-3 columns"><div class="scolor2 s2">Progress update</div><div class="scolor"> - </div> </div> </div>');

                }
                $('#status').append('<div class="row"><div class="small-1 columns text-center bgline sm"> &nbsp;</div><div class="small-11 columns s-ws-top"><h6>Activity seen</h6></div></div><div id="as-' + object.id + '" class="row"><div class="small-1 columns text-center bgline"> &nbsp;</div><div class="small-2 columns text-center"><div><img src="/assets/images/labor.png" class="img-h op1 s1"></div><div class="s2 scolor2">Labor seen <span class="scolor1 lbcount"></span></div></div><div class="small-2 columns end text-center"><div><img src="/assets/images/crane.png" class="img-h op1 s2"></div><div class="s2 scolor2">Cranes moving <span class="scolor3 crcount"></span></div></div></div>');


                var labour_count = object.get("labour");
                var crane_count = object.get("cranes");


                if (labour_count !== 0)
                {
                    $('#as-' + object.id + ' .s1').removeClass('op1');
                    $('#as-' + object.id + ' .lbcount').html(":" + labour_count);
                }
                if (crane_count != 0 && crane_count)
                {
                    $('#as-' + object.id + ' .s2').removeClass('op1');
                    $('#as-' + object.id + ' .crcount').html(":" + crane_count);
                }
            }
        }

    })
}

function pstatus2(num)
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


function projectstatus(num)
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
