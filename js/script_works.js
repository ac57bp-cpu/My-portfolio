$(function () {
    $(window).on("scroll", function () {
        const sliderHeight = $(".headerMv").height();
        if (sliderHeight - 30 < $(this).scrollTop()) {
            $(".js-header").addClass("headerColorScroll");
        } else {
            $(".js-header").removeClass("headerColorScroll");
        }
    });
});


const pagetopBtn = document.querySelector('#page-top');
pagetopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});