import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CareersHero } from "@/components/careers/careers-hero";
import { CareersPerks } from "@/components/careers/careers-perks";
import { JobListings } from "@/components/careers/job-listings";
import { CareersApplication } from "@/components/careers/careers-application";

export default function CareersPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <CareersHero />
        <CareersPerks />
        <JobListings />
        <CareersApplication />
      </main>
      <Footer />
    </div>
  );
}
