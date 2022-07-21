use rocket::fs::NamedFile;
use rocket::response;
use rocket::response::Responder;
use rocket::Request;
use rocket::response::Response;
use std::path::PathBuf;
use std::path::Path;

pub struct CachedFile(NamedFile);

impl<'r> Responder<'r, 'r> for CachedFile {
  fn respond_to(self, req: &Request) -> response::Result<'r> {
    Response::build_from(self.0.respond_to(req)?)
      .raw_header("Cache-control", "max-age=86400") //  24h (24*60*60)
      .ok()
  }
}

#[get("/<file..>")]
pub async fn files(file: PathBuf) -> Option<CachedFile> {
  NamedFile::open(Path::new("static/").join(file)).await.ok().map(|nf| CachedFile(nf))
}