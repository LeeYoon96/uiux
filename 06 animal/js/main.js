$(document).ready(function(){

/**************** 시작 : 지금 pc버전인지 모바일인지 체크 (메뉴상태) ******************** */

let mobile_size = 1024
let window_w
let device_status // pc, mobile

function device_chk(){ //함수를 정의한다 (선언)
    window_w = $(window).width()
    if(window_w > mobile_size){ //브라우저 넓이가 1024보다 클때
        device_status = 'pc'
    }else{
        device_status = 'mobile'
    }
    console.log(device_status)
}

device_chk() //html의 로딩이 완료된 이후 단 1번 실행
$(window).resize(function(){ //브라우저가 리사이즈 될때마다 실행
    device_chk()
})
/**************** 끝 : 지금 pc버전인지 모바일인지 체크 (메뉴상태) ******************** */


    const visual_swiper = new Swiper('.visual .swiper', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },

        on: {
            init: function() {
                const totalSlides = this.slides.length - this.loopedSlides * 2;
                $('.visual .paging .total').text(totalSlides);
                $('.visual .paging .current').text(this.realIndex + 1);

                // 첫 시작시 bar width 설정
                updateBarWidth(this.realIndex, totalSlides);
            },
            slideChange: function() {
                const totalSlides = this.slides.length - this.loopedSlides * 2;
                const current = this.realIndex + 1;
                $('.visual .paging .current').text(current);

                // 슬라이드 바 업데이트
                updateBarWidth(this.realIndex, totalSlides);
            }
        }
    });

    $('.visual .ctrl_btn .stop').on('click', function(){
        visual_swiper.autoplay.stop();  
        $(this).hide()
        $('.visual .ctrl_btn .play').show()
        // console.log('정지정지')
    })
    $('.visual .ctrl_btn .play').on('click', function(){
        visual_swiper.autoplay.start();
        $(this).hide()
        $('.visual .ctrl_btn .stop').show()
        // console.log('재생재생')
    })

    // 🔧 bar width 조절 함수
    function updateBarWidth(index, total) {
        const percent = ((index + 1) / total) * 100;
        $('.visual .paging .bar::before'); // 직접 제어 불가하므로 CSS 변수 활용
        $('.visual .paging .bar').css('--bar-width', percent + '%');
    }

/*********************************** 시작 : pc버전 메뉴 오버 ********************************** 
 * 메뉴에 마우스를 오버했을때 (header .gnb)
 * header에 menu_pc 클래스를 추가
 * 마우스를 오버한 메뉴의 1차 메뉴 li에 over 클래스 추가 (header .gnb .gnb_wrap ul.depth1 > li)
 * -> 오버한 li에만 over 클래스 줌
 * --> 모든 li에서 over를 빼고 오버한 li에만 over클래스 줌
 * pc버전에서만
 * 메뉴를 오버해서 바뀐 색상의 영역 내부에서는 오버가 유지되고 그 밖에 나갈때 아웃
*/

$('header .gnb .gnb_wrap ul.depth1 > li').on('mouseenter focusin', function(){
    if(device_status == 'pc'){//pc일때만 동작
        // console.log('오버됨')
        $('header').addClass('menu_pc')
        $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
        $(this).addClass('over')
    }
})
$('header .gnb .gnb_wrap ul.depth1 > li').on('mouseleave', function(){
    $(this).removeClass('over')
})
$('header').on('mouseleave focusout', function(){
    $(this).removeClass('menu_pc')
})

$('header .util .search .sch_open').on('focusin', function(){
    $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
})



/*********************************** 끝 : pc버전 메뉴 오버 ********************************** */
});