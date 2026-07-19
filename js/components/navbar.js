export function renderNavbar(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = `
        <header class="bg-white border-b border-gray-200">
            <div class="container mx-auto px-4 h-16 flex items-center justify-between max-w-5xl">
                <div class="font-bold text-xl tracking-tight text-gray-900">
                    AI<span class="text-gray-400">Company</span>
                </div>
                <nav class="hidden md:flex space-x-6 text-sm font-medium text-gray-500">
                    <a href="#" class="text-gray-900">Dashboard</a>
                    <a href="#" class="hover:text-gray-900 transition-colors">Team</a>
                    <a href="#" class="hover:text-gray-900 transition-colors">Reports</a>
                </nav>
            </div>
        </header>
    `;
}
