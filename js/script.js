document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // PAGE LOADER
  // ==========================================
  const loader = document.getElementById("loader");

  const hideLoader = () => {
    if (loader) {
      setTimeout(() => loader.classList.add("hidden"), 450);
    }
  };

  window.addEventListener("load", hideLoader);

  // Fallback jika halaman sudah selesai dimuat.
  if (document.readyState === "complete") {
    hideLoader();
  }

  // ==========================================
  // MOBILE NAVIGATION
  // ==========================================
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ==========================================
  // SECTION REVEAL ANIMATION
  // ==========================================
  const revealTargets = document.querySelectorAll(
    ".section-heading, .panel, .about-copy"
  );

  revealTargets.forEach((element) => {
    element.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    revealTargets.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealTargets.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // ==========================================
  // ACTIVE NAVIGATION
  // ==========================================
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".main-nav a");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              const isActive =
                link.getAttribute("href") === `#${entry.target.id}`;

              link.classList.toggle("active", isActive);
            });
          }
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px",
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // ==========================================
  // PDF CERTIFICATE VIEWER
  // ==========================================
  const pdfModal = document.getElementById("pdfModal");
  const pdfFrame = document.getElementById("pdfFrame");
  const pdfModalTitle = document.getElementById("pdfModalTitle");
  const pdfOpenNew = document.getElementById("pdfOpenNew");
  const pdfModalClose = document.getElementById("pdfModalClose");

  // Menutup modal PDF.
  const closePdfModal = () => {
    if (!pdfModal || !pdfFrame) return;

    pdfModal.classList.remove("open");
    pdfFrame.src = "about:blank";
    document.body.style.overflow = "";
  };

  // Membuka sertifikat PDF.
  document.querySelectorAll(".cert-open").forEach((button) => {
    button.addEventListener("click", () => {
      if (!pdfModal || !pdfFrame || !pdfModalTitle || !pdfOpenNew) return;

      const pdfPath = button.dataset.pdf;
      const certificateCard = button.closest(".cert-card");
      const certificateName =
        certificateCard?.querySelector("h3")?.textContent || "Certificate";

      if (!pdfPath) return;

      pdfModalTitle.textContent = certificateName;
      pdfFrame.src = pdfPath;
      pdfOpenNew.href = pdfPath;

      pdfModal.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  // Tombol tutup modal.
  if (pdfModalClose) {
    pdfModalClose.addEventListener("click", closePdfModal);
  }

  // Menutup modal ketika area luar diklik.
  if (pdfModal) {
    pdfModal.addEventListener("click", (event) => {
      if (event.target === pdfModal) {
        closePdfModal();
      }
    });
  }

  // Menutup modal menggunakan tombol Escape.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closePdfModal();
    }
  });
});