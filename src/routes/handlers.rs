use rocket::Request;
use rocket::http::Status;
use rocket_dyn_templates::{Template, context};

#[catch(default)]
pub fn default_catcher(status: Status, request: &Request) -> Template {
  let _guard = sentry::init(("https://527c8a0efe8b4e1fa73806937180638c@o1325451.ingest.sentry.io/6584582", sentry::ClientOptions {
    release: sentry::release_name!(),
    ..Default::default()
  }));

  let code = status.code;
  let error = status.reason();

  if code >= 500 && code < 600 {
    let message = format!("{} error at {} request to {}", code, request.method(), request.uri().path());

    sentry::capture_message(&message, sentry::Level::Error);
  }

  Template::render("errors/default", context! {
    title: "Error | Zachary Montgomery",
    status: code,
    error: error
  })
}