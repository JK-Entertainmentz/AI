export function renderSummary(containerId, text) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // แปลงรูปแบบ Markdown ให้อ่านง่ายขึ้น
    let formattedText = text
        .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold text-gray-900 mt-6 mb-2">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-gray-900 mt-8 mb-3 border-b pb-2">$1</h2>')
        .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-gray-900 mt-8 mb-4">$1</h1>')
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900">$1</strong>')
        .replace(/^\* (.*$)/gim, '<li class="ml-4 list-disc marker:text-gray-400">$1</li>');

    container.innerHTML = `
        <div class="bg-white p-2 animate-fade-in">
            ${formattedText}
        </div>
    `;
}
