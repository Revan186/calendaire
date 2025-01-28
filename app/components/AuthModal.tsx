import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from '@/components/ui/dialog'
import { signIn } from '@/lib/auth'
import Logo from '@/public/logo.png'
import Image from 'next/image'
import { GitHubAuthButton, GoogleAuthButton } from './SubmitButtons'

export async function AuthModal() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Try for Free</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[360px]'>
				<DialogHeader className='flex flex-row items-center gap-2'>
					<Image src={Logo} alt='Logo' className='size-10' />
					<h4 className='text-3xl font-light text-blue-500'>Calendaire</h4>
				</DialogHeader>

				<div className='flex flex-col mt-5 gap-3'>
					<form action={async ()=>{
						'use server'

						await signIn("google")
					}} className='w-full'>
						<GoogleAuthButton/>
					</form>
					<form action={async ()=>{
							'use server'

							await signIn("github")
					}} className='w-full'>
							<GitHubAuthButton/>
						</form>
					
					
				</div>
			</DialogContent>
		</Dialog>
	)
}
