import { supabase } from "@/lib/supabase/client";

export async function getDashboardStats() {
  const [
    { count: activeNurses },
    { count: pendingRequests },
    { count: completedRequests },
  ] = await Promise.all([
    supabase
      .from("nurses")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true),

    supabase
      .from("hospital_requests")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),

    supabase
      .from("hospital_requests")
      .select("*", { count: "exact", head: true })
      .eq("status", "completed"),
  ]);

  return {
    activeNurses: activeNurses || 0,
    pendingRequests: pendingRequests || 0,
    completedRequests: completedRequests || 0,
    totalAssignments: completedRequests || 0,
  };
}


export async function getRecentRequests() {
  const { data } = await supabase
    .from("hospital_requests")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

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
  return Object.entries(counts).map(([dept, count]) => ({
    department: dept,
    count,
  }));
}
