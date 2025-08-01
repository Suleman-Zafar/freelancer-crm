import React from "react";

const HireMe = () => {
  return (
    <main className="bg-white text-gray-900 font-sans py-20 px-6 md:px-24">
      <section className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Hire Me as Your MVP Developer
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6">
          I build aesthetic MVPs that feel fast, look clean, and just work—without unnecessary complexity or corporate bloat.
        </p>
        <p className="text-md text-gray-500 italic mb-8">
          I only work with 1–2 selected founders at a time. If you're building something valuable and want it done right, let's talk.
        </p>

        {/* Replace the form below with Calendly or email link if needed */}
        <form
          className="bg-gray-50 rounded-xl shadow-sm p-8 space-y-6 text-left max-w-xl mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Message sent! I’ll get back to you soon.");
          }}
        >
          <div>
            <label className="block mb-1 font-medium text-gray-700">Your Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">What are you building?</label>
            <textarea
              required
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
              placeholder="Tell me about your startup, your vision, or the problem you're solving."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition"
          >
            Send Inquiry
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-10">
          Prefer async? Email me at <a href="mailto:suleman10490@gmail.com" className="underline">suleman10490@gmail.com</a>
        </p>
      </section>
    </main>
  );
};

export default HireMe;
