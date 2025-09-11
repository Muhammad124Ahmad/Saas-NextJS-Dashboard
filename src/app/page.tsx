export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#f7fafd] font-sans">
      <div className="bg-white border border-[#e5eaf2] rounded-xl shadow-sm p-10 max-w-xl w-full text-center">
        <h1 className="text-4xl font-bold mb-4 text-[#2563eb] tracking-tight">Welcome to SaaS Dashboard</h1>
        <p className="text-lg text-[#222] mb-8 font-medium">
          A modern, responsive SaaS dashboard template built with Next.js, Tailwind CSS, and open source tools.<br />
          <span className="text-[#2563eb] font-semibold">Showcase your product, analytics, and more!</span>
        </p>
        <a href="/dashboard" className="inline-block bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-3 rounded-lg font-semibold shadow transition-all duration-150">Go to Dashboard</a>
      </div>
      <footer className="mt-10 text-[#6b7280] text-sm select-none">&copy; 2025 SaaS Inc. All rights reserved.</footer>
    </main>
  );
}
