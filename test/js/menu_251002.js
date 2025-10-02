$(document).ready(function(){
    console.log('연결됨')

    /*
        누구한테 header .gnb .gnb_wrap ul.depth1 > li
        뭘했을때 오버했을때
        결론
        header .gnb .gnb_wrap ul.depth1 > li에 over클래스 추가
        제한조건 - li중에서 오버한 한개만 over클래스 들어감
                    메뉴에서 벗어나면 over가 사라짐
    */ 

    $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseenter', function(){
        $(this).addClass('over')
    })
    $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseleave', function(){
        $(this).removeClass('over')
    })

    /*  
        누구한테 header .gnb
        뭘했을때 오버했을때
        결론
        header에 menu_over를 줌
        제한조건
        -- 오버해서 생성된 흰색배경안에서는 오버를 유지
    */

    $('header .gnb').on('mouseenter focusin', function(){
        $('header').addClass('menu_over')
    })
    $('header').on('mouseleave', function(){
        $('header').removeClass('menu_over')
    })
})//맨끝