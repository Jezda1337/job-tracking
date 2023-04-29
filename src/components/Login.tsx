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

	return (
		<>
			<Button
				onClick={handleLogin}
				className="w-24">
				<Github className="aspect-square w-5" />
			</Button>
		</>
	)
}
