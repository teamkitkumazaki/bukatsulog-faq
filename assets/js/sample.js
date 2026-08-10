$(function(){
  $('[data-modal="overlay"], [data-modal="content"]').hide();

  $('[data-modal="button"]').on('click', function(){
    posi = $(window).scrollTop();
    $('[data-modal="fixed"]').css({
      position: 'fixed',
      top: -1 * posi
    });
    $('[data-modal="overlay"], [data-modal="content"]').fadeIn();
  });

  $('[data-modal="close"],[data-modal="overlay"]').on('click', function(){
    $('[data-modal="fixed"]').attr('style', '');
    $('html, body').prop({scrollTop: posi});
    $('[data-modal="overlay"], [data-modal="content"]').fadeOut();
  });
});
