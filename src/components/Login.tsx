"use client"

import { useSupabase } from "@/lib/supabase-provider"
import { Github } from "lucide-react"
import { Button } from "./ui/button"

export default function Login() {
	const { supabase } = useSupabase()

	async function handleLogin() {
		await supabase.auth.signInWithOAuth({
			provider: "github",
		})
	}

	async function handleDemoAccout() {
		await supabase.auth.signInWithPassword({
			email: "demo@demo.com",
			password: "demoAccount",
		})
	}

	return (
		<div className="flex flex-col items-center gap-2 md:flex-row">
			<Button
				className="w-full md:w-auto"
				onClick={handleDemoAccout}>
				Demo Account
			</Button>
			<Button
				onClick={handleLogin}
				className="w-full md:w-auto">
				Sign in with GitHub <Github className="ml-2 aspect-square w-5" />
			</Button>
		</div>
	)
}
