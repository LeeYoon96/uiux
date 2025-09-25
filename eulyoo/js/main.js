
$(document).ready(function(){
    // console.log('연결되었구나')

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

/* 브라우저가 스크롤 되면 header에 fixed 클래스 추가 
    1. 조금이라도 스크롤 되면 header에 fixed 클래스 추가
    2. 다시 맨위로 올라가면 header에 fixed 클래스를 삭제
    3. 새로고침했을때 만약 브라우저가 스크롤이 되어있다면 header에 fixed 클래스 추가
    --> 브라우저를 스크롤 할때도 체클해야하고
        처음에 로딩했을때도 체크해야함
    ==> 동일한 체크를 두번 실행 ==> 함수로 처리
    */

    let scrolling
    function scroll_chk(){ //함수를 정의한다
        scrolling = $(window).scrollTop()
        console.log(scrolling)
        if(scrolling > 0){
            $('header').addClass('fixed')
        }else{
            $('header').removeClass('fixed')
        }
    }
    //문서가 로딩됬을때 단 한번 함수 실행
    scroll_chk()
    //브라우저가 스크롤 될때마다 한번씩 함수 실행
    $(window).scroll(function(){
        scroll_chk()
    })

    //swiper
            const book_swiper = new Swiper('.book .swiper', { /* 팝업을 감싼는 요소의 class명 */
            slidesPerView: 2, /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
            spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
            breakpoints: {
                768: {    /* 768px 이상일때 적용 */
                    slidesPerView: 'auto',    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                    spaceBetween: 24,
                },
            },
            //centeredSlides: true, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
            // loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */

            navigation: {
                nextEl: '.book .ctrl_btn .btn_next',
                prevEl: '.book .ctrl_btn .btn_prev',
            },
        });


})//맨끝