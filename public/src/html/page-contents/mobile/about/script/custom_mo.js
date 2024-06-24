window.addEventListener("scroll", (event) => {
    let scrollY = this.scrollY;
    if(scrollY > 6150 && scrollY < 14050 ) {
        document.getElementById("scroller").className = "service_tab active"
    }     
    else {
        document.getElementById("scroller").className = "service_tab"
    };
});

window.addEventListener("scroll", (event) => {
    let scrollY = this.scrollY;
    if(scrollY > 6151 && scrollY < 8200 ) {
        document.getElementById("tab01").className = "tab01 active"
    } 
    else {
        document.getElementById("tab01").className = "tab01"
    };
});
window.addEventListener("scroll", (event) => {
    let scrollY = this.scrollY;
    if(scrollY > 8201 && scrollY < 11480 ) {
        document.getElementById("tab02").className = "tab02 active"
    } 
    else {
        document.getElementById("tab02").className = "tab02"
    };
});
window.addEventListener("scroll", (event) => {
    let scrollY = this.scrollY;
    if(scrollY > 11481 && scrollY < 12040 ) {
        document.getElementById("tab03").className = "tab03 active"
    } 
    else {
        document.getElementById("tab03").className = "tab03"
    };
});
window.addEventListener("scroll", (event) => {
    let scrollY = this.scrollY;
    if(scrollY > 12041 && scrollY < 14050 ) {
        document.getElementById("tab04").className = "tab04 active"
    } 
    else {
        document.getElementById("tab04").className = "tab04"
    };
});




$('.btn li').click(function(){
    $(this).addClass('active')
    $(this).siblings().removeClass('active')

    var tab = $(this).attr('data-alt')
    $('.tads div').removeClass('active')
    $('#' + tab).addClass('active')
})


$('.s_btn li').click(function(){
    $(this).addClass('active2')
    $(this).siblings().removeClass('active2')

    var tab = $(this).attr('data-alt')
    $('.s_tabs div').removeClass('active2')
    $('#' + tab).addClass('active2')
})

$('.l_btn li').click(function(){
    $(this).addClass('active')
    $(this).siblings().removeClass('active')

    var tab = $(this).attr('data-alt')
    $('.l_tads div').removeClass('active')
    $('#' + tab).addClass('active')
})


/* 끝까지 책임지는 케어*/
$('.single-item').slick({
    centerMode: true,/* 
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    adaptiveHeight:true,
    //dots: true, */
});

/* 제대로 된 학습효과 6가지*/
$('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav'
  });
  $('.slider-nav').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    //dots: true,
    centerMode: true,
    focusOnSelect: true,
    arrows: false,
  });

  $('.single-item2').slick({
    centerMode: true,
    dots: true,
    arrows: true,/* 
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    adaptiveHeight:true,
    //dots: true, */
});
   

/* 다독 어떻게 제대로 하나요? */
const ani11 = gsap.timeline();
ani11.from("#dec01", {opacity:0,  y:150, ease: "power4.inOut"})
     .from("#dec02", {opacity:0,  y:150,  ease: "power4.inOut"})
     .from("#dec03", {opacity:0,  y:150,  ease: "power4.inOut"})


    ScrollTrigger.create({
    animation: ani11,
    trigger:".step01",
    start:"top top",
    end: "+=1000",
    scrub:true,
    pin:true,
    anticipatePin:1,
    //markers:true
})

/* 정독 어떻게 제대로 하나요? */
const ani12 = gsap.timeline();
ani12.from("#jung_dec01", {opacity:0,  y:150, ease: "power4.inOut"})
     .from("#jung_dec02", {opacity:0,  y:150,  ease: "power4.inOut"})
     .from("#jung_dec03", {opacity:0,  y:150,  ease: "power4.inOut"})


    ScrollTrigger.create({
    animation: ani12,
    trigger:".step02",
    start:"top top",
    end: "+=1000",
    scrub:true,
    pin:true,
    anticipatePin:1,
    //markers:true
})



/* 5단계 독후 프로그램 */
const ani1 = gsap.timeline();
ani1.from(".site-main .step04 section .l_tads > div .s2", {y: 1000 })
    .from(".site-main .step04 section .l_tads > div .s3", {y: 1000 })
    .from(".site-main .step04 section .l_tads > div .s4", {y: 1000 })
    .from(".site-main .step04 section .l_tads > div .s5", {y: 1000 })

    ScrollTrigger.create({
    animation: ani1,
    trigger:".step04",
    start:"+=0",
    end: "+=1000",
    scrub:true,
    pin:true,
    anticipatePin:1,
    //markers:true
})