// Mobile nav toggle
const navHeader = document.querySelector('.nav-header');
const navToggle = document.querySelector('.nav-toggle');
navToggle?.addEventListener('click', () => {
  navHeader.classList.toggle('nav-open');
});

// Close nav when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navHeader.classList.remove('nav-open'));
});

// Animated stat counters
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1600;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

// Intersection Observer for counters & reveal animations
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

// Add reveal class to key elements
const revealTargets = [
  '.service-card',
  '.project-card',
  '.skill-group',
  '.stat-card',
  '.section-title',
  '.section-sub',
  '.contact-heading',
];
revealTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 3 === 1) el.classList.add('reveal-delay-1');
    if (i % 3 === 2) el.classList.add('reveal-delay-2');
    revealObserver.observe(el);
  });
});

// Contact form — Formspree AJAX submission
document.getElementById('contactForm')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  const original = btn.textContent;

  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const res = await fetch(this.action, {
      method: 'POST',
      body: new FormData(this),
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      btn.textContent = 'Message sent! ✓';
      btn.style.background = '#22C55E';
      this.reset();
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    } else {
      throw new Error('Send failed');
    }
  } catch {
    btn.textContent = 'Failed — try emailing directly';
    btn.style.background = '#EF4444';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.disabled = false;
    }, 4000);
  }
});

// Timeline expand/collapse
document.querySelectorAll('.timeline-item').forEach(item => {
  item.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.timeline-item').forEach(i => i.classList.remove('open'));
    // Toggle clicked
    if (!isOpen) item.classList.add('open');
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const onScroll = () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + section.id ? 'var(--orange)' : '';
      });
    }
  });
};
window.addEventListener('scroll', onScroll, { passive: true });
