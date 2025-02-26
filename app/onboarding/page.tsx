'use client'

import { OnboardingAction } from '@/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useActionState, useEffect } from 'react'
import {useForm} from '@conform-to/react'
import { onboardingSchemaLocale } from '@/lib/zodSchema'
import { parseWithZod } from '@conform-to/zod'
import { SubmitButton } from '../components/SubmitButtons'
import { requireUser } from '@/lib/hooks'


export default function OnboardingRoute(){
	const [lastResult, action] = useActionState(OnboardingAction, undefined)

	const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult,

    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: onboardingSchemaLocale });
    },

    // Validate the form on blur event triggered
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });



	


	return (
		<div className='min-h-screen w-screen flex items-center justify-center'>
			<Card>
				<CardHeader>  
					<CardTitle>Welcome to <span className='text-primary'>Calendaire</span></CardTitle>
					<CardDescription>We need the following information to set up your profile</CardDescription>
				</CardHeader>
			<form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
			<CardContent className='grid gap-y-5'>
					<div className='grid gap-y-2'>
						<Label>Full Name</Label>
						<Input name={fields.fullName.name} defaultValue={fields.fullName.initialValue} key={fields.fullName.key} placeholder='Dart Diabetus the Wide'/>
						<p className='text-red-500 text-sm'>{fields.fullName.errors}</p>
						 
					</div>

					<div className='grid gap-y-2'>
						<Label>Username</Label>
						<div className='flex rounded-md'>
							
							<Input placeholder='ex1' className='rounded-l-none' name={fields.userName.name} key={fields.userName.key} defaultValue={fields.userName.initialValue}/>
						</div>
						<p className='text-red-500 text-sm'>{fields.userName.errors}</p>
					</div>
				</CardContent>
				<CardFooter>
					<SubmitButton text="Submit" className='w-full'/>
				</CardFooter>
			</form>
			</Card>
		</div>
	)
}

