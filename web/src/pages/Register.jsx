import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from '@firebaseweb';
import styles from "./Register.module.css";

export default function Register() {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/calendar");
        } catch (err) {
            alert(err.message);
        }
    }

    const handleGoogleLogin = async (e) => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            navigate("/calendar");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <>
            <title>Register</title>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <h2 className={styles.header}>Register</h2>
                    <form onSubmit={handleSubmit} className={styles.form}>
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
                        <button type="submit">Register</button>
                    </form>
                    <div className={styles.options}>
                        <button onClick={handleGoogleLogin}>Continue with Google</button>
                        <button onClick={() =>navigate("/login")}>
                            Have an account? Login
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}