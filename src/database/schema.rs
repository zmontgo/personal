table! {
    hashes (id) {
        id -> Int4,
        hash_body -> Varchar,
        hash_date -> Timestamp,
    }
}

table! {
    posts (id) {
        id -> Int4,
        title -> Varchar,
        body -> Text,
        pubdate -> Timestamp,
        published -> Bool,
    }
}

allow_tables_to_appear_in_same_query!(
    hashes,
    posts,
);
