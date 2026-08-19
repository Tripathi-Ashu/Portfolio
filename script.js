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