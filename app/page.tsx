import Image from "next/image";
import { Navbar } from './components/Navbar'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Hero } from './visualstuff/Hero'
import { Logos } from './visualstuff/Logos'
import { Features } from './visualstuff/Features'
import { Testimonial } from './visualstuff/Testimonial'
import { CTA } from './visualstuff/CTA'

export default async function Home() {
  const session = await auth()

  if (session?.user){
		return redirect("/dashboard")
	}

  return (
  <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
    <Navbar/>
    <Hero/>
    <Logos/>
    <Features/>
    <Testimonial/>
    <CTA/>
  </div>
  );
}
