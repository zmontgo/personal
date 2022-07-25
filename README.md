# Personal Website

## Requirements
- Rust nightly build
- Diesel CLI
  - Ensure you have the `libpq` package installed on your machine. `libpq-dev` on Ubuntu and `libpq-devel` on Fedora.
  - `cargo install diesel_cli --no-default-features --features postgres`
- (OpenSSL)[https://docs.rs/openssl/latest/openssl/#vendored]
- (Sass)[https://sass-lang.com/install]

## Diesel
Migrations: `diesel migration run --database-url="DATABASE_URL"`

## SCSS
Run `sass ./static/sass/style.scss ./static/css/style.css --watch --style="compressed"` to watch for changes.

## Production
Run `rustup run nightly cargo build --release`