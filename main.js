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
const faqItems = document.querySelectorAll('.faq-item');

faqQuestions.forEach(btn => {
  btn.addEventListener('click', function() {
    const currentItem = this.parentElement;
    const isCurrentlyActive = currentItem.classList.contains('active');
    
    // 모든 FAQ 아이템을 닫기
    faqItems.forEach(item => {
      item.classList.remove('active');
    });
    
    // 현재 아이템이 닫혀있었다면 열기
    if (!isCurrentlyActive) {
      currentItem.classList.add('active');
    }
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

// 서비스 슬라이더 - DOM 로드 후 초기화
function initializeServiceSlider() {
  let currentSlide = 0; // 첫 번째 슬라이드부터 시작 (0-based index)
  const servicesContainer = document.querySelector('.services-container');
  const serviceItems = document.querySelectorAll('.service-item');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const totalSlides = serviceItems.length;
  let autoSlideInterval;

  // 요소들이 존재하는지 확인
  if (!servicesContainer || !serviceItems.length || !prevBtn || !nextBtn) {
    console.error('Service slider elements not found');
    return;
  }

  // 화면 크기에 따른 슬라이더 설정
  function getServiceSlideInfo() {
    const width = window.innerWidth;
    
    if (width >= 901) {
      // 데스크톱: 4개 모두 보임, 25%씩 슬라이드
      return { 
        itemsPerView: 4, 
        slideStep: 100, // 25%씩 이동
        isSliderActive: true 
      };
    } else {
      // 모바일/태블릿: 1개씩 보임, 25%씩 슬라이드
      return { 
        itemsPerView: 1, 
        slideStep: 25, // 25%씩 이동으로 통일
        isSliderActive: true 
      };
    }
  }

  function updateSlider() {
    const slideInfo = getServiceSlideInfo();
    
    // 모든 화면 크기에서 버튼을 항상 표시
    prevBtn.style.display = 'block';
    nextBtn.style.display = 'block';
    
    // 중앙 정렬을 위한 offset 계산
    let centerOffset = 0;
    if (slideInfo.itemsPerView === 1) {
      // 모바일/태블릿: 1개씩 보이는 경우 중앙 정렬
      centerOffset = 37.5; // (100% - 25%) / 2 = 37.5%
    }
    
    const translateX = -(currentSlide * slideInfo.slideStep) + centerOffset;
    servicesContainer.style.transform = `translateX(${translateX}%)`;
    
    // 자동 슬라이드에서는 버튼 상태를 항상 활성화
    prevBtn.disabled = false;
    nextBtn.disabled = false;
    
    console.log(`Service - Current slide: ${currentSlide}, TranslateX: ${translateX}%, ItemsPerView: ${slideInfo.itemsPerView}, CenterOffset: ${centerOffset}`);
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides; // 루프: 마지막 → 첫 번째
    updateSlider();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; // 루프: 첫 번째 → 마지막
    updateSlider();
  }

  // 자동 슬라이드 시작
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      nextSlide();
    }, 5000); // 5초마다 자동 슬라이드
  }

  // 자동 슬라이드 정지
  function stopAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
    }
  }

  // 자동 슬라이드 재시작
  function restartAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  // 이벤트 리스너 - 버튼 클릭 시 자동 슬라이드 재시작
  nextBtn.addEventListener('click', () => {
    nextSlide();
    restartAutoSlide(); // 수동 조작 후 자동 슬라이드 재시작
  });
  
  prevBtn.addEventListener('click', () => {
    prevSlide();
    restartAutoSlide(); // 수동 조작 후 자동 슬라이드 재시작
  });

  // 마우스 호버 시 자동 슬라이드 일시 정지
  const serviceSection = document.querySelector('.service-section');
  if (serviceSection) {
    serviceSection.addEventListener('mouseenter', stopAutoSlide);
    serviceSection.addEventListener('mouseleave', startAutoSlide);
  }

  // 리사이즈 이벤트 리스너
  window.addEventListener('resize', () => {
    currentSlide = 0; // 화면 크기 변경 시 첫 슬라이드로 리셋
    stopAutoSlide(); // 기존 자동 슬라이드 정지
    updateSlider();
    startAutoSlide(); // 새로운 설정으로 자동 슬라이드 시작
  });
  
  // 초기 상태 설정
  updateSlider();
  
  // 자동 슬라이드 시작
  startAutoSlide();
  
  console.log(`Service slider initialized with ${totalSlides} slides - Auto slide every 5 seconds`);
}

// 포트폴리오 섹션 스크롤 애니메이션
const portfolioSection = document.querySelector('.portfolio-section');
const portfolioSlider = document.querySelector('.portfolio-slider');
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
    
    // 포트폴리오 슬라이더 먼저 애니메이션
    setTimeout(() => {
      portfolioSlider.classList.add('animate');
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

// Hero 슬라이더
const heroSlidesContainer = document.querySelector('.hero-slides-container');
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.hero-dot');
const heroPrevBtn = document.getElementById('heroPrevBtn');
const heroNextBtn = document.getElementById('heroNextBtn');
let currentHeroSlide = 0;
let heroAutoSlideInterval;

function initializeHeroSlider() {
  if (!heroSlidesContainer || heroSlides.length === 0) return;
  
  showHeroSlide(currentHeroSlide);
  startHeroAutoSlide();
  
  // 버튼 이벤트 리스너
  if (heroPrevBtn) {
    heroPrevBtn.addEventListener('click', prevHeroSlide);
  }
  
  if (heroNextBtn) {
    heroNextBtn.addEventListener('click', nextHeroSlide);
  }
  
  // Dot 이벤트 리스너
  heroDots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToHeroSlide(index));
  });
  
  // 호버 시 자동 슬라이드 중지/재시작
  heroSlidesContainer.addEventListener('mouseenter', stopHeroAutoSlide);
  heroSlidesContainer.addEventListener('mouseleave', startHeroAutoSlide);
  
  // 터치 이벤트 리스너
  let heroTouchStartX = 0;
  let heroTouchEndX = 0;
  let isHeroTouching = false;
  
  heroSlidesContainer.addEventListener('touchstart', function(e) {
    heroTouchStartX = e.changedTouches[0].screenX;
    isHeroTouching = true;
    stopHeroAutoSlide();
  }, { passive: true });
  
  heroSlidesContainer.addEventListener('touchmove', function(e) {
    if (!isHeroTouching) return;
    e.preventDefault(); // 스크롤 방지
  }, { passive: false });
  
  heroSlidesContainer.addEventListener('touchend', function(e) {
    if (!isHeroTouching) return;
    
    heroTouchEndX = e.changedTouches[0].screenX;
    isHeroTouching = false;
    
    const swipeDistance = heroTouchStartX - heroTouchEndX;
    const minSwipeDistance = 50; // 최소 스와이프 거리
    
    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // 왼쪽으로 스와이프 (다음 슬라이드)
        nextHeroSlide();
      } else {
        // 오른쪽으로 스와이프 (이전 슬라이드)
        prevHeroSlide();
      }
    }
    
    restartHeroAutoSlide();
  }, { passive: true });
}

function showHeroSlide(index) {
  if (!heroSlidesContainer) return;
  
  const slideWidth = 33.333; // 각 슬라이드가 33.333% width (3개 슬라이드이므로)
  const offset = -(index * slideWidth);
  
  heroSlidesContainer.style.transform = `translateX(${offset}%)`;
  
  // Dot 활성화 상태 업데이트
  heroDots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
  
  currentHeroSlide = index;
}

function nextHeroSlide() {
  currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
  showHeroSlide(currentHeroSlide);
}

function prevHeroSlide() {
  currentHeroSlide = (currentHeroSlide - 1 + heroSlides.length) % heroSlides.length;
  showHeroSlide(currentHeroSlide);
}

function goToHeroSlide(index) {
  currentHeroSlide = index;
  showHeroSlide(currentHeroSlide);
  restartHeroAutoSlide();
}

function startHeroAutoSlide() {
  if (heroAutoSlideInterval) clearInterval(heroAutoSlideInterval);
  heroAutoSlideInterval = setInterval(nextHeroSlide, 5000); // 5초마다 자동 슬라이드
}

function stopHeroAutoSlide() {
  if (heroAutoSlideInterval) {
    clearInterval(heroAutoSlideInterval);
    heroAutoSlideInterval = null;
  }
}

function restartHeroAutoSlide() {
  stopHeroAutoSlide();
  setTimeout(startHeroAutoSlide, 1000); // 1초 후 자동 슬라이드 재시작
}

// DOM 로드 후 초기화
document.addEventListener('DOMContentLoaded', function() {
  // Hero 슬라이더 초기화
  initializeHeroSlider();
  
  // 서비스 슬라이더 초기화
  initializeServiceSlider();
  
  // 포트폴리오 슬라이더 초기화
  initializePortfolioSlider();
  
  // 모달창 기능
  const modal = document.getElementById('projectModal');
  const closeBtn = document.querySelector('.close');
  const cancelBtn = document.getElementById('cancelBtn');
  const submitBtn = document.getElementById('submitBtn');
  const projectForm = document.getElementById('projectForm');
  const loadingState = document.getElementById('loadingState');
  const successState = document.getElementById('successState');
  
  // 프로젝트 의뢰하기 버튼들
  const getStartedBtn = document.querySelector('.btn-get-started');
  const consultationBtn = document.querySelector('.btn-consultation');
  const primaryBtn = document.querySelector('.btn-primary');
  
  // 모달 열기 함수
  function openModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // 스크롤 방지
    resetModalState();
  }
  
  // 모달 닫기 함수
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // 스크롤 복원
    resetModalState();
    projectForm.reset(); // 폼 초기화
  }
  
  // 모달 상태 리셋
  function resetModalState() {
    projectForm.style.display = 'block';
    loadingState.style.display = 'none';
    successState.style.display = 'none';
    submitBtn.disabled = false;
  }
  
  // 로딩 상태 표시
  function showLoading() {
    projectForm.style.display = 'none';
    loadingState.style.display = 'block';
    successState.style.display = 'none';
  }
  
  // 성공 상태 표시
  function showSuccess() {
    projectForm.style.display = 'none';
    loadingState.style.display = 'none';
    successState.style.display = 'block';
    
    // 3초 후 자동으로 모달 닫기
    setTimeout(() => {
      closeModal();
    }, 3000);
  }
  
  // 이벤트 리스너 추가
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openModal();
    });
  }
  
  if (consultationBtn) {
    consultationBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openModal();
    });
  }
  
  if (primaryBtn) {
    primaryBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openModal();
    });
  }
  
  // 닫기 버튼 클릭
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
  
  // 취소 버튼 클릭
  if (cancelBtn) {
    cancelBtn.addEventListener('click', closeModal);
  }
  
  // 모달 바깥 영역 클릭 시 닫기 (선택사항 - 원하면 주석 해제)
  // modal.addEventListener('click', function(e) {
  //   if (e.target === modal) {
  //     closeModal();
  //   }
  // });
  
  // ESC 키로 모달 닫기 (선택사항 - 원하면 주석 해제)
  // document.addEventListener('keydown', function(e) {
  //   if (e.key === 'Escape' && modal.style.display === 'block') {
  //     closeModal();
  //   }
  // });
  
  // 폼 제출 처리
  if (projectForm) {
    projectForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // 폼 데이터 수집
      const formData = new FormData(projectForm);
      const data = {};
      
      for (let [key, value] of formData.entries()) {
        data[key] = value;
      }
      
      // 유효성 검사
      if (!data.clientName || !data.clientEmail || !data.projectType || !data.projectDescription) {
        alert('필수 항목을 모두 입력해주세요.');
        return;
      }
      
      // 이메일 유효성 검사
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.clientEmail)) {
        alert('올바른 이메일 형식을 입력해주세요.');
        return;
      }
      
      // 로딩 상태 표시
      showLoading();
      submitBtn.disabled = true;
      
      try {
        // Make 웹훅으로 데이터 전송
        await sendToMake(data);
        showSuccess();
      } catch (error) {
        console.error('전송 오류:', error);
        alert('전송에 실패했습니다. 다시 시도해주세요.');
        resetModalState();
      }
    });
  }
  
  // Make 웹훅으로 데이터 전송
  async function sendToMake(data) {
    const webhookURL = 'https://hook.us2.make.com/tbvdwpxv2itax3kgktqab17t3w2yehg7';
    
    const payload = {
      client: {
        name: data.clientName,
        email: data.clientEmail,
        phone: data.clientPhone || '',
        submissionDate: new Date().toISOString()
      },
      project: {
        type: data.projectType,
        budget: data.budget || '',
        timeline: data.timeline || '',
        description: data.projectDescription
      },
      metadata: {
        source: 'D-Wave Landing Page Modal',
        timestamp: Date.now(),
        requestId: generateRequestId()
      }
    };
    
    console.log('🚀 Make 웹훅으로 데이터 전송 중...', payload);
    
    const response = await fetch(webhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    console.log('✅ Make 웹훅 전송 성공');
  }
  
  // 요청 ID 생성
  function generateRequestId() {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 8);
    return `REQ-${timestamp}-${randomStr}`.toUpperCase();
  }
});

// 포트폴리오 슬라이더 - DOM 로드 후 초기화
function initializePortfolioSlider() {
  let currentPortfolioSlide = 0;
  const portfolioContainer = document.querySelector('.portfolio-container');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const portfolioPrevBtn = document.getElementById('portfolioPrevBtn');
  const portfolioNextBtn = document.getElementById('portfolioNextBtn');
  const portfolioDots = document.querySelectorAll('.portfolio-dot');
  const totalSlides = portfolioItems.length;

  // 요소들이 존재하는지 확인
  if (!portfolioContainer || !portfolioItems.length) {
    console.error('Portfolio slider elements not found');
    return;
  }

  // 화면 크기에 따른 슬라이드 계산
  function getSlideInfo() {
    const width = window.innerWidth;
    
    if (width >= 901) {
      // 데스크톱: 4개 모두 보임, 슬라이더 비활성화
      return { 
        itemsPerView: 4, 
        slideStep: 0, 
        isSliderActive: false 
      };
    } else if (width >= 601) {
      // 태블릿: 2개씩 보임
      return { 
        itemsPerView: 2, 
        slideStep: 100, // 100%씩 이동 (2개씩)
        isSliderActive: true 
      };
    } else {
      // 모바일: 1개씩 보임
      return { 
        itemsPerView: 1, 
        slideStep: 100, // 100%씩 이동 (1개씩)
        isSliderActive: true 
      };
    }
  }

  function updatePortfolioSlider() {
    const slideInfo = getSlideInfo();
    
    if (!slideInfo.isSliderActive) {
      // 데스크톱: 슬라이더 비활성화
      portfolioContainer.style.transform = 'translateX(0%)';
      if (portfolioPrevBtn) portfolioPrevBtn.style.display = 'none';
      if (portfolioNextBtn) portfolioNextBtn.style.display = 'none';
      return;
    }

    // 슬라이더 활성화 (모바일/태블릿)
    if (portfolioPrevBtn) portfolioPrevBtn.style.display = 'block';
    if (portfolioNextBtn) portfolioNextBtn.style.display = 'block';
    
    const translateX = -currentPortfolioSlide * slideInfo.slideStep;
    portfolioContainer.style.transform = `translateX(${translateX}%)`;
    
    // 버튼 상태 업데이트
    const maxSlides = Math.ceil(totalSlides / slideInfo.itemsPerView);
    if (portfolioPrevBtn) portfolioPrevBtn.disabled = currentPortfolioSlide === 0;
    if (portfolioNextBtn) portfolioNextBtn.disabled = currentPortfolioSlide >= maxSlides - 1;
    
    // Dot 활성 상태 업데이트 (모바일에서만)
    updatePortfolioDots();
    
    console.log(`Portfolio - Current slide: ${currentPortfolioSlide}, TranslateX: ${translateX}%, ItemsPerView: ${slideInfo.itemsPerView}`);
  }

  function updatePortfolioDots() {
    portfolioDots.forEach((dot, index) => {
      if (index === currentPortfolioSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function goToSlide(slideIndex) {
    const slideInfo = getSlideInfo();
    if (!slideInfo.isSliderActive) return;
    
    const maxSlides = Math.ceil(totalSlides / slideInfo.itemsPerView);
    if (slideIndex >= 0 && slideIndex < maxSlides) {
      currentPortfolioSlide = slideIndex;
      updatePortfolioSlider();
    }
  }

  function nextPortfolioSlide() {
    const slideInfo = getSlideInfo();
    if (!slideInfo.isSliderActive) return;
    
    const maxSlides = Math.ceil(totalSlides / slideInfo.itemsPerView);
    if (currentPortfolioSlide < maxSlides - 1) {
      currentPortfolioSlide++;
      updatePortfolioSlider();
    }
  }

  function prevPortfolioSlide() {
    const slideInfo = getSlideInfo();
    if (!slideInfo.isSliderActive) return;
    
    if (currentPortfolioSlide > 0) {
      currentPortfolioSlide--;
      updatePortfolioSlider();
    }
  }

  // 터치 스와이프 변수
  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartY = 0;
  let touchEndY = 0;
  let isTouching = false;

  // 터치 스와이프 처리 함수
  function handleTouchStart(e) {
    const slideInfo = getSlideInfo();
    if (!slideInfo.isSliderActive) return; // 데스크톱에서는 터치 비활성화
    
    isTouching = true;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    
    // 터치 시작 시 트랜지션 비활성화 (부드러운 드래그를 위해)
    portfolioContainer.style.transition = 'none';
  }

  function handleTouchMove(e) {
    if (!isTouching) return;
    
    const slideInfo = getSlideInfo();
    if (!slideInfo.isSliderActive) return;
    
    // 스크롤 방지
    e.preventDefault();
  }

  function handleTouchEnd(e) {
    if (!isTouching) return;
    
    const slideInfo = getSlideInfo();
    if (!slideInfo.isSliderActive) return;
    
    isTouching = false;
    touchEndX = e.changedTouches[0].clientX;
    touchEndY = e.changedTouches[0].clientY;
    
    // 트랜지션 복원
    portfolioContainer.style.transition = 'transform 0.3s ease';
    
    // 스와이프 거리 계산
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    const minSwipeDistance = 50; // 최소 스와이프 거리
    
    // 수평 스와이프가 수직 스와이프보다 큰 경우에만 처리
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        // 오른쪽 스와이프 -> 이전 슬라이드
        prevPortfolioSlide();
      } else {
        // 왼쪽 스와이프 -> 다음 슬라이드
        nextPortfolioSlide();
      }
    }
  }

  // 이벤트 리스너
  if (portfolioNextBtn) portfolioNextBtn.addEventListener('click', nextPortfolioSlide);
  if (portfolioPrevBtn) portfolioPrevBtn.addEventListener('click', prevPortfolioSlide);
  
  // Dot 클릭 이벤트
  portfolioDots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });

  // 터치 이벤트 리스너 추가
  portfolioContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
  portfolioContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
  portfolioContainer.addEventListener('touchend', handleTouchEnd, { passive: false });

  // 리사이즈 이벤트 리스너
  window.addEventListener('resize', () => {
    currentPortfolioSlide = 0; // 화면 크기 변경 시 첫 슬라이드로 리셋
    updatePortfolioSlider();
  });

  // 초기 설정
  updatePortfolioSlider();
  console.log(`Portfolio slider initialized with ${totalSlides} items`);
} 