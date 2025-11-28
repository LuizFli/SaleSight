## Build aplicação Next.js em modo standalone com Node
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Garante que o servidor ouça em todas as interfaces de rede, não apenas localhost
ENV HOSTNAME="0.0.0.0"

# Copia artefatos standalone + estáticos
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

# Copia o script de entrypoint
COPY entrypoint.sh ./
# Garante que o script tenha quebras de linha estilo Unix (LF) e seja executável
RUN sed -i 's/\r$//' entrypoint.sh && chmod +x entrypoint.sh

EXPOSE 3000

# Define o entrypoint para rodar o script antes de iniciar o servidor
ENTRYPOINT ["./entrypoint.sh"]
CMD ["node", "server.js"]

