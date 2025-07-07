// 모바일 네비게이션 토글
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
const navButtons = document.querySelector('.nav-buttons');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navButtons.classList.toggle('open');
});

// FAQ 아코디언
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(btn => {
  btn.addEventListener('click', function() {
    const item = this.parentElement;
    item.classList.toggle('active');
  });
});

// 스크롤 시 네비게이션 배경 변경
const navbar = document.querySelector('.navbar');
const logo = document.querySelector('.logo');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
    logo.textContent = 'DW';
  } else {
    navbar.classList.remove('scrolled');
    logo.textContent = 'D-Wave';
  }
});

// 스크롤 다운 아이콘 클릭 이벤트
const scrollArrow = document.querySelector('.scroll-arrow');
if (scrollArrow) {
  scrollArrow.addEventListener('click', () => {
    document.querySelector('#service').scrollIntoView({
      behavior: 'smooth'
    });
  });
}

// 서비스 슬라이더
let currentSlide = 2; // 3번째 슬라이드부터 시작 (0-based index)
const servicesContainer = document.querySelector('.services-container');
const serviceItems = document.querySelectorAll('.service-item');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const totalSlides = serviceItems.length;

function updateSlider() {
  const translateX = -currentSlide * 100;
  servicesContainer.style.transform = `translateX(${translateX}%)`;
  
  // 버튼 상태 업데이트
  prevBtn.disabled = currentSlide === 0;
  nextBtn.disabled = currentSlide === totalSlides - 1;
}

function nextSlide() {
  if (currentSlide < totalSlides - 1) {
    currentSlide++;
    updateSlider();
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    updateSlider();
  }
}

// 이벤트 리스너
if (nextBtn && prevBtn) {
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  
  // 초기 상태 설정
  updateSlider();
}

// 포트폴리오 섹션 스크롤 애니메이션
const portfolioSection = document.querySelector('.portfolio-section');
const portfolioList = document.querySelector('.portfolio-list');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const portfolioMore = document.querySelector('.portfolio-more');

function animatePortfolio() {
  const sectionTop = portfolioSection.offsetTop;
  const sectionHeight = portfolioSection.offsetHeight;
  const scrollTop = window.pageYOffset;
  const windowHeight = window.innerHeight;
  
  // 섹션이 화면에 보이기 시작할 때
  if (scrollTop + windowHeight > sectionTop + 100) {
    // 포트폴리오 섹션 라운드 제거 및 여백 제거
    portfolioSection.classList.add('animate');
    
    // 포트폴리오 리스트 먼저 애니메이션
    setTimeout(() => {
      portfolioList.classList.add('animate');
    }, 300);
    
    // 포트폴리오 아이템들 순서대로 애니메이션
    portfolioItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('animate');
      }, 800 + (index * 200)); // 리스트 애니메이션 후 200ms 간격으로 순서대로 애니메이션
    });
    
    // 포트폴리오 더 보기 버튼 애니메이션
    setTimeout(() => {
      portfolioMore.classList.add('animate');
    }, 800 + (portfolioItems.length * 200) + 300); // 모든 아이템 애니메이션 후 300ms 뒤
  }
}

// 스크롤 이벤트 리스너 추가
window.addEventListener('scroll', animatePortfolio);

// Hero 배경 슬라이드
const heroSlides = document.querySelectorAll('.hero-slide');
const heroTextSlides = document.querySelectorAll('.hero-text-slide');
let currentHeroSlide = 0;

function showHeroSlide(index) {
  // 배경 이미지 슬라이드
  heroSlides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });
  
  // 텍스트 슬라이드
  heroTextSlides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });
}

function nextHeroSlide() {
  currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
  showHeroSlide(currentHeroSlide);
}

// 3초마다 자동 슬라이드 전환
if (heroSlides.length > 0) {
  setInterval(nextHeroSlide, 3000);
} 