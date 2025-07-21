import { useState } from 'react';
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import styles from './Login.module.css'

export default function Login() {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegister, setIsRegister] = useState(false);

    const handleSubmit =  async (e) => {
        e.preventDefault();
        try {
            if (isRegister) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
        } catch (err) {
            alert(err.message);
        }
    };

    const handleGoogleLogin = async (e) => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className={styles.container}>
            <h2> {isRegister ?  "Register" : "Login"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)} required
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} required
                />
                <button type="submit">{isRegister ? "Sign up" : "Log in"}</button>
            </form>
            <button onClick={() => setIsRegister(!isRegister)}>
                { isRegister ? "Already have an account? Login" : "No account? Register" }
            </button>
        </div>
    );
}