
$(document).ready(function(){
    //console.log('연결')
    /* 
        .tour .list ul li에 마우스를 올린 li에만 on 클래스를 추가해야됨
        --> 마우스를 오버하면 오버한걸 제외한 모든 li에 있는 on 클래스를 지움
    */
    $('.tour .list ul li').on('mouseenter', function(){
        //console.log('오버됨.')
        $('.tour .list ul li').removeClass('on')
        $(this).addClass('on')
    })

    $('footer .right_area .family_site button.open').on('click', function(){
        console.log('클릭됨')
        $('footer .right_area .family_site').addClass('open')
    })
})