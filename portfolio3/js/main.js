/* *******************************************************
* 파일명 : main.js
* 작성자 : 이윤
* 작성일 : 25-12-04
* 설  명 : 메인페이지에서만 적용되는 js를 저장 (header/footer 제외)
**********************************************************/
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

    const visual_swiper = new Swiper('.visual .swiper', { /* 팝업을 감싼는 요소의 class명 */

        autoplay: { /* 팝업 자동 실행 */
            delay: 2500,
            disableOnInteraction: true,
        },

        //effect: "fade", /* fade 효과 */

        loop: true, /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */

        pagination: { /* 몇개의 팝업이 있는지 보여주는 동그라미 */
            el: '.visual .paging', /* 해당 요소의 class명 */
            clickable: true,  /* 클릭하면 해당 팝업으로 이동할 것인지 값 */
        },
    });
    // 기본 상태: autoplay 켜짐
    visual_swiper.autoplay.start();

    //  STOP 버튼 클릭
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

    // 왼쪽 네비 클릭 → 해당 section 이동
    document.querySelectorAll('.fp-nav button').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;
            const sec = document.querySelector(`.${target}`);
            if (!sec) return;

            window.scrollTo({
                top: sec.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // 스크롤 시 도트 활성화 변경
    const sections = document.querySelectorAll('.container > section');
    const navDots = document.querySelectorAll('.fp-nav li');

    window.addEventListener('scroll', () => {
        let scrollPos = window.scrollY;

        sections.forEach((sec, i) => {
            if (scrollPos >= sec.offsetTop - 200) {

                navDots.forEach(dot => dot.classList.remove('active'));

                // 🔥 존재할 때만 class 추가
                if (navDots[i]) {
                    navDots[i].classList.add('active');
                }
            }
        });
    });

    // TOP 버튼
    const btnTop = document.querySelector('.btn_top');
    if (btnTop) {
        btnTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /************************ 시작 : pc버전 메뉴 오버 **************************** */

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

    /************************ 끝 : pc버전 메뉴 오버 **************************** */
    /************************ 시작 : mo버전 메뉴  **************************** */
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

    /************************ 끝 : mo버전 메뉴  **************************** */
    /*********************************** 시작 : mobile 버전 메뉴 열기 ********************/

    $('header .gnb .gnb_open').on('click', function(){
        $('header').addClass('menu_mo')

        $('.right_menu').hide() //right_menu 숨김.
    })

    $('header .gnb .gnb_wrap .gnb_close').on('click', function(){
        $('header').removeClass('menu_mo')

        $('.right_menu').show() //right_menu 보임.
    })
/*********************************** 끝 : mobile 버전 메뉴 닫기 ********************** */

/*********************************** 시작 : 스크롤 시 header에 fixed 추가 ********************/

let scrolling //스크롤된 값 저장

function scroll_chk(){
    scrolling = $(window).scrollTop() //스크롤값 입력
    if(scrolling > 0){
        $('header').addClass('fixed')
    }else{
        $('header').removeClass('fixed')
    }
}

scroll_chk() // 문서가 로딩되고 단 1번 실행
$(window).scroll(function(){
    scroll_chk() // 스크롤 될때마다 1번씩 실행
})


/*********************************** 끝 : 스크롤 시 header에 fixed 삭제 ***************************** */



/*********************************** 시작 : 학과소개 swiper ********************/
const department1_swiper = new Swiper('.department .item1 .swiper', {
    slidesPerView: 2,
    spaceBetween: 16,

    breakpoints: {
        1025: {
            slidesPerView: 3,
            spaceBetween: 24,
        },
    },

    loop: false,
    watchOverflow: true,
});

const department2_swiper = new Swiper('.department .item2 .swiper', {
    slidesPerView: 1,
    spaceBetween: 16,

    breakpoints: {
        1025: {
            slidesPerView: 3,
            spaceBetween: 24,
        },
    },

    loop: false,
    watchOverflow: true,
});

/* 🔥 슬라이드 바 연결 */
initSlideBar(department1_swiper, '.department .item1 .slide_bar');
initSlideBar(department2_swiper, '.department .item2 .slide_bar');

function initSlideBar(swiper, barSelector) {
    const totalSlides = swiper.slides.length;
    const visibleSlides = swiper.params.slidesPerView;
    const maxIndex = totalSlides - visibleSlides;

    const $barWrap = document.querySelector(barSelector);
    $barWrap.innerHTML = '';

    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.width = `${100 / (maxIndex + 1)}%`;
    $barWrap.appendChild(bar);

    swiper.on('slideChange', function () {
        const index = Math.min(swiper.activeIndex, maxIndex);
        bar.style.transform = `translateX(${index * 100}%)`;
    });
}

$('.tab_list li').on('click', function () {
    const target = $(this).data('tab');

    // 탭 전환
    $('.tab_list li').removeClass('active');
    $(this).addClass('active');

    $('.tab_item').removeClass('active');
    $('.tab_item.' + target).addClass('active');

    // 🔥 Swiper 업데이트 + slide_bar 재생성
    if (target === 'item1') {
        department1_swiper.update();
        initSlideBar(department1_swiper, '.item1 .slide_bar');
    }

    if (target === 'item2') {
        department2_swiper.update();
        initSlideBar(department2_swiper, '.item2 .slide_bar');
    }
});
/*********************************** 끝 : 학과소개 swiper ********************/

/*********************************** 시작 : 학과소개 tab ********************/
let tab_name
$('.department .tab_list ul li').on('click', function(){
    // 클릭한 li에만 active 클래스 주기
    $('.department .tab_list ul li').removeClass('active')
    $(this).addClass('active')

    // 클릭한 li의 button에다가 선택됨이라고 글자쓰기
    $('.department .tab_list ul li button span').text('')
    $(this).find('button span').text('선택됨') //태그는 점 안찍음
    
    // 클릭한 li와 관련된 tab_content tab_item 에 active 클래스 주기
    tab_name = $(this).attr('data-tab')
    $('.department .tab_cont .tab_item').removeClass('active')

    //find로 찾을때는 클래스명이면 .추가, 내가 가져온 이름은 .이 없음
    $('.department .tab_cont').find('.' + tab_name).addClass('active')

    //선택됨 tab_item의 title에만 '선택됨'이라고 써주기
    $('.department .tab_cont .tab_item').attr('title', '')
    $('.department .tab_cont').find('.' + tab_name).attr('title', '선택됨')
})
/*********************************** 시작 : 학과소개 tab ********************/
});//맨끝