"use client";

import { useRouter } from "next/navigation";
import { alertError, alertSuccess } from "@/lib/alert";
import PageHeader from "@/components/dashboard/PageHeader";
import TuitionForm from "@/components/dashboard/TuitionForm";
import { api } from "@/lib/api";

export default function PostTuitionPage() {
  const router = useRouter();

  const submit = async (body) => {
    try {
      await api("/tuitions", { method: "POST", body });
      alertSuccess("Tuition posted! It will go live after admin approval.");
      router.push("/dashboard/student/my-tuitions");
    } catch (err) {
      alertError(err.message);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Post New Tuition" sub="Your post is saved as Pending until an admin approves it." />
      <TuitionForm submitLabel="Post Tuition" onSubmit={submit} />
    </div>
  );
}
