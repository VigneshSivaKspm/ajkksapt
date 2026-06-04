import { HeroSlider } from "../components/home/HeroSlider";
import { AnnouncementTicker } from "../components/home/AnnouncementTicker";
import { StatsCounter } from "../components/home/StatsCounter";
import { DepartmentsShowcase } from "../components/home/DepartmentsShowcase";
import { WhyChooseUs } from "../components/home/WhyChooseUs";
import { PrincipalMessage } from "../components/home/PrincipalMessage";
import { AdmissionCampaign } from "../components/home/AdmissionCampaign";
import { LatestNews } from "../components/home/LatestNews";
import { GalleryPreview } from "../components/home/GalleryPreview";
import { Testimonials } from "../components/home/Testimonials";
import { UpcomingEvents } from "../components/home/UpcomingEvents";
import { CampusHighlights } from "../components/home/CampusHighlights";
import { QuickLinks } from "../components/home/QuickLinks";

export function Home() {
  return (
    <div className="min-h-screen">
      <AnnouncementTicker />
      <HeroSlider />
      <StatsCounter />
      <DepartmentsShowcase />
      <WhyChooseUs />
      <CampusHighlights />
      <PrincipalMessage />
      <UpcomingEvents />
      <LatestNews />
      <GalleryPreview />
      <Testimonials />
      <AdmissionCampaign />
      <QuickLinks />
    </div>
  );
}
