// A função de middleware é executada no Edge da Vercel e usa APIs padrão da web.
export default function middleware(request: Request) {
  const basicAuth = request.headers.get('authorization');

  // Lê as variáveis de ambiente configuradas na Vercel
  const user = process.env.BASIC_AUTH_USER;
  const pass = process.env.BASIC_AUTH_PASSWORD;

  // Se as variáveis de ambiente não estiverem configuradas, permite o acesso
  if (!user || !pass) {
    return; 
  }

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    // A função atob() decodifica a string em base64
    const [providedUser, providedPassword] = atob(authValue).split(':');

    if (providedUser === user && providedPassword === pass) {
      // Se o usuário e senha estiverem corretos, a função termina e 
      // o acesso à página é permitido.
      return;
    }
  }

  // Se a autenticação falhar ou não for fornecida, retorna uma resposta 401
  // para solicitar as credenciais ao navegador.
  return new Response('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

// Configuração para o middleware rodar em todas as rotas do seu site.
export const config = {
  matcher: '/:path*',
};