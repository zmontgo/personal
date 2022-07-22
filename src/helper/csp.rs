use rocket::http::Header;
use rocket::fairing::AdHoc;

pub fn init() -> AdHoc {
  AdHoc::on_response("CSP", |_req, resp| Box::pin(async move {
    let header_string = vec![
      "img-src 'self' data:",
      "script-src 'self' unpkg.com gdata.youtube.com",
      "style-src 'self' fonts.googleapis.com unpkg.com"
    ];

    let header = Header::new("content-security-policy", header_string.join(";"));
    resp.set_header(header);
  }))
}