// 1. Fondo de Cielo Estrellado y Partículas Flotantes
const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const stars = Array.from({ length: 160 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5 + 0.5,
    alpha: Math.random(),
    speed: Math.random() * 0.015 + 0.005
}));

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0) star.speed = -star.speed;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.alpha)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(animateStars);
}
animateStars();

// 2. Generador de Ramillete de Girasoles en Maceta
const bouquetContainer = document.getElementById('bouquet-container');
const potOriginX = 200;
const potSoilY = 325;     
const trunkTopY = 250;    

const flowersData = [
    { x: 200, y: 105, size: 38, delay: 200, duration: 1800 },
    { x: 175, y: 135, size: 35, delay: 350, duration: 1750 },
    { x: 225, y: 130, size: 35, delay: 400, duration: 1750 },
    { x: 200, y: 160, size: 37, delay: 480, duration: 1700 },
    { x: 145, y: 115, size: 34, delay: 550, duration: 1800 },
    { x: 255, y: 120, size: 34, delay: 600, duration: 1800 },
    { x: 200, y: 65,  size: 36, delay: 700, duration: 1950 },
    { x: 155, y: 75,  size: 33, delay: 750, duration: 1900 },
    { x: 245, y: 80,  size: 33, delay: 800, duration: 1900 },
    { x: 110, y: 105, size: 32, delay: 880, duration: 1850 },
    { x: 290, y: 110, size: 32, delay: 920, duration: 1850 },
    { x: 115, y: 150, size: 33, delay: 1000, duration: 1750 },
    { x: 285, y: 155, size: 33, delay: 1050, duration: 1750 },
    { x: 75,  y: 180, size: 29, delay: 1150, duration: 1700 },
    { x: 325, y: 185, size: 29, delay: 1200, duration: 1700 },
    { x: 150, y: 195, size: 34, delay: 1100, duration: 1650 },
    { x: 250, y: 200, size: 34, delay: 1150, duration: 1650 },
    { x: 100, y: 230, size: 30, delay: 1250, duration: 1550 },
    { x: 300, y: 235, size: 30, delay: 1300, duration: 1550 },
    { x: 175, y: 235, size: 33, delay: 1350, duration: 1500 },
    { x: 225, y: 240, size: 33, delay: 1400, duration: 1500 },
    { x: 135, y: 255, size: 28, delay: 1450, duration: 1450 },
    { x: 265, y: 260, size: 28, delay: 1500, duration: 1450 },
    { x: 180, y: 95,  size: 31, delay: 650, duration: 1850 },
    { x: 220, y: 95,  size: 31, delay: 680, duration: 1850 },
    { x: 130, y: 160, size: 30, delay: 950, duration: 1700 },
    { x: 270, y: 165, size: 30, delay: 980, duration: 1700 }
];

function generateBouquet() {
    bouquetContainer.innerHTML = '';

    flowersData.forEach((item, index) => {
        const itemGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        const stemOffsetFromCenter = (index % 5 - 2) * 4;
        const startX = potOriginX + stemOffsetFromCenter;
        
        const ctrl1X = startX;
        const ctrl1Y = trunkTopY + 20;
        const ctrl2X = startX + (item.x - startX) * 0.55;
        const ctrl2Y = item.y + (potSoilY - item.y) * 0.45;

        const pathData = `M ${startX} ${potSoilY} C ${ctrl1X} ${ctrl1Y}, ${ctrl2X} ${ctrl2Y}, ${item.x} ${item.y}`;

        const stem = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        stem.setAttribute('d', pathData);
        stem.setAttribute('fill', 'none');
        stem.setAttribute('stroke', 'url(#stem-grad)');
        stem.setAttribute('stroke-width', Math.max(3.5, item.size / 6));
        stem.setAttribute('stroke-linecap', 'round');

        const pathLength = 400;
        stem.style.strokeDasharray = pathLength;
        stem.style.strokeDashoffset = pathLength;
        stem.style.transition = `stroke-dashoffset ${item.duration}ms cubic-bezier(0.25, 1, 0.5, 1) ${item.delay}ms`;

        itemGroup.appendChild(stem);

        const flowerHead = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        flowerHead.style.transformOrigin = `${item.x}px ${item.y}px`;
        flowerHead.style.transform = `translate(${startX - item.x}px, ${potSoilY - item.y}px) scale(0) rotate(-25deg)`;
        flowerHead.style.transition = `transform ${item.duration}ms cubic-bezier(0.25, 1, 0.5, 1) ${item.delay}ms`;

        const petalCount = 14;
        for (let p = 0; p < petalCount; p++) {
            const angle = (360 / petalCount) * p;
            const petal = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
            petal.setAttribute('cx', item.x);
            petal.setAttribute('cy', item.y - item.size * 0.65);
            petal.setAttribute('rx', item.size * 0.22);
            petal.setAttribute('ry', item.size * 0.65);
            petal.setAttribute('fill', 'url(#petal-grad)');
            petal.setAttribute('transform', `rotate(${angle}, ${item.x}, ${item.y})`);
            flowerHead.appendChild(petal);
        }

        const center = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        center.setAttribute('cx', item.x);
        center.setAttribute('cy', item.y);
        center.setAttribute('r', item.size * 0.38);
        center.setAttribute('fill', 'url(#center-grad)');
        center.setAttribute('stroke', '#854d0e');
        center.setAttribute('stroke-width', '1');
        flowerHead.appendChild(center);

        const innerRing = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        innerRing.setAttribute('cx', item.x);
        innerRing.setAttribute('cy', item.y);
        innerRing.setAttribute('r', item.size * 0.24);
        innerRing.setAttribute('fill', 'none');
        innerRing.setAttribute('stroke', '#fbbf24');
        innerRing.setAttribute('stroke-width', '1');
        innerRing.setAttribute('stroke-dasharray', '2 2');
        innerRing.setAttribute('opacity', '0.65');
        flowerHead.appendChild(innerRing);

        itemGroup.appendChild(flowerHead);
        bouquetContainer.appendChild(itemGroup);

        setTimeout(() => {
            stem.style.strokeDashoffset = '0';
            flowerHead.style.transform = `translate(0px, 0px) scale(1) rotate(0deg)`;
        }, 80);
    });
}

// 3. Reproductor de Música de Fondo
const musicBtn = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');
let isPlaying = false;

function playAudio() {
    if (!bgMusic) return;
    
    bgMusic.play().then(() => {
        isPlaying = true;
        if (musicBtn) {
            musicBtn.classList.add('bg-amber-500/40', 'animate-pulse');
        }
    }).catch(error => {
        console.warn("Autoplay bloqueado o archivo no encontrado:", error);
    });
}

function pauseAudio() {
    if (!bgMusic) return;
    bgMusic.pause();
    isPlaying = false;
    if (musicBtn) {
        musicBtn.classList.remove('bg-amber-500/40', 'animate-pulse');
    }
}

function toggleAudio() {
    if (isPlaying) {
        pauseAudio();
    } else {
        playAudio();
    }
}

if (musicBtn) {
    musicBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleAudio();
    });
}

// 4. Modal Carta Dedicatoria
const modal = document.getElementById('modal');
const modalCard = document.getElementById('modal-card');
const openBtn = document.getElementById('open-btn');
const closeBtn = document.getElementById('close-btn');
const replayBtn = document.getElementById('replay-btn');

function openModal() {
    // Activa la música automáticamente al dar clic en abrir
    if (!isPlaying) {
        playAudio();
    }

    modal.classList.remove('pointer-events-none');
    modal.classList.remove('opacity-0');
    modalCard.classList.remove('scale-95');
    modalCard.classList.add('scale-100');
}

function closeModal() {
    modal.classList.add('opacity-0');
    modalCard.classList.remove('scale-100');
    modalCard.classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('pointer-events-none');
    }, 300);
}

if (openBtn) openBtn.addEventListener('click', openModal);
if (closeBtn) closeBtn.addEventListener('click', closeModal);
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

if (replayBtn) {
    replayBtn.addEventListener('click', () => {
        generateBouquet();
    });
}

// Iniciar al cargar
window.onload = function() {
    generateBouquet();
};