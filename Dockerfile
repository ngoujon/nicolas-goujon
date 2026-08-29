# Stage 1: Build
FROM node:20-alpine AS builder

# Chromium système pour le pré-rendu (tools/prerender.js) : le Chrome fourni par
# Puppeteer est lié à la glibc et ne fonctionne pas sur Alpine (musl).
ENV PUPPETEER_SKIP_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
RUN apk add --no-cache chromium nss freetype harfbuzz ca-certificates ttf-freefont

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le code source
COPY . .
RUN chmod -R a+rX /app

# Build de l'application React (+ pré-rendu via le script postbuild).
# INLINE_RUNTIME_CHUNK=false : sans cela, CRA peut injecter le runtime webpack
# en script inline, que la CSP (`script-src 'self'`) bloquerait.
ENV INLINE_RUNTIME_CHUNK=false
RUN npm run build

# Stage 2: Production avec nginx
FROM nginx:alpine

# Copier la config nginx personnalisée et le fragment d'en-têtes de sécurité
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx-security-headers.conf /etc/nginx/snippets/security-headers.conf

# Copier les fichiers buildés depuis le stage précédent
COPY --from=builder /app/build /usr/share/nginx/html
RUN chmod -R a+rX /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Surveillance de l'état du conteneur par Docker (utilisé par restart: unless-stopped)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
