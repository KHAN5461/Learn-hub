/******************************
* RESPONSIVE WARNING BEHAVIOR *
******************************/

const responsiveWarning = document.getElementById("responsive-warning");
// Enable/disable responsive warning.
const responsiveDesign = false;
// Mobile width limit.
const threshold = 768;

// Show or hide modal based on screen size.
function checkResponsiveState() {
  const small = window.innerWidth <= threshold;

  if (!responsiveDesign && small) {
    if (!responsiveWarning.open) {
      responsiveWarning.showModal();
      document.body.classList.add("overflow-hidden");
    }
  } else {
    if (responsiveWarning.open) {
      responsiveWarning.close();
      document.body.classList.remove("overflow-hidden");
    }
  }
}

// Initial check.
checkResponsiveState();

// Real-time resize detection.
window.addEventListener("resize", checkResponsiveState);

// Close animation
const backCover = document.querySelector(".back_cover");
if (backCover) {
  backCover.style.cursor = "pointer";
  backCover.addEventListener("click", async () => {
    const flipBook = document.getElementById("flip_book");
    
    const checkboxes = [
      document.getElementById("page5_checkbox"),
      document.getElementById("page4_checkbox"),
      document.getElementById("page3_checkbox"),
      document.getElementById("page2_checkbox"),
      document.getElementById("page1_checkbox"),
      document.getElementById("cover_checkbox")
    ];

    // Only animate if the book is at least partially open
    if (checkboxes.some(cb => cb && cb.checked)) {
      // Start sliding the book back to center immediately to match the Framer example
      if (flipBook) {
        flipBook.style.transform = "translateX(0)";
      }

      for (let cb of checkboxes) {
        if (cb && cb.checked) {
          cb.checked = false;
          await new Promise(r => setTimeout(r, 80));
        }
      }

      // After closing, clear the inline style so CSS takes over again for normal opening
      setTimeout(() => {
        if (flipBook) {
          flipBook.style.transform = "";
        }
      }, 1000);
    }
  });
}

// On-load animation (Starts open, animates closed)
window.addEventListener("load", async () => {
  const flipBook = document.getElementById("flip_book");
  const getStartedContainer = document.getElementById("get_started_container");

  const checkboxes = [
    document.getElementById("cover_checkbox"),
    document.getElementById("page1_checkbox"),
    document.getElementById("page2_checkbox"),
    document.getElementById("page3_checkbox"),
    document.getElementById("page4_checkbox"),
    document.getElementById("page5_checkbox")
  ];

  // Close sequentially immediately on load
  if (flipBook) {
    flipBook.style.transform = "translateX(0)";
  }
  
  const reverseCheckboxes = [...checkboxes].reverse();
  for (let cb of reverseCheckboxes) {
    if (cb) {
      cb.checked = false;
      await new Promise(r => setTimeout(r, 80));
    }
  }
  
  // Show "Get Started" button
  setTimeout(() => {
    if (flipBook) {
      flipBook.style.transform = "";
    }
    if (getStartedContainer) {
      getStartedContainer.classList.remove("opacity-0");
      getStartedContainer.classList.add("opacity-100");
    }
  }, 1000);
});

// Get Started button logic
const getStartedBtn = document.getElementById("get_started_btn");
if (getStartedBtn) {
  getStartedBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const flipBook = document.getElementById("flip_book");
    if (flipBook) {
      flipBook.classList.remove("disable-flipping");
    }
    
    const getStartedContainer = document.getElementById("get_started_container");
    if (getStartedContainer) {
      getStartedContainer.style.display = "none";
    }
    
    // Check the cover to start reading
    const coverCheckbox = document.getElementById("cover_checkbox");
    if (coverCheckbox) {
      coverCheckbox.checked = true;
    }
  });
}