/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


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
  `
  return $tweet;
};

const renderTweets = function(tweets) {
  $(document).ready(function() {
    for(let tweet of tweets) {
      $(createTweetElement(tweet)).insertAfter('.new-tweet');
    }
  });
}

const loadTweets = function() {
  $.ajax({
    url: '/tweets',
    method: 'GET',
  }).then(renderTweets);
}

const createWarningMessage = (warning) => {
 return `
 
 `;
}


$(document).ready(function() {
  $('#create-tweet').on('submit', function(event) {
    event.preventDefault();
    // add user field in ajax
    const text = $(this).children('textarea').val();
    const textLength = text.length;
    if(text !== '' && textLength <= 140) {
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize()
      }).then(()=>{
        $('.tweet').remove();
        loadTweets();
      });
      $(this).children('textarea').val('');
      $(this).find('output').val('140');
    } else if(textLength > 140){
      // alert('Too many characters');
      // $('.container').prepend(createWarningMessage('Please use less that 140 characters')).delay(2000);
      $('#longWarning').fadeIn().delay(2000).fadeOut();
    } else {
      $('#emptyWarning').fadeIn().delay(2000).fadeOut();
    }
  })
})

loadTweets();