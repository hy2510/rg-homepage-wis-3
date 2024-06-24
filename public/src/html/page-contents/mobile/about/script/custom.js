/* 전체 상단 고정탭 */
window.addEventListener("scroll", (event) => {
    let scrollY = this.scrollY;
    if(scrollY > 7320 && scrollY < 17350 ) {
        document.getElementById("scroller").className = "service_tab active"
    }     
    else {
        document.getElementById("scroller").className = "service_tab"
    };
});
window.addEventListener("scroll", (event) => {
    let scrollY = this.scrollY;
    if(scrollY > 7320 && scrollY < 9409 ) {
        document.getElementById("tab01").className = "tab01 active"
    } 
    else {
        document.getElementById("tab01").className = "tab01"
    };
});


window.addEventListener("scroll", (event) => {
    let scrollY = this.scrollY;
    if(scrollY > 9410 && scrollY < 14900 ) {
        document.getElementById("tab02").className = "tab02 active"
    } 
    else {
        document.getElementById("tab02").className = "tab02"
    };
});


window.addEventListener("scroll", (event) => {
    let scrollY = this.scrollY;
    if(scrollY > 14901 && scrollY < 15850) {
        document.getElementById("tab03").className = "tab03 active"
    } 
    else {
        document.getElementById("tab03").className = "tab03"
    };
});


window.addEventListener("scroll", (event) => {
    let scrollY = this.scrollY;
    if(scrollY > 15851 && scrollY < 17521 ) {
        document.getElementById("tab04").className = "tab04 active"
    } 
    else {
        document.getElementById("tab04").className = "tab04"
    };
});

/* window.addEventListener("scroll", (event) => {
    let scrollY = this.scrollY;
    if(scrollY > 7320 && scrollY < 17350 ) {
        document.getElementById("tab01").addClass('active')
    } else {
        document.getElementById("scroller").className = "service_tab"
    };
}); */

/* 서비스 탭 on/off */
$('.site-main .service_tab .bar .e_ContentWrap > a').click(function(){
    $(this).addClass('active')
    $(this).siblings("a").removeClass('active')
})
    
/* 제대로된 ebbok 보기가 필요할까요? */
const ani11 = gsap.timeline();
ani11.to(".site-main .step02 #smooth-content01 .dec01", {opacity:0,  y:-150, ease: "power4.inOut"})
     .to(".site-main .step02 #smooth-content01 .dec02", {opacity:0,  y:-100,  ease: "power4.inOut"})
     .to(".site-main .step02 #smooth-content01 .dec03", {opacity:0,  y:-100,  ease: "power4.inOut"})
     .to(".site-main .step02 #smooth-content01 .dec04", {opacity:0,  y:-100,  ease: "power4.inOut"})


    ScrollTrigger.create({
    animation: ani11,
    trigger:".site-main .step02 #smooth-content01 .heading",
    start:"top top",
    end: "+=2100",
    scrub:true,
    pin:true,
    anticipatePin:1,
    //markers:true
})

const ani14 = gsap.timeline();
ani14.to(".site-main .step03 #smooth-content01 .dec01", {opacity:0,  y:-150, ease: "power4.inOut"})
     .to(".site-main .step03 #smooth-content01 .dec02", {opacity:0,  y:-150, ease: "power4.inOut"})
     .to(".site-main .step03 #smooth-content01 .dec03", {opacity:0,  y:-150, ease: "power4.inOut"})
     .to(".site-main .step03 #smooth-content01 .dec04", {opacity:0,  y:-150, ease: "power4.inOut"})


    ScrollTrigger.create({
    animation: ani14,
    trigger:".site-main .step03 #smooth-content01 .heading",
    start:"top top",
    end: "+=2100",
    scrub:true,
    pin:true,
    anticipatePin:1,
    //markers:true
})


/* 제대로 된 컨텐츠 탭 */
  $('.site-main .step04 section .btn li').click(function(){
    $(this).addClass('active')
    $(this).siblings().removeClass('active')
    
    var tab = $(this).attr('date-alt')
    $('.tabs div').removeClass('active')
    $('#' + tab).addClass('active')
  })  

/* 제대로 된 컨텐츠 탭2 */
$('.site-main .step04 section .tabs > div .fellowship_prev .s_tab_menu .tab_menu li').click(function(){
    $(this).addClass('active')
    $(this).siblings().removeClass('active')

    var tab = $(this).attr('date-alt')
    $('.s_tabs div').removeClass('ov')
    $('#' + tab).addClass('ov')
})




/* 5단계 독후 프로그램  탭*/
$('.site-main .step05 .part1 #section1 .e_ContentWrap .tab_inner .tab_btn li').click(function(){
    $(this).addClass('active')
    $(this).siblings().removeClass('active')

    var tab = $(this).attr('date-alt')
    $('.inner_tabs div').removeClass('active')
    $('#' + tab).addClass('active')
})


/* 5단계 독후 프로그램 */
const ani1 = gsap.timeline();
ani1.from(".step05 .part1 #section1 .e_ContentWrap .tab_inner .inner_tabs > div .content .i2 ", {y: 1000 })
    .from(".step05 .part1 #section1 .e_ContentWrap .tab_inner .inner_tabs > div .content .i3", {y: 1000 })
    .from(".step05 .part1 #section1 .e_ContentWrap .tab_inner .inner_tabs > div .content .i4", {y: 1000 })
    .from(".step05 .part1 #section1 .e_ContentWrap .tab_inner .inner_tabs > div .content .i5", {y: 1000 })

    ScrollTrigger.create({
    animation: ani1,
    trigger:"#section1",
    start:"+=-100",
    end: "+=2000",
    scrub:true,
    pin:true,
    anticipatePin:1,
    //markers:true
})

/* 제대로 된 케어 */
$('.autoplay').slick({
    centerMode: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    adaptiveHeight:true,
    //dots: true,
});


/* 제대로 된 학습효과 */

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
//markers:true,
start:"+=-1200",
end:"+=580",
trigger:".card01",
toggleClass:{targets:'.card01',className:'active'},
})

ScrollTrigger.create({
//markers:true,
start:"+=-1200",
end:"+=580",
trigger:".card01",
toggleClass:{targets:'.e_ContentWrap',className:'bg01'},
})

ScrollTrigger.create({
//markers:true,
start:"+=-800",
end:"+=340",
trigger:".card02",
toggleClass:{targets:'.card02',className:'active'}
})

ScrollTrigger.create({
//markers:true,
start:"+=-800",
end:"+=340",
trigger:".card02",
toggleClass:{targets:'.e_ContentWrap',className:'bg02'},
})

ScrollTrigger.create({
//markers:true,
start:"+=-800",
end:"+=250",
trigger:".card03",
toggleClass:{targets:'.card03',className:'active'},
})

ScrollTrigger.create({
//markers:true,
start:"+=-800",
end:"+=250",
trigger:".card03",
toggleClass:{targets:'.e_ContentWrap',className:'bg03'},
})

ScrollTrigger.create({
//markers:true,
start:"+=-650",
end:"+=220",
trigger:".card04",
toggleClass:{targets:'.card04',className:'active'},
})


ScrollTrigger.create({
//markers:true,
start:"+=-650",
end:"+=220",
trigger:".card04",
toggleClass:{targets:'.e_ContentWrap',className:'bg04'},
})


ScrollTrigger.create({
//markers:true,
start:"+=-820",
end:"+=250",
trigger:".card05",
toggleClass:{targets:'.card05',className:'active'},
})


ScrollTrigger.create({
//markers:true,
start:"+=-820",
end:"+=250",
trigger:".card05",
toggleClass:{targets:'.e_ContentWrap',className:'bg05'},
})

ScrollTrigger.create({
//markers:true,
start:"+=-720",
end:"+=800",
trigger:".card06",
toggleClass:{targets:'.card06',className:'active'},
})


ScrollTrigger.create({
//markers:true,
start:"+=-720",
end:"+=800",
trigger:".card06",
toggleClass:{targets:'.e_ContentWrap',className:'bg06'},
})



//푸터영역
gsap.registerPlugin(ScrollTrigger);

  let footer = document.querySelector("footer"),
      getOverlap = () => Math.min(window.innerHeight, footer.offsetHeight), // 우리는 화면 높이보다 더 겹치는 것을 원하지 않습니다.
      adjustFooterOverlap = () => footer.style.marginTop = -getOverlap() + "px"; // a적절한 양이 겹치도록 바닥글의 여백 상단을 조정합니다.

  adjustFooterOverlap();

  // 반응형으로 만들려면 ScrollTrigger가 되돌릴 때 바닥글의 여백 상단을 다시 계산하세요.
  ScrollTrigger.addEventListener("revert", adjustFooterOverlap);

  // magic
  ScrollTrigger.create({
    trigger: footer,
    start: () => "top " + (window.innerHeight - getOverlap()),
    end: () => "+=" + getOverlap(),
    pin: true,
  });
  

/*   $('.review_list').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3
  }); */

  $('.review_list').slick({
    centerMode: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    adaptiveHeight:true,
    dots: true,
});