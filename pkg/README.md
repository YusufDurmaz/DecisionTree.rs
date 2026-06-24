# DecisionTree.rs 🌳

A lightweight, general-purpose **Decision Tree Classifier & Multi-Language Code Generator** built with **Rust** and featuring a modern web interface.

visualize the tree,This tool allows you to upload any standard JSON dataset, dynamically select input features and target labels, train a decision tree model on the fly,  simulate/test model outputs with real-time speed benchmarking, and export the trained model directly into ready-to-use functions in **JavaScript, Python, Rust, and PHP**.

## 🌟 Key Features

* **High Performance Engine:** Core decision tree learning algorithm implemented in Rust with Gini impurity calculation.
* **Flexible Data Parsing:** Supports standard flat JSON array format as well as complex phpMyAdmin JSON exports.
* **Dynamic Column Selection:** Interactive checkboxes to toggle which columns are used as inputs (`features`) and a dropdown to choose the target classification column (`target`).
* **On-Demand Code Generation:** Instant client-side code generators for multiple languages:
  * **Supported Languages:** JavaScript, Python, Rust, PHP.
  * **Supported Formats:** *Fast (Nested If-Else)* for maximum execution speed, and *Compact (Array/Node Table)* for minimal file size.
* **Interactive Playground Simulator:**
  * Test predictions directly in the browser.
  * Measures model latency by executing the tree traversal 100,000 times to provide sub-microsecond or nanosecond speed benchmarks.
* **Interactive Tree Graph (Zoom & Pan):** Renders beautiful SVG decision tree graphs using Viz.js (Graphviz) with built-in mouse dragging, mouse wheel zoom, and reset controls.
* **Model Evaluation Metrics:** Displays a performance dashboard showing overall Accuracy %, Correct predictions count, and Incorrect count over the training dataset.
* **Clean Modern UI:** Sleek, light-theme minimalist developer tool design built with a slate blue palette.

---

## 🛠️ Technology Stack

* **Backend:** [Rust](https://www.rust-lang.org/) with [Axum](https://github.com/tokio-rs/axum) web framework, [Tokio](https://tokio.rs/) asynchronous runtime, and [Serde](https://serde.rs/) for serialization.
* **Frontend:** HTML5, CSS3, Vanilla JavaScript, and [Viz.js](https://github.com/mdaines/viz.js) for Graphviz rendering.

---

## 📂 Supported JSON Formats

### 1. Standard JSON Array (Recommended)
You can upload any simple array of objects:
```json
[
  {"gender": "M", "height": 180, "weight": 80, "size": "L"},
  {"gender": "F", "height": 160, "weight": 55, "size": "S"}
]
```

### 2. phpMyAdmin JSON Export
Automatically parses phpMyAdmin database export structures.

---

## 🚀 Quick Start

### Prerequisites
Make sure you have [Rust and Cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html) installed.

### 1. Clone & Navigate to the Project
```bash
git clone <your-repo-url>
cd decision_tree
```

### 2. Run the Application
Start the local server:
```bash
cargo run
```

### 3. Open Web Interface
Open your web browser and navigate to:
```
http://localhost:3000
```

---

## 📄 License
This project is open-source and available under the MIT License.
