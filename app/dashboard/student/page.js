import { redirect } from "next/navigation";

export default function StudentIndex() {
  redirect("/dashboard/student/my-tuitions");
}
