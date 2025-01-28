import Image from 'next/image'
import Link from 'next/link'
import Logo from "@/public/logo.png"
import { AuthModal } from './AuthModal'
import { ThemeToggle } from './ThemeToggle'


export function Navbar(){
	return (
		<div className='flex py-5 items-center justify-between '>
			<Link href='/' className='flex items-center gap-2'>
				<Image src={Logo} alt='cccc' className='size-10'/>
				<h4 className='text-3xl font-light text-blue-500'>Calendaire</h4>
			</Link>

			<div className=' flex items-center gap-6'>
			<ThemeToggle />
			<AuthModal/>
			
			</div>

		
			
		</div>
	)
}