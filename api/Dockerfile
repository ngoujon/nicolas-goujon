FROM php:8.3-cli-alpine AS builder

RUN apk add --no-cache $PHPIZE_DEPS git unzip libzip-dev libpng-dev oniguruma-dev icu-dev \
    && docker-php-ext-install zip pcntl exif intl opcache \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist

COPY . .
RUN composer dump-autoload --optimize

FROM php:8.3-cli-alpine

RUN apk add --no-cache libzip icu-libs

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
