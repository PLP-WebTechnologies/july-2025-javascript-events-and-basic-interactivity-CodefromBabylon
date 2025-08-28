// =============================================
// Part 1: JavaScript Event Handling
// =============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive components
    initThemeToggle();
    initClickEvents();
    initMouseEvents();
    initKeyboardEvents();
    initCounterGame();
    initFAQSection();
    initTabbedInterface();
    initFormValidation();
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.textContent = '☀️ Light Mode';
        } else {
            themeToggle.textContent = '🌙 Dark Mode';
        }
    });
}

// Click Event Handling
function initClickEvents() {
    const clickBtn = document.getElementById('clickBtn');
    const clickOutput = document.getElementById('clickOutput');
    
    clickBtn.addEventListener('click', function() {
        clickOutput.textContent = 'Button was clicked! 🎉';
        
        // Reset message after 2 seconds
        setTimeout(() => {
            clickOutput.textContent = 'Waiting for click...';
        }, 2000);
    });
}

// Mouse Event Handling
function initMouseEvents() {
    const mouseArea = document.getElementById('mouseArea');
    const mouseOutput = document.getElementById('mouseOutput');
    
    mouseArea.addEventListener('mouseover', function() {
        mouseOutput.textContent = 'Mouse is over the area!';
    });
    
    mouseArea.addEventListener('mouseout', function() {
        mouseOutput.textContent = 'Mouse left the area.';
    });
    
    mouseArea.addEventListener('mousemove', function(e) {
        mouseOutput.textContent = `Mouse position: X=${e.offsetX}, Y=${e.offsetY}`;
    });
}

// Keyboard Event Handling
function initKeyboardEvents() {
    const keyboardInput = document.getElementById('keyboardInput');
    const keyboardOutput = document.getElementById('keyboardOutput');
    
    keyboardInput.addEventListener('keydown', function(e) {
        keyboardOutput.textContent = `Key pressed: ${e.key}`;
    });
    
    keyboardInput.addEventListener('keyup', function() {
        keyboardOutput.textContent = `You typed: ${keyboardInput.value}`;
    });
}

// =============================================
// Part 2: Interactive Elements
// =============================================

// Counter Game
function initCounterGame() {
    const counterValue = document.getElementById('counterValue');
    const decrementBtn = document.getElementById('decrementBtn');
    const incrementBtn = document.getElementById('incrementBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    let count = 0;
    
    decrementBtn.addEventListener('click', function() {
        count--;
        updateCounter();
    });
    
    incrementBtn.addEventListener('click', function() {
        count++;
        updateCounter();
    });
    
    resetBtn.addEventListener('click', function() {
        count = 0;
        updateCounter();
    });
    
    function updateCounter() {
        counterValue.textContent = count;
        
        // Change color based on value
        if (count < 0) {
            counterValue.style.color = '#e74c3c';
        } else if (count > 0) {
            counterValue.style.color = '#2ecc71';
        } else {
            counterValue.style.color = '#333';
        }
    }
}

// FAQ Section
function initFAQSection() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Toggle active class on answer
            const answer = this.nextElementSibling;
            answer.classList.toggle('active');
            
            // Change icon
            const icon = this.querySelector('span');
            icon.textContent = answer.classList.contains('active') ? '−' : '+';
        });
    });
}

// Tabbed Interface
function initTabbedInterface() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab pane
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// =============================================
// Part 3: Form Validation
// =============================================

function initFormValidation() {
    const form = document.getElementById('validationForm');
    const successMessage = document.getElementById('formSuccess');
    
    // Get form inputs
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const ageInput = document.getElementById('age');
    
    // Add input event listeners for real-time validation
    nameInput.addEventListener('input', () => validateName());
    emailInput.addEventListener('input', () => validateEmail());
    passwordInput.addEventListener('input', () => validatePassword());
    confirmPasswordInput.addEventListener('input', () => validateConfirmPassword());
    ageInput.addEventListener('input', () => validateAge());
    
    // Form submit handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isAgeValid = validateAge();
        
        // If all fields are valid, show success message
        if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isAgeValid) {
            successMessage.style.display = 'block';
            
            // Reset form after 3 seconds
            setTimeout(() => {
                form.reset();
                successMessage.style.display = 'none';
                
                // Clear all error messages
                document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
                
                // Remove validation classes
                document.querySelectorAll('input').forEach(input => {
                    input.classList.remove('error', 'valid');
                });
            }, 3000);
        }
    });
    
    // Validation functions
    function validateName() {
        const nameError = document.getElementById('nameError');
        const name = nameInput.value.trim();
        
        if (name === '') {
            showError(nameInput, nameError, 'Name is required');
            return false;
        } else if (name.length < 2) {
            showError(nameInput, nameError, 'Name must be at least 2 characters');
            return false;
        } else if (!/^[a-zA-Z\s]+$/.test(name)) {
            showError(nameInput, nameError, 'Name can only contain letters and spaces');
            return false;
        } else {
            showSuccess(nameInput, nameError);
            return true;
        }
    }
    
    function validateEmail() {
        const emailError = document.getElementById('emailError');
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            showError(emailInput, emailError, 'Email is required');
            return false;
        } else if (!emailRegex.test(email)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            return false;
        } else {
            showSuccess(emailInput, emailError);
            return true;
        }
    }
    
    function validatePassword() {
        const passwordError = document.getElementById('passwordError');
        const password = passwordInput.value;
        
        if (password === '') {
            showError(passwordInput, passwordError, 'Password is required');
            return false;
        } else if (password.length < 8) {
            showError(passwordInput, passwordError, 'Password must be at least 8 characters');
            return false;
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            showError(passwordInput, passwordError, 'Password must contain at least one lowercase letter, one uppercase letter, and one number');
            return false;
        } else {
            showSuccess(passwordInput, passwordError);
            return true;
        }
    }
    
    function validateConfirmPassword() {
        const confirmPasswordError = document.getElementById('confirmPasswordError');
        const confirmPassword = confirmPasswordInput.value;
        const password = passwordInput.value;
        
        if (confirmPassword === '') {
            showError(confirmPasswordInput, confirmPasswordError, 'Please confirm your password');
            return false;
        } else if (confirmPassword !== password) {
            showError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match');
            return false;
        } else {
            showSuccess(confirmPasswordInput, confirmPasswordError);
            return true;
        }
    }
    
    function validateAge() {
        const ageError = document.getElementById('ageError');
        const age = ageInput.value;
        
        // Age is optional, but if provided, validate it
        if (age !== '') {
            const ageNum = parseInt(age);
            if (isNaN(ageNum) || ageNum < 13 || ageNum > 120) {
                showError(ageInput, ageError, 'Age must be between 13 and 120');
                return false;
            } else {
                showSuccess(ageInput, ageError);
                return true;
            }
        }
        
        // If age is empty, it's valid (optional field)
        showSuccess(ageInput, ageError);
        return true;
    }
    
    // Helper functions for showing validation states
    function showError(input, errorElement, message) {
        errorElement.textContent = message;
        input.classList.add('error');
        input.classList.remove('valid');
    }
    
    function showSuccess(input, errorElement) {
        errorElement.textContent = '';
        input.classList.remove('error');
        input.classList.add('valid');
    }
}