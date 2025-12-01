#!/bin/sh
set -e

# Se DB_HOST for fornecido e DATABASE_URL não, construa o DATABASE_URL
if [ -n "${DB_HOST}" ] && [ -z "${DATABASE_URL}" ]; then
  DB_USER="${DB_USER:-root}"
  DB_PASS="${DB_PASS:-senai}"
  DB_PORT="${DB_PORT:-3306}"
  DB_NAME="${DB_NAME:-selesigth_db}"
  DATABASE_URL="mysql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}"
  export DATABASE_URL
  echo "[entrypoint] Set DATABASE_URL from DB_HOST: ${DATABASE_URL}"
fi

# Se SIMULATOR_HOST for fornecido e SIMULATOR_URL não, construa o SIMULATOR_URL
if [ -n "${SIMULATOR_HOST}" ] && [ -z "${SIMULATOR_URL}" ]; then
  SIMULATOR_PORT="${SIMULATOR_PORT:-3000}"
  SIMULATOR_PROTOCOL="${SIMULATOR_PROTOCOL:-http}"
  SIMULATOR_URL="${SIMULATOR_PROTOCOL}://${SIMULATOR_HOST}:${SIMULATOR_PORT}"
  export SIMULATOR_URL
  echo "[entrypoint] Set SIMULATOR_URL from SIMULATOR_HOST: ${SIMULATOR_URL}"
fi

# Se DATABASE_URL for fornecido explicitamente, garanta que seja exportado e escreva-o
# em /app/.env para que o código que lê um arquivo .env (ou o Prisma usando dotenv) possa utilizá-lo.
if [ -n "${DATABASE_URL}" ]; then
  echo "[entrypoint] DATABASE_URL present; exporting and writing to /app/.env"
  export DATABASE_URL
  mkdir -p /app
  # Write with double quotes around the value to preserve special chars
  printf 'DATABASE_URL="%s"\n' "${DATABASE_URL}" > /app/.env
fi

# Se SIMULATOR_URL for fornecido (ou construído), escreva-o no .env
if [ -n "${SIMULATOR_URL}" ]; then
  echo "[entrypoint] SIMULATOR_URL present; exporting and writing to /app/.env"
  export SIMULATOR_URL
  mkdir -p /app
  printf 'SIMULATOR_URL="%s"\n' "${SIMULATOR_URL}" >> /app/.env
fi

# Se CORS_ALLOWED_ORIGINS for fornecido, escreva-o no .env
if [ -n "${CORS_ALLOWED_ORIGINS}" ]; then
  echo "[entrypoint] CORS_ALLOWED_ORIGINS present; exporting and writing to /app/.env"
  export CORS_ALLOWED_ORIGINS
  mkdir -p /app
  printf 'CORS_ALLOWED_ORIGINS="%s"\n' "${CORS_ALLOWED_ORIGINS}" >> /app/.env
fi

exec "$@"
