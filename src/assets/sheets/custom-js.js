(function($) {
  $('body').on('click', '.btn-show', function() {
    if ($(this).hasClass('shown')) {
      $(this).removeClass('shown').text('SHOW').prev('input').attr({'type': 'password', 'placeholder': '••••••••'});      
    } else {
      $(this).addClass('shown').text('HIDE').prev('input').attr({'type': 'text', 'placeholder': 'Password'});
    }
  });
})(jQuery);
