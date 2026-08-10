$(function() {

  function setCategoryName(){
    var domain = 'https://' + location.host;
    var upSellState = $('#upsellSection').text().length;
    var cartItem = $('#cartItem');
    var cartItemLength = 0;
    var cartItemCategory = [];
    var linkURL = [];
    var linkURLCart = [];
    var targetDom = [];
    var setCategory = 0;

    function ajaxLoad(){
      var upsellSection = $('#upsellSection');
      upsellSection.find(".rktheme-grid-item").each(function(index) {
        linkURL[index] = $(this).find('.rktheme-product-image-wrap').attr('href').split("products/").slice(-1)[0];
        targetDom[index] = $(this).find('.rktheme-product-details');
      });
      cartItem.find(".bag_item").each(function(index) {
        var linkHref = $(this).find('.item_img a').attr('href').split("products/").slice(-1)[0];
        linkURLCart[index] = linkHref.split("?")[0];
        cartItemCategory[index] = $(this).find('.category');
        cartItemLength = cartItemLength + 1;
      });
      $.ajax({
        url: domain + '/collections/ajax',
        cache: false,
        dataType: 'html',
        success: function(html) {
            var product_num = 40; //抜き出したい商品の数
            var prop = [];
            var category = [];
            $.each($(html).find('.item_box'), function(index) {
              prop[index] = $(this).attr('id');
              category[index] = $(this).find('.cat_ttl .ja');
              for (var i=0; i<4; i++) {
                if (prop[index] == linkURL[i]){
                  targetDom[i].prepend(category[index]);
                };
              }
              for (var j=0; j< cartItemLength; j++) {
                if(prop[index] == linkURLCart[j]){
                  cartItemCategory[j].text('');
                  cartItemCategory[j].prepend(category[index]);
                }
              }
            });
            if (document.getElementById('relatedSlider')) {
              relatedSlider();
            }
        }
      });
    }

    setInterval(function(){
      var upSellStateNew = $('#upsellSection').text().length;
      if(upSellState != upSellStateNew && setCategory == 0){
        ajaxLoad();
        setCategory = 1;
      }
    },2000);
  }

  setCategoryName();

  function setHistoryBackLink(){
    var ref = document.referrer;
    if ( ref.match(/collections/)) {

    }else if(ref.match(/products/)){

    }else{
      $('#customer_logout_link').attr('href', '/');
    }
  }

  setHistoryBackLink();

});
