import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase"; // adjust path to your config
import styles from "./Daily.module.css"

export default function DailyTasks() {
    const { date } = useParams();
    const [ tasks, setTasks ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        async function fetchTasks() {
            try {
                const tasksRef = collection(db, "tasks");
                const q = query(tasksRef, where("date", "==", date));
                const querySnapshot = await getDocs(q);

                const resutls = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
            } catch (err) {
                console.error("Error fetching tasks:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchTasks();
    }, [date]);

    return (
        <div className={styles.wrapper}>
            <h2>Tasks for {date}</h2>
        {loading ? (
            <p>Loading...</p>
        ) : tasks.elngth > 0 ? (
            <ul>
                {tasks.map((task) => (
                    <li key ={task.id}>{task.title}</li>
                ))}
            </ul>
        ) : (
            <p>No tasks scheduled for this day.</p>
        )}
        </div>
    );
}