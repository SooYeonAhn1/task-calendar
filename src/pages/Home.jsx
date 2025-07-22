import styles from './Home.module.css'
import { Link } from 'react-router-dom'
export default function Home() {
    return (
        <>
            <title>Task Calendar</title>
            <body>
                <div className={styles.wrapper}>
                    <div className={styles.home}>
                        <h1 className={styles.welcome}>The ultimate task-management calendar</h1>
                        <p className={styles.register}>If you are a new user, <Link to="/register">register</Link></p>
                        <p className={styles.login}>If you are an existing user, <Link to="/login">login</Link></p>
                    </div>
                </div>
            </body>
        </>
    );
}