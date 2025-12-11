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
                navDots[i].classList.add('active');
            }
        });
    });

    // TOP 버튼
    document.querySelector('.btn_top').addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

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
});//맨끝