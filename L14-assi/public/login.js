document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const switchToSignupBtn = document.getElementById('switch-to-signup');
    const switchToLoginBtn = document.getElementById('switch-to-login');
    const formContainer = document.querySelector('.form-container');

   
    switchToSignupBtn.addEventListener('click', () => {
        formContainer.style.transform = 'rotateY(180deg)';
        switchToSignupBtn.style.display = 'none';
        switchToLoginBtn.style.display = 'block';
    });


    switchToLoginBtn.addEventListener('click', () => {
        formContainer.style.transform = 'rotateY(0deg)';
        switchToLoginBtn.style.display = 'none';
        switchToSignupBtn.style.display = 'block';
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = loginForm.email.value;
        const password = loginForm.password.value;
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const result = await response.json();
        alert(result.message);
        if (response.ok) {
            window.location.href = '/index.html';
        }
    });

 
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = signupForm.name.value;
        const email = signupForm.email.value;
        const password = signupForm.password.value;
        const response = await fetch('/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });
        const result = await response.json();
        alert(result.message);
        if (response.ok) {
     
            formContainer.style.transform = 'rotateY(0deg)';
             switchToLoginBtn.style.display = 'none';
             switchToSignupBtn.style.display = 'block';
        }
    });
});