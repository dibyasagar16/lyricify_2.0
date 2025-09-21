# Dockerfile (Simple PHP + Apache image)
FROM php:8.1-apache

# Installing PHP extensions that might be needed
RUN apt-get update && \
    apt-get install -y libzip-dev unzip libcurl4-openssl-dev && \
    docker-php-ext-install curl zip

# Enable mod_rewrite (common for PHP apps)
RUN a2enmod rewrite

# Copy app files
COPY . /var/www/html

# Change permissions
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80
CMD ["apache2-foreground"]