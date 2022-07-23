use bcrypt;
use crate::database;
use chrono::Utc;

use sanitize_html::sanitize_str;
use sanitize_html::rules::predefined::DEFAULT;

use mailjet_rs::{Client, SendAPIVersion};
use mailjet_rs::common::Recipient;
use mailjet_rs::v3::Message;

use dotenv::dotenv;
use std::env;

pub fn gen_hash(ip: &str) -> String {
  let hash = match bcrypt::hash(ip, bcrypt::DEFAULT_COST) {
    Ok(s) => s,
    _bcrypt_error => panic!("Error when hashing IP.")
  };

  database::insert::create_hash(&hash);

  hash
}

pub fn test_hash(hash: &str, ip: &str) -> bool {
  let record = database::select::get_hash(&hash);

  if let Some(i) = record {
    let verify = match bcrypt::verify(ip, &i.hash_body) {
      Ok(s) => s,
      _bcrypt_error => panic!("Unexpected error verifying IP hash")
    };

    let naive_date_time = Utc::now().naive_utc();
    let diff = (naive_date_time - i.hash_date).num_seconds();

    if verify && diff >= 0 {
      return true;
    }
  }

  return false;
}

pub fn purge_hash(hash: &str) {
  database::delete::delete_hash(hash);
}

pub async fn send(name: &str, email: &str, subject: &str, body: &str, hash: &str, honeypot: &str, ip: &str) -> bool {
  dotenv().ok();

  if honeypot != "" || !test_hash(hash, ip) {
    return false;
  }

  let sanitized_name: String = sanitize_str(&DEFAULT, name).unwrap();
  let sanitized_email: String = sanitize_str(&DEFAULT, email).unwrap();
  let sanitized_subject: String = sanitize_str(&DEFAULT, subject).unwrap();
  let sanitized_body: String = sanitize_str(&DEFAULT, body).unwrap();

  let mut message = Message::new(
    "mailman@zachmontgomery.com",
    "Mailman",
    Some("New Contact Form Submission".to_string()),
    Some(format!("New message via the contact form at zachmontgomery.com\n\nFrom\n{}\n\nEmail\n{}\n\nSubject\n{}\n\nMessage\n{}\n\nNote: you can respond to this message by replying to this email.", sanitized_name, sanitized_email, sanitized_subject, sanitized_body))
  );

  message.html_part = Some(format!(
    "<style>
      code {{
        font-family: monospace;
        font-size: inherit;
      }}
      
      /* Code in text */
      p > code,
      li > code,
      dd > code,
      td > code {{
        background: #121212;
        color: rgba(255, 255, 255, 87%);
        word-wrap: break-word;
        box-decoration-break: clone;
        padding: .1rem .3rem .2rem;
        border-radius: .2rem;
      }}
    </style>
    <p>New message via the contact form at zachmontgomery.com</p><br><hr><br><p><strong>From</strong><br><code>{}</code></p><p><strong>Email</strong><br><code>{}</code></p><p><strong>Subject</strong><br><code>{}</code></p><p><strong>Message</strong><br><code>{}</code></p><br><hr><br><p>Note: you can respond to this message by replying to this email.", sanitized_name, sanitized_email, sanitized_subject, sanitized_body));

  {
    let public_key = env::var("PUBLIC_KEY").unwrap();
    let private_key = env::var("PRIVATE_KEY").unwrap();

    let client = Client::new(
      SendAPIVersion::V3,
      &public_key,
      &private_key,
    );

    message.push_recipient(Recipient::new("me@zachmontgomery.com"));

    if let Err(e) = client.send(message).await {
      panic!("Error sending email: {:?}", e);
    }
  };

  purge_hash(hash);

  return true;
}

