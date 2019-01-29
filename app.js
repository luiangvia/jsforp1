var teamNames = ["Atlanta Hawks", "Boston Celtics", "Brooklyn Nets", "Charlotte Hornets", "Chicago  Bulls", "Cleveland Cavaliers", "Dallas Mavericks", "Denver Nuggets", "Detroit Pistons", "Golden State Warriors", "Houston Rockets", "Indiana Pacers", "Los Angeles Clippers", "Los Angeles Lakers", "Memphis Grizzlies", "Miami Heat", "Milwaukee Bucks", "Minnesota Timberwolves", "New Orleans Pelicans", "New York Knicks", "Oklahoma City Thunder", "Orlando Magic", "Philadelphia 76ers", "Phoenix Suns", "Portland Trail Blazers", "Sacramento Kings", "San Antonio Spurs", "Utah Jazz", "Toronto Raptors", "Washington Wizards"];
var teamId = ["134880", "134860", "134861", "134881","134870", "134871", "134875", "134885", "134872", "134865", "134876", "134873", "134866", "134867", "134877", "134882", "134874", "134886", "134878", "134862", "134887", "134883", "134863", "134868", "134888", "134869", "134879", "134889","134864", "134884" ];
var actualTeams = [];
for (i=0 ; i<teamId.length; i++){ 
  var teamObj = {
    "id": teamId[i],
    "name": teamNames[i]
  }
actualTeams.push(teamObj)
}
function renderButtons() {
  $("#buttons").empty();
  for (var i = 0; i < actualTeams.length; i++) {
    var teamBtn = $("<button>");
    teamBtn.addClass("team-btn");
    teamBtn.attr("data-name", actualTeams[i].id);
    teamBtn.text(actualTeams[i].name);
    $("#buttons").append(teamBtn);
  }
};
renderButtons();

function displayFutureMatches() {
  var team = $(this).attr("data-name");
  var queryURL = "https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=" + team;
console.log(queryURL)
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
var eventlink = response.events 
for (var i = 0; i < eventlink.length; i++) {
    var matchDiv = $("<div id='nextfive'>");
    var matchOne = eventlink[i].strEvent;
    var firstdate = eventlink[i].dateEvent;
    var firsttime = eventlink[i].strTime;
    var mOne = $("<p>").text(" Home " + matchOne + " Away " + " Date: " + firstdate + " Time: " + firsttime);
    matchDiv.append(mOne);
    $('#nextfive').empty();
   $("#match-view").append(matchDiv);
}
  });
}

function displayPlayers() {
  var team = $(this).attr("data-name");
  var queryURL = "https://www.thesportsdb.com/api/v1/json/1/lookup_all_players.php?id=" + team;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
var playerlink = response.player  
    for (var i = 0; i < playerlink.length; i++) {
    var playerDiv = $("<div id='player'>");
    var playername = playerlink[i].strPlayer;
    var playerposition = playerlink[i].strPosition;
    var height = playerlink[i].strHeight;
    var weight = playerlink[i].strWeight;
    var nationality = playerlink[i].strNationality;
    var dateborn = playerlink[i].dateBorn;
    var playerimage= playerlink[i].strThumb;
var playerinfos = $("<p>").text(" Name: " + playername  + " Nationality: " + nationality + " Born: " + dateborn +" Height: " + height + " Weight: " + weight + " Position: " + playerposition);
playerDiv.append(playerinfos);
var image = $("<img>").attr("src", playerimage);
playerDiv.append(image);
    $('#player').empty();
    $("#playerinfo").append(playerDiv);
}
  });
}


function displayPreviousMatches() {
  var team = $(this).attr("data-name");
  var queryURL = "https://www.thesportsdb.com/api/v1/json/1/eventslast.php?id=" + team;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    var resultslink = response.results
    for (var i = 0; i < resultslink.length; i++) {
      var previousmatchDiv = $("<div id='previousfive'>");
      var homeTeam = resultslink[i].strHomeTeam;
      var homeScore = resultslink[i].intHomeScore
      var awayScore = resultslink[i].intAwayScore
      var awayTeam = resultslink[i].strAwayTeam;
      var gameDate = resultslink[i].dateEvent;
      var pOne = $("<p>").text(" Date: " + gameDate + " Home " + homeTeam + " " + homeScore + "-" + awayScore + " " + awayTeam + " " + "Away");
      previousmatchDiv.append(pOne);
      $('#previousfive').empty();
      $("#previous-matches").append(previousmatchDiv);
    }
  });
}

function displayTeamBio() {
  var team = $(this).attr("data-name");
  var queryURL = "https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=" + team;
  $.ajax({
      url: queryURL,
      method: "GET"
  }).then(function (response) {
      var teamlink = response.teams
      var teambioDiv = $("<div id='teambioinfo'>");
      var teamname = teamlink[0].strTeam;
      var teamyear = teamlink[0].intFormedYear;
      var stadium = teamlink[0].strStadium;
      var headcoach = teamlink[0].strManager;
      var teamlogo = teamlink[0].strTeamBadge;
      var teaminfos = $("<p>").text(" Team Name: " + teamname + " " + " Formed: " + teamyear + " " + " Stadium: " + stadium + " " + "Head Coach:" + headcoach)
      teambioDiv.append(teaminfos);
      var teamlogoimage = $("<img>").attr("src", teamlogo);
      teambioDiv.append(teamlogoimage);
      $('#teambioinfo').empty();
      $('#teambioinfo').empty();
      $("#teaminfo").append(teambioDiv);
  }); 
}
$(document).on("click", ".team-btn", displayFutureMatches);
$(document).on("click", ".team-btn", displayTeamBio);
$(document).on("click", ".team-btn", displayPlayers);
$(document).on("click", ".team-btn", displayPreviousMatches);
