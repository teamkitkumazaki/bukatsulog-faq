function setHankaku2Zenkaku(str){
  var nrwStr = str.replace( /[Ａ-Ｚａ-ｚ０-９－！”＃＄％＆’（）＝＜＞，．？＿［］｛｝＠＾～￥]/g, function(s) {
    return String.fromCharCode(s.charCodeAt(0) - 65248);
  }).replace(/[ー]/g, '').replace(/[−]/g, '');
  return nrwStr;
}



function hankaku2Zenkaku(target) {
  var str = target.val();
  str = str.replace( /[Ａ-Ｚａ-ｚ０-９－！”＃＄％＆’（）＝＜＞，．？＿［］｛｝＠＾～￥]/g, function(s) {
    return String.fromCharCode(s.charCodeAt(0) - 65248);
  }).replace(/[ー]/g, '').replace(/[−]/g, '');

  console.log('str:' + str);
  target.val(str.trim().replace(/\s+/g, ''));
}

$('.input-number').on({
  'blur': function(){
    hankaku2Zenkaku($(this));
  }
});

function hankaku2ZenkakuAdd(target) {
  var str = target.val();
  str = str.replace( /[Ａ-Ｚａ-ｚ０-９－！”＃＄％＆’（）＝＜＞，．？＿［］｛｝＠＾～￥]/g, function(s) {
    return String.fromCharCode(s.charCodeAt(0) - 65248);
  }).replace(/[ー]/g, '');

  console.log('str:' + str);
  target.val(str.trim().trim().replace(/\s+/g, ''));
}

$('.input-address').on({
  'blur': function(){
    hankaku2ZenkakuAdd($(this));
  }
});


function hankana2Zenkana(str) {
  var kanaMap = {
      'ｶﾞ': 'ガ', 'ｷﾞ': 'ギ', 'ｸﾞ': 'グ', 'ｹﾞ': 'ゲ', 'ｺﾞ': 'ゴ',
      'ｻﾞ': 'ザ', 'ｼﾞ': 'ジ', 'ｽﾞ': 'ズ', 'ｾﾞ': 'ゼ', 'ｿﾞ': 'ゾ',
      'ﾀﾞ': 'ダ', 'ﾁﾞ': 'ヂ', 'ﾂﾞ': 'ヅ', 'ﾃﾞ': 'デ', 'ﾄﾞ': 'ド',
      'ﾊﾞ': 'バ', 'ﾋﾞ': 'ビ', 'ﾌﾞ': 'ブ', 'ﾍﾞ': 'ベ', 'ﾎﾞ': 'ボ',
      'ﾊﾟ': 'パ', 'ﾋﾟ': 'ピ', 'ﾌﾟ': 'プ', 'ﾍﾟ': 'ペ', 'ﾎﾟ': 'ポ',
      'ｳﾞ': 'ヴ', 'ﾜﾞ': 'ヷ', 'ｦﾞ': 'ヺ',
      'ｱ': 'ア', 'ｲ': 'イ', 'ｳ': 'ウ', 'ｴ': 'エ', 'ｵ': 'オ',
      'ｶ': 'カ', 'ｷ': 'キ', 'ｸ': 'ク', 'ｹ': 'ケ', 'ｺ': 'コ',
      'ｻ': 'サ', 'ｼ': 'シ', 'ｽ': 'ス', 'ｾ': 'セ', 'ｿ': 'ソ',
      'ﾀ': 'タ', 'ﾁ': 'チ', 'ﾂ': 'ツ', 'ﾃ': 'テ', 'ﾄ': 'ト',
      'ﾅ': 'ナ', 'ﾆ': 'ニ', 'ﾇ': 'ヌ', 'ﾈ': 'ネ', 'ﾉ': 'ノ',
      'ﾊ': 'ハ', 'ﾋ': 'ヒ', 'ﾌ': 'フ', 'ﾍ': 'ヘ', 'ﾎ': 'ホ',
      'ﾏ': 'マ', 'ﾐ': 'ミ', 'ﾑ': 'ム', 'ﾒ': 'メ', 'ﾓ': 'モ',
      'ﾔ': 'ヤ', 'ﾕ': 'ユ', 'ﾖ': 'ヨ',
      'ﾗ': 'ラ', 'ﾘ': 'リ', 'ﾙ': 'ル', 'ﾚ': 'レ', 'ﾛ': 'ロ',
      'ﾜ': 'ワ', 'ｦ': 'ヲ', 'ﾝ': 'ン',
      'ｧ': 'ァ', 'ｨ': 'ィ', 'ｩ': 'ゥ', 'ｪ': 'ェ', 'ｫ': 'ォ',
      'ｯ': 'ッ', 'ｬ': 'ャ', 'ｭ': 'ュ', 'ｮ': 'ョ',
      '｡': '。', '､': '、', 'ｰ': 'ー', '｢': '「', '｣': '」', '･': '・'
  };
  var reg = new RegExp('(' + Object.keys(kanaMap).join('|') + ')', 'g');
  return str.replace(reg, function (match) {return kanaMap[match];}).replace(/ﾞ/g, '゛').replace(/ﾟ/g, '゜');
}

$('.input-kana').on({
  'blur': function(){
    var value = $(this).val();
    var value = hankana2Zenkana(value.trim().replace(/\s+/g, ''));
    $(this).val(value);
  },
});


$(function() {
  /* お問い合わせフォームのGAS連動とバリデーション */
  function setContactForm(target){
    var ERROR_MESSAGE_CLASSNAME = 'errorMsg'; //エラー時のメッセージ要素のclass名
    var ERROR_INPUT_CLASSNAME = 'errorInput'; //エラー時のinput要素のclass名
    var errorCount = 0;
    var submitWrap = $('#submit');
    var submitButton = $('#submitButton input');
    var items = []; //チェック対象となるテキスト入力要素を格納した配列

    //項目チェックする
    var checkAll = function(){
      errorCount = 0;

      //input,textareaのチェック
      for( var i=0; i<items.length; i++ ){
        if( items[i].prop('isSuccess') == false ){
          errorCount++;
        };
      };

      console.log('errorCount:' + errorCount);

      if( errorCount == 0 ){
        submitButton.removeClass('disabled');
      }else{
        submitButton.addClass('disabled');
      };
    };

    //エラーメッセージの追加
    var addErrorMessage = function(selector, msg){
      removeErrorMessage(selector);
      selector.parent('div').append('<span class="attention '+ERROR_MESSAGE_CLASSNAME+'">'+msg+'</span>');
      selector.addClass(ERROR_INPUT_CLASSNAME);
    };

    //エラーメッセージの削除
    var removeErrorMessage = function(selector){
      var msgSelector = selector.parent('div').find('.'+ERROR_MESSAGE_CLASSNAME);
      if( msgSelector.length != 0 ){
        msgSelector.remove();
        selector.removeClass(ERROR_INPUT_CLASSNAME);
      };
    };

    //input,textareaの未入力チェック
    var checkEmptyText = function(selector, msg){
      if( selector.val() == '' ||  selector.val() == null){
        addErrorMessage(selector, msg);
        selector.prop('isSuccess', false);
      }else{
        removeErrorMessage(selector);
        selector.prop('isSuccess', true);
      };
    };

    var emptyThrough = function(selector){
      if( selector.val() == '' ||  selector.val() == null){
        removeErrorMessage(selector);
        selector.prop('isSuccess', true);
      }
    };

    //radioの未入力チェック
    var checkRadioBox = function(selector, msg){
      if( selector.prop("checked")){
        removeErrorMessage(selector);
        selector.prop('isSuccess', true);
      }else{
        addErrorMessage(selector, msg);
        selector.prop('isSuccess', false);
      };
    };

    //文字列のフォーマットチェック
    function checkFormatText(selector, _mode, msg){
      var value = selector.val();
      switch(_mode){
        //全角のみ
        case 0:
          if(value.match(/^[^ -~｡-ﾟ]*$/)){
            selector.prop('isSuccess', true);
            removeErrorMessage(selector);
          }else{
            selector.prop('isSuccess', false);
          };
          break;
        //ふりがなのみ
        case 1:
          if(value.match(/^[\u3040-\u309F]+$/)){
            selector.prop('isSuccess', true);
          }else{
            selector.prop('isSuccess', false);
          };
          break;
        //半角数字のみ
        case 2:
          if(value.match(/^[0-9\-]+$/) || value.length < 1){
            selector.prop('isSuccess', true);
          }else{
            selector.prop('isSuccess', false);
          };
          break;
        //メールアドレスかどうか
        case 3:
          if(value.match(/^[a-zA-Z0-9!$&*.=^`|~#%'+\/?_{}-]+@([a-zA-Z0-9_-]+\.)+[a-zA-Z]{2,6}$/)){
            selector.prop('isSuccess', true);
          }else{
            selector.prop('isSuccess', false);
          };
          break;
        //カタカナのみ
        case 4:
          if(value.match(/^[\u30A0-\u30FF]+$/) || value.match(/^[\uFF61-\uFF9F]+$/)){
            selector.prop('isSuccess', true);
          }else{
            selector.prop('isSuccess', false);
          };
          break;
        //全てエラーにする
        case 5:
          selector.prop('isSuccess', false);
          break;
      };
      if( selector.prop('isSuccess') == false ){
        addErrorMessage(selector, msg);
      }else{
        removeErrorMessage(selector);
      };
    };

    //初期設定
    var init = function(){
      target.find('input[type=button]').attr('disabled', false);
      //submitイベントの設定
      target.on({
        'submit': function(){
          checkAll();
        }
      });
      //input要素を配列に格納
      items = [
        target.find('input[name="lastName"]'), //0 お名前(姓)
        target.find('input[name="firstName"]'), //1 お名前(名)
        target.find('input[name="useremail"]'), //2 メールアドレス
        target.find('input[name="useremail2"]'), //3 メールアドレス(確認用)
        target.find('textarea[name="content"]'), //4  お問い合わせ内容
        target.find('input[name=agreement]'), //5 プラポリへの合意
      ];
      //input要素のプロパティを設定
      $.each(items, function(index){
        items[index].prop('isSuccess', false);
      });


      //enterキーでsubmitしてしまうのを防止する
      target.find('input[type=text]').on({
        'keypress': function(e){
          if( (e.keyCode == 13) ) return false;
        }
      });

      //0 お名前(姓)
      items[0].on({
        'blur': function(){
          checkEmptyText( items[0], '※お名前(姓)は必須です。');
          checkAll();
        }
      });

      //1 お名前(名)
      items[1].on({
        'blur': function(){
          checkEmptyText( items[1], '※お名前(名)は必須です。');
          checkAll();
        }
      });

      //2 メールアドレス
      items[2].on({
        'blur': function(){
          checkEmptyText( items[2], '※メールアドレスは必須です。');
          if( items[2].prop('isSuccess') ) checkFormatText( items[2], 3, '※メールアドレスの形式をご確認ください' );
          checkAll();
        }
      });

      //3 メールアドレス(確認用)
      items[3].on({
        'blur': function(){
          checkEmptyText( items[3], '※確認用メールアドレスは必須です。');
          if( items[3].prop('isSuccess') ){
            checkFormatText( items[3], 3, '※確認用メールアドレスの形式をご確認ください' );
            if(items[2].val() != items[3].val()){
              checkFormatText( items[3], 5, '※メールアドレスが一致しません。' );
            }
          }

          checkAll();

        }
      });

      //4 お問い合わせ内容
      items[4].on({
        'blur': function(){
          checkEmptyText( items[4], '※お問い合わせ内容は必須です。' );
          checkAll();
        }
      });

      items[5].prop('isSuccess', true);

      //0 プラポリへの合意
      items[5].on({
        'change': function(){
          var agreeState = $('input[name=agreement]:checked').val();
          if(agreeState == 1){
            $('#submitButton').removeClass('disabled');
          }else{
            $('#submitButton').addClass('disabled');
          }
        }
      });

      submitButton.on({
        'click': function(){
          checkEmptyText( items[0], '※お名前(姓)は必須です。');
          checkEmptyText( items[1], '※お名前(名)は必須です。');
          checkEmptyText( items[2], '※メールアドレスは必須です。');
          if( items[2].prop('isSuccess') ) checkFormatText( items[2], 3, '※メールアドレスの形式をご確認ください' );
          checkEmptyText( items[3], '※確認用メールアドレスは必須です。');
          if( items[3].prop('isSuccess') ){
            checkFormatText( items[3], 3, '※確認用メールアドレスの形式をご確認ください' );
            if(items[2].val() != items[3].val()){
              checkFormatText( items[3], 5, '※メールアドレスが一致しません。' );
            }
          }
          checkEmptyText( items[4], '※お問い合わせ内容は必須です。' );

          checkAll();
          if( errorCount == 0 ){
            processOrderContent();
          }else{
            alert('入力内容に不備があります。入力内容を確認いただき、再度送信ボタンを押してください。');
            var offset = $('header').outerHeight();
            var scrollHeight = $('#contactWrap').offset().top;
            $("html, body").animate({
              scrollTop: scrollHeight - offset
            }, 300);
          };
        }
      })
    };

    function processOrderContent(){
      $('#submitButton').addClass('completed');
      $('#ajaxLoader').addClass('loading_state');
      // お名前
      var userName = target.find("input[name=lastName]").val() + target.find("input[name=firstName]").val();
      // メールアドレス
      var userMail = target.find("input[name=useremail]").val();
      //種別
      var content = target.find("textarea[name=content]").val();
      event.preventDefault();
      $.ajax({
        url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfjTnS7OK3ismY6zJdr-8voqq_Bjf_23j92-OqFq647GDQInQ/formResponse",
        data: {
          "entry.1215989745": userName,
          "entry.33351572": userMail,
          "entry.1082353849": content,
        },
        type: "POST",
        dataType: "xml",
        statusCode: {
          0: function () {
            setTimeout(function() {
              $('#ajaxLoader').removeClass('loading_state');
              $('#submitButton').remove();
              $('#statusMessage').addClass('complete').html('<span class="text">入力内容は正常に送信されました。<span>自動返信メールをご確認ください。</span></span>');
              /*location.href = 'https://' + location.hostname + '/pages/completed'*/
            }, 1000);
          },
          200: function () {
            $('#ajaxLoader').removeClass('loading_state');
            $('#submitButton').remove();
            $('#statusMessage').addClass('error').html('<span class="text">送信に失敗しました。お手数ではございますが、時間を置いてもう一度お試しください。</span>');
            setTimeout(function() {
              location.href = 'https://' + location.hostname + '/'
            }, 3000);
          }
        }
    });
  }

    init();

  };

  setContactForm($('#contactWrap'));

});
