import type { OperatorProfile } from "../../content/types";
import { Badge } from "../ui/Badge";
import { SectionHeading } from "../ui/SectionHeading";
import { SmartImage } from "../ui/SmartImage";

export function OperatorProfileSection({
  profile,
}: {
  profile: OperatorProfile;
}) {
  return (
    <section id="operator" className="scroll-mt-24 bg-sand-100 px-4 py-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,320px)_1fr]">
        <div className="overflow-hidden rounded-3xl bg-sand-50">
          <SmartImage
            src={profile.photo}
            alt={`Potret ${profile.name}`}
            ratio="aspect-square"
          />
        </div>

        <div>
          <SectionHeading
            eyebrow="Pemandu"
            title={profile.name}
            description={profile.role}
          />

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-charcoal/80">
            {profile.bio}
          </p>

          <dl className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-deep-700">
                Pengalaman
              </dt>
              <dd className="mt-1 font-display text-2xl text-deep-950">
                {profile.yearsExperience} tahun
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-deep-700">
                Bahasa
              </dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {profile.languages.map((language) => (
                  <Badge key={language} tone="sand">
                    {language}
                  </Badge>
                ))}
              </dd>
            </div>
          </dl>

          <div className="mt-8">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-deep-700">
              Sertifikasi
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {profile.certifications.map((certification) => (
                <li key={certification}>
                  <Badge tone="lagoon">{certification}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
