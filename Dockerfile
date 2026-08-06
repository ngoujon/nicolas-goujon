# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le code source
COPY . .
RUN chmod -R a+rX /app

# Clé publique Turnstile (site key) : embarquée dans le bundle React au build
ARG REACT_APP_TURNSTILE_SITE_KEY
ENV REACT_APP_TURNSTILE_SITE_KEY=${REACT_APP_TURNSTILE_SITE_KEY}

# Build de l'application React
RUN npm run build

# Stage 2: Production avec nginx
FROM nginx:alpine

# Copier la config nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers buildés depuis le stage précédent
COPY --from=builder /app/build /usr/share/nginx/html
RUN chmod -R a+rX /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
