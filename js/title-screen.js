
var dragula = require('dragula');
var kt = require('kutility');
var $ = require('jquery');
var buzz = require('./lib/buzz.js');

module.exports = function (callback) {
  var hasSolvedPuzzle = false;

  var $starterBucketContainer = $('#title-screen-starter-bucket-container');

  var orderedWords = 'And Rakes To Spread The Haul'.split(' ');
  var shuffledWords = kt.shuffle(orderedWords);

  var starterBucketIDs = [];

  for (var i = 0; i < shuffledWords.length; i++) {
    var word = shuffledWords[i];
    var $wordEl = $('<span class="title-screen-word">' + word + '</span>');

    var id = 'starter-bucket-' + (i+1);
    starterBucketIDs.push(id);

    var $containerDiv = $('<div class="title-screen-word-starter-bucket" id="' + id + '"></div>');
    $containerDiv.append($wordEl);

    $starterBucketContainer.append($containerDiv);
  }

  var bucketIDs = [
    'title-screen-bucket-1',
    'title-screen-bucket-2',
    'title-screen-bucket-3',
    'title-screen-bucket-4',
    'title-screen-bucket-5',
    'title-screen-bucket-6'
  ];

  var voidMap = {};
  var dragContainers = [];

  for (i = 0; i < starterBucketIDs.length; i++) {
    var starterBucketID = starterBucketIDs[i];
    dragContainers.push(document.querySelector('#' + starterBucketID));
    voidMap[starterBucketID] = true;
  }

  for (i = 0; i < bucketIDs.length; i++) {
    var bucketID = bucketIDs[i];
    dragContainers.push(document.querySelector('#' + bucketID));

    var minLeft = 175;
    var left = parseInt((window.innerWidth - 225 - minLeft - 50) * Math.random()) + minLeft;
    $('#' + bucketID).css('margin-left', left + 'px');

    voidMap[bucketID] = false;
  }

  var drake = dragula(dragContainers, {
    accepts: function (el, target) {
      return !voidMap[target.id];
    },
    revertOnSpill: true
  });

  var chaChing = new buzz.sound('/media/money', {
    formats: [ "ogg", "mp3"],
    webAudioApi: true,
    volume: 75
  });

  drake.on('drop', function(el, target, source) {
    voidMap[target.id] = true;
    voidMap[source.id] = false;

    var $target = $(target);
    var $source = $(source);

    $source.addClass('void');
    $target.removeClass('void');

    if ($target.hasClass('title-screen-bucket')) {
      $target.addClass('filled');

      if (textForBucketWithIDIsValid(target.id)) {
        $target.addClass('correct');
        chaChing.setTime(0);
        chaChing.play();
      }
    }

    if ($source.hasClass('title-screen-bucket')) {
      $source.removeClass('filled');
      $source.removeClass('correct');
    }

    checkForValidState();
  });

  // add hints after thirty seconds
  setTimeout(function() {
    if (hasSolvedPuzzle) {
      return;
    }

    for (var i = 0; i < orderedWords.length; i++) {
      var word = orderedWords[i];
      var $hintEl = $('<span class="title-screen-word-hint">' + word + '</span>');

      var $bucket = $('#' + bucketIDs[i]);
      $bucket.append($hintEl);

      $hintEl.fadeIn(1000);
    }

    var $additionalInstructions = $('<span style="display: none; text-decoration: underline;"> Make it say "And Rakes To Spread The Haul."</span>');
    $('#title-screen-instructions').append($additionalInstructions);
    $additionalInstructions.fadeIn(1000);
  }, 30 * 1000);

  function checkForValidState() {
    for (var i = 0; i < bucketIDs.length; i++) {
      var id = bucketIDs[i];
      if (!textForBucketWithIDIsValid(id)) {
        return;
      }
    }

    if (callback && !hasSolvedPuzzle) {
      callback();
    }

    hasSolvedPuzzle = true;
  }

  function textForBucketWithIDIsValid(id) {
    var idx = bucketIDs.indexOf(id);
    var text = $('#' + id + ' > ' + '.title-screen-word').text().trim();
    return text === orderedWords[idx];
  }
};
