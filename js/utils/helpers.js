export function preventDoubleClick(buttonId, isProcessing) {
    const btn = document.getElementById(buttonId);
    const input = document.getElementById('topic-input');
    if (btn) {
        btn.disabled = isProcessing;
        btn.classList.toggle('opacity-50', isProcessing);
        btn.classList.toggle('cursor-not-allowed', isProcessing);
        btn.textContent = isProcessing ? 'กำลังประชุม...' : 'เริ่มการประชุม';
    }
    if (input) {
        input.disabled = isProcessing;
    }
}

export function setupAutoRefresh() {
    // 3,600,000 milliseconds = 1 ชั่วโมง
    setTimeout(() => {
        window.location.reload();
    }, 3600000);
}
