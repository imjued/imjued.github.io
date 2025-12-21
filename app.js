// TODO: 여기에 3단계에서 얻은 본인의 Web App URL을 붙여넣으세요!
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbw_4ci_Fv2dHZ2V2ZrAWOv7DFOmU39Att51MRSTK2gIdQ3SbjuOTwrsgoaW20_-aBc/exec";
const statusCard = document.getElementById('status-card');
const statusText = document.getElementById('status-text');
const statusIcon = document.querySelector('.status-icon');
const checkBtn = document.getElementById('check-btn');
const dateDisplay = document.getElementById('date-display');
// 오늘 날짜 표시
const today = new Date();
dateDisplay.innerText = today.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });
// 초기 상태 확인
async function checkStatus() {
    if (WEB_APP_URL === "https://script.google.com/macros/s/AKfycbw_4ci_Fv2dHZ2V2ZrAWOv7DFOmU39Att51MRSTK2gIdQ3SbjuOTwrsgoaW20_-aBc/exec") {
        statusText.innerText = "설정 필요";
        statusIcon.innerText = "⚙️";
        alert("app.js 파일에서 WEB_APP_URL을 설정해주세요!");
        return;
    }
    statusCard.className = 'card loading';
    checkBtn.disabled = true;
    try {
        const response = await fetch(WEB_APP_URL);
        const data = await response.json();
        
        updateUI(data.status);
    } catch (error) {
        console.error('Error:', error);
        statusText.innerText = "오류 발생";
        statusIcon.innerText = "⚠️";
    }
}
function updateUI(status) {
    statusCard.className = 'card'; // 클래스 초기화
    
    if (status === 'Taken') {
        statusCard.classList.add('taken');
        statusText.innerText = "오늘 약을 드셨네요! 🎉";
        statusIcon.innerText = "✅";
        checkBtn.innerText = "완료됨";
        checkBtn.disabled = true;
        checkBtn.style.backgroundColor = '#ccc';
    } else {
        statusCard.classList.add('not-taken');
        statusText.innerText = "아직 약을 안 드셨나요?";
        statusIcon.innerText = "💊";
        checkBtn.innerText = "지금 먹었어요! 💊";
        checkBtn.disabled = false;
    }
}
// "약 먹었어요" 버튼 클릭 핸들러
checkBtn.addEventListener('click', async () => {
    checkBtn.disabled = true;
    checkBtn.innerText = "처리 중...";
    
    try {
        await fetch(WEB_APP_URL, {
            method: 'POST'
        });
        
        // 성공적으로 전송하면 UI 업데이트 (다시 조회하지 않고 즉시 반영)
        updateUI('Taken');
        
        // 축하 효과 (간단한 confetti 대신 alert로 대체하거나 CSS 애니메이션 활용)
        // alert("참 잘했어요! 알림이 중단됩니다.");
    } catch (error) {
        console.error('Error:', error);
        alert("오류가 발생했습니다. 다시 시도해주세요.");
        checkBtn.disabled = false;
        checkBtn.innerText = "지금 먹었어요! 💊";
    }
});
// 시작 시 상태 확인
checkStatus();