// Update the current time in milliseconds
document.addEventListener('DOMContentLoaded', function() {
    const timeElement = document.querySelector('[data-testid="test-user-time"]');
    
    function updateTime() {
        timeElement.textContent = `Last updated: ${Date.now()}ms`;
    }
    
    // Update time immediately and then every second
    updateTime();
    setInterval(updateTime, 1000);
    
    // Add focus styles for keyboard navigation
    const focusableElements = document.querySelectorAll('a, button, [tabindex]');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});
