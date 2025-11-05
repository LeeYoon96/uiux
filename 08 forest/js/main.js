/* *******************************************************
* 파일명 : main.js
* 작성자 : 이윤
* 작성일 : 25-10-23
* 설  명 : 메인페이지에서만 적용되는 js를 저장 (header/footer 제외)
**********************************************************/


$(document).ready(function(){
    const myFullpage = new fullpage('#fullpage', {  /* html에서 페이지 전체를 감싸는 요소 */

		navigation: true, /* 오른쪽에 각 페이지의 paging */
		navigationPosition: 'left', /* 위치 */
		navigationTooltips: ['Main', '나무심기', '숲활동', '활동이야기','footer'], /* 툴팁 */
		showActiveTooltip: true, /* 현재 활성화된 페이지의 툴팁에 특정 클래스 주기 */
		
		lockAnchors: false,
		anchors: ['Main', 'Tree', 'Activity', 'News', 'Siteinfo'], /* href="#link1" 이렇게 코딩하면 해당 링크명으로 이동 */

		autoScrolling:true, /* 한페이지씩 스크롤 */
		scrollHorizontally: true,

		verticalCentered: true, /* 컨텐츠 요소 위아래 가운데 */
		
		scrollOverflow: false, /* 컨텐츠가 넘쳐도 스크롤 금지 */

		afterLoad: function(origin, destination, direction, trigger){
			if((destination.index == 1) || (destination.index == 3) || (destination.index == 4)){ /* index가 1면 슬라이드는 두번째 슬라이드입니다. index 수는 0/1/2/3 */
				// console.log('2번째 슬라이드가 로딩 되었을때');
                $('header').addClass('dark')
			}else{
                $('header').removeClass('dark')
            }
		},

		responsiveWidth: 768, /* fullpage를 적용시키지 않을 모바일 사이즈 */
        responsiveWidth: 500
	});
















}) //맨끝