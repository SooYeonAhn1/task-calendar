import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, doc} from "firebase/firestore";
import { db } from '@firebaseweb';
import styles from "./Calendar.module.css"

export default function CalendarView() {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasksRef = collection(db, "tasks");
                const q = query(tasksRef, orderBy("createdAt", "asc"));
                const snapshot = await getDocs(q);

                const taskGroups = {};

                snapshot.forEach(doc => {
                    const data = doc.data();
                    const taskDate = data.date;

                    if (!taskGroups[taskDate]) {
                        taskGroups[taskDate] = [];
                    }

                    taskGroups[taskDate].push({
                        title: data.title,
                        date: data.date,
                        createdAt: data.createdAt?.toDate?.() || new Date(0),
                    });
                });
                
                const formattedEvents = [];

                Object.entries(taskGroups).forEach(([date, tasks]) => {
                    tasks.sort((a, b) => a.createdAt - b.createdAt);
                    const topThree = tasks.slice(0, 3);

                    topThree.forEach(task => {
                        formattedEvents.push({
                            title: task.title,
                            date: task.date,
                        });
                    });

                    if (tasks.length > 3) {
                        formattedEvents.push({
                            title: `+${tasks.length - 3} more`,
                            date: date,
                            display: 'background',
                        });
                    }
                });
                setEvents(formattedEvents);
            } catch (err) {
                console.error("Error fetching calendar tasks: ", err);
            }
        };
        fetchTasks();

    }, []);
        
    return (
        <div className={styles.wrapper}>
            <FullCalendar className={styles.calendar}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                dateClick={(info) => {
                    const dateStr = info.dateStr;
                    navigate(`/day/${dateStr}`)
                }}
                height="700px"
                fixedWeekCount={false}
            />
        </div>
    );
}