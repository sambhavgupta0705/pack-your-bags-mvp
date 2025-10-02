// app/trip-planner/page.tsx
"use client";

import { useState } from "react";

type PlannerForm = {
  trekName: string;
  startDate: string;
  endDate: string;
  groupSize: number;
  difficulty: "Easy" | "Moderate" | "Difficult";
  pace: "Relaxed" | "Normal" | "Fast";
  budget: "Low" | "Medium" | "High";
  interests: string; // comma separated: photography,flowers,views,challenging
};

type DayPlan = {
  day: number;
  date: string;
  activity: string;
  notes?: string;
};

function daysBetween(startIso: string, endIso: string) {
  const s = new Date(startIso);
  const e = new Date(endIso);
  const ms = e.getTime() - s.getTime();
  return Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)) + 1);
}

function addDays(iso: string, n: number) {
  const d = new Date(iso);
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

/**
 * Simple deterministic itinerary generator:
 * - Uses duration, difficulty, pace and interests to create day-by-day plan.
 * - Not calling any AI APIs; logic is local and explainable.
 */
function generateItinerary(form: PlannerForm): DayPlan[] {
  const days = daysBetween(form.startDate, form.endDate);
  const itinerary: DayPlan[] = [];
  const interests = form.interests
    .split(",")
    .map((i) => i.trim().toLowerCase())
    .filter(Boolean);

  const baseActivities = {
    Easy: ["Acclimatization & short hikes", "Camp setup & local sightseeing"],
    Moderate: ["Approach trek & moderate ascent", "Full day of trekking"],
    Difficult: ["Tough ascent day", "Technical sections & long day"],
  };

  const paceMultiplier = form.pace === "Relaxed" ? 0.9 : form.pace === "Fast" ? 1.15 : 1.0;
  const difficultyBias = form.difficulty === "Easy" ? -0.2 : form.difficulty === "Difficult" ? 0.25 : 0;

  for (let i = 0; i < days; i++) {
    const dayNum = i + 1;
    const date = addDays(form.startDate, i);
    let activity = "";
    let notes = "";

    // Seed choice based on day index and difficulty
    if (dayNum === 1) {
      activity = `Arrive at trek base / meet the group for ${form.trekName}`;
      notes = "Gear check, briefing, and light acclimatization.";
    } else if (dayNum === days) {
      activity = "Return to base / departure";
      notes = "Pack, debrief, and transfer to nearest transport hub.";
    } else {
      // Middle days: vary based on difficulty and pace
      const baseList = baseActivities[form.difficulty];
      // Mix an activity from baseList
      activity = baseList[i % baseList.length];

      // Modify by pace/difficulty
      if (paceMultiplier > 1.05) {
        activity = activity.replace("short", "long").replace("Moderate", "Full day of");
      }

      // Add interest-driven adjustments
      if (interests.includes("photography") && Math.random() > 0.4) {
        notes += (notes ? " " : "") + "Great photo spots planned at dawn.";
      }
      if (interests.includes("flowers") && form.trekName.toLowerCase().includes("valley")) {
        notes += (notes ? " " : "") + "Expect abundant alpine meadows and flowers.";
      }
      if (interests.includes("views") && Math.random() > 0.3) {
        activity += " + viewpoint detour";
      }
      if (interests.includes("challenging") && form.difficulty === "Difficult") {
        activity = activity + " (steeper sections expected)";
      }

      // Budget impacts accommodation suggestions
      if (form.budget === "Low") {
        notes += (notes ? " " : "") + "Budget lodges / shared tents recommended.";
      } else if (form.budget === "High") {
        notes += (notes ? " " : "") + "Prefer comfortable lodges where available.";
      }
    }

    itinerary.push({
      day: dayNum,
      date,
      activity,
      notes: notes || undefined,
    });
  }

  // Tweak: if itinerary too short for difficulty, insert acclimatization day
  if (form.difficulty !== "Easy" && days < 4) {
    const acclDay: DayPlan = {
      day: 1,
      date: form.startDate,
      activity: "Acclimatization & local orientation",
      notes: "Add rest day to reduce altitude sickness risk.",
    };
    // shift days forward and replace
    for (let j = 0; j < itinerary.length; j++) {
      itinerary[j].day = itinerary[j].day + 1;
    }
    itinerary.unshift(acclDay);
    // Reassign dates to stay valid (extend end date virtually)
    for (let k = 0; k < itinerary.length; k++) {
      itinerary[k].date = addDays(form.startDate, k);
    }
  }

  return itinerary;
}

export default function TripPlannerPage() {
  const [form, setForm] = useState<PlannerForm>({
    trekName: "Kedarkantha Trek",
    startDate: new Date().toISOString().slice(0, 10),
    endDate: addDays(new Date().toISOString().slice(0, 10), 5),
    groupSize: 2,
    difficulty: "Moderate",
    pace: "Normal",
    budget: "Medium",
    interests: "photography,views",
  });

  const [itinerary, setItinerary] = useState<DayPlan[] | null>(null);
  const [savedName, setSavedName] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "groupSize"
          ? parseInt(value || "1", 10)
          : (value as unknown as string),
    }));
  };

  const handleGenerate = (e?: React.FormEvent) => {
    e?.preventDefault();
    // Basic validation
    if (new Date(form.endDate) < new Date(form.startDate)) {
      alert("End date must be the same or after start date.");
      return;
    }
    const plan = generateItinerary(form);
    setItinerary(plan);
  };

  const handleSave = () => {
    if (!itinerary) return;
    const key = `trip_${form.trekName.replace(/\s+/g, "_").toLowerCase()}_${Date.now()}`;
    const payload = { form, itinerary, savedAt: new Date().toISOString() };
    localStorage.setItem(key, JSON.stringify(payload));
    setSavedName(key);
    alert("Itinerary saved locally.");
  };

  const handleDownload = () => {
    if (!itinerary) return;
    const lines: string[] = [];
    lines.push(`Trip Plan — ${form.trekName}`);
    lines.push(`Dates: ${form.startDate} → ${form.endDate}`);
    lines.push(`Group Size: ${form.groupSize}`);
    lines.push(`Difficulty: ${form.difficulty} · Pace: ${form.pace} · Budget: ${form.budget}`);
    lines.push("");
    lines.push("Day-by-day itinerary:");
    itinerary.forEach((d) => {
      lines.push(`Day ${d.day} — ${d.date}`);
      lines.push(`  Activity: ${d.activity}`);
      if (d.notes) lines.push(`  Notes: ${d.notes}`);
      lines.push("");
    });

    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${form.trekName.replace(/\s+/g, "_")}_itinerary.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-white text-gray-800 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          AI Trip Planner 🧭
        </h1>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Enter your basics and get a ready-to-use day-by-day itinerary. This is a local, deterministic planner for MVP — no external API calls.
        </p>

        {/* Form */}
        <form onSubmit={handleGenerate} className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Trek Name</label>
              <input
                name="trekName"
                value={form.trekName}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-300"
                placeholder="Kedarkantha Trek"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Group Size</label>
              <input
                name="groupSize"
                type="number"
                min={1}
                value={form.groupSize}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                name="startDate"
                type="date"
                value={form.startDate}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                name="endDate"
                type="date"
                value={form.endDate}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-300"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
              <select
                name="difficulty"
                value={form.difficulty}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-300"
              >
                <option>Easy</option>
                <option>Moderate</option>
                <option>Difficult</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pace</label>
              <select
                name="pace"
                value={form.pace}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-300"
              >
                <option>Relaxed</option>
                <option>Normal</option>
                <option>Fast</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
              <select
                name="budget"
                value={form.budget}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-300"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Interests (comma separated)</label>
            <input
              name="interests"
              value={form.interests}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-300"
              placeholder="photography, views, flowers, challenging"
            />
          </div>

          <div className="flex gap-3 items-center">
            <button
              type="submit"
              className="px-5 py-3 bg-yellow-500 text-black font-semibold rounded-lg shadow hover:bg-yellow-600 transition"
            >
              Generate Itinerary
            </button>

            <button
              type="button"
              onClick={() => {
                setForm({
                  trekName: "Kedarkantha Trek",
                  startDate: new Date().toISOString().slice(0, 10),
                  endDate: addDays(new Date().toISOString().slice(0, 10), 5),
                  groupSize: 2,
                  difficulty: "Moderate",
                  pace: "Normal",
                  budget: "Medium",
                  interests: "photography,views",
                });
                setItinerary(null);
              }}
              className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              Reset
            </button>

            <div className="ml-auto text-sm text-gray-500">
              <strong>{itinerary ? itinerary.length : 0}</strong> day(s) generated
            </div>
          </div>
        </form>

        {/* Itinerary display */}
        {itinerary && (
          <section className="mt-8 bg-white border rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">{form.trekName} — Itinerary</h2>
                <p className="text-sm text-gray-600">
                  {form.startDate} → {form.endDate} · Group of {form.groupSize} · {form.difficulty}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-white border rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Save
                </button>
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 bg-yellow-500 text-black rounded-lg font-medium hover:bg-yellow-600 transition"
                >
                  Download
                </button>
              </div>
            </div>

            <hr className="my-4" />

            <ol className="space-y-4">
              {itinerary.map((d) => (
                <li key={d.day} className="p-4 bg-gray-50 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500">Day {d.day} · {d.date}</div>
                      <div className="text-lg font-semibold text-gray-800">{d.activity}</div>
                    </div>
                  </div>
                  {d.notes && <p className="mt-2 text-sm text-gray-600">{d.notes}</p>}
                </li>
              ))}
            </ol>

            {savedName && (
              <p className="mt-4 text-sm text-green-600">Saved to localStorage key: {savedName}</p>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
