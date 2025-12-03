import React, { useState, useEffect } from 'react';

// ⚠️ IMPORTANT: Please ensure these images exist in a folder named 'assets' next to this file.
import arpLogo from './assets/arpLogo.png'; 
import eyeOn from './assets/eyeon.png';
import eyeOff from './assets/eyeoff.png'; 

// --- Popups (Using alert as requested) ---
const popup = (text) => {
    alert(`Error: ${text}`);
};

const popupGreen = (text) => {
    alert(`Success: ${text}`);
};

// =========================================================================
//                             EXTERNAL COMPONENTS
// =========================================================================

// Components ko yahan bahar define kiya gaya hai, taake yeh har re-render par dobara na banen.

// --- 1. Login Component ---
const LoginComponent = ({
    loginEmail, setLoginEmail, loginPassword, setLoginPassword, 
    showLoginPassword, setShowLoginPassword, handleLogin, toggleView,
    epStyle, inputContainerStyle, textInputStyle, passwordInputWrapperStyle, 
    passwordInputStyle, eyeIconStyle, buttonStyle, linkButtonStyle
}) => (
    <form id="logIn" onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <div style={epStyle}>
            <div id="emailContainerL" style={inputContainerStyle}>
                <h3>Email: </h3>
                <input type="email" id="emailL" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required style={textInputStyle} />
            </div>
            <div id="passwordContainerL" style={inputContainerStyle}>
                <h3>Password: </h3>
                <div style={passwordInputWrapperStyle}>
                    <input type={showLoginPassword ? 'text' : 'password'} id="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required style={passwordInputStyle} />
                    <img id="passEye" src={showLoginPassword ? eyeOff : eyeOn} alt="Toggle Password Visibility" onClick={() => setShowLoginPassword(!showLoginPassword)} style={eyeIconStyle} />
                </div>
            </div>
        </div>
        <button type="submit" id="button" style={buttonStyle}>Log In</button>
        <button type="button" id="dontHaveAccount" onClick={() => toggleView('signup')} style={linkButtonStyle}>
            Don't have an account
        </button>
    </form>
);

// --- 2. Sign Up Component ---
const SignUpComponent = ({
    signUpForm, handleSignUpChange, handleSignUp, toggleView,
    showSignUpPassword, setShowSignUpPassword,
    nameRowStyle, nameFieldStyle, largeInputStyle, selectStyle, 
    siEpContainerStyle, siEpFieldStyle, siPasswordWrapperStyle, 
    passwordInputStyle, eyeIconStyle, fullRowContainerStyle, buttonStyle, 
    haveAccountStyle, eyeOn, eyeOff
}) => (
    <form id="signUp" onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '20px' }}>
        <div id="nameContainer" style={nameRowStyle}>
            <div id="fnameContainer" style={nameFieldStyle}>
                <h2>First name</h2>
                <input type="text" placeholder="First Name" id="fName" value={signUpForm.fName} onChange={handleSignUpChange} required style={largeInputStyle} />
            </div>
            <div id="lnameContainer" style={nameFieldStyle}>
                <h2>Last Name</h2>
                <input type="text" placeholder="Last Name" id="lName" value={signUpForm.lName} onChange={handleSignUpChange} required style={largeInputStyle} />
            </div>
        </div>

        <select id="gender" value={signUpForm.gender} onChange={handleSignUpChange} required style={selectStyle}>
            <option value="select gender" disabled>Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
        </select>

        <div id="emailPasswordContainer" style={siEpContainerStyle}>
            <div id="emailContainerS" style={siEpFieldStyle}>
                <h2>Email</h2>
                <input type="email" id="email" value={signUpForm.email} onChange={handleSignUpChange} required style={largeInputStyle} />
            </div>
            <div id="passwordContainerS" style={siEpFieldStyle}>
                <h2>Password</h2>
                <div style={siPasswordWrapperStyle}>
                    {/* ✅ FIX: Changed id from 'passwordS' to 'password' to match signUpForm state key */}
                    <input type={showSignUpPassword ? 'text' : 'password'} id="password" value={signUpForm.password} onChange={handleSignUpChange} required style={passwordInputStyle} />
                    <img id="eyeS" src={showSignUpPassword ? eyeOff : eyeOn} alt="Toggle Password Visibility" onClick={() => setShowSignUpPassword(!showSignUpPassword)} style={eyeIconStyle} />
                </div>
            </div>
        </div>

        <div id="dobContainer" style={fullRowContainerStyle}>
            <h2>DATE OF BIRTH</h2>
            <input type="date" id="dob" value={signUpForm.dob} onChange={handleSignUpChange} required style={largeInputStyle} />
        </div>

        <div id="phoneContainer" style={fullRowContainerStyle}>
            <h2>Phone Number</h2>
            <input type="tel" placeholder="+92" id="phoneNumber" value={signUpForm.phoneNumber} onChange={handleSignUpChange} required style={largeInputStyle} />
        </div>

        <button type="submit" id="saveProfile" style={buttonStyle}>Create Account</button>
        <button type="button" id="haveAccount" onClick={() => toggleView('login')} style={haveAccountStyle}>Already have an account</button>
    </form>
);

// --- 3. Profile Component ---
const ProfileComponent = ({ loggedAccount, handleLogout, profileRowStyle, profileValueStyle, logoutButtonStyle }) => (
    loggedAccount && (
        <div id="profile" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '10px' }}>
            <div id="profileName" style={profileRowStyle}>
                <h4>Name: </h4>
                <h2 style={profileValueStyle}>{loggedAccount.fName} {loggedAccount.lName}</h2>
            </div>
            <div id="profileDob" style={profileRowStyle}>
                <h4>Date of birth: </h4>
                <h2 style={profileValueStyle}>{loggedAccount.dob}</h2>
            </div>
            <div id="profileGender" style={profileRowStyle}>
                <h4>Gender:</h4>
                <h2 style={profileValueStyle}>{loggedAccount.gender}</h2>
            </div>
            <div id="profileEmail" style={profileRowStyle}>
                <h4>Email:</h4>
                <h2 style={profileValueStyle}>{loggedAccount.email}</h2>
            </div>
            <div id="profileNumber" style={profileRowStyle}>
                <h4>Phone number:</h4>
                <h2 style={profileValueStyle}>{loggedAccount.phoneNumber}</h2>
            </div>
            <button id="logoutBtn" onClick={handleLogout} style={logoutButtonStyle}>Logout</button>
        </div>
    )
);


// =========================================================================
//                             MAIN COMPONENT
// =========================================================================

export default function LogInSignUp() {
    // Current View State
    const [currentView, setCurrentView] = useState('login');

    // Account Data States
    const [accounts, setAccounts] = useState([]);
    const [loggedAccount, setLoggedAccount] = useState(null);

    // Form States
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [showLoginPassword, setShowLoginPassword] = useState(false);

    const [signUpForm, setSignUpForm] = useState({
        fName: '', lName: '', gender: 'select gender', email: '',
        password: '', dob: '', phoneNumber: '',
    });
    const [showSignUpPassword, setShowSignUpPassword] = useState(false);

    // --- useEffect for Initial Data Load and Auto-Login Check ---
    useEffect(() => {
        const storedAccounts = localStorage.getItem('accounts');
        if (storedAccounts) {
            setAccounts(JSON.parse(storedAccounts));
        }

        const storedLoggedAccount = localStorage.getItem('logedAccount');
        if (storedLoggedAccount && storedLoggedAccount !== 'null') {
            const user = JSON.parse(storedLoggedAccount);
            setLoggedAccount(user);
            setCurrentView('profile');
        }
    }, []);

    // --- Handlers ---
    const toggleView = (view) => {
        setCurrentView(view);
    };

    const handleSignUpChange = (e) => {
        const { id, value } = e.target;
        // The id (e.target.id) must match a key in the signUpForm state object.
        setSignUpForm(prev => ({ ...prev, [id]: value }));
    };

    // --- Sign Up Logic (Validation remains the same) ---
    const handleSignUp = (e) => {
        e.preventDefault();

        const user = {};
        let isValid = true; 

        // 1. First Name
        if (signUpForm.fName.length < 3 || signUpForm.fName.length > 12) { 
            popup('First name must be between 3 and 12 characters.'); 
            isValid = false; 
        } else {
            user.fName = signUpForm.fName;
        }

        // 2. Last Name
        if (isValid && (signUpForm.lName.length < 3 || signUpForm.lName.length > 12)) { 
            popup('Last name must be between 3 and 12 characters.'); 
            isValid = false; 
        } else if (isValid) {
            user.lName = signUpForm.lName;
        }

        // 3. Gender
        if (isValid && signUpForm.gender === 'select gender') { 
            popup('Please select a gender.'); 
            isValid = false; 
        } else if (isValid) {
            user.gender = signUpForm.gender;
        }

        // 4. Email
        if (isValid) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (accounts.some(eF => eF.email === signUpForm.email)) {
                popup('Email already exists'); isValid = false;
            } else if (!emailRegex.test(signUpForm.email) || signUpForm.email.length < 3 || signUpForm.email.length > 254) { 
                popup('Enter a valid email'); isValid = false; 
            } else {
                user.email = signUpForm.email;
            }
        }
        
        // 5. Password
        if (isValid) {
            if (signUpForm.password.includes(' ')) { 
                popup("Space is not allowed in password"); isValid = false; 
            } else if (signUpForm.password.length < 8) { 
                popup("Password must be 8 characters or more"); isValid = false; 
            } else {
                user.password = signUpForm.password;
            }
        }

        // 6. DOB
        if (isValid && !signUpForm.dob) { 
            popup('Enter valid date of birth'); 
            isValid = false; 
        } else if (isValid) {
            user.dob = signUpForm.dob;
        }

        // 7. Phone Number
        if (isValid) {
            const phoneNumberRegex = /^((\+92|0092|92)?(0)?)(3)([0-9]{9})$/;
            if (!phoneNumberRegex.test(signUpForm.phoneNumber)) { 
                popup('Incorrect phone number (Pakistani format expected - 03XXXXXXXXX)'); 
                isValid = false; 
            } else {
                user.phoneNumber = signUpForm.phoneNumber;
            }
        }

        // Final Save 
        if (isValid) {
            const newAccounts = [...accounts, user];
            setAccounts(newAccounts);
            localStorage.setItem('accounts', JSON.stringify(newAccounts));

            popupGreen('Account created successfully! You can now log in.');

            // Clear form and switch view
            setSignUpForm({
                fName: '', lName: '', gender: 'select gender', email: '',
                password: '', dob: '', phoneNumber: '',
            });
            toggleView('login');
        }
    };

    // --- Log In Logic ---
    const handleLogin = (e) => {
        e.preventDefault();

        const foundUser = accounts.find(
            (acc) => acc.email === loginEmail && acc.password === loginPassword
        );

        if (foundUser) {
            setLoggedAccount(foundUser);
            localStorage.setItem('logedAccount', JSON.stringify(foundUser));
            setCurrentView('profile');
            setLoginEmail('');
            setLoginPassword('');
            popupGreen(`Login Successful! Welcome, ${foundUser.fName}!`);
        } else {
            popup("Login Failed: Incorrect email or password.");
        }
    };

    // --- Log Out Logic ---
    const handleLogout = () => {
        setLoggedAccount(null);
        localStorage.removeItem('logedAccount');
        setCurrentView('login');
        popupGreen('You have been successfully logged out.');
    };
    
    // --- Styles Conversion (Inline Styles remain same) ---

    const containerStyle = {
        display: 'flex', flexDirection: 'column', justifyContent: 'space-around', gap: '10px',
        alignItems: 'center', backgroundColor: 'rgba(247, 247, 247, 0.733)', padding: '30px',
        borderRadius: '20px', width: '90%', minWidth: '300px', maxWidth: '600px',
        fontFamily: "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif", letterSpacing: '1px',
        margin: '50px auto'
    };
    
    const imgStyle = { height: '100px' };

    const epStyle = {
        display: 'flex', flexDirection: 'column', gap: '20px', width: '100%',
        borderBottom: '2px solid rgba(6, 7, 7, 0.315)', borderTop: '2px solid rgba(6, 7, 7, 0.315)',
        paddingBottom: '40px', paddingTop: '40px',
    };

    const inputContainerStyle = { width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' };
    
    const textInputStyle = { padding: '10px', backgroundColor: '#0c07071c', border: 'none', borderRadius: '10px', width: '100%' };

    const passwordInputWrapperStyle = {
        width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between', backgroundColor: '#0c07071c', borderRadius: '10px',
    };
    
    const passwordInputStyle = { backgroundColor: 'transparent', padding: '10px', border: 'none', width: '100%' };

    const eyeIconStyle = { height: '30px', margin: '0 5px', cursor: 'pointer' };

    const buttonStyle = {
        padding: '15px', fontSize: '3vh', borderRadius: '10px', fontWeight: '600',
        letterSpacing: '2px', border: 'none', backgroundColor: '#00000023', marginTop: '20px',
        cursor: 'pointer'
    };

    const nameRowStyle = {
        display: 'flex', width: '100%', alignItems: 'center', flexDirection: 'row',
        flexWrap: 'wrap', gap: '10px',
    };
    
    const nameFieldStyle = {
        display: 'flex', flexDirection: 'column', flex: 1, gap: '10px', fontSize: '15px',
    };

    const largeInputStyle = {
        padding: '15px', border: 'none', backgroundColor: '#00000023', borderRadius: '10px', width: '100%',
    };

    const selectStyle = {
        width: '100%', fontSize: '25px', backgroundColor: '#00000023', padding: '10px',
        borderRadius: '10px', border: 'none', cursor: 'pointer',
    };

    const fullRowContainerStyle = {
        display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', gap: '10px',
    };

    const profileRowStyle = {
        width: '100%', display: 'flex', flexWrap: 'wrap', alignItems: 'center',
        flexDirection: 'column', gap: '20px',
    };

    const profileValueStyle = {
        backgroundColor: '#00000023', padding: '10px', width: '100%', borderRadius: '10px',
    };

    const siEpContainerStyle = {
        display: 'flex', gap: '10px', alignItems: 'center', width: '100%', flexDirection: 'column',
    };

    const siEpFieldStyle = {
        display: 'flex', flexDirection: 'column', width: '100%', gap: '10px', fontSize: '15px',
    };
    
    const siPasswordWrapperStyle = {
        display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%',
        backgroundColor: '#00000023', borderRadius: '10px', paddingRight: '5px',
        justifyContent: 'space-between',
    };

    const linkButtonStyle = {
        fontSize: '15px', backgroundColor: 'transparent', color: 'blue', padding: 0,
        width: '100%', marginTop: '10px', marginBottom: '-10px', border: 'none',
        fontWeight: 'normal', letterSpacing: '1px', cursor: 'pointer'
    };
    
    const haveAccountStyle = {
        ...linkButtonStyle,
        marginTop: '-10px',
    };
    
    const logoutButtonStyle = {
        ...linkButtonStyle,
        fontSize: '20px', marginTop: 0, marginBottom: '-18px', color: '#0446fc',
    };

    // --- Conditional Rendering Function ---
    const renderCurrentView = () => {
        switch (currentView) {
            case 'login':
                return (
                    <LoginComponent 
                        loginEmail={loginEmail} setLoginEmail={setLoginEmail} 
                        loginPassword={loginPassword} setLoginPassword={setLoginPassword} 
                        showLoginPassword={showLoginPassword} setShowLoginPassword={setShowLoginPassword} 
                        handleLogin={handleLogin} toggleView={toggleView}
                        epStyle={epStyle} inputContainerStyle={inputContainerStyle} 
                        textInputStyle={textInputStyle} passwordInputWrapperStyle={passwordInputWrapperStyle} 
                        passwordInputStyle={passwordInputStyle} eyeIconStyle={eyeIconStyle} 
                        buttonStyle={buttonStyle} linkButtonStyle={linkButtonStyle}
                    />
                );
            case 'signup':
                return (
                    <SignUpComponent
                        signUpForm={signUpForm} handleSignUpChange={handleSignUpChange}
                        handleSignUp={handleSignUp} toggleView={toggleView}
                        showSignUpPassword={showSignUpPassword} setShowSignUpPassword={setShowSignUpPassword}
                        nameRowStyle={nameRowStyle} nameFieldStyle={nameFieldStyle} 
                        largeInputStyle={largeInputStyle} selectStyle={selectStyle} 
                        siEpContainerStyle={siEpContainerStyle} siEpFieldStyle={siEpFieldStyle} 
                        siPasswordWrapperStyle={siPasswordWrapperStyle} passwordInputStyle={passwordInputStyle} 
                        eyeIconStyle={eyeIconStyle} fullRowContainerStyle={fullRowContainerStyle} 
                        buttonStyle={buttonStyle} haveAccountStyle={haveAccountStyle} 
                        eyeOn={eyeOn} eyeOff={eyeOff} // Pass image variables
                    />
                );
            case 'profile':
                return (
                    <ProfileComponent
                        loggedAccount={loggedAccount} handleLogout={handleLogout}
                        profileRowStyle={profileRowStyle} profileValueStyle={profileValueStyle}
                        logoutButtonStyle={logoutButtonStyle}
                    />
                );
            default:
                return (
                     <LoginComponent 
                        loginEmail={loginEmail} setLoginEmail={setLoginEmail} 
                        loginPassword={loginPassword} setLoginPassword={setLoginPassword} 
                        showLoginPassword={showLoginPassword} setShowLoginPassword={setShowLoginPassword} 
                        handleLogin={handleLogin} toggleView={toggleView}
                        epStyle={epStyle} inputContainerStyle={inputContainerStyle} 
                        textInputStyle={textInputStyle} passwordInputWrapperStyle={passwordInputWrapperStyle} 
                        passwordInputStyle={passwordInputStyle} eyeIconStyle={eyeIconStyle} 
                        buttonStyle={buttonStyle} linkButtonStyle={linkButtonStyle}
                    />
                );
        }
    };

    return (
        <div id="container" style={containerStyle}>
            <a 
                href="http://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=abdulrehmanprogrammer" 
                target="_blank"
                rel="noopener noreferrer" 
            >
                <img src={arpLogo} alt="Logo" style={imgStyle} />
            </a>

            {/* Final Conditional Rendering */}
            {renderCurrentView()}
        </div>
    );
}