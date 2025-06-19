document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    const responseYes = document.getElementById('response-yes');
    const responseNo = document.getElementById('response-no');
    const infiniteLine = document.getElementById('infinite-line');
    const infiniteDate = document.getElementById('infinite-date');
    
    // Variables
    let noCount = 0;
    const noMessages = [
        "Dame otra oportunidad oe :c",
        "Piénsalo otra vez pe",
        "Asu como te gusta molestarme no :v te pasas Mariana",
        "Vale, lo entiendo... UnU me voy y dramaticamente"
    ];
    
    // Efecto al decir SÍ
    btnYes.addEventListener('click', function() {
        btnYes.style.display = 'none';
        btnNo.style.display = 'none';
        responseYes.style.display = 'block';
        infiniteLine.style.display = 'block';
        infiniteDate.style.display = 'block';
        createHearts();
        animateInfinity();
    });
    
    // Efecto al decir NO
    btnNo.addEventListener('click', function() {
        noCount++;
        
        if (noCount <= noMessages.length) {
            btnNo.textContent = noMessages[noCount - 1];
        }
        
        moveButton(btnNo);
        
        // Respuesta final después de 4 NO
        if (noCount >= 4) {
            responseNo.style.display = 'block';
            btnYes.style.display = 'none';
            btnNo.style.display = 'none';
            
            // Iniciar cuenta regresiva para cerrar
            let secondsLeft = 10;
            const countdownElement = document.createElement('div');
            countdownElement.style.textAlign = 'center';
            countdownElement.style.marginTop = '20px';
            countdownElement.style.fontWeight = 'bold';
            countdownElement.style.color = '#8b2e2e';
            responseNo.appendChild(countdownElement);
            
            const countdownInterval = setInterval(() => {
                countdownElement.textContent = `Cerrando en ${secondsLeft} segundos...`;
                secondsLeft--;
                
                if (secondsLeft < 0) {
                    clearInterval(countdownInterval);
                    fadeOutAndClose();
                }
            }, 1000);
        }
    });
    
    function fadeOutAndClose() {
        // Efecto de desvanecimiento
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '0';
        
        // Intentar cerrar después de 1 segundo
        setTimeout(() => {
            try {
                // Intento principal de cerrar
                window.close();
                
                // Plan B si no se puede cerrar
                if (!window.closed) {
                    document.body.innerHTML = `
                        <div style="
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            background: white;
                            font-family: 'Montserrat', sans-serif;
                            text-align: center;
                            padding: 20px;
                        ">
                            <p>Puedes cerrar esta pestaña ahora.</p>
                        </div>
                    `;
                    document.body.style.opacity = '1';
                }
            } catch (e) {
                console.error('Error al cerrar:', e);
            }
        }, 1000);
    }
    
    function animateInfinity() {
        let scale = 1;
        const pulse = () => {
            scale = scale === 1 ? 1.1 : 1;
            infiniteDate.style.transform = `scale(${scale})`;
            requestAnimationFrame(pulse);
        };
        pulse();
    }
    
    function moveButton(btn) {
        const containerRect = document.querySelector('.container').getBoundingClientRect();
        const btnRect = btn.getBoundingClientRect();
        
        const safeArea = {
            top: containerRect.top + 150,
            bottom: containerRect.bottom - btnRect.height - 20,
            left: containerRect.left + 20,
            right: containerRect.right - btnRect.width - 20
        };
        
        const randomX = Math.random() * (safeArea.right - safeArea.left) + safeArea.left;
        const randomY = Math.random() * (safeArea.bottom - safeArea.top) + safeArea.top;
        
        btn.style.position = 'absolute';
        btn.style.left = `${randomX - containerRect.left}px`;
        btn.style.top = `${randomY - containerRect.top}px`;
    }
    
    function createHearts() {
        const colors = ['#ff7e5f', '#ff9a8b', '#ff6b6b', '#3cb371'];
        
        for (let i = 0; i < 25; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'heart';
                heart.innerHTML = '💚';
                heart.style.position = 'absolute';
                heart.style.fontSize = `${Math.random() * 20 + 15}px`;
                heart.style.left = `${Math.random() * 80 + 10}%`;
                heart.style.top = `${Math.random() * 80 + 10}%`;
                heart.style.opacity = '0';
                heart.style.color = colors[Math.floor(Math.random() * colors.length)];
                heart.style.animation = `float ${Math.random() * 2 + 2}s ease-in infinite`;
                heart.style.zIndex = '10';
                
                document.querySelector('.container').appendChild(heart);
                
                setTimeout(() => {
                    heart.style.opacity = '1';
                }, 100);
                
                setTimeout(() => {
                    heart.remove();
                }, 3000);
            }, i * 150);
        }
    }
});
