import { RegisterForm } from "@/components/register-form";

export default function RegisterPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <div className="w-full max-w-sm p-4">
        <RegisterForm />
      </div>
    </div>
  );
}
