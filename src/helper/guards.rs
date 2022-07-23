use rocket::http::Status;
use rocket::request::{self, Outcome, Request, FromRequest};

#[derive(Debug)]
pub struct IpAddr(pub String);

#[rocket::async_trait]
impl<'r> FromRequest<'r> for IpAddr {
  type Error = &'r str;

  async fn from_request(request: &'r Request<'_>) -> request::Outcome<Self, Self::Error> {
    match request.remote() {
      None => Outcome::Failure((Status::BadRequest, "Error obtaining IP address")),
      Some(ip) => Outcome::Success(IpAddr(ip.to_string()))
    }
  }
}