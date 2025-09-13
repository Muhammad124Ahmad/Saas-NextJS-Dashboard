export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#f7fafd] font-sans">
      <div className="bg-white border border-[#e5eaf2] rounded-xl shadow-sm p-10 max-w-xl w-full text-center">
        <div className="flex flex-col items-center mb-4">
          <img src="/saaslytic-logo.svg" alt="Saaslytic Logo" className="w-14 h-14 mb-2" />
          <h1 className="text-4xl font-bold text-[#2563eb] tracking-tight">Welcome to Saaslytic</h1>
        </div>
        <p className="text-lg text-[#222] mb-8 font-medium">
          Manage your SaaS business with ease.<br />
          <span className="text-[#2563eb] font-semibold">Track analytics, monitor growth, and serve your clients better.</span>
        </p>
  <a href="/dashboard" className="inline-block bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-3 rounded-lg font-semibold shadow transition-all duration-150">Go to Saaslytic</a>
      </div>
  <footer className="mt-10 text-[#6b7280] text-sm select-none">&copy; 2025 Saaslytic. All rights reserved.</footer>
    </main>
  );
}
