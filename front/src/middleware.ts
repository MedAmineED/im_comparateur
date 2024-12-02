import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Get the pathname of the request (e.g. /admin/dashboard)
    const path = request.nextUrl.pathname

    // Define paths that are considered public
    const isPublicPath = path === '/admin' || path === '/admin/register'

    // Get the token from cookies
    const token = request.cookies.get('auth_token')?.value

    // If trying to access protected routes without token
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/admin', request.url))
    }

    // If trying to access login page with token
    if (path === '/admin' && token) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }

    // Allow access to register page regardless of auth status
    if (path === '/admin/register') {
        return NextResponse.next()
    }

    // For all other routes, proceed normally
    return NextResponse.next()
}

// Configure the paths that should be handled by this middleware
export const config = {
    matcher: [
        '/admin',
        '/admin/dashboard/:path*',
        '/admin/register'
    ]
}
