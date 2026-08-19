const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });
}

/* Modal */

const modal = document.getElementById("projectModal");
const closeModal = document.getElementById("closeModal");

document.querySelectorAll(".project-link").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        if (modal) modal.classList.add("show");
    });
});

if (closeModal && modal) {
    closeModal.addEventListener("click", () => {
        modal.classList.remove("show");
    });
}

if (modal) {
    modal.addEventListener("click", e => {
        if (e.target === modal) {
            modal.classList.remove("show");
        }
    });
}

/* Tabs & Chart Initialization */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Tabs Logic
    const tabs = document.querySelectorAll('.skill-tabs .tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            tabContents.forEach(content => {
                content.style.display = 'none';
                content.classList.remove('active');
            });

            const targetId = tab.getAttribute('data-tab');
            const targetContent = document.getElementById(targetId);
            
            if (targetContent) {
                targetContent.style.display = 'block';
                targetContent.classList.add('active');
            }
        });
    });

    // 2. Chart.js Doughnut Chart Logic
    const canvas = document.getElementById('timeSplitChart');

    if (canvas) {
        const existingChart = Chart.getChart(canvas);
        if (existingChart) {
            existingChart.destroy();
        }

        const timeData = {
            labels: ['Markup', 'Styling', 'Scripting', 'Testing'],
            datasets: [{
                data: [40, 26, 20, 14],
                backgroundColor: ['#5146ee', '#ff684b', '#ffae31', '#14b9d1'],
                borderWidth: 0,
                hoverOffset: 0 // Base fixed rahega, expand nahi hoga
            }]
        };

        new Chart(canvas, {
            type: 'doughnut',
            data: timeData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '72%',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        enabled: true,
                        backgroundColor: '#ffffff',
                        titleColor: '#101426',
                        bodyColor: '#5146ee',
                        titleFont: { size: 10, weight: '600' },
                        bodyFont: { size: 11, weight: 'bold' },
                        padding: { top: 6, bottom: 6, left: 10, right: 10 },
                        cornerRadius: 8,
                        displayColors: false,
                        borderColor: 'rgba(0, 0, 0, 0.08)',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                }
            }
        });
    }
});


// ================= PROJECT FILTER =================

const filterButtons = document.querySelectorAll(".filter");
const projectCards = document.querySelectorAll(".project-card");


filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Get selected category
        const selectedFilter = button.dataset.filter;


        // Remove active class from all buttons
        filterButtons.forEach((btn) => {

            btn.classList.remove("active");

        });


        // Add active class to clicked button
        button.classList.add("active");


        // Filter projects
        projectCards.forEach((card) => {

            const projectCategory = card.dataset.category;


            if (
                selectedFilter === "all" ||
                projectCategory === selectedFilter
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});



const testimonials = [

    {
        text: "Aarav rebuilt our marketing site in under three weeks. It loads in well under a second on mobile and enquiries have gone up by a third since launch. He simply gets the details right.",

        rating: 5,

        name: "Priya Nair",

        role: "Marketing Head, Wanderlust Travel",

        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"
    },


    {
        text: "Working with Aarav was an amazing experience. He understood our requirements quickly and delivered a clean, fast and modern website exactly as we imagined.",

        rating: 4,

        name: "Rahul Sharma",

        role: "Founder, TechNova Solutions",

        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
    },


    {
        text: "The attention to detail was outstanding. Our new website looks professional, performs beautifully on mobile and our customers have noticed the difference immediately.",

        rating: 5,

        name: "Neha Kapoor",

        role: "Product Manager, Pixel Studio",

        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150"
    }

];


// ================================
// GET ELEMENTS
// ================================

const testimonialText =
    document.getElementById("testimonialText");

const testimonialStars =
    document.getElementById("testimonialStars");

const clientName =
    document.getElementById("clientName");

const clientRole =
    document.getElementById("clientRole");

const clientImage =
    document.getElementById("clientImage");

const card =
    document.querySelector(".testimonial-card");

const prevBtn =
    document.querySelector(".prev-btn");

const nextBtn =
    document.querySelector(".next-btn");

const dots =
    document.querySelectorAll(".dot");


// Current testimonial

let currentIndex = 0;


// ================================
// CREATE STARS
// ================================

function createStars(rating) {

    let stars = "";

    for (let i = 1; i <= 5; i++) {

        if (i <= rating) {
            stars += "★";
        } else {
            stars += "☆";
        }

    }

    return stars;
}


// ================================
// SHOW TESTIMONIAL
// ================================

function showTestimonial(index, direction = "next") {

    currentIndex = index;


    const testimonial =
        testimonials[currentIndex];


    // Remove previous animation

    card.classList.remove(
        "slide-next",
        "slide-prev"
    );


    // Force browser reflow

    void card.offsetWidth;


    // Add animation

    card.classList.add(
        direction === "next"
            ? "slide-next"
            : "slide-prev"
    );


    // Update text

    testimonialText.textContent =
        testimonial.text;


    // Update rating

    testimonialStars.textContent =
        createStars(testimonial.rating);


    testimonialStars.setAttribute(
        "aria-label",
        `${testimonial.rating} out of 5 stars`
    );


    // Update client

    clientName.textContent =
        testimonial.name;


    clientRole.textContent =
        testimonial.role;


    clientImage.src =
        testimonial.image;


    clientImage.alt =
        testimonial.name;


    // Update dots

    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentIndex
        );

    });

}


// ================================
// NEXT
// ================================

function nextTestimonial() {

    const nextIndex =
        (currentIndex + 1) % testimonials.length;

    showTestimonial(
        nextIndex,
        "next"
    );
}


// ================================
// PREVIOUS
// ================================

function previousTestimonial() {

    const previousIndex =
        (currentIndex - 1 + testimonials.length)
        % testimonials.length;

    showTestimonial(
        previousIndex,
        "prev"
    );
}


// ================================
// ARROW EVENTS
// ================================

nextBtn.addEventListener(
    "click",
    () => {

        nextTestimonial();

        resetAutoSlide();

    }
);


prevBtn.addEventListener(
    "click",
    () => {

        previousTestimonial();

        resetAutoSlide();

    }
);


// ================================
// DOT EVENTS
// ================================

dots.forEach((dot) => {

    dot.addEventListener(
        "click",
        () => {

            const index =
                Number(dot.dataset.index);


            const direction =
                index > currentIndex
                    ? "next"
                    : "prev";


            showTestimonial(
                index,
                direction
            );


            resetAutoSlide();

        }
    );

});


// ================================
// AUTO SLIDER
// ================================

let autoSlide =
    setInterval(
        nextTestimonial,
        5000
    );


function resetAutoSlide() {

    clearInterval(autoSlide);


    autoSlide =
        setInterval(
            nextTestimonial,
            5000
        );

}


// ================================
// INITIAL TESTIMONIAL
// ================================

showTestimonial(0);

/* ==========================================
   CONTACT FORM
========================================== */

const contactForm =
    document.getElementById("contactForm");

const formStatus =
    document.getElementById("formStatus");


contactForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const name =
        document.getElementById("userName").value.trim();

    const email =
        document.getElementById("userEmail").value.trim();

    const company =
        document.getElementById("company").value.trim();

    const budget =
        document.getElementById("budget").value;

    const subject =
        document.getElementById("subject").value.trim();

    const message =
        document.getElementById("message").value.trim();


    /* Basic validation */

    if (!name || !email || !subject || !message) {

        formStatus.textContent =
            "Please fill all required fields.";

        formStatus.classList.add("error");

        return;
    }


    /* ==========================================
       CREATE EMAIL
    ========================================== */

    const emailSubject =
        encodeURIComponent(
            subject
        );


    const emailBody =
        encodeURIComponent(
`Hello,

Name: ${name}
Email: ${email}
Company: ${company || "Not provided"}
Budget: ${budget || "Not selected"}

Message:
${message}`
        );


    /*
       Opens user's default email application.
    */

    window.location.href =
        `mailto:hello@example.com?subject=${emailSubject}&body=${emailBody}`;


    /* Success message */

    formStatus.textContent =
        "Opening your email application...";

    formStatus.classList.remove("error");
    formStatus.classList.add("success");

});

const newsletterForm =
    document.getElementById("newsletterForm");

const newsletterEmail =
    document.getElementById("newsletterEmail");

const newsletterMessage =
    document.getElementById("newsletterMessage");


newsletterForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email =
        newsletterEmail.value.trim();


    if (!email) {

        newsletterMessage.textContent =
            "Please enter your email.";

        newsletterMessage.className =
            "newsletter-message error";

        return;
    }


    newsletterMessage.textContent =
        "Thanks! You're subscribed.";

    newsletterMessage.className =
        "newsletter-message success";


    newsletterEmail.value = "";

});

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});