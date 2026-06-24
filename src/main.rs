use axum::{
    response::Html,
    routing::get,
    Router,
};

async fn index() -> Html<&'static str> {
    Html(include_str!("../index.html"))
}

async fn style() -> impl axum::response::IntoResponse {
    (
        [("content-type", "text/css")],
        include_str!("../style.css")
    )
}

async fn app_js() -> impl axum::response::IntoResponse {
    (
        [("content-type", "application/javascript")],
        include_str!("../app.js")
    )
}

async fn pkg_js() -> impl axum::response::IntoResponse {
    (
        [("content-type", "application/javascript")],
        include_str!("../pkg/decision_tree.js")
    )
}

async fn pkg_wasm() -> impl axum::response::IntoResponse {
    (
        [("content-type", "application/wasm")],
        include_bytes!("../pkg/decision_tree_bg.wasm").to_vec()
    )
}

#[tokio::main]
async fn main() {
    println!("Sunucu başlatılıyor: http://localhost:3000");

    let app = Router::new()
        .route("/", get(index))
        .route("/style.css", get(style))
        .route("/app.js", get(app_js))
        .route("/pkg/decision_tree.js", get(pkg_js))
        .route("/pkg/decision_tree_bg.wasm", get(pkg_wasm));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
