import type { Lang } from '@/lib/i18n'

export const expertiseSlugs = ['orgu', 'boya', 'apre'] as const
export type ExpertiseSlug = (typeof expertiseSlugs)[number]

type LocalizedText = Record<Lang, string>

export interface ExpertiseDefect {
  name: LocalizedText
  symptom: LocalizedText
  rootCause: LocalizedText
  correctiveAction: LocalizedText
}

export interface ExpertiseResource {
  title: LocalizedText
  description: LocalizedText
  href: string
  type: 'PDF' | 'XLSX' | 'ARTICLE'
}

export interface ExpertiseReference {
  title: string
  organization: string
  href: string
}

export interface ExpertiseData {
  slug: ExpertiseSlug
  no: string
  label: LocalizedText
  eyebrow: LocalizedText
  title: LocalizedText
  summary: LocalizedText
  purpose: LocalizedText
  heroImage: string
  heroImageAlt: LocalizedText
  machines: LocalizedText[]
  criticalParameters: LocalizedText[]
  controlPoints: LocalizedText[]
  defects: ExpertiseDefect[]
  relatedKeywords: string[]
  resources: ExpertiseResource[]
  references: ExpertiseReference[]
  fieldPhotoBrief: LocalizedText
}

export const expertiseData: Record<ExpertiseSlug, ExpertiseData> = {
  orgu: {
    slug: 'orgu',
    no: '01',
    label: { tr: 'Örgü Kumaş / Knitted Fabric', en: 'Knitted Fabric / Örgü Kumaş' },
    eyebrow: { tr: 'KUMAŞ OLUŞUMU', en: 'FABRIC FORMATION' },
    title: {
      tr: 'Örgü kumaş prosesini iplikten kumaş performansına kadar yönetmek.',
      en: 'Managing knitted fabric production from yarn input to fabric performance.',
    },
    summary: {
      tr: 'İplik özellikleri, makine inceliği / gauge, ilmek boyu / stitch length, besleme gerilimi, çekim ve elastan oranı birlikte değerlendirilmeden kararlı gramaj, en ve yüzey kalitesi elde edilemez.',
      en: 'Stable fabric weight, width and surface quality require the joint control of yarn properties, machine gauge, stitch length, feed tension, take-down and elastane delivery.',
    },
    purpose: {
      tr: 'Örgü kumaş üretiminin amacı yalnızca kumaş oluşturmak değil; sonraki Ön Terbiye / Pretreatment, Boyama / Dyeing ve Apre / Finishing adımlarında öngörülebilir davranan, izlenebilir ve tekrarlanabilir bir yarı mamul oluşturmaktır.',
      en: 'The objective of knitted fabric production is not only to form fabric, but to produce a traceable and repeatable substrate that behaves predictably during pretreatment, dyeing and finishing.',
    },
    heroImage: '/images/iplik-kalitesi-kimya.jpeg',
    heroImageAlt: {
      tr: 'İplik bobinleri ve örme kumaş üzerinden iplik-kumaş kalite ilişkisi',
      en: 'Yarn packages and knitted fabric illustrating the yarn-to-fabric quality relationship',
    },
    machines: [
      { tr: 'Yuvarlak Örme Makinesi / Circular Knitting Machine', en: 'Circular Knitting Machine / Yuvarlak Örme Makinesi' },
      { tr: 'Düz Örme Makinesi / Flat Knitting Machine', en: 'Flat Knitting Machine / Düz Örme Makinesi' },
      { tr: 'Pozitif Besleyici / Positive Feeder ve elastan besleme sistemleri', en: 'Positive feeders and elastane feeding systems' },
      { tr: 'Kumaş çekim ve sarım sistemi / Take-down and winding system', en: 'Take-down and winding system' },
      { tr: 'İğne, platin ve kam grubu / Needle, sinker and cam system', en: 'Needle, sinker and cam system' },
    ],
    criticalParameters: [
      { tr: 'İplik numarası, büküm, lot ve düzgünsüzlük / Yarn count, twist, lot and evenness', en: 'Yarn count, twist, lot and evenness' },
      { tr: 'Makine inceliği / Gauge ve örgü konstrüksiyonu', en: 'Machine gauge and knit construction' },
      { tr: 'İlmek boyu / Stitch length ve iplik besleme miktarı', en: 'Stitch length and yarn feed quantity' },
      { tr: 'Besleme gerilimi / Feed tension ve pozitif besleyici kalibrasyonu', en: 'Feed tension and positive feeder calibration' },
      { tr: 'Çekim / Take-down, makine devri ve kumaş sarım gerilimi', en: 'Take-down, machine speed and winding tension' },
      { tr: 'Elastan besleme oranı, kılavuz konumu ve kaplama düzeni / Plating', en: 'Elastane delivery ratio, guide position and plating arrangement' },
      { tr: 'İğne-platin durumu, yağlama ve makine temizliği', en: 'Needle-sinker condition, lubrication and machine cleanliness' },
    ],
    controlPoints: [
      { tr: 'İlmek boyu ve besleme ölçümü / Stitch length and feed measurement', en: 'Stitch length and feed measurement' },
      { tr: 'Ham kumaş gramajı ve eni / Greige GSM and width', en: 'Greige GSM and width' },
      { tr: 'Sıra-çubuk sıklığı / Courses and wales density', en: 'Courses and wales density' },
      { tr: 'Rulo bazlı hata haritası ve makine-feeder kaydı', en: 'Roll-based defect map and machine-feeder traceability' },
      { tr: 'May dönmesi / Spirality ve relaksasyon davranışı', en: 'Spirality and relaxation behaviour' },
      { tr: 'Boya öncesi lot, tüp-açık en ve elastan sürekliliği kontrolü', en: 'Pre-dye lot, tubular/open-width and elastane continuity control' },
    ],
    defects: [
      {
        name: { tr: 'İğne izi / Needle Line', en: 'Needle Line / İğne İzi' },
        symptom: { tr: 'Kumaş boyunca sürekli dikey iz veya yüzey farklılığı.', en: 'A continuous vertical line or surface difference along the fabric.' },
        rootCause: { tr: 'Hasarlı ya da farklı çalışan iğne-platin, kam ayarı, kirlenme veya yağlama düzensizliği.', en: 'Damaged or differently acting needle-sinker elements, cam setting, contamination or uneven lubrication.' },
        correctiveAction: { tr: 'İğne-platin ve kam kontrolü; feeder bazlı hata doğrulaması; temizlik ve yağlama standardının kayıt altına alınması.', en: 'Inspect needles, sinkers and cams; verify the responsible feeder; standardize and record cleaning and lubrication.' },
      },
      {
        name: { tr: 'Enine Çizgi / Barré', en: 'Barré / Enine Çizgi' },
        symptom: { tr: 'Boyama sonrası belirginleşen periyodik ton veya yapı bantları.', en: 'Periodic shade or structural bands, often more visible after dyeing.' },
        rootCause: { tr: 'İplik lotu, numara, büküm, boya alma farklılığı; besleme gerilimi veya ilmek boyu sapması.', en: 'Differences in yarn lot, count, twist or dye affinity; feed tension or stitch-length variation.' },
        correctiveAction: { tr: 'Lot ayırma, iplik karşılaştırma, feeder gerilim ölçümü ve ilmek boyu standardının doğrulanması.', en: 'Segregate lots, compare yarn properties, measure feeder tension and verify the stitch-length standard.' },
      },
      {
        name: { tr: 'Elastan Kaplama Hatası / Plating Fault', en: 'Elastane Plating Fault' },
        symptom: { tr: 'Elastanın yüzeye çıkması, kopuk çizgi, dalgalı görünüm veya lokal en farkı.', en: 'Elastane showing on the face, broken lines, waviness or local width variation.' },
        rootCause: { tr: 'Besleme oranı, kılavuz pozisyonu, gerilim, elastan kopuşu veya çekim dengesizliği.', en: 'Delivery ratio, guide position, tension, elastane breakage or unbalanced take-down.' },
        correctiveAction: { tr: 'Elastan besleyiciyi kalibre etme, kılavuzu sabitleme, kopuş sensörünü doğrulama ve çekimi dengeleme.', en: 'Calibrate elastane feeders, secure guide position, verify break sensors and balance take-down.' },
      },
      {
        name: { tr: 'May Dönmesi / Spirality', en: 'Spirality / May Dönmesi' },
        symptom: { tr: 'Yıkama veya relaksasyon sonrasında dikiş ve çubukların eksenden sapması.', en: 'Seams and wales rotate away from the intended axis after washing or relaxation.' },
        rootCause: { tr: 'İplik büküm canlılığı, dengesiz konstrüksiyon, yüksek gerilim, uygunsuz çekim ve sonraki proseslerde yön kontrolü.', en: 'Yarn torque, unbalanced construction, excessive tension, unsuitable take-down and insufficient directional control in later processes.' },
        correctiveAction: { tr: 'İplik ve konstrüksiyon uygunluğunu doğrulama; gerilimleri azaltma; relaksasyon, ramöz ve kompaktör ayarlarını birlikte değerlendirme.', en: 'Verify yarn and construction suitability; reduce tension; assess relaxation, stenter and compactor settings together.' },
      },
    ],
    relatedKeywords: ['iplik', 'örgü kumaş', 'örme kumaş', 'yuvarlak örme', 'makine inceliği', 'ilmek', 'kumaş'],
    resources: [
      {
        title: { tr: 'Makine inceliği arttıkça doku sertleşir mi?', en: 'Does fabric become firmer as machine gauge increases?' },
        description: { tr: 'Gauge, iplik ve kumaş yapısı ilişkisini açıklayan teknik yazı.', en: 'Technical article on the relationship between gauge, yarn and fabric structure.' },
        href: '/tr/blog/makine-inceligi-arttikca-doku-sertlesir',
        type: 'ARTICLE',
      },
      {
        title: { tr: 'İplik kalitesi kötüyse gerisi boşa mı?', en: 'Can downstream processing compensate for poor yarn quality?' },
        description: { tr: 'İplik kusurlarının örgü, boya ve apreye taşınma mekanizması.', en: 'How yarn defects propagate into knitting, dyeing and finishing.' },
        href: '/tr/blog/iplik-kalitesi-kotuyse-gerisi-bosa-mi',
        type: 'ARTICLE',
      },
    ],
    references: [
      { title: 'Knit Basics', organization: 'CottonWorks™ / Cotton Incorporated', href: 'https://cottonworks.com/learning-hub/knitting/knit-basics/' },
      { title: 'Knit Machinery: Flat, Circular, and Seamless', organization: 'CottonWorks™ / Cotton Incorporated', href: 'https://cottonworks.com/learning-hub/knitting/knit-machinery/' },
    ],
    fieldPhotoBrief: {
      tr: 'İstenen saha fotoğrafı: Yuvarlak örme makinesinin feeder, iğne yatağı ve kumaş çekim bölgesini aynı karede gösterecek; operatör güvenli mesafede, 30–45° çapraz açıdan, yatay 16:9 çekim.',
      en: 'Requested field photo: a horizontal 16:9 image, shot from a 30–45° angle, showing feeders, needle bed and take-down area of a circular knitting machine with the operator at a safe distance.',
    },
  },

  boya: {
    slug: 'boya',
    no: '02',
    label: { tr: 'Boya / Dyeing', en: 'Dyeing / Boya' },
    eyebrow: { tr: 'YAŞ PROSES', en: 'WET PROCESSING' },
    title: {
      tr: 'Boyama prosesini reçeteden tekrarlanabilir renge kadar yönetmek.',
      en: 'Managing dyeing from recipe design to repeatable colour.',
    },
    summary: {
      tr: 'Ön terbiye yeterliliği, su kalitesi, flotte, pH, iletkenlik, dozaj, sıcaklık-zaman eğrisi ve kumaş sirkülasyonu aynı proses kaydı içinde değerlendirilmelidir.',
      en: 'Pretreatment adequacy, water quality, liquor ratio, pH, conductivity, dosing, the time-temperature profile and fabric circulation must be assessed within one process record.',
    },
    purpose: {
      tr: 'Boyamanın amacı hedef rengi yalnızca bir kez tutturmak değil; elyaf ve kumaş yapısını koruyarak tonu, nüansı ve haslığı laboratuvardan işletmeye tekrarlanabilir biçimde taşımaktır.',
      en: 'The objective is not to hit the target shade once, but to transfer shade, nuance and fastness repeatably from laboratory to bulk while protecting fibre and fabric integrity.',
    },
    heroImage: '/images/reaktif-boya-cover.jpg',
    heroImageAlt: {
      tr: 'Boyalı kumaş yüzeyinde renk ve ton sürekliliği',
      en: 'Colour and shade continuity on a dyed fabric surface',
    },
    machines: [
      { tr: 'HT Jet / Soft-flow boyama makinesi', en: 'HT Jet / Soft-flow dyeing machine' },
      { tr: 'Overflow ve düşük gerilimli halat boyama sistemleri', en: 'Overflow and low-tension rope dyeing systems' },
      { tr: 'Laboratuvar boyama makinesi / Laboratory dyeing machine', en: 'Laboratory dyeing machine' },
      { tr: 'Otomatik boya-kimyasal hazırlama ve dozaj sistemi', en: 'Automatic dyestuff-chemical preparation and dosing system' },
      { tr: 'Yıkama, nötralizasyon ve indirgen temizleme ekipmanı', en: 'Washing, neutralisation and reduction-clearing equipment' },
      { tr: 'Su hazırlama ve proses suyu kontrol sistemi', en: 'Water treatment and process-water control system' },
    ],
    criticalParameters: [
      { tr: 'Ön terbiye yeterliliği: emicilik, beyazlık, yağ ve alkali kalıntısı', en: 'Pretreatment adequacy: absorbency, whiteness, oil and alkali residues' },
      { tr: 'Flotte oranı / Liquor ratio ve makine doluluk oranı', en: 'Liquor ratio and machine loading' },
      { tr: 'pH, iletkenlik, su sertliği ve metal iyonları', en: 'pH, conductivity, water hardness and metal ions' },
      { tr: 'Sıcaklık-zaman eğrisi, ısıtma-soğutma hızı ve bekleme süresi', en: 'Time-temperature profile, heating-cooling rate and dwell time' },
      { tr: 'Tuz, alkali, boya ve yardımcı kimyasal dozaj sırası-hızı', en: 'Sequence and rate of salt, alkali, dye and auxiliary dosing' },
      { tr: 'Kumaş devri, pompa-nozul dengesi ve halat gerilimi', en: 'Fabric turnover, pump-nozzle balance and rope tension' },
      { tr: 'Yıkama etkinliği, nötralizasyon ve son banyo kriterleri', en: 'Washing efficiency, neutralisation and final-bath criteria' },
    ],
    controlPoints: [
      { tr: 'Laboratuvar reçetesi–işletme reçetesi karşılaştırması', en: 'Laboratory-to-bulk recipe comparison' },
      { tr: 'pH, iletkenlik ve sıcaklık trend kaydı', en: 'pH, conductivity and temperature trend records' },
      { tr: 'Dozaj zamanı, miktarı ve hazırlama konsantrasyonu', en: 'Dosing time, quantity and preparation concentration' },
      { tr: 'Kumaş tur zamanı / Turnover time ve nozul-pompa ayarı', en: 'Fabric turnover time and nozzle-pump setting' },
      { tr: 'Renk ölçümü, ton-nüans ve parti içi homojenlik', en: 'Colour measurement, shade-nuance and within-batch uniformity' },
      { tr: 'Yıkama, sürtme ve kullanım amacına uygun haslık kontrolleri', en: 'Wash, rubbing and end-use-relevant fastness controls' },
      { tr: 'Tekrar işlem, boya ilavesi ve düzeltme neden kodları', en: 'Reason codes for reprocessing, dye additions and corrections' },
    ],
    defects: [
      {
        name: { tr: 'Abraj / Uneven Dyeing', en: 'Uneven Dyeing / Abraj' },
        symptom: { tr: 'Parti içinde açık-koyu alanlar, yönsel ton farkı veya lokal leke.', en: 'Light-dark areas, directional shade difference or local stains within a batch.' },
        rootCause: { tr: 'Yetersiz ön terbiye, hızlı dozaj, uygunsuz pH-sıcaklık geçişi, zayıf sirkülasyon veya aşırı yükleme.', en: 'Insufficient pretreatment, rapid dosing, unsuitable pH-temperature transition, poor circulation or overloading.' },
        correctiveAction: { tr: 'Emicilik ve kalıntı kontrolü; dozaj eğrisini yavaşlatma; makine doluluğu, pompa, nozul ve tur zamanını doğrulama.', en: 'Check absorbency and residues; slow the dosing profile; verify loading, pump, nozzle and turnover time.' },
      },
      {
        name: { tr: 'Partiden Partiye Ton Farkı / Batch-to-Batch Shade Variation', en: 'Batch-to-Batch Shade Variation' },
        symptom: { tr: 'Aynı reçete kodunda hedefe göre ton, nüans veya derinlik sapması.', en: 'Deviation in shade, nuance or depth despite using the same recipe code.' },
        rootCause: { tr: 'Hammadde-lot, su, boya gücü, reçete ölçekleme, tartım-dozaj veya proses eğrisi değişkenliği.', en: 'Variation in substrate lot, water, dye strength, recipe scaling, weighing-dosing or process profile.' },
        correctiveAction: { tr: 'Girdi lotlarını ve boya gücünü izleme; reçete versiyonunu kilitleme; tartım-dozaj doğrulaması ve trend karşılaştırması.', en: 'Trace input lots and dye strength; lock recipe versions; verify weighing-dosing and compare process trends.' },
      },
      {
        name: { tr: 'Kırık-Halat İzi / Crease-Rope Mark', en: 'Crease or Rope Mark' },
        symptom: { tr: 'Kat yeri boyunca koyu-açık çizgi, parlaklık farkı veya kalıcı deformasyon.', en: 'Dark-light line, lustre difference or permanent deformation along a fold.' },
        rootCause: { tr: 'Yüksek halat gerilimi, düşük sirkülasyon, uygunsuz nozul, aşırı yükleme veya kritik sıcaklıkta bekleme.', en: 'High rope tension, low circulation, unsuitable nozzle, overloading or dwell at a critical temperature.' },
        correctiveAction: { tr: 'Yükü ve nozul basıncını optimize etme; tur zamanını kısaltma; kritik bölgelerde hareketi sürdürme ve kırık önleyici sistemi doğrulama.', en: 'Optimise load and nozzle pressure; shorten turnover time; maintain movement through critical zones and verify crease-prevention measures.' },
      },
      {
        name: { tr: 'Yetersiz Fikse ve Yıkama / Poor Fixation and Washing-off', en: 'Poor Fixation and Washing-off' },
        symptom: { tr: 'Düşük haslık, ton akması, hidrolize boya kalıntısı veya son banyoda yüksek renk yükü.', en: 'Low fastness, shade bleeding, hydrolysed dye residue or high colour load in the final bath.' },
        rootCause: { tr: 'Alkali-pH ve fikse süresi yetersizliği; uygunsuz sıcaklık; yetersiz ard yıkama, sabunlama veya nötralizasyon.', en: 'Insufficient alkali-pH or fixation time; unsuitable temperature; inadequate rinsing, soaping or neutralisation.' },
        correctiveAction: { tr: 'Fikse eğrisini ve son pH’ı doğrulama; yıkama adımlarını kirlilik yüküne göre düzenleme; son banyo kriteri tanımlama.', en: 'Verify fixation profile and final pH; adjust washing steps to contamination load; define final-bath acceptance criteria.' },
      },
    ],
    relatedKeywords: ['boya', 'boyama', 'reaktif', 'tuz', 'fikse', 'renk', 'jet', 'kasar', 'yıkama'],
    resources: [
      {
        title: { tr: 'Pamuk Örme Kumaşlarda Reaktif Boyama Eğitimi', en: 'Reactive Dyeing of Cotton Knits — Training Note' },
        description: { tr: 'Reaktif boyama akışı, kritik kontrol noktaları ve işletme yaklaşımı.', en: 'Reactive dyeing sequence, critical controls and bulk-production approach.' },
        href: '/downloads/pamuk-orme-kumaslarda-reaktif-boyama-egitimi-r2.pdf',
        type: 'PDF',
      },
      {
        title: { tr: 'HT Jet Boyahanede Proses Yönetimi', en: 'Process Management in an HT Jet Dyehouse' },
        description: { tr: 'Makine, reçete, tur zamanı, dozaj ve proses kayıt sistemi.', en: 'Machine, recipe, turnover, dosing and process-record system.' },
        href: '/downloads/ht-jet-boyahanede-proses-yonetimi-egitimi-r1.pdf',
        type: 'PDF',
      },
      {
        title: { tr: 'Boyama Başlangıç Kontrol Listesi', en: 'Dyeing Start-up Checklist' },
        description: { tr: 'Parti başlamadan önce makine, kumaş, reçete ve kimyasal doğrulaması.', en: 'Pre-start verification of machine, fabric, recipe and chemicals.' },
        href: '/downloads/boyama-baslangic-kontrol-listesi-kurumsal-r2.xlsx',
        type: 'XLSX',
      },
    ],
    references: [
      { title: 'Dyeing Preparation', organization: 'CottonWorks™ / Cotton Incorporated', href: 'https://cottonworks.com/learning-hub/dyeing/dyeing-preparation/' },
      { title: 'Dyeing Basics', organization: 'CottonWorks™ / Cotton Incorporated', href: 'https://cottonworks.com/learning-hub/dyeing/dyeing-basics/' },
      { title: 'Textile Dyeing Booklet', organization: 'Cotton Incorporated', href: 'https://www.cottonworks.com/wp-content/uploads/2018/01/Dyeing_Booklet.pdf' },
    ],
    fieldPhotoBrief: {
      tr: 'İstenen saha fotoğrafı: HT Jet makinesinin gövdesi, nozul-pompa hattı ve otomatik dozaj bağlantısını gösterecek; 30–45° çapraz açıdan, yatay 16:9, operatör ve firma bilgisi görünmeden çekim.',
      en: 'Requested field photo: horizontal 16:9 view from a 30–45° angle showing an HT Jet body, nozzle-pump circuit and automatic dosing connection, without visible operator or company data.',
    },
  },

  apre: {
    slug: 'apre',
    no: '03',
    label: { tr: 'Apre / Finishing', en: 'Finishing / Apre' },
    eyebrow: { tr: 'NİHAİ PERFORMANS', en: 'FINAL PERFORMANCE' },
    title: {
      tr: 'Apreyi en, gramaj, tuşe ve boyutsal stabilite hedefiyle yönetmek.',
      en: 'Managing finishing through width, GSM, hand and dimensional-stability targets.',
    },
    summary: {
      tr: 'Ramöz / Stenter, Kompaktör / Compactor, relaksasyon, kimyasal aplikasyon ve mekanik yüzey işlemleri; kumaşın nihai kullanım performansını birlikte belirler.',
      en: 'Stentering, compaction, relaxation, chemical application and mechanical surface treatments jointly determine final fabric performance.',
    },
    purpose: {
      tr: 'Aprenin amacı kumaşı yalnızca kurutmak veya yumuşatmak değildir; hedef en-gramajı, çekmezliği, dönmeyi, tuşeyi ve varsa fonksiyonel özelliği doğrulanabilir bir final spesifikasyona taşımaktır.',
      en: 'The purpose of finishing is not merely drying or softening; it is to deliver target width-GSM, shrinkage, spirality, hand and any functional property against a verifiable final specification.',
    },
    heroImage: '/images/selulaz-tuy-enzimi.jpg',
    heroImageAlt: {
      tr: 'Örme kumaş yüzeyinde kimyasal ve mekanik apre etkisini temsil eden kumaş dokusu',
      en: 'Knitted fabric texture representing chemical and mechanical finishing effects',
    },
    machines: [
      { tr: 'Ramöz / Stenter ve atkı düzeltici / Weft straightener', en: 'Stenter and weft straightener' },
      { tr: 'Kompaktör / Compactor veya Sanfor / Sanforizing sistemi', en: 'Compactor or sanforizing system' },
      { tr: 'Relaks Kurutucu / Relax Dryer', en: 'Relax dryer' },
      { tr: 'Foulard / Padder ve kimyasal aplikasyon sistemi', en: 'Padder and chemical application system' },
      { tr: 'Kalender / Calender', en: 'Calender' },
      { tr: 'Şardon / Raising, Fırça / Brushing ve Tıraş / Shearing makineleri', en: 'Raising, brushing and shearing machines' },
    ],
    criticalParameters: [
      { tr: 'Giriş nemi, kumaş gerilimi ve besleme düzeni', en: 'Entry moisture, fabric tension and feeding condition' },
      { tr: 'En ayarı, zincir-paralellik ve atkı düzeltme / Bow-Skew control', en: 'Width setting, chain parallelism and bow-skew control' },
      { tr: 'Overfeed, makine hızı, sıcaklık ve gerçek kalış süresi', en: 'Overfeed, machine speed, temperature and actual dwell time' },
      { tr: 'Foulard basıncı, pick-up, banyo konsantrasyonu, pH ve viskozite', en: 'Pad pressure, pick-up, bath concentration, pH and viscosity' },
      { tr: 'Kompaksiyon oranı, keçe-bant durumu ve çıkış gerilimi', en: 'Compaction ratio, felt-belt condition and exit tension' },
      { tr: 'Kurutma-fikse dengesi ve renk/elyaf için termal sınırlar', en: 'Drying-fixation balance and thermal limits for colour and fibre' },
      { tr: 'Soğutma, rulo sarım ve final relaksasyon koşulları', en: 'Cooling, roll winding and final relaxation conditions' },
    ],
    controlPoints: [
      { tr: 'Final en ve gramaj / Finished width and GSM', en: 'Finished width and GSM' },
      { tr: 'Yıkama-kurutma sonrası boyutsal değişim / Dimensional change', en: 'Dimensional change after washing and drying' },
      { tr: 'May dönmesi, atkı eğriliği ve çarpıklık / Spirality, bow and skew', en: 'Spirality, bow and skew' },
      { tr: 'Kumaş nemi ve rulo içi-dışı homojenlik', en: 'Fabric moisture and inside-to-outside roll uniformity' },
      { tr: 'Tuşe değerlendirmesi ve mümkünse cihazla doğrulama', en: 'Hand assessment and instrumental verification where applicable' },
      { tr: 'Renk değişimi, sararma ve yüzey görünümü', en: 'Shade change, yellowing and surface appearance' },
      { tr: 'Fonksiyonel apre testleri ve müşteri spesifikasyonu', en: 'Functional-finish testing and customer specification' },
    ],
    defects: [
      {
        name: { tr: 'Yüksek Çekme / Excessive Shrinkage', en: 'Excessive Shrinkage' },
        symptom: { tr: 'Yıkama sonrası boy-en kaybının spesifikasyon dışına çıkması.', en: 'Length or width loss after washing exceeds specification.' },
        rootCause: { tr: 'Örgü ve yaş proses gerilimleri, yetersiz relaksasyon, yanlış overfeed veya kompaksiyon.', en: 'Knitting and wet-process tensions, insufficient relaxation, incorrect overfeed or compaction.' },
        correctiveAction: { tr: 'Giriş gerilimini azaltma; relaksasyonu artırma; overfeed-kompaksiyon dengesini numune yıkama ile doğrulama.', en: 'Reduce entry tension; increase relaxation; verify overfeed-compaction balance through wash testing.' },
      },
      {
        name: { tr: 'En-Gramaj Kararsızlığı / Width-GSM Instability', en: 'Width-GSM Instability' },
        symptom: { tr: 'Rulo boyunca en veya gramaj dalgalanması; kesim veriminde sapma.', en: 'Width or GSM variation along the roll, affecting cutting yield.' },
        rootCause: { tr: 'Giriş nemi ve besleme farkı, zincir ayarı, overfeed, hız veya rulo sarım gerilimi değişimi.', en: 'Variation in entry moisture or feed, chain setting, overfeed, speed or winding tension.' },
        correctiveAction: { tr: 'Giriş-çıkış trendlerini kaydetme; zincir-paralellik ve besleme sensörlerini doğrulama; rulo bazlı ölçüm planı uygulama.', en: 'Record entry-exit trends; verify chain parallelism and feed sensors; apply roll-based measurement.' },
      },
      {
        name: { tr: 'Sararma veya Ton Değişimi / Yellowing or Shade Change', en: 'Yellowing or Shade Change' },
        symptom: { tr: 'Fikse sonrası renk tonu, beyazlık veya nüansın istenmeyen değişimi.', en: 'Unwanted change in shade, whiteness or nuance after fixation.' },
        rootCause: { tr: 'Aşırı sıcaklık-kalış, kumaşta alkali/kimyasal kalıntı, uyumsuz yumuşatıcı veya yetersiz kurutma-fikse dengesi.', en: 'Excessive temperature-dwell, alkali or chemical residue, incompatible softener or poor drying-fixation balance.' },
        correctiveAction: { tr: 'Kalıntı ve pH kontrolü; termal profili doğrulama; kimyasal uyumluluk denemesi ve giriş nemi standardı.', en: 'Check residues and pH; verify thermal profile; run chemical compatibility trials and standardise entry moisture.' },
      },
      {
        name: { tr: 'Çarpıklık ve Kenar Problemi / Skew, Bow and Edge Defects', en: 'Skew, Bow and Edge Defects' },
        symptom: { tr: 'Atkı eğriliği, diyagonal görünüm, kenar kıvrılması veya klips izi.', en: 'Bow, diagonal distortion, edge curling or clip marks.' },
        rootCause: { tr: 'Dengesiz giriş, atkı düzeltici ayarı, zincir farkı, kenar açıcı veya klips-pim problemi.', en: 'Unbalanced entry, weft-straightener setting, chain mismatch, edge opener or clip-pin problem.' },
        correctiveAction: { tr: 'Giriş merkezleme ve kenar açmayı düzeltme; zincir ve atkı düzelticiyi kalibre etme; klips-pim bakımını doğrulama.', en: 'Correct centring and edge opening; calibrate chain and weft straightener; verify clip-pin maintenance.' },
      },
    ],
    relatedKeywords: ['apre', 'ramöz', 'ramoz', 'kompaktör', 'kompaktor', 'sanfor', 'fikse', 'selülaz', 'boyutsal'],
    resources: [
      {
        title: { tr: 'Ramöz ve Apre Proses Kontrolü Eğitimi', en: 'Stenter and Finishing Process Control — Training Note' },
        description: { tr: 'Ramöz parametreleri, kimyasal aplikasyon ve final kalite yaklaşımı.', en: 'Stenter parameters, chemical application and final-quality approach.' },
        href: '/downloads/ramoz-ve-apre-proses-kontrolu-egitimi-r1.pdf',
        type: 'PDF',
      },
      {
        title: { tr: 'Örme Kumaşlarda Sanfor, Kompaktör ve Boyutsal Stabilite', en: 'Compaction and Dimensional Stability of Knitted Fabrics' },
        description: { tr: 'Relaksasyon, kompaksiyon, çekme ve may dönmesi ilişkisi.', en: 'Relationship between relaxation, compaction, shrinkage and spirality.' },
        href: '/downloads/orme-kumaslarda-sanfor-kompaktor-ve-boyutsal-stabilite-egitimi-r1.pdf',
        type: 'PDF',
      },
      {
        title: { tr: 'Ramöz-Apre Proses Takip Formu', en: 'Stenter-Finishing Process Tracking Form' },
        description: { tr: 'En, gramaj, overfeed, hız, sıcaklık, kimyasal ve final kontrol kayıtları.', en: 'Width, GSM, overfeed, speed, temperature, chemical and final-control records.' },
        href: '/downloads/ramoz-apre-proses-takip-formu-kurumsal-r3.xlsx',
        type: 'XLSX',
      },
    ],
    references: [
      { title: 'Chemical Finishing', organization: 'CottonWorks™ / Cotton Incorporated', href: 'https://cottonworks.com/learning-hub/finishing/chemical-finishing/' },
      { title: 'Shrinkage & Skewing', organization: 'CottonWorks™ / Cotton Incorporated', href: 'https://cottonworks.com/learning-hub/quality-assurance/shrinking-and-skewing/' },
      { title: 'ISO 5077 — Determination of dimensional change in washing and drying', organization: 'International Organization for Standardization', href: 'https://www.iso.org/standard/41877.html' },
    ],
    fieldPhotoBrief: {
      tr: 'İstenen saha fotoğrafı: Ramözün giriş foulardı, atkı düzeltici ve zincir/klips bölgesini aynı kompozisyonda gösterecek; mümkünse kumaş akış yönü belirgin, yatay 16:9 ve 30–45° çapraz açı.',
      en: 'Requested field photo: horizontal 16:9 view from a 30–45° angle showing the stenter entry padder, weft straightener and chain/clip section with a clear fabric-flow direction.',
    },
  },
}

export function isExpertiseSlug(value: string): value is ExpertiseSlug {
  return expertiseSlugs.includes(value as ExpertiseSlug)
}

export function getExpertise(slug: ExpertiseSlug): ExpertiseData {
  return expertiseData[slug]
}

export function localized(text: LocalizedText, lang: Lang): string {
  return text[lang] ?? text.tr
}
