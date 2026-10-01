// サイト開いたらローディング画面出す
const loading = document.querySelector('.spinner');
const loadingArea = document.querySelector('#loading')
const loadingCover = document.querySelector('.loading-cover');


// 読み込めたらローディング画面を先に消す
window.addEventListener('load', () => {
    loadingArea.animate(
        {
            opacity: [1, 0],
            visibility: 'hidden',

        },
        {
            duration: 700,
            delay: 4000,
            easing: 'ease',
            fill: 'forwards',
        }
    );
    // 読み込めたら背景色を後で消す
    loading.animate(
        {
            opacity: [1, 0],
            visibility: 'hidden',

        },
        {
            duration: 800,
            delay: 1200,
            easing: 'ease',
            fill: 'forwards',
        }
    );

    loadingCover.animate(
        {
            translate: ['100vw 0', '0 0', '-100vw 0']
        },
        {
            duration: 1500,
            delay: 2500,
            easing: 'ease',
            fill: 'forwards',
        }
    );
});



// 監視対象が範囲に入ったらする動作
const animateFade = (entries, obs) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.animate({
                opacity: [0, 1],
                filter: ['blur(.6rem)', 'blur(0)'],
                translate: ['0 2rem', 0]
            },
                {
                    duration: 2000,
                    delay: index * 1000,
                    easing: 'ease',
                    fill: 'forwards',
                }

            );
            obs.unobserve(entry.target);
        }
    });
};


// 監視設定
const fadeObserver = new IntersectionObserver(animateFade);

// .fadeinを監視するように指示
const fadeElements = document.querySelectorAll('.fadein');


fadeElements.forEach((fadeElement) => {
    fadeObserver.observe(fadeElement);
});


const animateFadeIN = () => {
    animateFadeIN.target.animate({
        opacity: [0, 1],
        filter: ['blur(.6rem)', 'blur(0)'],
        translate: ['0 2rem', 0]

    },
        {
            duration: 1000,
            easing: 'ease',
            fill: 'forwards',
        }

    );
    obs.unobserve(entry.target);
};




const fadeINObserver = new IntersectionObserver(animateFadeIN);

const fadeConcept = document.querySelector('.fadeIN');

fadeObserver.observe(fadeConcept);


// カーソルに合わせて大きく表示
const mainImage = document.querySelector('.products__big-img img');
const thumbImages = document.querySelectorAll('.products-item img');

thumbImages.forEach((Image) => {

    Image.addEventListener('mouseover', (event) => {
        mainImage.src = event.target.src;
        mainImage.animate(
            { opacity: [0, 1], filter: ['blur(.4rem)', 'blur(0)'] },
            {
                duration: 500,
            }
        );
    });
});

// ハンバーガーメニュー

// ハンバーガーメニューが押されたらopenクラスをメニューバーとボタンにつける

const hamburgerMenu = document.querySelector('.hamburger');
const navIphone = document.querySelector('.nav__iphone');
const btn = document.querySelector('#btn01');

// ハンバーガーがクリックされたら
hamburgerMenu.addEventListener('click', () => {
    navIphone.classList.toggle('open');
    btn.classList.toggle('open');
});

// ハンバーガーメニューのリンクがおされたらメニュー閉じる

const menuLink = document.querySelectorAll('.iphone__menu a');

menuLink.forEach((link) => {
    link.addEventListener('click', () => {
        navIphone.classList.remove('open');
        btn.classList.remove('open');
    });
});

// 下スクロールでナビが消え、上スクロールでナビが出現

const navBox = document.querySelector('.nav');

let iti = 0;


const in_out = () => {
    // スクロールで条件分岐

    if (window.scrollY === 0) {
        navBox.classList.remove('disappear');
        navBox.classList.add('appear');
    }
    else if (iti > window.scrollY) {
        navBox.classList.remove('disappear');
        navBox.classList.add('appear');
    }
    else {
        navBox.classList.remove('appear');
        navBox.classList.add('disappear');
    }
    iti = window.scrollY;
}

window.addEventListener('scroll', in_out);


