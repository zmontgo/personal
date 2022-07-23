use crate::database::connect;
use crate::database::models::Post;
use crate::diesel::prelude::*;

pub fn update(post_id: i32) {
  use crate::database::schema::posts::dsl::{posts, published};

  let connection = connect::establish_connection();

  let post = diesel::update(posts.find(post_id))
    .set(published.eq(true))
    .get_result::<Post>(&connection)
    .expect(&format!("Unable to find post {}", post_id));
  println!("Published post {}", post.title);
}