"use client";

import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";
import PageHeader from "@/components/dashboard/PageHeader";
import TuitionForm from "@/components/dashboard/TuitionForm";
import { api } from "@/lib/api";
import { useApi } from "@/lib/useApi";

export default function EditTuitionPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data, loading, error } = useApi(`/tuitions/${id}`);

  if (loading && !data) return <Loading fullScreen={false} />;
  if (error || !data?.tuition) return <p className="alert alert-error">{error?.message || "Tuition not found"}</p>;

  const submit = async (body) => {
    try {
      await api(`/tuitions/${id}`, { method: "PATCH", body });
      toast.success("Tuition updated");
      router.push("/dashboard/student/my-tuitions");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Edit Tuition" sub="Update your tuition details." />
      <TuitionForm initial={data.tuition} submitLabel="Save Changes" onSubmit={submit} />
    </div>
  );
}
