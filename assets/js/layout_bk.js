$(function() {

  // スクロール + ウィンドウサイズ系の対策処理
  function scrollAnimationSet(target) {
    const scButtonWrap = $('#scrollTopWrap');
    const position = document.documentElement;
    let wHeight = window.innerHeight;
    let preSetWidth = window.innerWidth;
    let scrollCount = 0;

    function setHeightProperty() {
      wHeight = window.innerHeight;
      position.style.setProperty('--wHeight', window.innerHeight);
      position.style.setProperty('--wHeightPx', window.innerHeight + 'px');
      position.style.setProperty('--scroll', window.scrollY);
      if(window.scrollY > window.innerHeight){
        scButtonWrap.addClass('display');
      }else{
        scButtonWrap.removeClass('display');
      }
      requestAnimationFrame(setProperties);
    }

    function setProperties() {
      setHeightProperty();
    }

    function init() {
      var timer = false;
      setProperties();
      position.style.setProperty('--wHeightFixedPx', window.innerHeight + 'px');
      /*window.addEventListener('scroll', _.throttle(setProperties, 100, { leading: true, trailing: true}));
      window.addEventListener('resize', _.throttle(setProperties, 100, { leading: true, trailing: true}));*/
    }

    init();

  }

  scrollAnimationSet($('article'));

  // ローディングアニメーション
  function loadingAnimation() {
    var sliderImg = "https://journal.komons-japan.com/wp-content/themes/komons-theme/img/main_slide01.jpg";

    function popUpBanner(target){
     var urlParam = location.search.substring(1);

     var popBg = $('#popBg');
     var closeBanner = target.find('#closeBanner');
     var popClose = target.find('#popCloseButton');

     function init(){
       target.addClass('open');
       popBg.on({
         'click': function() {
           target.removeClass('open');
         }
       });
     }

     if ( urlParam.match(/returntop/)) {

     }else{
       init();
     }
   }

    var imgPreloader = new Image();
    var img = $('.first_view');
    var originSrc = img.attr('src');
    img.attr('src', "");

    img.on({
      'load': function() {
        setTimeout(function() {
          $('.load_inner').addClass('delete');
          $('body').addClass('loaded');

          setTimeout(function() {
            $('.slide_fil').addClass('loaded');

            setTimeout(function() {
              $('.main_img').addClass('loaded');
              $('.main_logo').addClass('loaded');
              backGroundSlider($('#sliderBtn'));
              /*setTimeout(function() {
                if (document.getElementById('camPop')) {
                  popUpBanner($('#camPop'));
                }
              }, 1500);*/
            }, 100);
          }, 1200);

        }, 1700);
      }
    })

    img.attr('src', originSrc);

  }

  if (document.getElementById('index')) {
    loadingAnimation();
  }

  // スクロール系のイベントまとめ
  function scrollArrow(target) {
    var scrollSwitch = 0;
    var scrollArrow = $('#arrowScroll a');
    var headerArrow = $('.header_arrow');
    var scrollTarget = $('#scrollTarget');
    var headerRolled = $('#headerRolled');
    var headerRolledSp = $('#headerRolledSp');

    if (document.getElementById('headerRolled')) {
    }else{
      if(window.innerWidth > 720){
        $('header').addClass('rolled');
      }
    }

    if (document.getElementById('headerRolledSp')) {
    }else{
      $('header').addClass('rolled_sp');
    }

    function afterScroll(noAnimate) {
      $('header').addClass('rolled');
      $('header').addClass('rolled_sp');
      scrollSwitch = 1;
    };

    function beforeScroll() {
      $('header').removeClass('rolled');
      $('header').removeClass('rolled_sp');
      scrollSwitch = 0;
    };

    function scrollIndex() {
      if (scrollSwitch == 0) {
        $("html, body").animate({
          scrollTop: 1100
        }, 700);
      } else {
        $("html, body").animate({
          scrollTop: 0
        }, 1000);
      }
    }

    function scrollUnder() {
      var offsetHeight = scrollTarget.offset().top;
      if (scrollSwitch == 0) {
        $("html, body").animate({
          scrollTop: offsetHeight
        }, 700);
      } else {
        $("html, body").animate({
          scrollTop: 0
        }, 1000);
      }
    }

    function init() {
      $('.header_arrow a').on({
        'click': function() {
          if (document.getElementById('top')) {
            scrollIndex();
          } else {
            scrollUnder();
          }
        }
      });

      $(window).on({
        'scroll': function() {
          if (document.getElementById('lineContact')) {
            if ($(window).scrollTop() > 300) {
              $('#lineContact').addClass('rolled');
            }else{
              $('#lineContact').removeClass('rolled');
            }
          }
          if (document.getElementById('headerRolled')) {
            if(window.innerWidth > 720){
              var scroll = $(window).scrollTop();
              var rolledHeight = headerRolled.offset().top;
              if (scroll > rolledHeight) {
                if (scrollSwitch == 0) {
                  afterScroll();
                }
              } else {
                if (scrollSwitch == 1) {
                  beforeScroll();
                }
              }
            }
          }
          if (document.getElementById('headerRolledSp')) {
            if(window.innerWidth < 720){
              var scroll = $(window).scrollTop();
              var rolledHeight = headerRolledSp.offset().top;
              if (scroll > rolledHeight) {
                if (scrollSwitch == 0) {
                  afterScroll();
                }
              } else {
                if (scrollSwitch == 1) {
                  beforeScroll();
                }
              }
            }
          }

          if (document.getElementById('concept')) {
            $("section").each(function() {
              var sectionimgPos = $(this).offset().top;
              var sectionscroll = $(window).scrollTop();
              var windowHeight = $(window).height();
              if (sectionscroll + 90 > sectionimgPos - windowHeight + windowHeight) {
                var setClass = $(this).attr('id');
                $('body').removeClass('concept_top concept_component concept_scent concept_make concept_design ceoncept_links');
                $('body').addClass(setClass);
              };
            });
          }

          if (document.getElementById('itemDetail')) {
            $("section").each(function() {
              var sectionimgPos = $(this).offset().top;
              var sectionscroll = $(window).scrollTop();
              var windowHeight = $(window).height();
              if (sectionscroll + 300 > sectionimgPos - windowHeight + windowHeight) {
                var setClass = $(this).attr('id');
                $('#fixedCartWrap').removeClass('main wrap01 features scent wrap02 detail relation journal sectionBack');
                $('#fixedCartWrap').addClass(setClass);
              };
            });
          }
          if (document.getElementById('itemDetailNew')) {
            $("section").each(function() {
              var rolledHeight = $('#rolledHeight').offset().top;
              var relatedItem = $('#relatedItem').offset().top;
              var sectionscroll = $(window).scrollTop();
              if ( sectionscroll > rolledHeight) {
                $('#fixedCartWrap').addClass('display');
                if ( sectionscroll > relatedItem) {
                  $('#fixedCartWrap').removeClass('display');
                }
              }else{
                $('#fixedCartWrap').removeClass('display');
              }
            });
          }
        },
      });
    };
    init();
  }

  scrollArrow($('body'));

  //ハンバーガーメニューの開閉

  function humMenuToggle(target) {
    var humButton = target.find('button');
    var closeBtn = $('#humClose');
    var menuBg = $('#menuBg');
    var menuState = 0;
    var current_scrollY;

    function humMenuShift() {
      if (menuState == 0) {
        current_scrollY = $(window).scrollTop();
        $('body').css({
          position: 'fixed',
          top: -1 * current_scrollY
        });
        $('body').addClass('fixed');
        $('#slideMenuNew').addClass('open');
        $('header').addClass('hum_open');
        menuState = 1;
      } else {
        $('body').removeClass('fixed');
        $('body').attr('style', '');
        $('html, body').prop({scrollTop: current_scrollY});
        $('#slideMenuNew').removeClass('open');
        $('header').removeClass('hum_open');
        menuState = 0;
      }
    }

    function init() {
      humButton.on({
        'click': function() {
          humMenuShift();
        }
      });
      closeBtn.on({
        'click': function() {
          humMenuShift();
        }
      });
      menuBg.on({
        'click': function() {
          humMenuShift();
        }
      });
    }

    init()

  };

  humMenuToggle($('#humMenu'));

  //トップページ メインスライダー
  function backGroundSlider(target) {
    var obj = $('#slideShow');
    var objLi = $('#slideShow li');
    var objSelect;
    var timeId;
    var duration = 2000;
    var interval = 2000;
    var current = 1;
    var objBox = [];
    var btnList = [];

    function change() {
      if (current !== 1) {
        current++;
      } else {
        current = 0;
      }
      slideChange(current)
    }

    function startAuto() {
      timeId = setTimeout(change, interval);
    }

    function stopAuto() {
      clearTimeout(timeId)
    }

    function complete() {
      startAuto();
    }

    function slideChange(e) {
      $('.active').removeClass('active');
      btnList[e].addClass('active');
      objLi.stop().animate({
        'opacity': 0
      }, duration);
      objBox[e].stop().animate({
        'opacity': 1
      }, duration, function() {
        complete();
        current = e;
      });
    };

    function clickTn(num) {
      if (current != num) {
        slideChange(num)
        stopAuto();
      }
    }

    function init() {
      target.find('li').each(function(index) {
        btnList[index] = $(this);
        $($(this).find('a')).on({
          'click': function() {
            clickTn(index);
          }
        });
      });

      obj.find('li').each(function(i) {
        objBox[i] = $(this);
      });

    };

    init();
    startAuto();

  };
  if (document.getElementById('index')) {

  }

  // キーワード検索 ヘッダー
  function keywordSearchControll2(target){
    var wordInput = target.find('input[type="text"]');
    var submitButton = target.find('button');
    function init(){
      submitButton.on({
        'click': function() {
          var searchWord = wordInput.val();
          if(searchWord.length > 1 && searchWord != null){
            location.href = 'https://www.komons-japan.com/?mode=srh&keyword=' + searchWord;
          }
        }
      });
    };

    init();
  }

  keywordSearchControll2($('#searchSubmit'));

  // 商品詳細情報の開閉部分
  function detailToggleControll(target) {
    var controllButton = target.find('button');
    var buttonHeight = controllButton.outerHeight();
    var toggleContent = target.find('.toggle_content');
    var toggleState = 0;

    function toggleMove(){
      var buttonHeight = controllButton.outerHeight();
      var toggleHeight = toggleContent.outerHeight();
      if(toggleState == 0){
        var contentHeight = buttonHeight + toggleHeight + 30;
        controllButton.addClass('open');
        toggleState = 1;
      }else{
        var contentHeight = buttonHeight;
        controllButton.removeClass('open');
        toggleState = 0;
      }
      target.css({height: contentHeight + 'px'});
    }

    function init(){
      target.css({height: buttonHeight + 'px'});
      controllButton.on({
        'click': function() {
          toggleMove();
        }
      });
    }

    init();

  }

  if (document.getElementById('itemDetail')) {
    detailToggleControll($('#detailToggle'));
  }

  function productInitNum(target){
    var numberInput = [];
    var lotNumer;

    function syncAllNumberInput(){
      $.each(target.find('input[type=number]'), function(index) {
        $(this).attr('value', lotNumer);
      });
    }

    function init(){
      $.each(target.find('input[type=number]'), function(index) {
        $(this).on({
          'change': function() {
            lotNumer = $(this).val();
            syncAllNumberInput();
          }
        });
      });
    }

    init();

  }

  if (document.getElementById('itemDetail')) {
    productInitNum($('body'));
  }

  //関連商品プラグインをslick用いて表示させる
  function relatedProductArrange(target){
    var relatedInfo = [];
    var relatedSlider = $('#relatedSlider');

    function init(){
      $.each(target.find('li'), function(index) {
        relatedInfo[index] = $(this).html();
        $(this).remove();
      });
      $.each(relatedSlider.find('.item_box'), function(index) {
        $(this).append(relatedInfo[index]);
      });
    }

    init();

  }
  if (document.getElementById('itemDetail')) {
    relatedProductArrange($('.relatedWrap'));
  }



  //商品詳細のバリエーション選択欄
  function variationToggle(target){
    var toggleState = 0;
    var wrap = target.find('.variation_wrap');
    var button = target.find('.display_wrap');
    var buttonHeight = button.outerHeight();
    var toggle = target.find('.display_toggle');
    var toggleHeight = toggle.outerHeight();
    var currentURL = location.href;
    var itemNumber = currentURL.split("products/");
    var kataban = itemNumber.slice(-1)[0];

    function toggleMove(){
      var buttonHeight = button.outerHeight();
      var toggleHeight = toggle.outerHeight();
      if(toggleState == 0){
        var contentHeight = buttonHeight + toggleHeight;
        button.addClass('open');
        toggleState = 1;
      }else{
        var contentHeight = buttonHeight;
        button.removeClass('open');
        toggleState = 0;
      }
      wrap.css({height: contentHeight + 'px'});
    }

    function init(){
      $.each(target.find('a'), function(index) {
        var linkHref = $(this).attr('href');
        var linkText = $(this).find('.title').html();
        var variationKataban = linkHref.split("products/");
        if (kataban == variationKataban.slice(-1)[0]) {
          $(this).addClass('current');
          $('#selectedVar').html(linkText);
        }
      });
      target.find()
      wrap.css({height: buttonHeight + 'px'});
      button.on({
        'click': function() {
          toggleMove();
        }
      });
    }

    init();
  }

  if (document.getElementById('variationToggle')) {
    variationToggle($('#variationToggle'));
  }

  function cartUpsellButtons(){
    var upSellSectionContainer = $('#upsellSection').text().length;
    var upSellSectionContainer2 = $('#upsellSection2').text().length;

    function containerChecker(){
      var currentLength = $('#upsellSection').text().length;
      if(currentLength != upSellSectionContainer){
        upSellSectionContainer = currentLength;
        $.each($('#upsellSection').find('button'), function(index) {
          $(this).off();
          $(this).on({
            'click': function() {
              setTimeout(function() {
                location.href = location.href;
              }, 1000);
            }
          });
        });
      }
      requestAnimationFrame(containerChecker);
    }

    function containerChecker2(){
      var currentLength2 = $('#upsellSection2').text().length;
      if(currentLength2 != upSellSectionContainer2){
        console.log('currentLength2:' + currentLength2 + '/ upSellSectionContainer2:' + upSellSectionContainer2);
        upSellSectionContainer2 = currentLength2;
        $.each($('#upsellSection2').find('button'), function(index) {
          $(this).off();
          $(this).on({
            'click': function() {
              setTimeout(function() {
                location.href = location.href;
              }, 1000);
            }
          });
        });
      }
      requestAnimationFrame(containerChecker2);
    }

    function init(){
      containerChecker();
      containerChecker2();
    }

    init();

  }


  if (document.getElementById('cart')) {
    cartUpsellButtons();
  }



  //アンカーリンクで追従ヘッダーの分オフセットする
  window.onload = function() {
    var urlHash = location.hash;
    if(urlHash != undefined && urlHash.length > 1){
      if (0 < urlHash.length) {
        location.hash = urlHash;
        var scroll = $(urlHash).offset().top;
        var w = $(window).width();

        if (w > 1100) {
          var adScroll = scroll - 100;
        } else {
          var adScroll = scroll - 60;
        }

        $("html, body").animate({
          scrollTop: adScroll
        }, 0);
      }
    }
  }


  //FAQページ内の、トグル制御

  function faqToggle(target) {
    var toggleItem = [];
    var toggleButton = [];
    var toggleContents = [];
    var toggleState = [];
    var toggleTitleTxt = [];
    var toggleContentsTxt = [];
    var faqSearch = $('#faqSearch');
    var faqFlex = $('#faqFlex');
    var windowW = window.innerWidth;

    function filterFaqItem(){
      var searchValue = faqSearch.val();
      $.each(target.find('.toggle_item'), function(index) {
        if(searchValue.length > 1){
          if(toggleTitleTxt[index].indexOf(searchValue) != -1 || toggleContentsTxt[index].indexOf(searchValue) != -1){
            $(this).css({'display': 'block'});
          }else{
            $(this).css({'display': 'none'});
          }
        }else{
          $(this).css({'display': 'block'});
        }
      });
      $.each(target.find('.comp-faq-contents'), function(index) {
        if(searchValue.length > 1){
          if($(this).text().indexOf(searchValue) != -1){
            $(this).css({'display': 'block'});
          }else{
            $(this).css({'display': 'none'});
          }
        }else{
          $(this).css({'display': 'block'});
        }
      });
      $.each(target.find('.item_wrap'), function(index) {
        if(searchValue.length > 1){
          if($(this).text().indexOf(searchValue) != -1){
            $(this).css({'display': 'block'});
          }else{
            $(this).css({'display': 'none'});
          }
        }else{
          $(this).css({'display': 'block'});
        }
      });
    }

    function toggleMove(e) {
      if ( toggleState[e] == 0 ) {
        toggleButton[e].addClass('active');
        var buttonHeight = toggleButton[e].outerHeight();
        var tagetHeight = toggleContents[e].outerHeight();
        toggleItem[e].css({
          'height': buttonHeight + tagetHeight + 'px'
        });
        toggleState[e] = 1;
      } else {
        toggleButton[e].removeClass('active');
        var buttonHeight = toggleButton[e].outerHeight();
          toggleItem[e].css({
            'height': buttonHeight + 2 + 'px'
          });
        toggleState[e] = 0;
      }
    }

    function setToggleHeight(){
      $.each(target.find('.toggle_item'), function(index) {
        toggleItem[index] = $(this);
        toggleButton[index] = $(this).find('.toggle_button');
        toggleContents[index] = $(this).find('.toggle_contents');
        $(this).css({'height': toggleButton[index].outerHeight() + 2 + 'px'});
        toggleState[index] = 0;
      });
    }

    function windowChecker(){
      var currentWindow = window.innerWidth;
      if(currentWindow != windowW){
        setToggleHeight();
        windowW = currentWindow
      }
      requestAnimationFrame(windowChecker);
    }

    function init() {
      $.each(target.find('.toggle_item'), function(index) {
        toggleItem[index] = $(this);
        toggleButton[index] = $(this).find('.toggle_button');
        toggleContents[index] = $(this).find('.toggle_contents');
        $(this).css({'height': toggleButton[index].outerHeight() + 2 + 'px'});
        toggleState[index] = 0;
        toggleTitleTxt[index] = toggleButton[index].text();
        toggleContentsTxt[index] = toggleContents[index].text();
        toggleButton[index].on({
          'click': function() {
            toggleMove(index);
          }
        });
      });
      if (document.getElementById('faq')) {
        faqSearch.on({
          'blur': function(){
            faqFlex.stop().animate({opacity: 0}, 300);
            setTimeout(function() {
              filterFaqItem();
              faqFlex.stop().animate({opacity: 1}, 300);
            }, 300);
          }
        });
      }
      windowChecker();
    }

    init();

  }

  if (document.getElementById('faq')) {
    faqToggle($('article'));
  }

  if (document.getElementById('gift')) {
    faqToggle($('article'));
  }

  if (document.getElementById('giftList')) {
    faqToggle($('article'));
  }

  if (document.getElementById('giftService')) {
    faqToggle($('article'));
  }

  if (document.getElementById('itemDetailNew')) {
    faqToggle($('#subFaq'));
  }

  //ギフトサービスへのスクロール
  function giftScroll(target) {

    function scrollMove() {
      var scrollHeight = $('#giftOption').offset().top;
      var w = $(window).width();
      if (w > 1100) {
        var adScroll = scrollHeight - 100;
      } else {
        var adScroll = scrollHeight - 60;
      }
      $("html, body").animate({
        scrollTop: adScroll
      }, 500);
    }

    function init() {
      target.on({
        'click': function() {
          scrollMove();
        }
      })
    }

    init();

  }

  if (document.getElementById('gift')) {
    giftScroll($('#jumpButton'));
  }

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

  if (document.getElementById('gift')) {
    formAsset($('#productList'));
  }

  //トップページ用ヘッダーの制御

  function topHeader(target) {

    function init() {
      target.addClass('fade');
    }

    init();

  }

  if (document.getElementById('index')) {
    topHeader($('#hLogo'));
  }

  //コンセプト部分のボタン制御

  function conceptPop(target) {
    var popState = 0;

    function popShift() {
      if (popState == 0) {
        target.removeClass('close');
        target.addClass('open');
        popState = 1;
      } else {
        target.removeClass('open');
        target.addClass('close');
        popState = 0;
      }
    }


    function init() {
      target.on({
        'click': function() {
          popShift();
        }
      })
      $('#indexContent li a').on({
        'click': function() {
          popShift();
        }
      })
    }

    init()

  }

  if (document.getElementById('concept')) {
    conceptPop($('#popButton'));
  }

  // ジャーナル記事 altをキャプションに変換
  function addArticleImgCap(target){
    var altTxt = [];

    function init(){
      target.find("img").each(function(index) {
        altTxt[index] = $(this).attr('alt');
        if(altTxt[index].length > 1 && altTxt[index] != undefined){
          $(this).parent('div').append('<p class="caption">' + altTxt[index] + '</p>');
        }
      });
    }

    init();

  }

  if (document.getElementById('articleContents')) {
    addArticleImgCap($('#articleContents'));
  }



  //コンタクトフォームの制御
  function formControl(target) {
    $("input").each(function() {
      $(this).attr('autocomplete', 'off');
    });

    $('.wpcf7-submit').on({
      'click': function() {
        $('#confirmButton').addClass('wpcf7c-force-hide');
      }
    })
  }

  if (document.getElementById('contact')) {
    formControl($('form'));
  }

  function fixSidebar(targetSelector, wrapContentSelector) {
    var $target = $(targetSelector);
    var $wrap = $(wrapContentSelector);
    if ($wrap.length == 0 || $target.length == 0) {
      return;
    }

    var sidebarOffset = $target.offset().top;
    var padding = 35;
    var headerHeight = $('header:first').height();

    var contentHeight = $wrap.height();
    $(window).on('scroll load resize', function() {
      var offset = $(window).scrollTop();
      if (offset + headerHeight >= sidebarOffset) {
        $target.css('position', 'fixed');
        if (offset > contentHeight) {
          $target.css('top', (headerHeight - (offset - contentHeight)) + 'px');
        } else {
          $target.css('top', headerHeight + 'px');
        }
      } else {
        sidebarOffset = $target.offset().top;
        $target.css('position', 'absolute');
        $target.css('top', $('#js_concept_kv').height());
      }
    });
  }
  fixSidebar('#js_concept_sidebar', '#concept');

  function scrollToLink() {
    $('a[href^="#"]').click(function() {
      var href = $(this).attr("href");
      return scrollToHref(href);
    });
  }

  function scrollToHref(href) {
    if (href != "#" && href != "") {
      var headerHeight = $('header:first').height();
      var target = $(href);
      var padding = 50;
      var position = target.offset().top - headerHeight - padding;
      $("html, body").animate({
        scrollTop: position
      }, 300, 'swing');
    }
    var url = location.href.split("#");
    if (url.length > 1) {
      history.replaceState('', '', location.pathname);
    }
    return false;
  }
  scrollToLink();

  function changeNavStyleWhenScrolling(targetIds, hideTarget) {
    var headerHeight = $('header:first').height() + 180;
    $(window).on('scroll load', function() {
      var offset = $(window).scrollTop();
      for (var i in targetIds) {
        var targetId = targetIds[i];
        $target = $(targetId);
        if ($target.length == 0) {
          continue;
        }
        var targetOffset = $target.offset().top;
        if (offset + headerHeight > targetOffset) {
          var $navTarget = $("a[href='" + targetId + "']").closest('li');
          $navTarget.siblings().removeClass('current');
          $navTarget.addClass('current');
        }
      }
    });
    for (var i in targetIds) {
      $("a[href='" + targetIds[i] + "']").click(function() {
        $(hideTarget).hide();
      })
    }
  }
  changeNavStyleWhenScrolling(['#concept_top', '#concept_component', '#concept_scent', '#concept_make', '#concept_design'], '#js_concept_index_sp');

  function toggleBtn() {
    $('.js_toggle_btn').click(function() {
      var $target = $($(this).data('target'));
      if ($target.is(':visible')) {
        $target.fadeOut(100);
        $(this).find('.-txt_opened').show();
        $(this).find('.-txt_closed').hide();
      } else {
        $target.fadeIn(100);
        $(this).find('.-txt_opened').hide();
        $(this).find('.-txt_closed').show();
      }
    });
  }
  toggleBtn();

  //ギフト商品オプション選択欄
  function optionPopup(target){
    var posi;
    var optionPop = $('#optionPop');
    var optionSelect = $('#optionSelect');
    var optionSelect02 = $('#optionSelect02');
    var fixedPopButton = $('#fixedPopButton');
    var popBg = $('#popBg');
    var giftOptionFields = $('.giftOptionFields');
    var optionValue = [];
    var mizuhiki = $('.mizuhiki');
    var popClose = $('#popClose');
    var optionFix = $('#optionFix');
    var tesageState = $("input[name='tesage']");
    var messageState = $('input[name="message"]');
    var muzihikiState = $('input[name="mizuhiki"]');
    var tesageDisplay = $('#tesageDisplay');
    var mizuhikiDisplay = $('#mizuhikiDisplay');
    var tesageCheck;
    var mizuhikiCheck;
    var messageCheck;

    function withMessage(){
      if(tesageCheck == 'tesage' && mizuhikiCheck == 'mizuhiki'){
        giftOptionFields.val(optionValue[7]);
      }else if(tesageCheck != 'tesage' && mizuhikiCheck == 'mizuhiki'){
        giftOptionFields.val(optionValue[5]);
      }else if(tesageCheck == 'tesage' && mizuhikiCheck != 'mizuhiki'){
        giftOptionFields.val(optionValue[6]);
      }else if(tesageCheck != 'tesage' && mizuhikiCheck != 'mizuhiki'){
        giftOptionFields.val(optionValue[4]);
      }
    }

    function withoutMessage(){
      if(tesageCheck == 'tesage' && mizuhikiCheck == 'mizuhiki'){
        giftOptionFields.val(optionValue[3]);
      }else if(tesageCheck != 'tesage' && mizuhikiCheck == 'mizuhiki'){
        giftOptionFields.val(optionValue[1]);
      }else if(tesageCheck == 'tesage' && mizuhikiCheck != 'mizuhiki'){
        giftOptionFields.val(optionValue[2]);
      }else if(tesageCheck != 'tesage' && mizuhikiCheck != 'mizuhiki'){
        giftOptionFields.val(optionValue[0]);
      }
    }

    function optionShifter(){
      tesageCheck = $("input[name='tesage']:checked").val();
      mizuhikiCheck = $("input[name='mizuhiki']:checked").val();
      messageCheck = $("input[name='message']:checked").val();
      if(messageCheck == 'message'){
        withMessage();
      }else{
        withoutMessage();
      }
    }

    function optionPopOpen(){
      posi = $(window).scrollTop();
      $('body').addClass('fixed');
      $('body').css({
        position: 'fixed',
        top: -1 * posi
      });
      target.addClass('open');
    }

    function optionPopClose(){
      $('body').removeClass('fixed');
      $('body').attr('style', '');
      $('html, body').prop({scrollTop: posi});
      target.removeClass('open');
    }

    function displayMizuhikiOption(){
      var state = $('input[name="tesage"]:checked').val();
      var contentsHeight = mizuhiki.find('.mizuhiki_inner').outerHeight();
      if(state == 'tesage'){
        $('#0-3').click();
      }else{
        $('#0-2').click();
      }
    }

    function init(){

      giftOptionFields.find("option").each(function(index) {
        optionValue[index] = $(this).attr('value');
      });

      optionPopClose();

      optionSelect.on({
        'click': function(){
          optionPopOpen();
        }
      });

      fixedPopButton.on({
        'click': function(){
          optionPopOpen();
        }
      })

      optionSelect02.on({
        'click': function(){
          optionPopOpen();
        }
      });

      popBg.on({
        'click': function(){
          optionPopClose();
        }
      });

      popClose.on({
        'click': function(){
          optionPopClose();
        }
      });

      optionFix.on({
        'click': function(){
          optionPopClose();
        }
      });

      muzihikiState.on({
        'click': function(){
          optionShifter();
        }
      });

      tesageState.on({
        'click': function(){
          optionShifter();
        }
      });

      messageState.on({
        'click': function(){
          optionShifter();
        }
      });
    }

    init();

  }

  if (document.getElementById('itemDetail')) {
    optionPopup($('#optionPop'));
  }

  if (document.getElementById('itemDetailNew')) {
    optionPopup($('#optionPop'));
  }

  //定期購入 サイクル選択ポップアップ
  function subscriptionSelect(target){
    var optionSelecter = target.find('select');
    var purchaseWaySelect = [];
    var cycleSelectOption = [];
    var cycleSelect = [];
    var variationFields = [];
    var optionSelect = $('#optionSelect');
    var optionSelect02 = $('#optionSelect02');
    var giftOptionFields = $('.giftOptionFields');
    var popBg = $('#popBg');
    var optionState = 0;
    var cycleList = $('#cycleList');

    function purchaseWayShifter(){
      if(optionState == 0){
        purchaseWaySelect[1].click();
        giftOptionFields.val(variationFields[1]);
        optionSelecter.val(cycleSelectOption[1]);
        optionSelecter.click();
        $('input[name=sub_cycle]').val(["monthly1"]);
        optionState = 1;
      }else{
        purchaseWaySelect[0].click();
        giftOptionFields.val(variationFields[0]);
        optionSelecter.val(cycleSelectOption[1]);
        optionSelecter.click();
        $('input[name=sub_cycle]').val(["monthly1"]);
        optionState = 0;
      }
    }

    function init(){
      target.find("input[name=paywhirl-plan-selector-group]").each(function(index) {
        purchaseWaySelect[index] = $(this);
      });
      target.find("option").each(function(index) {
        cycleSelectOption[index] = $(this).val();
      });
      giftOptionFields.find("option").each(function(index) {
        variationFields[index] = $(this).val();
      });

      cycleList.find("input[name=sub_cycle]").each(function(index) {
        var indexNum = Number(index);
        var num = indexNum + 1;
        cycleSelect[index] = $(this);
        cycleSelect[index].on({
          'click': function(){
            optionSelecter.val(cycleSelectOption[num]);
          }
        });
      });
      purchaseWaySelect[0].click();

      optionSelect.on({
        'click': function(){
          purchaseWayShifter()
        }
      });

      optionSelect02.on({
        'click': function(){
          purchaseWayShifter()
        }
      });

      popBg.on({
        'click': function(){
          purchaseWayShifter()
        }
      });
    }


    init();

  }

  if (document.getElementById('subscriptionTable')) {
    subscriptionSelect($('#subscriptionTable'));
  }

  function giftProductFilter2(target){
    var time = 300;
    var priceFilter = $('#priceFilter');
    var categoryFilter = $('#categoryFilter');
    var categoryButton = [];
    var categoryProp = [];
    var categoryState = -1;
    var cureentCategory = 'all';
    var itemLength = target.find(".list_item").length;
    var lengthNum = itemLength + 1;
    var priceMin = 0;
    var priceMax = 100000;
    var priceMinBox = [];
    var priceMaxBox = [];
    var giftListArray = [];
    var param = location.search

    function categorySort(cat){
      target.stop().animate({ opacity: 0 }, time, function() {
        target.html('');
        for (var i=0; i<itemLength; i++) {
          console.log(giftListArray[i].prop);
          if(giftListArray[i].prop.indexOf(cat) != -1 || cat == 'all'){
            target.append(giftListArray[i].html);
          }
        }
        target.stop().animate({ opacity: 1 }, time);
        priceFilter.val(0);
        priceMin = 0;
        priceMax = 100000;
      });
    }

    function priceRangeSort(min,max){
      target.stop().animate({ opacity: 0 }, time, function() {
        target.html('');
        for (var i=0; i<itemLength; i++) {
          if(min < giftListArray[i].price && giftListArray[i].price < max){
            target.append(giftListArray[i].html);
          }
        }
        target.stop().animate({ opacity: 1 }, time);
        categoryFilter.find('button').removeClass('active');
        categoryState = -1;
      });
    }

    function init(){
      target.find(".list_item").each(function(index) {
        $(this).attr('number', index);
        giftListArray[index] = {
          html : $(this),
          prop: $(this).attr('category'),
          price : Number($(this).attr('price').replace(/,/g, '')),
        };
      });

      priceFilter.on({
        'change': function() {
          var onTarget = priceFilter.find('option:selected');
          priceMin = onTarget.attr('min');
          priceMax = onTarget.attr('max');
          priceRangeSort(priceMin,priceMax);
        }
      });

      categoryFilter.find('button').each(function(index) {
        categoryButton[index] = $(this);
        categoryProp[index] = $(this).attr('prop');
        categoryButton[index].on({
          'click': function() {
            categoryFilter.find('button').removeClass('active');
            if(index != categoryState){
              categoryButton[index].addClass('active');
              cureentCategory = categoryProp[index];
              categoryState = index;
            }else{
              cureentCategory = 'all';
              categoryState = -1;
            }
            categorySort(cureentCategory);
          }
        });
      });

      if(param.indexOf('tag=0') != -1){
        console.log('tag0')
        categoryButton[0].click();
      }

      if(param.indexOf('tag=1') != -1){
        console.log('tag1')
        categoryButton[1].click();
      }

      if(param.indexOf('tag=2') != -1){
        console.log('tag2')
        categoryButton[2].click();
      }

      if(param.indexOf('tag=3') != -1){
        console.log('tag3')
        categoryButton[3].click();
      }

      if(param.indexOf('tag=4') != -1){
        console.log('tag4')
        categoryButton[4].click();
      }

      if(param.indexOf('tag=5') != -1){
        console.log('tag5')
        categoryButton[5].click();
      }

    }

    init();
  }

  if (document.getElementById('giftList')) {
    giftProductFilter2($('#giftProductList'));
  }


  //ギフト商品一覧ページ 商品フィルター
  function giftProductFilter(target){
    var time = 300;
    var priceRangeFilter = $('#priceRangeFilter');
    var itemLength = target.find(".list_item").length;
    var lengthNum = itemLength + 1;
    var priceMin = 0;
    var priceMax = 100000;
    var priceMinBox = [];
    var priceMaxBox = [];
    var giftListArray = [];

    function displaySortedList(){
      target.stop().animate({ opacity: 0 }, time, function() {
        target.html('');
        for (var i=0; i<itemLength; i++) {
          if(priceMin < giftListArray[i].price && giftListArray[i].price < priceMax){
            target.append(giftListArray[i].html);
          }
        }
        target.stop().animate({ opacity: 1 }, time);
      });
    }


    function priceRangeSort(min,max){
      target.stop().animate({ opacity: 0 }, time, function() {
        target.html('');
        for (var i=0; i<itemLength; i++) {
          if(min < giftListArray[i].price && giftListArray[i].price < max){
            target.append(giftListArray[i].html);
          }
        }
        target.stop().animate({ opacity: 1 }, time);
      });
    }

    function init(){
      target.find(".list_item").each(function(index) {
        $(this).attr('number', index);
        giftListArray[index] = {
          html : $(this),
          price : Number($(this).attr('price').replace(/,/g, '')),
        };
      });

      $('input[name="price_filter"]').on({
        'click': function() {
          var clickId = $(this).attr('id');
          if(clickId == 'price01'){
            $('#price04').prop('checked', false);
          }
          if(clickId == 'price04'){
            $('#price01').prop('checked', false);
          }
          priceMinBox = [];
          priceMaxBox = [];
          var checkedRadio = $('input[name="price_filter"]:checked').length;
          if(checkedRadio != 0){
            $('input[name="price_filter"]:checked').each(function(index) {
              priceMinBox[index] = Number($(this).attr('minPrice'));
              priceMaxBox[index] = Number($(this).attr('maxPrice'));
            });
            priceMin = Number(Math.min.apply(null,priceMinBox));
            priceMax = Number(Math.max.apply(null,priceMaxBox));
          }else{
            priceMin = Number(0);
            priceMax = Number(99999999);
          }
          priceRangeSort(priceMin, priceMax);
        }
      });
    }

    init();
  }

  if (document.getElementById('giftList')) {
    giftProductFilter($('#giftProductList'));
  }


  // 店舗一覧・FAQの目次ボタン

  function indexAnker(target){
    var ankerButton = [];
    var scrollTarget = [];

    function windowMove(e) {
      var headerHeight = $('header').outerHeight();
      var scrollHeight = $(scrollTarget[e]).offset().top;
      var adScroll = scrollHeight - headerHeight - 20;
      $("html, body").animate({
        scrollTop: adScroll
      }, 500);
    }


    function init(){
      target.find('button').each(function(index) {
        ankerButton[index] = $(this);
        scrollTarget[index] = $(this).attr('jump');
        ankerButton[index].on({
          'click': function() {
            windowMove(index);
          }
        });
      });
    }

    init();

  }

  if (document.getElementById('stockist')) {
    indexAnker($('#categoryList'));
  }

  if (document.getElementById('faq')) {
    indexAnker($('#categoryList'));
  }




  function setOptionValue(){
    /*$('#noshiPrice').text('+110円(税込)');
    $('#messagePrice').text('+110円(税込)');
    $('#tesagePrice').text('+440円(税込)');*/
  }

  if (document.getElementById('optionPop')) {
    setOptionValue();
  }

  //商品一覧 商品をもっとみるボタン
  function listReadMore(){
    console.log('listReadMore');
    var readMoreButton = $('#readMoreButton button');
    function setNextList(url){
      $.ajax({
        url: url,
          cache: false,
          dataType:'html',
          success: function(html){
            var product_num = 16;
            var list = $(html).find('#productList').find('.item_box');
            for (var i = 0; i < product_num; i++) {
              if ( !list[i] ) break;
              $('#productList ul').append(list[i]);
            }
            readMoreButton.remove();
          },
      });
    }

    function init(){
      readMoreButton.on({
        'click': function() {
          console.log('click');
          var ajaxURL = $(this).attr('setURL');
          console.log(ajaxURL);
          setNextList(ajaxURL);
        }
      });
    }

    init();

  }

  if (document.getElementById('itemList')) {
    listReadMore();
  }

  /* ログインページの切り替えレイアウト */
  function switchLoginFunction(){
    var loginLayout = $('#login');
    var resetLayout = $('#reset');
    var resetPassword = $('#resetPassword');
    var loginBack = $('#loginBack');
    var urlHash = location.hash;

    function switchLogin(){
      $('#contentSwitcher').animate({opacity:0}, 400, function(){
          loginLayout.css({'display': 'block'});
          resetLayout.css({'display': 'none'});
          $("#contentSwitcher").css({'display': 'block'});
          setTimeout(function() {
            $("#contentSwitcher").animate({opacity: 1}, 400);
          }, 50);
      });
    }

    function switchReset(){
      $('#contentSwitcher').animate({opacity:0}, 400, function(){
          loginLayout.css({'display': 'none'});
          resetLayout.css({'display': 'block'});
          $("#contentSwitcher").css({'display': 'block'});
          setTimeout(function() {
            $("#contentSwitcher").animate({opacity: 1}, 400);
          }, 50);
      });
    }

    function init(){
      if(urlHash.indexOf('recover') > -1){
        switchReset();
      }
      resetPassword.on({
        'click': function() {
          event.preventDefault();
          switchReset();
        }
      });

      loginBack.on({
        'click': function() {
          event.preventDefault();
          switchLogin();
        }
      });

    }

    init();

  }

  if (document.getElementById('contentSwitcher')) {
    switchLoginFunction();
  }

  /* 住所一覧ページの切り替えレイアウト */
  function switchAddressFunction(){
    var addressContentWrap = $('#addressContentWrap');
    var wrapperList = $('#wrapperList');
    var wrapperAdd = $('#wrapperAdd');
    var addressList = $('#addressList');
    var addressEdit = $('#addressEdit');
    var adminBar = $('#adminBar');
    var editbutton = [];
    var editId = [];


    function switchList(){
      adminBar.removeClass('mode-edit').addClass('mode-list');
      window.scroll({top: 0, behavior: 'smooth'});
      addressContentWrap.animate({opacity:0}, 400, function(){
        $('.content_wrapper').css({'display': 'none'});
        wrapperList.css({'display': 'block'});
        addressContentWrap.css({'display': 'block'});
        setTimeout(function() {
          addressContentWrap.animate({opacity: 1}, 400);
        }, 50);
      });
    }

    function switchAdd(){
      adminBar.addClass('mode-edit').removeClass('mode-list');
      window.scroll({top: 0, behavior: 'smooth'});
      addressContentWrap.animate({opacity:0}, 400, function(){
          $('.content_wrapper').css({'display': 'none'});
          wrapperAdd.css({'display': 'block'});
          addressContentWrap.css({'display': 'block'});
          setTimeout(function() {
            addressContentWrap.animate({opacity: 1}, 400);
          }, 50);
      });
    }

    function switchEdit(e){
      adminBar.addClass('mode-edit').removeClass('mode-list');
      window.scroll({top: 0, behavior: 'smooth'});
      addressContentWrap.animate({opacity:0}, 400, function(){
          $('.content_wrapper').css({'display': 'none'});
          $('#' + editId[e]).css({'display': 'block'});
          addressContentWrap.css({'display': 'block'});
          setTimeout(function() {
            addressContentWrap.animate({opacity: 1}, 400);
          }, 50);
      });
    }

    function init(){
      addressList.on({
        'click': function() {
          event.preventDefault();
          switchList();
        }
      });

      addressEdit.on({
        'click': function() {
          event.preventDefault();
          switchAdd();
        }
      });

      $.each($('article').find('.btn_edit'), function(index) {
        editbutton[index] = $(this);
        editId[index] = $(this).attr('formId');
        editbutton[index].on({
          'click': function() {
            console.log(editId[index]);
            switchEdit(index);
          }
        });
      });

    }

    init();

  }

  if (document.getElementById('addressContentWrap')) {
    switchAddressFunction();
  }

  var prevButtonHTML = '<button class="comp-slider-caret prev-arrow"><span class="circle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6.46 10.07"><polygon class="cls-1" points="6.46 1.41 5.04 0 0 5.04 5.04 10.07 6.46 8.66 2.83 5.04 6.46 1.41"/></svg></span></button>';
  var nextButtonHTML = '<button class="comp-slider-caret next-arrow"><span class="circle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6.46 10.07"><polygon class="cls-1" points="0 8.66 1.41 10.07 6.46 5.03 1.41 0 0 1.41 3.62 5.04 0 8.66"/></svg></span></button>';

  if (document.getElementById('productSlider')) {
    $('#productSlider').slick({
      accessibility: false,
      infinite: true,
      dots: false,
      slidesToShow: 3,
      centerMode: false,
      autoplay: true,
      speed: 600,
      prevArrow: prevButtonHTML,
      nextArrow: nextButtonHTML,
      responsive: [
        {
          breakpoint: 1100,
          settings: {
            speed: 600,
            slidesToShow: 2,
            draggable: true,
          }
        },
        {
          breakpoint: 750,
          settings: {
            speed: 600,
            slidesToShow: 1,
            draggable: true,
          }
        }
      ]
    });
  }

  if (document.getElementById('giftSlider')) {
    $('#giftSlider').slick({
      accessibility: false,
      infinite: true,
      dots: false,
      slidesToShow: 3,
      centerMode: false,
      autoplay: true,
      speed: 600,
      prevArrow: prevButtonHTML,
      nextArrow: nextButtonHTML,
      responsive: [
        {
          breakpoint: 750,
          settings: {
            speed: 600,
            slidesToShow: 2,
            draggable: true,
          }
        }
      ]
    });
  }


});
