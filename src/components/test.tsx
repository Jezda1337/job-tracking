import { useSupabase } from "@/lib/supabase-provider"
import { useEffect, useState } from "react"

export default function Test() {
	const [user, setUser] = useState<any>()
	const { supabase } = useSupabase()
	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setUser(session?.user!)
		})
	}, [])
	console.log(user)
	return (
		<>
			<h1>test</h1>
			<h2>{user?.email}</h2>
		</>
	)
}
