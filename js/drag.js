
var $ = require('jquery');

module.exports = function($elements) {
  var trackingState = {
    $activeElement: null,
    lastMousePosition: {},
    offsetFromMouse: {},
    z: 0
  };

  $elements.mousedown(function(ev) {
    trackingState.$activeElement = $(this);

    trackingState.$activeElement.css('z-index', ++trackingState.z);

    var thisOffset = trackingState.$activeElement.offset();
    trackingState.offsetFromMouse.x = thisOffset.left - ev.pageX;
    trackingState.offsetFromMouse.y = thisOffset.top - ev.pageY;
  });
  $elements.mouseup(function() {
    trackingState.$activeElement = null;
  });

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
};
