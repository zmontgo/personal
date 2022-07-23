use crate::database::connect;
use crate::diesel::prelude::*;

use crate::database::models::Hash;
use crate::database::schema::hashes::dsl::*;

pub fn get_hash(hash: &str) -> Option<Hash> {

  let connection = connect::establish_connection();
  let results = hashes
    .filter(hash_body.eq(hash))
    .load::<Hash>(&connection)
    .expect("Error loading hashes");
  
  if results.len() != 1 {
    return None;
  }

  let result = results.iter().nth(0).cloned();

  return result;
}