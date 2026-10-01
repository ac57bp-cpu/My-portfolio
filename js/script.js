const swiper = new Swiper('.swiper', {

    // 親のswiperに対して何枚表示するかを決める
    slidesPerView: 1,
    breakpoints: {
        // スライドの表示枚数：440px以上の場合
        768: {
            slidesPerView: 3,
        },
        // スライドの表示枚数：768px以上の場合
        1440: {
            slidesPerView: 5,
        },
    },
    slidesPerGroup: 1,

    spaceBetween: 16,

    loop: true,  // 無限ループさせる
    loopAdditionalSlides: 2, // 無限ループさせる場合に複製するスライド数

    autoplay: { // 自動再生させる
        delay: 3000, // 次のスライドに切り替わるまでの時間（ミリ秒）
        disableOnInteraction: false, // ユーザーが操作しても自動再生を止めない
        pauseOnMouseEnter: true,     // マウスオーバー（ホバー）時に一時停止する        waitForTransition: false, // アニメーションの間も自動再生を止めない（最初のスライドの表示時間を揃えたいときに）
    },


    navigation: {
        nextEl: '.my-next',
        prevEl: '.my-prev',
    },
});


// 要素をスライドしながら非表示にする関数(jQueryのslideUpと同じ)
// slideDownという関数作成　第一引数に取得したhtml要素　第二引数にアニメーション時間を何もしてされなかったら0.3秒
const slideUp = (el, duration = 300) => {
    // offsetHeight＝今の要素の高さを取得する
    el.style.height = el.offsetHeight + "px";
    // それをブラウザに認識させる
    el.offsetHeight;
    // css側の数値をいじったり追加したり
    el.style.transitionProperty = "height, margin, padding";
    el.style.transitionDuration = duration + "ms";
    el.style.transitionTimingFunction = "ease";
    el.style.overflow = "hidden";
    el.style.height = 0;
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
    el.style.marginTop = 0;
    el.style.marginBottom = 0;
    // setTimeout() は、指定した時間が経過した後に、一度だけ特定の関数やコードを実行するための JavaScript の組み込みメソッドです。この場合はduration
    // 閉じたらsetTimeout関数してねってこと
    setTimeout(() => {
        // アニメーションのために一時的に設定したCSSを片付けている
        el.style.display = "none";
        el.style.removeProperty("height");
        el.style.removeProperty("padding-top");
        el.style.removeProperty("padding-bottom");
        el.style.removeProperty("margin-top");
        el.style.removeProperty("margin-bottom");
        el.style.removeProperty("overflow");
        el.style.removeProperty("transition-duration");
        el.style.removeProperty("transition-property");
        el.style.removeProperty("transition-timing-function");
        // クラスを消去
        el.classList.remove("active");
    }, duration);
};

// 要素をスライドしながら表示する関数(jQueryのslideDownと同じ)
// slideDownという関数作成　
const slideDown = (el, duration = 300) => {
    el.classList.add("active");
    el.style.removeProperty("display");
    // getComputedStyle=elに現在適用されているCSS情報　それのdisplayを取得
    let display = window.getComputedStyle(el).display;
    // もしnoneだったらblockにして
    if (display === "none") {
        display = "block";
    }
    el.style.display = display;
    let height = el.offsetHeight;
    el.style.overflow = "hidden";
    el.style.height = 0;
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
    el.style.marginTop = 0;
    el.style.marginBottom = 0;
    el.offsetHeight;
    el.style.transitionProperty = "height, margin, padding";
    el.style.transitionDuration = duration + "ms";
    el.style.transitionTimingFunction = "ease";
    el.style.height = height + "px";
    el.style.removeProperty("padding-top");
    el.style.removeProperty("padding-bottom");
    el.style.removeProperty("margin-top");
    el.style.removeProperty("margin-bottom");
    setTimeout(() => {
        el.style.removeProperty("height");
        el.style.removeProperty("overflow");
        el.style.removeProperty("transition-duration");
        el.style.removeProperty("transition-property");
        el.style.removeProperty("transition-timing-function");
    }, duration);
};

// 要素をスライドしながら交互に表示/非表示にする関数(jQueryのslideToggleと同じ)
// toggle=状態を反対にする
const slideToggle = (el, duration = 300) => {
    // もし現在適用されているCSS情報el要素がdisplayがnoneなら
    if (window.getComputedStyle(el).display === "none") {
        // 表示されるようにして
        return slideDown(el, duration);
        // 他なら非表示に
    } else {
        return slideUp(el, duration);
    }
};

/* =================================================== */
// DOM操作
/* =================================================== */
// 十字の要素を取得
const accordionQ = document.querySelectorAll(".Q");
const accordionQArr = Array.prototype.slice.call(accordionQ);
// アコーディオンを全て取得
const accordions = document.querySelectorAll(".accordion");
// 取得したアコーディオンをArrayに変換(IE対策)
const accordionsArr = Array.prototype.slice.call(accordions);


accordionsArr.forEach((trigger) => {
    // Triggerにクリックイベントを付与
    trigger.addEventListener("click", () => {
        // '.is-active'クラスを付与or削除
        trigger.classList.toggle("active");
        // 開閉させる要素を取得
        const content = trigger.querySelector(".A");
        // 要素を展開or閉じる
        slideToggle(content);
    });
});


accordionQArr.forEach((trigger) => {
    // Triggerにクリックイベントを付与
    trigger.addEventListener("click", () => {
        // '.is-active'クラスを付与or削除
        trigger.classList.toggle("active");
    });
});



const hamburgerMenu = document.querySelector('.hamburger');
const navIphone = document.querySelector('.hamburger__menu');
const btn = document.querySelector('#btn01');
const overLay = document.querySelector('.overlay');

// ハンバーガーがクリックされたら
hamburgerMenu.addEventListener('click', () => {
    navIphone.classList.toggle('open');
    btn.classList.toggle('open');
    overLay.classList.toggle('open');
});

// ハンバーガーメニューのリンクがおされたらメニュー閉じる

const menuLink = document.querySelectorAll('.hamburger__menu a');

menuLink.forEach((link) => {
    link.addEventListener('click', () => {
        navIphone.classList.remove('open');
        btn.classList.remove('open');
        overLay.classList.toggle('open');
    });
});




// 監視対象が範囲に入ったらじっこする動作
const animateFade = (entries, obs) => {
    entries.forEach((entry) => {
        // もし画面内に監査対象がいるなら
        if (entry.isIntersecting) {
            console.log(entry.target);
            entry.target.animate(
                {
                    opacity: [0, 1],
                    scale: [3, 1],
                    // translate:['0 4rem','0 2rem']
                },
                {
                    duration: 1500,
                    easing: 'ease',
                    fill: 'forwards',
                }
            );
            // 一度表示されたら監視をやめる
            obs.unobserve(entry.target);
        }
    });
};

// 監視設定
const fadeObserver = new IntersectionObserver(animateFade);

// fadeinを監視するように指示
const fadeElements = document.querySelectorAll('.fadein');
fadeElements.forEach((fadeElement) => {
    fadeObserver.observe(fadeElement);
});



// const opening = document.querySelector('#loading');

// window.addEventListener('load', () => {

//     // ① 画面を覆う
//     const animation1 = opening.animate(
//         [
//             {
//                 clipPath: 'circle(0% at 50% 50%)'
//             },
//             {
//                 clipPath: 'circle(150% at 50% 50%)'
//             }
//         ],
//         {
//             duration: 1200,
//             easing: 'ease-out',
//             fill: 'forwards'
//         }
//     );
// animation1が終わったらこの関数発動
//     animation1.onfinish = () => {

//         // ② 中央から見せる
//         opening.animate(
//             [
//                 {
//                     maskImage:
//                         'radial-gradient(circle at center, transparent 0%, black 0%)'
//                 },
//                 {
//                     maskImage:
//                         'radial-gradient(circle at center, transparent 150%, black 150%)'
//                 }
//             ],
//             {
//                 duration: 1200,
//                 easing: 'ease-out',
//                 fill: 'forwards'
//             }
// 終わったらこの関数発動
//         ).onfinish = () => {

//             opening.remove();

//         };

//     };

// });




const opening = document.querySelector('#loading');
// ロードされたら関数発動
window.addEventListener('load', () => {
    // htmlのloadingにアニメーションをあたえる
    opening.animate(
        [
            // ２秒かけてマスクサイズを０から150％にしなさい
            { '--mask-size': '0%' },
            { '--mask-size': '150%' }
        ],
        {
            duration: 2000,
            easing: 'ease-in-out',
            fill: 'forwards'
        }
    ).onfinish = () => {
        // 完了したらloadingのDomを消す
        opening.remove();

    };

});