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
    }, 3000); // 3초마다 자동 슬라이드
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
  
  console.log(`Service slider initialized with ${totalSlides} slides - Auto slide every 3 seconds`);
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
  
  // 섹션이 화면에 보이는지 확인
  const isVisible = scrollTop + windowHeight > sectionTop + 100 && 
                   scrollTop < sectionTop + sectionHeight - 100;
  
  if (isVisible) {
    // 섹션이 화면에 보일 때: 애니메이션 적용
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
  } else {
    // 섹션이 화면에서 벗어날 때: 이전 스타일로 복원
    portfolioSection.classList.remove('animate');
    portfolioSlider.classList.remove('animate');
    portfolioItems.forEach((item) => {
      item.classList.remove('animate');
    });
    portfolioMore.classList.remove('animate');
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
  
  // Back to Top 버튼 초기화
  initializeBackToTop();
  
  // 모달창 기능
  const modal = document.getElementById('projectModal');
  const closeBtn = document.querySelector('.close');
  const resetBtn = document.getElementById('resetBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const submitBtn = document.getElementById('submitBtn');
  const projectForm = document.getElementById('projectForm');
  const loadingState = document.getElementById('loadingState');
  const successState = document.getElementById('successState');
  
  // 봇 방지용 변수들
  let formOpenTime = 0; // 폼이 열린 시간
  const MIN_FORM_TIME = 3000; // 최소 3초 후 제출 가능
  
  // 무료 상담 신청 버튼들
  const getStartedBtn = document.querySelector('.btn-get-started');
  const consultationBtn = document.querySelector('.btn-consultation');
  const primaryBtn = document.querySelector('.btn-primary');
  

  
  // 모달 열기 함수
  function openModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // 스크롤 방지
    resetModalState();
    
    // 봇 방지용 - 폼이 열린 시간 기록
    formOpenTime = Date.now();
    
    // 모달 열릴 때 신청하기 버튼 초기 상태 설정
    setTimeout(() => {
      updateSubmitButton();
    }, 50);
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
    
    // 개인정보보호 동의 체크박스 초기화
    const privacyConsent = document.getElementById('privacyConsent');
    if (privacyConsent) {
      privacyConsent.checked = false;
    }
    
    // 개인정보 드롭다운 닫기
    const privacyDetails = document.getElementById('privacyDetails');
    if (privacyDetails) {
      privacyDetails.classList.remove('open');
    }
    
    // 로봇 체크박스 초기화
    const robotCheck = document.getElementById('robotCheck');
    if (robotCheck) {
      robotCheck.checked = false;
    }
    
    // 신청하기 버튼 비활성화
    updateSubmitButton();
  }
  
  // 폼 초기화 함수
  function resetForm() {
    // 모든 입력 필드 초기화
    const inputs = projectForm.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="date"], select, textarea');
    inputs.forEach(input => {
      if (input.type === 'select-one') {
        input.selectedIndex = 0;
      } else {
        input.value = '';
      }
    });
    
    // 체크박스 초기화
    const checkboxes = projectForm.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
    
    // 개인정보 드롭다운 닫기
    const privacyDetails = document.getElementById('privacyDetails');
    if (privacyDetails) {
      privacyDetails.classList.remove('open');
      // 링크 텍스트도 초기화
      const privacyToggle = document.getElementById('privacyToggle');
      if (privacyToggle) {
        privacyToggle.textContent = '자세히 보기';
      }
    }
    
    // 신청하기 버튼 비활성화
    updateSubmitButton();
    
    // 사용자 피드백
    alert('입력 내용이 모두 초기화되었습니다.');
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
  
  // 의뢰하기 버튼 활성화/비활성화 업데이트
  function updateSubmitButton() {
    const privacyConsent = document.getElementById('privacyConsent');
    if (privacyConsent && submitBtn) {
      submitBtn.disabled = !privacyConsent.checked;
    }
  }
  
  // 개인정보 드롭다운 토글
  function togglePrivacyDetails(e) {
    e.preventDefault();
    const privacyDetails = document.getElementById('privacyDetails');
    const privacyToggle = document.getElementById('privacyToggle');
    
    if (privacyDetails) {
      privacyDetails.classList.toggle('open');
      
      // 링크 텍스트 변경
      if (privacyToggle) {
        if (privacyDetails.classList.contains('open')) {
          privacyToggle.textContent = '닫기';
        } else {
          privacyToggle.textContent = '자세히 보기';
        }
      }
    }
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
  
  // 초기화 버튼 클릭
  if (resetBtn) {
    resetBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // 확인 대화상자
      if (confirm('입력한 모든 내용이 삭제됩니다. 정말 초기화하시겠습니까?')) {
        resetForm();
      }
    });
  }
  
  // 취소 버튼 클릭
  if (cancelBtn) {
    cancelBtn.addEventListener('click', closeModal);
  }
  
  // 개인정보 자세히 보기 토글
  const privacyToggle = document.getElementById('privacyToggle');
  if (privacyToggle) {
    privacyToggle.addEventListener('click', togglePrivacyDetails);
  }
  
  // 개인정보 동의 체크박스 변경 이벤트
  const privacyConsent = document.getElementById('privacyConsent');
  if (privacyConsent) {
    privacyConsent.addEventListener('change', updateSubmitButton);
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
      
      // 기본 유효성 검사
      if (!data.clientName || !data.clientEmail || !data.projectType || !data.projectDescription) {
        alert('필수 항목을 모두 입력해주세요.');
        return;
      }
      
      // 개인정보보호 동의 체크박스 검사
      const privacyConsent = document.getElementById('privacyConsent');
      if (!privacyConsent.checked) {
        alert('개인정보 수집 및 이용에 동의해주세요.');
        return;
      }
      
      // 이메일 유효성 검사
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.clientEmail)) {
        alert('올바른 이메일 형식을 입력해주세요.');
        return;
      }
      
      // 🛡️ 봇 방지 검증 시작
      
      // 1. Honeypot 필드 검사
      const honeypotField = document.getElementById('website');
      if (honeypotField && honeypotField.value.trim() !== '') {
        console.log('🚨 봇 감지: Honeypot 필드가 채워짐');
        alert('오류가 발생했습니다. 다시 시도해주세요.');
        return;
      }
      
      // 2. 시간 기반 검사 (최소 3초 후 제출 가능)
      const currentTime = Date.now();
      const elapsedTime = currentTime - formOpenTime;
      if (elapsedTime < MIN_FORM_TIME) {
        console.log('🚨 봇 감지: 제출 시간이 너무 빠름', elapsedTime + 'ms');
        alert('잠시 후 다시 시도해주세요.');
        return;
      }
      
      // 3. 로봇 체크박스 검증
      const robotCheck = document.getElementById('robotCheck');
      if (!robotCheck || !robotCheck.checked) {
        alert('로봇이 아님을 확인해주세요.');
        return;
      }
      
      console.log('✅ 봇 방지 검증 통과');
      
      // 로딩 상태 표시
      showLoading();
      submitBtn.disabled = true;
      
      try {
        // Netlify Forms로 데이터 전송
        await submitToNetlify(projectForm);
        showSuccess();
      } catch (error) {
        console.error('전송 오류:', error);
        alert('전송에 실패했습니다. 다시 시도해주세요.');
        resetModalState();
      }
    });
  }
  
  // Netlify Forms로 데이터 전송
  async function submitToNetlify(form) {
    const formData = new FormData(form);
    
    // 개인정보 동의 상태 추가
    const privacyConsent = document.getElementById('privacyConsent');
    formData.set('privacyConsent', privacyConsent.checked ? 'true' : 'false');
    
    // 제출 시간 추가
    formData.set('submissionTime', new Date().toLocaleString('ko-KR'));
    
    console.log('🚀 Netlify Forms로 데이터 전송 중...');
    
    const response = await fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(formData).toString()
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    console.log('✅ Netlify Forms 전송 성공');
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
      // 데스크톱: 2개씩 보임, 슬라이더 활성화
      return { 
        itemsPerView: 2, 
        slideStep: 100, // 100%씩 이동 (2개씩)
        isSliderActive: true 
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
    
    // 모든 화면에서 슬라이더 활성화
    if (portfolioPrevBtn) portfolioPrevBtn.style.display = 'block';
    if (portfolioNextBtn) portfolioNextBtn.style.display = 'block';
    
    const translateX = -currentPortfolioSlide * slideInfo.slideStep;
    portfolioContainer.style.transform = `translateX(${translateX}%)`;
    
    // 버튼 상태 업데이트
    const maxSlides = Math.ceil(totalSlides / slideInfo.itemsPerView);
    if (portfolioPrevBtn) portfolioPrevBtn.disabled = currentPortfolioSlide === 0;
    if (portfolioNextBtn) portfolioNextBtn.disabled = currentPortfolioSlide >= maxSlides - 1;
    
    // Dot 활성 상태 업데이트
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
    const maxSlides = Math.ceil(totalSlides / slideInfo.itemsPerView);
    if (slideIndex >= 0 && slideIndex < maxSlides) {
      currentPortfolioSlide = slideIndex;
      updatePortfolioSlider();
    }
  }

  function nextPortfolioSlide() {
    const slideInfo = getSlideInfo();
    const maxSlides = Math.ceil(totalSlides / slideInfo.itemsPerView);
    if (currentPortfolioSlide < maxSlides - 1) {
      currentPortfolioSlide++;
      updatePortfolioSlider();
    }
  }

  function prevPortfolioSlide() {
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
    isTouching = true;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    
    // 터치 시작 시 트랜지션 비활성화 (부드러운 드래그를 위해)
    portfolioContainer.style.transition = 'none';
  }

  function handleTouchMove(e) {
    if (!isTouching) return;
    
    // 스크롤 방지
    e.preventDefault();
  }

  function handleTouchEnd(e) {
    if (!isTouching) return;
    
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

// Back to Top 버튼 기능
function initializeBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  
  if (!backToTopBtn) {
    console.error('Back to Top button not found');
    return;
  }
  
  // 스크롤 위치에 따라 버튼 표시/숨김
  function toggleBackToTopBtn() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }
  
  // 상단으로 스크롤하는 함수
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  // 이벤트 리스너 등록
  window.addEventListener('scroll', toggleBackToTopBtn);
  backToTopBtn.addEventListener('click', scrollToTop);
  
  // 초기 상태 설정
  toggleBackToTopBtn();
  
  console.log('Back to Top button initialized');
} 