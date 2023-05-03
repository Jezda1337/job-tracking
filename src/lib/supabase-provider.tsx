"use client"

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"

import { Database } from "@/types/database"
import type { SupabaseClient } from "@supabase/auth-helpers-nextjs"
import { User } from "@supabase/supabase-js"

type SupabaseContext = {
	supabase: SupabaseClient<Database>
}

const Context = createContext<SupabaseContext | undefined>(undefined)
const CurretnUser = createContext<User | null>(null)

export default function SupabaseProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const [supabase] = useState(() => createBrowserSupabaseClient())
	const router = useRouter()
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(() => {
			router.refresh()
			router.push("/jobs")
		})

		return () => {
			subscription.unsubscribe()
		}
	}, [router, supabase])

	useEffect(() => {
		async function getUserData() {
			const {
				data: { user },
			} = await supabase.auth.getUser()
			setUser(user)
		}

		getUserData()
	}, [supabase])

	return (
		<Context.Provider value={{ supabase }}>
			<CurretnUser.Provider value={user}>
				<>{children}</>
			</CurretnUser.Provider>
		</Context.Provider>
	)
}

export const useUser = () => {
	const context = useContext(CurretnUser)
	if (context === null) {
		return null
	}

	return context
}

export const useSupabase = () => {
	const context = useContext(Context)

	if (context === undefined) {
		throw new Error("useSupabase must be used inside SupabaseProvider")
	}

	return context
}
