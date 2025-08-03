import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, addDoc, orderBy, serverTimestamp, deleteDoc, doc } from "firebase/firestore";
import { db } from '../../shared/firebase/firebase';
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
            const q = query(tasksRef, where("date", "==", date), orderBy("createdAt", "asc"));
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
                createdAt: serverTimestamp(),
            });
            setNewTask("");
            fetchTasks();
        } catch (err) {
            console.error("Error adding task: ", err);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await deleteDoc(doc(db, "tasks", taskId));
            fetchTasks();
        } catch (err) {
            console.error("Error deleting task: ", err);
        }
    };

    return (
    <div className={styles.wrapper}>
        <div className={styles.container}>
        <h2>Tasks for {date}</h2>

        {loading ? (
            <p>Loading...</p>
        ) : (
            <ul className={styles.tasks}>
            {tasks.length > 0 ? (
                tasks.map((task) => (
                <li key={task.id} className={styles.taskItem}>
                    <input type="checkbox" className={styles.checkbox} />
                    <span className={styles.taskText}>{task.title}</span>
                    <button
                    onClick={() => deleteTask(task.id)}
                    className={styles.deleteBtn}
                    >
                    -
                    </button>
                </li>
                ))
            ) : (
                <li className={styles.taskItem}>
                <span className={styles.taskText}>No tasks scheduled for this day.</span>
                </li>
            )}
            </ul>
        )}

        <form className={styles.addTaskForm} onSubmit={handleSubmit}>
            <div className={styles.taskItem}>
                {/* <input className={styles.checkbox} type="checkbox" disabled /> */}
                <div className={styles.addTask}>
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        className={styles.newTask}
                    />
                    <button type="submit" className={styles.btn}>+</button>
                </div>
            </div>
        </form>
        </div>
    </div>
    );

}