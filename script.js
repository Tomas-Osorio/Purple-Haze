$(document).ready(function() {
    // Profile Image Persistence
    const savedImage = localStorage.getItem('userProfileImage');
    if (savedImage) {
        $('#userImage').attr('src', savedImage);
    }

    // Status Persistence
    const savedStatus = localStorage.getItem('userStatus');
    if (savedStatus) {
        $('#profileButton').append(` (${savedStatus})`);
    }

    // Save Profile Image
    $('#saveProfileImage').click(function() {
        const newImage = $('#newProfileImage').prop('files')[0];
        if (newImage) {
            const reader = new FileReader();
            reader.onload = function(e) {
                localStorage.setItem('userProfileImage', e.target.result);
                $('#userImage').attr('src', e.target.result);
                alert('Profile picture updated successfully!');
            };
            reader.readAsDataURL(newImage);
            $('#updateImageModal').hide();
        } else {
            alert('Please select an image.');
        }
    });

    // Save Status
    $('#saveStatus').click(function() {
        const newStatus = $('#newStatus').val();
        if (newStatus) {
            localStorage.setItem('userStatus', newStatus);
            alert('Status updated to: ' + newStatus);
            $('#updateStatusModal').hide();
        } else {
            alert('Please enter a status.');
        }
    });

    // User Registration - Local Storage for user data
    $('#signupSubmit').click(function() {
        const email = $('#signupEmail').val();
        const username = $('#signupUsername').val();
        const password = $('#signupPassword').val();

        if (email && username && password.length >= 8) {
            const user = { email, username, password };
            localStorage.setItem('user', JSON.stringify(user));
            alert('Registration successful!');
            $('#signupModal').hide();
        } else {
            $('#signupError').show();
        }
    });

    // User Login
    $('#loginSubmit').click(function() {
        const email = $('#loginEmail').val();
        const password = $('#loginPassword').val();
        const rememberMe = $('#rememberMe').is(':checked');
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && storedUser.email === email && storedUser.password === password) {
            alert('Login successful!');
            if (rememberMe) {
                localStorage.setItem('currentUser', JSON.stringify(storedUser));
            }
            $('#loginModal').hide();
            $('#loginButton').hide();
            $('#registerButton').hide();
            $('#usernameDisplay').text(storedUser.username);
        } else {
            $('#loginError').show();
        }
    });

    // Logout - Functionality moved to profile dropdown
    $('#logoutProfileOption').click(function() {
        localStorage.removeItem('currentUser');
        alert('Logged out successfully!');
        $('#loginButton').show();
        $('#registerButton').show();
        $('#usernameDisplay').text('Username');
        window.location.reload(); // Optional: Reload the page after logout
    });

    // Show/Hide modals
    $('#loginButton').click(function() {
        $('#loginModal').show();
    });

    $('#registerButton').click(function() {
        $('#signupModal').show();
    });

    $('.close').click(function() {
        $(this).closest('.modal').hide();
    });

    // Restore logged-in state if "Remember Me" was selected
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        $('#loginButton').hide();
        $('#registerButton').hide();
        $('#usernameDisplay').text(currentUser.username);
    }
});
