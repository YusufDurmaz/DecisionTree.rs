pub mod engine;
pub mod generator;

#[cfg(target_family = "wasm")]
use wasm_bindgen::prelude::*;

#[cfg(target_family = "wasm")]
#[derive(serde::Serialize, serde::Deserialize)]
pub struct WasmResponse {
    pub dot_graph: String,
    pub tree: engine::KararAgaci,
    pub accuracy: f32,
    pub total_samples: usize,
    pub correct_samples: usize,
}

#[cfg(target_family = "wasm")]
#[wasm_bindgen]
pub fn generate_decision_tree(
    js_data: JsValue,
    features: JsValue,
    target_classes: JsValue,
    max_depth: usize,
    min_samples_split: usize,
) -> Result<JsValue, JsValue> {
    // Deserialize JS values to Rust values
    let data: Vec<engine::Veri> = serde_wasm_bindgen::from_value(js_data)
        .map_err(|e| JsValue::from_str(&e.to_string()))?;
    let features: Vec<String> = serde_wasm_bindgen::from_value(features)
        .map_err(|e| JsValue::from_str(&e.to_string()))?;
    let target_classes: Vec<String> = serde_wasm_bindgen::from_value(target_classes)
        .map_err(|e| JsValue::from_str(&e.to_string()))?;

    let num_features = features.len();
    let num_classes = target_classes.len();
    let data_clone = data.clone();

    // Train the decision tree
    let agac = engine::agac_insa_et(
        data,
        0,
        max_depth,
        min_samples_split,
        num_features,
        num_classes,
    );

    // Calculate metrics
    let total_samples = data_clone.len();
    let mut correct_samples = 0;
    for v in &data_clone {
        if agac.tahmin_et(v) == v.target_index {
            correct_samples += 1;
        }
    }
    let accuracy = if total_samples > 0 {
        (correct_samples as f32 / total_samples as f32) * 100.0
    } else {
        0.0
    };

    // Generate Graphviz DOT
    let dot_graph = generator::tree_to_dot(&agac, &features, &target_classes);

    let response = WasmResponse {
        dot_graph,
        tree: agac,
        accuracy,
        total_samples,
        correct_samples,
    };

    // Serialize result back to JS value
    serde_wasm_bindgen::to_value(&response)
        .map_err(|e| JsValue::from_str(&e.to_string()))
}
