export function appendChatMessage(containerId, agentName, message) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // ลบข้อความเริ่มต้นถ้ามี
    if (container.querySelector('.text-gray-400')) {
        container.innerHTML = '';
    }

    const msgDiv = document.createElement('div');
    msgDiv.className = 'border-b border-gray-100 py-3 mb-2 animate-fade-in';
    
    // แปลง Markdown เบื้องต้นให้เป็น HTML อัตโนมัติ (ตัวหนา)
    const formattedMessage = message.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold text-gray-900">$1</span>');

    msgDiv.innerHTML = `
        <div class="font-bold text-gray-900 mb-1 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-gray-800"></span>
            ${agentName}
        </div>
        <div class="text-gray-600 whitespace-pre-wrap leading-relaxed pl-4 text-sm">${formattedMessage}</div>
    `;
    
    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
}
