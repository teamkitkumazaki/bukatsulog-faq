$(function() {
  function pointSet(){
    var url = location.href;
    var pointNum = url.split('?pt=');
    var point = pointNum[1].split('&')
    $('#pointInput').attr('value', point[0])
  }

  pointSet();
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
        target.find('select[name="route"]'), //0 お問い合わせ項目
        target.find('input[name="usermail"]'), //1 メールアドレス
      ];
      //input要素のプロパティを設定
      $.each(items, function(index){
        items[index].prop('isSuccess', false);
      });

      items[1].prop('isSuccess', true);

      //enterキーでsubmitしてしまうのを防止する
      target.find('input[type=text]').on({
        'keypress': function(e){
          if( (e.keyCode == 13) ) return false;
        }
      });
      //0 お問い合わせ内容
      items[0].on({
        'blur': function(){
          console.log('blur');
          checkEmptyText( items[0], '※項目を選択してください。' );
          checkAll();
        },
        'change': function(){
          console.log('change');
          checkEmptyText( items[0], '※項目を選択してください。' );
          checkAll();
        }
      });
      items[1].on({
        'blur': function(){
          if(items[1].val().length > 0){
            if( items[1].prop('isSuccess') ) checkFormatText( items[1], 3, '※メールアドレスの形式をご確認ください' );
            checkAll();
          }else{
            items[1].prop('isSuccess', true);
            checkAll();
            removeErrorMessage(items[1]);
          }
        },
        'change': function(){
          if(items[1].val().length > 0){
            if( items[1].prop('isSuccess') ) checkFormatText( items[1], 3, '※メールアドレスの形式をご確認ください' );
            checkAll();
          }else{
            items[1].prop('isSuccess', true);
            checkAll();
            removeErrorMessage(items[1]);
          }
        }
      });
      submitButton.on({
        'click': function(){
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
      var radioProp = [];
      submitButton.addClass('disabled');
      $('#ajaxLoader').addClass('loading');
      var point = target.find('input[name=point]').val();
      var sex = target.find('input[name=sex]:checked').val();
      var age = target.find("input[name=age]:checked").val();
      var family = target.find("input[name=family]:checked").val();
      var route = target.find("select[name=route]").val();
      $('input:checkbox[name=product]:checked').each(function() {
        radioProp.push($(this).val());
        console.log(radioProp.join());
      });
      var content = target.find("textarea[name=content]").val();
      var request = target.find("textarea[name=request]").val();
      var usermail = target.find("input[name=usermail]").val();
      event.preventDefault();
      $.ajax({
        url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdUANwksAcfDiH2qERK3bJ6lhmKjTZRKq9q-h0o6BgVRXqVmA/formResponse",
        data: {
          "entry.502219398": point, /* 評価点数*/
          "entry.437624216": sex, /* 性別 */
          "entry.161097082": age, /* 年齢 */
          "entry.55464818": family, /* 家族構成 */
          "entry.531319224": route, /* 知った経緯 */
          "entry.1450448374": radioProp.join(), /* 使った商品 */
          "entry.1792741485": content, /* 良かった点/改善すべき点 */
          "entry.356591634": request, /* こんな商品が欲しい */
          "entry.836973782": usermail /* メールアドレス */
        },
      type: "POST",
      dataType: "xml",
      statusCode: {
          0: function () {
            setTimeout(function() {
              /*$('#ajaxLoader').removeClass('loading');
              $('#statusMessage').addClass('complete').html('<span class="text">内容は正常に送信されました。アンケートへのご協力ありがとうございました。</span>');*/
              setTimeout(function() {
                location.href = 'https://komons-japan.com/pages/thanks'
              }, 10);
            }, 500);
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
