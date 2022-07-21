use crate::database::connect;
use crate::database::models::Post;
use crate::database::schema::posts::dsl::*;
use crate::diesel::prelude::*;

pub fn select() {

  let connection = connect::establish_connection();
  let results = posts
    .limit(5)
    .load::<Post>(&connection)
    .expect("Error loading posts");

  println!("Displaying {} posts", results.len());
  for post in results {
    println!("{}", post.id);
    println!("----------\n");
    println!("{}", post.title);
    println!("----------\n");
    println!("{}", post.body);
  }
}