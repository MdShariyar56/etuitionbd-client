"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PageHeader from "@/components/dashboard/PageHeader";
import TuitionForm from "@/components/dashboard/TuitionForm";
import { api } from "@/lib/api";

export default function PostTuitionPage() {
  const router = useRouter();

  const submit = async (body) => {
    try {
      await api("/tuitions", { method: "POST", body });
      toast.success("Tuition posted! It will go live after admin approval.");
      router.push("/dashboard/student/my-tuitions");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Post New Tuition" sub="Your post is saved as Pending until an admin approves it." />
      <TuitionForm submitLabel="Post Tuition" onSubmit={submit} />
    </div>
  );
}
