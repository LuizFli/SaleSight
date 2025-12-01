import { Suspense } from 'react'

// Renderiza o formulário de login apenas no cliente dentro de um boundary Suspense para evitar fallback CSR
import LoginForm from './LoginForm'

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Carregando...</div>}>
      <LoginForm />
    </Suspense>
  )
}
