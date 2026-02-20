import { supabase } from "@/lib/supabase/client";

export async function getDashboardStats() {
  const [{ count: activeNurses }, { data: requestRows }] = await Promise.all([
    supabase
      .from("nurses")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true),
    supabase
      .from("hospital_requests")
      .select("status, required_nurses, assigned_nurses, number_of_nurses"),
  ]);

  const rows = requestRows || [];

  const pendingRequests = rows.filter((row) => {
    const status = row.status || "pending";
    return status === "pending";
  }).length;

  const completedRequests = rows.filter((row) => row.status === "completed").length;

  const totalRequested = rows.reduce((sum, row) => {
    const required = row.required_nurses ?? row.number_of_nurses ?? 0;
    return sum + Number(required || 0);
  }, 0);

  const totalAssigned = rows.reduce((sum, row) => {
    return sum + Number(row.assigned_nurses || 0);
  }, 0);

  const fillRate = totalRequested > 0
    ? Math.min(100, Math.round((totalAssigned / totalRequested) * 100))
    : 0;

  return {
    activeNurses: activeNurses || 0,
    pendingRequests,
    completedRequests,
    totalAssignments: totalAssigned,
    totalRequested,
    fillRate,
  };
}


export async function getRecentRequests() {
  const { data } = await supabase
    .from("hospital_requests")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(8);

  return data || [];
}

export async function getNursesByDepartment() {
  const { data, error } = await supabase
    .from("nurses")
    .select("department")
    .eq("is_active", true);

  if (error) return [];

  // Group & count
  const counts = {};
  data.forEach((row) => {
    counts[row.department] = (counts[row.department] || 0) + 1;
  });

  // Convert to array
  return Object.entries(counts)
    .map(([dept, count]) => ({
      department: dept,
      count,
    }))
    .sort((a, b) => b.count - a.count);
}
