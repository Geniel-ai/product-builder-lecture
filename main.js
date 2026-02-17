document.addEventListener('DOMContentLoaded', () => {
    const drawBtn = document.getElementById('draw-btn');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const resultDiv = document.getElementById('result');
    const imageContainer = document.getElementById('image-container');
    const foodImage = document.getElementById('food-image'); // Get reference to the image element
    const body = document.body;

    const foodItems = ['피자', '치킨', '햄버거', '초밥', '파스타', '김치찌개', '된장찌개', '제육볶음'];
    
    // Mapping of food items to image paths/URLs
    const foodImages = {
        '피자': 'keram-pizza-346985_1280.jpg',
        '치킨': 'https://via.placeholder.com/400x300?text=Chicken', // Placeholder - replace with actual image path
        '햄버거': 'https://via.placeholder.com/400x300?text=Hamburger', // Placeholder - replace with actual image path
        '초밥': 'https://via.placeholder.com/400x300?text=Sushi',   // Placeholder - replace with actual image path
        '파스타': 'https://via.placeholder.com/400x300?text=Pasta',   // Placeholder - replace with actual image path
        '김치찌개': 'https://via.placeholder.com/400x300?text=Kimchi+Stew', // Placeholder - replace with actual image path
        '된장찌개': 'https://via.placeholder.com/400x300?text=Soybean+Paste+Stew', // Placeholder - replace with actual image path
        '제육볶음': 'https://via.placeholder.com/400x300?text=Jeyuk+Bokkeum' // Placeholder - replace with actual image path
    };

    function drawFood() {
        const randomIndex = Math.floor(Math.random() * foodItems.length);
        const selectedFood = foodItems[randomIndex];
        const selectedImage = foodImages[selectedFood];

        resultDiv.textContent = `오늘의 메뉴는... ${selectedFood}!`;
        
        if (selectedImage) {
            foodImage.src = selectedImage;
            imageContainer.style.display = 'block';
        } else {
            imageContainer.style.display = 'none';
        }
    }

    function toggleTheme() {
        body.classList.toggle('dark');
        const isDarkMode = body.classList.contains('dark');
        themeToggleBtn.textContent = isDarkMode ? 'White Mode' : 'Dark Mode';
    }

    drawBtn.addEventListener('click', drawFood);
    themeToggleBtn.addEventListener('click', toggleTheme);

    // 초기 추첨
    drawFood();
});
