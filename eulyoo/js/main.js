
$(document).ready(function(){
    console.log('연결되었구나')

    const visual_swiper = new Swiper('.visual .swiper', { /* 팝업을 감싼는 요소의 class명 */

        autoplay: {  /* 팝업 자동 실행 */
            delay: 10000,
            disableOnInteraction: true,
        },

        //effect: "fade", /* fade 효과 */

        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */

        pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
            el: '.visual .paging', /* 해당 요소의 class명 */
            clickable: true,  /* 클릭하면 해당 팝업으로 이동할 것인지 값 */
        },
        

        navigation: {  /* 이전, 다음 버튼 */
            nextEl: '.visual .btn_next',  /* 다음 버튼의 클래스명 */
            prevEl: '.visual .btn_prev',  
        },

});


$('.visual .ctrl_btn .btn_stop').on('click', function(){
    visual_swiper.autoplay.stop();  
    $(this).hide()
    $('.visual .ctrl_btn .btn_play').show()
    // console.log('정지정지')
})
$('.visual .ctrl_btn .btn_play').on('click', function(){
    visual_swiper.autoplay.start();
    $(this).hide()
    $('.visual .ctrl_btn .btn_stop').show()
    // console.log('재생재생')
})
})//맨끝