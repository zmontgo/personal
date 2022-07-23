use chrono::NaiveDateTime;
use super::schema::{posts, hashes};

#[derive(Queryable)]
pub struct Post {
  pub id: i32,
  pub title: String,
  pub body: String,
  pub pubdate: NaiveDateTime,
  pub published: bool,
}

#[derive(Insertable)]
#[table_name="posts"]
pub struct NewPost<'a> {
  pub title: &'a str,
  pub body: &'a str,
  pub pubdate: NaiveDateTime,
}

#[derive(Queryable)]
#[derive(Clone)]
pub struct Hash {
  pub id: i32,
  pub hash_body: String,
  pub hash_date: NaiveDateTime,
}

#[derive(Insertable)]
#[table_name="hashes"]
pub struct NewHash<'a> {
  pub hash_body: &'a str,
  pub hash_date: NaiveDateTime,
}