# Version épinglée : 8.4.27 corrige php2shell (CVE-2026-109618 / CVE-2026-109619).
FROM php:8.4.27-cli-alpine AS builder

RUN apk add --no-cache $PHPIZE_DEPS git unzip libzip-dev libpng-dev oniguruma-dev icu-dev \
    && docker-php-ext-install zip pcntl exif intl opcache \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist

COPY . .
RUN chmod -R a+rX /app
RUN composer dump-autoload --optimize

FROM php:8.4.27-cli-alpine

RUN apk add --no-cache libzip icu-libs

# Mitigation php2shell : la progression d'upload en session est le vecteur connu.
RUN echo "session.upload_progress.enabled=Off" > /usr/local/etc/php/conf.d/zz-php2shell.ini

WORKDIR /app

COPY --from=builder /app /app
RUN chmod -R a+rX /app

EXPOSE 8000

# Surveillance de l'état du conteneur par Docker (utilisé par restart: unless-stopped)
HEALTHCHECK --interval=30s --timeout=3s --start-period=20s --retries=3 \
    CMD wget -q --spider http://127.0.0.1:8000/up || exit 1

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
