$(document).ready(function () {
  init();
});

function init() {
  mainSwiper1();
  toggleBackgroundColor();
  leftClick();
  rightClick();
  cancelClick();
}

function mainSwiper1() {
    const swiper = new Swiper(".mainSwiper1", {
        slidesPerView: 1,
        autoplay: {
            delay: 0, // 딜레이 없이 자동 재생
            disableOnInteraction: false
        },
        speed: 2000, // 슬라이드 전환 속도 (2초)
        loop: true, // 슬라이드 루프
        spaceBetween: 10, // 슬라이드 사이의 간격
        effect: 'slide', // 전환 효과
        simulateTouch: true, // 터치로 슬라이드 이동 가능
        freeMode: false, // freeMode 비활성화
        pagination: {
            el: ".swiper-pagination",
            type: "progressbar",
          },
          breakpoints: {
            691: {
                slidesPerView: 2,
            }
        }
    });

    // 슬라이드 터치 시 멈추고 재터치 시 다시 시작
    let isAutoplayRunning = true; // autoplay 상태 추적 변수

    swiper.on('touchStart', function () {
        if (isAutoplayRunning) {
            swiper.autoplay.stop(); // 자동 재생 멈춤
            isAutoplayRunning = false; // 상태 업데이트
        } else {
            swiper.autoplay.start(); // 자동 재생 시작
            isAutoplayRunning = true; // 상태 업데이트
        }
    });
}

function toggleBackgroundColor() {
    let isBlue = true;

    return function() {
      if (isBlue) {
        $('header').css('background-color', 'rgba(58, 138, 192, 0.07)');
      } else {
        $('header').css('background-color', 'rgba(3, 11, 255, 0.071)');
      }
      isBlue = !isBlue;
    };
  }
  // 클로저 사용
  setInterval(toggleBackgroundColor(), 3000);

  function fullPagesLeft() {
    $('.left-section #fullpage').fullpage({
      scrollingSpeed: 1000,
      menu: '.menu-left', // 앵커 링크를 위한 메뉴 ID
      anchors: ['firstPage', 'secondPage', '3rdPage'], // 각 섹션의 앵커 이름
    })
  }

  function leftClick() {
    $('.left-circle').click(function(){
      $('.left-section').addClass('active').children().css('opacity', '1');
      $('body').addClass('scroll-none');
      setTimeout(function() {
        $('.cancel-btn').addClass('active');
      }, 1000);
      fullPagesLeft();
    })
  }

  function fullPagesRight() {
    $('.right-section #fullpage').fullpage({
      scrollingSpeed: 1000,
      menu: '.menu-right', // 앵커 링크를 위한 메뉴 ID
      anchors: ['firstPages', 'secondPages', '3rdPages'], // 각 섹션의 앵커 이름
    })
  }
  function rightClick() {
    $('.right-circle').click(function(){
      $('.right-section').addClass('active').children().css('opacity', '1');
      $('body').addClass('scroll-none');
      setTimeout(function() {
        $('.cancel-btn').addClass('active');
      }, 1000);
      fullPagesRight();
    })
  }

  function cancelClick() {
    $('.cancel-btn').click(function(){
      $('.left-section,.right-section').removeClass('active').children().css('opacity', '0');
      $('.cancel-btn').removeClass('active');
      $('body').removeClass('scroll-none');
      // fullpage에서 추가된 클래스와 스타일 제거
      $('html, body').removeClass('fp-enabled fp-viewing fp-responsive fp-viewing-0').removeAttr('style');
      $.fn.fullpage.destroy('all');
    });
  }
  