var COOKIES = COOKIES || {
    /*
     指定したcookieの値を取得して返す関数
     第1引数=取得したいcookiename
    */
    getCookie: function(cName) {
        var cookie_name = cName;
        if(cookie_name == '' || cookie_name == null) {
            console.log('COOKIES.getCookie：引数に値を代入してください。');
        } else {
            var set_replace = '(?:(?:^|.*\s*)' + cookie_name + '\s*\=\s*([^;]*).*$)|^.*$';
            var cookie_value = document.cookie.replace(new RegExp(set_replace), '$1');
            return cookie_value;
        }
    },
    /*
     指定したcookieを追加する関数
     第1引数=追加するcookiename;第2引数=追加するcookievalue;第3引数=cookieの有効期限(day)
    */
    setCookie: function(cName, cValue, cTime) {
        var cookie_name = cName;
        var cookie_Value = cValue;
        var cookie_domain = location.hostname;
        var cookie_time = cTime ? (60 * 60 * 24) * cTime : '';
        if(cookie_name == '' || cookie_name == null) {
            console.log('COOKIES.setCookie：第1引数に値を代入してください。')
        } else {
            document.cookie = cookie_name + '=' + cookie_Value + ';domain=' + cookie_domain + ';max-age=' + cookie_time;
        }
    },
    /*
     指定したcookieの値を削除する関数
     第1引数=削除したいcookiename
    */
    deleteCookie: function(cName) {
        var cookie_name = cName;
        if(cookie_name == '' || cookie_name == null) {
            console.log('COOKIES.deleteCookie：引数に値を代入してください。');
        } else {
            COOKIES.setCookie(cookie_name, '', 0);
        }
    }
};

function getItemHistory(){
	var domain = 'https://' + location.host;
	var targetDom = $('#itemHistory');
	var history = COOKIES.getCookie('history');
	const historyArray = history.split(',');
  console.log('history:' + history);
  if(historyArray.length != 0){
  $.ajax({
    url: domain + '/collections/ajax',
    cache: false,
    dataType: 'html',
    success: function(html) {
      var prop = [];
      var prodHTML = [];
      for (var i = 0; i < 8; i++) {
        $.each($(html).find('.item_box'), function(index) {
          prop[index] = $(this).attr('id');
          prodHTML[index] = $(this);
          if('handle-' + historyArray[i] == prop[index] ){
            targetDom.append(prodHTML[index]);
          }
      });
      }
    }
  });
  }else{
    targetDom.append('<p class="no-entry">閲覧履歴はまだありません。</p>');
  }
}


if (document.getElementById('itemHistory')) {
	getItemHistory();
}

function setHistory(i){
	var history = COOKIES.getCookie('history');
	console.log('history:' + history);
  document.cookie = 'history=; path=/;'
  document.cookie = "max-age=0; path=/";
  var date1,date2;  //日付データを格納する変数
  var kigen = 365;   //cookieの期限（今回は30日）
  var postID = i;
  date1 = new Date();
  date1.setTime(date1.getTime() + kigen*24*60*60*1000);
  date2 = date1.toGMTString();
  var array = history;
	array = history.replace(postID, "");
  var favoriteCookie = postID + ',' + array;
	favoriteCookie = favoriteCookie.replace(",,", ",");
  document.cookie = 'history=' + favoriteCookie + '; path=/';
  document.cookie = 'max-age=' + date2 + '; path=/';
}

if (document.getElementById('itemDetailNew')) {
	setHistory('k0004');
}
