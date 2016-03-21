var au;
var cut;

function populateUsers(apr)
{
    $('#ausers').html(loaders).removeClass('plist');
    var GameScore = Parse.Object.extend("User");
    var query = new Parse.Query(GameScore);
    query.include("company");
    query.equalTo("type", 2);
    query.equalTo("company", CU.get("company"));
    query.descending("createdAt");
    if (apr)
    {
        console.log(apr)
        query.equalTo("approved", apr);

        if (apr === 1)
        {
            $("#addNewUser").fadeIn();
        }

    }
    else if (apr === 0)
    {
        query.equalTo("approved", apr);
        $("#addNewUser").fadeOut();
    }
    else
    {
        $("#addNewUser").fadeOut();

    }



    query.find(
    {
        success: function(results)
        {
            $('#ausers').html('').addClass('plist');
            for (var i = 0; i < results.length; i++)
            {
                var object = results[i];
                //1- Approved
                //2- Pending Approval
                //0- Rejected

                if (object.get('approved') == 1)
                {
                    $('#ausers').append('<div class="plistli"><div class="row"><div class="small-1 columns text-center"><i class="icon-user f-1-5x scolor3"></i></div><div class="small-8 columns"><h5>' + object.get("uname") + ' <small class="s2 scolor3">' + moment(object.get("createdAt")).format("LL") + '</small></h5></div><div class="small-3 columns text-right"><div class="button alert tiny nm" id="reject-' + object.id + '">Block</div></div></div></div>').hide().fadeIn();
                }
                else if (object.get('approved') == 0)
                {
                    $('#ausers').append('<div class="plistli"><div class="row"><div class="small-1 columns text-center"><i class="icon-user f-1-5x scolor3"></i></div><div class="small-8 columns"><h5>' + object.get("uname") + ' <small class="s2 scolor3">' + moment(object.get("createdAt")).format("LL") + '</small></h5></div><div class="small-3 columns text-right"><div class="button tiny nm" id="unblock-' + object.id + '">Unblock</div></div></div></div>').hide().fadeIn();
                }
                else if (object.get('approved') == 2)
                {
                    $('#ausers').append('<div class="plistli"><div class="row"><div class="small-1 columns text-center"><i class="icon-user f-1-5x scolor3"></i></div><div class="small-7 columns"><h5>' + object.get("uname") + ' <small class="s2 scolor3">' + moment(object.get("createdAt")).format("LL") + '</small></h5></div><div class="small-2 columns text-right"><div class="button success tiny nm" id="approve-' + object.id + '">Approve</div></div><div class="small-2 columns text-right"><div class="button alert tiny nm" id="reject-' + object.id + '">Reject</div></div></div></div>').hide().fadeIn();
                }
            }
            if (results.length == 0)
            {
                $('#ausers').html('<div class="text-center scolor2 b-ws-top">No more users found</div>').removeClass('plist');
            }

            $('#ausers .button').click(function(event)
            {
                loadingButton_id('b-' + object.id);
                msg = this.id.split('-')[0];
                objId = this.id.split('-')[1];
                console.log(msg);
                console.log(objId);

                var usr = Parse.Object.extend("User");
                var query2 = new Parse.Query(usr);
                query2.get(objId,
                {
                    success: function(obj)
                    {

                        if (msg == "approve")
                        {
                            Parse.Cloud.run('changeApr',
                            {
                                auId: objId,
                                napr: 1
                            },
                            {
                                success: function(ratings)
                                {
                                    // ratings should be 4.5
                                    console.log(ratings)
                                    populateUsers(1)
                                },
                                error: function(error)
                                {
                                    console.log(error.message);
                                }
                            });

                        }
                        else if (msg == "reject")
                        {
                            Parse.Cloud.run('changeApr',
                            {
                                auId: objId,
                                napr: 0
                            },
                            {
                                success: function(ratings)
                                {
                                    // ratings should be 4.5
                                    console.log(ratings)
                                    populateUsers(0)
                                },
                                error: function(error)
                                {
                                    console.log(error.message);
                                }
                            });
                        }
                        else if (msg == "unblock")
                        {
                            Parse.Cloud.run('changeApr',
                            {
                                auId: objId,
                                napr: 1
                            },
                            {
                                success: function(ratings)
                                {
                                    // ratings should be 4.5
                                    console.log(ratings)
                                    populateUsers(2);
                                },
                                error: function(error)
                                {
                                    console.log(error.message);
                                }
                            });
                        }
                    },
                    error: function(object, error)
                    {
                        console.log(error.message)
                    }
                });
            });
        },
        error: function(error)
        {
            console.log("Error: " + error.code + " " + error.message);
        }
    });
}
function populateB2cUsers(apr)
{
    $('#usersadmin').html(loaders).removeClass('plist');
    var GameScore = Parse.Object.extend("User");
    var query = new Parse.Query(GameScore);
    query.equalTo("type", 3);
    query.descending("createdAt");
    if (apr)
    {
        console.log(apr)
        query.equalTo("approved", apr);
    }
    else if (apr === 0)
    {
        query.equalTo("approved", apr);
    }
    



    query.find(
    {
        success: function(results)
        {
            $('#usersadmin').html('').addClass('plist');
            for (var i = 0; i < results.length; i++)
            {
                var object = results[i];
                //1- Approved
                //2- Pending Approval
                //0- Rejected

                if (object.get('approved') == 1)
                {
                    $('#usersadmin').append('<div class="plistli"><div class="row"><div class="small-1 columns text-center"><i class="icon-user f-1-5x scolor3"></i></div><div class="small-8 columns"><h5>' + object.get("uname") + ' <small class="s2 scolor3">' + moment(object.get("createdAt")).format("LL") + '</small></h5></div><div class="small-3 columns text-right"><div class="button alert tiny nm" id="reject-' + object.id + '">Block</div></div></div></div>').hide().fadeIn();
                }
                else if (object.get('approved') == 0)
                {
                    $('#usersadmin').append('<div class="plistli"><div class="row"><div class="small-1 columns text-center"><i class="icon-user f-1-5x scolor3"></i></div><div class="small-7 columns"><h5>' + object.get("uname") + ' <small class="s2 scolor3">' + moment(object.get("createdAt")).format("LL") + '</small></h5></div><div class="small-2 columns text-right"><div class="button success tiny nm" id="unblock-' + object.id + '">unblock</div></div><div class="small-2 columns text-right"><div class="button alert tiny nm" id="delete-' + object.id + '">delete</div></div></div></div>').hide().fadeIn();
                }
                else if (object.get('approved') == 2)
                {
                    $('#usersadmin').append('<div class="plistli"><div class="row"><div class="small-1 columns text-center"><i class="icon-user f-1-5x scolor3"></i></div><div class="small-7 columns"><h5>' + object.get("uname") + ' <small class="s2 scolor3">' + moment(object.get("createdAt")).format("LL") + '</small></h5></div><div class="small-2 columns text-right"><div class="button success tiny nm" id="approve-' + object.id + '">Approve</div></div><div class="small-2 columns text-right"><div class="button alert tiny nm" id="reject-' + object.id + '">Reject</div></div></div></div>').hide().fadeIn();
                }
            }
            if (results.length == 0)
            {
                $('#usersadmin').html('<div class="text-center scolor2 b-ws-top">No more users found</div>').removeClass('plist');
            }

            $('#usersadmin .button').click(function(event)
            {
                loadingButton_id('b-' + object.id);
                msg = this.id.split('-')[0];
                objId = this.id.split('-')[1];
                console.log(msg);
                console.log(objId);

                var usr = Parse.Object.extend("User");
                var query2 = new Parse.Query(usr);
                query2.get(objId,
                {
                    success: function(obj)
                    {

                        if (msg == "approve")
                        {
                            Parse.Cloud.run('changeApr',
                            {
                                auId: objId,
                                napr: 1
                            },
                            {
                                success: function(ratings)
                                {
                                    // ratings should be 4.5
                                    console.log(ratings);
                                    populateB2cUsers(1);
                                },
                                error: function(error)
                                {
                                    console.log(error.message);
                                }
                            });

                        }
                        else if (msg == "reject")
                        {
                            Parse.Cloud.run('changeApr',
                            {
                                auId: objId,
                                napr: 0
                            },
                            {
                                success: function(ratings)
                                {
                                    // ratings should be 4.5
                                    console.log(ratings);
                                    populateB2cUsers(0);
                                },
                                error: function(error)
                                {
                                    console.log(error.message);
                                }
                            });
                        }
                        else if (msg == "unblock")
                        {
                            Parse.Cloud.run('changeApr',
                            {
                                auId: objId,
                                napr: 1
                            },
                            {
                                success: function(ratings)
                                {
                                    // ratings should be 4.5
                                    console.log(ratings);
                                    populateB2cUsers(2);
                                },
                                error: function(error)
                                {
                                    console.log(error.message);
                                }
                            });
                        }
                         else if (msg == "delete")
                        {
                            Parse.Cloud.run('changeApr',
                            {
                                auId: objId,
                                napr: 2
                            },
                            {
                                success: function(ratings)
                                {
                                    // ratings should be 4.5
                                    console.log(ratings);
                                    notify("User got deleted successfully", "success", 5);
                                    populateB2cUsers(0);
                                },
                                error: function(error)
                                {
                                    console.log(error.message);
                                }
                            });
                        }
                    },
                    error: function(object, error)
                    {
                        console.log(error.message)
                    }
                });
            });
        },
        error: function(error)
        {
            console.log("Error: " + error.code + " " + error.message);
        }
    });
}
function populateClients(type)
{
    cut = type;
    if (cut == 4)
    {
        $('#add-agency').html('Add agency').fadeIn();

    }
    else if (cut == 2)
    {
        $('#add-agency').html('Add B2b Client').fadeIn();
    }
    else
    {
        $('#add-agency').fadeOut();
    }
    $('#usersadmin').html(loaders).removeClass('plist');
    var GameScore = Parse.Object.extend("User");
    var query = new Parse.Query(GameScore);
    if (type)
    {
        query.equalTo("type", type);
        if (type == 2)
        {
            query.equalTo("subtype", 1);
        }
    }
    query.include("company")
    query.descending("createdAt");
    query.find(
    {
        success: function(results)
        {
            $('#usersadmin').html('').addClass('plist');
            for (var i = 0; i < results.length; i++)
            {
                var object = results[i];
                if (object.get("type") == 2)
                {
                    var tempc = object.get("company");
                    $('#usersadmin').append('<div class="plistli"><div class="row"><div class="small-1 columns text-center"><i class="icon-user f-1-5x scolor3"></i></div><div class="small-8 columns"><h5>' + object.get("uname") + ' <small class="s2 scolor3">' + tempc.get("name") + '</small></h5></div><div class="small-3 columns text-right">&nbsp;</div></div></div>').hide().fadeIn();
                }
                else
                {
                    $('#usersadmin').append('<div class="plistli"><div class="row"><div class="small-1 columns text-center"><i class="icon-user f-1-5x scolor3"></i></div><div class="small-8 columns"><h5>' + object.get("uname") + '</h5></div><div class="small-3 columns text-right">&nbsp;</div></div></div>').hide().fadeIn();
                }
            }
            if (results.length == 0)
            {
                $('#usersadmin').html('<div class="text-center scolor2 b-ws-top">No more users found</div>').removeClass('plist');
            }

        },
        error: function(error)
        {
            console.log("Error: " + error.code + " " + error.message);
        }
    });
}

$('#newuserform').submit(function(e)
{
    e.preventDefault();
    loadingButton_id('newuserform .button');
    if ($("#nucompany").val())
    {
        console.log("new company created");
        Parse.Cloud.run('newUser',
        {
            uname: $('#nuname').val(),
            uemail: $('#nuemail').val(),
            type: cut,
            cname: $("#nucompany").val()
        },
        {
            success: function(ratings)
            {
                //loadingButton_id_stop('newuserform .button','Add user');
                $('#newUserModal').foundation('reveal', 'close');
                notify('New user created successfully', "success", 3)
            },
            error: function(error)
            {
                console.log(error.message);
            }
        });
    }
    else
    {
        console.log("new user by b2b admin");
        Parse.Cloud.run('newUser',
        {
            uname: $('#nuname').val(),
            uemail: $('#nuemail').val(),
            type: 2,
            subtype: parseInt($("#usertype").val())
        },
        {
            success: function(ratings)
            {
                //loadingButton_id_stop('newuserform .button','Add user');
                $('#newUserModal').foundation('reveal', 'close');
                notify('New user created successfully', "success", 3)
            },
            error: function(error)
            {
                console.log(error.message);
            }
        });
    }





});

if (CU.get("type") == 2)
{
    populateUsers(2);
}
else if (CU.get("type") == 1)
{
    populateClients(2);
}


$('#ua').click(function(e)
{
    e.preventDefault();
    populateUsers(1);
    $('#up').parent().removeClass('active');
});
$('#up').click(function(e)
{
    e.preventDefault();
    populateUsers(2);

});
$('#ur').click(function(e)
{
    e.preventDefault();
    populateUsers(0);
    $('#up').parent().removeClass('active');

});
$('#uall').click(function(e)
{
    e.preventDefault();
    populateUsers();
    $('#up').parent().removeClass('active');

});

$('#b2cua').click(function(e)
{
    e.preventDefault();
    populateB2cUsers(1);
    $('#b2cup').parent().removeClass('active');
});
$('#b2cup').click(function(e)
{
    e.preventDefault();
    populateB2cUsers(2);

});
$('#b2cur').click(function(e)
{
    e.preventDefault();
    populateB2cUsers(0);
    $('#b2cup').parent().removeClass('active');

});
$('#b2cuall').click(function(e)
{
    e.preventDefault();
    populateB2cUsers();
    $('#b2cup').parent().removeClass('active');

});

$('#ub2b').click(function(e)
{
    e.preventDefault();
    $("#showforb2c").fadeOut();
    populateClients(2);
});
$('#ub2c').click(function(e)
{
    e.preventDefault();
    $("#showforb2c").fadeIn();
    $('#add-agency').fadeOut();
    populateB2cUsers(2);
    $('#ub2b').parent().removeClass('active');

});
$('#uagencies').click(function(e)
{
    e.preventDefault();
    $("#showforb2c").fadeOut();
    populateClients(4);
    $('#ub2b').parent().removeClass('active');

});
$('#ualls').click(function(e)
{
    e.preventDefault();
    $("#showforb2c").fadeOut();
    populateClients();
    $('#ub2b').parent().removeClass('active');

});

