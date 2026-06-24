use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Veri {
    pub features: Vec<f32>,
    pub target_index: usize,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum KararAgaci {
    Yaprak {
        target_index: usize,
    },
    Dal {
        ozellik_indeksi: usize,
        esik_degeri: f32,
        sol: Box<KararAgaci>,
        sag: Box<KararAgaci>,
    },
}

impl KararAgaci {
    pub fn tahmin_et(&self, veri: &Veri) -> usize {
        match self {
            KararAgaci::Yaprak { target_index } => *target_index,
            KararAgaci::Dal {
                ozellik_indeksi,
                esik_degeri,
                sol,
                sag,
            } => {
                let deger = veri.features[*ozellik_indeksi];
                if deger <= *esik_degeri {
                    sol.tahmin_et(veri)
                } else {
                    sag.tahmin_et(veri)
                }
            }
        }
    }
}

pub fn gini_hesapla(veriler: &[Veri], num_classes: usize) -> f32 {
    if veriler.is_empty() {
        return 0.0;
    }
    let mut sayac = vec![0.0f32; num_classes];
    for v in veriler {
        if v.target_index < num_classes {
            sayac[v.target_index] += 1.0;
        }
    }
    let toplam = veriler.len() as f32;
    let mut p_kare_toplam = 0.0f32;
    for s in sayac {
        let p = s / toplam;
        p_kare_toplam += p * p;
    }
    1.0 - p_kare_toplam
}

pub fn agac_insa_et(
    veriler: Vec<Veri>,
    mevcut_derinlik: usize,
    max_depth: usize,
    min_samples_split: usize,
    num_features: usize,
    num_classes: usize,
) -> KararAgaci {
    if veriler.is_empty() {
        // Return a default leaf (should rarely happen)
        return KararAgaci::Yaprak { target_index: 0 };
    }

    let mut sayac = vec![0; num_classes];
    for v in &veriler {
        if v.target_index < num_classes {
            sayac[v.target_index] += 1;
        }
    }
    let en_cok_hedef = sayac
        .iter()
        .enumerate()
        .max_by_key(|&(_, count)| count)
        .unwrap()
        .0;

    if mevcut_derinlik >= max_depth || veriler.len() < min_samples_split {
        return KararAgaci::Yaprak {
            target_index: en_cok_hedef,
        };
    }

    let ilk_hedef = veriler[0].target_index;
    if veriler.iter().all(|v| v.target_index == ilk_hedef) {
        return KararAgaci::Yaprak {
            target_index: ilk_hedef,
        };
    }

    let mevcut_gini = gini_hesapla(&veriler, num_classes);
    let mut en_iyi_kazanc = 0.0f32;
    let mut en_iyi_ozellik = 0;
    let mut en_iyi_esik = 0.0f32;
    let mut en_iyi_sol = Vec::new();
    let mut en_iyi_sag = Vec::new();

    for ozellik in 0..num_features {
        let mut degerler: Vec<f32> = veriler.iter().map(|v| v.features[ozellik]).collect();

        degerler.sort_by(|a, b| a.total_cmp(b));
        degerler.dedup();

        for &esik in &degerler {
            let (sol, sag): (Vec<Veri>, Vec<Veri>) = veriler.iter().cloned().partition(|v| {
                v.features[ozellik] <= esik
            });

            if sol.is_empty() || sag.is_empty() {
                continue;
            }

            let p_sol = sol.len() as f32 / veriler.len() as f32;
            let p_sag = sag.len() as f32 / veriler.len() as f32;
            let yeni_gini = (p_sol * gini_hesapla(&sol, num_classes)) + (p_sag * gini_hesapla(&sag, num_classes));
            let kazanc = mevcut_gini - yeni_gini;

            if kazanc > en_iyi_kazanc {
                en_iyi_kazanc = kazanc;
                en_iyi_ozellik = ozellik;
                en_iyi_esik = esik;
                en_iyi_sol = sol;
                en_iyi_sag = sag;
            }
        }
    }

    if en_iyi_kazanc <= 0.0 {
        return KararAgaci::Yaprak {
            target_index: en_cok_hedef,
        };
    }

    KararAgaci::Dal {
        ozellik_indeksi: en_iyi_ozellik,
        esik_degeri: en_iyi_esik,
        sol: Box::new(agac_insa_et(
            en_iyi_sol,
            mevcut_derinlik + 1,
            max_depth,
            min_samples_split,
            num_features,
            num_classes,
        )),
        sag: Box::new(agac_insa_et(
            en_iyi_sag,
            mevcut_derinlik + 1,
            max_depth,
            min_samples_split,
            num_features,
            num_classes,
        )),
    }
}
