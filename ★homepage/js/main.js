$(document).ready(function(){

    new fullpage('#fullpage', {
        autoScrolling: true,
        navigation: true,
        navigationPosition: 'right',
        anchors: ['home', 'about', 'project1', 'project2', 'contact'],
        menu: '.gnb',
        scrollingSpeed: 800,
        fixedElements: "header"
    });

});//맨끝