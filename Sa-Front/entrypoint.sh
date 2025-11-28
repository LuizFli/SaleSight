#!/bin/sh
set -e

# URL padrão que está hardcoded no build (api.ts)
DEFAULT_URL="http://52.203.182.51:4000"

# Verifica se a variável de ambiente NEXT_PUBLIC_API_BASE_URL foi passada
if [ -n "$NEXT_PUBLIC_API_BASE_URL" ]; then
    echo "🔄 Configurando URL do backend para: $NEXT_PUBLIC_API_BASE_URL"
    
    # Substitui a URL padrão pela nova URL em todos os arquivos JS gerados
    # Isso inclui arquivos estáticos (client-side) e arquivos do servidor (server-side)
    
    # Procura em .next/static (Client Side)
    if [ -d ".next/static" ]; then
        find .next/static -type f -name "*.js" -exec sed -i "s|$DEFAULT_URL|$NEXT_PUBLIC_API_BASE_URL|g" {} +
    fi

    # Procura em arquivos na raiz (Server Side / Standalone)
    find . -type f -name "*.js" -not -path "./node_modules/*" -exec sed -i "s|$DEFAULT_URL|$NEXT_PUBLIC_API_BASE_URL|g" {} +
    
    echo "✅ URL atualizada com sucesso!"
else
    echo "ℹ️ Nenhuma URL personalizada informada. Usando padrão: $DEFAULT_URL"
fi

# Executa o comando original do container (ex: node server.js)
exec "$@"
