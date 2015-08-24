
(function() {
  var dragula = require('dragula');
  var kt = require('kutility');
  var $ = require('jquery');

  doTitleScreen(function() {
    console.log('unlocked the key!!');
  });

  function doTitleScreen(callback) {
    var $titleWordContainer = $('#title-screen-starter-bucket');

    var titleWords = kt.shuffle('and rakes to spread the haul'.split(' '));
    for (var i = 0; i < titleWords.length; i++) {
      var word = titleWords[i];
      var $wordDiv = $('<div class="title-screen-word">' + word + '</div>');
      $titleWordContainer.append($wordDiv);
    }

    var dragContainers = [
      document.querySelector('#title-screen-starter-bucket'),

      document.querySelector('#title-screen-bucket-1'),
      document.querySelector('#title-screen-bucket-2'),
      document.querySelector('#title-screen-bucket-3'),
      document.querySelector('#title-screen-bucket-4'),
      document.querySelector('#title-screen-bucket-5'),
      document.querySelector('#title-screen-bucket-6')
    ];

    var voidMap = {};

    var drake = dragula(dragContainers, {
      accepts: function (el, target) {
        if (target.className === 'title-screen-bucket') {
          return !voidMap[target.id];
        }

        return true;
      },
      revertOnSpill: true
    });

    drake.on('drop', function(el, target, source) {
      if (target.className === 'title-screen-bucket') {
        voidMap[target.id] = true;
      }
      else if (source.className === 'title-screen-bucket') {
        voidMap[source.id] = false;
      }

      checkForValidState();
    });

    function checkForValidState() {
      var bucketIDs = [
        'title-screen-bucket-1',
        'title-screen-bucket-2',
        'title-screen-bucket-3',
        'title-screen-bucket-4',
        'title-screen-bucket-5',
        'title-screen-bucket-6'
      ];
      var orderedWords = 'and rakes to spread the haul'.split(' ');

      for (var i = 0; i < bucketIDs.length; i++) {
        var id = bucketIDs[i];
        if (!voidMap[id]) {
          return;
        }

        var text = $('#'+ id).text().trim();
        if (text !== orderedWords[i]) {
          return;
        }
      }

      if (callback) {
        callback();
      }
    }
  }

})();
