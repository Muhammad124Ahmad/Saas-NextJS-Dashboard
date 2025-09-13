import AuthForm from "../../components/AuthForm";

export default function LoginPage() {
  // Check for session expired in query string
  let sessionExpired = false;
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    sessionExpired = params.get("session") === "expired";
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      {sessionExpired && (
        <div className="mb-4 text-red-600 font-medium bg-red-50 border border-red-200 px-4 py-2 rounded">
          Your session has expired. Please log in again.
        </div>
      )}
      <AuthForm mode="login" />
      <p className="mt-4 text-sm text-gray-600">
        Don&apos;t have an account?{' '}
        <a href="/signup" className="text-[#2563eb] underline hover:text-[#1746a2]">Sign up</a>
      </p>
    </div>
  );
}
