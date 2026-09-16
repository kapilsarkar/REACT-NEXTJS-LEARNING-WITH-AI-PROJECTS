import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../services/supabaseClient.js";
import { useAuth } from "../hooks/useAuth.js";

const Dashboard = () => {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setProfile(data);
      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  const displayName =
    profile?.name ||
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "there";
  const email = profile?.email || user?.email || "Not provided";
  const phone = profile?.phone?.trim() || "Not provided";

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" />
          <p className="text-sm font-medium text-slate-600">
            Loading your dashboard...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-rose-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-rose-50 text-lg text-rose-600">
            !
          </div>
          <h1 className="text-lg font-semibold text-slate-900">
            We couldn&apos;t load your dashboard
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Please refresh the page and try again.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700">
                AI WriteAssist
              </p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Welcome back, {displayName} 👋
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                Create professional applications and letters with ease.
              </p>
            </div>

            <Link
              to="/create"
              className="inline-flex items-center justify-center rounded-xl bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
            >
              Create New Application →
            </Link>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex h-full flex-col">
              <div>
                <p className="text-sm font-semibold text-emerald-700">
                  Quick start
                </p>
                <h2 className="mt-2 text-xl font-bold text-slate-900">
                  Create the document you need
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                  Draft polished applications, formal letters, requests, and
                  complaints with guided assistance.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  "Applications",
                  "Formal letters",
                  "Requests",
                  "Complaints",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-4 text-center text-sm font-medium text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <Link
                to="/create"
                className="mt-6 inline-flex w-fit items-center text-sm font-semibold text-emerald-700 transition hover:text-emerald-800"
              >
                Start creating →
              </Link>
            </div>
          </section>

          <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-emerald-700">
              Profile summary
            </p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">
              Your details
            </h2>

            <dl className="mt-5 space-y-4">
              <div className="border-b border-slate-100 pb-4">
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Name
                </dt>
                <dd className="mt-1 text-sm font-medium text-slate-800">
                  {profile?.name || "Not provided"}
                </dd>
              </div>

              <div className="border-b border-slate-100 pb-4">
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Email
                </dt>
                <dd className="mt-1 break-all text-sm font-medium text-slate-800">
                  {email}
                </dd>
              </div>

              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Phone
                </dt>
                <dd className="mt-1 text-sm font-medium text-slate-800">
                  {phone}
                </dd>
              </div>
            </dl>
          </aside>
        </div>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Recent Applications
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Keep track of your saved documents in one place.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
            <h3 className="text-base font-semibold text-slate-900">
              No applications yet
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Your saved applications and letters will appear here.
            </p>
            <Link
              to="/create"
              className="mt-5 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
            >
              Create Your First Application →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
