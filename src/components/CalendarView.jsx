import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate } from "react-router-dom";
import styles from "./Calendar.module.css"

export default function CalendarView() {
    const navigate = useNavigate();
        
    return (
        <div className={styles.wrapper}>
        <FullCalendar className={styles.calendar}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={[
            { title: "Event 1", date: "2025-07-22" },
            { title: "Event 2", date: "2025-07-25" },
            ]}
            dateClick={(info) => {
                const dateStr = info.dateStr;
                navigate(`/day/${dateStr}`)
            }}
            aspectRatio={2.1} 
        />
        </div>
    );
}