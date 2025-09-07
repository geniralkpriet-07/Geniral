// This JavaScript adds a specific class to the document when viewed on mobile
// It's used to enable better tap targets and other mobile-specific behaviors

(function() {
  // Function to check if the device is mobile
  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
  }

  // Function to add/remove mobile class
  function setMobileClass() {
    if (isMobile()) {
      document.documentElement.classList.add('is-mobile-device');
    } else {
      document.documentElement.classList.remove('is-mobile-device');
    }
  }

  // Run on page load
  setMobileClass();

  // Run on resize
  window.addEventListener('resize', setMobileClass);

  // Fix for iOS viewport height issues
  function setMobileViewportHeight() {
    // First we get the viewport height and multiply it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  // Run the function on initial load and resize
  setMobileViewportHeight();
  window.addEventListener('resize', setMobileViewportHeight);
  
  // Double-tap prevention for iOS
  document.addEventListener('touchend', function(event) {
    if (event.target.classList.contains('prevent-double-tap')) {
      event.preventDefault();
    }
  });

  // Add fastclick to remove 300ms delay on mobile devices
  if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
      if (isMobile()) {
        // Add larger tap targets
        document.documentElement.classList.add('larger-tap-targets');
      }
    }, false);
  }
})();
