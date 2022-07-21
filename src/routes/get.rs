use rocket_dyn_templates::{Template};

#[get("/")]
pub fn index() -> Template {
  Template::render("pages/index", ())
}

#[get("/web")]
pub fn web() -> Template {
  Template::render("pages/web", ())
}

#[get("/thoughts")]
pub fn blog() -> Template {
  Template::render("pages/blog", ())
}