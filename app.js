import init, { generate_decision_tree } from './pkg/decision_tree.js';

// Initialize WASM module immediately
await init();

const locales = {
    en: {
        subtitle: "General Purpose Decision Tree & Code Generator",
        configTitle: "Configuration",
        datasetLabel: "Dataset (JSON)",
        targetLabel: "Target Column (To Predict)",
        uploadFirst: "Upload a file first...",
        inputsLabel: "Input Columns (Features)",
        selectAll: "Select All",
        clearAll: "Clear All",
        learningLabel: "Learning Intensity / Detail (%)",
        p70: "70% (Simple / Fast Tree)",
        p80: "80% (Standard Decision Tree)",
        p90: "90% (Advanced / Detailed Tree)",
        p95: "95% (Highly Detailed Tree)",
        p100: "100% (Overfit / Maximum Fit)",
        custom: "Custom (Advanced Settings)",
        advancedHeader: "Advanced Hyperparameters",
        maxDepthLabel: "Maximum Depth",
        minSamplesLabel: "Min. Samples for Split",
        generateBtn: "Generate Tree",
        resultsTitle: "Results",
        accuracyLabel: "Accuracy Rate",
        correctLabel: "Correct Predictions",
        incorrectLabel: "Incorrect Predictions",
        tabGraph: "Visual (Graphviz)",
        tabCodegen: "Code Generator",
        tabPlayground: "Model Test Playground",
        tabGames: "Mini Games",
        tabEditor: "Dataset Editor",
        editorTip: "Tip: Double-click any cell to edit its value directly. Press Enter or click outside to save. Row indices are automatically updated.",
        graphTip: "Tip: Drag to pan, scroll mouse wheel to zoom.",
        graphPlaceholder: "Welcome to DecisionTree.rs! This tool is an interactive web-based utility for training, analyzing, and exporting Decision Tree classifiers. You can upload a dataset (JSON), customize training hyperparameters, visually explore the resulting tree model with pan & zoom capabilities, benchmark prediction latency, and generate native code in 10 different programming languages. Designed for developers and data engineers.",
        targetLang: "Target Language",
        formatLabel: "Format",
        formatFast: "Fast (If-Else)",
        formatCompact: "Compact (Array/Struct)",
        btnGenerateCode: "Generate Code",
        codePlaceholder: "Select a language above and click \"Generate Code\" to build...",
        pgHeader: "Interactive Prediction & Performance Test",
        pgSub: "Enter input values to test the model in real-time and measure execution speed.",
        pgPlaceholder: "Please generate the tree first to test the model.",
        btnTestPredict: "Predict & Benchmark Speed",
        testResLabel: "Prediction Result",
        testPredictedSub: "Predicted Class",
        testSpeedSub: "Avg. Execution Time (100k tests)",
        selectGame: "Select Game",
        copied: "Copied to clipboard!",
        snakeTip: "Tip: Use Arrow keys or WASD to guide the snake.",

        // Dynamic logs
        converting: "Converting data...",
        compiling: "Compiling tree (Waiting for backend)...",
        success: "Successfully generated!",
        rowsLoaded: "{count} rows loaded successfully.",
        errorPrefix: "Error: ",
        graphError: "An error occurred while generating the graph.",
        selectAtLeastOne: "Please select at least one input column.",
        uploadAndGenFirst: "Please upload a dataset and generate the tree first.",
        encodingComment: "// Data Transformation (Encoding) Dictionaries:\n"
    },
    tr: {
        subtitle: "Genel Amaçlı Karar Ağacı ve Kod Üretici",
        configTitle: "Yapılandırma",
        datasetLabel: "Veri Seti (JSON)",
        targetLabel: "Hedef Sütun (Tahmin Edilecek)",
        uploadFirst: "Önce dosya yükleyin...",
        inputsLabel: "Girdi Sütunları (Özellikler)",
        selectAll: "Hepsini Seç",
        clearAll: "Hiçbirini Seçme",
        learningLabel: "Öğrenme Yoğunluğu / Detayı (%)",
        p70: "%70 (Hızlı / Basit Ağaç)",
        p80: "%80 (Standart Karar Ağacı)",
        p90: "%90 (Gelişmiş / Detaylı Ağaç)",
        p95: "%95 (Çok Detaylı Ağaç)",
        p100: "%100 (Ezberleme / Maksimum Uyum)",
        custom: "Özel (Gelişmiş Ayarlar)",
        advancedHeader: "Gelişmiş Hiperparametreler",
        maxDepthLabel: "Maksimum Derinlik",
        minSamplesLabel: "Bölünme İçin Min. Örnek",
        generateBtn: "Ağacı Oluştur",
        resultsTitle: "Sonuçlar",
        accuracyLabel: "Doğruluk Oranı",
        correctLabel: "Doğru Tahmin",
        incorrectLabel: "Hatalı Tahmin",
        tabGraph: "Görsel (Graphviz)",
        tabCodegen: "Kod Üretici",
        tabPlayground: "Model Test Alanı",
        tabGames: "Mini Oyunlar",
        tabEditor: "Veri Seti Editörü",
        editorTip: "İpucu: Herhangi bir hücreye tıklayarak değerini doğrudan düzenleyebilirsiniz. Kaydetmek için Enter'a basın veya dışarı tıklayın.",
        graphTip: "İpucu: Sürükleyerek kaydırabilir, fare tekerleğiyle yakınlaştırabilirsiniz.",
        graphPlaceholder: "DecisionTree.rs'a hoş geldiniz! Bu araç, Karar Ağacı sınıflandırıcılarını eğitmek, analiz etmek ve dışa aktarmak için geliştirilmiş etkileşimli bir web uygulamasıdır. JSON formatındaki veri setinizi yükleyebilir, hiperparametreleri özelleştirebilir, oluşan karar ağacını kaydırma ve yakınlaştırma özellikleriyle görsel olarak inceleyebilir, tahmin gecikmesini test edebilir ve 10 farklı yazılım dilinde yerel kod üretebilirsiniz. Geliştiriciler ve veri mühendisleri için tasarlanmıştır.",
        targetLang: "Hedef Dil",
        formatLabel: "Format",
        formatFast: "Hızlı (If-Else)",
        formatCompact: "Kompakt (Array/Struct)",
        btnGenerateCode: "Kod Üret",
        codePlaceholder: "Kod üretmek için yukarıdan dil seçip \"Kod Üret\" butonuna basın...",
        pgHeader: "İnteraktif Tahmin & Performans Testi",
        pgSub: "Girdi değerlerini girerek modeli anlık olarak test edin ve çalışma hızını ölçün.",
        pgPlaceholder: "Model test etmek için önce ağacı oluşturun.",
        btnTestPredict: "Tahmin Et ve Süre Ölç",
        testResLabel: "Tahmin Sonucu",
        testPredictedSub: "Tahmin Edilen Sınıf",
        testSpeedSub: "Ort. Yürütme Süresi (100k test)",
        selectGame: "Oyun Seçin",
        copied: "Panoya kopyalandı!",
        snakeTip: "İpucu: Yön tuşlarını veya WASD tuşlarını kullanarak yılanı kontrol edin.",

        // Dynamic logs
        converting: "Veriler dönüştürülüyor...",
        compiling: "Ağaç derleniyor (Backend bekleniyor)...",
        success: "Başarıyla oluşturuldu!",
        rowsLoaded: "{count} satır başarıyla yüklendi.",
        errorPrefix: "Hata: ",
        graphError: "Grafik oluşturulurken hata oluştu.",
        selectAtLeastOne: "Lütfen en az bir girdi sütunu seçin.",
        uploadAndGenFirst: "Lütfen önce veri setini yükleyip ağacı oluşturun.",
        encodingComment: "// Veri Dönüşüm (Encoding) Sözlükleri:\n"
    }
};

let currentLang = 'en';

function setLanguage(lang) {
    currentLang = lang;
    const dict = locales[lang];

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            el.textContent = dict[key];
        }
    });

    // Specific updates that are dynamic or have complex structure
    const placeholderTarget = document.getElementById('targetCol');
    if (placeholderTarget && placeholderTarget.disabled && placeholderTarget.options.length === 1) {
        placeholderTarget.options[0].textContent = dict.uploadFirst;
    }

    const featurePlaceholder = document.getElementById('featureColsList');
    if (featurePlaceholder && featurePlaceholder.children.length === 1 && featurePlaceholder.children[0].tagName === 'SPAN') {
        featurePlaceholder.children[0].textContent = dict.uploadFirst;
    }

    const pgPlaceholder = document.getElementById('playgroundForm');
    if (pgPlaceholder && pgPlaceholder.children.length === 1 && pgPlaceholder.children[0].classList.contains('placeholder-msg')) {
        pgPlaceholder.children[0].textContent = dict.pgPlaceholder;
    }

    const graphPlaceholder = document.getElementById('graph-placeholder');
    if (graphPlaceholder) {
        graphPlaceholder.textContent = dict.graphPlaceholder;
    }

    const codeCode = document.getElementById('generatedCode');
    if (codeCode && codeCode.textContent.trim().startsWith('//') && !currentTree) {
        codeCode.textContent = dict.codePlaceholder;
    }

    // Toggle Flag SVGs
    document.getElementById('flag-en').style.display = lang === 'en' ? 'block' : 'none';
    document.getElementById('flag-tr').style.display = lang === 'tr' ? 'block' : 'none';

    // Dataset Editor Dynamic Language Updates
    const editorSearch = document.getElementById('editorSearch');
    if (editorSearch) {
        editorSearch.placeholder = lang === 'en' ? "Search rows..." : "Satırlarda ara...";
    }
    const editorAddRowBtn = document.getElementById('editorAddRowBtn');
    if (editorAddRowBtn) {
        editorAddRowBtn.textContent = lang === 'en' ? "+ Add Row" : "+ Satır Ekle";
    }
    const editorResetBtn = document.getElementById('editorResetBtn');
    if (editorResetBtn) {
        editorResetBtn.textContent = lang === 'en' ? "Reset Data" : "Veriyi Sıfırla";
    }
    if (typeof renderEditorTable === 'function') {
        renderEditorTable();
    }
}

// Bind language select
document.getElementById('langSelect').addEventListener('change', (e) => {
    setLanguage(e.target.value);
});

let rawData = [];
let columns = [];
let originalDataBackup = [];
let editorPage = 1;
const editorPageSize = 50;

// Loaded Model State
let currentTree = null;
let currentFeatureCols = [];
let currentTargetClasses = [];
let currentEncoders = {};

// Zoom/Pan State
let zoomScale = 1;
let panX = 0;
let panY = 0;
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let activeSvg = null;

const fileInput = document.getElementById('dataFile');
const targetSelect = document.getElementById('targetCol');
const featureColsList = document.getElementById('featureColsList');
const generateBtn = document.getElementById('generateBtn');
const statusMsg = document.getElementById('statusMsg');
const learningPreset = document.getElementById('learningPreset');
const maxDepthInput = document.getElementById('maxDepth');
const minSamplesInput = document.getElementById('minSamples');
const advancedSettings = document.getElementById('advancedSettings');
const graphContainer = document.getElementById('graph-container');

const presets = {
    "70": { maxDepth: 4, minSamples: 10 },
    "80": { maxDepth: 6, minSamples: 5 },
    "90": { maxDepth: 12, minSamples: 3 },
    "95": { maxDepth: 20, minSamples: 2 },
    "100": { maxDepth: 999, minSamples: 2 }
};

// Tab Switching
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        const content = document.getElementById(tab.dataset.target);
        if (content) {
            content.classList.add('active');
        }
    });
});

// Preset selection change listener
learningPreset.addEventListener('change', () => {
    const val = learningPreset.value;
    if (val in presets) {
        maxDepthInput.value = presets[val].maxDepth;
        minSamplesInput.value = presets[val].minSamples;
    } else if (val === 'custom') {
        advancedSettings.open = true;
    }
});

// Mark preset dropdown as custom if values are edited manually
const markPresetAsCustom = () => {
    learningPreset.value = 'custom';
};
maxDepthInput.addEventListener('input', markPresetAsCustom);
minSamplesInput.addEventListener('input', markPresetAsCustom);

// Target Selection Change Listener
targetSelect.addEventListener('change', () => {
    const targetVal = targetSelect.value;
    columns.forEach(col => {
        const cb = document.getElementById(`cb-feat-${col}`);
        const item = document.getElementById(`item-feat-${col}`);
        if (cb && item) {
            if (col === targetVal) {
                cb.checked = false;
                cb.disabled = true;
                item.classList.add('disabled');
            } else {
                if (cb.disabled) {
                    cb.checked = true;
                    cb.disabled = false;
                    item.classList.remove('disabled');
                }
            }
        }
    });
});

// Bulk selection links
document.getElementById('selectAllFeatures').addEventListener('click', () => {
    const targetVal = targetSelect.value;
    columns.forEach(col => {
        if (col !== targetVal) {
            const cb = document.getElementById(`cb-feat-${col}`);
            if (cb) cb.checked = true;
        }
    });
});

document.getElementById('selectNoneFeatures').addEventListener('click', () => {
    columns.forEach(col => {
        const cb = document.getElementById(`cb-feat-${col}`);
        if (cb) cb.checked = false;
    });
});

// File Input Handling
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
        try {
            const json = JSON.parse(evt.target.result);
            if (Array.isArray(json) && json.length > 0 && json[0].type === "header") {
                let found = false;
                for (let item of json) {
                    if (item.type === "table" && Array.isArray(item.data)) {
                        rawData = item.data;
                        found = true;
                        break;
                    }
                }
                if (!found) throw new Error("PhpMyAdmin JSON formatında 'data' dizisi bulunamadı.");
            } else if (Array.isArray(json)) {
                rawData = json;
            } else {
                throw new Error("Geçersiz JSON formatı. Bir dizi nesnesi (Array of Objects) bekleniyor.");
            }

            if (rawData.length === 0) throw new Error("Veri seti boş.");

            // Sütunları çıkar
            columns = Object.keys(rawData[0]);

            // Target Dropdown Doldur
            targetSelect.innerHTML = '';
            columns.forEach(col => {
                const opt = document.createElement('option');
                opt.value = col;
                opt.textContent = col;
                targetSelect.appendChild(opt);
            });

            // Feature Checkbox Group Doldur
            featureColsList.innerHTML = '';
            columns.forEach(col => {
                const item = document.createElement('label');
                item.className = 'checkbox-item';
                item.id = `item-feat-${col}`;

                const cb = document.createElement('input');
                cb.type = 'checkbox';
                cb.value = col;
                cb.checked = true;
                cb.id = `cb-feat-${col}`;

                const text = document.createElement('span');
                text.textContent = col;

                item.appendChild(cb);
                item.appendChild(text);
                featureColsList.appendChild(item);
            });

            targetSelect.disabled = false;
            generateBtn.disabled = false;

            // Akıllı seçim: eğer sütunlardan birinin adı 'beden', 'size', 'class', 'target' ise onu seç
            const autoTarget = columns.find(c => ['beden', 'size', 'class', 'target', 'label'].includes(c.toLowerCase()));
            if (autoTarget) {
                targetSelect.value = autoTarget;
            }

            // Seçilen hedef sütunu pasifize et
            targetSelect.dispatchEvent(new Event('change'));

            statusMsg.textContent = locales[currentLang].rowsLoaded.replace('{count}', rawData.length);
            statusMsg.style.color = "var(--success-color)";

            // Reset model states
            currentTree = null;
            populatePlaygroundForm();

            // Backup loaded data and render the table editor
            originalDataBackup = JSON.parse(JSON.stringify(rawData));
            editorPage = 1;
            renderEditorTable();

            // Auto-switch to Dataset Editor tab
            const editorTab = document.querySelector('.tab[data-target="tab-editor"]');
            if (editorTab) {
                editorTab.click();
            }
        } catch (err) {
            console.error(err);
            statusMsg.textContent = locales[currentLang].errorPrefix + err.message;
            statusMsg.style.color = "var(--danger-color)";
            targetSelect.disabled = true;
            generateBtn.disabled = true;
            featureColsList.innerHTML = `<span style="color: var(--text-secondary); font-size: 0.875rem; padding: 0.5rem; display: block;">${locales[currentLang].uploadFirst}</span>`;
        }
    };
    reader.readAsText(file);
});

// Zoom/Pan Functions
function applyZoomPan() {
    if (!activeSvg) return;
    activeSvg.style.transform = `translate(${panX}px, ${panY}px) scale(${zoomScale})`;
}

function resetZoomPan() {
    zoomScale = 1;
    panX = 0;
    panY = 0;
    applyZoomPan();
}

graphContainer.addEventListener('mousedown', (e) => {
    if (!activeSvg) return;
    isDragging = true;
    dragStartX = e.clientX - panX;
    dragStartY = e.clientY - panY;
    graphContainer.style.cursor = 'grabbing';
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging || !activeSvg) return;
    panX = e.clientX - dragStartX;
    panY = e.clientY - dragStartY;
    applyZoomPan();
});

window.addEventListener('mouseup', () => {
    isDragging = false;
    graphContainer.style.cursor = activeSvg ? 'grab' : 'default';
});

graphContainer.addEventListener('wheel', (e) => {
    if (!activeSvg) return;
    e.preventDefault();

    const rect = graphContainer.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    const zoomFactor = 1.1;
    const oldScale = zoomScale;

    if (e.deltaY < 0) {
        zoomScale *= zoomFactor;
    } else {
        zoomScale /= zoomFactor;
    }

    zoomScale = Math.min(Math.max(0.1, zoomScale), 8);

    panX = mouseX - (mouseX - panX) * (zoomScale / oldScale);
    panY = mouseY - (mouseY - panY) * (zoomScale / oldScale);

    applyZoomPan();
});

document.getElementById('zoomIn').addEventListener('click', () => {
    if (!activeSvg) return;
    zoomScale *= 1.2;
    zoomScale = Math.min(zoomScale, 8);
    applyZoomPan();
});

document.getElementById('zoomOut').addEventListener('click', () => {
    if (!activeSvg) return;
    zoomScale /= 1.2;
    zoomScale = Math.max(zoomScale, 0.1);
    applyZoomPan();
});

document.getElementById('zoomReset').addEventListener('click', () => {
    resetZoomPan();
});

// Code generators on the frontend
function generateCode(tree, language, format, featureCols, targetClasses, encoders) {
    let encodingHeader = "";
    let hasEncoding = false;
    let encoderText = "";
    featureCols.forEach(col => {
        const map = encoders[col]?.map;
        if (map && Object.keys(map).length > 0) {
            hasEncoding = true;
            if (language === 'javascript') {
                encoderText += `const ${col}_MAP = ${JSON.stringify(map)};\n`;
            } else if (language === 'typescript') {
                encoderText += `const ${col}_MAP: Record<string, number> = ${JSON.stringify(map)};\n`;
            } else if (language === 'python') {
                encoderText += `${col}_MAP = ${JSON.stringify(map)}\n`;
            } else if (language === 'php') {
                encoderText += `$${col}_MAP = ${JSON.stringify(map)};\n`;
            } else if (language === 'ruby') {
                encoderText += `${col.toUpperCase()}_MAP = ${JSON.stringify(map)}\n`;
            } else if (language === 'go') {
                let goMap = `var ${col}_MAP = map[string]float64{\n`;
                Object.keys(map).forEach(key => {
                    goMap += `    "${key}": ${map[key]},\n`;
                });
                goMap += `}\n`;
                encoderText += goMap;
            } else if (language === 'cpp') {
                let cppMap = `const std::unordered_map<std::string, double> ${col}_MAP = {\n`;
                Object.keys(map).forEach(key => {
                    cppMap += `    {"${key}", ${map[key]}},\n`;
                });
                cppMap += `};\n`;
                encoderText += cppMap;
            } else if (language === 'csharp') {
                let csMap = `private static readonly System.Collections.Generic.Dictionary<string, double> ${col}_MAP = new System.Collections.Generic.Dictionary<string, double> {\n`;
                Object.keys(map).forEach(key => {
                    csMap += `    { "${key}", ${map[key]} },\n`;
                });
                csMap += `};\n`;
                encoderText += csMap;
            } else if (language === 'java') {
                let javaMap = `private static final java.util.Map<String, Double> ${col}_MAP = new java.util.HashMap<>() {{\n`;
                Object.keys(map).forEach(key => {
                    javaMap += `        put("${key}", ${map[key]}.0);\n`;
                });
                javaMap += `    }};\n`;
                encoderText += javaMap;
            }
        }
    });
    if (hasEncoding) {
        encodingHeader = `${locales[currentLang].encodingComment}${encoderText}\n`;
    }

    if (format === 'compact') {
        return encodingHeader + generateCompactCode(tree, language, featureCols, targetClasses);
    } else {
        return encodingHeader + generateFastCode(tree, language, featureCols, targetClasses);
    }
}

function generateFastCode(tree, language, featureCols, targetClasses) {
    const body = translateIfElse(tree, language, targetClasses, featureCols, 4);
    const args = featureCols.join(", ");

    if (language === 'javascript') {
        return `function tahminEt(${args}) {\n${body}}`;
    } else if (language === 'typescript') {
        const tsArgs = featureCols.map(f => `${f}: number`).join(", ");
        return `function tahminEt(${tsArgs}): string {\n${body}}`;
    } else if (language === 'python') {
        return `def tahmin_et(${args}):\n${body}`;
    } else if (language === 'php') {
        const phpArgs = featureCols.map(f => `$${f}`).join(", ");
        return `function tahminEt(${phpArgs}) {\n${body}}`;
    } else if (language === 'ruby') {
        return `def tahmin_et(${args})\n${body}end`;
    } else if (language === 'go') {
        const goArgs = featureCols.map(f => `${f} float64`).join(", ");
        return `func TahminEt(${goArgs}) string {\n${body}}`;
    } else if (language === 'rust') {
        return `fn tahmin_et(girdiler: &[f32]) -> &'static str {\n${body}}`;
    } else if (language === 'cpp') {
        const cppArgs = featureCols.map(f => `double ${f}`).join(", ");
        return `#include <string>\n\nstd::string tahmin_et(${cppArgs}) {\n${body}}`;
    } else if (language === 'csharp') {
        const csArgs = featureCols.map(f => `double ${f}`).join(", ");
        let code = `public class DecisionTree {\n`;
        code += `    public static string TahminEt(${csArgs}) {\n`;
        code += body.split('\n').map(line => line ? '    ' + line : '').join('\n');
        code += `    }\n}`;
        return code;
    } else if (language === 'java') {
        const javaArgs = featureCols.map(f => `double ${f}`).join(", ");
        let code = `public class DecisionTree {\n`;
        code += `    public static String tahminEt(${javaArgs}) {\n`;
        code += body.split('\n').map(line => line ? '    ' + line : '').join('\n');
        code += `    }\n}`;
        return code;
    }
    return "";
}

function translateIfElse(node, language, targetClasses, featureCols, girinti = 4) {
    const space = " ".repeat(girinti);
    if (node.Yaprak) {
        const val = targetClasses[node.Yaprak.target_index] || "Unknown";
        if (language === 'python') {
            return `${space}return "${val}"\n`;
        } else if (language === 'ruby') {
            return `${space}"${val}"\n`;
        } else {
            return `${space}return "${val}";\n`;
        }
    } else if (node.Dal) {
        const d = node.Dal;
        const feat = featureCols[d.ozellik_indeksi] || "feat";
        const threshold = d.esik_degeri.toFixed(2);

        let code = "";
        if (language === 'javascript' || language === 'typescript' || language === 'java' || language === 'csharp' || language === 'cpp') {
            code += `${space}if (${feat} <= ${threshold}) {\n`;
            code += translateIfElse(d.sol, language, targetClasses, featureCols, girinti + 4);
            code += `${space}} else {\n`;
            code += translateIfElse(d.sag, language, targetClasses, featureCols, girinti + 4);
            code += `${space}}\n`;
        } else if (language === 'python') {
            code += `${space}if ${feat} <= ${threshold}:\n`;
            code += translateIfElse(d.sol, language, targetClasses, featureCols, girinti + 4);
            code += `${space}else:\n`;
            code += translateIfElse(d.sag, language, targetClasses, featureCols, girinti + 4);
        } else if (language === 'php') {
            code += `${space}if ($${feat} <= ${threshold}) {\n`;
            code += translateIfElse(d.sol, language, targetClasses, featureCols, girinti + 4);
            code += `${space}} else {\n`;
            code += translateIfElse(d.sag, language, targetClasses, featureCols, girinti + 4);
            code += `${space}}\n`;
        } else if (language === 'ruby') {
            code += `${space}if ${feat} <= ${threshold}\n`;
            code += translateIfElse(d.sol, language, targetClasses, featureCols, girinti + 4);
            code += `${space}else\n`;
            code += translateIfElse(d.sag, language, targetClasses, featureCols, girinti + 4);
            code += `${space}end\n`;
        } else if (language === 'go') {
            code += `${space}if ${feat} <= ${threshold} {\n`;
            code += translateIfElse(d.sol, language, targetClasses, featureCols, girinti + 4);
            code += `${space}} else {\n`;
            code += translateIfElse(d.sag, language, targetClasses, featureCols, girinti + 4);
            code += `${space}}\n`;
        } else if (language === 'rust') {
            code += `${space}if girdiler[${d.ozellik_indeksi}] <= ${threshold} {\n`;
            code += translateIfElse(d.sol, language, targetClasses, featureCols, girinti + 4);
            code += `${space}} else {\n`;
            code += translateIfElse(d.sag, language, targetClasses, featureCols, girinti + 4);
            code += `${space}}\n`;
        }
        return code;
    }
    return "";
}

function generateCompactCode(tree, language, featureCols, targetClasses) {
    if (language === 'rust') {
        return generateRustCompact(tree, targetClasses);
    }
    if (language === 'cpp') {
        return generateCppCompact(tree, targetClasses);
    }
    if (language === 'go') {
        return generateGoCompact(tree, targetClasses);
    }
    if (language === 'java') {
        return generateJavaCompact(tree, targetClasses);
    }
    if (language === 'csharp') {
        return generateCsharpCompact(tree, targetClasses);
    }

    const modelStr = treeToCompactArrayString(tree, targetClasses);
    const args = featureCols.join(", ");

    if (language === 'javascript') {
        let code = `const AGAC_MODELI = ${modelStr};\n\n`;
        code += `function tahminEt(${args}) {\n`;
        code += `    const girdiler = [${args}];\n`;
        code += `    let d = AGAC_MODELI;\n`;
        code += `    while (Array.isArray(d)) d = girdiler[d[0]] <= d[1] ? d[2] : d[3];\n`;
        code += `    return d;\n`;
        code += `}`;
        return code;
    } else if (language === 'typescript') {
        let code = `type Node = [number, number, Node | string, Node | string] | string;\n`;
        code += `const AGAC_MODELI: Node = ${modelStr};\n\n`;
        const tsArgs = featureCols.map(f => `${f}: number`).join(", ");
        code += `function tahminEt(${tsArgs}): string {\n`;
        code += `    const girdiler = [${args}];\n`;
        code += `    let d: Node = AGAC_MODELI;\n`;
        code += `    while (Array.isArray(d)) d = girdiler[d[0]] <= d[1] ? d[2] as Node : d[3] as Node;\n`;
        code += `    return d;\n`;
        code += `}`;
        return code;
    } else if (language === 'python') {
        let code = `AGAC_MODELI = ${modelStr}\n\n`;
        code += `def tahmin_et(${args}):\n`;
        code += `    girdiler = [${args}]\n`;
        code += `    d = AGAC_MODELI\n`;
        code += `    while isinstance(d, list):\n`;
        code += `        d = d[2] if girdiler[d[0]] <= d[1] else d[3]\n`;
        code += `    return d`;
        return code;
    } else if (language === 'php') {
        let code = `$AGAC_MODELI = ${modelStr};\n\n`;
        const phpArgs = featureCols.map(f => `$${f}`).join(", ");
        code += `function tahminEt(${phpArgs}) {\n`;
        code += `    global $AGAC_MODELI;\n`;
        code += `    $girdiler = [${phpArgs}];\n`;
        code += `    $d = $AGAC_MODELI;\n`;
        code += `    while (is_array($d)) {\n`;
        code += `        $d = $girdiler[$d[0]] <= $d[1] ? $d[2] : $d[3];\n`;
        code += `    }\n`;
        code += `    return $d;\n`;
        code += `}`;
        return code;
    } else if (language === 'ruby') {
        let code = `AGAC_MODELI = ${modelStr}\n\n`;
        code += `def tahmin_et(${args})\n`;
        code += `    girdiler = [${args}]\n`;
        code += `    d = AGAC_MODELI\n`;
        code += `    while d.is_a?(Array)\n`;
        code += `        d = girdiler[d[0]] <= d[1] ? d[2] : d[3]\n`;
        code += `    end\n`;
        code += `    d\n`;
        code += `end`;
        return code;
    }
    return "";
}

function treeToCompactArrayString(node, targetClasses) {
    if (node.Yaprak) {
        const val = targetClasses[node.Yaprak.target_index] || "Unknown";
        return `"${val}"`;
    } else if (node.Dal) {
        const d = node.Dal;
        const solStr = treeToCompactArrayString(d.sol, targetClasses);
        const sagStr = treeToCompactArrayString(d.sag, targetClasses);
        return `[${d.ozellik_indeksi}, ${d.esik_degeri.toFixed(2)}, ${solStr}, ${sagStr}]`;
    }
    return "";
}

function generateRustCompact(tree, targetClasses) {
    const nodes = [];
    function traverse(node) {
        const index = nodes.length;
        nodes.push(null);
        if (node.Yaprak) {
            const val = targetClasses[node.Yaprak.target_index] || "Unknown";
            nodes[index] = `Node::Yaprak { sinif: "${val}" }`;
        } else if (node.Dal) {
            const d = node.Dal;
            const solIndex = nodes.length;
            traverse(d.sol);
            const sagIndex = nodes.length;
            traverse(d.sag);
            nodes[index] = `Node::Dal { ozellik: ${d.ozellik_indeksi}, esik: ${d.esik_degeri.toFixed(2)}, sol: ${solIndex}, sag: ${sagIndex} }`;
        }
    }
    traverse(tree);

    let code = `#[derive(Clone, Copy)]\n`;
    code += `enum Node {\n`;
    code += `    Dal { ozellik: usize, esik: f32, sol: usize, sag: usize },\n`;
    code += `    Yaprak { sinif: &'static str },\n`;
    code += `}\n\n`;
    code += `const AGAC: &[Node] = &[\n`;
    nodes.forEach(n => {
        code += `    ${n},\n`;
    });
    code += `];\n\n`;
    code += `fn tahmin_et(girdiler: &[f32]) -> &'static str {\n`;
    code += `    let mut idx = 0;\n`;
    code += `    loop {\n`;
    code += `        match AGAC[idx] {\n`;
    code += `            Node::Yaprak { sinif } => return sinif,\n`;
    code += `            Node::Dal { ozellik, esik, sol, sag } => {\n`;
    code += `                idx = if girdiler[ozellik] <= esik { sol } else { sag };\n`;
    code += `            }\n`;
    code += `        }\n`;
    code += `    }\n`;
    code += `}`;
    return code;
}

function generateCppCompact(tree, targetClasses) {
    const nodes = [];
    function traverse(node) {
        const index = nodes.length;
        nodes.push(null);
        if (node.Yaprak) {
            const val = targetClasses[node.Yaprak.target_index] || "Unknown";
            nodes[index] = `{ true, 0, 0.0, 0, 0, "${val}" }`;
        } else if (node.Dal) {
            const d = node.Dal;
            const solIndex = nodes.length;
            traverse(d.sol);
            const sagIndex = nodes.length;
            traverse(d.sag);
            nodes[index] = `{ false, ${d.ozellik_indeksi}, ${d.esik_degeri.toFixed(2)}, ${solIndex}, ${sagIndex}, nullptr }`;
        }
    }
    traverse(tree);

    let code = `#include <string>\n#include <vector>\n\n`;
    code += `struct Node {\n`;
    code += `    bool is_yaprak;\n`;
    code += `    int ozellik;\n`;
    code += `    double esik;\n`;
    code += `    int sol;\n`;
    code += `    int sag;\n`;
    code += `    const char* sinif;\n`;
    code += `};\n\n`;
    code += `const Node AGAC[] = {\n`;
    nodes.forEach(n => {
        code += `    ${n},\n`;
    });
    code += `};\n\n`;
    code += `std::string tahmin_et(const std::vector<double>& girdiler) {\n`;
    code += `    int idx = 0;\n`;
    code += `    while (!AGAC[idx].is_yaprak) {\n`;
    code += `        idx = girdiler[AGAC[idx].ozellik] <= AGAC[idx].esik ? AGAC[idx].sol : AGAC[idx].sag;\n`;
    code += `    }\n`;
    code += `    return AGAC[idx].sinif;\n`;
    code += `}`;
    return code;
}

function generateGoCompact(tree, targetClasses) {
    const nodes = [];
    function traverse(node) {
        const index = nodes.length;
        nodes.push(null);
        if (node.Yaprak) {
            const val = targetClasses[node.Yaprak.target_index] || "Unknown";
            nodes[index] = `{ Ozellik: 0, Esik: 0.0, Sol: 0, Sag: 0, Sinif: "${val}" }`;
        } else if (node.Dal) {
            const d = node.Dal;
            const solIndex = nodes.length;
            traverse(d.sol);
            const sagIndex = nodes.length;
            traverse(d.sag);
            nodes[index] = `{ Ozellik: ${d.ozellik_indeksi}, Esik: ${d.esik_degeri.toFixed(2)}, Sol: ${solIndex}, Sag: ${sagIndex}, Sinif: "" }`;
        }
    }
    traverse(tree);

    let code = `type Node struct {\n`;
    code += `    Ozellik int\n`;
    code += `    Esik    float64\n`;
    code += `    Sol     int\n`;
    code += `    Sag     int\n`;
    code += `    Sinif   string\n`;
    code += `}\n\n`;
    code += `var AGAC = []Node{\n`;
    nodes.forEach(n => {
        code += `    ${n},\n`;
    });
    code += `}\n\n`;
    code += `func TahminEt(girdiler []float64) string {\n`;
    code += `    idx := 0\n`;
    code += `    for AGAC[idx].Sinif == "" {\n`;
    code += `        if girdiler[AGAC[idx].Ozellik] <= AGAC[idx].Esik {\n`;
    code += `            idx = AGAC[idx].Sol\n`;
    code += `        } else {\n`;
    code += `            idx = AGAC[idx].Sag\n`;
    code += `        }\n`;
    code += `    }\n`;
    code += `    return AGAC[idx].Sinif\n`;
    code += `}`;
    return code;
}

function generateJavaCompact(tree, targetClasses) {
    const initStr = treeToClassInit(tree, targetClasses);
    let code = `public class DecisionTree {\n`;
    code += `    static class Node {\n`;
    code += `        int ozellik;\n`;
    code += `        double esik;\n`;
    code += `        Node sol;\n`;
    code += `        Node sag;\n`;
    code += `        String sinif;\n`;
    code += `        Node(int o, double e, Node l, Node r) { ozellik = o; esik = e; sol = l; sag = r; }\n`;
    code += `        Node(String s) { sinif = s; }\n`;
    code += `    }\n\n`;
    code += `    private static final Node AGAC = ${initStr};\n\n`;
    code += `    public static String tahminEt(double[] girdiler) {\n`;
    code += `        Node d = AGAC;\n`;
    code += `        while (d.sinif == null) {\n`;
    code += `            d = girdiler[d.ozellik] <= d.esik ? d.sol : d.sag;\n`;
    code += `        }\n`;
    code += `        return d.sinif;\n`;
    code += `    }\n`;
    code += `}`;
    return code;
}

function generateCsharpCompact(tree, targetClasses) {
    const initStr = treeToClassInit(tree, targetClasses);
    let code = `public class DecisionTree {\n`;
    code += `    class Node {\n`;
    code += `        public int Ozellik;\n`;
    code += `        public double Esik;\n`;
    code += `        public Node Sol;\n`;
    code += `        public Node Sag;\n`;
    code += `        public string Sinif;\n`;
    code += `        public Node(int o, double e, Node l, Node r) { Ozellik = o; Esik = e; Sol = l; Sag = r; }\n`;
    code += `        public Node(string s) { Sinif = s; }\n`;
    code += `    }\n\n`;
    code += `    private static readonly Node AGAC = ${initStr};\n\n`;
    code += `    public static string TahminEt(double[] girdiler) {\n`;
    code += `        Node d = AGAC;\n`;
    code += `        while (d.Sinif == null) {\n`;
    code += `            d = girdiler[d.Ozellik] <= d.Esik ? d.Sol : d.Sag;\n`;
    code += `        }\n`;
    code += `        return d.Sinif;\n`;
    code += `    }\n`;
    code += `}`;
    return code;
}

function treeToClassInit(node, targetClasses) {
    if (node.Yaprak) {
        const val = targetClasses[node.Yaprak.target_index] || "Unknown";
        return `new Node("${val}")`;
    } else if (node.Dal) {
        const d = node.Dal;
        const sol = treeToClassInit(d.sol, targetClasses);
        const sag = treeToClassInit(d.sag, targetClasses);
        return `new Node(${d.ozellik_indeksi}, ${d.esik_degeri.toFixed(2)}, ${sol}, ${sag})`;
    }
    return "";
}

// Dataset Editor Table Renderer & Logic with Pagination and Text Buttons
function renderEditorTable() {
    const thRow = document.getElementById('editorThRow');
    const tbody = document.getElementById('editorTbody');
    const rowCountEl = document.getElementById('editorRowCount');
    const queryEl = document.getElementById('editorSearch');
    const query = queryEl ? queryEl.value.toLowerCase().trim() : '';

    if (!thRow || !tbody) return;

    thRow.innerHTML = '';
    tbody.innerHTML = '';

    if (rawData.length === 0 || columns.length === 0) {
        if (rowCountEl) {
            rowCountEl.textContent = currentLang === 'en' ? '0 rows' : '0 satır';
        }
        tbody.innerHTML = `<tr><td colspan="100%" style="text-align: center; color: var(--text-secondary); padding: 2rem;">${
            currentLang === 'en' ? 'No data available. Please upload a dataset.' : 'Veri yok. Lütfen bir veri seti yükleyin.'
        }</td></tr>`;
        const paginationEl = document.getElementById('editorPagination');
        if (paginationEl) paginationEl.innerHTML = '';
        return;
    }

    // 1. Generate Headers
    columns.forEach(col => {
        const th = document.createElement('th');
        th.textContent = col;
        thRow.appendChild(th);
    });
    const thActions = document.createElement('th');
    thActions.textContent = currentLang === 'en' ? 'Actions' : 'İşlemler';
    thActions.style.width = '100px';
    thActions.style.textAlign = 'center';
    thRow.appendChild(thActions);

    // 2. Filter rows based on query
    const filteredRows = [];
    rawData.forEach((row, originalIndex) => {
        let matches = false;
        if (!query) {
            matches = true;
        } else {
            for (const col of columns) {
                const cellVal = String(row[col] ?? '').toLowerCase();
                if (cellVal.includes(query)) {
                    matches = true;
                    break;
                }
            }
        }
        if (matches) {
            filteredRows.push({ row, originalIndex });
        }
    });

    if (rowCountEl) {
        rowCountEl.textContent = currentLang === 'en' 
            ? `${filteredRows.length} / ${rawData.length} rows` 
            : `${filteredRows.length} / ${rawData.length} satır`;
    }

    // 3. Paginate
    const totalPages = Math.ceil(filteredRows.length / editorPageSize);
    if (editorPage > totalPages && totalPages > 0) {
        editorPage = totalPages;
    }
    if (editorPage < 1) {
        editorPage = 1;
    }

    const startIdx = (editorPage - 1) * editorPageSize;
    const endIdx = startIdx + editorPageSize;
    const pageRows = filteredRows.slice(startIdx, endIdx);

    // 4. Generate Body Rows
    pageRows.forEach(({ row, originalIndex }) => {
        const tr = document.createElement('tr');

        columns.forEach(col => {
            const td = document.createElement('td');
            td.contentEditable = "true";
            td.textContent = row[col] ?? '';

            td.addEventListener('blur', () => {
                let newVal = td.textContent.trim();
                const floatVal = parseFloat(newVal);
                if (!isNaN(floatVal) && isFinite(newVal)) {
                    rawData[originalIndex][col] = floatVal;
                } else {
                    rawData[originalIndex][col] = newVal;
                }
            });

            td.addEventListener('keydown', (evt) => {
                if (evt.key === 'Enter') {
                    evt.preventDefault();
                    td.blur();
                }
            });

            tr.appendChild(td);
        });

        const tdActions = document.createElement('td');
        tdActions.style.textAlign = 'center';
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'editor-delete-btn';
        deleteBtn.textContent = currentLang === 'en' ? 'Delete' : 'Sil';
        deleteBtn.addEventListener('click', () => {
            rawData.splice(originalIndex, 1);
            const statusMsg = document.getElementById('statusMsg');
            if (statusMsg) {
                statusMsg.textContent = locales[currentLang].rowsLoaded.replace('{count}', rawData.length);
                statusMsg.style.color = "var(--success-color)";
            }
            renderEditorTable();
        });
        tdActions.appendChild(deleteBtn);
        tr.appendChild(tdActions);

        tbody.appendChild(tr);
    });

    // 5. Generate Pagination controls UI
    const paginationEl = document.getElementById('editorPagination');
    if (paginationEl) {
        paginationEl.innerHTML = '';
        if (filteredRows.length > editorPageSize) {
            // Prev Button
            const prevBtn = document.createElement('button');
            prevBtn.textContent = currentLang === 'en' ? 'Previous' : 'Önceki';
            prevBtn.className = 'editor-pagination-btn';
            prevBtn.disabled = editorPage === 1;
            prevBtn.addEventListener('click', () => {
                editorPage--;
                renderEditorTable();
            });

            // Page Indicator
            const pageText = document.createElement('span');
            pageText.style.fontSize = '0.875rem';
            pageText.style.fontWeight = '500';
            pageText.style.color = 'var(--text-secondary)';
            pageText.textContent = currentLang === 'en' 
                ? `Page ${editorPage} of ${totalPages}` 
                : `Sayfa ${editorPage} / ${totalPages}`;

            // Next Button
            const nextBtn = document.createElement('button');
            nextBtn.textContent = currentLang === 'en' ? 'Next' : 'Sonraki';
            nextBtn.className = 'editor-pagination-btn';
            nextBtn.disabled = editorPage === totalPages;
            nextBtn.addEventListener('click', () => {
                editorPage++;
                renderEditorTable();
            });

            paginationEl.appendChild(prevBtn);
            paginationEl.appendChild(pageText);
            paginationEl.appendChild(nextBtn);
        }
    }
}

// Bind editor button actions on load
document.getElementById('editorAddRowBtn').addEventListener('click', () => {
    if (columns.length === 0) return;
    const newRow = {};
    columns.forEach(col => {
        newRow[col] = '';
    });
    rawData.push(newRow);
    const statusMsg = document.getElementById('statusMsg');
    if (statusMsg) {
        statusMsg.textContent = locales[currentLang].rowsLoaded.replace('{count}', rawData.length);
        statusMsg.style.color = "var(--success-color)";
    }
    // Go to last page to show the added row
    editorPage = Math.ceil(rawData.length / editorPageSize);
    renderEditorTable();
});

document.getElementById('editorResetBtn').addEventListener('click', () => {
    if (originalDataBackup.length === 0) return;
    rawData = JSON.parse(JSON.stringify(originalDataBackup));
    const statusMsg = document.getElementById('statusMsg');
    if (statusMsg) {
        statusMsg.textContent = locales[currentLang].rowsLoaded.replace('{count}', rawData.length);
        statusMsg.style.color = "var(--success-color)";
    }
    editorPage = 1;
    renderEditorTable();
});

document.getElementById('editorSearch').addEventListener('input', () => {
    editorPage = 1;
    renderEditorTable();
});

// Populate Playground form fields dynamically
function populatePlaygroundForm() {
    const form = document.getElementById('playgroundForm');
    form.innerHTML = '';

    if (!currentTree) {
        form.innerHTML = `
            <div class="placeholder-msg" style="grid-column: span 2; color: var(--text-secondary); font-size: 0.875rem; text-align: center; padding: 2rem; border: 1px dashed var(--border-color); border-radius: 8px;" data-i18n="pgPlaceholder">
                ${locales[currentLang].pgPlaceholder}
            </div>
        `;
        document.getElementById('testPredictBtn').disabled = true;
        document.getElementById('playgroundResults').style.display = 'none';
        return;
    }

    currentFeatureCols.forEach((col, idx) => {
        const group = document.createElement('div');
        group.className = 'form-group';
        group.style.marginBottom = '0';

        const label = document.createElement('label');
        label.textContent = col;
        label.htmlFor = `play-input-${idx}`;

        group.appendChild(label);

        const map = currentEncoders[col]?.map;
        if (map && Object.keys(map).length > 0) {
            const select = document.createElement('select');
            select.id = `play-input-${idx}`;

            Object.keys(map).forEach(key => {
                const opt = document.createElement('option');
                opt.value = map[key];
                opt.textContent = key;
                select.appendChild(opt);
            });

            group.appendChild(select);
        } else {
            const input = document.createElement('input');
            input.type = 'number';
            input.id = `play-input-${idx}`;
            input.value = "0";

            if (rawData.length > 0) {
                const defVal = parseFloat(rawData[0][col]);
                if (!isNaN(defVal)) {
                    input.value = defVal;
                }
            }

            group.appendChild(input);
        }
        form.appendChild(group);
    });

    document.getElementById('testPredictBtn').disabled = false;
}

// Traversal predictor inside browser
function predictTree(node, inputs) {
    if (node.Yaprak) {
        return node.Yaprak.target_index;
    } else if (node.Dal) {
        const d = node.Dal;
        const val = inputs[d.ozellik_indeksi];
        if (val <= d.esik_degeri) {
            return predictTree(d.sol, inputs);
        } else {
            return predictTree(d.sag, inputs);
        }
    }
    return 0;
}

// Codegen Binding
document.getElementById('generateCodeBtn').addEventListener('click', () => {
    const codeCode = document.getElementById('generatedCode');
    if (!currentTree) {
        codeCode.textContent = locales[currentLang].uploadAndGenFirst;
        return;
    }

    const lang = document.getElementById('codegenLang').value;
    const format = document.getElementById('codegenFormat').value;

    const code = generateCode(currentTree, lang, format, currentFeatureCols, currentTargetClasses, currentEncoders);
    codeCode.textContent = code;
});

// Test predict action
document.getElementById('testPredictBtn').addEventListener('click', () => {
    if (!currentTree) return;

    const inputs = [];
    currentFeatureCols.forEach((_, idx) => {
        const el = document.getElementById(`play-input-${idx}`);
        inputs.push(parseFloat(el.value) || 0.0);
    });

    // Speed Test Loop
    const iterations = 100000;
    const t0 = performance.now();
    let targetIdx = 0;
    for (let i = 0; i < iterations; i++) {
        targetIdx = predictTree(currentTree, inputs);
    }
    const t1 = performance.now();

    const predictedClass = currentTargetClasses[targetIdx] || "Bilinmeyen";
    const durationNs = ((t1 - t0) / iterations) * 1000000;

    document.getElementById('testOutputVal').textContent = predictedClass;

    if (durationNs < 1000) {
        document.getElementById('testSpeedVal').textContent = `${durationNs.toFixed(1)} ns`;
    } else {
        const durationUs = durationNs / 1000;
        document.getElementById('testSpeedVal').textContent = `${durationUs.toFixed(2)} μs`;
    }

    document.getElementById('playgroundResults').style.display = 'block';
});

// Generate Handling
generateBtn.addEventListener('click', async () => {
    const targetCol = targetSelect.value;
    const maxDepth = parseInt(maxDepthInput.value, 10);
    const minSamples = parseInt(minSamplesInput.value, 10);

    statusMsg.textContent = locales[currentLang].converting;

    try {
        // 1. Girdi sütunlarını topla (Sadece seçili olanlar)
        const featureCols = [];
        columns.forEach(col => {
            const cb = document.getElementById(`cb-feat-${col}`);
            if (cb && cb.checked) {
                featureCols.push(col);
            }
        });

        if (featureCols.length === 0) {
            throw new Error(locales[currentLang].selectAtLeastOne);
        }

        // 2. Metin değerleri sayıya dönüştürme sözlükleri (Encoding)
        const encoders = {};
        featureCols.forEach(col => { encoders[col] = { map: {}, counter: 0.0 }; });

        const targetMap = {};
        let targetCounter = 0;
        const targetClasses = [];

        const processedData = [];

        for (const row of rawData) {
            // Hedef sınıf indeksleme
            const rawTarget = String(row[targetCol]);
            if (!(rawTarget in targetMap)) {
                targetMap[rawTarget] = targetCounter++;
                targetClasses.push(rawTarget);
            }
            const target_index = targetMap[rawTarget];

            // Özellikleri float'a çevirme
            const features = [];
            for (const col of featureCols) {
                const val = row[col];
                const floatVal = parseFloat(val);
                if (!isNaN(floatVal) && isFinite(val)) {
                    features.push(floatVal);
                } else {
                    const strVal = String(val).toUpperCase();
                    if (!(strVal in encoders[col].map)) {
                        encoders[col].map[strVal] = encoders[col].counter;
                        encoders[col].counter += 1.0;
                    }
                    features.push(encoders[col].map[strVal]);
                }
            }

            processedData.push({ features, target_index });
        }

        statusMsg.textContent = locales[currentLang].compiling;
        generateBtn.disabled = true;

        // 3. WASM Modülünü Çağır (Yerel tarayıcı eğitimi)
        const result = generate_decision_tree(
            processedData,
            featureCols,
            targetClasses,
            maxDepth,
            minSamples
        );

        // Model state'lerini kaydet
        currentTree = result.tree;
        currentFeatureCols = featureCols;
        currentTargetClasses = targetClasses;
        currentEncoders = encoders;

        // 4. Performans Metriklerini Güncelle
        document.getElementById('val-accuracy').textContent = `%${result.accuracy.toFixed(1)}`;
        document.getElementById('val-correct').textContent = result.correct_samples;
        document.getElementById('val-incorrect').textContent = result.total_samples - result.correct_samples;
        document.getElementById('metricsPanel').style.display = 'grid';

        // Reset code generation tab view
        document.getElementById('generatedCode').textContent = locales[currentLang].codePlaceholder;

        // Populate interactive test simulator fields
        populatePlaygroundForm();

        // Graphviz Render
        const viz = new Viz();
        viz.renderSVGElement(result.dot_graph)
            .then(element => {
                const container = document.getElementById('graph-container');
                container.innerHTML = '';

                activeSvg = element;
                activeSvg.style.maxWidth = 'none';
                activeSvg.style.height = 'auto';

                container.appendChild(activeSvg);
                container.style.cursor = 'grab';

                resetZoomPan();

                statusMsg.textContent = locales[currentLang].success;
                statusMsg.style.color = "var(--success-color)";
            })
            .catch(error => {
                console.error(error);
                document.getElementById('graph-container').innerHTML = `<span style="color:red">${locales[currentLang].graphError}</span>`;
            });

    } catch (err) {
        console.error(err);
        statusMsg.textContent = locales[currentLang].errorPrefix + err.message;
        statusMsg.style.color = "var(--danger-color)";
    } finally {
        generateBtn.disabled = false;
    }
});

// Double-click to copy implementation
document.querySelectorAll('pre').forEach(pre => {
    pre.addEventListener('dblclick', async () => {
        const code = pre.querySelector('code');
        if (code) {
            const text = code.textContent;
            try {
                await navigator.clipboard.writeText(text);
                showToast(locales[currentLang].copied);
            } catch (err) {
                console.error("Copy failed: ", err);
            }
        }
    });
    pre.setAttribute('title', 'Double-click to copy / Kopyalamak için çift tıklayın');
    pre.style.cursor = 'pointer';
});

function showToast(message) {
    let toast = document.getElementById('toastNotification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toastNotification';
        toast.style.position = 'fixed';
        toast.style.bottom = '2rem';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.backgroundColor = 'var(--text-primary)';
        toast.style.color = 'var(--surface-color)';
        toast.style.padding = '0.75rem 1.5rem';
        toast.style.borderRadius = '8px';
        toast.style.fontSize = '0.875rem';
        toast.style.fontWeight = '500';
        toast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        toast.style.zIndex = '1000';
        toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(10px)';
    }, 2000);
}

// XOX Game Logic
let xoxBoard = Array(9).fill("");
let xoxActive = true;
let xoxTurn = "X"; // User is X, Bot is O

const xoxCells = document.querySelectorAll('.xox-cell');
const xoxTurnText = document.getElementById('xoxTurn');
const resetXoxBtn = document.getElementById('resetXoxBtn');

function resetXox() {
    xoxBoard = Array(9).fill("");
    xoxActive = true;
    xoxTurn = "X";
    if (xoxTurnText) {
        xoxTurnText.textContent = currentLang === 'en' ? "Your turn (X)" : "Sıra sizde (X)";
        xoxTurnText.style.color = "var(--text-secondary)";
    }
    xoxCells.forEach(cell => {
        cell.textContent = "";
        cell.style.color = "var(--text-primary)";
    });
}

xoxCells.forEach(cell => {
    cell.addEventListener('click', () => {
        const idx = parseInt(cell.getAttribute('data-idx'));
        if (xoxBoard[idx] !== "" || !xoxActive || xoxTurn !== "X") return;

        makeXoxMove(idx, "X");

        if (checkXoxWin("X")) {
            xoxTurnText.textContent = currentLang === 'en' ? "You Win!" : "Kazandınız!";
            xoxTurnText.style.color = "var(--success-color)";
            xoxActive = false;
            return;
        }

        if (xoxBoard.every(c => c !== "")) {
            xoxTurnText.textContent = currentLang === 'en' ? "Draw!" : "Berabere!";
            xoxActive = false;
            return;
        }

        xoxTurn = "O";
        xoxTurnText.textContent = currentLang === 'en' ? "Bot thinking..." : "Bot düşünüyor...";
        setTimeout(makeBotMove, 500);
    });
});

function makeXoxMove(idx, player) {
    xoxBoard[idx] = player;
    const cell = document.querySelector(`.xox-cell[data-idx="${idx}"]`);
    if (cell) {
        cell.textContent = player;
        cell.style.color = player === "X" ? "var(--accent-color)" : "var(--danger-color)";
    }
}

function makeBotMove() {
    if (!xoxActive) return;

    let move = -1;

    // 1. Can bot win?
    for (let i = 0; i < 9; i++) {
        if (xoxBoard[i] === "") {
            xoxBoard[i] = "O";
            if (checkXoxWin("O")) { move = i; }
            xoxBoard[i] = "";
            if (move !== -1) break;
        }
    }

    // 2. Can user win? Block them
    if (move === -1) {
        for (let i = 0; i < 9; i++) {
            if (xoxBoard[i] === "") {
                xoxBoard[i] = "X";
                if (checkXoxWin("X")) { move = i; }
                xoxBoard[i] = "";
                if (move !== -1) break;
            }
        }
    }

    // 3. Play center if free
    if (move === -1 && xoxBoard[4] === "") {
        move = 4;
    }

    // 4. Play random free cell
    if (move === -1) {
        const free = xoxBoard.map((c, i) => c === "" ? i : null).filter(c => c !== null);
        if (free.length > 0) {
            move = free[Math.floor(Math.random() * free.length)];
        }
    }

    if (move !== -1) {
        makeXoxMove(move, "O");

        if (checkXoxWin("O")) {
            xoxTurnText.textContent = currentLang === 'en' ? "DecisionTree Bot Wins!" : "Bot Kazandı!";
            xoxTurnText.style.color = "var(--danger-color)";
            xoxActive = false;
            return;
        }

        if (xoxBoard.every(c => c !== "")) {
            xoxTurnText.textContent = currentLang === 'en' ? "Draw!" : "Berabere!";
            xoxActive = false;
            return;
        }
    }

    xoxTurn = "X";
    xoxTurnText.textContent = currentLang === 'en' ? "Your turn (X)" : "Sıra sizde (X)";
}

function checkXoxWin(player) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return lines.some(line => {
        return line.every(idx => xoxBoard[idx] === player);
    });
}

if (resetXoxBtn) {
    resetXoxBtn.addEventListener('click', resetXox);
}

// Snake Game Logic
const canvas = document.getElementById('snakeCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;
const scoreText = document.getElementById('snakeScore');
const highScoreText = document.getElementById('snakeHighScore');
const resetSnakeBtn = document.getElementById('resetSnakeBtn');

let grid = 15;
let count = 0;
let snakeScore = 0;
let snakeHighScore = 0;
let snakeActive = false;
let gameLoopId = null;

let snake = {
    x: 150,
    y: 150,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4
};
let apple = {
    x: 300,
    y: 300
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function resetSnake() {
    if (!ctx) return;
    snakeActive = true;
    snakeScore = 0;
    if (scoreText) scoreText.textContent = "0";
    snake.x = 150;
    snake.y = 150;
    snake.cells = [];
    snake.maxCells = 4;
    snake.dx = grid;
    snake.dy = 0;

    apple.x = getRandomInt(0, 20) * grid;
    apple.y = getRandomInt(0, 20) * grid;

    if (resetSnakeBtn) {
        resetSnakeBtn.textContent = currentLang === 'en' ? "Restart" : "Yeniden Başlat";
    }

    if (gameLoopId) cancelAnimationFrame(gameLoopId);
    gameLoopId = requestAnimationFrame(loopSnake);
}

function loopSnake() {
    if (!snakeActive || !ctx) return;
    gameLoopId = requestAnimationFrame(loopSnake);

    if (++count < 6) {
        return;
    }
    count = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snake.x += snake.dx;
    snake.y += snake.dy;

    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    } else if (snake.x >= canvas.width) {
        snake.x = 0;
    }

    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    } else if (snake.y >= canvas.height) {
        snake.y = 0;
    }

    ctx.fillStyle = 'var(--danger-color)';
    ctx.fillRect(apple.x, apple.y, grid - 1, grid - 1);

    ctx.fillStyle = 'var(--accent-color)';
    snake.cells.unshift({ x: snake.x, y: snake.y });

    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    snake.cells.forEach(function (cell, index) {
        ctx.fillRect(cell.x, cell.y, grid - 1, grid - 1);

        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;
            snakeScore++;
            if (scoreText) scoreText.textContent = snakeScore;

            if (snakeScore > snakeHighScore) {
                snakeHighScore = snakeScore;
                if (highScoreText) highScoreText.textContent = snakeHighScore;
            }

            apple.x = getRandomInt(0, 20) * grid;
            apple.y = getRandomInt(0, 20) * grid;
        }

        for (let i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                snakeActive = false;
                ctx.fillStyle = 'var(--danger-color)';
                ctx.font = '20px sans-serif';
                ctx.fillText(currentLang === 'en' ? "Game Over" : "Oyun Bitti", 100, 150);
                if (resetSnakeBtn) {
                    resetSnakeBtn.textContent = currentLang === 'en' ? "Start" : "Başlat";
                }
            }
        }
    });
}

window.addEventListener('keydown', function (e) {
    const key = e.key ? e.key.toLowerCase() : '';
    const code = e.which || e.keyCode;

    // Prevent scrolling on WASD and Arrows
    const keysToPrevent = ['arrowleft', 'arrowup', 'arrowright', 'arrowdown', 'w', 'a', 's', 'd'];
    const codesToPrevent = [37, 38, 39, 40, 87, 65, 83, 68];

    if (snakeActive && (keysToPrevent.includes(key) || codesToPrevent.includes(code))) {
        e.preventDefault();
    }

    // left: ArrowLeft or A
    if ((key === 'arrowleft' || key === 'a' || code === 37 || code === 65) && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
    // up: ArrowUp or W
    else if ((key === 'arrowup' || key === 'w' || code === 38 || code === 87) && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }
    // right: ArrowRight or D
    else if ((key === 'arrowright' || key === 'd' || code === 39 || code === 68) && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
    // down: ArrowDown or S
    else if ((key === 'arrowdown' || key === 's' || code === 40 || code === 83) && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
});

if (resetSnakeBtn) {
    resetSnakeBtn.addEventListener('click', resetSnake);
}

document.getElementById('gameSelect').addEventListener('change', (e) => {
    const val = e.target.value;
    const selectRow = document.getElementById('gameSelectRow');
    const xox = document.getElementById('xoxContainer');
    const snakeContainer = document.getElementById('snakeContainer');

    xox.style.display = val === 'xox' ? 'flex' : 'none';
    snakeContainer.style.display = val === 'snake' ? 'flex' : 'none';

    if (val === 'none') {
        // Move selection row back to the top
        selectRow.style.order = '1';
        selectRow.style.marginBottom = '1.5rem';
        selectRow.style.paddingBottom = '1.25rem';
        selectRow.style.borderBottom = '1px dashed var(--border-color)';
        selectRow.style.marginTop = '0';
        selectRow.style.paddingTop = '0';
        selectRow.style.borderTop = 'none';
    } else {
        // Move selection row to the bottom
        selectRow.style.order = '3';
        selectRow.style.marginBottom = '0';
        selectRow.style.paddingBottom = '0';
        selectRow.style.borderBottom = 'none';
        selectRow.style.marginTop = '1.5rem';
        selectRow.style.paddingTop = '1.25rem';
        selectRow.style.borderTop = '1px dashed var(--border-color)';

        // Set order: 2 for active game containers
        xox.style.order = '2';
        snakeContainer.style.order = '2';
    }

    resetXox();
    snakeActive = false;
    if (gameLoopId) cancelAnimationFrame(gameLoopId);
    if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    if (resetSnakeBtn) {
        resetSnakeBtn.textContent = currentLang === 'en' ? "Start Game" : "Başlat";
    }
});

// GitHub stars fetcher
async function fetchGitHubStars() {
    try {
        const response = await fetch('https://api.github.com/repos/YusufDurmaz/DecisionTree.rs');
        if (response.ok) {
            const data = await response.json();
            if (data && data.stargazers_count !== undefined) {
                document.getElementById('ghStarCount').textContent = data.stargazers_count.toLocaleString();
            }
        }
    } catch (err) {
        console.error("Failed to fetch GitHub stars:", err);
    }
}

fetchGitHubStars();

// Initialize with English locale first
setLanguage('en');
