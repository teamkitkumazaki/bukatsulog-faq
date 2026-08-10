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

});
