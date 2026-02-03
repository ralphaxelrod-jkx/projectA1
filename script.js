// 0. 페이지 로드시 안내 메시지 표시
window.addEventListener('load', () => {
    alert('본 웹페이지는 실무학습용으로 제작된 웹페이지임을 알려드립니다');
});

// 1. AOS 애니메이션 초기화
AOS.init();

// 2. 메인 슬라이드 설정 (Swiper.js)
const mainSwiper = new Swiper('.mainSwiper', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    effect: 'fade', // 부드러운 전환 효과
    speed: 1000,
});

// 정지 버튼 제어
const stopBtn = document.querySelector('.stop-btn');
if (stopBtn) {
    stopBtn.addEventListener('click', () => {
        if (stopBtn.textContent === 'II') {
            mainSwiper.autoplay.stop();
            stopBtn.textContent = '▶';
        } else {
            mainSwiper.autoplay.start();
            stopBtn.textContent = 'II';
        }
    });
}

// 3. 카드 뉴스 슬라이드 (좌우 드래그)
const cardSwiper = new Swiper('.cardSwiper', {
    slidesPerView: 3, // 한 화면에 3개
    spaceBetween: 30,
    grabCursor: true, // 마우스 커서 손바닥 모양
    breakpoints: {
        1200: { slidesPerView: 3 },
        768: { slidesPerView: 2 },
        0: { slidesPerView: 1 }
    }
});

// scroll-down 클릭 시 메인 슬라이드 하단으로 스크롤
const scrollDownBtn = document.querySelector('.scroll-down');
if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', () => {
        const swiperSlide = document.querySelector('.swiper-slide');
        if (swiperSlide) {
            // swiper-slide의 하단 위치 계산
            const slideBottom = swiperSlide.offsetTop + swiperSlide.offsetHeight + 50;
            window.scrollTo({ top: slideBottom, behavior: 'smooth' });
        }
    });
}

// 최상단 이동 기능
const topBtn = document.getElementById('top-btn');
if (topBtn) {
    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// 4. 스크롤 제어 (헤더 색상, 탑버튼, 퀵메뉴)
const header = document.querySelector('#main-header');
const topBar = document.querySelector('.top-bar');
const gnbWrapper = document.querySelector('.gnb-wrapper');
const quickMenu = document.querySelector('.quick-menu');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const footerHeight = 400; // footer 대략적인 높이
    const hidePoint = docHeight - window.innerHeight - footerHeight; // footer 400px 전에 숨기기
    
    // 100px 이상 스크롤 시 헤더 요소 숨김
    if (currentScrollY > 100) {
        topBar.classList.add('hide');
        gnbWrapper.classList.add('hide');
    } else {
        topBar.classList.remove('hide');
        gnbWrapper.classList.remove('hide');
    }

    // 50px 이상 스크롤 시 헤더 배경색 변경
    if (currentScrollY > 50) {
        topBar.style.background = '#f2f2f2'; 
    } else {
        topBar.style.background = '#f5f5f5';
    }

    // 탑버튼 표시 여부
    if (topBtn && currentScrollY > 300) {
        topBtn.style.display = 'block';
    } else if (topBtn) {
        topBtn.style.display = 'none';
    }

    // 퀵메뉴 - 푸터에 가까워지면 숨김
    if (quickMenu) {
        if (currentScrollY > hidePoint) {
            quickMenu.classList.add('hide');
        } else {
            quickMenu.classList.remove('hide');
        }
    }
    
    lastScrollY = currentScrollY;
});