

const cards = document.querySelectorAll(".card");
const loadMoreBtn = document.getElementById("loadMore");

let visibleCount = 8;

showCards();

function showCards() {
    cards.forEach((card, index) => {
        if (index < visibleCount) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });

    // ボタンの表示を変更
    if (visibleCount >= cards.length) {
        loadMoreBtn.textContent = "閉じる";
    } else {
        loadMoreBtn.textContent = "他の作品を見る";
    }
}

loadMoreBtn.addEventListener("click", () => {

    if (visibleCount >= cards.length) {
        // 閉じる
        visibleCount = 8;
    } else {
        // もっと見る
        visibleCount += 8;

        // 最大枚数を超えないようにする
        if (visibleCount > cards.length) {
            visibleCount = cards.length;
        }
    }

    showCards();
});



$(function () {
    $(window).on("scroll", function () {
        const sliderHeight = $(".Mv").height();
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