// Slide deck functionality
class SlideDeck {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 4;
        this.slides = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.slideCounter = document.getElementById('currentSlide');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateSlideDisplay();
        this.addHoverEffects();
        this.initializeCheckboxes();
    }
    
    bindEvents() {
        // Previous/Next button events - Fixed binding
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.handleNextClick());
        
        // Indicator click events
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyNavigation(e));
        
        // Touch/swipe support for mobile
        this.addTouchSupport();
    }
    
    handleNextClick() {
        if (this.currentSlide === this.totalSlides - 1) {
            // If on last slide, restart to first slide
            this.goToSlide(0);
        } else {
            // Otherwise go to next slide
            this.nextSlide();
        }
    }
    
    addTouchSupport() {
        let startX = 0;
        let endX = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.changedTouches[0].screenX;
        });
        
        document.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].screenX;
            this.handleSwipe(startX, endX);
        });
    }
    
    handleSwipe(startX, endX) {
        const threshold = 50; // Minimum swipe distance
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Swipe left - next slide
                this.handleNextClick();
            } else {
                // Swipe right - previous slide
                this.previousSlide();
            }
        }
    }
    
    handleKeyNavigation(e) {
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.previousSlide();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.handleNextClick();
                break;
            case 'Home':
                e.preventDefault();
                this.goToSlide(0);
                break;
            case 'End':
                e.preventDefault();
                this.goToSlide(this.totalSlides - 1);
                break;
        }
    }
    
    previousSlide() {
        if (this.currentSlide > 0) {
            this.goToSlide(this.currentSlide - 1);
        }
    }
    
    nextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.goToSlide(this.currentSlide + 1);
        }
    }
    
    goToSlide(slideIndex) {
        if (slideIndex >= 0 && slideIndex < this.totalSlides) {
            // Remove active class from current slide and indicator
            this.slides[this.currentSlide].classList.remove('active');
            this.indicators[this.currentSlide].classList.remove('active');
            
            // Update current slide index
            this.currentSlide = slideIndex;
            
            // Add active class to new slide and indicator
            this.slides[this.currentSlide].classList.add('active');
            this.indicators[this.currentSlide].classList.add('active');
            
            // Update navigation buttons and counter
            this.updateSlideDisplay();
            
            // Trigger slide change effects
            this.onSlideChange();
        }
    }
    
    updateSlideDisplay() {
        // Update slide counter
        this.slideCounter.textContent = this.currentSlide + 1;
        
        // Update navigation button states
        this.prevBtn.disabled = this.currentSlide === 0;
        this.nextBtn.disabled = false; // Next button is never disabled, it becomes restart on last slide
        
        // Update button text for last slide
        if (this.currentSlide === this.totalSlides - 1) {
            this.nextBtn.innerHTML = `
                Restart
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                    <path d="M21 3v5h-5"></path>
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                    <path d="M3 21v-5h5"></path>
                </svg>
            `;
        } else {
            this.nextBtn.innerHTML = `
                Next
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
            `;
        }
    }
    
    onSlideChange() {
        // Add any slide-specific animations or effects
        const currentSlideElement = this.slides[this.currentSlide];
        
        // Animate status items on slide 1
        if (this.currentSlide === 0) {
            this.animateStatusItems();
        }
        
        // Animate timeline on slide 2
        if (this.currentSlide === 1) {
            this.animateTimeline();
        }
        
        // Animate progress bars on slide 3
        if (this.currentSlide === 2) {
            this.animateProgressBars();
        }
        
        // Reset animation states when entering slide 4
        if (this.currentSlide === 3) {
            this.animateRecommendations();
        }
    }
    
    animateStatusItems() {
        const statusItems = document.querySelectorAll('.status-item');
        statusItems.forEach((item, index) => {
            item.style.transform = 'translateY(20px)';
            item.style.opacity = '0';
            setTimeout(() => {
                item.style.transform = 'translateY(0)';
                item.style.opacity = '1';
                item.style.transition = 'all 0.4s ease';
            }, index * 150);
        });
    }
    
    animateTimeline() {
        const timelineRows = document.querySelectorAll('.timeline-row:not(.timeline-header)');
        timelineRows.forEach((row, index) => {
            row.style.transform = 'translateX(-20px)';
            row.style.opacity = '0';
            setTimeout(() => {
                row.style.transform = 'translateX(0)';
                row.style.opacity = '1';
                row.style.transition = 'all 0.3s ease';
            }, index * 100);
        });
    }
    
    animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        progressBars.forEach((bar, index) => {
            const originalWidth = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.transition = 'width 0.8s ease';
                bar.style.width = originalWidth;
            }, index * 200 + 300);
        });
    }
    
    animateRecommendations() {
        const recommendationBlocks = document.querySelectorAll('.recommendation-block');
        recommendationBlocks.forEach((block, index) => {
            block.style.transform = 'translateY(30px)';
            block.style.opacity = '0';
            setTimeout(() => {
                block.style.transform = 'translateY(0)';
                block.style.opacity = '1';
                block.style.transition = 'all 0.5s ease';
            }, index * 200);
        });
    }
    
    addHoverEffects() {
        // Add interactive hover effects to various elements
        
        // Timeline rows
        const timelineRows = document.querySelectorAll('.timeline-row:not(.timeline-header)');
        timelineRows.forEach(row => {
            row.addEventListener('mouseenter', () => {
                row.style.transform = 'scale(1.02)';
                row.style.transition = 'transform 0.2s ease';
            });
            
            row.addEventListener('mouseleave', () => {
                row.style.transform = 'scale(1)';
            });
        });
        
        // Status items
        const statusItems = document.querySelectorAll('.status-item');
        statusItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.boxShadow = '0 8px 25px rgba(8, 145, 178, 0.3)';
                item.style.transition = 'box-shadow 0.3s ease, transform 0.3s ease';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.boxShadow = 'none';
            });
        });
        
        // Recommendation blocks
        const recommendationBlocks = document.querySelectorAll('.recommendation-block');
        recommendationBlocks.forEach(block => {
            block.addEventListener('mouseenter', () => {
                block.style.borderColor = '#06b6d4';
                block.style.boxShadow = '0 12px 30px rgba(8, 145, 178, 0.2)';
            });
            
            block.addEventListener('mouseleave', () => {
                block.style.borderColor = '#0891b2';
                block.style.boxShadow = 'none';
            });
        });
    }
    
    initializeCheckboxes() {
        const checkboxes = document.querySelectorAll('.decision-checkbox');
        const checkedCount = document.createElement('div');
        checkedCount.id = 'checked-count';
        checkedCount.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 32px;
            background: var(--color-cyan-accent);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 500;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 100;
        `;
        document.body.appendChild(checkedCount);
        
        const updateCounter = () => {
            const checked = document.querySelectorAll('.decision-checkbox:checked').length;
            const total = checkboxes.length;
            
            if (checked > 0) {
                checkedCount.textContent = `${checked}/${total} decisions made`;
                checkedCount.style.opacity = '1';
                
                if (checked === total) {
                    checkedCount.textContent = 'All decisions completed ✓';
                    checkedCount.style.background = 'var(--color-success-green)';
                } else {
                    checkedCount.style.background = 'var(--color-cyan-accent)';
                }
            } else {
                checkedCount.style.opacity = '0';
            }
        };
        
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', updateCounter);
            
            // Add custom styling for checked state
            checkbox.addEventListener('change', (e) => {
                const item = e.target.closest('.decision-item');
                if (e.target.checked) {
                    item.style.background = 'rgba(8, 145, 178, 0.1)';
                    item.style.borderLeft = '4px solid var(--color-cyan-accent)';
                    item.style.transition = 'all 0.3s ease';
                } else {
                    item.style.background = 'transparent';
                    item.style.borderLeft = 'none';
                }
            });
        });
    }
}

// Additional utility functions
class PresentationUtils {
    static enterFullscreen() {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    }
    
    static exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
    
    static toggleFullscreen() {
        if (!document.fullscreenElement && !document.mozFullScreenElement && 
            !document.webkitFullscreenElement && !document.msFullscreenElement) {
            this.enterFullscreen();
        } else {
            this.exitFullscreen();
        }
    }
    
    static printSlides() {
        window.print();
    }
    
    static exportData() {
        // Collect checkbox states
        const decisions = [];
        const checkboxes = document.querySelectorAll('.decision-checkbox');
        checkboxes.forEach((checkbox, index) => {
            const text = checkbox.nextElementSibling.nextElementSibling.textContent;
            decisions.push({
                decision: text,
                approved: checkbox.checked
            });
        });
        
        const exportData = {
            timestamp: new Date().toISOString(),
            incident: "INC-2025-0904-001",
            executiveDecisions: decisions
        };
        
        const blob = new Blob([JSON.stringify(exportData, null, 2)], {
            type: 'application/json'
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'incident-briefing-decisions.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const slideDeck = new SlideDeck();
    
    // Add keyboard shortcuts info (optional)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'F11') {
            e.preventDefault();
            PresentationUtils.toggleFullscreen();
        } else if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            PresentationUtils.printSlides();
        } else if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            PresentationUtils.exportData();
        }
    });
    
    // Add context menu for additional options
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        
        const existingMenu = document.querySelector('.context-menu');
        if (existingMenu) {
            existingMenu.remove();
        }
        
        const menu = document.createElement('div');
        menu.className = 'context-menu';
        menu.style.cssText = `
            position: fixed;
            top: ${e.clientY}px;
            left: ${e.clientX}px;
            background: var(--color-slide-bg);
            border: 1px solid var(--color-cyan-accent);
            border-radius: 8px;
            padding: 8px 0;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            min-width: 180px;
        `;
        
        const menuItems = [
            { text: 'Toggle Fullscreen (F11)', action: PresentationUtils.toggleFullscreen },
            { text: 'Print Slides (Ctrl+P)', action: PresentationUtils.printSlides },
            { text: 'Export Decisions (Ctrl+S)', action: PresentationUtils.exportData }
        ];
        
        menuItems.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.textContent = item.text;
            menuItem.style.cssText = `
                padding: 8px 16px;
                cursor: pointer;
                color: var(--color-text-gray);
                font-size: 14px;
                transition: background-color 0.2s ease;
            `;
            
            menuItem.addEventListener('mouseenter', () => {
                menuItem.style.background = 'var(--color-cyan-accent)';
                menuItem.style.color = 'white';
            });
            
            menuItem.addEventListener('mouseleave', () => {
                menuItem.style.background = 'transparent';
                menuItem.style.color = 'var(--color-text-gray)';
            });
            
            menuItem.addEventListener('click', () => {
                item.action();
                menu.remove();
            });
            
            menu.appendChild(menuItem);
        });
        
        document.body.appendChild(menu);
        
        // Remove menu when clicking elsewhere
        setTimeout(() => {
            document.addEventListener('click', () => {
                menu.remove();
            }, { once: true });
        }, 100);
    });
    
    // Smooth scrolling for slide content
    document.querySelectorAll('.slide').forEach(slide => {
        slide.style.scrollBehavior = 'smooth';
    });
    
    // Add loading animation
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--color-presentation-bg);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    loader.innerHTML = `
        <div style="text-align: center;">
            <div style="width: 40px; height: 40px; border: 3px solid var(--color-cyan-accent); border-top: 3px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 16px;"></div>
            <p style="color: var(--color-text-white); font-size: 16px;">Loading Presentation...</p>
        </div>
    `;
    
    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(loader);
    
    // Remove loader after a short delay
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 1000);
});

// Export for potential external use
window.SlideDeck = SlideDeck;
window.PresentationUtils = PresentationUtils;