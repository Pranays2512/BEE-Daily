document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.querySelector('.form-container');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const addBlogForm = document.getElementById('addblog');

    const switchToSignupBtn = document.getElementById('switch-to-signup');
    const switchToLoginBtn = document.getElementById('switch-to-login');
    const logoutBtn = document.getElementById('logout-button');

    if (localStorage.getItem('token')) {
        showAuthenticatedView();
    } else {
        showUnauthenticatedView();
    }

    

    switchToSignupBtn.addEventListener('click', () => {
        formContainer.classList.add('flipped');
        switchToSignupBtn.style.display = 'none';
        switchToLoginBtn.style.display = 'inline-block';
    });

    switchToLoginBtn.addEventListener('click', () => {
        formContainer.classList.remove('flipped');
        switchToLoginBtn.style.display = 'none';
        switchToSignupBtn.style.display = 'inline-block';
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        showUnauthenticatedView();
        alert('You have been logged out.');
    });

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
       let username=signupForm.username.value;
       let email=signupForm.email.value;
       let password=signupForm.password.value;
       let response= await fetch("/api/users/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:username,
                email:email,
                password:password

            })

        })
        let data=await response.json();
        console.log(data);



    });
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let email = loginForm.email.value;
    let password = loginForm.password.value;

    let response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    let data = await response.json();
    console.log(data);

   
});


    addBlogForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You must be logged in to post a blog.');
            return;
        }

        const formData = new FormData(addBlogForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/blogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || 'Failed to publish blog.');

            alert('Blog published successfully!');
            addBlogForm.reset();
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    });

   

    function showAuthenticatedView() {
        formContainer.style.display = 'none';
        switchToSignupBtn.style.display = 'none';
        switchToLoginBtn.style.display = 'none';
        addBlogForm.style.display = 'block';
        logoutBtn.style.display = 'inline-block';
    }

    function showUnauthenticatedView() {
        formContainer.style.display = 'block';
        switchToSignupBtn.style.display = 'inline-block';
        switchToLoginBtn.style.display = 'none';
        addBlogForm.style.display = 'none';
        logoutBtn.style.display = 'none';
    }
});
