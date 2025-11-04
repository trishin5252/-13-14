// Доступная обработка формы контактов
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Сброс предыдущих ошибок
            clearErrors();
            
            // Валидация полей
            let isValid = true;
            
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Пожалуйста, введите ваше имя');
                isValid = false;
            }
            
            if (!emailInput.value.trim()) {
                showError(emailInput, 'Пожалуйста, введите email');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Пожалуйста, введите корректный email');
                isValid = false;
            }
            
            if (!messageInput.value.trim()) {
                showError(messageInput, 'Пожалуйста, введите сообщение');
                isValid = false;
            }
            
            if (isValid) {
                // Имитация успешной отправки
                showSuccess();
            }
        });
        
        // Очистка ошибок при вводе
        [nameInput, emailInput, messageInput].forEach(input => {
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
        
        // Управление фокусом при ошибках
        contactForm.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                const errorElements = contactForm.querySelectorAll('[aria-invalid="true"]');
                if (errorElements.length > 0) {
                    event.preventDefault();
                    errorElements[0].focus();
                }
            }
        });
    }
    
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorId = input.id + '-error';
        
        // Создаем элемент ошибки если его нет
        let errorElement = document.getElementById(errorId);
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.id = errorId;
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        
        // Устанавливаем ошибку
        errorElement.textContent = message;
        errorElement.setAttribute('role', 'alert');
        errorElement.setAttribute('aria-live', 'assertive');
        
        // Помечаем поле как ошибочное
        input.setAttribute('aria-invalid', 'true');
        input.setAttribute('aria-describedby', input.getAttribute('aria-describedby') + ' ' + errorId);
        
        // Фокусируемся на первом ошибочном поле
        if (!contactForm.querySelector('[aria-invalid="true"]:focus')) {
            input.focus();
        }
    }
    
    function clearFieldError(input) {
        const errorId = input.id + '-error';
        const errorElement = document.getElementById(errorId);
        
        if (errorElement) {
            errorElement.remove();
        }
        
        input.setAttribute('aria-invalid', 'false');
        const describedBy = input.getAttribute('aria-describedby')
            .replace(errorId, '')
            .trim();
        input.setAttribute('aria-describedby', describedBy);
    }
    
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
        
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.setAttribute('aria-invalid', 'false');
            // Сохраняем только оригинальные описания
            const originalHint = input.id + '-hint';
            input.setAttribute('aria-describedby', originalHint);
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showSuccess() {
        // Создаем сообщение об успехе
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.setAttribute('role', 'alert');
        successMessage.setAttribute('aria-live', 'polite');
        successMessage.textContent = 'Сообщение успешно отправлено! Спасибо за ваше обращение.';
        
        // Вставляем перед формой
        contactForm.parentNode.insertBefore(successMessage, contactForm);
        
        // Очищаем форму
        contactForm.reset();
        
        // Фокусируемся на сообщении об успехе
        successMessage.focus();
        
        // Убираем сообщение через 5 секунд
        setTimeout(() => {
            successMessage.remove();
            // Возвращаем фокус на первую поле формы
            nameInput.focus();
        }, 5000);
    }
});
