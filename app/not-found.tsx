import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
	return (
		<div className='h-screen w-screen flex flex-col items-center justify-center'>
			<h2 className='text-3xl font-bold'>Not Found</h2>
			<p className='text-muted-foreground'>
				Could not find the requested resource
			</p>
			<Button asChild className='mt-4'>
				<Link href='/'>Return Home</Link>
			</Button>
		</div>
	)
}
