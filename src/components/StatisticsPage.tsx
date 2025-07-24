import { useState, useEffect } from "react";
import supabase from "../utils/supabase";
import { useNavigate } from "react-router";

interface Stat {
  id: number;
  created_at: string;
  totalStudyDuration: number;
  totalBreak: number;
  title: string;
}
const StatisticsPage = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [timePeriod, setTimePeriod] = useState<
    "day" | "week" | "month" | "alltime"
  >("alltime");
  const [summary, setSummary] = useState({
    totalDuration: 0,
    avgDuration: 0,
  });
  const navigate = useNavigate();
  const handleReturnToTimer = () => {
    navigate("/");
  };

  useEffect(() => {
    async function getStats(filter: "day" | "week" | "month" | "alltime") {
      let query = supabase.from("session").select("*");

      if (filter !== "alltime") {
        const now = new Date();
        let since: Date | undefined = undefined;

        if (filter === "day") {
          since = new Date();
          since.setHours(0, 0, 0, 0); // only retrieve those aft midnite accord to pc timezone
        } else if (filter === "week") {
          since = new Date();
          const day = since.getDay();
          const diff = day === 0 ? -6 : 1 - day;
          since.setDate(since.getDate() + diff); // set back to monday since default is sun
          since.setHours(0, 0, 0, 0); // start fr midnight
        } else if (filter === "month") {
          since = new Date(now.getFullYear(), now.getMonth(), 1); // 1st day of each mth for mth filter
        }

        if (since) {
          query = query.gte("created_at", since.toISOString());
        }
      }

      const { data: stats, error } = await query;
      if (error) {
        console.error("Error fetching stats:", error);
      } else if (stats) {
        setStats(stats);

        const totalDuration = stats.reduce(
          (sum, s) => sum + s.totalStudyDuration,
          0
        );
        const avgDuration = stats.length > 0 ? totalDuration / stats.length : 0;

        setSummary({
          totalDuration,
          avgDuration,
        });
      }
    }

    getStats(timePeriod);
  }, [timePeriod]);

  const formatMinutes = (secs: number) => {
    console.log(secs);
    const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = Math.floor(secs % 60);
    return `${h > 0 ? `${h}h ` : ""}${m}m ${s}s`;
  };

  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <button onClick={handleReturnToTimer} className="btn btn-outline mb-4">
          Start Study Session
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6"> Study Statistics</h1>

        <div className="join mb-6">
          {["day", "week", "month", "alltime"].map((period) => (
            <button
              key={period}
              onClick={() => setTimePeriod(period as typeof timePeriod)}
              className={`join-item btn btn-sm ${
                timePeriod === period ? "btn-primary" : "btn-outline"
              }`}
            >
              {period === "day" && "Today"}
              {period === "week" && "This Week"}
              {period === "month" && "This Month"}
              {period === "alltime" && "All Time"}
            </button>
          ))}
        </div>

        <div className="w-full stats shadow mb-6 bg-base-200">
          <div className="stat">
            <div className="stat-title">Total Study Time</div>
            <div className="stat-value">
              {formatMinutes(summary.totalDuration)}
            </div>
          </div>
          <div className="stat">
            <div className="stat-title">Avg. Session Length</div>
            <div className="stat-value">
              {formatMinutes(summary.avgDuration)}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto bg-base-100 rounded-box shadow border border-base-content/10">
          <table className="table table-zebra">
            <thead>
              <tr className="text-base-content/70">
                <th>#</th>
                <th>Title</th>
                <th>Date</th>
                <th>Total Study Duration</th>
                <th>Number of Breaks</th>
              </tr>
            </thead>
            <tbody>
              {stats.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-6 text-base-content/50"
                  >
                    No records found for selected time period.
                  </td>
                </tr>
              ) : (
                stats.map((stat, index) => (
                  <tr key={stat.id}>
                    <td>{index + 1}</td>
                    <td>{stat.title}</td>
                    <td>{new Date(stat.created_at).toLocaleDateString()}</td>
                    <td>{formatMinutes(stat.totalStudyDuration)}</td>
                    <td>{stat.totalBreak}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StatisticsPage;
