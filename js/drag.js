
var $ = require('jquery');
var kt = require('kutility');

module.exports = function($elements, options) {
  if (!options) options = {};

  var trackingState = {
    $activeElement: null,
    lastMousePosition: {},
    offsetFromMouse: {},
    z: 0,
    $hoverElement: null,
    hoverElementNaturalZ: 0
  };

  zShuffle($elements);

  $elements.mousedown(function(ev) {
    trackingState.$activeElement = $(this);
    trackingState.$hoverElement = null;

    trackingState.$activeElement.css('z-index', ++trackingState.z);
    trackingState.$activeElement.addClass('dragging');

    var thisOffset = trackingState.$activeElement.offset();
    trackingState.offsetFromMouse.x = thisOffset.left - ev.pageX;
    trackingState.offsetFromMouse.y = thisOffset.top - ev.pageY;
  });

  $elements.mouseup(function() {
    trackingState.$activeElement.removeClass('dragging');
    trackingState.$activeElement = null;
  });

  if (options.riseOnHover) {
    $elements.hover(
      function() {
        var $this = $(this);
        var z = $this.css('z-index');

        $this.css('z-index', trackingState.z + 1);

        trackingState.$hoverElement = $this;
        trackingState.hoverElementNaturalZ = z;
      },
      function() {
        if (trackingState.$hoverElement) {
          trackingState.$hoverElement.css('z-index', trackingState.hoverElementNaturalZ);
          trackingState.$hoverElement = null;
        }
      }
    );
  }

  $(document).mousemove(function(ev) {
    if (trackingState.$activeElement) {
      var left = ev.pageX + trackingState.offsetFromMouse.x;
      trackingState.$activeElement.css('left', left + 'px');

      var top = ev.pageY + trackingState.offsetFromMouse.y;
      trackingState.$activeElement.css('top', top + 'px');
    }

    trackingState.lastMousePosition.x = ev.pageX;
    trackingState.lastMousePosition.y = ev.pageY;
  });

  function zShuffle() {
    var $shuffledElements = kt.shuffle($elements);
    for (var i = 0; i < $shuffledElements.length; i++) {
      var $el = $($shuffledElements[i]);
      $el.css('z-index', ++trackingState.z);
    }
  }
};
