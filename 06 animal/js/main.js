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
        $('header .gnb .gnb_wrap ul.depth1 > li > ul.depth2').slideUp()
        $(this).addClass('over')
        $(this).find('.depth2').slideDown()
    }
})
$('header .gnb .gnb_wrap ul.depth1 > li').on('mouseleave', function(){
    $(this).removeClass('over')
    $(this).find('.depth2').slideUp()
})
$('header').on('mouseleave focusout', function(){
    $(this).removeClass('menu_pc')
})

$('header .util .search .sch_open').on('focusin', function(){
    $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
})



/*********************************** 끝 : pc버전 메뉴 오버 ********************************** */
/*********************************** 시작 : mobile 버전 1차메뉴 클릭 ********************************** 
 * 닫혀있는 메뉴를 클릭하면 기존에 열려있던 메뉴는 닫고 나만 열기 (open클래스 추가)
 * 열려있는 메뉴를 클릭하면 나 자신을 닫고 끝남 (open클래스 삭제)
 * 열린 메뉴, 닫힌메뉴를 구분하는 방법 -- open 있으면 열린메뉴, 없으면 닫힌메뉴
 * 1차메뉴 a의 링크를 삭제 (링크 이동을 못하게 만듬)
*/

$('header .gnb .gnb_wrap ul.depth1 > li > a').on('click', function(e){
	if(device_status == 'mobile'){
        e.preventDefault();		
        if($(this).parent().hasClass('open') == true){ //열려있는 메뉴는 다시 클릭했을때
            // colsole.log('열림')
            $(this).parent().removeClass('open') // li open클래스 삭제
            $(this).next().slideUp() //2차메뉴를 슬라이드로 닫기
        }else{ //열려있는 메뉴가 아닌 다른 메뉴를 여는거
            // colsole.log('닫힘')
            $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('open') // 모든 li의 open을 삭제
            $('header .gnb .gnb_wrap ul.depth1 > li > ul.depth2').slideUp() //모든 2차메뉴 닫기
            $(this).parent().addClass('open')
            $(this).next().slideDown() //2차메뉴를 슬라이드로 열기
        }
    }
})




/*********************************** 끝 : mobile 버전 1차메뉴 클릭 ********************************** */
});