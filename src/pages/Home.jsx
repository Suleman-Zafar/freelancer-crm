import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Home = () => {
  const dashboardData = {
    labels: ["Clients", "Projects", "Invoices", "Payments"],
    datasets: [
      {
        label: "Stats",
        data: [12, 9, 23, 18],
        backgroundColor: "#4f46e5",
        borderRadius: 6,
      },
    ],
  };

  return (
    <main className="bg-white text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-blue-50 py-20 px-6 md:px-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          The Freelance CRM That Just Makes Sense
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Manage clients, track income, and run your freelance business without spreadsheets or stress.
        </p>
        <a
          href="/signup"
          className="inline-block px-8 py-4 bg-black text-white rounded-lg text-lg font-semibold hover:bg-gray-800 transition"
        >
          Get Started
        </a>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-24 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          {[
            {
              title: "Client Management",
              desc: "Keep track of all your clients, notes, and communication history in one place.",
            },
            {
              title: "Project Tracking",
              desc: "Link tasks and timelines to clients. Know what’s due and when at a glance.",
            },
            {
              title: "Invoice Generator",
              desc: "Create and send beautiful invoices. Track payments and stay organized.",
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-gray-50 rounded-xl shadow-sm p-8">
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-20 px-6 md:px-24 bg-gray-50 border-y border-gray-200">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Your Dashboard</h2>
          <p className="text-gray-600 text-lg">
            Everything you need to manage your work, beautifully visualized.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Bar data={dashboardData} options={{ responsive: true }} />
        </div>
      </section>

      {/* Hire Me Section */}
      <section className="bg-white py-20 px-6 md:px-24 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
            Need a Beautiful MVP Built? I Might Be Your Dev.
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            I specialize in building aesthetic, fast, and functional MVPs for freelancers, solo founders, and early-stage teams.
            <br className="hidden md:block" />
            If you're building something meaningful, and you need more than just a coder—you need someone who understands product, design, and speed—I might be a fit.
          </p>
          <p className="text-md text-gray-500 italic mb-8">
            I'm not for everyone. I only take on a few selective clients where I believe in the vision. 
            No fluff, no up-sell—just real results, delivered fast.
          </p>
          <a
            href="/hire-me"
            className="inline-block px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
          >
            Hire Me as Your MVP Developer
          </a>
        </div>
      </section>
    </main>
  );
};

export default Home;
