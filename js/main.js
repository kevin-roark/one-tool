
(function() {
  var $ = require('jquery');
  var buzz = require('./lib/buzz.js');
  var doTitleScreen = require('./title-screen');
  var drag = require('./drag');

  var isPhone = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

  if (isPhone) {
    var $mobileError = $('.mobile-error');
    $mobileError.show();
    setTimeout(function() {
      $mobileError.fadeOut(5555);
    }, 3333);
  }

  var SKIP_TITLE = isPhone;

  if (!SKIP_TITLE) {
    doTitleScreen(function() {
      startRaking();
    });
  }
  else {
    startRaking();
  }

  function startRaking() {
    $('#title-screen').fadeOut(1000);

    var $rake = $('#rake');
    $rake.show();
    followCursor($rake);

    var $poems = $('.poem');

    arrangeCards($poems, $('#poems'));
    numberCards($poems, 'poem-number');

    drag($poems);

    var mouseSound = new buzz.sound('/media/click', {
      formats: [ "ogg", "mp3"],
      webAudioApi: true,
      volume: 100
    });
    var rakeSound = new buzz.sound('/media/scrape', {
      formats: [ "ogg", "mp3"],
      webAudioApi: true,
      volume: 1,
      loop: true
    });

    var soundMouseState = {
      isDragging: false
    };
    $poems.mousedown(function() {
      mouseSound.play();
      rakeSound.play();
      soundMouseState.isDragging = true;
    });
    $poems.mouseup(function() {
      rakeSound.pause();
      soundMouseState.isDragging = false;
    });
    $(document).mousemove(function(ev) {
      if (soundMouseState.isDragging) {
        var now = new Date();
        var x = ev.pageX;
        var y = ev.pageY;

        if (soundMouseState.lastMoveTime) {
          var td = now - soundMouseState.lastMoveTime; // ms
          var xd = x - soundMouseState.lastMouseX;
          var yd = y - soundMouseState.lastMouseY;
          var vel = (Math.abs(xd) + Math.abs(yd)) / td;

          var maxExpectedVel = 12;
          var volume = Math.max(1, Math.min(100, vel / maxExpectedVel * 100));
          rakeSound.setVolume(parseInt(volume));
        }

        soundMouseState.lastMouseX = x;
        soundMouseState.lastMouseY = y;
        soundMouseState.lastMoveTime = now;
      }
    });
  }

  function followCursor($el) {
    $(document).mousemove(function(ev) {
      $el.css('left', (ev.pageX - $el.width() / 2) + 'px');
      $el.css('top', (ev.pageY - $el.height() / 2) + 'px');
    });
  }

  function arrangeCards($cards, $container) {
    for (var i = 0; i < $cards.length; i++) {
      var $card = $($cards[i]);

      $card.css('position', 'absolute');

      var left = parseInt(Math.random() * ($container.width() - $card.width() - 25));
      $card.css('left', left);

      var top = parseInt(Math.random() * ($container.height() - $card.height() - 25));
      $card.css('top', top);
    }
  }

  function numberCards($cards, className) {
    for (var i = 0; i < $cards.length; i++) {
      var $card = $($cards[i]);

      var $number = $('<div class="' + className + '">' + (i + 1) + '</div>');
      $card.append($number);
    }
  }

})();
