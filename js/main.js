
(function() {
  var $ = require('jquery');
  var doTitleScreen = require('./title-screen');
  var drag = require('./drag');

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
    followCursor($rake);

    var $poems = $('.poem');

    arrangeCards($poems, $('#poems'));
    numberCards($poems, 'poem-number');

    drag($poems);
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
