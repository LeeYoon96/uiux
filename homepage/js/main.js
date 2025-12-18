$(document).ready(function(){

    new fullpage('#fullpage', {
        autoScrolling: true,
        fitToSection: false,
        navigation: false,
        navigationPosition: 'right',
        // 섹션의 data-anchor 속성 값과 일치해야 합니다.
        anchors: ['home', 'about', 'project1', 'project2', 'contact'], 
        menu: '.gnb',
        scrollingSpeed: 800,
        fixedElements: "header",

        onLeave: function(origin, destination, direction){
            // 모든 내비게이션 링크에서 'active-link' 클래스 제거
            $('.gnb a').removeClass('active-link');

            // 새로 활성화된 섹션에 해당하는 내비게이션 링크에 'active-link' 클래스 추가
            // destination.anchor는 현재 활성화된 섹션의 data-anchor 값입니다.
            // data-menuanchor 속성이 현재 섹션의 anchor와 일치하는 a 태그를 선택합니다.
            $(`.gnb a[data-menuanchor="${destination.anchor}"]`).addClass('active-link');
        }
    });

    // 초기 로드 시 'home' 섹션에 해당하는 링크 활성화
    // fullpage 초기화 후 첫 섹션('home')에 대해 onLeave가 실행되지 않을 수 있으므로, 
    // initialisation 옵션 또는 여기서 직접 설정합니다.
    $(`.gnb a[data-menuanchor="home"]`).addClass('active-link');

});//맨끝