/* *******************************************************
* 파일명 : contents.js
* 작성자 : 이윤
* 작성일 : 25-10-29
* 설  명 : 각각의 페이지에만
**********************************************************/
/* 
    인터랙티브의 시작은 영역이 브라우저 상단에 닿았을때
    영역의 상단값 보다 스크롤된 값이 크면 - 인터랙티브 시작
    ceo_area_start < ceo_scroll 
    종료는 영역의 하단이 브라우저 하단 위로 올라올때
    ceo_area_end - ceo_win_h < ceo_scroll

    영역안에 들어가기전(시작전)
    영역에 들어갔을때(진행중)
    영역에서 벗어났을때(종료)
*/
//console.log('연결')
$(document).ready(function(){
    let ceo_length = $('.ctn_ceo').length
    function ceo_ani(){
        let ceo_win_h = $(window).height() //브라우저의 높이
        let ceo_scroll = $(window).scrollTop() // 현재 스크롤 된값
        let ceo_area_name = $('.ctn_ceo .ceo_head') // 선택자
        let ceo_obj_wrap = $('.ctn_ceo .ceo_head .ceo_photo') // 애니메이션 대상
        let ceo_area_start = ceo_area_name.offset().top // 시작위치 (맨위부터 계산한)
        let ceo_area_end = ceo_area_start + ceo_area_name.height() - ceo_win_h// 끝위치
        let ceo_total = ceo_area_end - ceo_area_start // 전체 스크롤 값
        let ceo_diff // 진행중 이후에 스크롤 된 값
        let ceo_per // 스크롤 된 값이 몇퍼인지
        
        //console.log(ceo_total)

        /* 
            진행중일때 몇% 스크롤 했는지 계산 해야함
            (1000px 동안 인터랙티브를 할건데 100px 스크롤 함 10%)
            현재스크롤값 x 100 / 전체값
         */

        // console.log('시작', ceo_area_start, '종료', ceo_area_end, '스크롤', ceo_scroll)
        if(ceo_scroll > ceo_area_end){
            //console.log('종료')
            ceo_obj_wrap.attr('data-status', 'end')
            ceo_per = 100
        }else if(ceo_scroll < ceo_area_start){
            //console.log('시작전')
            ceo_obj_wrap.attr('data-status', 'start')
            ceo_per = 0
        }else {
            //console.log('진행중')
            ceo_obj_wrap.attr('data-status', 'ing')
            ceo_diff = ceo_scroll - ceo_area_start
            ceo_per = ceo_diff * 100 / ceo_total
            //console.log(ceo_diff, ceo_total, ceo_per)
        }
        console.log(ceo_per)
    }
    if(ceo_length > 0){
        ceo_ani() // 브라우저가 로딩되었을때 단 한번
    }
    $(window).scroll(function(){
        if(ceo_length > 0){
            ceo_ani()
        }
    })


}) //맨끝