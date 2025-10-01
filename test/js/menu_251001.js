$(document).ready(function(){
    console.log('연결')
    $('header .gnb').on('mouseenter', function(){
        console.log('메뉴에 마우스 오버함')
    })
    $('header .gnb').on('mouseleave', function(){
        console.log('마우스를 올렸다가 내림')
    })
})//맨아래