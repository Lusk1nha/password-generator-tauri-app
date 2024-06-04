// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod password;

#[tauri::command]
fn generate_password(data: &str) -> String {
    let options = password::deserialize_options(data);
    return password::create_password_by_options(options);
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![generate_password])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
