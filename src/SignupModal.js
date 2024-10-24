import React, { useState, useRef, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

const SignupModal = ({ onClose, onLogin }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const modalRef = useRef(); // Crea una referencia para el modal

    const handleSubmit = () => {
        if (email && username && password.length >= 8) {
            const user = { email, username, password };
            localStorage.setItem('user', JSON.stringify(user));
            onLogin(user);
            onClose();
        } else {
            alert('Please fill in all fields correctly.');
        }
    };

    // Maneja clics fuera del modal
    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    };

    useEffect(() => {
        window.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="modal">
            <div className="modal-content" ref={modalRef}>
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Sign Up</h2>
                <input 
                    type="text" 
                    placeholder="Email" 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="Username" 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <input 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <span className="password-icon2" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                <button onClick={handleSubmit}>Sign Up</button>
            </div>
        </div>
    );
};

export default SignupModal;
