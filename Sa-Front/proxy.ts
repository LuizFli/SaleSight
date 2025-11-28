import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rotas públicas que não exigem autenticação
const PUBLIC_PATHS = ['/login', '/_next', '/images', '/public', '/favicon.ico']

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p))
  const access = req.cookies.get('accessToken')?.value

  // Se não autenticado e rota não é pública, redireciona para /login
  if (!isPublic && !access) {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Se já autenticado e está em /login, redireciona para raiz
  if (pathname === '/login' && access) {
    const url = req.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
