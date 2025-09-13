import AuthForm from "../../components/AuthForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <AuthForm mode="login" />
      <p className="mt-4 text-sm text-gray-600">
        Don't have an account?{' '}
        <a href="/signup" className="text-[#2563eb] underline hover:text-[#1746a2]">Sign up</a>
      </p>
    </div>
  );
}
