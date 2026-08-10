  var relatedItem = ['alex','hyakume','pione',''];

  function relatedSlider(){
  $('#relatedSlider').slick({
    accessibility: false,
    infinite: false,
    dots: true,
    slidesToShow: 3,
    centerMode: true,
    autoplay: false,
    responsive: [{
      breakpoint: 750,
      settings: {
        slidesToShow: 1,
        centerPadding: '5%',
        centerMode: false,
      }
    }]
  });
  }
  $.ajax({
      url: 'https://en.fruitest.jp/collections/relation',
      cache: false,
      dataType: 'html',
      success: function(html) {
        if (document.getElementById('relatedSlider')) {
          console.log('success!');
          var product_num = 40; //抜き出したい商品の数
          var prop = [];
          var content = [];
          var urlText = '/products/';
          var relatedContents;
          $.each($(html).find('.item_box'), function(index) {
            console.log(relatedItem[0] + ':' + relatedItem[1] + ':' + relatedItem[2]);
            prop[index] = $(this).attr('product');
            content[index] = $(this);
            if (prop[index] == urlText + relatedItem[0] || prop[index] == urlText + relatedItem[1] || prop[index] == urlText + relatedItem[2]) {
            relatedContents = relatedContents + content[index];
            $('#relatedSlider .slick-list .slick-track').append(content[index]);
            };
          });
        }
        relatedSlider();
      }
    });
