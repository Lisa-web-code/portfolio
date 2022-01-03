"use strict"

let time=new Date().getTime();

$(function (){

 // === loading and first view animation ===
  function stopLoading(){
    $(".loading__circle").fadeOut(500);
    $(".loading__spin").fadeOut(500);
    $(".loading").delay(500).fadeOut(800).queue(function() {
      // === first view ===
      $(".fv__copy").addClass('visible').dequeue();
      $(".fv__scroll").delay(2500).queue(function(){
        $(this).addClass('visible').dequeue();
      });
    });
  }

  // 初回アクセスと２回目以降で分ける。タブを閉じたらリセットされる。
  const keyName = 'visited';
  const keyValue = true;
  
  if (!sessionStorage.getItem(keyName)) {
    //sessionStorageにキーと値を追加
    sessionStorage.setItem(keyName, keyValue);
  
    //初回アクセス時の処理
    // ローディング画面表示
    $(".loading").addClass('visible');
    // ローディングが終わったら
    $(window).on('load',function(){
      let now = new Date().getTime();
      // ローディング時間が２秒以下なら(4－ローディング時間)秒後にローディングアニメーションを終了する
      // ２秒より長ければ、ローディングが完了した時点でローディングアニメーションを終了する
      if (now-time<=2000){
        setTimeout(stopLoading,4000-(now-time));
        return;
      } else {
        stopLoading();
      }
    });
    //10秒たったら強制的にロード画面を非表示
    $(function(){
      setTimeout(stopLoading,10000);
    });
  
  } else {
      //２回目以降アクセス時の処理
      $(".fv__copy").addClass('visible');
      $(".fv__scroll").delay(2500).queue(function(){
        $(this).addClass('visible').dequeue();
      });
  }


  // === smooth scroll ===
  // #で始まるリンクをクリックした場合
  $('a[href^="#"]').click(function() {
    let speed = 600;
    let type = 'swing';
    //リンク先（href）を取得(attr)して、hrefという変数に代入
    let href= $(this).attr("href");
    // hrefの中が＃のみか空白だったらリンク先はhtml(ページの先頭)にする。そうでなければリンク先は変数hrefにする。
    let target = $(href == "#" || href == "" ? 'html' : href);
    let position = target.offset().top;
    // animateでスムーススクロール
    $('body,html').animate({scrollTop:position}, speed, type);
    return false;
  });

  
  // === header bar ===
  $(window).scroll(function(){
    if($(window).scrollTop() > 20) {
      $('.header').addClass('is-scrolled');
    } else {
      $('.header').removeClass('is-scrolled');
    }
  });
  

  // === hamburger menu ===
  $('.header__hamburgerMenu').click(function(){
    $('.header__nav-sp').fadeToggle();
    $(this).toggleClass('js-open');
    $('body').toggleClass('js-open');
  });

  $('.header__nav__item-sp__link').click(function(){
    $('.header__nav-sp').fadeToggle();
    $('.header__hamburgerMenu').toggleClass('js-open');
    $('body').toggleClass('js-open');
  });

  $('.header__nav-sp').click(function(){
    $(this).fadeToggle();
    $('.header__hamburgerMenu').toggleClass('js-open');
    $('body').toggleClass('js-open');
  });



  // === first view arrow ===
  $(window).scroll(function(){
    let trigger_point =  $('#vision').offset().top - $(window).height() + 200;
    if($(window).scrollTop() > trigger_point) {
      $('.fv__scroll').removeClass('visible');
    } else {
      $('.fv__scroll').addClass('visible');
    }
  });



  // === vision sliding in and drawing underline===
    $(window).scroll(function(){
      $('.js-trigger').each(function(){
        let trigger_point =  $(this).offset().top - $(window).height()/5;
        if($(window).scrollTop() > trigger_point){
          $(this).find('.js-slide').addClass('is-active');
          $(this).find('.js-underline').addClass('is-active');
        }

        if($(window).height() < 600) {
          $(this).find('.js-slide').css('transition','0s');
          $(this).find('.js-underline').css('transition-delay','0s');
        }
      });
    });

    
  // === fade up ===
  $(window).scroll(function(){
    $('.js-fade').each(function(){
      let trigger_point =  $(this).offset().top - $(window).height()/2 -200;
      if ($(window).scrollTop() > trigger_point) {
        $(this).css('opacity','1');
        $(this).css('transform','translateY(0)');
      } 
    });
  });
});