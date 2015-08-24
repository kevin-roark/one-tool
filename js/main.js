
(function() {
  var $ = require('jquery');
  var doTitleScreen = require('./title-screen');

  var SKIP_TITLE = true;

  if (!SKIP_TITLE) {
    doTitleScreen(function() {
      console.log('unlocked the key!!');
      startRaking();
    });
  }
  else {
    startRaking();
  }

  function startRaking() {
    $('#title-screen').fadeOut(2000);

    var $rake = $('#rake');
    $(document).mousemove(function(ev) {
      $rake.css('left', ev.pageX + 'px');
      $rake.css('top', ev.pageY + 'px');
    });
  }

})();
