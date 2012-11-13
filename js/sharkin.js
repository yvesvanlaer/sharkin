var t;
if (!($ = window.jQuery)) { // typeof jQuery=='undefined' works too
  script = document.createElement( 'script' );
   script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
  script.onload=sharkin;
  document.body.appendChild(script);
}
else {
  sharkin();
}

function sharkin() {
  $('body').append("<div style='position: absolute; z-index: 99999; display: block; height: 150px; width: 150px; top: 0px; left: 0px; background:#ffcc00;'>Alright, we're sharkin!</div>");
  getNewSongs(1);
  t = setInterval(getNewSongs, 5000);
  var p = setInterval(getControls, 1000);

  window.Grooveshark.play();
}

function getControls() {
  request = $.ajax({
    type: 'get',
    data: {'action':'getControls'},
    url: ajaxpath,
    crossDomain: true,
    dataType: "jsonp",
  });
  request.done(function (result) {handleAjaxResult(result);});
}

function getNewSongs(addedvar) {
  var request;
  if (addedvar) {
    request = $.ajax({
      type: 'get',
      data: {'added':addedvar, 'action':'getNewSongs'},
      url: ajaxpath,
      crossDomain: true,
      dataType: "jsonp",
    });
  }
  else {
    request = $.ajax({
      type: 'get',
      url: ajaxpath,
      data: {'action':'getNewSongs'},
      crossDomain: true,
      dataType: "jsonp",
    });
  }
  request.done(function (result) {handleAjaxResult(result);});
}
var playing = 0;
function handleAjaxResult(result) {
  for (var key in result) {
    if (key == "addSongsByID") {
      window.Grooveshark.addSongsByID(result[key]);
    }
    if (key == "stopInterval") {
      clearInterval(t);
    }
    if (key == "play") {
      // plays start over when the song was already running...
      if (playing == 0) {
        window.Grooveshark.play();
        playing = 1;
      }
    }
    if (key == "pause") {
      // plays start over when the song was already running...
      if (playing == 1) {
        window.Grooveshark.pause();
        playing = 0;
      }
    }
    if (key == "next") {
      window.Grooveshark.next();
    }
    if (key == "previous") {
      window.Grooveshark.previous();
    }
  }

}
