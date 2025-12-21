const WEB_APP_URL = "https://script.google.com/macros/library/d/1Rge-asU2HqWXLObqpMt5bv9o5WEaCAcpdXsMN_bTCvy9aHqE8MxvPwJL/3"; // TODO: Update this

document.getElementById('date-display').innerText = new Date().toLocaleDateString();

async function checkStatus() {
    if (WEB_APP_URL.includes("YOUR_WEB_APP_URL")) {
        alert("app.js 링크 설정 필요");
        return;
    }

    try {
        const res = await fetch(WEB_APP_URL);
        const data = await res.json();
        updateCard('gout', data.gout);
        updateCard('calcium', data.calcium);
    } catch (e) {
        console.error(e);
        document.querySelectorAll('.status-display').forEach(el => {
            el.innerText = "연결 실패 ⚠️ (새로고침 하거나 콘솔 확인)";
            el.style.color = "red";
        });
    }
}

function updateCard(type, status) {
    const card = document.getElementById(`card-${type}`);
    const statusDisp = card.querySelector('.status-display');
    const btn = card.querySelector('.action-btn');

    card.className = "card"; // Reset
    if (status === 'Taken') {
        card.classList.add('taken');
        statusDisp.innerText = "복용 완료 ✅";
        btn.innerText = "완료";
        btn.disabled = true;
    } else {
        card.classList.add('not-taken');
        statusDisp.innerText = "미복용";
        btn.innerText = "먹었어요! 💊";
        btn.disabled = false;
    }
}

async function takeMedicine(type) {
    const btn = document.querySelector(`#card-${type} .action-btn`);
    btn.disabled = true;
    btn.innerText = "...";

    try {
        await fetch(WEB_APP_URL, {
            method: 'POST',
            body: JSON.stringify({ type: type })
        });
        updateCard(type, 'Taken');
    } catch (e) {
        alert("실패");
        btn.disabled = false;
    }
}

checkStatus();