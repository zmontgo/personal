use rocket_dyn_templates::{Template};
use crate::database;

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
  database::select::select();

  Template::render("pages/blog", ())
}

#[get("/create")]
pub fn create() -> Template {
  database::insert::create_post("Test", "This is an example post.");
  
  Template::render("pages/blog", ())
}

#[get("/update/<id>")]
pub fn update(id: i32) -> Template {
  database::update::update(id);
  
  Template::render("pages/blog", ())
}

#[get("/delete/<id>")]
pub fn delete(id: i32) -> Template {
  database::delete::delete(id);
  
  Template::render("pages/blog", ())
}