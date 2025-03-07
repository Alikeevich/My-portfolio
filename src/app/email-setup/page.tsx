import EmailSetupInstructions from "@/components/EmailSetupInstructions";

export default function EmailSetupPage() {
  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">
        Email Setup Guide
      </h1>
      <EmailSetupInstructions />
    </div>
  );
}
