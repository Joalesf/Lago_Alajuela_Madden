const carruselTrack = document.querySelector('.carrusel-track');
    if (carruselTrack) {
        const slides = document.querySelectorAll('.carrusel-slide');
        const dotsContainer = document.querySelector('.carrusel-dots');
        const totalSlides = slides.length; 
        let currentIndex = 0;
        const intervalTime = 4300; 
        let carruselInterval; 

        function createDots() {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    moveToSlide(i);
                    resetCarruselAutoAdvance(); 
                });
                dotsContainer.appendChild(dot);
            }
        }

        function moveToSlide(index) {
            carruselTrack.style.transform = `translateX(-${index * (100 / totalSlides)}%)`; 
            
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if(dotsContainer.children[i]) {
                    dotsContainer.children[i].classList.remove('active');
                }
            });

            if(slides[index]) slides[index].classList.add('active');
            if(dotsContainer.children[index]) dotsContainer.children[index].classList.add('active');
            currentIndex = index;
        }

        function nextSlide() {
            let nextIndex = (currentIndex + 1) % totalSlides;
            moveToSlide(nextIndex);
        }

        function startCarruselAutoAdvance() {
            carruselInterval = setInterval(nextSlide, intervalTime);
        }

        function resetCarruselAutoAdvance() {
            clearInterval(carruselInterval);
            startCarruselAutoAdvance();
        }

        createDots();
        moveToSlide(0); 
        startCarruselAutoAdvance();
    }

    // 4. Script para el Carrusel de Videos (Reels) - (Manual)
    const reelsTrack = document.querySelector('.reels-track');
    if (reelsTrack) {
        const reelItems = document.querySelectorAll('.reel-item');
        const reelDotsContainer = document.querySelector('.reels-dots');
        const reelVideos = document.querySelectorAll('.reel-item video');
        const totalReels = reelItems.length;
        let reelIndex = 0;
        
        function createReelDots() {
            for (let i = 0; i < totalReels; i++) {
                const dot = document.createElement('span');
                dot.classList.add('reel-dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    moveToReel(i);
                });
                reelDotsContainer.appendChild(dot);
            }
        }

        function moveToReel(index) {
            reelVideos.forEach((video, i) => {
                video.pause();
                if (i !== index) {
                    video.currentTime = 0; 
                }
            });
            
            reelsTrack.style.transform = `translateX(-${index * (100 / totalReels)}%)`;
            
            document.querySelectorAll('.reel-dot').forEach((dot) => {
                dot.classList.remove('active');
            });

            document.querySelectorAll('.reel-dot')[index].classList.add('active');
            reelIndex = index;
            
            reelVideos[reelIndex].play();
        }

        document.querySelector('.reels-prev').addEventListener('click', () => {
            let prevIndex = (reelIndex - 1 + totalReels) % totalReels;
            moveToReel(prevIndex);
        });

        document.querySelector('.reels-next').addEventListener('click', () => {
            let nextIndex = (reelIndex + 1) % totalReels;
            moveToReel(nextIndex);
        });

        const track = document.querySelector('.carrusel-track');
        const slides = document.querySelectorAll('.carrusel-slide');
        const prevBtn = document.querySelector('.carrusel-btn.prev');
        const nextBtn = document.querySelector('.carrusel-btn.next');

        let index = 0;

        function updateCarousel() {
        const width = slides[0].offsetWidth;
        track.style.transform = `translateX(-${index * width}px)`;
        }

        nextBtn.addEventListener('click', () => {
        index = (index + 1) % slides.length;
        updateCarousel();
        }); 

        prevBtn.addEventListener('click', () => {
        index = (index - 1 + slides.length) % slides.length;
        updateCarousel();
        });

        window.addEventListener('resize', updateCarousel);

        createReelDots();
        moveToReel(0); 
    };