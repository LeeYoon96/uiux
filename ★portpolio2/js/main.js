/* *******************************************************
* 파일명 : main.js
* 작성자 : 이윤
* 작성일 : 25-11-25
* 설  명 : 메인페이지에서만 적용되는 js를 저장 (header/footer 제외)
**********************************************************/
$(document).ready(function(){
    // console.log('연결됨')
    const visual_swiper = new Swiper('.visual .swiper', { /* 팝업을 감싼는 요소의 class명 */

        autoplay: {  /* 팝업 자동 실행 */
            delay: 2500,
            disableOnInteraction: true,
        },

        //effect: "fade", /* fade 효과 */

        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */

        pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
            el: '.visual .paging', /* 해당 요소의 class명 */
            type: 'fraction',  /* type fraction을 주면 paging이 숫자로 표시됨 */
            renderBullet: function (index, className) {   /* paging에 특정 코드 넣기 */
                return '<span class="' + className + '">' + (index + 1) + "</span>";
            },
        },
        
        navigation: {  /* 이전, 다음 버튼 */
            nextEl: '.visual .btn_next',  /* 다음 버튼의 클래스명 */
            prevEl: '.visual .btn_prev',  
        },
    });
    // 기본 상태: autoplay 켜짐
    visual_swiper.autoplay.start();

    // ⭐ STOP 버튼 클릭
    $('.visual .btn_stop').on('click', function(){
        visual_swiper.autoplay.stop();   // 슬라이드 멈춤
        $('.visual .btn_stop').hide();   // stop 숨김
        $('.visual .btn_play').show();   // play 표시
    });

    // ⭐ PLAY 버튼 클릭
    $('.visual .btn_play').on('click', function(){
        visual_swiper.autoplay.start();  // 슬라이드 재생
        $('.visual .btn_play').hide();   // play 숨김
        $('.visual .btn_stop').show();   // stop 표시
    });

    $(function(){

        const depth1 = $('header .gnb .gnb_wrap ul.depth1 > li');
        const bg = $('header .gnb_bg');
    
        depth1.on('mouseenter', function(){
            depth1.removeClass('on');      // 모두 초기화
            $(this).addClass('on');        // 현재 li 활성화
            bg.addClass('on');             // 배경 열기
        });
    
        $('header').on('mouseleave', function(){
            depth1.removeClass('on');     // depth1 전체 비활성화
            bg.removeClass('on');         // 배경 닫기
        });
    
    });



});//맨끝