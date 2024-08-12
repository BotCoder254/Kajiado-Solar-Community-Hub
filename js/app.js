  // DOM elements
  const navbar = document.getElementById('navbar');
  const logo = document.getElementById('logo');
  const brand = document.getElementById('brand');
  const darkModeToggle = document.getElementById('darkModeToggle');
  const languageToggle = document.getElementById('languageToggle');
  const mobileMenuButton = document.getElementById('mobileMenuButton');
  const mobileMenu = document.getElementById('mobileMenu');
  const notificationCount = document.getElementById('notificationCount');
  const mainTitle = document.getElementById('mainTitle');
  const mainDescription = document.getElementById('mainDescription');
  const ctaButton = document.getElementById('ctaButton');
  const watchVideoButton = document.getElementById('watchVideoButton');
  const heroSection = document.getElementById('hero');

  // State
  let isDarkMode = false;
  let currentLanguage = 'en';

  // Functions
//   function toggleDarkMode() {
//       isDarkMode = !isDarkMode;
//       document.body.classList.toggle('dark-mode');
//       navbar.classList.toggle('bg-gray-900');
//       darkModeToggle.innerHTML = isDarkMode ? '<i class="bx bx-sun text-xl"></i>' : '<i class="bx bx-moon text-xl"></i>';
      
//       if (isDarkMode) {
//           document.querySelectorAll('.text-gray-600').forEach(el => el.classList.replace('text-gray-600', 'text-gray-300'));
//       } else {
//           document.querySelectorAll('.text-gray-300').forEach(el => el.classList.replace('text-gray-300', 'text-gray-600'));
//       }
//   }

//   function toggleLanguage() {
//       currentLanguage = currentLanguage === 'en' ? 'sw' : 'en';
//       if (currentLanguage === 'sw') {
//           mainTitle.textContent = 'Kuwezesha Jamii na Nishati ya Jua';
//           mainDescription.textContent = 'Suluhisho endelevu kwa mustakabali mwema';
//           ctaButton.textContent = 'Jifunze Zaidi';
//           watchVideoButton.textContent = 'Tazama Video';
//       } else {
//           mainTitle.textContent = 'Empowering Communities with Solar Energy';
//           mainDescription.textContent = 'Sustainable solutions for a brighter future';
//           ctaButton.textContent = 'Learn More';
//           watchVideoButton.textContent = 'Watch Video';
//       }
//   }

  function toggleMobileMenu() {
      mobileMenu.classList.toggle('hidden');
      if (!mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('slide-in');
      }
  }

  // Parallax effect for hero section
  function parallaxEffect() {
      const scrollPosition = window.pageYOffset;
      heroSection.style.backgroundPositionY = scrollPosition * 0.7 + 'px';
  }

  // Event listeners
  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
          navbar.classList.add('bg-opacity-90', 'backdrop-filter', 'backdrop-blur-lg');
      } else {
          navbar.classList.remove('bg-opacity-90', 'backdrop-filter', 'backdrop-blur-lg');
      }
      parallaxEffect();
  });

  logo.addEventListener('mouseover', () => {
      gsap.to(logo, { rotation: 360, duration: 1 });
  });

  darkModeToggle.addEventListener('click', toggleDarkMode);
  languageToggle.addEventListener('click', toggleLanguage);
  mobileMenuButton.addEventListener('click', toggleMobileMenu);

  // Notification animation
  setInterval(() => {
      gsap.to(notificationCount, { scale: 1.2, duration: 0.2, yoyo: true, repeat: 1 });
  }, 5000);

  // Initial animations
  gsap.from(mainTitle, { opacity: 0, y: 50, duration: 1, delay: 0.5 });
  gsap.from(mainDescription, { opacity: 0, y: 50, duration: 1, delay: 0.7 });
  gsap.from(ctaButton, { opacity: 0, y: 50, duration: 1, delay: 0.9 });
  gsap.from(watchVideoButton, { opacity: 0, y: 50, duration: 1, delay: 1.1 });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });

//   photo gallery 


// Initialize Masonry layout
var grid = document.querySelector('#gallery');
var masonry = new Masonry(grid, {
    itemSelector: '.gallery-item',
    columnWidth: '.gallery-item',
    percentPosition: true
});

// Initialize LightGallery
lightGallery(document.getElementById('gallery'), {
    selector: '.gallery-item a',
    plugins: [lgZoom, lgThumbnail],
    speed: 500,
    thumbnail: true,
    zoomFromOrigin: true,
    allowMediaOverlap: true,
    toggleThumb: true
});

// Filtering functionality
const filterButtons = document.querySelectorAll('[data-filter]');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        const items = document.querySelectorAll('.gallery-item');
        
        items.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });

        masonry.layout();
    });
});

// Infinite scroll simulation (for demonstration)
let page = 1;
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        loadMoreItems();
    }
});

function loadMoreItems() {
    // Simulated content loading (replace with actual API call in production)
    const newItems = [
        { src: `https://picsum.photos/400/300?random=${page * 3 + 1}`, category: 'residential' },
        { src: `https://picsum.photos/400/300?random=${page * 3 + 2}`, category: 'community' },
        { src: `https://picsum.photos/400/300?random=${page * 3 + 3}`, category: 'education' }
    ];

    newItems.forEach(item => {
        const newElement = document.createElement('div');
        newElement.className = 'gallery-item fade-in';
        newElement.setAttribute('data-category', item.category);
        newElement.innerHTML = `
            <a href="${item.src.replace('400/300', '800/600')}" class="block relative overflow-hidden rounded-lg shadow-lg">
                <img src="${item.src}" alt="Solar Project" class="w-full h-auto object-cover">
                <div class="overlay absolute inset-0 bg-black bg-opacity-50 opacity-0 flex items-center justify-center">
                    <div class="text-white text-center">
                        <h3 class="text-xl font-semibold mb-2">${item.category.charAt(0).toUpperCase() + item.category.slice(1)} Project</h3>
                        <p class="text-sm">New Installation</p>
                    </div>
                </div>
            </a>
        `;
        document.getElementById('gallery').appendChild(newElement);
    });

    masonry.reloadItems();
    masonry.layout();

    // Refresh LightGallery
    const gallery = document.getElementById('gallery');
    gallery.dispatchEvent(new Event('refresh.mdb.lightbox'));

    page++;
}