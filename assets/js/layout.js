document.addEventListener('DOMContentLoaded', function() {


  // ================================
  // ハンバーガーメニュー開閉
  // ================================
  function humMenuToggle() {
    const humButton = document.getElementById('humButton');
    const humMenu = document.getElementById('hummenu');
    const header = document.getElementById('header') || document.querySelector('header');
    let menuState = 0;
    let currentScrollY = 0;

    function humMenuShift() {
      const body = document.body;
      if (menuState === 0) {
        currentScrollY = window.scrollY;
        /*body.style.position = 'fixed';
        body.style.top = `-${currentScrollY}px`;
        body.classList.add('fixed');*/
        if (humMenu) humMenu.classList.add('open');
        if (header) header.classList.add('hum_open');
        menuState = 1;
      } else {
        /*body.classList.remove('fixed');
        body.style.position = '';
        body.style.top = '';*/
        if (humMenu) humMenu.classList.remove('open');
        if (header) header.classList.remove('hum_open');
        window.scrollTo(0, currentScrollY);
        menuState = 0;
      }
    }

    function init() {
      if (humButton) {
        humButton.addEventListener('click', humMenuShift);
      }
    }

    init();
  }

  humMenuToggle();

  // ガイド系ページ 目次ボタン
  function indexAnker(target, isCategoryList2 = false) {
    const buttons = target.querySelectorAll('button');

    function windowMove(scrollTarget) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 0;

      // 対象要素（jump属性に指定されたセレクタ）を取得
      const targetElement = document.querySelector(scrollTarget);
      console.log('scrollTarget:' + scrollTarget);
      if (targetElement) {
        // 対象要素のページ上部からの絶対位置を取得
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const adScroll = elementPosition - headerHeight;

        // スムーススクロール実行
        window.scrollTo({
          top: adScroll,
          behavior: 'smooth'
        });
      }
    }

    function init() {
      buttons.forEach(function(button) {
        const jumpTarget = button.getAttribute('jump');

        button.addEventListener('click', function() {
          if (jumpTarget) {
            if (isCategoryList2) {
              // #categoryList2 の場合は #humButton をクリック（メニューを閉じる等）してからスクロール
              const humButton = document.getElementById('humButton');
              if (humButton) {
                humButton.click();
              }
            }
            windowMove(jumpTarget);
          }
        });
      });
    }

    init();
  }

  // 各リストの取得と実行
  const categoryList = document.getElementById('categoryList');
  if (categoryList) {
    indexAnker(categoryList);
  }

  const categoryList2 = document.getElementById('categoryList2');
  if (categoryList2) {
    indexAnker(categoryList2, true); // 第2引数に true を渡す
  }


  function setMyForm(target) {
    console.log('setMyForm');
    const ERROR_MESSAGE_CLASSNAME = 'errorMsg';
    const ERROR_INPUT_CLASSNAME = 'errorInput';
    let errorCount = 0;

    const submitButtonContainer = document.getElementById('submitButton');
    const submitButtonInput = submitButtonContainer ? submitButtonContainer.querySelector('input') : null;
    let items = [];

    // 項目チェック
    const checkAll = function() {
      errorCount = 0;
      items.forEach((item, i) => {
        // datasetから成功フラグを確認 (文字列で保存されるため比較に注意)
        if (item.dataset.isSuccess === 'false') {
          errorCount++;
          console.log('error:' + i);
        }
      });
    };

    // 半角変換とトリム
    function hankaku2Zenkaku(el) {
      let str = el.value;
      str = str.replace(/[Ａ-Ｚａ-ｚ０-９－！”＃＄％＆’（）＝＜＞，．？＿［］｛｝＠＾～￥]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 65248);
      }).replace(/[ー]/g, '').replace(/[−]/g, '');
      el.value = str.trim().replace(/\s+/g, '');
    }

    // エラーメッセージの追加
    const addErrorMessage = function(el, msg) {
      removeErrorMessage(el);
      const errorHtml = `<span class="attention ${ERROR_MESSAGE_CLASSNAME}">${msg}</span>`;
      el.parentElement.insertAdjacentHTML('beforeend', errorHtml);
      el.classList.add(ERROR_INPUT_CLASSNAME);
    };

    // エラーメッセージの削除
    const removeErrorMessage = function(el) {
      const parent = el.parentElement;
      const msgElement = parent.querySelector('.' + ERROR_MESSAGE_CLASSNAME);
      if (msgElement) {
        msgElement.remove();
        el.classList.remove(ERROR_INPUT_CLASSNAME);
      }
    };

    // 未入力チェック
    const checkEmptyText = function(el, msg) {
      if (!el.value || el.value.trim() === '') {
        addErrorMessage(el, msg);
        el.dataset.isSuccess = 'false';
      } else {
        removeErrorMessage(el);
        el.dataset.isSuccess = 'true';
      }
    };

    // フォーマットチェック
    function checkFormatText(el, _mode, msg) {
      const value = el.value;
      let success = false;
      switch (_mode) {
        case 0:
          success = !!value.match(/^[^ -~｡-ﾟ]*$/);
          break; // 全角のみ
        case 1:
          success = !!value.match(/^[\u3040-\u309F]+$/);
          break; // ふりがな
        case 2:
          success = !!value.match(/^[0-9\-]+$/) || value.length < 1;
          break; // 半角数字
        case 3:
          success = !!value.match(/^[a-zA-Z0-9!$&*.=^`|~#%'+\/?_{}-]+@([a-zA-Z0-9_-]+\.)+[a-zA-Z]{2,6}$/);
          break; // メール
        case 4:
          success = !!value.match(/^[\u30A0-\u30FF]+$/) || !!value.match(/^[\uFF61-\uFF9F]+$/);
          break; // カタカナ
        case 5:
          success = false;
          break; // 強制エラー
      }
      el.dataset.isSuccess = success ? 'true' : 'false';
      if (!success) {
        addErrorMessage(el, msg);
      } else {
        removeErrorMessage(el);
      }
    }

    // 初期設定
    const init = function() {
      // 1. Submitイベント
      target.addEventListener('submit', function(e) {
        e.preventDefault(); // デフォルト送信を防止
        checkAll();
      });

      // 2. 要素取得 (targetはDOM要素であることを想定)
      items = [
        target.querySelector('input[name="yourname"]'),
        target.querySelector('input[name="corpname"]'),
        target.querySelector('textarea[name="content"]')
      ];

      // 3. 成功フラグの初期化
      items.forEach(item => {
        if (item) item.dataset.isSuccess = 'false';
      });

      // 4. Enterキーでの送信防止
      target.querySelectorAll('input[type=text]').forEach(input => {
        input.addEventListener('keypress', function(e) {
          if (e.key === 'Enter') e.preventDefault();
        });
      });

      // 各項目のバリデーション設定
      if (items[0]) {
        items[0].addEventListener('blur', () => {
          checkEmptyText(items[0], '※お名前を入力してください。');
          checkAll();
        });
      }

      if (items[1]) {
        items[1].addEventListener('blur', () => {
          checkEmptyText(items[1], '※所属チームを入力してください。');
          checkAll();
        });
      }

      if (items[2]) {
        items[2].addEventListener('blur', () => {
          checkEmptyText(items[2], '※お問い合わせ内容を入力してください。');
          checkAll();
        });
      }

      // 送信ボタンクリック時の最終チェック
      if (submitButtonInput) {
        submitButtonInput.addEventListener('click', function() {
          checkEmptyText(items[0], '※お名前を入力してください。');
          checkEmptyText(items[1], '※所属チームを入力してください。');
          checkEmptyText(items[2], '※お問い合わせ内容を入力してください。');
          checkAll();

          if (errorCount === 0) {
            processOrderContent();
          } else {
            alert('入力内容に不備があります。入力内容を確認いただき、再度送信ボタンを押してください。');
            const contactElem = document.getElementById('contact');
            if (contactElem) {
              const rect = contactElem.getBoundingClientRect();
              const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
              window.scrollTo({
                top: rect.top + scrollTop,
                behavior: 'smooth'
              });
            }
          }
        });
      }
    };

    // Googleフォームへの送信処理
    async function processOrderContent() {
      if (submitButtonContainer) submitButtonContainer.classList.add('disabled');
      const loader = document.getElementById('ajaxLoader');
      if (loader) loader.classList.add('loading_state');

      const formData = new FormData();
      formData.append("entry.830733592", target.querySelector('input[name="yourname"]').value);
      formData.append("entry.1335861555", target.querySelector('input[name="corpname"]').value);
      formData.append("entry.953691041", target.querySelector('input[name="useremail"]').value);
      formData.append("entry.1716105025", target.querySelector('input[name="userphone"]').value);
      formData.append("entry.1946214284", target.querySelector('textarea[name="content"]').value);

      try {
        // GoogleフォームへのPOST (CORS回避のため mode: 'no-cors')
        await fetch("https://docs.google.com/forms/u/1/d/e/1FAIpQLSfw4PB_qj3dgXK9RF8Vj6--NxA8udRFpKINoLVvJsULhej16g/formResponse", {
          method: "POST",
          mode: "no-cors",
          body: formData
        });

        // Googleフォームは no-cors だと成功レスポンスが取れないため、送信完了とみなす
        setTimeout(function() {
          if (loader) loader.classList.remove('loading_state');
          const statusMsg = document.getElementById('statusMessage');
          if (statusMsg) {
            statusMsg.classList.add('complete');
            statusMsg.innerHTML = '<span class="text">メッセージは送信されました。<br>自動返信メールをご確認ください。</span>';
          }
        }, 1000);

      } catch (error) {
        if (loader) loader.classList.remove('loading_state');
        alert('送信に失敗しました。お手数ではございますが、時間を置いてもう一度お試しください。');
      }
    }

    init();
  }

  // 実行
  const contactWrap = document.getElementById('contactWrap');
  if (contactWrap) {
    setMyForm(contactWrap);
  }

});
