/* *******************************************************
* 파일명 : common.js
* 작성자 : 이윤
* 작성일 : 25-10-24
* 설  명 : header/footer js 입력
**********************************************************/
$(document).ready(function(){

    let mobile_size = 1024 // 모바일 메뉴 시작 사이즈
    let window_w // 브라우저 넓이
    let device_status // 현재 pc인지 mobile 인지 구분하는 값

    function device_chk(){
        window_w = $(window).width()
        if(window_w > mobile_size){
            device_status = 'pc'
        }else{
            device_status = 'mobile'
        }
        console.log(device_status)
    }

    device_chk() //문서가 로딩되었을때 한번 실행
    $(window).resize(function(){
        device_chk() //브라우저가 리사이즈 할때마다 1번씩 실행
    })

    $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseenter focusin', function(){
        if(device_status == 'pc'){
            $('header').addClass('menu_pc')
        }
    })
    $('header .gnb .gnb_bg').on('mouseenter', function(){
        $('header').removeClass('menu_pc')
    })
    $('header .util .lang').on('focusin', function(){
        $('header').removeClass('menu_pc')
    })
})