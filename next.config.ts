import type { NextConfig } from 'next'


/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: 'lh3.googleusercontent.com',
			},
			{
				hostname: 'utfs.io',
			},
		],
	},
	typescript: {
		// !! WARN !!
		// This will disable type checking during builds
		ignoreBuildErrors: true,
	},
}

export default nextConfig
