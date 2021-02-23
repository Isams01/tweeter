$(document).ready(function() {
  $('#tweet-text').on('keyup', function() {
    const currentNumChars = $(this).val().length;
    $(this.closest('form')).find('output').val(140 - currentNumChars);
  });
});
