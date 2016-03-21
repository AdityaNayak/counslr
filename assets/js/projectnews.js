$(document).ready(function() {

    getProjectnews();

});


function getProjectnews() {

    var plist = Parse.Object.extend("Projects");
    var query2 = new Parse.Query(plist);
    query2.limit(1000);
    query2.find({
        success: function(results) {
            for (var i = 0; i < results.length; i++) {
                var object = results[i];
                //    console.log(object);
                $('#projectsList').append('<option value="' + object.get("name") + '"></option>');

            }
            // $('#cmodal').removeAttr('id')
        },
        error: function(error) {
            notify("Error: " + error.code + " " + error.message, "error", 5);
        }

    });

}


$('#projectnews').submit(function(e) {

    e.preventDefault();
    var projectnewsobj = Parse.Object.extend("ProjectsNews");
    var cnews = new projectnewsobj();
    var timestamp = $('#ts').val();


    cnews.set("timestamp", new Date(timestamp));
    cnews.set("content", $("#inputcomment").val());

    var projectObj = Parse.Object.extend("Projects");
    var query = new Parse.Query(projectObj);
    query.equalTo("name", $('#inputproject').val());

    query.first({
        success: function(result) {
        	console.log(result);
            cnews.set("projects", result);
            cnews.save(null, {
                success: function(cpObj) {
                notify("News Updated", "success", 5);

                },
                error: function(report, error) {
                    notify(error.message, "serror", 3);
                }

            });

        },
        error: function(error) {
            notify("Error: " + error.code + " " + error.message, "error", 5);
        }
    });




});
