    document.addEventListener('DOMContentLoaded', function() {
        const scroller = document.querySelector('.news-scroller');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const indicatorsContainer = document.querySelector('.scroll-indicators');
        
        if (!scroller || !prevBtn || !nextBtn) return;
      
        // Create scroll indicators
        const createIndicators = () => {
          indicatorsContainer.innerHTML = '';
          const cardCount = document.querySelectorAll('.news-card').length;
          const visibleCards = Math.floor(scroller.offsetWidth / 
            (document.querySelector('.news-card').offsetWidth + 
             parseInt(window.getComputedStyle(document.querySelector('.news-card')).marginRight)));
          
          // Only show indicators if not all cards are visible
          if (cardCount > visibleCards) {
            for (let i = 0; i < cardCount - visibleCards + 1; i++) {
              const indicator = document.createElement('div');
              indicator.classList.add('scroll-indicator');
              indicator.dataset.index = i;
              indicator.addEventListener('click', () => {
                scrollToIndex(i);
              });
              indicatorsContainer.appendChild(indicator);
            }
            updateIndicators();
          }
        };
      
        // Scroll to specific index
        const scrollToIndex = (index) => {
          const cardWidth = document.querySelector('.news-card').offsetWidth + 
            parseInt(window.getComputedStyle(document.querySelector('.news-card')).marginRight);
          scroller.scrollTo({
            left: index * cardWidth,
            behavior: 'smooth'
          });
        };
      
        // Update active indicator
        const updateIndicators = () => {
          const indicators = document.querySelectorAll('.scroll-indicator');
          if (indicators.length === 0) return;
          
          const scrollPosition = scroller.scrollLeft;
          const cardWidth = document.querySelector('.news-card').offsetWidth + 
            parseInt(window.getComputedStyle(document.querySelector('.news-card')).marginRight);
          const activeIndex = Math.round(scrollPosition / cardWidth);
          
          indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === activeIndex);
          });
        };
      
        // Initialize
        createIndicators();
        
        // Update on scroll and resize
        scroller.addEventListener('scroll', updateIndicators);
        window.addEventListener('resize', () => {
          createIndicators();
          updateButtons();
        });
      
        // Rest of your existing code...
        const getScrollAmount = () => {
          const firstCard = scroller.querySelector('.news-card');
          if (!firstCard) return 300;
          return firstCard.offsetWidth + 
                 parseInt(window.getComputedStyle(firstCard).marginRight);
        };
      
        const updateButtons = () => {
          prevBtn.disabled = scroller.scrollLeft <= 10;
          nextBtn.disabled = scroller.scrollLeft + scroller.clientWidth >= 
                            scroller.scrollWidth - 10;
        };
      
        prevBtn.addEventListener('click', () => {
          scroller.scrollBy({
            left: -getScrollAmount(),
            behavior: 'smooth'
          });
        });
      
        nextBtn.addEventListener('click', () => {
          scroller.scrollBy({
            left: getScrollAmount(),
            behavior: 'smooth'
          });
        });
      
        scroller.addEventListener('scroll', () => {
          updateButtons();
          updateIndicators();
        });
      
        updateButtons();
      });
    // Mobile Navigation Toggle
    const mobileNavToggle = document.createElement('button');
    mobileNavToggle.className = 'mobile-nav-toggle';
    mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('nav').appendChild(mobileNavToggle);
    
    mobileNavToggle.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    // Update navigation display on resize
    window.addEventListener('resize', function() {
        const navLinks = document.querySelector('.nav-links');
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
        } else {
            navLinks.style.display = 'none';
        }
    });

    // Initialize with correct nav display
    if (window.innerWidth <= 768) {
        document.querySelector('.nav-links').style.display = 'none';
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    document.querySelector('.nav-links').style.display = 'none';
                }
            }
        });
    });

    // Form validation for login/signup
    document.addEventListener('DOMContentLoaded', function() {
      // Form elements
      const loginForm = document.getElementById('loginForm');
      const registerForm = document.getElementById('registerForm');
      const passwordResetForm = document.getElementById('passwordResetForm');
      
      // Toggle links
      const showSignup = document.getElementById('showSignup');
      const showLogin = document.getElementById('showLogin');
      const forgotPassword = document.getElementById('forgotPassword');
      const backToLogin = document.getElementById('backToLogin');
      
      // Form containers
      const loginContainer = document.querySelector('.auth-card:first-of-type');
      const signupContainer = document.getElementById('signupForm');
      const forgotContainer = document.getElementById('forgotForm');
    
      // Toggle between forms
      showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        loginContainer.style.display = 'none';
        signupContainer.style.display = 'block';
        forgotContainer.style.display = 'none';
      });
    
      showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        loginContainer.style.display = 'block';
        signupContainer.style.display = 'none';
        forgotContainer.style.display = 'none';
      });
    
      forgotPassword.addEventListener('click', (e) => {
        e.preventDefault();
        loginContainer.style.display = 'none';
        signupContainer.style.display = 'none';
        forgotContainer.style.display = 'block';
      });
    
      backToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        loginContainer.style.display = 'block';
        signupContainer.style.display = 'none';
        forgotContainer.style.display = 'none';
      });
    
      // Form submissions with validation
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (!email || !password) {
          showAlert('Please fill in all fields', 'error');
          return;
        }
        
        // Simulate login (replace with actual API call)
        setTimeout(() => {
          showAlert('Login successful! Redirecting...', 'success');
          // window.location.href = 'dashboard.html'; // Uncomment for actual redirect
        }, 1000);
      });
    
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (!email || !password || !confirmPassword) {
          showAlert('Please fill in all fields', 'error');
          return;
        }
        
        if (password !== confirmPassword) {
          showAlert('Passwords do not match', 'error');
          return;
        }
        
        if (password.length < 8) {
          showAlert('Password must be at least 8 characters', 'error');
          return;
        }
        
        // Simulate registration
        setTimeout(() => {
          showAlert('Account created successfully! Please log in.', 'success');
          showLogin.click(); // Switch back to login form
        }, 1000);
      });
    
      passwordResetForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('resetEmail').value;
        
        if (!email) {
          showAlert('Please enter your email address', 'error');
          return;
        }
        
        // Simulate password reset
        setTimeout(() => {
          showAlert(`Password reset link sent to ${email}`, 'success');
          backToLogin.click(); // Switch back to login form
        }, 1000);
      });
    
      // Custom alert function
      function showAlert(message, type) {
        // Remove existing alerts
        const oldAlert = document.querySelector('.custom-alert');
        if (oldAlert) oldAlert.remove();
        
        // Create alert element
        const alert = document.createElement('div');
        alert.className = `custom-alert ${type}`;
        alert.textContent = message;
        
        // Insert after the form title
        const form = document.querySelector('.auth-card[style*="block"]');
        const title = form.querySelector('h2');
        form.insertBefore(alert, title.nextSibling);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
          alert.remove();
        }, 3000);
      }
    });

    // Product add to cart functionality
    document.querySelectorAll('.product-card .btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productName = this.closest('.product-info').querySelector('h3').textContent;
            const productPrice = this.closest('.product-info').querySelector('.price').textContent;
            
            alert(`Added to cart: ${productName}\n${productPrice}`);
            
            // In a real implementation, you would add to a cart system here
        });
    });

    // Charging station search functionality
     // Load Google Maps API (add to your HTML head)
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>

document.addEventListener('DOMContentLoaded', function() {
  const searchBtn = document.getElementById('search-btn');
  const locationInput = document.getElementById('location-input');
  const connectorType = document.getElementById('connector-type');
  const resultsContainer = document.getElementById('results-container');
  
  let map;
  let markers = [];
  let infoWindow;

  // Initialize Map
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      // Ahmedabad City Center
    center: { lat: 23.0225, lng: 72.5714 }, // Default to Ahmedabad, India
      zoom: 12
    });
    
    infoWindow = new google.maps.InfoWindow();
    
    // Add autocomplete to location input
    const autocomplete = new google.maps.places.Autocomplete(locationInput);
    autocomplete.bindTo('bounds', map);
  }

  // Search Function
  searchBtn.addEventListener('click', function() {
    const location = locationInput.value;
    const connector = connectorType.value;
    
    if (!location) {
      alert('Please enter a location');
      return;
    }
    
    searchStations(location, connector);
  });

  // Simulate station search (replace with real API call)
  function searchStations(location, connector) {
    // Clear previous results
    resultsContainer.innerHTML = '';
    clearMarkers();
    
    // In a real app, you would call your backend API here
    // This is a simulation with dummy data
    const geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({ address: location }, function(results, status) {
      if (status === 'OK') {
        const locationLatLng = results[0].geometry.location;
        map.setCenter(locationLatLng);
        map.setZoom(14);
        
        // Generate dummy stations near the location
        const dummyStations = generateDummyStations(locationLatLng, connector);
        displayStations(dummyStations);
      } else {
        alert('Location not found: ' + status);
      }
    });
  }

  // Display stations on map and in results
  function displayStations(stations) {
    stations.forEach(station => {
      // Add marker to map
      const marker = new google.maps.Marker({
        position: station.location,
        map: map,
        title: station.name
      });
      
      markers.push(marker);
      
      // Add info window
      marker.addListener('click', () => {
        infoWindow.setContent(`
          <div class="map-info-window">
            <h3>${station.name}</h3>
            <p>${station.address}</p>
            <p>Connector: ${station.connectorType}</p>
            <p>Status: <span class="${station.available ? 'status-available' : 'status-unavailable'}">
              ${station.available ? 'Available' : 'Unavailable'}
            </span></p>
          </div>
        `);
        infoWindow.open(map, marker);
      });
      
      // Add to results list
      const stationCard = document.createElement('div');
      stationCard.className = 'station-card';
      stationCard.innerHTML = `
        <h3>${station.name}</h3>
        <div class="station-info">
          <i class="fas fa-map-marker-alt"></i>
          <div>
            <p>${station.address}</p>
            <p>Distance: ${station.distance} miles</p>
          </div>
        </div>
        <div class="station-info">
          <i class="fas fa-plug"></i>
          <div>
            <p>Connector: ${station.connectorType}</p>
            <p>Power: ${station.power} kW</p>
          </div>
        </div>
        <p>Status: <span class="station-status ${station.available ? 'status-available' : 'status-unavailable'}">
          ${station.available ? 'Available' : 'In Use'}
        </span></p>
        <button class="btn" style="margin-top: 10px;">Directions</button>
      `;
      
      resultsContainer.appendChild(stationCard);
    });
  }

  // Helper functions
  function clearMarkers() {
    markers.forEach(marker => marker.setMap(null));
    markers = [];
  }

  function generateDummyStations(center, connectorFilter) {
    const connectorTypes = ['Type 1 (J1772)', 'Type 2 (Mennekes)', 'CCS', 'CHAdeMO', 'Tesla'];
    const dummyStations = [];
    
    // Generate 8 dummy stations around the center point
    for (let i = 1; i <= 8; i++) {
      // Skip if doesn't match filter (unless filter is 'all')
      if (connectorFilter !== 'all' && 
          connectorTypes[i % 5].toLowerCase().indexOf(connectorFilter) === -1) {
        continue;
      }
      
      // Random offset from center (0.01 to 0.05 degrees)
      const latOffset = (Math.random() * 0.04 - 0.02);
      const lngOffset = (Math.random() * 0.04 - 0.02);
      
      dummyStations.push({
        name: `Charging Station ${i}`,
        address: `${Math.floor(Math.random() * 200) + 100} Main St, ${['North', 'South', 'East', 'West'][i % 4]} Area`,
        location: {
          lat: center.lat() + latOffset,
          lng: center.lng() + lngOffset
        },
        connectorType: connectorTypes[i % 5],
        power: Math.floor(Math.random() * 150) + 50, // 50-200 kW
        available: Math.random() > 0.3, // 70% chance available
        distance: (Math.random() * 4 + 1).toFixed(1) // 1.0-5.0 km
      });
    }
    
    return dummyStations;
  }

  // Initialize the map when Google Maps API is loaded
  window.initMap = initMap;
});
    // Active nav link highlighting based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Initialize first active nav item
    document.querySelector('.nav-links a').classList.add('active');
