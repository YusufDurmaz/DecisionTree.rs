use crate::engine::KararAgaci;
use std::fmt::Write as _;

pub fn tree_to_dot(agac: &KararAgaci, feature_names: &[String], class_names: &[String]) -> String {
    let mut out = String::new();
    writeln!(&mut out, "digraph KararAgaci {{").unwrap();
    writeln!(&mut out, "  background=\"#f8fafc\";").unwrap();
    let mut id = 0;
    dot_formatina_cevir(agac, feature_names, class_names, &mut id, &mut out);
    writeln!(&mut out, "}}").unwrap();
    out
}

fn dot_formatina_cevir(agac: &KararAgaci, feature_names: &[String], class_names: &[String], id: &mut usize, out: &mut String) -> usize {
    let mevcut_id = *id;
    *id += 1;

    match agac {
        KararAgaci::Yaprak { target_index } => {
            let class_name = class_names.get(*target_index).map(|s| s.as_str()).unwrap_or("Bilinmeyen");
            writeln!(
                out,
                "  {} [label=\"Sınıf: {}\", shape=box, style=filled, fillcolor=\"#bbf7d0\", fontname=\"Arial\"];",
                mevcut_id, class_name
            )
            .unwrap();
        }
        KararAgaci::Dal {
            ozellik_indeksi,
            esik_degeri,
            sol,
            sag,
        } => {
            let feature_name = feature_names.get(*ozellik_indeksi).map(|s| s.as_str()).unwrap_or("Bilinmeyen");
            writeln!(
                out,
                "  {} [label=\"{} <= {:.2}\", shape=ellipse, style=filled, fillcolor=\"#bfdbfe\", fontname=\"Arial\"];",
                mevcut_id, feature_name, esik_degeri
            )
            .unwrap();

            let sol_id = dot_formatina_cevir(sol, feature_names, class_names, id, out);
            writeln!(
                out,
                "  {} -> {} [label=\" Evet\", color=\"#16a34a\", fontcolor=\"#16a34a\", fontname=\"Arial\"];",
                mevcut_id, sol_id
            )
            .unwrap();

            let sag_id = dot_formatina_cevir(sag, feature_names, class_names, id, out);
            writeln!(
                out,
                "  {} -> {} [label=\" Hayır\", color=\"#dc2626\", fontcolor=\"#dc2626\", fontname=\"Arial\"];",
                mevcut_id, sag_id
            )
            .unwrap();
        }
    }
    mevcut_id
}


