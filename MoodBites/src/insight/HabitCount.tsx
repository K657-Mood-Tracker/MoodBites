import "./styles.css";

type Habit = {
  name: string;
  days: boolean[];
};

const habits: Habit[] = [
  { name: "Drink Water", days: [true, true, false, true, true, false, true] },
  { name: "Exercise", days: [false, true, false, true, false, false, true] },
  { name: "Read", days: [true, false, true, false, true, true, false] },
  { name: "Meditate", days: [false, false, true, true, false, true, false] }
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function HabitTable() {
  return (
    <div className="habit-table-wrapper">
      <h2>Habit Tracker</h2>

      <table className="habit-table">
        <thead>
          <tr>
            <th>Habit</th>
            {days.map((day) => (
              <th key={day}>{day}</th>
            ))}
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {habits.map((habit) => {
            const total = habit.days.filter(Boolean).length;

            return (
              <tr key={habit.name}>
                <td className="habit-name">{habit.name}</td>

                {habit.days.map((done, index) => (
                  <td key={index} className="habit-cell">
                    {done ? "✔️" : ""}
                  </td>
                ))}

                <td className="habit-total">{total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}