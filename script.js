// Tab switching functionality for Viva Questions
function switchTab(tabName, button) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // Remove active class from all buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab content
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Add active class to clicked button
    button.classList.add('active');
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Highlight current active link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });

    // Add click handlers to viva questions details
    const details = document.querySelectorAll('.viva-qa details');
    details.forEach(detail => {
        detail.addEventListener('toggle', function() {
            if (this.open) {
                // Close other open details
                details.forEach(other => {
                    if (other !== this && other.open) {
                        other.open = false;
                    }
                });
            }
        });
    });

    // Code copy button functionality
    addCopyButtonsToCodeBlocks();
});

// Add copy button to code blocks
function addCopyButtonsToCodeBlocks() {
    const codeBlocks = document.querySelectorAll('pre');
    codeBlocks.forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.textContent = 'Copy';
        button.style.cssText = `
            position: absolute;
            top: 5px;
            right: 5px;
            padding: 5px 10px;
            background-color: #27ae60;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            font-size: 0.9rem;
        `;

        block.style.position = 'relative';
        block.appendChild(button);

        button.addEventListener('click', function() {
            const code = block.querySelector('code').textContent;
            navigator.clipboard.writeText(code).then(() => {
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = 'Copy';
                }, 2000);
            }).catch(() => {
                alert('Failed to copy code');
            });
        });
    });
}

// Search functionality
function searchContent(query) {
    const sections = document.querySelectorAll('.topic, .practical-question, .viva-qa');
    const results = [];

    sections.forEach(section => {
        const text = section.textContent.toLowerCase();
        if (text.includes(query.toLowerCase())) {
            results.push(section);
        }
    });

    return results;
}

// Scroll to top button
document.addEventListener('DOMContentLoaded', function() {
    const scrollButton = document.createElement('button');
    scrollButton.id = 'scroll-to-top';
    scrollButton.innerHTML = '↑';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #3498db;
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
        z-index: 99;
        transition: all 0.3s;
    `;

    document.body.appendChild(scrollButton);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    });

    scrollButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    scrollButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#2980b9';
        this.style.transform = 'scale(1.1)';
    });

    scrollButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#3498db';
        this.style.transform = 'scale(1)';
    });
});

// Print functionality
function printPage() {
    window.print();
}

// Table of contents generator
function generateTableOfContents() {
    const headings = document.querySelectorAll('.unit-content h2');
    const toc = document.querySelector('.toc ul');
    
    if (!toc || headings.length === 0) return;

    const existingItems = toc.querySelectorAll('li');
    if (existingItems.length > 0) return; // TOC already exists

    headings.forEach((heading, index) => {
        const id = heading.id || `heading-${index}`;
        heading.id = id;

        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${id}`;
        a.textContent = heading.textContent;
        li.appendChild(a);
        toc.appendChild(li);
    });
}

// Initialize table of contents on page load
document.addEventListener('DOMContentLoaded', function() {
    generateTableOfContents();
});

// Add loading animation
function showLoadingAnimation() {
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 4px solid #f3f3f3;
        border-top: 4px solid #3498db;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        z-index: 1000;
    `;
    document.body.appendChild(loader);
}

function hideLoadingAnimation() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.remove();
    }
}

// Add CSS animation for loader
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Alt + S for search (can be implemented later)
        // Alt + H for home
        if (e.altKey && e.key === 'h') {
            window.location.href = 'index.html';
        }
    });
});
