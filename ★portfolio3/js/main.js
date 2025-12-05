/* *******************************************************
* 파일명 : main.js
* 작성자 : 이윤
* 작성일 : 25-12-04
* 설  명 : 메인페이지에서만 적용되는 js를 저장 (header/footer 제외)
**********************************************************/
$(document).ready(function(){
    // console.log('연결됨')
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
});//맨끝