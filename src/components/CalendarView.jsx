import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import styles from "./Calendar.module.css"

export default function CalendarView() {
  return (
    <div className={styles.wrapper}>
      <FullCalendar className={styles.calendar}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={[
          { title: "Event 1", date: "2025-07-22" },
          { title: "Event 2", date: "2025-07-25" },
        ]}
        aspectRatio={2.1} 
      />
    </div>
  );
}