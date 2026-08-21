FROM php:8.4-cli-alpine AS builder

RUN apk add --no-cache $PHPIZE_DEPS git unzip libzip-dev libpng-dev oniguruma-dev icu-dev \
    && docker-php-ext-install zip pcntl exif intl opcache \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist

COPY . .
RUN chmod -R a+rX /app
RUN composer dump-autoload --optimize

FROM php:8.4-cli-alpine

RUN apk add --no-cache libzip icu-libs

WORKDIR /app

COPY --from=builder /app /app
RUN chmod -R a+rX /app

EXPOSE 8000

# Surveillance de l'état du conteneur par Docker (utilisé par restart: unless-stopped)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost:8000/up || exit 1

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
