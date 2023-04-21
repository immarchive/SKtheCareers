$(function(){
	
    //풀페이지
    const fullPage = new fullpage('#fullpage', {
        verticalCentered: true,

        afterLoad: function (anchorLink, index) {

            //첫페이지에만 first라는걸 줌
            if (index.index === 0) {
                $('body').addClass('first')
            }else{
                $('body').removeClass('first')
            }
          },


        onLeave: function(origin, destination, direction){
            idx = destination.index;

            $('.fix-pagination .num-box .curr').html('0'+(idx+1));
            $('.fix-pagination .bar').css({height:25*(idx+1)+'%'})

            if(idx !== 0){
                $('.header,.mouse-icon').addClass('on')
            }else{
                $('.header,.mouse-icon').removeClass('on')
            }

            if(idx === 1 || idx === 2){
                $('.fix-pagination').addClass('black');
            }else{
                $('.fix-pagination').removeClass('black');
            }

            if(idx === 3){
                $('.fix-pagination').addClass('hide');
            }else{
                $('.fix-pagination').removeClass('hide');
            }
        },
    });


    //기초세팅 - 스크롤 막기
    fullPage.setAllowScrolling(false);

    function down(){ //내렸을 때 
        fullPage.setAllowScrolling(false);

        $('.sc-visual').addClass('show'); //팝업 등장
        $('.sc-visual .dim').addClass('on');
        $('.sc-visual .text-area').addClass('on');
        setTimeout(() => {
            fullPage.setAllowScrolling(true); //0.5초뒤 스크롤 풀기
        }, 500);
    }

    function up(){ //올렸을 때
        fullPage.setAllowScrolling(false);

        $('.sc-visual').removeClass('show'); //팝업 삭제
        $('.sc-visual .dim').removeClass('on');
        $('.sc-visual .text-area').removeClass('on');
        $('.sc-visual video').get(0).play();
        setTimeout(() => {
            fullPage.setAllowScrolling(false); //0.5초뒤 스크롤 정지
        }, 500);
    }


    $(window).bind('wheel', function(event){
        
        if($('body').hasClass('first') && !$('body').hasClass('hidden')){ //first라는게 있을때 = 첫화면에 도달시에만
            if (event.originalEvent.wheelDelta < 0) {
                console.log(event.originalEvent.wheelDelta+'내릴때'); //0보다 작으면 내릴 때
                down();
            }else{
                console.log(event.originalEvent.wheelDelta+'올릴때'); //0보다 크면 올릴 때
                up();
            }
        }

    });





    // $(window).bind('wheel', function(event){
    
    //     if (idx > 0) {
    //         $('.header').addClass('on')
    //         $('.mouse-icon').addClass('on')
    //     } else {
    //         $('.header').removeClass('on')
    //         $('.mouse-icon').removeClass('on')
            
    //     }
    // });


    


    // 왼쪽 고정 페이지네이션
    $('.fix-pagination .prev').click(function(){
        fullPage.moveSectionUp();
    });
    $('.fix-pagination .next').click(function(){
        fullPage.moveSectionDown();
    });



    // 헤더 마우스 올렸을 때
    $('.header').mouseover(function(){
        $('.header .gnb .logo .fix').addClass('on');
        $('.header .gnb .logo .active').addClass('on');
    });
    // 헤더 마우스 뗐을 때
    $('.header').mouseout(function(){
        $('.header .gnb .logo .fix').removeClass('on');
        $('.header .gnb .logo .active').removeClass('on');
    });
    


    // 멤버 슬라이드
    const memberSlide = new Swiper(".member-slide", {
        slidesPerView: 'auto',
        spaceBetween: 40,
        centeredSlides: true,
        loopedSlides: 3,
        loop: true,
        autoplay: {
            delay: 2200,
            disableOnInteraction : false,
        },
        navigation: {  
            nextEl: '.swiper-btn.next',
            prevEl: '.swiper-btn.prev',
        },
        observer: true,
        observeParents: true,
    });

    $('.member-slide .swiper-slide').hover(function(){
        $('.member-slide').children('.info').addClass('hide');
        memberSlide.autoplay.stop()
    }, function(){
        $('.member-slide').children('.info').removeClass('hide');
        memberSlide.autoplay.start()
    });



    // 인포 내용 토글
    $('.cont-box .title').click(function(){
        if ($(this).hasClass('on')) { 
            $(this).removeClass('on'); 
            $(this).parents('.cont-area').siblings().removeClass('on');
            $('.sub').removeClass('on');

            $(this).parent().siblings('.sub').stop().slideUp()
            $(this).parents('.cont-area').find('.cont-box .title').removeClass('on');
        } else { 
            $(this).addClass('on'); 
            $('.sub').stop().slideUp();
            $(this).parent().siblings('.sub').removeClass('on');
            
            $(this).parents('.cont-area').siblings().children().children('.title').removeClass('on');
            $(this).parents('.cont-area').find('.sub').stop().slideDown()
        }
    })

    // 열려있게
    $('.cont-box.on .title').trigger('click');



    // 헤더 로고 hover
    $('.header').hover(function(){

        Logo = $('.header .logo a')

        if (Logo.hasClass('on')) {
            $(Logo).removeClass('on');
        } else {
            $(Logo).addClass('on');
        }

    })



    // select list 나오게
    $('.popup .btn-select').click(function(){

        if ($(this).siblings().hasClass('on')) {
            $('body').removeClass('hidden');
            fullPage.setAllowScrolling(true);
            $(this).removeClass('on').siblings('.select-list').removeClass('on')
        } else {
            fullPage.setAllowScrolling(false);
            $('body').addClass('hidden');
            $('.popup .btn-select').removeClass('on').siblings('.select-list').removeClass('on')
            $(this).addClass('on').siblings('.select-list').addClass('on');
        }
    })

    

    // select list 선택되게
    $('.popup .select-item').click(function(){
        const text = $(this).html();

        $(this).parents('.select-wrap').find('.btn-select').html(text);
        $('.select-list').removeClass('on');
        $('.btn-select').removeClass('on')
    })


}) //삭제금지