 // Preloader
        window.addEventListener('load', function() {
            setTimeout(function() {
                document.querySelector('.preloader').style.display = 'none';
            }, 2000);
        });

        // Counter animation
        function animateCounter(element, target) {
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current);
                }
            }, 20);
        }

        // Initialize counters when in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('.timer');
                    counters.forEach(counter => {
                        const target = parseInt(counter.textContent);
                        animateCounter(counter, target);
                    });
                }
            });
        }, { threshold: 0.5 });

        // Observe sections with counters
        document.querySelectorAll('#about, .fun-factor-area').forEach(section => {
            observer.observe(section);
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Typewriter animation for banner h2
        (function() {
            const typedEl = document.getElementById('typed');
            const phrases = ['Web Developer', '& Designer'];
            if(!typedEl) return;

            const typeSpeed = 80;
            const deleteSpeed = 40;
            const delayAfterTyped = 1400;

            let phraseIndex = 0;
            let charIndex = 0;
            let deleting = false;

            function loop() {
                const current = phrases[phraseIndex];

                if (!deleting) {
                    charIndex++;
                    typedEl.textContent = current.slice(0, charIndex);
                    if (charIndex === current.length) {
                        deleting = true;
                        setTimeout(loop, delayAfterTyped);
                        return;
                    }
                } else {
                    charIndex--;
                    typedEl.textContent = current.slice(0, charIndex);
                    if (charIndex === 0) {
                        deleting = false;
                        phraseIndex = (phraseIndex + 1) % phrases.length;
                    }
                }

                setTimeout(loop, deleting ? deleteSpeed : typeSpeed);
            }

            // start when DOM ready
            document.addEventListener('DOMContentLoaded', function() {
                setTimeout(loop, 300);
            });
        })();