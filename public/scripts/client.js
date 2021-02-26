/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function() {
  const $newTweet = $('.new-tweet');

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  const createTweetElement = function(tweetData) {
    let $tweet = `
    <article class="tweet">
      <div class="spread-apart">
        <div class="left">
          <img class="profile-pic" src="${tweetData.user.avatars}" alt="Profile pic">
          <span>${tweetData.user.name}</span>
        </div>
        <span class="username">${tweetData.user.handle}</span>
      </div>
      <p> 
        ${escape(tweetData.content.text)}
      </p>
      <div class="spread-apart tweet-footer">
        <span>${new Date(tweetData.created_at)}</span>
        <span>
          <a href="www.google.com"><i class="fas fa-flag fa-xs"></i></a>
          <a href="www.google.com"><i class="fas fa-retweet fa-xs"></i></a>
          <a href="www.google.com"><i class="fas fa-heart fa-xs"></i></a>
        </span>
      </div>
    </article>
    `;
    return $tweet;
  };
  
  const renderTweets = function(tweets) {
      for(let tweet of tweets) {
        // insertAfter prevents tweet order from being reversed.
        $(createTweetElement(tweet)).insertAfter($newTweet);
      }
  };
  
  const loadTweets = function() {
    return $.ajax({
      url: '/tweets',
      method: 'GET',
    })
  };

  $('#create-tweet').on('submit', function(event) {
    event.preventDefault();
    const $form = $(this)
    const $textArea = $form.find('.tweet-text');
    const text = $textArea.val();
    const textLength = text.length;
    if(text !== '' && textLength <= 140) {
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $form.serialize()
      }).then(()=>{
        $('.tweet').remove();
        loadTweets();
      });
      $textArea.val('');
      $form.find('.counter').val('140');
    } else if(textLength > 140){
      $('#longWarning').fadeIn().delay(2000).fadeOut();
    } else {
      $('#emptyWarning').fadeIn().delay(2000).fadeOut();
    }
  });

  $('#tweet-btn-redirect').on('click', function(event) {
    event.preventDefault()
    $('textarea').focus();
  });
  
  loadTweets().then(renderTweets);
});



