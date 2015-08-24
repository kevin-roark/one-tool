
var dragula = require('dragula');
var kt = require('kutility');
var $ = require('jquery');

module.exports = function (callback) {
  var $titleWordContainer = $('#title-screen-starter-bucket');

  var titleWords = kt.shuffle('and rakes to spread the haul'.split(' '));
  for (var i = 0; i < titleWords.length; i++) {
    var word = titleWords[i];
    var $wordDiv = $('<div class="title-screen-word">' + word + '</div>');
    $titleWordContainer.append($wordDiv);
  }

  var bucketIDs = [
    '#title-screen-bucket-1',
    '#title-screen-bucket-2',
    '#title-screen-bucket-3',
    '#title-screen-bucket-4',
    '#title-screen-bucket-5',
    '#title-screen-bucket-6'
  ];

  var dragContainers = [
    document.querySelector('#title-screen-starter-bucket')
  ];
  for (i = 0; i < bucketIDs.length; i++) {
    var bucketID = bucketIDs[i];
    dragContainers.push(document.querySelector(bucketID));

    var left = parseInt((window.innerWidth - 225 - 50 * 2) * Math.random() + 25);
    $(bucketID).css('margin-left', left + 'px');
  }

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
    var $target = $(target);
    var $source = $(source);

    if ($target.hasClass('title-screen-bucket')) {
      voidMap[target.id] = true;
      $(target).addClass('filled');
    }

    if ($source.hasClass('title-screen-bucket')) {
      voidMap[source.id] = false;
      $(source).removeClass('filled');
    }

    checkForValidState();
  });

  function checkForValidState() {
    var bucketIDs = [
      '#title-screen-bucket-1',
      '#title-screen-bucket-2',
      '#title-screen-bucket-3',
      '#title-screen-bucket-4',
      '#title-screen-bucket-5',
      '#title-screen-bucket-6'
    ];
    var orderedWords = 'and rakes to spread the haul'.split(' ');

    for (var i = 0; i < bucketIDs.length; i++) {
      var id = bucketIDs[i];

      var text = $(id + '> ' + '.title-screen-word').text().trim();
      if (text !== orderedWords[i]) {
        return;
      }
    }

    if (callback) {
      callback();
    }
  }
}
