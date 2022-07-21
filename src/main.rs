#[macro_use] extern crate rocket;
#[macro_use] extern crate diesel;
extern crate rocket_dyn_templates;
extern crate dotenv;

use rocket_dyn_templates::Template;
use rocket::Config;
use dotenv::dotenv;
use std::env;

#[cfg(test)] mod tests;

mod database;
mod helper;
mod routes;

#[launch]
fn rocket() -> _ {
    dotenv().ok();

    // Use ROCKET_PORT from .env or default to port 8000
    let rocket_port: u16 = match env::var("ROCKET_PORT") {
        Ok(n) => n.parse::<u16>().unwrap(),
        _var_error => 8000
    };

    let config = Config {
        port: rocket_port,
        ..Config::debug_default()
    };

    rocket::custom(config)
        .mount("/", routes![
            routes::get::index,
            routes::get::web,
            routes::get::blog,
            routes::get::create,
            routes::get::update,
            routes::get::delete,
            routes::static_files::files
        ])
        .register("/", catchers![routes::handlers::default_catcher])
        .attach(helper::csp::init())
        .attach(Template::fairing())
}