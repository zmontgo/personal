use crate::database::connect;

use diesel::prelude::*;

pub fn delete_hash(hash: &str) {
    use crate::database::schema::hashes::dsl::*;

    let connection = connect::establish_connection();
    diesel::delete(hashes.filter(hash_body.eq(hash)))
        .execute(&connection)
        .expect("Error deleting hash");
}