// Add focus styles for keyboard navigation
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
});
