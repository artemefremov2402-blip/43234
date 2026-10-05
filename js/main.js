// ===== HEADER SCROLL EFFECT =====
const header = document.querySelector('.header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ===== БУРГЕР-МЕНЮ (с проверкой!) =====
const burger = document.querySelector('.burger');
const navMenu = document.querySelector('.nav-menu');

if (burger && navMenu) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
} else {
    console.warn('⚠️ Бургер-меню не найдено на этой странице');
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll(
    '.feature-card, .service-card, .value-card, .team-card, .service-item, .contact-item, .benefit-card, .step'
);

animatedElements.forEach((el, index) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${index * 0.05}s`;
    observer.observe(el);
});

// ===== НАСТРОЙКИ TELEGRAM =====
const TELEGRAM_BOT_TOKEN = '8999307315:AAHZUcpFXZj3bvg-eG765fjgPEpGFFSMJao';  // ← ЗАМЕНИТЕ!
const TELEGRAM_CHAT_ID = '7849467361';  // ← ЗАМЕНИТЕ!

console.log('🚀 Скрипт загружен');

// ===== ФОРМА ЗАПИСИ =====
document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('bookingForm');
    
    if (!bookingForm) {
        console.log('ℹ️ Форма bookingForm не найдена на этой странице');
        return;
    }
    
    console.log('✅ Форма найдена');
    
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('📤 Форма отправлена');
        
        const formData = new FormData(bookingForm);
        const data = Object.fromEntries(formData);
        console.log('📋 Данные:', data);
        
        const services = {
            'haircut': '️ Стрижка',
            'coloring': '🎨 Окрашивание',
            'styling': '💇 Укладка',
            'manicure': '💅 Маникюр',
            'pedicure': '🦶 Педикюр',
            'facial': '✨ Чистка лица',
            'peeling': ' Пилинг',
            'massage': '💆 Массаж'
        };
        
        const message = `🌸 НОВАЯ ЗАЯВКА НА ЗАПИСЬ 🌸\n\n` +
            ` Имя: ${data.name}\n` +
            `📱 Телефон: ${data.phone}\n` +
            `💅 Услуга: ${services[data.service] || data.service}\n` +
            `📅 Дата: ${data.date || 'Не указана'}\n` +
            `🕐 Время: ${data.time || 'Не указано'}\n` +
            `💬 Комментарий: ${data.comment || 'Нет'}\n\n` +
            `🕐 Отправлено: ${new Date().toLocaleString('ru-RU')}`;
        
        console.log('💬 Сообщение:', message);
        
        try {
            const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
            console.log(' URL:', url);
            
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: message,
                    parse_mode: 'HTML'
                })
            });
            
            const result = await response.json();
            console.log('📨 Ответ Telegram:', result);
            
            if (result.ok) {
                alert('✅ Заявка отправлена! Мы свяжемся с вами.');
                bookingForm.reset();
            } else {
                alert('❌ Ошибка: ' + result.description);
            }
        } catch (error) {
            console.error(' Ошибка:', error);
            alert('❌ Ошибка отправки: ' + error.message);
        }
    });
});

// ===== МАСКА ДЛЯ ТЕЛЕФОНА =====
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.startsWith('8')) value = '7' + value.slice(1);
        if (value.length > 0 && value[0] !== '7') value = '7' + value;
        
        let formatted = '+7';
        if (value.length > 1) formatted += ' (' + value.slice(1, 4);
        if (value.length > 4) formatted += ') ' + value.slice(4, 7);
        if (value.length > 7) formatted += '-' + value.slice(7, 9);
        if (value.length > 9) formatted += '-' + value.slice(9, 11);
        
        e.target.value = formatted;
    });
}

// ===== МИНИМАЛЬНАЯ ДАТА =====
const dateInput = document.getElementById('date');
if (dateInput) {
    dateInput.setAttribute('min', new Date().toISOString().split('T')[0]);
}

console.log('✨ Сайт готов к работе');