$(function() {
  
  function itemDetailThumbnail(target) {
    var thumbBox = $('#thumbBox');
    var caption = $('#caption');
    var imgthumb = $('#imgthumb');
    var currentThumb = $('#currentThumb');
    var allThumb = $('#allThumb');
    var slideNextButton = $('#slideNext');
    var slidePrevButton = $('#slidePrev');
    var thumbButton = [];
    var thumbImage = [];
    var thumbImageSrc = [];
    var currentSlide = 0;
    var imgObj = [];
    var imgAlt = [];
    var time = 300;
    var thumbLength = $('#thumbBox').find("li").length;

    function thumbChange(num) {
      $('#thumbBox').stop().animate({
        opacity: 0
      }, time, function() {
        $('.active').removeClass('active');
        currentThumb.text(num + 1);
        $('.slide' + currentSlide).addClass('active');
        $('#thumbBox').stop().animate({
          opacity: 1
        }, time);
      });
      /*thumbBox.attr('src', imgObj[num]);*/
    }

    function slideChange() {
      targetSlide = target.find('.slide' + currentSlide);
      target.find('.active_slide').removeClass('active_slide');
      targetSlide.addClass('active_slide');
      target.find('.current').text(currentSlide);
    };

    function slideNext() {
      if (currentSlide < thumbLength - 1) {
        currentSlide = currentSlide + 1;
      } else {
        currentSlide = 0;
      }
      thumbChange(currentSlide);
    };

    function slidePrev() {
      if (currentSlide == 0) {
        currentSlide = thumbLength - 1;
      } else {
        currentSlide = currentSlide - 1;
      }
      thumbChange(currentSlide);
    };

    function tabTouch() {
      if (startTouchX - endTouchX > 50) {
        slideNext();
      } else if (startTouchX - endTouchX < -50) {
        slidePrev();
      }
    };

    function windowDrag() {
      if (startDragX - endDragX > 100) {
        slideNext();
      } else if (startDragX - endDragX < -100) {
        slidePrev();
      }
    };

    function init() {
      allThumb.text(thumbLength);
      currentThumb.text('1');
      $.each(target.find('li'), function(index) {
        thumbButton[index] = $(this);
        thumbButton[index].addClass('slide' + index);
        thumbImage[index] = $(this).find('img');
        thumbImageSrc[index] = thumbImage[index].attr('src');
        thumbImage[index].attr('src', "");
        thumbImage[index].attr('src', thumbImageSrc[index]);
      });

      thumbImage[0].on({
        'load': function(){
          $('#thumbWrapper').addClass('display');
        }
      })

      slideNextButton.on({
        'click': function() {
          slideNext();
        }
      });

      slidePrevButton.on({
        'click': function() {
          slidePrev();
        }
      });

      $('#thumbBox').on({
        'dragstart': function(e) {
          startDragX = event.pageX;
        },
        'dragend': function(e) {
          endDragX = event.pageX;
          windowDrag();
        }
      });

      $('#thumbBox').on({
        'touchstart': function(e) {
          startTouchX = event.changedTouches[0].pageX;
        },
        'touchend': function(e) {
          endTouchX = event.changedTouches[0].pageX;
          tabTouch();
        }
      });

    }

    init();

  }
  if (document.getElementById('itemDetailNew')) {
    itemDetailThumbnail($('#thumbList'));
  }

  // 商品詳細ページ 数量インプットの操作
  function controllBuyingQuantity(target){
    var minusButton = target.find('.minus');
    var plusButton = target.find('.plus');
    var quantityInput = target.find('input[type=text]');
    var quantityNum;

    function controllQuantity(vector){
      quantityNum = quantityInput.val();
      if(vector == 1){
        quantityInput.attr('value', Number(quantityNum) + 1);
      }else{
        if(quantityNum != 1){
          quantityInput.attr('value', Number(quantityNum) - 1);
        }
      }
    }

    function init(){

      minusButton.on({
        'click': function() {
          event.preventDefault();
          controllQuantity(-1);
        }
      });
      plusButton.on({
        'click': function() {
          event.preventDefault();
          controllQuantity(1);
        }
      });

    }

    init();

  }

  if (document.getElementById('quantityWrap')) {
    controllBuyingQuantity($('#quantityWrap'));
  }

  if (document.getElementById('quantityWrap2')) {
    controllBuyingQuantity($('#quantityWrap2'));
  }

  //定期購入詳細のポップアップ
  function subPopDisplay(){
    var subscriptionPopButton = $('#subscriptionPopButton');
    var subscriptionModal = $('#subscriptionModal');
    var subscriptionModalBg = $('#subscriptionModalBg');

    function init(){
      subscriptionPopButton.on({
        'click': function() {
          event.preventDefault();
          subscriptionModal.addClass('open');
        }
      });
      subscriptionModalBg.on({
        'click': function() {
          subscriptionModal.removeClass('open');
        }
      });

    }

    init();

  }

  if (document.getElementById('subscriptionPopButton')) {
    subPopDisplay();
  }

  // 定期購入プランのプロパティー化
  function subPlanDisplay(){
    var subCycle = $('#subCycle');
    var cycleSelect = $('#cycleSelect');

    function setSubName(){
      var selectedCycle = cycleSelect.find('option:selected');
      subCycle.attr('value', selectedCycle.text().trim());
    }

    function init(){
      cycleSelect.on({
        'change': function(){
          setSubName();
        }
      })
    }

    init();
    setSubName();

  }

  if (document.getElementById('subCycle')) {
    subPlanDisplay();
  }





  // 商品詳細ページ トグルレイアウト
  function itemDetailToggle(){
    var toggleItem = [];
    var toggleButton = [];
    var toggleContents = [];
    var toggleState = [];
    var ankerButton = [];
    var cartAnker = [];
    var cartNoteList = $('#cartNoteList');

    function toggleMove(e) {
      if ( toggleState[e] == 0 ) {
        toggleButton[e].addClass('active');
        var buttonHeight = toggleButton[e].outerHeight();
        var tagetHeight = toggleContents[e].outerHeight();
        toggleItem[e].css({
          'height': buttonHeight + tagetHeight + 10 + 'px'
        });
        toggleState[e] = 1;
      } else {
        toggleButton[e].removeClass('active');
        var buttonHeight = toggleButton[e].outerHeight();
          toggleItem[e].css({
            'height': buttonHeight + 'px'
          });
        toggleState[e] = 0;
      }
    }

    function ankerMove(e){
      var scrollHeight = $(cartAnker[e]).offset().top;
      var headerHeight = $('header').outerHeight();
      $("html, body").animate({
        scrollTop: scrollHeight - headerHeight
      }, 500);
      setTimeout(function() {
        if ( toggleState[e + 1] == 0 ) {
          $(cartAnker[e]).find('button').click();
        }
      }, 500);

    }


    function init(){
      $.each($('article').find('.toggle_item'), function(index) {
        toggleItem[index] = $(this);
        toggleButton[index] = $(this).find('button');
        toggleContents[index] = $(this).find('.toggle_content_new');
        $(this).css({'height': toggleButton[index].outerHeight() + 'px'});
        toggleState[index] = 0;
        toggleButton[index].on({
          'click': function() {
            toggleMove(index);
          }
        });
      });

      $.each(cartNoteList.find('button'), function(index) {
        ankerButton[index] = $(this);
        cartAnker[index] = $(this).attr('prop');
        ankerButton[index].on({
          'click': function() {
            event.preventDefault();
            ankerMove(index);
          }
        });
      });

    }

    init();
  }

  if (document.getElementById('itemDetailNew')) {
    itemDetailToggle();
  }

  // 縦幅が足りない場合の追従レイアウト調整

  function adjustStickyLayout(){
    var mainDetail = $('#mainDetail');

    function setAdjuster(){
      var stickyHeight = $('#mainDetail').outerHeight();
      if(stickyHeight > window.innerHeight - 120){
        var offset = window.innerHeight - stickyHeight - 100;
        mainDetail.css({
          'top': offset + 'px'
        });
      }else{
        mainDetail.css({
          'top': 0 + 'px'
        });
      }
      requestAnimationFrame(setAdjuster);
    }

    function init(){
      setAdjuster();
      $(window).on({
        'resize': function() {
          setAdjuster();
        }
      });
    }

    init();
  }

  if (document.getElementById('itemDetailNew')) {
    adjustStickyLayout();
  }

  function remoteCartSubmit(){
    var fixedCartButton = $('#fixedCartButton');
    var submitForm = $('#productCartWrap');

    function init(){
      fixedCartButton.on({
        'click': function() {
          submitForm.parent('form').submit();
        }
      });

    }

    init();

  }

  if (document.getElementById('itemDetailNew')) {
    remoteCartSubmit();
  }

  function displayBrandIntroduction(){
    var ref = document.referrer;
    var hereHost = window.location.hostname;
    var param = location.search
    console.log('ref:' + ref);
    console.log('refState:' + ref.indexOf(hereHost));
    console.log('param:' + param.indexOf('mailmag'));
    if ( ref.indexOf(hereHost) == -1 && param.indexOf('mailmag') != 1) {
      $('#brandIntroduction').css({'display': 'block'});
    }else{

    }
  }

  if (document.getElementById('itemDetailNew')) {
    displayBrandIntroduction();
  }

  //配送日時の記載
  function setdeliveryDate(){
    var deliveryDate = $('#derivaryDate');
    var wd = ['日', '月', '火', '水', '木', '金', '土'];
    var holiday = ['12/29', '12/30', '12/31', '1/1', '1/2', '1/3', '1/4', '1/10', '2/11', '2/23', '3/21', '4/29', '5/3', '5/4', '5/5', '7/18', '8/11', '9/19', '9/23', '10/10', '11/3', '11/23'];
    var setDayStatus = 0;
    var dayFlag = 0;
    var firstDay;
    var delay = 0; /*曜日・時間による配送日のスライド設定*/
    var today = new Date();
    var startDay;
    var y;
    var m;
    var paramM;
    var d;
    var paramD;
    var w;
    var paramW;
    var time;
    var num;
    var testFlg = Number(0);
    var correctDate = ['指定なし'];

  function getDayDisplay(day, mode, flg){
    var date = new Date();
    date.setDate(date.getDate() + day + testFlg);
    y = date.getFullYear();
    m = date.getMonth() + 1;
    d = date.getDate();
    w = date.getDay() % 7;
    time = date.getHours();
    if(m < 10){ paramM = '0' + m }else{ paramM = m }
    if(d < 10){ paramD = '0' + d }else{ paramD = d }
    var dayParam = y + '-' + paramM + '-' + paramD;
    var dayDisplay = m + '月' + d + '日' + '(' + wd[w] + ')';
    deliveryDate.html(dayDisplay);
  }

  function setDayDisplay(num, mode){
    console.log('num:'+ num + '/' + 'mode:' + mode);
    var startSet = Number(num) + Number(2);
    for (var i= startSet; i <startSet + 1; i++) {
      if(mode == 1){
        dayFlag = dayFlag + 1;
      }
      getDayDisplay(i, mode, dayFlag);
    var selectDate = deliveryDate.val();
    if(mode == 1){
      var checkDateLabel = correctDate.includes(selectDate);
      if(checkDateLabel || selectDate == '指定なし' || selectDate == undefined){
        $('#submitLoader').addClass('open');
      }else{
        event.preventDefault();
        alert('最短配送日時は' + firstDay + 'となります。申し訳ございませんが、配送指定日を再度選択お願いします。');
      }
    }
  }
}

  function setShippingDay2(delay, mode){
    today.setDate(today.getDate() + 1);
    var todayY = today.getFullYear();
    var todayM = today.getMonth() + 1;
    var todayD = today.getDate();
    var todayW = today.getDay() % 7;
    var dayTime = today.getHours();
    var todayDate = todayM + '/' + todayD;
    if(todayDate){
      if($.inArray(todayDate,holiday) != -1){
        delay = delay + 1;
        setShippingDay2(delay, mode);
      }else{
        setDayDisplay(delay, mode);
      }
    }
  }

  function setShippingDay(mode){
    today.setDate(today.getDate() + testFlg);
    var dayTime = today.getHours();
    var todayW = today.getDay() % 7;
    if(dayTime < 10){ /* 10時までの注文の場合 */
      if(todayW == 0){ /* 日曜日の場合 */
        setShippingDay2(1,mode) /* 配送を月曜日にする*/
      }else if(todayW == 6){ /* 土曜日の場合*/
        setShippingDay2(2,mode); /* 配送を月曜日にする*/
      }else{ /*月~金曜日の注文の場合*/
        setShippingDay2(0,mode); /*当日に配送する*/
      }
    }else{ /* 10時以降の注文の場合 */
      if(todayW == 6){ /* 土曜日の場合*/
        setShippingDay2(2,mode);/* 配送を月曜日にする*/
      }else if(todayW == 5){ /* 金曜日の場合*/
        setShippingDay2(3,mode);/* 配送を月曜日にする*/
      }else{ /*月~木曜日の注文の場合*/
        setShippingDay2(1,mode);/*翌日に配送する*/
      }
    }
  }

  function init(){
    setShippingDay(0);
  }

  init();

}

  if (document.getElementById('itemDetailNew')) {
    setdeliveryDate();
  }

  // 定期・通常購入の切り替えレイアウト
  function switchCartWrap(){
    const purchaseButton = $('#purchaseButton');
    const subscriptionButton = $('#subscriptionButton');
    const contentSwitcher = $('#contentSwitcher');
    const compVariation = $('#compVariation');
    const normalBox = $('#normalBox');
    const subscriptionBox = $('#subscriptionBox');
    let switchState = 0;



    function init(){
      purchaseButton.on({
        'click': function(){
          if(switchState == 1){
            purchaseButton.addClass('active');
            subscriptionButton.removeClass('active');
            compVariation.css({'display': 'block'});
            contentSwitcher.stop().animate({ opacity: 0 }, 300, function() {
              normalBox.css({'display': 'block'});
              subscriptionBox.css({'display': 'none'});
              contentSwitcher.stop().animate({ opacity: 1 }, 300);
              switchState = 0;
            });
          }
        }
      })
      subscriptionButton.on({
        'click': function(){
          if(switchState == 0){
            purchaseButton.removeClass('active');
            subscriptionButton.addClass('active');
            compVariation.css({'display': 'none'});
            contentSwitcher.stop().animate({ opacity: 0 }, 300, function() {
              normalBox.css({'display': 'none'});
              subscriptionBox.css({'display': 'block'});
              contentSwitcher.stop().animate({ opacity: 1 }, 300);
              switchState = 1;
            });
          }
        }
      })
    }

    init();
  }

  if (document.getElementById('itemDetailNew')) {
    switchCartWrap();
  }




});
