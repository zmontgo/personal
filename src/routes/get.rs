use rocket_dyn_templates::{Template, context};
use crate::helper::guards::IpAddr;
use crate::helper::contact;

#[get("/")]
pub fn index() -> Template {
  Template::render("pages/index", ())
}

#[get("/web")]
pub fn web(ip: IpAddr) -> Template {
  let ip = ip.0;
  let hash = contact::gen_hash(&ip);

  Template::render("pages/web", context! {
    hash: hash
  })
}

#[get("/thoughts")]
pub fn blog() -> Template {
  Template::render("pages/blog", ())
}