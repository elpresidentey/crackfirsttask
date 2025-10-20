// Contact form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('[data-testid="test-contact-form"]');
    const successMessage = document.querySelector('[data-testid="test-contact-success"]');
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Form validation functions
    function validateName(name) {
        return name.trim().length > 0;
    }
    
    function validateEmail(email) {
        return emailRegex.test(email.trim());
    }
    
    function validateSubject(subject) {
        return subject.trim().length > 0;
    }
    
    function validateMessage(message) {
        return message.trim().length >= 10;
    }
    
    // Show error message
    function showError(fieldName, message) {
        const errorElement = document.querySelector(`[data-testid="test-contact-error-${fieldName}"]`);
        const inputElement = document.querySelector(`[data-testid="test-contact-${fieldName}"]`);
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        
        if (inputElement) {
            inputElement.setAttribute('aria-invalid', 'true');
            inputElement.classList.add('error');
        }
    }
    
    // Clear error message
    function clearError(fieldName) {
        const errorElement = document.querySelector(`[data-testid="test-contact-error-${fieldName}"]`);
        const inputElement = document.querySelector(`[data-testid="test-contact-${fieldName}"]`);
        
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
        
        if (inputElement) {
            inputElement.setAttribute('aria-invalid', 'false');
            inputElement.classList.remove('error');
        }
    }
    
    // Real-time validation
    function setupFieldValidation() {
        const fields = [
            { name: 'name', validator: validateName, errorMsg: 'Full name is required' },
            { name: 'email', validator: validateEmail, errorMsg: 'Please enter a valid email address' },
            { name: 'subject', validator: validateSubject, errorMsg: 'Subject is required' },
            { name: 'message', validator: validateMessage, errorMsg: 'Message must be at least 10 characters long' }
        ];
        
        fields.forEach(field => {
            const input = document.querySelector(`[data-testid="test-contact-${field.name}"]`);
            if (input) {
                input.addEventListener('blur', function() {
                    const value = this.value;
                    if (value && !field.validator(value)) {
                        showError(field.name, field.errorMsg);
                    } else {
                        clearError(field.name);
                    }
                });
                
                input.addEventListener('input', function() {
                    if (this.classList.contains('error')) {
                        const value = this.value;
                        if (field.validator(value)) {
                            clearError(field.name);
                        }
                    }
                });
            }
        });
    }
    
    // Form submission
    function handleSubmit(event) {
        event.preventDefault();
        
        // Clear previous errors
        ['name', 'email', 'subject', 'message'].forEach(field => clearError(field));
        
        // Get form values
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        let isValid = true;
        
        // Validate all fields
        if (!validateName(name)) {
            showError('name', 'Full name is required');
            isValid = false;
        }
        
        if (!validateEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        if (!validateSubject(subject)) {
            showError('subject', 'Subject is required');
            isValid = false;
        }
        
        if (!validateMessage(message)) {
            showError('message', 'Message must be at least 10 characters long');
            isValid = false;
        }
        
        if (isValid) {
            // Show success message
            successMessage.style.display = 'block';
            form.reset();
            
            // Focus on success message for screen readers
            successMessage.focus();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        } else {
            // Focus on first error field
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.focus();
            }
        }
    }
    
    // Initialize
    setupFieldValidation();
    form.addEventListener('submit', handleSubmit);
    
    // Add focus styles for keyboard navigation
    const focusableElements = document.querySelectorAll('input, textarea, button, a');
    
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
