console.log('연결되었습니다.')

$(document).ready(function(){
    $('.box').on('mouseenter', function(){
        console.log('오버됨.')
        $('.box').addClass('on')
    })
    $('.box').on('mouseleave', function(){
        console.log('오버아웃됨')
        $('.box').removeClass('on')
    })

}) // $(document).ready //