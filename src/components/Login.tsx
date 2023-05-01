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
		<div className="flex items-center gap-2">
			<Button
				className="w-24"
				onClick={handleDemoAccout}>
				Demo
			</Button>
			<Button
				onClick={handleLogin}
				className="w-24">
				<Github className="aspect-square w-5" />
			</Button>
		</div>
	)
}
