import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { site } from "../../content/site";
import type { Package } from "../../content/types";
import {
  buildTripRequestSummary,
  validateTripRequest,
} from "../../lib/tripRequest";
import type {
  TripRequestErrors,
  TripRequestInput,
} from "../../lib/tripRequest";
import { Button } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";
import { WhatsAppButton } from "../ui/WhatsAppButton";

const fieldClass =
  "w-full rounded-xl border border-deep-900/20 bg-sand-50 px-3 py-2 text-sm text-deep-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-500";
const labelClass =
  "mb-2 block text-xs font-semibold uppercase tracking-widest text-deep-700";
const errorClass = "mt-1 text-sm text-coral-600";

export function TripForm({ packages }: { packages: Package[] }) {
  const [searchParams] = useSearchParams();
  const confirmationRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState<TripRequestInput>(() => {
    const slug = searchParams.get("paket") ?? "";
    const participants = searchParams.get("peserta") ?? "";
    return {
      packageSlug: packages.some((pkg) => pkg.slug === slug) ? slug : "",
      date: searchParams.get("tanggal") ?? "",
      participants: participants ? Number(participants) : Number.NaN,
      name: "",
      contact: "",
      note: "",
    };
  });
  const [errors, setErrors] = useState<TripRequestErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const selectedPackage = useMemo(
    () => packages.find((pkg) => pkg.slug === input.packageSlug),
    [packages, input.packageSlug],
  );

  useEffect(() => {
    if (submitted) confirmationRef.current?.focus();
  }, [submitted]);

  function update<Key extends keyof TripRequestInput>(
    key: Key,
    value: TripRequestInput[Key],
  ) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateTripRequest(input, {
      minParticipants: selectedPackage?.minParticipants,
      maxParticipants: selectedPackage?.maxParticipants,
    });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      const firstKey = Object.keys(nextErrors)[0];
      document.getElementById(`trip-${firstKey}`)?.focus();
      return;
    }

    setSubmitted(true);
  }

  function resetForm() {
    setSubmitted(false);
    setErrors({});
  }

  if (submitted && selectedPackage) {
    const summary = buildTripRequestSummary(input, selectedPackage.title);

    return (
      <section id="formulir" className="scroll-mt-24 bg-sand-100 px-4 py-20">
        <div className="mx-auto max-w-2xl">
          <div
            ref={confirmationRef}
            role="status"
            tabIndex={-1}
            aria-live="polite"
            className="rounded-3xl border border-lagoon-500/40 bg-sand-50 p-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-500"
          >
            <h2 className="font-display text-2xl text-deep-950">
              Permintaan diterima
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-charcoal/80">
              Terima kasih, <strong>{input.name}</strong>. Ini konfirmasi tampilan
              di sisi klien saja: permintaan Anda{" "}
              <strong>belum terverifikasi</strong> dan belum menjadi pemesanan.
              Operator akan mengonfirmasi ketersediaan lewat kontak yang Anda
              berikan.
            </p>

            <pre className="mt-6 overflow-x-auto rounded-2xl bg-sand-100 p-4 text-left text-sm whitespace-pre-wrap text-charcoal/85">
              {summary}
            </pre>

            <div className="mt-6 flex flex-wrap gap-3">
              <WhatsAppButton
                number={site.whatsappNumber}
                ctx={{
                  packageTitle: selectedPackage.title,
                  date: input.date,
                  participants: input.participants,
                  note: input.note,
                }}
                size="md"
              >
                Lanjut ke WhatsApp
              </WhatsAppButton>
              <Button variant="secondary" onClick={resetForm}>
                Kirim permintaan lain
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="formulir" className="scroll-mt-24 bg-sand-100 px-4 py-20">
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          eyebrow="Ajukan trip"
          title="Rencanakan perjalanan Anda"
          description="Isi tanggal, jumlah peserta, dan paket pilihan. Kami balas lewat kontak yang Anda berikan."
        />

        <form
          noValidate
          onSubmit={handleSubmit}
          className="mt-8 space-y-5 rounded-3xl border border-deep-900/10 bg-sand-50 p-6 sm:p-8"
        >
          <div>
            <label className={labelClass} htmlFor="trip-packageSlug">
              Paket pilihan
            </label>
            <select
              id="trip-packageSlug"
              className={fieldClass}
              aria-required="true"
              aria-describedby={
                errors.packageSlug ? "trip-packageSlug-error" : undefined
              }
              value={input.packageSlug}
              onChange={(event) => update("packageSlug", event.target.value)}
            >
              <option value="">Pilih paket…</option>
              {packages.map((pkg) => (
                <option key={pkg.slug} value={pkg.slug}>
                  {pkg.title}
                </option>
              ))}
            </select>
            {errors.packageSlug ? (
              <p id="trip-packageSlug-error" className={errorClass}>
                {errors.packageSlug}
              </p>
            ) : null}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="trip-date">
                Tanggal perjalanan
              </label>
              <input
                id="trip-date"
                type="date"
                className={fieldClass}
                aria-required="true"
                aria-describedby={errors.date ? "trip-date-error" : undefined}
                value={input.date}
                onChange={(event) => update("date", event.target.value)}
              />
              {errors.date ? (
                <p id="trip-date-error" className={errorClass}>
                  {errors.date}
                </p>
              ) : null}
            </div>

            <div>
              <label className={labelClass} htmlFor="trip-participants">
                Jumlah peserta
              </label>
              <input
                id="trip-participants"
                type="number"
                min={1}
                max={selectedPackage?.maxParticipants}
                className={fieldClass}
                aria-required="true"
                aria-describedby={
                  errors.participants ? "trip-participants-error" : undefined
                }
                value={
                  Number.isNaN(input.participants) ? "" : input.participants
                }
                onChange={(event) =>
                  update(
                    "participants",
                    event.target.value === ""
                      ? Number.NaN
                      : Number(event.target.value),
                  )
                }
              />
              {errors.participants ? (
                <p id="trip-participants-error" className={errorClass}>
                  {errors.participants}
                </p>
              ) : null}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="trip-name">
                Nama
              </label>
              <input
                id="trip-name"
                type="text"
                className={fieldClass}
                aria-required="true"
                aria-describedby={errors.name ? "trip-name-error" : undefined}
                value={input.name}
                onChange={(event) => update("name", event.target.value)}
              />
              {errors.name ? (
                <p id="trip-name-error" className={errorClass}>
                  {errors.name}
                </p>
              ) : null}
            </div>

            <div>
              <label className={labelClass} htmlFor="trip-contact">
                Kontak (WhatsApp atau email)
              </label>
              <input
                id="trip-contact"
                type="text"
                className={fieldClass}
                aria-required="true"
                aria-describedby={
                  errors.contact ? "trip-contact-error" : undefined
                }
                value={input.contact}
                onChange={(event) => update("contact", event.target.value)}
              />
              {errors.contact ? (
                <p id="trip-contact-error" className={errorClass}>
                  {errors.contact}
                </p>
              ) : null}
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="trip-note">
              Catatan (opsional)
            </label>
            <textarea
              id="trip-note"
              rows={4}
              className={fieldClass}
              value={input.note ?? ""}
              onChange={(event) => update("note", event.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" size="lg">
              Kirim permintaan
            </Button>
            <p className="text-xs text-charcoal/75">
              Ini permintaan awal, bukan pemesanan terkonfirmasi.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
