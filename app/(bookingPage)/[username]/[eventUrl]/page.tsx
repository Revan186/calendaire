import { createMeetingAction } from '@/actions'
import { RenderCalendar } from '@/app/components/bookingForm/RenderCalendar'
import { SubmitButton } from '@/app/components/SubmitButtons'
import TimeTable from '@/app/components/TimeTable'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { prisma } from '@/lib/prisma'
import { BookMarked, CalendarX2, Clock } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'

async function getData(eventUrl: string, username: string) {
	const data = await prisma.eventType.findFirst({
		where: {
			url: eventUrl,
			User: {
				userName: username,
			},
			active: true,
		},
		select: {
			id: true,
			description: true,
			title: true,
			duration: true,
			videoCallSoftware: true,
			User: {
				select: {
					image: true,
					name: true,
					availability: {
						select: {
							day: true,
							isActive: true,
						},
					},
				},
			},
		},
	})

	if (!data) {
		return notFound()
	}

	return data
}

type PageProps = {
	params: {
		username: string
		eventUrl: string
	}
	searchParams: {
		date?: string
		time?: string
	}
}

export async function generateMetadata() {
	return {
		title: 'Booking Page',
	}
}

export default async function BookingFormRoute({
	params,
	searchParams,
}: PageProps): Promise<JSX.Element> {
	const { username, eventUrl } = params
	const data = await getData(eventUrl, username)
	const selectedDate = searchParams.date
		? new Date(searchParams.date)
		: new Date()

	const formattedDate = new Intl.DateTimeFormat('en-Us', {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
	}).format(selectedDate)

	const showForm = !!searchParams.date && !!searchParams.time

	return (
		<div className='min-h-screen w-screen flex items-center justify-center'>
			{showForm ? (
				<Card className='max-w-[600px]'>
					<CardContent className='p-5 grid md:grid-cols-[1fr,auto,1fr] gap-4'>
						<div>
							<Image
								src={data.User?.image as string}
								alt={`${data.User?.name}'s profile picture`}
								className='size-9 rounded-full'
								width={30}
								height={30}
							/>
							<p className='text-sm font-medium text-muted-foreground mt-1'>
								{data.User?.name}
							</p>
							<h1 className='text-xl font-semibold mt-2'>{data.title}</h1>
							<p className='text-sm font-medium text-muted-foreground'>
								{data.description}
							</p>

							<div className='mt-5 grid gap-y-3'>
								<p className='flex items-center'>
									<CalendarX2 className='size-4 mr-2 text-primary' />
									<span className='text-sm font-medium text-muted-foreground'>
										{formattedDate}
									</span>
								</p>
								<p className='flex items-center'>
									<Clock className='size-4 mr-2 text-primary' />
									<span className='text-sm font-medium text-muted-foreground'>
										{data.duration} Mins
									</span>
								</p>
								<p className='flex items-center'>
									<BookMarked className='size-4 mr-2 text-primary' />
									<span className='text-sm font-medium text-muted-foreground'>
										{data.videoCallSoftware}
									</span>
								</p>
							</div>
						</div>
						<Separator
							orientation='vertical'
							className='hidden md:block h-full w-[1px]'
						/>

						<form
							className='flex flex-col gap-y-4'
							action={createMeetingAction}
						>
							<input type='hidden' name='eventTypeId' value={data.id} />
							<input type='hidden' name='username' value={params.username} />
							<input type='hidden' name='fromTime' value={searchParams.time} />
							<input type='hidden' name='eventDate' value={searchParams.date} />
							<input type='hidden' name='meetingLength' value={data.duration} />
							<div className='flex flex-col gap-y-1'>
								<Label>Your Name</Label>
								<Input name='name' placeholder='Your Name' />
							</div>

							<div className='flex flex-col gap-y-1'>
								<Label>Your Email</Label>
								<Input
									name='email'
									placeholder='DartDiabetustheWide@gmail.com'
								/>
							</div>

							<SubmitButton text='Book Meeting' />
						</form>
					</CardContent>
				</Card>
			) : (
				<Card className='w-full max-w-[1000px] mx-auto'>
					<CardContent className='p-5 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr] md:gap-4'>
						<div>
							<Image
								src={data.User?.image as string}
								alt={`${data.User?.name}'s profile picture`}
								className='size-9 rounded-full'
								width={30}
								height={30}
							/>
							<p className='text-sm font-medium text-muted-foreground mt-1'>
								{data.User?.name}
							</p>
							<h1 className='text-xl font-semibold mt-2'>{data.title}</h1>
							<p className='text-sm font-medium text-muted-foreground'>
								{data.description}
							</p>
							<div className='mt-5 grid gap-y-3'>
								<p className='flex items-center'>
									<CalendarX2 className='size-4 mr-2 text-primary' />
									<span className='text-sm font-medium text-muted-foreground'>
										{formattedDate}
									</span>
								</p>
								<p className='flex items-center'>
									<Clock className='size-4 mr-2 text-primary' />
									<span className='text-sm font-medium text-muted-foreground'>
										{data.duration} Mins
									</span>
								</p>
								<p className='flex items-center'>
									<BookMarked className='size-4 mr-2 text-primary' />
									<span className='text-sm font-medium text-muted-foreground'>
										Google Meet
									</span>
								</p>
							</div>
						</div>

						<Separator
							orientation='vertical'
							className='hidden md:block h-full w-[1px]'
						/>

						<div className='my-4 md:my-0'>
							<RenderCalendar daysofWeek={data?.User?.availability as any} />
						</div>

						<Separator
							orientation='vertical'
							className='hidden md:block h-full w-[1px]'
						/>

						<TimeTable
							selectedDate={selectedDate}
							userName={params.username}
							duration={data.duration}
						/>
					</CardContent>
				</Card>
			)}
		</div>
	)
}

// return (
// 	<div className='min-h-screen w-screen flex items-center justify-center'>
// 		{showForm ? (
// 			<Card className='max-w-[600px] w-full'>
// 			<CardContent className='p-5 md:grid md:grid-cols-[1fr,auto,1fr] md:gap-10'>
// 			        {/* <Card className="max-w-[600px]">
// 							<CardContent className="p-5 grid md:grid-cols-[1fr,auto,1fr,auto,1fr] gap-4"> */}
// 				<div>
// 					<Image src={data.User?.image as string} className='size-10 rounded-full' width={10} height={10} alt=""/>
// 					<p className='text-sm font-medium text-muted-foreground mt-1'>{data.User?.name}</p>
// 					<h1 className='text-xl font-semibold mt-2'>{data.title}</h1>
// 					<p className='text-sm font-medium text-muted-foreground'>{data.description}</p>

// 					<div className='mt-5 flex flex-col gap-y-3'>
// 						<p className='flex items-center'>
// 							<CalendarX2 className='size-4 mr-2 text-primary'/>
// 							<span className='text-sm font-medium text-muted-foreground'>{formattedDate.toString()}</span>
// 						</p>

// 						<p className='flex items-center'>
// 							<Clock className='size-4 mr-2 text-primary'/>
// 							<span className='text-sm font-medium text-muted-foreground'>{data.duration} Minutes</span>
// 						</p>

// 						<p className='flex items-center'>
// 							<VideoIcon className='size-4 mr-2 text-primary'/>
// 							<span className='text-sm font-medium text-muted-foreground'>{data.videoCallSoftware}</span>
// 						</p>

// 					</div>
// 				</div>

// 				<Separator orientation="vertical" className='h-full w-[1px]'/>

// 				<form action="">
// 					<input type="hidden" name="fromTime" value={searchParams.time}/>
// 					<input type="hidden" name="eventType" value={searchParams.date}/>
// 					<input type="hidden" name="meetingLength" value={data.duration}/>
// 					<input type="hidden" name="provider" value={data.videoCallSoftware}/>
// 					<input type="hidden" name="username" value={params.username}/>
// 					<input type="hidden" name="eventTypeId" value={data.id}/>
// 					<div className='flex flex-col gap-y-4'>
// 						<Label>Your Name</Label>
// 						<Input name="name" placeholder="Your Name"/>
// 					</div>

// 					<div className='flex flex-col gap-y-2'>
// 								<Label>Your Email</Label>
// 								<Input name="email" placeholder='chelodoimolovek@stuff.com'/>
// 					</div>
// 					<SubmitButton className="w-full mt-5" text="Book Meeting"/>
// 				</form>

// 			</CardContent>
// 		</Card>
// 		):(
// 			<Card className='w-full max-w-[1000px] mx-auto'>

// 			</Card>
// 		)}

// 	</div>
// )

// <Card className='max-w-[600px] w-full mx-auto'>
// 			<CardContent className='p-5 md:grid md:grid-cols-[1fr,auto,1fr,] md:gap-10'>
// 			        {/* <Card className="max-w-[600px]">
// 							<CardContent className="p-5 grid md:grid-cols-[1fr,auto,1fr,auto,1fr] gap-4"> */}
// 				<div>
// 					<Image src={data.User?.image as string} className='size-10 rounded-full' width={10} height={10} alt=""/>
// 					<p className='text-sm font-medium text-muted-foreground mt-1'>{data.User?.name}</p>
// 					<h1 className='text-xl font-semibold mt-2'>{data.title}</h1>
// 					<p className='text-sm font-medium text-muted-foreground'>{data.description}</p>

// 					<div className='mt-5 flex flex-col gap-y-3'>
// 						<p className='flex items-center'>
// 							<CalendarX2 className='size-4 mr-2 text-primary'/>
// 							<span className='text-sm font-medium text-muted-foreground'>{formattedDate.toString()}</span>
// 						</p>

// 						<p className='flex items-center'>
// 							<Clock className='size-4 mr-2 text-primary'/>
// 							<span className='text-sm font-medium text-muted-foreground'>{data.duration} Minutes</span>
// 						</p>

// 						<p className='flex items-center'>
// 							<VideoIcon className='size-4 mr-2 text-primary'/>
// 							<span className='text-sm font-medium text-muted-foreground'>{data.videoCallSoftware}</span>
// 						</p>

// 					</div>
// 				</div>

// 				<Separator orientation="vertical" className='h-full w-[1px]'/>

// 				<RenderCalendar daysofWeek={data?.User?.availability as any} />

// 				<Separator orientation="vertical" className='h-full w-[1]'/>

// 				<TimeTable selectedDate={selectedDate} userName={params.username} duration={data.duration}/>

// 			</CardContent>
// 		</Card>
