use bcrypt;
use crate::database;

pub fn gen_hash(ip: &str) -> String {
  let hash = match bcrypt::hash(ip, bcrypt::DEFAULT_COST) {
    Ok(s) => s,
    _bcrypt_error => panic!("Error when hashing IP.")
  };

  database::insert::create_hash(&hash);

  hash
}