document.addEventListener('DOMContentLoaded', () => {
    const indianCard = document.getElementById('card-indian');
    const japaneseCard = document.getElementById('card-japanese');
    const starsContainer = document.getElementById('stars');

    // 1. Navigation logic
    const navigate = (destination) => {
        if (destination === 'indian') {
            window.open('https://india.talktokrishna.ai', '_blank'); 
        } else if (destination === 'japanese') {
            window.open('https://japan.talktokrishna.ai', '_blank');
        }
    };

    indianCard.addEventListener('click', () => {
        if (typeof gtag === 'function') {
            gtag('event', 'portal_click', { 
                'portal_type': 'indian',
                'event_category': 'engagement',
                'event_label': 'Go to Indian Portal'
            });
            console.log('GA Event Sent: Indian Portal Clicked');
        }
        navigate('indian');
    });

    japaneseCard.addEventListener('click', () => {
        if (typeof gtag === 'function') {
            gtag('event', 'portal_click', { 
                'portal_type': 'japanese',
                'event_category': 'engagement',
                'event_label': 'Go to Japanese Portal'
            });
            console.log('GA Event Sent: Japanese Portal Clicked');
        }
        navigate('japanese');
    });


    // 3. Ultra-Premium Card 3D Effect
    const handleCardTilt = (e, card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = ((y - rect.height / 2) / rect.height) * -15;
        const rotateY = ((x - rect.width / 2) / rect.width) * 15;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const resetCardTilt = (card) => {
        card.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    };

    [indianCard, japaneseCard].forEach(card => {
        card.addEventListener('mousemove', (e) => handleCardTilt(e, card));
        card.addEventListener('mouseleave', () => resetCardTilt(card));
        
    });

    // 4. Star Background Generator
    const createStars = () => {
        for (let i = 0; i < 150; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            const size = Math.random() * 2;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.opacity = Math.random();
            starsContainer.appendChild(star);
        }
    };
    createStars();

    // 5. Staggered Entrance Animations
    const hero = document.querySelector('.hero');
    const cards = document.querySelectorAll('.card');

    setTimeout(() => {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }, 400);

    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) rotateX(-5deg)';
        
        setTimeout(() => {
            card.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) rotateX(0deg)';
        }, 800 + (index * 300));
    });
});
