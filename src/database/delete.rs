use crate::database::connect;

use diesel::prelude::*;

pub fn delete(post_id: i32) {
    use crate::database::schema::posts::dsl::*;

    let connection = connect::establish_connection();
    let num_deleted = diesel::delete(posts.find(post_id))
        .execute(&connection)
        .expect("Error deleting posts");

    println!("Deleted {} posts", num_deleted);
}