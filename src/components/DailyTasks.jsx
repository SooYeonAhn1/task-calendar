import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase"; // adjust path to your config
import styles from "./Daily.module.css"

export default function DailyTasks() {
    const { date } = useParams();
    const [ tasks, setTasks ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ newTask, setNewTask ]  = useState("");

    const fetchTasks = async() => {
        setLoading(true);
        try {
            const tasksRef = collection(db, "tasks");
            const q = query(tasksRef, where("date", "==", date));
            const querySnapshot = await getDocs(q);

            const results = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTasks(results); 
        } catch (err) {
            console.error("Error fetching tasks: ", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [date]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newTask.trim()) return;

        try {
            await addDoc(collection(db, "tasks"), {
                title: newTask,
                date: date,
                createdAt: new Date(),
            });
            setNewTask("");
            fetchTasks();
        } catch (err) {
            console.error("Error adding task: ", err);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h2>Tasks for {date}</h2>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        type="text"
                        placeholder="new task"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        className={styles.newTask}
                    />
                    <button type="submit" className={styles.btn}>+</button>
                </form>


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
        </div>
    );
}