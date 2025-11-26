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

    //  STOP 버튼 클릭
    $('.visual .btn_stop').on('click', function(){
        visual_swiper.autoplay.stop();   // 슬라이드 멈춤
        $('.visual .btn_stop').hide();   // stop 숨김
        $('.visual .btn_play').show();   // play 표시
    });

    //  PLAY 버튼 클릭
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

    let row = $('.row') //글자를 감싸는 영역의 이름
    let row_obj = $('.row p span') //각 줄안에 나타날 글자
    let row_rate_s = 0.3 //처음에 애니메이션 시작할때 글씨가 하단에서 몇 %정도 올라왔을때 애니메이션 시작할 것인지 (1이 100%임)
    let row_rate_e = 0.6 //마지막에 애니메이션이 끝날때 마지막 글자가 하단에서 몇 %정도 올라왔을때 종료할 것인지
    let row_leng = row_obj.length
    let row_scroll
    let row_top
    let row_start
    let row_end
    let row_w
    let scrolling
    let win_h

    row_ani()
    $(window).scroll(function(){
    //스크롤 할때마다 1번씩
    row_ani()
    })
    $(window).resize(function(){
    //브라우저가 리사이즈 될때마다 1번씩 실행
    row_ani()
    })

    function row_ani(){
    win_h = $(window).height()
    scrolling = $(window).scrollTop()
    row_top = row.offset().top
    row_start = row_top - win_h + (win_h * row_rate_s)
    row_end = row_top + row.height() - win_h + (win_h * row_rate_e)
    row_scroll = (scrolling - row_start) / (row_end - row_start) * 100
    if(row_start > scrolling) {
    //console.log('시작 이전')
    row_obj.width(0)
    }else if(row_end > scrolling){
    //console.log('애니메이션중')
    for(i=0; i<row_leng; i++){
    row_w = (row_scroll - (100/row_leng)*i) * row_leng
    if(row_w > 100){
    row_w = 100
    }
    row_obj.eq(i).width(row_w + '%')
    }
    }else{
    //console.log('종료 이후')
    row_obj.width('100%')
    }
    }//row_ani

    AOS.init({
        offset: 150, // 해당 콘텐츠가 하단에서 몇 px 위로 올라와에 나타나는 효과가 나타날지 셋팅하는 값
        duration: 500, // 애니메이션 효과가 작동되는 시간
        easing: 'ease', // 가속도
        });
});//맨끝