var athleteNames = [
  "lebron james",
  "aaron judge",
  "michael phelps",
  "saquon barkley",
  "odell beckham"
];

$(document).ready(function() {
  function renderButtons() {
    $("#gif-buttons").empty();
    for (i = 0; i < athleteNames.length; i++) {
      var a = $("<button>");
      a.addClass("gif-button");
      a.attr("data-athlete", athleteNames[i]);
      a.text(athleteNames[i]);
      $("#gif-buttons").append(a);
    }
  }

  renderButtons();

  $("#add-athlete").on("click", function() {
    event.preventDefault();
    var athlete = $("#athlete-input")
      .val()
      .trim();
    athleteNames.push(athlete);
    renderButtons();
  });

  function displayGifInfo() {
    var athleteGif = $(this).attr("data-athlete");
    var athleteString = athleteGif.split(" ").join("+");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      athleteString +
      "&api_key=OXm6sJluPOgZQfAKJeQ1m4RQp4hZph9D&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      console.log(response);
      var results = response.data;
      $("#gifs").empty();
      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");
        var p = $("<p>").text("Rating: " + results[i].rating);
        var gifImg = $("<img>");

        gifImg.attr("src", results[i].images.original_still.url);
        gifImg.attr("data-still", results[i].images.original_still.url);
        gifImg.attr("data-animate", results[i].images.original.url);
        gifImg.attr("data-state", "still");
        gifImg.attr("class", "gif");
        gifDiv.append(p);
        gifDiv.append(gifImg);
        gifDiv.addClass("col-md-4");
        $("#gifs").append(gifDiv);
      }
    });
  }

  function changeState() {
    var state = $(this).attr("data-state");
    var animateImage = $(this).attr("data-animate");
    var stillImage = $(this).attr("data-still");

    if (state == "still") {
      $(this).attr("src", animateImage);
      $(this).attr("data-state", "animate");
    } else if (state == "animate") {
      $(this).attr("src", stillImage);
      $(this).attr("data-state", "still");
    }
  }
  $(document).on("click", ".gif-button", displayGifInfo);
  $(document).on("click", ".gif", changeState);
});
