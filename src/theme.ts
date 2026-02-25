export function initTheme() {
    const body = document.body;
    const themeToggleBtn = document.getElementById('theme-toggle-btn') as HTMLButtonElement;

    function updateToggleButton(isDark: boolean) {
        if (themeToggleBtn) {
            themeToggleBtn.textContent = isDark ? '🌓' : '☀️';
        }
    }

    function toggleTheme() {
        body.classList.toggle('dark');
        const isDarkMode = body.classList.contains('dark');
        updateToggleButton(isDarkMode);
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }

    // Initial theme setup
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.remove('dark');
        updateToggleButton(false);
    } else {
        body.classList.add('dark');
        updateToggleButton(true);
    }

    if (themeToggleBtn) {
        themeToggleBtn.onclick = toggleTheme;
    }
}
