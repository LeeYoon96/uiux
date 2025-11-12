/* *******************************************************
* 파일명 : main.js
* 작성자 : 이윤
* 작성일 : 25-11-12
* 설  명 : 메인페이지에서만 적용되는 js를 저장 (header/footer 제외)
**********************************************************/

$(document).ready(function () {

    let scrolling 
    let win_h 
    let photo_start
    let photo_end
    const $photo = $('.visual h2 .photo_wrap .photo');
    const $img = $photo.find('img');
    const $photoWrap = $('.visual h2 .photo_wrap');

    // 목표: photo_end 값이 약 1300이 되는 시점에 이미지가 화면을 가득 채우게 함
    const targetScrollEnd = 1300; // 스크롤 종료 지점 (원하는 값)
    const scaleFactor = 10; // 이미지 크기를 조절하는 비율 (조정 가능)
    const opacityStart = 0.5; // 불투명도가 변하기 시작하는 비율 (photo_start와 targetScrollEnd 사이)
    const opacityEnd = 1; // 불투명도가 완전히 사라지는 비율 (photo_start와 targetScrollEnd 사이)

    function photo_resize(){
        scrolling = $(window).scrollTop()
        win_h = $(window).height()
        
        // 이미지가 커지기 시작하는 지점
        photo_start = $photoWrap.offset().top - win_h * 0.2; 
        
        // 이미지 확대/전환이 끝나는 지점 (고정값 사용)
        photo_end = targetScrollEnd; 
        
        // 진행률 계산
        let progress = 0;
        if (scrolling >= photo_start) {
            progress = Math.min(1, (scrolling - photo_start) / (photo_end - photo_start));
        }

        // 1. 이미지 크기 조절 (Scale)
        // 1 + progress * scaleFactor 만큼 확대
        let scale = 1 + progress * scaleFactor;
        
        // CSS에서 이미지가 이미 transform: translate(-50%, -50%)를 가지고 있으므로, 
        // 여기에 scale()을 추가하여 크기를 키웁니다.
        $img.css({
            'transform': `translate(-50%, -50%) scale(${scale})`
        });

        // 2. 이미지 위치 조절 (Center of Viewport)
        // 이미지가 화면 중앙을 기준으로 커지도록 위치를 조정
        // photo_wrap은 중앙에 있지만, photo_wrap 내의 photo는 현재 작은 상태이므로 
        // 스크롤에 따라 photo의 위치를 중앙으로 이동시킵니다.
        // 현재 photo의 중앙이 뷰포트 중앙에 가까워지도록 photo_wrap의 offset.top 값 보정
        const photoTop = $photoWrap.offset().top;
        const centerOffset = (win_h / 2) - (photoTop + $photoWrap.height() / 2); // 뷰포트 중앙과의 차이

        // 스크롤이 진행됨에 따라 photo를 뷰포트 중앙으로 이동
        let translateY = progress * centerOffset; 
        
        // photo_wrap에 transform을 적용하여 전체 위치를 조정
        // $photoWrap.css({
        //     'transform': `translateY(${translateY}px)`
        // });

        // 3. opacity 조절 (전환 효과)
        let opacity = 1;
        if (progress >= opacityStart) {
            // opacityStart 시점부터 opacityEnd 시점까지 불투명도 감소
            let opacityProgress = (progress - opacityStart) / (opacityEnd - opacityStart);
            opacity = 1 - Math.min(1, opacityProgress);
        }

        // photo_wrap의 opacity를 조절하여 전환 효과
        $photoWrap.css({
            'opacity': opacity
        });
        
        // visual 섹션 전체의 투명도를 조절하여 전환 효과를 만들 수도 있음
        // if (scrolling > photo_end) {
        //     $('.visual').css({'opacity': 0});
        // } else {
        //     $('.visual').css({'opacity': 1});
        // }
        

        // 디버깅 및 목표 값 확인
        console.log(`스크롤: ${scrolling.toFixed(0)}, 시작: ${photo_start.toFixed(0)}, 종료: ${photo_end.toFixed(0)}, 진행률: ${progress.toFixed(2)}, Scale: ${scale.toFixed(2)}, Opacity: ${opacity.toFixed(2)}`);
    }

    // 초기 및 스크롤 시 실행
    photo_resize();
    $(window).scroll(function(){
        photo_resize();
    })
    $(window).resize(function(){
        photo_resize();
    })
});






















// $(document).ready(function () {

// 	let scrolling 
// 	let win_h 
// 	let photo_start
// 	let photo_end


// 	function photo_resize(){
// 		scrolling = $(window).scrollTop()
// 		win_h = $(window).height()
// 		photo_start = $('.visual h2 .photo_wrap').offset().top - win_h*0.2
// 		photo_end = $('.visual h2 .photo_wrap')
// 		console.log(scrolling, photo_start)
// 	}
// 	$(window).scroll(function(){
// 		photo_resize()
// 	})
// 	$(window).resize(function(){
// 		photo_resize()
// 	})

// });