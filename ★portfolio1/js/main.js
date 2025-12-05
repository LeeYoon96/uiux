/* *******************************************************
* 파일명 : main.js
* 작성자 : 이윤
* 작성일 : 25-11-12
* 설  명 : 메인페이지에서만 적용되는 js를 저장 (header/footer 제외)
**********************************************************/
    //visual 섹션 인터렉티브
$(document).ready(function () {

/********************** 시작 : 지금 pc버전인지 모바일인지 체크 (메뉴상태)**************************************** */
let mobile_size = 768
let window_w
let device_status // pc, mobile

function device_chk(){ //함수를 정의한다 (선언)
    window_w = $(window).width()
    if(window_w > mobile_size){ //브라우저 넓이가 768보다 클때
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

/*********************************** 시작 : mobile 버전 메뉴 열기 ********************************** 
 * 열기를 클릭하면 header에 menu_mo 클래스 추가
 *  header .gnb .gnb_open
 * 닫기를 클릭하면 header에 menu_mo 클래스 삭제
 * header .gnb .gnb_wrap .gnb_close
*/

$('header .gnb .gnb_open').on('click', function(){
    $('header').addClass('menu_mo')
})
$('header .gnb .gnb_wrap .gnb_close').on('click', function(){
    $('header').removeClass('menu_mo')
})
/*********************************** 끝 : mobile 버전 메뉴 닫기 ********************************** */


    let ani_start_ratio = 0.8  // 움직일 요소가 브라우저 하단에서 몇%정도 올라왔을때 애니메이션을 시작할지 정하는 비율
    let ani_end_ratio = 0.6  // 종료 요소가 브라우저 하단에서 몇%정도 올라왔을때 애니메이션을 시작할지 정하는 비율
    let obj_wrap = $('.visual .photo_wrap')  // 움직일 요소를 감싸는 요소
    let obj_name = $('.visual .photo_wrap .photo_move')  // 실제 움직일 요소
    let obj_bg = $('.visual .photo_wrap .photo_move .photo_bg')  // 움직일 요소를 덮을 요소 (before/after로 대체 불가)
    let end_obj = $('.intro')   // 애니메이션 종료 요소
    let end_class = 'green'  // 애니메이션 종료 요소에 애니메이션 종료 시 추가될 class명

    let scrolling
    let win_h 
    let win_w
    let ani_start
    let ani_end
    let ani_ratio
    let obj_start_w
    let obj_start_h
    let obj_start_x
    let obj_start_y
    let obj_w
    let obj_h
    let obj_x
    let obj_y

    function scale_img() {
        scrolling = $(window).scrollTop()
        win_h = $(window).height()
        win_w = $(window).width()
        obj_start_w = obj_wrap.width()
        obj_start_h = obj_wrap.height()
        obj_start_x = obj_wrap.offset().left
        obj_start_y = obj_wrap.offset().top

        

        // 스크롤 구간 정의
        ani_start = obj_wrap.offset().top - win_h * (1 - ani_start_ratio)
        ani_end = end_obj.offset().top - win_h * (1 - ani_end_ratio)

        // 스크롤 비율 계산
        if (scrolling < ani_start) ani_ratio = 0
        else if (scrolling > ani_end) ani_ratio = 1
        else ani_ratio = (scrolling - ani_start) / (ani_end - ani_start)

        // 비율 제한
        ani_ratio = Math.max(0, Math.min(1, ani_ratio))

        // 화면 끝 크기 계산
        let end_w = win_w
        let end_h = win_h

        // 화면 중앙으로 이동할 오프셋 계산 (요소 중심 기준)
        let end_x = (win_w - end_w) / 2 - obj_start_x
        let end_y = (win_h - end_h) / 2 - obj_start_y
        
        if(ani_start > scrolling){
            console.log('시작전')
            obj_w = obj_start_w
            obj_h = obj_start_h
            obj_x = 0
            obj_y = 0
            end_obj.removeClass(end_class)
        }else if(ani_end < scrolling){
            console.log('종료')
            obj_w = win_w
            obj_h = win_h
            obj_x = end_x
            obj_y = end_y * ani_ratio + ani_end
            end_obj.addClass(end_class)
        }else{
            console.log('진행중')
            obj_w = obj_start_w + (end_w - obj_start_w) * ani_ratio
            obj_h = obj_start_h + (end_h - obj_start_h) * ani_ratio
            obj_x = end_x * ani_ratio
            obj_y = end_y * ani_ratio + (scrolling - ani_start*(1-ani_ratio))
            end_obj.removeClass(end_class)
        }
        
        obj_name.css({
            transform: `translate(${obj_x}px, ${obj_y}px)`,
            width: obj_w + 'px',
            height: obj_h + 'px'
        })
        obj_bg.css('opacity', ani_ratio)
    }
    scale_img()
    $(window).scroll(function(){
        scale_img()
    })
    $(window).resize(function(){
        scale_img()
    })
    // 마우스 오버시 이미지 팝업
    document.querySelectorAll('.mission .list ul li a').forEach(item => {
        const imgPopup = item.querySelector('.img_open');
    
        item.addEventListener('mouseenter', function() {
            imgPopup.style.display = 'block';
        });
    
        item.addEventListener('mousemove', function(event) {
            const mouseX = event.clientX; // 화면 기준 좌표
            const mouseY = event.clientY;
            imgPopup.style.left = mouseX + 100 + 'px'; // 마우스 오른쪽으로 100px
            imgPopup.style.top = mouseY + -200 + 'px';  // 마우스 위로 -200px
        });
    
        item.addEventListener('mouseleave', function() {
            imgPopup.style.display = 'none';
        });
    });
    //텍스트 창 클릭시  
    // 모든 editable input을 가져오기
    document.querySelectorAll('.contact .list .editable').forEach(input => {

        // 클릭하면 placeholder 제거
        input.addEventListener('focus', function () {
            this.dataset.placeholder = this.placeholder; // 기존 placeholder 저장
            this.placeholder = ''; // placeholder 숨기기
        });

        // 포커스 잃으면, 값이 없으면 다시 placeholder 복귀
        input.addEventListener('blur', function () {
            if (this.value.trim() === '') {
                this.placeholder = this.dataset.placeholder;
            }
        });
    });
});
