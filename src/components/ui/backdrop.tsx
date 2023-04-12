type props = {
	children: React.ReactNode
}
export default function Backdrop({ children }: props) {
	return <div className="absolute inset-0 bg-black/60">{children}</div>
}
