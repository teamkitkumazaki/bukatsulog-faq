$(function() {
  console.log('conversion.js');
  //ギフトのフォームにナンバリング + コンバージョンイベント追加

  function formAsset(target) {
    var submitButton = [];
    var submitForm = [];

    function init() {
      target.find('form').each(function(index) {
        submitForm[index] = $(this);
        submitForm[index].attr('id', 'form' + index);
        submitButton[index] = $(this).find('.cartjs_cart_in').find('input');
        submitButton[index].attr('onclick', 'gtag_report_conversion2(' + index + '); return false;');
        submitButton[index].on({
          'click': function() {
            return false;
            gtag_report_conversion2(index);
          }
        })
      });
    }

    init();

  }

    $(window).on({
      'load': function(){
          formAsset($('#productList'));
      }
    })

});
