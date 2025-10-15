$(document).ready(function(){

    const visual_swiper = new Swiper('.visual .swiper', {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },

        on: {
            init: function() {
                const totalSlides = this.slides.length - this.loopedSlides * 2;
                $('.visual .paging .total').text(totalSlides);
                $('.visual .paging .current').text(this.realIndex + 1);

                // 첫 시작시 bar width 설정
                updateBarWidth(this.realIndex, totalSlides);
            },
            slideChange: function() {
                const totalSlides = this.slides.length - this.loopedSlides * 2;
                const current = this.realIndex + 1;
                $('.visual .paging .current').text(current);

                // 슬라이드 바 업데이트
                updateBarWidth(this.realIndex, totalSlides);
            }
        }
    });

    $('.visual .ctrl_btn .stop').on('click', function(){
        visual_swiper.autoplay.stop();  
        $(this).hide()
        $('.visual .ctrl_btn .play').show()
        // console.log('정지정지')
    })
    $('.visual .ctrl_btn .play').on('click', function(){
        visual_swiper.autoplay.start();
        $(this).hide()
        $('.visual .ctrl_btn .stop').show()
        // console.log('재생재생')
    })

    // 🔧 bar width 조절 함수
    function updateBarWidth(index, total) {
        const percent = ((index + 1) / total) * 100;
        $('.visual .paging .bar::before'); // 직접 제어 불가하므로 CSS 변수 활용
        $('.visual .paging .bar').css('--bar-width', percent + '%');
    }

});