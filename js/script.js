//ハンバーガーメニュー
const button = document.querySelector('.hamburger');
const nav = document.querySelector('.navigation');

button.addEventListener('click', function () {
  button.classList.toggle('open');
  nav.classList.toggle('open');
});

nav.addEventListener('click', function () {
  nav.classList.remove('open');
  button.classList.remove('open');
});

//スライドショー（swiper）
const swiper = new Swiper('.swiper', {
  autoplay: true, //自動再生オン
  delay: 6000, //次のスライドに切り替わるまでの時間
  effect: 'fade', //アニメーションの種類（フェード機能オン）
  speed: 2000, //フェードのスピード
  direction: 'horizontal', // スライド方向
  loop: true, // ループの有無
});

// トップへ戻るボタン
const toTopButton = document.getElementById('to_top');

window.addEventListener('scroll', function () {
  if (window.scrollY > 200) {
    toTopButton.style.display = 'block';
  } else {
    toTopButton.style.display = 'none';
  }
});

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({
      behavior: 'smooth',
    });
  });
});

// faqアコーディオン
$('.faqQ').click(function () {
  $(this).next().slideToggle();
  $(this).toggleClass('active');
});

// ふわっと
$(function () {
  $(".inview").on("inview", function (event, isInView) {
    if (isInView) {
      $(this).stop().addClass("is-show");
    } else {
      $(this).stop().removeClass("is-show");
    }
  });
});


const canvas = document.getElementById('skyCanvas');
const ctx = canvas.getContext('2d');

// --- 周囲のきらめく星の設定 ---
const numStars = 150; // きらめく星の数
const backgroundStars = [];

for (let i = 0; i < numStars; i++) {
  backgroundStars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * (canvas.height / 2),
    size: Math.random() * 1.5 + 0.5,       // 星の大きさ (0.5〜2.0px)
    twinkleSpeed: Math.random() * 0.05 + 0.01, // またたく速さ
    phase: Math.random() * Math.PI * 2     // 初期状態のズレ
  });
}

// --- 流れ星（画面に常に1つ）の設定 ---
let shootingStar = {
  x: 0,
  y: 0,
  length: 100,
  speed: 12,
  angle: Math.PI / 4, // 45度の角度で右斜め下へ
  opacity: 0,         // 初期状態は透明（出現待ち）
  active: false,
  delayTimer: 0       // 次に流れるまでの待ち時間
};

function initShootingStar() {
  // 画像全体のどこからでも降るよう、ランダムに開始位置を決定
  // 左上〜中央付近からスタート（右斜め下に流すため）
  shootingStar.x = Math.random() * canvas.width * 0.8;
  shootingStar.y = Math.random() * canvas.height * 0.5 - 50;
  shootingStar.opacity = 1;
  shootingStar.active = true;
}

function animate(time) {
  // キャンバスをクリア（背景画像が見えるように透明化）
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 1. 周囲の星をきらめかせて描画
  backgroundStars.forEach(star => {
    // 正弦波（Math.sin）を使って透明度を0.2〜1.0の間で滑らかに変化させる
    const alpha = 0.6 + Math.sin(time * 0.005 + star.phase) * 0.4;

    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  });

  // 2. 流れ星の管理と描画
  if (shootingStar.active) {
    // 流れ星を描画
    ctx.save();
    ctx.strokeStyle = `rgba(255, 255, 255, ${shootingStar.opacity})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(shootingStar.x, shootingStar.y);
    ctx.lineTo(
      shootingStar.x - shootingStar.length * Math.cos(shootingStar.angle),
      shootingStar.y - shootingStar.length * Math.sin(shootingStar.angle)
    );
    ctx.stroke();
    ctx.restore();

    // 位置と透明度の更新
    shootingStar.x += shootingStar.speed * Math.cos(shootingStar.angle);
    shootingStar.y += shootingStar.speed * Math.sin(shootingStar.angle);
    shootingStar.opacity -= 0.04; // 徐々にフェードアウト

    // 画面外に出るか、完全に透明になったら終了
    if (shootingStar.opacity <= 0 || shootingStar.y > canvas.height || shootingStar.x > canvas.width) {
      shootingStar.active = false;
      // 次に流れるまでの待ち時間をランダムに設定（フレーム数換算：約1秒〜3秒後）
      shootingStar.delayTimer = Math.random() * 60 + 30;
    }
  } else {
    // 流れ星が待機中の場合はタイマーを減らし、0になったら再出現
    shootingStar.delayTimer--;
    if (shootingStar.delayTimer <= 0) {
      initShootingStar();
    }
  }

  requestAnimationFrame(animate);
}

// 最初の一歩を開始
initShootingStar();
requestAnimationFrame(animate);


// 夕日ぼかし
$(window).scroll(function () {
  $('.blur').each(function () {
    var elemPos = $(this).offset().top,
      scroll = $(window).scrollTop(),
      windowHeight = $(window).height();

    if (scroll > elemPos - windowHeight + 150) {
      $(this).addClass('scrollin');
    }
  });
});

// ローディング画面 
$(function () {

  // 2回目以降ならローダーを削除
  if (sessionStorage.getItem('access_flg')) {
    $('.loader').remove();
    return;
  }

  // 初回アクセス
  sessionStorage.setItem('access_flg', 'true');

  $(window).on('load', function () {

    setTimeout(function () {
      $('.loader .logo img').fadeIn(1000);
    }, 500);

    setTimeout(function () {
      $('.loader .logo img').fadeOut(1000);
    }, 1500);

    setTimeout(function () {
      $('.loader').fadeOut(800);
    }, 2500);

  });

});


lightbox.option({
  'wrapAround': true,
});