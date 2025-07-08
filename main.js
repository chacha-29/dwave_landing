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

// 모달창 기능
document.addEventListener('DOMContentLoaded', function() {
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