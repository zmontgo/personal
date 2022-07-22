use crate::database::models::{Post, NewPost, Hash, NewHash};
use crate::database::connect;
use crate::diesel::RunQueryDsl;
use chrono::Utc;

pub fn create_post<'a>(title: &'a str, body: &'a str) -> Post {
  let conn = connect::establish_connection();
  
  use super::schema::posts;

  let naive_date_time = Utc::now().naive_utc();

  let new_post = NewPost {
    title: title,
    body: body,
    pubdate: naive_date_time
  };

  diesel::insert_into(posts::table)
    .values(&new_post)
    .get_result(&conn)
    .expect("Error saving new post")
}

pub fn create_hash<'a>(hash: &'a str) -> Hash {
  let conn = connect::establish_connection();
  
  use super::schema::hashes;

  let naive_date_time = Utc::now().naive_utc();

  let new_hash = NewHash {
    hash_body: hash,
    hash_date: naive_date_time
  };

  diesel::insert_into(hashes::table)
    .values(&new_hash)
    .get_result(&conn)
    .expect("Error saving new hash")
}