import { useIsSubmitting } from "remix-validated-form";

export default function SubmitButton() {
  const isSubmitting = useIsSubmitting();
  return (
    <button
      type="submit"
      className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
      disabled={isSubmitting}
    >
      {isSubmitting ? "Submitting..." : "Submit"}
    </button>
  );
}
