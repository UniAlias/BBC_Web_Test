$(document).ready(function() {
//Set the initial page pageNumber
var pageNumber = 1;

//Initially hide the rate button
$('#rateArticlesButton').hide();

//Change the paragraph that contains the page pageNumber
$('#pageNumber').text(pageNumber);
//$('#articleContainer').text(pageNumber);
var mainContainer = $('#bigBackground');

$.ajax({
    type: "GET",
    url: "https://raw.githubusercontent.com/bbc/news-coding-test-dataset/master/data/article-1.json",
    dataType: 'json',
    withCredentials: true,
    success: function (response) {
        //print response
        console.log(response);

    },
    error: function (xhr, status) {
        // handle errors
        console.log("There are errors");
    }
});

/*
 ============================================================================
 ===============================BUTTON ACTIVITY==============================
 ============================================================================
*/


/* ===============================PREVIOUS BUTTON============================== */
//Function that is used when the previousButton is clicked
$('#previousButton').click(function() {

  //Check that the pageNumber is within boundaries
  if ((pageNumber > 1) && (pageNumber < 6)) {
    //Wipe the articleContainer
    $('#articleContainer').empty();
    $('#articleContainer').text("");
    $('#articleContainer').append('<div id=articleDiv></div>')

    //Call the json file for the next article
    $.ajax({
      type: "GET",
      url: "https://raw.githubusercontent.com/bbc/news-coding-test-dataset/master/data/article-" + pageNumber + ".json",
      dataType: 'json',
      withCredentials: true,
      success: function (response) {
        //print the response
        console.log(response);

        //This is an array that contains the data that we actually want to use
        var usableData = response.body;

        //loop through the data array
        for (var i in usableData) {
          console.log(usableData[i].type);
          //Check if its a heading element and append appropriately
          if (usableData[i].type == "heading") {
            $('#articleDiv').append('<h3>' + usableData[i].model.text + '</h3');
          } else if (usableData[i].type == "image") {
            console.log(usableData[i].model.altText);
            $('#articleDiv').append('<div><img src=' + usableData[i].model.url + ' alt="' + usableData[i].model.altText + '"></img></div>');
          } else if (usableData[i].type == "paragraph") {
            $('#articleDiv').append('<div><p>' + usableData[i].model.text + '</p></div>');
          } else if (usableData[i].type == "list") {
            //console.log("this is a list");
            //console.log(usableData[i].model.type);
            if (usableData[i].model.type == "unordered") {
              var unorderedListOutput = "<div><ul>";
              console.log(usableData[i].model.items);
              for (var j in usableData[i].model.items) {
                unorderedListOutput += "<li>" + usableData[i].model.items[j] + "</li>";
              }
              unorderedListOutput += "</ul></div>";
              $('#articleDiv').append(unorderedListOutput);
            } else if (usableData[i].model.type == "ordered") {
              var orderedListOutput = "<div><ol>";
              //console.log(usableData[i].model.items);
              for (var k in usableData[i].model.items) {
                orderedListOutput += "<li>" + usableData[i].model.items[k] + "</li>";
              }
              orderedListOutput += "</ol></div>";
              $('#articleDiv').append(orderedListOutput);
            }
          }

        }


        //Testing purposes
        pageNumber--;
        //$('#articleContainer').text(pageNumber);
        $('#pageNumber').text(pageNumber);
      },
      error: function (xhr, status) {
        console.log("There are errors");
      }
    });

  }
  else {
    //alert("Page is not within boundaries");
    console.log("Page number is not within boundaries");
  }
});


/* ===============================NEXT BUTTON============================== */
//Functiion that is used when the nextButton is clicked
$('#nextButton').click(function() {


  //Check that the pageNumber is within boundaries
  if ((pageNumber >= 1) && (pageNumber <= 4)) {
    //Wipe the articleContainer
    $('#articleContainer').empty();
    $('#articleContainer').text("");
    $('#articleContainer').append('<div id=articleDiv></div>')

    //Let the rate button appear if it is on article 5


    $.ajax({
      type: "GET",
      url: "https://raw.githubusercontent.com/bbc/news-coding-test-dataset/master/data/article-" + pageNumber + ".json",
      dataType: 'json',
      withCredentials: true,
      success: function (response) {
        //print the response
        console.log(response);

        //This is an array that contains the data that we actually want to use
        var usableData = response.body;

        //loop through the data array
        for (var i in usableData) {
          console.log(usableData[i].type);
          //Check if its a heading element and append appropriately
          if (usableData[i].type == "heading") {
            $('#articleDiv').append('<h3>' + usableData[i].model.text + '</h3');
          } else if (usableData[i].type == "image") {
            console.log(usableData[i].model.altText);
            $('#articleDiv').append('<div><img src=' + usableData[i].model.url + ' alt="' + usableData[i].model.altText + '"></img></div>');
          } else if (usableData[i].type == "paragraph") {
            $('#articleDiv').append('<div><p>' + usableData[i].model.text + '</p></div>');
          } else if (usableData[i].type == "list") {
            //console.log("this is a list");
            //console.log(usableData[i].model.type);
            if (usableData[i].model.type == "unordered") {
              var unorderedListOutput = "<div><ul>";
              console.log(usableData[i].model.items);
              for (var j in usableData[i].model.items) {
                unorderedListOutput += "<li>" + usableData[i].model.items[j] + "</li>";
              }
              unorderedListOutput += "</ul></div>";
              $('#articleDiv').append(unorderedListOutput);
            } else if (usableData[i].model.type == "ordered") {
              var orderedListOutput = "<div><ol>";
              //console.log(usableData[i].model.items);
              for (var k in usableData[i].model.items) {
                orderedListOutput += "<li>" + usableData[i].model.items[k] + "</li>";
              }
              orderedListOutput += "</ol></div>";
              $('#articleDiv').append(orderedListOutput);
            }
          }

        }

        //Testing purposes
        //Change the pageNumber variable
        pageNumber++;
        if (pageNumber == 5) {
          $('#rateArticlesButton').show();
        }

        //$('#articleContainer').text(pageNumber);
        $('#pageNumber').text(pageNumber);

      },
      error: function (xhr, status) {
        console.log("There are errors");
      }
    });
  }
  else {
    //alert("Page is not within boundaries");
    console.log("Page number is not within boundaries");
  }
});

});
