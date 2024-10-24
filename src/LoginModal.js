import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

const LoginModal = ({ onClose, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.email === email && storedUser.password === password) {
            onLogin(storedUser);
            onClose();
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Login</h2>
                <input 
                    type="text" 
                    placeholder="Email" 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <span className="password-icon" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                <button onClick={handleSubmit}>Login</button>
            </div>
        </div>
    );
};

export default LoginModal;
