"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { alertError, alertSuccess } from "@/lib/alert";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Loading from "@/components/Loading";
import PageHeader from "@/components/dashboard/PageHeader";
import { api } from "@/lib/api";
import { useTheme } from "@/lib/theme";
import { money } from "@/lib/utils";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

function CheckoutForm({ amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [paying, setPaying] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setPaying(true);
    const { error, paymentIntent } = await stripe.confirmPayment({ elements, redirect: "if_required" });
    if (error) {
      alertError(error.message || "Payment failed");
      return setPaying(false);
    }
    try {
      await api("/payments/confirm", { method: "POST", body: { paymentIntentId: paymentIntent.id } });
      alertSuccess("Payment successful. Tutor approved!");
      router.replace("/dashboard/payments");
    } catch (err) {
      alertError(err.message);
      setPaying(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <PaymentElement />
      <button className="btn btn-primary w-full" disabled={!stripe || paying}>
        {paying ? <span className="loading loading-spinner loading-sm" /> : `Pay ${money(amount)}`}
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  const { applicationId } = useParams();
  const [state, setState] = useState({ intent: null, error: null });
  const dark = useTheme().theme === "dark";
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    api("/payments/intent", { method: "POST", body: { applicationId } })
      .then((intent) => setState({ intent, error: null }))
      .catch((error) => setState({ intent: null, error }));
  }, [applicationId]);

  if (state.error) return <p className="alert alert-error">{state.error.message}</p>;
  if (!state.intent) return <Loading fullScreen={false} label="Preparing checkout..." />;
  const { clientSecret, amount, application: a } = state.intent;

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader title="Checkout" sub="Complete the payment to confirm your tutor." />
      <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
        <div className="h-fit rounded-box border border-base-300 bg-base-100 p-6 shadow-sm">
          <h2 className="font-bold text-neutral">Order Summary</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-base-content/60">Tuition</dt><dd className="font-medium">{a.tuitionSubject}</dd></div>
            <div className="flex justify-between"><dt className="text-base-content/60">Tutor</dt><dd className="font-medium">{a.tutorName}</dd></div>
            <div className="flex justify-between border-t border-base-300 pt-3 text-base"><dt className="font-bold">Total</dt><dd className="font-extrabold text-primary">{money(amount)}</dd></div>
          </dl>
          <p className="mt-4 text-xs text-base-content/50">Test mode: use card 4242 4242 4242 4242 with any future date and CVC.</p>
        </div>
        <div className="rounded-box border border-base-300 bg-base-100 p-6 shadow-sm">
          <h2 className="mb-4 font-bold text-neutral">Payment Method</h2>
          <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: dark ? "night" : "stripe", variables: { colorPrimary: dark ? "#ec4899" : "#db2777", borderRadius: "10px" } } }}>
            <CheckoutForm amount={amount} />
          </Elements>
        </div>
      </div>
    </div>
  );
}
