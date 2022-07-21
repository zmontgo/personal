use chrono::NaiveDateTime;

#[derive(Queryable)]
pub struct Post {
  pub id: i32,
  pub title: String,
  pub body: String,
  pub pubdate: NaiveDateTime,
  pub published: bool,
}

use super::schema::posts;

#[derive(Insertable)]
#[table_name="posts"]
pub struct NewPost<'a> {
  pub title: &'a str,
  pub body: &'a str,
  pub pubdate: NaiveDateTime,
}