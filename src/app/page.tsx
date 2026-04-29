import { Hero } from '@/components/home/Hero'
import { ServicesSummary } from '@/components/home/ServicesSummary'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { WhyUs } from '@/components/home/WhyUs'
import { StatsBar } from '@/components/shared/StatsBar'
import { CtaBanner } from '@/components/home/CtaBanner'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSummary />
      <FeaturedProducts />
      <StatsBar />
      <WhyUs />
      <CtaBanner />
    </>
  )
}
