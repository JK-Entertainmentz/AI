import { setupAutoRefresh } from './utils/helpers.js';
import { runMeeting } from './workflow/meeting.js';
import { renderNavbar } from './components/navbar.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. ตั้งค่าหน้ารีเฟรชตัวเองทุก 1 ชั่วโมง
    setupAutoRefresh();
    
    // 2. โหลดส่วน Navbar
    renderNavbar('navbar-container');
    
    // 3. จัดการ Event การ Submit Form
    const form = document.getElementById('meeting-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const topicInput = document.getElementById('topic-input');
            const topic = topicInput.value.trim();
            
            if(topic !== '') {
                runMeeting(topic);
            }
        });
    }
});
