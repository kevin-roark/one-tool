
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
    $('#title-screen').fadeOut(1000);

    var $rake = $('#rake');

    var $poems = $('.poem');
    arrangeCards($poems, $('#poems'));

    var $activePoem;
    $poems.mousedown(function() {
      $activePoem = $(this);
    });
    $poems.mouseup(function() {
      $activePoem = null;
    });

    var mouseState = {};
    $(document).mousemove(function(ev) {
      followCursor($rake, ev);

      if ($activePoem) {
        var offset = $activePoem.offset();

        var dx = ev.pageX - mouseState.x;
        var left = parseInt(offset.left + dx);
        console.log(left);
        $activePoem.css('left', left + 'px');

        var dy = ev.pageY - mouseState.y;
        var top = offset.top - dy;
        $activePoem.css('top', top + 'px');
      }

      mouseState.x = ev.pageX; mouseState.y = ev.pageY;
    });
  }

  function followCursor($el, ev) {
    $el.css('left', (ev.pageX - $el.width() / 2) + 'px');
    $el.css('top', (ev.pageY - $el.height() / 2) + 'px');
  }

  function arrangeCards($cards, $container) {
    for (var i = 0; i < $cards.length; i++) {
      var $card = $($cards[i]);

      $card.css('position', 'absolute');

      var left = parseInt(Math.random() * ($container.width() - $card.width()));
      $card.css('left', left);

      var top = parseInt(Math.random() * ($container.height() - $card.height()));
      $card.css('top', top);
    }
  }

})();
