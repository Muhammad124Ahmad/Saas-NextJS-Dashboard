import AuthForm from "../../components/AuthForm";

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <AuthForm mode="signup" />
      <p className="mt-4 text-sm text-gray-600">
        Already have an account?{' '}
        <a href="/login" className="text-[#2563eb] underline hover:text-[#1746a2]">Login</a>
      </p>
    </div>
  );
}
