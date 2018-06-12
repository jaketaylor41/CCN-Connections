console.log("Client loaded");
var sendNumber1;
var sendMessage1;
var groupSelected;
var groupSend;

$(document).ready(function () {
    init();
    $.ajax({
        type: "GET",
        url: "/contacts/contact",
        success: function (response) {
            console.log(response);
        }
    });
});
function init() {

    $("#family").on('click', function (e) {
        e.preventDefault();
        groupSelected = "Families";
        console.log(groupSelected);
    });


    $("#volunteer").on('click', function (e) {
        e.preventDefault();
        groupSelected = "Volunteers";
        console.log(groupSelected);
    });

    $("#donors").on('click', function (e) {
        e.preventDefault();
        groupSelected = "Donors";
        console.log(groupSelected);
    });

    $("#familyGroup").on('click', function (e) {
        e.preventDefault();
        groupSend = "Families";
        console.log(groupSend);
    });


    $("#volunteerGroup").on('click', function (e) {
        e.preventDefault();
        groupSend = "Volunteers";
        console.log(groupSend);
    });

    $("#donorGroup").on('click', function (e) {
        e.preventDefault();
        groupSend = "Donors";
        console.log(groupSend);
    });




    $("#btnAdd").on("click", function (e) {
        e.preventDefault();

        sendNumber1 = {
            number: $("#txtClient1").val(),
            group: groupSelected
        };

        $("#txtClient1").val("");
        sendNumber();
    });

    $("#messageSend").on("click", function (e) {
        e.preventDefault();

        sendMessage1 = {
            message: $("#form_message").val(),
            groupSend: groupSend
        };

        $("#form_message").val("");
        sendMessage();
    });
}
function sendMessage() {
    $.ajax({
        type: "POST",
        url: "/ccn",
        data: sendMessage1,
        success: function (responseFromServer) {
            console.log(responseFromServer);
        }
    });
    console.log(sendMessage1);
}

function sendNumber() {
    $.ajax({
        type: "POST",
        url: "/ccn",
        data: sendNumber1,
        success: function (responseFromServer) {
            console.log(responseFromServer);
        }
    });
    console.log(sendNumber1);
}
