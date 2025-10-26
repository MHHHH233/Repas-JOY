import { HeroSection } from "../components/HeroSection"
import { ServiceCategories } from "../components/ServiceCategories"
import { DashPassPromo } from "../components/DashPassPromo"
import { FeaturedSection } from "../components/FeaturedSection"

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <ServiceCategories />
      <DashPassPromo />
      <FeaturedSection />
    </main>
  )
}
