import { useState, useEffect } from "react";
import supabase from "../utils/supabase";
interface Stat {
  id: number;
  created_at: string;
  totalStudyDuration: number;
  totalBreak: number;
}
const StatisticsPage = () => {
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    async function getStats() {
      const { data: stats } = await supabase.from("session").select();

      if (stats && stats.length >= 1) {
        setStats(stats);
      }
    }
    getStats();
  }, []);

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Date</th>
            <th>Total study duration</th>
            <th>Total break duration</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((stat) => (
            <tr key={stat.id}>
              <th>{stat.id}</th>
              <td>
                {stat.created_at
                  ? new Date(stat.created_at).toLocaleDateString()
                  : "N/A"}
              </td>
              <td>{stat.totalStudyDuration} mins</td>
              <td>{stat.totalBreak} mins</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatisticsPage;
