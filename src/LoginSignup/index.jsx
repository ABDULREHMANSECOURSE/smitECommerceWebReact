import React, { useState, useEffect, useCallback } from 'react';
import { Eye, EyeOff, UserCircle } from 'lucide-react';
import './LoginSignup.css';

const MessageDisplay = ({ message, type }) => {
    if (!message) return null;
    const baseClasses = "popUPMessage";
    const colorStyle = type === 'error'
        ? { backgroundColor: '#fef2f2', color: '#b91c1c', border: '1px solid #fca5a5' }
        : { backgroundColor: '#f0fdf4', color: '#16a34a', border: '1px solid #86efac' };

    return (
        <div style={colorStyle} className={`mt-4 ${baseClasses}`} role="alert">
            {message}
        </div>
    );
};

const LoginComponent = ({
    loginEmail, setLoginEmail, loginPassword, setLoginPassword,
    showLoginPassword, setShowLoginPassword, handleLogin, toggleView
}) => (
    <form onSubmit={handleLogin} className="auth-form">
        <div className="form-section border-y py-8 px-2">
            <div className="input-group">
                <label htmlFor="emailL" className="input-label">Email:</label>
                <input
                    type="email"
                    id="emailL"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    className="form-input"
                    placeholder="Enter your email"
                />
            </div>
            <div className="input-group">
                <label htmlFor="passwordL" className="input-label">Password:</label>
                <div className="password-input-wrapper">
                    <input
                        type={showLoginPassword ? 'text' : 'password'}
                        id="passwordL"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                        className="form-input-password"
                        placeholder="••••••••"
                    />
                    <button type="button" onClick={() => setShowLoginPassword(!showLoginPassword)} className="password-toggle-btn">
                        {showLoginPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
            </div>
        </div>
        <button
            type="submit"
            className="submit-btn primary-btn"
        >
            Log In
        </button>
        <button
            type="button"
            onClick={() => toggleView('/signup')}
            className="toggle-view-btn"
        >
            Don't have an account? Create a New Account
        </button>
    </form>
);

const SignUpComponent = ({
    signUpForm, handleSignUpChange, handleSignUp, toggleView,
    showSignUpPassword, setShowSignUpPassword
}) => (
    <form onSubmit={handleSignUp} className="auth-form space-y-5-override">
        <div className="w-full space-y-4-override">
            <div className="input-group">
                <label htmlFor="name" className="input-label">Full Name</label>
                <input type="text" id="name" value={signUpForm.name} onChange={handleSignUpChange} required className="form-input" placeholder="Your full name" />
            </div>
            <div className="input-group">
                <label htmlFor="email" className="input-label">Email</label>
                <input type="email" id="email" value={signUpForm.email} onChange={handleSignUpChange} required className="form-input" placeholder="youremail@example.com" />
            </div>
            <div className="input-group">
                <label htmlFor="passwordS" className="input-label">Password</label>
                <div className="password-input-wrapper">
                    <input
                        type={showSignUpPassword ? 'text' : 'password'}
                        id="password"
                        value={signUpForm.password}
                        onChange={handleSignUpChange}
                        required
                        className="form-input-password"
                        placeholder="Minimum 8 characters"
                    />
                    <button type="button" onClick={() => setShowSignUpPassword(!showSignUpPassword)} className="password-toggle-btn">
                        {showSignUpPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
            </div>
        </div>

        <button
            type="submit"
            className="submit-btn primary-btn mt-5-override"
        >
            Create Account
        </button>
        <button
            type="button"
            onClick={() => toggleView('/login')}
            className="toggle-view-btn mt-neg10-override"
        >
            Already have an account? Log In
        </button>
    </form>
);

const ProfileComponent = ({ loggedAccountData, handleLogout, toggleView }) => {
    const [redirected, setRedirected] = useState(false);

    useEffect(() => {
        if (!loggedAccountData) {
            if (!redirected) {
                const timer = setTimeout(() => {
                    toggleView('/login');
                    setRedirected(true);
                }, 500);
                return () => clearTimeout(timer);
            }
        }
    }, [loggedAccountData, toggleView, redirected]);

    if (!loggedAccountData) {
        return <div className="loading-message">Profile data not found. Redirecting to login...</div>;
    }

    const { name, email } = loggedAccountData;

    return (
        <div className="profile-container">
            <h2 className="profile-title">Your Profile</h2>

            <div className="profile-image-large-container">
                <UserCircle size={80} style={{ color: '#9ca3af' }} />
            </div>

            <div className="profile-data-wrapper">
                <ProfileInfoBox title="Name" value={name} />
                <ProfileInfoBox title="Email" value={email} />
            </div>

            <button
                onClick={handleLogout}
                className="logout-btn"
            >
                Log Out
            </button>
        </div>
    );
};

const ProfileInfoBox = ({ title, value }) => (
    <div className="info-box">
        <h4 className="info-title">{title}</h4>
        <p className="info-value">{value}</p>
    </div>
);



export default function App() {

    const [currentView, setCurrentView] = useState('/login');
    const [accounts, setAccounts] = useState([]);
    const [loggedAccountData, setLoggedAccountData] = useState(null);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [signUpForm, setSignUpForm] = useState({
        name: '', email: '', password: '',
    });
    const [showSignUpPassword, setShowSignUpPassword] = useState(false);

    const [message, setMessage] = useState({ text: null, type: null });

    const toggleView = useCallback((path) => {
        setCurrentView(path);
        setMessage({ text: null, type: null });
    }, []);

    useEffect(() => {
        const storedAccounts = localStorage.getItem('accounts');
        if (storedAccounts) {
            setAccounts(JSON.parse(storedAccounts));
        }

        const storedLoggedEmail = localStorage.getItem('logedAccount');

        if (storedLoggedEmail && storedLoggedEmail !== 'null') {
            const email = JSON.parse(storedLoggedEmail);

            const allAccounts = storedAccounts ? JSON.parse(storedAccounts) : [];
            const user = allAccounts.find(acc => acc.email === email);

            if (user) {
                setLoggedAccountData(user);
                setCurrentView('/profile');
            } else {
                localStorage.removeItem('logedAccount');
            }
        }
    }, []);




    const handleSignUpChange = (e) => {
        const { id, value } = e.target;
        setSignUpForm(prev => ({ ...prev, [id]: value }));
    };

    const handleMessage = (text, type) => {
        setMessage({ text, type });
        setTimeout(() => setMessage({ text: null, type: null }), 5000);
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        setMessage({ text: null, type: null });

        const user = {};
        let isValid = true;

        if (isValid && signUpForm.name.trim().length < 2) {
            handleMessage('Name must be at least 2 characters.', 'error'); isValid = false;
        } else if (isValid) { user.name = signUpForm.name.trim(); }

        if (isValid) {
            const lowerCaseEmail = signUpForm.email.toLowerCase();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (accounts.some(eF => eF.email === lowerCaseEmail)) {
                handleMessage('This email already exists.', 'error'); isValid = false;
            } else if (!emailRegex.test(lowerCaseEmail)) {
                handleMessage('Please enter a valid email address.', 'error'); isValid = false;
            } else {
                user.email = lowerCaseEmail;
            }
        }

        if (isValid) {
            if (signUpForm.password.includes(' ')) {
                handleMessage("Password should not contain spaces.", 'error'); isValid = false;
            } else if (signUpForm.password.length < 8) {
                handleMessage("Password must be at least 8 characters long.", 'error'); isValid = false;
            } else {
                user.password = signUpForm.password;
            }
        }

        if (isValid) {
            const newAccounts = [...accounts, user];
            setAccounts(newAccounts);
            localStorage.setItem('accounts', JSON.stringify(newAccounts));

            handleMessage('Account created successfully! You can now log in.', 'success');

            setSignUpForm({ name: '', email: '', password: '' });

            toggleView('/login');
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setMessage({ text: null, type: null });

        const lowerCaseLoginEmail = loginEmail.toLowerCase();

        const foundUser = accounts.find(
            (acc) => acc.email === lowerCaseLoginEmail && acc.password === loginPassword
        );

        if (foundUser) {
            localStorage.setItem('logedAccount', JSON.stringify(foundUser.email));

            setLoggedAccountData(foundUser);

            handleMessage(`Login Successful! Welcome, ${foundUser.fName}!`, 'success');

            setLoginEmail('');
            setLoginPassword('');

            toggleView('/profile');
        } else {
            handleMessage("Login Failed: Invalid Email or Password.", 'error');
        }
    };

    const handleLogout = () => {
        setLoggedAccountData(null);
        localStorage.removeItem('logedAccount');
        handleMessage('You have been successfully logged out.', 'success');
        toggleView('/login');
    };

    const renderCurrentView = () => {
        switch (currentView) {
            case '/login':
            case '/default':
                return (
                    <>
                        <h2 className="main-heading">Log In</h2>
                        <LoginComponent
                            loginEmail={loginEmail} setLoginEmail={setLoginEmail}
                            loginPassword={loginPassword} setLoginPassword={setLoginPassword}
                            showLoginPassword={showLoginPassword} setShowLoginPassword={setShowLoginPassword}
                            handleLogin={handleLogin} toggleView={toggleView}
                        />
                    </>
                );
            case '/signup':
                return (
                    <>
                        <h2 className="main-heading">Create New Account</h2>
                        <SignUpComponent
                            signUpForm={signUpForm} handleSignUpChange={handleSignUpChange}
                            handleSignUp={handleSignUp} toggleView={toggleView}
                            showSignUpPassword={showSignUpPassword} setShowSignUpPassword={setShowSignUpPassword}
                        />
                    </>
                );
            case '/profile':
                return (
                    <ProfileComponent
                        loggedAccountData={loggedAccountData}
                        handleLogout={handleLogout}
                        toggleView={toggleView}
                    />
                );
            default:
                return toggleView('/login');
        }
    };

    return (
        <>
            <style>
                {`
                /* Base Reset and Layout */
                body {
                    margin: 0;
                    padding: 0;
                    height: 100vh;
                    font-family: 'Inter', sans-serif;
                    background-color: #000000ff; /* bg-gray-50 */
                }
                
                .app-container {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px 15px;
                }

                @media (min-width: 640px) {
                    .app-container {
                        padding: 2rem;
                    }
                }

                /* Authentication Card/Box */
                .auth-card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background-color: #ffffff21;
                    padding: 1.5rem; /* p-6 */
                    border-radius: 1.5rem; /* rounded-3xl */
                    width: 100%;
                    max-width: 28rem; /* max-w-md */
                    transition: all 0.5s ease-in-out;
                    box-sizing: border-box;
                }

                @media (min-width: 640px) {
                    .auth-card {
                        padding: 2.5rem; /* sm:p-10 */
                    }
                }

                /* Headers and Typography */
                .main-heading {
                    font-size: 1.875rem; /* text-3xl */
                    font-weight: 700; /* font-bold */
                    color: #ffffffff; /* text-gray-800 */
                    margin-bottom:20px;
                }

                .auth-form {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                    row-gap: 15px;
                }
                .space-y-4-override{
                    width:100%;
                }
                .space-y-4-override > div { 
                    margin-top: 1rem;
                }
                .mt-5-override { margin-top: 1.25rem; }
                .mt-neg10-override { margin-top: -0.625rem; padding-bottom: 1rem; }

                /* Inputs and Groups */
                .input-group {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    row-gap: 0.5rem; /* space-y-2 */
                    margin-top: 30px;
                }

                .input-label {
                    font-weight: 600; /* font-semibold */
                    color: #ffffffff; /* text-gray-700 */
                }
                .gender-select-override option{
                    color: #000000ff;
                }

                .form-input {
                    width: 100%;
                    padding: 0.75rem; /* p-3 */
                    background-color: #00000010; /* bg-gray-100 */
                    border: 1px solid #ffffffff; /* border border-gray-200 */
                    border-radius: 0.5rem; /* rounded-lg */
                    outline: none;
                    transition: border-color 0.2s, box-shadow 0.2s;
                    color: #ffffffff;
                }

                .form-input:focus {
                    border-color: #ffffffff; /* focus:ring-indigo-500 */
                    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5); /* focus:ring-2 */
                }
                
                .form-section {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    row-gap: 1.5rem; /* space-y-6 */
                    border-top: 1px solid #d1d5db; /* border-y border-gray-300 */
                    border-bottom: 1px solid #ffffffff;
                    padding-bottom: 30px;
                }

                /* Password Input Specifics */
                .password-input-wrapper {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    background-color: #ffffff10;
                    border: 1px solid #e5e7eb;
                    border-radius: 0.5rem;
                    padding-right: 0.5rem;
                }
                
                .form-input-password {
                    flex-grow: 1;
                    padding: 0.75rem;
                    background-color: transparent;
                    border: none;
                    outline: none;
                }
                
                .password-toggle-btn {
                    padding: 0.25rem;
                    color: #6b7280; /* text-gray-500 */
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    transition: color 0.2s;
                }
                
                .password-toggle-btn:hover {
                    color: #4f46e5; /* hover:text-indigo-600 */
                }

                /* Name Fields Group (Sign Up) */
                .name-fields-group {
                    display: flex;
                    width: 100%;
                    column-gap: 1rem;
                    flex-wrap: wrap;
                }
                
                .flex-1-override {
                    flex: 1;
                    min-width: 120px;
                }

                /* Buttons */
                .submit-btn {
                    width: 100%;
                    padding: 0.75rem 0; /* py-3 */
                    font-size: 1.25rem; /* text-xl */
                    font-weight: 700; /* font-bold */
                    color: white;
                    border-radius: 0.75rem; /* rounded-xl */
                    border: none;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1); /* shadow-lg */
                    transition: background-color 0.2s, transform 0.2s;
                    cursor: pointer;
                }
                
                .primary-btn {
                    background-color: #4f46e5; /* bg-indigo-600 */
                }
                
                .primary-btn:hover {
                    background-color: #4338ca; /* hover:bg-indigo-700 */
                    transform: scale(1.01);
                }

                .toggle-view-btn {
                    font-size: 0.875rem; /* text-sm */
                    color: #6366f1; /* text-indigo-500 */
                    background: none;
                    border: none;
                    cursor: pointer;
                    font-weight: 500;
                    transition: color 0.2s;
                }
                
                .toggle-view-btn:hover {
                    color: #4338ca; /* hover:text-indigo-700 */
                }

                /* Profile Upload */
                .profile-upload-area {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    row-gap: 0.75rem; /* space-y-3 */
                }

                .profile-image-container {
                    position: relative;
                    width: 6rem; /* w-24 */
                    height: 6rem; /* h-24 */
                    border-radius: 50%;
                    border: 4px solid #818cf8; /* border-4 border-indigo-400 */
                    overflow: hidden;
                    background-color: #e5e7eb; /* bg-gray-200 */
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }
                
                .profile-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .profile-file-input {
                    position: absolute;
                    inset: 0;
                    opacity: 0;
                    cursor: pointer;
                }

                /* Profile View */
                .profile-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                    row-gap: 1.5rem; /* space-y-6 */
                    padding: 1rem; /* p-4 */
                }

                .profile-title {
                    font-size: 1.875rem;
                    font-weight: 800; /* font-extrabold */
                    color: #4338ca; /* text-indigo-700 */
                    margin-bottom: 1rem;
                }

                .profile-image-large-container {
                    width: 8rem; /* w-32 */
                    height: 8rem; /* h-32 */
                    border-radius: 50%;
                    overflow: hidden;
                    border: 4px solid #6366f1; /* border-4 border-indigo-500 */
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05); /* shadow-lg */
                    margin-bottom: 1rem;
                    background-color: #e5e7eb;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .profile-data-wrapper {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    row-gap: 1rem; /* space-y-4 */
                }

                .info-box {
                    background-color: #ffffff11; /* bg-gray-100 */
                    padding: 1rem; /* p-4 */
                    border-radius: 0.75rem; /* rounded-xl */
                    box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06); /* shadow-inner */
                }

                .info-title {
                    font-size: 0.875rem; /* text-sm */
                    font-weight: 600; /* font-semibold */
                    color: #ffffffff; /* text-gray-500 */
                    margin-bottom: 15px;
                }

                .info-value {
                    font-size: 1.25rem; /* text-xl */
                    font-weight: 500; /* font-medium */
                    color: #ffffffff; /* text-gray-800 */
                }

                .logout-btn {
                    width: 100%;
                    padding: 0.75rem 0;
                    font-size: 1.125rem; /* text-lg */
                    font-weight: 700;
                    color: #4f46e5;
                    border: 1px solid #4f46e5;
                    background-color: transparent;
                    border-radius: 0.75rem;
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1); /* shadow-md */
                    transition: background-color 0.2s;
                    margin-top: 1.5rem; /* mt-6 */
                    cursor: pointer;
                }

                .logout-btn:hover {
                    background-color: #eef2ff; /* hover:bg-indigo-50 */
                }
                
                .loading-message {
                    padding: 1rem;
                    text-align: center;
                    color: #6b7280;
                    font-weight: 600;
                }

                @media (max-width: 500px) {
                    .auth-card {
                        padding: 1.2rem;
                        border-radius: 1rem;
                    }
                    .main-heading {
                        font-size: 1.5rem;
                    }
                    .name-fields-group {
                        flex-direction: column;
                    }
                    .submit-btn {
                        font-size: 1rem;
                    }
                }
            `}
            </style>

            <div className="app-container">
                <div className="auth-card">

                    <MessageDisplay message={message.text} type={message.type} />

                    {renderCurrentView()}
                </div>
            </div>
        </>
    );
}