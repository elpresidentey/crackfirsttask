// Add focus styles for keyboard navigation and update time
document.addEventListener('DOMContentLoaded', function() {
    const focusableElements = document.querySelectorAll('a, button, [tabindex]');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #4285f4';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // Update current time
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour12: true,
            hour: 'numeric',
            minute: '2-digit'
        });
        const timeElement = document.querySelector('[data-testid="test-user-time"]');
        if (timeElement) {
            timeElement.textContent = `Current time: ${timeString}`;
        }
    }

    // Update time immediately and then every minute
    updateTime();
    setInterval(updateTime, 60000);
});
