let cube = document.querySelector('.cube');
let isDragging = false;
let currentRotation = { x: 0, y: 0 };
let startPosition = { x: 0, y: 0 };
let currentZoom = -100;
let isDarkTheme = false;

const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.innerHTML = '🌙';
document.body.appendChild(themeToggle);

themeToggle.addEventListener('click', () => {
    isDarkTheme = !isDarkTheme;
    themeToggle.innerHTML = isDarkTheme ? '☀️' : '🌙';
    document.body.classList.toggle('dark-theme');
});

const starsContainer = document.createElement('div');
starsContainer.className = 'stars';
document.body.appendChild(starsContainer);

document.body.style.userSelect = 'none';

document.addEventListener('mousedown', startDragging);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', stopDragging);
document.addEventListener('wheel', handleZoom);

function startDragging(e) {
    isDragging = true;
    startPosition = {
        x: e.clientX,
        y: e.clientY
    };
}

function drag(e) {
    if (!isDragging) return;

    const deltaX = e.clientX - startPosition.x;
    const deltaY = e.clientY - startPosition.y;

    currentRotation.x -= deltaY * 0.5;
    currentRotation.y += deltaX * 0.5;

    updateCubeTransform();

    startPosition = {
        x: e.clientX,
        y: e.clientY
    };
}

function stopDragging() {
    isDragging = false;
}

function handleZoom(e) {
    e.preventDefault();
    currentZoom = Math.max(-150, Math.min(750, currentZoom - e.deltaY * 0.5));
    updateCubeTransform();
}

function updateCubeTransform() {
    cube.style.transform = `translateZ(${currentZoom}px) rotateX(${currentRotation.x}deg) rotateY(${currentRotation.y}deg)`;
}