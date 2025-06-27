
        // Loading Screen





        
        window.addEventListener('load', function() {
            setTimeout(() => {
                document.getElementById('loading').classList.add('hidden');
            }, 1000);
        });

        // Custom Cursor
        const cursor = document.getElementById('cursor');
        const cursorFollower = document.getElementById('cursor-follower');

        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
            
            setTimeout(() => {
                cursorFollower.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
            }, 100);
        });

        // Typing Animation
        const phrases = [
            'Building Amazing Web Experiences',
            'Creating Interactive React Apps',
            'Developing AI-Powered Solutions',
            'Crafting Beautiful User Interfaces'
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typedElement = document.getElementById('typed-element');

        function typeAnimation() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500;
            }

            setTimeout(typeAnimation, typeSpeed);
        }

        typeAnimation();

        // Floating Particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 50;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
                particlesContainer.appendChild(particle);
            }
        }

        createParticles();

        // Scroll Animations
        function animateOnScroll() {
            const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
        }

        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll(); // Initial check

        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });

        // Header Background on Scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(15, 23, 42, 0.95)';
            } else {
                header.style.background = 'rgba(15, 23, 42, 0.8)';
            }
        });

        // Contact Form
       document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const form = this;
  const submitBtn = form.querySelector('.submit-btn');
  const originalText = submitBtn.textContent;

  submitBtn.textContent = 'Sending...';
  submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
  submitBtn.disabled = true;

  const data = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        submitBtn.textContent = 'Message Sent! ✓';
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = 'var(--gradient)';
          submitBtn.disabled = false;
          form.reset();
        }, 2000);
      } else {
        submitBtn.textContent = 'Error ❌';
        submitBtn.style.background = '#ef4444';
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = 'var(--gradient)';
          submitBtn.disabled = false;
        }, 2000);
      }
    })
    .catch(error => {
      submitBtn.textContent = 'Error ❌';
      submitBtn.style.background = '#ef4444';
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = 'var(--gradient)';
        submitBtn.disabled = false;
      }, 2000);
    });
});


        // Interactive Elements
        document.querySelectorAll('.skill-item, .project-card, .social-link').forEach(element => {
            element.addEventListener('mouseenter', function() {
                cursor.style.transform = cursor.style.transform + ' scale(1.5)';
                cursorFollower.style.transform = cursorFollower.style.transform + ' scale(1.2)';
            });

            element.addEventListener('mouseleave', function() {
                cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
                cursorFollower.style.transform = cursorFollower.style.transform.replace(' scale(1.2)', '');
            });
        });

        // Parallax Effect for Floating Shapes
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const shapes = document.querySelectorAll('.shape');
            
            shapes.forEach((shape, index) => {
                const speed = 0.5 + (index * 0.1);
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Add magnetic effect to buttons
        document.querySelectorAll('.cta-button, .submit-btn').forEach(button => {
            button.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) translateY(-3px) scale(1.05)`;
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });