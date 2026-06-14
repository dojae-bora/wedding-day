// 예식 당일 목표 날짜 설정 (D-Day 계산용)
const weddingDate = new Date("2027-01-16T16:40:00").getTime();

// 1. 인트로 봉투 열기 함수
function openEnvelope() {
    const overlay = document.getElementById('intro-overlay');
    const mainContent = document.getElementById('main-content');
    const stickyBar = document.getElementById('top-sticky-bar');
    
    // 인트로 화면 투명하게 사라짐 효과
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
        mainContent.style.display = 'block'; // 세로 스크롤 레이아웃 노출
        stickyBar.style.display = 'block';  // 음악 재생 바 활성화
        
        // 메인 화면 활성화 직후 지도와 디데이 작동
        initMap();
        updateDday();
    }, 800);
}

// 2. BGM 재생 / 일시정지 제어 토글
function toggleBgm() {
    const bgm = document.getElementById('bgm');
    const btn = document.getElementById('bgm-btn');
    
    if (bgm.paused) {
        bgm.play().catch(() => {
            alert("브라우저 정책으로 인해 음악 재생이 거부되었습니다. 버튼을 다시 누르거나 스크롤해 주세요.");
        });
        btn.innerText = "🎵 Music On";
        btn.classList.add('playing');
    } else {
        bgm.pause();
        btn.innerText = "🎵 Music Off";
        btn.classList.remove('playing');
    }
}

// // 3. 디데이 카운트다운 계산 함수
// ⏳ 실시간 디데이 타이머 연산 스크립트 (최종 매칭 호환 버전)
function countUpWedding() {
    // 하이픈 대신 슬래시를 활용하여 iOS 모바일 환경 브라우저까지 완벽히 호환시킵니다.
    const finalTargetDate = new Date("2027/01/16 16:40:00").getTime();
    
    setInterval(function() {
        const now = new Date().getTime();
        const distance = finalTargetDate - now;
        
        // index.html 본문에 설계된 id="dday-counter"와 정확히 이름 일치
        const ddayBadge = document.getElementById("dday-counter");
        
        // 예식 당일이거나 날짜가 지났을 때 처리
        if (distance < 0) {
            if (ddayBadge) ddayBadge.innerText = "D-DAY ♡ 축하해주셔서 감사합니다";
            document.getElementById("timer-days").innerText = "00";
            document.getElementById("timer-hours").innerText = "00";
            document.getElementById("timer-min").innerText = "00";
            document.getElementById("timer-sec").innerText = "00";
            return;
        }
        
        // 시간 변환 연산
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // 화면 텍스트 매칭
        if (ddayBadge) {
            ddayBadge.innerText = `D - ${days}`;
        }
        
        document.getElementById("timer-days").innerText = String(days).padStart(2, '0');
        document.getElementById("timer-hours").innerText = String(hours).padStart(2, '0');
        document.getElementById("timer-min").innerText = String(minutes).padStart(2, '0');
        document.getElementById("timer-sec").innerText = String(seconds).padStart(2, '0');
        
    }, 1000);
}

// 🔍 사진 크게 보기 (모달 팝업) 기능
        function openModal(src) {
            const modal = document.getElementById("image-modal");
            const modalImg = document.getElementById("modal-img");
            if (modal && modalImg) {
                modal.style.display = "flex";
                modalImg.src = src;
            }
        }

        // ❌ 팝업창 닫기 기능
        function closeModal() {
            const modal = document.getElementById("image-modal");
            if (modal) {
                modal.style.display = "none";
            }
        }

// 4. 갤러리 메인 이미지 변경 함수
function changeImage(element) {
    const mainImg = document.getElementById('main-gallery-target');
    mainImg.src = element.src;
    
    // 전체 썸네일 액티브 효과 해제 후 선택된 이미지만 부여
    document.querySelectorAll('.thumb-img').forEach(img => img.classList.remove('active'));
    element.classList.add('active');
}

// 5. 계좌번호 클립보드 복사 함수
function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("계좌번호가 복사되었습니다.");
    }).catch(err => {
        alert("복사 실패! 계좌번호를 길게 눌러 직접 복사해주세요.");
    });
}

// 6. 예식장 네비게이션 연동 좌표 데이터 설정
const destinationName = "웨딩시그니처 합정";
const destLat = 37.55257044184424;  // 실제 예식장의 위도값 입력 필수
const destLng = 126.91731872982476; // 실제 예식장의 경도값 입력 필수

function goKakaoNavi() {
    const url = `https://map.kakao.com/link/to/${encodeURIComponent(destinationName)},${destLat},${destLng}`;
    window.open(url, '_blank');
}

function goTmap() {
    // 기본 스마트폰 네이버 지도 웹 브라우저 안내 백업 링크
    const fallbackUrl = `https://map.naver.com/v5/search/${encodeURIComponent(destinationName)}`;
    window.open(fallbackUrl, '_blank');
}

// 7. 네이버 지도 초기화 생성
function initMap() {
    var mapOptions = {
        center: new naver.maps.LatLng(destLat, destLng),
        zoom: 15,
        zoomControl: true // 확대 축소 컨트롤 바 노출
    };
    var map = new naver.maps.Map('naver-map', mapOptions);
    
    var marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(destLat, destLng),
        map: map
    });
}

// ⏳ 실시간 디데이 타이머 연산 스크립트
function countUpWedding() {
    // 하이픈(-) 대신 슬래시(/)를 사용하여 모든 모바일/기기 호환성을 완벽하게 맞춥니다.
    const finalTargetDate = new Date("2027/01/16T16:40:00").getTime();
    
    setInterval(function() {
        const now = new Date().getTime();
        const distance = finalTargetDate - now;
        
        // 💡 [수정] index.html의 id="dday-count"와 똑같이 하이픈(-)으로 맞춰줍니다.
        const ddayBadge = document.getElementById("dday-count");
        
        // 예식 당일이거나 날짜가 지났을 때 처리
        if (distance < 0) {
            if (ddayBadge) ddayBadge.innerText = "D-DAY ♡ 축하해주셔서 감사합니다";
            document.getElementById("timer-days").innerText = "00";
            document.getElementById("timer-hours").innerText = "00";
            document.getElementById("timer-min").innerText = "00";
            document.getElementById("timer-sec").innerText = "00";
            return;
        }
        
        // 시간 변환 연산
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // 화면 텍스트 매칭 (한 자릿수일 때 앞에 0 붙이기)
        if (ddayBadge) {
            ddayBadge.innerText = `D - ${days}`;
        }
        
        document.getElementById("timer-days").innerText = String(days).padStart(2, '0');
        document.getElementById("timer-hours").innerText = String(hours).padStart(2, '0');
        document.getElementById("timer-min").innerText = String(minutes).padStart(2, '0');
        document.getElementById("timer-sec").innerText = String(seconds).padStart(2, '0');
        
    }, 1000);

// 페이지가 열릴 때 타이머 실행시키기
countUpWedding();
        }

        // 페이지가 열릴 때 타이머 실행시키기
        countUpWedding();


// 🔍 [추가] 갤러리 사진 크게 보기 (모달 팝업) 함수
function openModal(src) {
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    if (modal && modalImg) {
        modal.style.display = "flex";
        modalImg.src = src;
    }
}

// ❌ [추가] 팝업창 닫기 함수
function closeModal() {
    const modal = document.getElementById("image-modal");
    if (modal) {
        modal.style.display = "none";
    }
}
