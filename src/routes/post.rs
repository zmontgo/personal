use rocket_dyn_templates::Template;
use crate::helper::guards::IpAddr;
use crate::helper::contact;
use rocket::form::Form;

#[derive(FromForm)]
pub struct Contact<'r> {
  name: &'r str,
  email: &'r str,
  fax: &'r str,
  subject: &'r str,
  message: &'r str,
  hash: &'r str,
}

#[post("/web", data = "<contact>")]
pub async fn contact_web(contact: Form<Contact<'_>>, ip: IpAddr) -> Template {
  let ip = ip.0;
  let sent = contact::send(contact.name, contact.email, contact.subject, contact.message, contact.hash, contact.fax, &ip).await;

  if sent {
    return Template::render("pages/success", ());
  } else {
    return Template::render("pages/failure", ());
  }
}