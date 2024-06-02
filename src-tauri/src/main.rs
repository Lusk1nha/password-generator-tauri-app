// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rand::Rng;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct Password {
    character_length: i32,
    include_uppercase: bool,
    include_lowercase: bool,
    include_numbers: bool,
    include_symbols: bool,
}

#[tauri::command]
fn generate_password(data: &str) -> String {
    let options: Password = deserialize_options(data);
    return create_password_by_options(options);
}

//// Helper functions
/// Generates a password based on the options provided
fn create_password_by_options(options: Password) -> String {
    let mut password = String::new();
    let mut rng = rand::thread_rng();
    let mut char_set: String = String::new();

    println!("{}", options.character_length);

    if options.include_uppercase {
        char_set.push_str("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    }

    if options.include_lowercase {
        char_set.push_str("abcdefghijklmnopqrstuvwxyz");
    }

    if options.include_numbers {
        char_set.push_str("0123456789");
    }

    if options.include_symbols {
        char_set.push_str("!@#$%^&*()-_=+[]{}|;:,.<>/?");
    }

    for _ in 0..options.character_length {
        let random_index = rng.gen_range(0..char_set.len());
        password.push(char_set.chars().nth(random_index).unwrap());
    }

    return password;
}

/// Deserializes the options provided by the user
fn deserialize_options(data: &str) -> Password {
    serde_json::from_str(data).unwrap()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![generate_password])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
