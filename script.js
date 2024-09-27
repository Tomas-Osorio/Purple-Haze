$(document).ready(function() {
    // Open login modal when clicking on login button
    $('#loginButton').click(function() {
        $('#loginModal').show();
    });

    // Open signup modal when clicking on register button
    $('#registerButton').click(function() {
        $('#signupModal').show();
    });

    // Close modals when clicking the close button
    $('.close').click(function() {
        $(this).closest('.modal').hide();
    });

    // Switch to Signup modal from Login modal
    $('#showSignup').click(function() {
        $('#loginModal').hide();
        $('#signupModal').show();
    });

    // Switch to Login modal from Signup modal
    $('#showLogin').click(function() {
        $('#signupModal').hide();
        $('#loginModal').show();
    });

    // Login function
    $('#loginSubmit').click(function() {
        const email = $('#loginEmail').val();
        const password = $('#loginPassword').val();
        const user = JSON.parse(localStorage.getItem(email));

        if (user && user.password === password) {
            alert('Login successful!');
            $('#loginModal').hide();
        } else {
            alert('Invalid email or password.');
        }
    });

    // Signup function
    $('#signupSubmit').click(function() {
        const email = $('#signupEmail').val();
        const username = $('#signupUsername').val();
        const password = $('#signupPassword').val();

        if (localStorage.getItem(email)) {
            alert('Email already exists. Please choose another one.');
        } else {
            const user = { username, password };
            localStorage.setItem(email, JSON.stringify(user));
            alert('Sign up successful! You can now log in.');
            $('#signupModal').hide();
            $('#loginModal').show();
        }
    });

    // Handle review submission
    $('#submitReview').click(function() {
        const review = $('#reviewText').val();
        if (review) {
            $('#reviews').append('<p>' + review + '</p>');
            $('#reviewText').val('');
        } else {
            alert("Please enter a review.");
        }
    });
});
$(document).ready(function() {
    // Function to validate email format
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Open login modal when clicking on login button
    $('#loginButton').click(function() {
        $('#loginModal').show();
    });

    // Open signup modal when clicking on register button
    $('#registerButton').click(function() {
        $('#signupModal').show();
    });

    // Close modals when clicking the close button
    $('.close').click(function() {
        $(this).closest('.modal').hide();
    });

    // Switch to Signup modal from Login modal
    $('#showSignup').click(function() {
        $('#loginModal').hide();
        $('#signupModal').show();
    });

    // Switch to Login modal from Signup modal
    $('#showLogin').click(function() {
        $('#signupModal').hide();
        $('#loginModal').show();
    });

    // Login form validation and submission
    $('#loginSubmit').click(function() {
        const email = $('#loginEmail').val();
        const password = $('#loginPassword').val();
        const user = JSON.parse(localStorage.getItem(email));

        if (!validateEmail(email)) {
            $('#loginError').show().text('Invalid email format.');
        } else if (password.length < 6) {
            $('#loginError').show().text('Password must be at least 6 characters.');
        } else if (user && user.password === password) {
            alert('Login successful!');
            $('#loginError').hide();
            $('#loginModal').hide();
        } else {
            $('#loginError').show().text('Invalid email or password.');
        }
    });

    // Sign-up form validation and submission
    $('#signupSubmit').click(function() {
        const email = $('#signupEmail').val();
        const username = $('#signupUsername').val();
        const password = $('#signupPassword').val();

        if (!validateEmail(email)) {
            $('#signupError').show().text('Invalid email format.');
        } else if (username === '') {
            $('#signupError').show().text('Username cannot be empty.');
        } else if (password.length < 6) {
            $('#signupError').show().text('Password must be at least 6 characters.');
        } else if (localStorage.getItem(email)) {
            $('#signupError').show().text('Email already exists. Please log in.');
        } else {
            const user = { username, password };
            localStorage.setItem(email, JSON.stringify(user));
            alert('Sign up successful! You can now log in.');
            $('#signupError').hide();
            $('#signupModal').hide();
            $('#loginModal').show();
        }
    });

    // Handle review submission
    $('#submitReview').click(function() {
        const review = $('#reviewText').val();
        if (review) {
            $('#reviews').append('<p>' + review + '</p>');
            $('#reviewText').val('');
        } else {
            alert("Please enter a review.");
        }
    });

    // Handle logout
    $('#logoutButton').click(function() {
        localStorage.removeItem('currentUser');
        alert('You have logged out.');
        $('#logoutButton').hide();
    });

    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        $('#logoutButton').show(); // Show the logout button if logged in
    }
});
