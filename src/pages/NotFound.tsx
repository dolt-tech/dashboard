import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-4 text-lg">Oops! Page not found</p>
      <Link 
        to="/" 
        className="mt-6 rounded-md bg-[#FF7A00] px-4 py-2 text-white hover:bg-[#CC5A00]"
      >
        Go back home
      </Link>
    </div>
  )
}