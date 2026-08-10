$(function() {

  /* お問い合わせフォームのバリデーション */
  function setMyForm(target){
    console.log('setMyForm');
    var ERROR_MESSAGE_CLASSNAME = 'errorMsg'; //エラー時のメッセージ要素のclass名
    var ERROR_INPUT_CLASSNAME = 'errorInput'; //エラー時のinput要素のclass名
    var errorCount = 0;
    var submitButton = $('#submitButton');
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
        submitButton.find('input').attr('value', '送信する');
        submitButton.removeClass('disabled');
      }else{
        submitButton.addClass('disabled');
        submitButton.find('input').attr('value', '全ての項目を入力ください');
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
        submitButton.removeClass('disabled');
        submitButton.find('input').attr('value', '送信する');
      }else{
        addErrorMessage(selector, msg);
        selector.prop('isSuccess', false);
        submitButton.addClass('disabled');
        submitButton.find('input').attr('value', '全ての項目を入力してください');
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
          if(value.match(/^[0-9]*$/)){
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
      };
      if( selector.prop('isSuccess') == false ){
        addErrorMessage(selector, msg);
      }else{
        removeErrorMessage(selector);
      };
    };

    //初期設定
    var init = function(){
      submitButton.addClass('disabled');
      //submitイベントの設定
      target.on({
        'submit': function(){
          checkAll();
        }
      });
      //input要素を配列に格納
      items = [
        target.find('input[name="usermail"]'), //0 メールアドレス
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

      //0 メールアドレス
      items[0].on({
        'blur': function(){
          checkEmptyText( items[0], '※メールアドレスをご入力ください。' );
          if( items[0].prop('isSuccess') ) checkFormatText( items[0], 3, 'アドレスの形式をご確認ください' );
          checkAll();
        }
      });

      submitButton.on({
        'click': function(){
          checkEmptyText( items[0], '※メールアドレスをご入力ください。' );
          if( items[0].prop('isSuccess') ) checkFormatText( items[0], 3, 'アドレスの形式をご確認ください' );
          checkAll();
          if( errorCount == 0 ){
            processOrderContent();
            var scrollHeight = $('#formWrap').offset().top;
          }else{
            var scrollHeight = $('#formWrap').offset().top;
            $("html, body").animate({
              scrollTop: scrollHeight
            }, 300);
          };
        }
      })
    };

    function processOrderContent(){
      submitButton.addClass('disabled');
      $('#ajaxLoader').addClass('loading');
      var content = target.find("textarea[name=content]").val();
      event.preventDefault();
      var request = target.find("textarea[name=request]").val();
      event.preventDefault();
      var email = target.find("input[name=usermail]").val();
      event.preventDefault();
      $.ajax({
        url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfvvpDDjBmxnMrTfXFL_InUkjXs3KWZGbjMj7nEav4BPBoHtA/formResponse",
        data: {
          "entry.1232285518": content,
          "entry.1535642573": request,
          "entry.1224136681": email,
        },
      type: "POST",
      dataType: "xml",
      statusCode: {
          0: function () {
            setTimeout(function() {
              $('#ajaxLoader').removeClass('loading');
              $('#statusMessage').addClass('complete').html('<span class="text">内容は正常に送信されました。アンケートへのご協力ありがとうございました。</span>');
              setTimeout(function() {
                location.href = 'https://komons-japan.com/'
              }, 2000);
            }, 1000);
          },
          200: function () {
            $('#statusMessage').addClass('error').html('<span class="text">メッセージ送信に失敗しました。お手数ではございますが、時間を置いてもう一度お試しください。</span>');
            setTimeout(function() {
              location.href = 'https://komons-japan.com/'
            }, 3000);
          }
        }
      });
    }

    init();

  };

  if (document.getElementById('review')) {
    setMyForm($('#formWrap'));
  }
});
