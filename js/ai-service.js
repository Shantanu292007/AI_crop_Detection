/**
 * CROP DOCTOR — AI FIELD INTELLIGENCE
 * AI Detection Service Module (ai-service.js)
 */

const CropDoctorAIService = (() => {
  'use strict';

  const DEMO_CONDITIONS = [
    {
      id: 'aphid_infestation',
      crop: 'Field Crop / Horticultural Foliage',
      scientificCrop: 'Various Host Plants',
      disease: 'Aphid Infestation (Insect Pest)',
      scientificName: 'Aphidoidea (Pest Problem)',
      status: 'Pest Infestation Detected',
      severity: 'Moderate to High',
      confidenceRange: [92, 98],
      isHealthy: false,
      summary: 'This is not really a disease; it is an insect pest problem. The insects are clustered heavily around the plant tissue, and the white material appears consistent with aphid cast skins.',
      symptoms: [
        'Dense clusters of insects crowded heavily around plant tissue and tender growth',
        'Abundant white powdery material consistent with aphid cast skins (exuviae)',
        'Curling, puckering, or distortion of young leaves and shoots',
        'Sticky honeydew excretions often attracting ants or developing black sooty mold'
      ],
      nextSteps: [
        'Inspect the underside of leaves and new shoots immediately to gauge infestation spread.',
        'Prune off and safely dispose of heavily infested leaves and shoot tips.',
        'Blast colonies with a strong water spray for light or localized infestations.',
        'For serious infestations, apply an agriculturally approved aphicide or insecticidal soap according to the crop label.'
      ],
      prevention: [
        'Inspect the underside of leaves and new shoots regularly.',
        'Remove heavily infested leaves/shoots.',
        'Use a strong water spray for light infestations.',
        'Encourage natural predators such as ladybird beetles.',
        'Avoid excessive nitrogen fertilizer, which can encourage soft new growth.',
        'For serious infestations, use an agriculturally approved aphicide/insecticide according to the crop label.'
      ],
      whenToSeekExpert: 'If aphids cover more than 20% of the crop canopy or suspected viral symptoms (mosaic, stunting, rosetting) appear, contact a local agricultural extension specialist.'
    },
    {
      id: 'maize_ear_problem',
      crop: 'Maize (Corn)',
      scientificCrop: 'Zea mays',
      disease: 'Maize Ear Problem (Possible Ear / Kernel Rot)',
      scientificName: 'Fungal Ear Rot Complex',
      status: 'Possible Disease Detected',
      severity: 'High',
      confidenceRange: [86, 94],
      isHealthy: false,
      summary: 'The image shows a maize ear with kernel discoloration/deterioration, so an ear/kernel rot is possible. However, the exact fungal disease cannot be reliably distinguished from this image alone.',
      symptoms: [
        'Visible kernel discoloration and progressive tissue deterioration along the cob',
        'Scattered or incomplete kernel fill with sunken, bleached, or blackened kernels',
        'Fungal mold or mycelial growth potentially developing between kernel rows',
        'Premature browning and drying of ear silks and husks'
      ],
      nextSteps: [
        'Remove and properly dispose of severely affected ears away from the field.',
        'Harvest mature grain promptly and dry to below 15% moisture to halt rot progression.',
        'Clean and screen harvested grain to discard damaged, moldy kernels before bin storage.',
        'If the problem is widespread, obtain a crop-specific laboratory diagnosis before selecting a fungicide.'
      ],
      prevention: [
        'Use certified/disease-free seed.',
        'Avoid waterlogging and excessive irrigation.',
        'Maintain proper plant spacing and field ventilation.',
        'Remove and properly dispose of severely affected ears.',
        'Control insects that damage maize ears because wounds can allow fungal infection.',
        'Use resistant/tolerant varieties where available.',
        'If the problem is widespread, obtain a crop-specific diagnosis before selecting a fungicide.'
      ],
      whenToSeekExpert: 'If kernel discoloration exceeds 10% of harvested cobs or grain is intended for livestock feed, obtain professional laboratory mycotoxin testing.'
    },
    {
      id: 'leaf_fungal_disease',
      crop: 'Foliar Crop Specimen',
      scientificCrop: 'Plantae (Foliage)',
      disease: 'Leaf Fungal Disease (Necrotic Leaf Spot)',
      scientificName: 'Foliar Necrotic Fungal Pathogen',
      status: 'Possible Disease Detected',
      severity: 'Moderate to High',
      confidenceRange: [88, 95],
      isHealthy: false,
      summary: 'The large brown dead areas indicate a leaf-spot/necrotic fungal problem. The exact disease depends strongly on the crop species.',
      symptoms: [
        'Large, expanding brown to dark necrotic dead areas across the leaf blade',
        'Chlorotic (yellow) halos or margins bordering dead necrotic patches',
        'Brittle, scorched leaf margins curling upward and drying prematurely',
        'Premature foliar senescence and early leaf drop'
      ],
      nextSteps: [
        'Remove infected leaves and collect fallen plant debris from beneath the canopy.',
        'Ensure irrigation is directed strictly at the root zone; avoid wetting leaves.',
        'Prune inner foliage to improve airflow and facilitate quick morning drying.',
        'Apply an appropriate registered fungicide only after identifying the specific crop and disease accurately.'
      ],
      prevention: [
        'Remove infected leaves and fallen plant debris.',
        'Avoid watering directly onto foliage.',
        'Improve sunlight and air circulation by appropriate spacing/pruning.',
        'Don\'t over-irrigate.',
        'Use disease-resistant varieties where available.',
        'Apply an appropriate fungicide only after identifying the crop and disease accurately.'
      ],
      whenToSeekExpert: 'If defoliation exceeds 25% of the plant canopy or stem/twig cankers develop, consult your regional agricultural extension service.'
    },
    {
      id: 'tomato_early_blight',
      crop: 'Tomato',
      scientificCrop: 'Solanum lycopersicum',
      disease: 'Tomato Early Blight',
      scientificName: 'Alternaria solani',
      status: 'Possible Disease Detected',
      severity: 'Moderate',
      confidenceRange: [84, 93],
      isHealthy: false,
      summary: 'Early blight is a prevalent fungal disease that targets solanaceous crops. It typically begins on older, lower foliage and progresses upward, forming distinctive concentric target-ring spots.',
      symptoms: [
        'Small, brown-to-black necrotic spots on older leaves first',
        'Distinctive concentric rings creating a "target-board" or bullseye pattern',
        'Yellow chlorotic halos surrounding lesions',
        'Premature yellowing and drying of lower foliage'
      ],
      nextSteps: [
        'Prune and carefully dispose of infected lower leaves. Do NOT compost diseased foliage.',
        'Avoid overhead irrigation; keep water directly on root zones to reduce leaf wetness duration.',
        'Apply an approved copper-based or bio-fungicide spray in early morning if humidity persists.',
        'Ensure staking and trellising to enhance air circulation through the canopy.'
      ],
      prevention: [
        'Practice a minimum 2 to 3-year crop rotation with non-solanaceous crops.',
        'Apply organic mulch (straw or woodchips) around the base to prevent soil splash onto leaves.',
        'Space plants generously according to variety recommendations for optimum airflow.',
        'Disinfect pruning tools with 70% isopropyl alcohol between plants.'
      ],
      whenToSeekExpert: 'If lesions spread to over 30% of the canopy or stem lesions ("collar rot") appear near ground level, consult your local agricultural extension service for commercial management protocols.'
    },
    {
      id: 'tomato_late_blight',
      crop: 'Tomato',
      scientificCrop: 'Solanum lycopersicum',
      disease: 'Tomato Late Blight',
      scientificName: 'Phytophthora infestans',
      status: 'Possible Disease Detected',
      severity: 'High',
      confidenceRange: [88, 96],
      isHealthy: false,
      summary: 'Late blight is an aggressive water mold pathogen responsible for rapid foliar collapse during cool, damp weather conditions. Prompt intervention is critical to safeguard the harvest.',
      symptoms: [
        'Irregular, dark water-soaked lesions appearing on leaf tips and margins',
        'Delicate white fungal-like sporulation visible on the underside of leaves during high humidity',
        'Rapid browning and collapse of foliage within 48 to 72 hours',
        'Dark greasy lesions extending onto petioles and main stems'
      ],
      nextSteps: [
        'Immediately rogue out and destroy severely blighted plants to prevent spore release.',
        'Strictly avoid working in the field while plants are wet with rain or morning dew.',
        'Apply targeted preventive fungicides registered for oomycetes if neighboring plots report outbreaks.',
        'Bag infected plant debris immediately; never compost or leave culled foliage on field borders.'
      ],
      prevention: [
        'Choose certified disease-resistant tomato varieties with Ph-2 or Ph-3 resistance genes.',
        'Destroy volunteer tomato and potato plants in spring.',
        'Maintain wide plant spacing and optimize row orientation for prevailing winds.',
        'Monitor local plant disease warning alerts during wet spells.'
      ],
      whenToSeekExpert: 'Because Late Blight spreads rapidly by windborne sporangia across entire communities, report verified outbreaks immediately to your regional agricultural extension agent.'
    },
    {
      id: 'potato_early_blight',
      crop: 'Potato',
      scientificCrop: 'Solanum tuberosum',
      disease: 'Potato Early Blight',
      scientificName: 'Alternaria solani',
      status: 'Possible Disease Detected',
      severity: 'Moderate',
      confidenceRange: [82, 91],
      isHealthy: false,
      summary: 'Potato early blight causes foliar stress and early senescence, reducing tuber size and storage quality if left unmanaged during tuber bulking.',
      symptoms: [
        'Circular to angular dark brown spots restricted by leaf veins',
        'Concentric ridges within lesions creating a characteristic target shape',
        'Yellowing of tissue surrounding necrotic areas',
        'Premature defoliation starting from the lower canopy'
      ],
      nextSteps: [
        'Maintain balanced nitrogen and potassium fertilization to reduce vine stress.',
        'Schedule irrigation in the early morning so leaves dry quickly under sunlight.',
        'Apply protective bio-fungicide or copper sulfate spray according to label rates.',
        'Scout fields bi-weekly to track lesion progression rate.'
      ],
      prevention: [
        'Use certified disease-free seed tubers.',
        'Rotate crops with legumes, cereals, or brassicas for at least 3 years.',
        'Ensure proper hill sizing to keep maturing tubers protected from spore wash-in.',
        'Destroy cull piles away from potato production fields.'
      ],
      whenToSeekExpert: 'Consult an agronomist if tuber rot symptoms or extensive stem lesions develop during early vegetative growth.'
    },
    {
      id: 'potato_late_blight',
      crop: 'Potato',
      scientificCrop: 'Solanum tuberosum',
      disease: 'Potato Late Blight',
      scientificName: 'Phytophthora infestans',
      status: 'Possible Disease Detected',
      severity: 'High',
      confidenceRange: [87, 95],
      isHealthy: false,
      summary: 'The historic cause of the Irish Potato Famine, late blight remains one of the most destructive potato pathogens worldwide, attacking foliage, stems, and tubers.',
      symptoms: [
        'Water-soaked dark lesions spreading rapidly across foliage',
        'White mildew-like growth on the lower leaf surface under humid conditions',
        'Foliage quickly turns brown, shrivels, and emits a distinct earthy odor',
        'Brownish-red dry rot penetrating the skin of tubers'
      ],
      nextSteps: [
        'Immediately destroy infected foliage to prevent spores washing into the soil and infecting tubers.',
        'Apply specialized anti-oomycete protective treatments if weather conditions favor disease spread.',
        'Delay tuber harvest until at least 2 weeks after all vine death to allow skin set.',
        'Inspect harvested potatoes carefully before moving into storage.'
      ],
      prevention: [
        'Plant only certified disease-tested seed potatoes.',
        'Maintain well-drained soil and eliminate standing water.',
        'Monitor weather forecasts for temperature (15–20°C) and relative humidity (>90%).',
        'Eradicate volunteer potato plants in adjacent ditches.'
      ],
      whenToSeekExpert: 'Immediate notification of local cooperative extension advisors is recommended to prevent community-wide crop loss.'
    },
    {
      id: 'apple_leaf_spot',
      crop: 'Apple',
      scientificCrop: 'Malus domestica',
      disease: 'Apple Leaf Spot',
      scientificName: 'Venturia inaequalis / Botryosphaeria obtusa',
      status: 'Possible Disease Detected',
      severity: 'Moderate',
      confidenceRange: [80, 89],
      isHealthy: false,
      summary: 'Leaf spot in apple orchards (such as Frogeye leaf spot or apple scab) weakens tree vigor, induces early leaf drop, and can blemish fruit finish.',
      symptoms: [
        'Small purple specks on upper leaf surfaces expanding into circular spots',
        'Centers of spots turn tan or light brown with a dark purple margin ("frogeye")',
        'Severely spotted leaves turn yellow and drop prematurely in midsummer',
        'Occasional dark sunken lesions on bark and branches'
      ],
      nextSteps: [
        'Prune out dead wood, cankers, and mummified fruit during the dormant season.',
        'Rake and shred or compost fallen apple leaves in autumn to disrupt overwintering fungal spores.',
        'Apply an organic sulfur or copper spray during the silver tip to pink bud stages if permitted.',
        'Prune the tree canopy to allow sunlight and wind penetration.'
      ],
      prevention: [
        'Choose scab-resistant varieties (such as Liberty, Enterprise, or Freedom) for new plantings.',
        'Avoid overhead sprinkler irrigation in the orchard.',
        'Mow orchard floor regularly to speed leaf breakdown.',
        'Maintain balanced soil pH and fertility based on annual soil tests.'
      ],
      whenToSeekExpert: 'If cankers girdle main scaffolds or extensive fruit rot occurs, consult a commercial fruit specialist for orchard sanitation programs.'
    },
    {
      id: 'corn_leaf_blight',
      crop: 'Corn (Maize)',
      scientificCrop: 'Zea mays',
      disease: 'Corn Northern Leaf Blight',
      scientificName: 'Exserohilum turcicum',
      status: 'Possible Disease Detected',
      severity: 'Moderate',
      confidenceRange: [85, 92],
      isHealthy: false,
      summary: 'Northern corn leaf blight causes cigar-shaped necrotic lesions on leaves, reducing active photosynthetic area and potentially decreasing grain test weight.',
      symptoms: [
        'Long, elliptical grayish-green or tan lesions measuring 2 to 15 cm',
        'Lesions run parallel to leaf margins with smooth edges',
        'Dark spore production visible inside lesions during humid mornings',
        'Coalescing of lesions causing extensive blight in severe cases'
      ],
      nextSteps: [
        'Assess whether lesions have reached the ear leaf during critical silking and grain-fill stages.',
        'Maintain soil nitrogen to prevent premature nutrient deficiency in stressed plants.',
        'Tillage or residue management after harvest to bury infected corn stubble.',
        'Document the field location for next season crop planning.'
      ],
      prevention: [
        'Select hybrid corn seeds bred with Ht resistance genes.',
        'Rotate with soybeans, wheat, or cover crops for at least one full growing cycle.',
        'Manage residue where conservation tillage is practiced.',
        'Optimize planting density to reduce canopy microclimate humidity.'
      ],
      whenToSeekExpert: 'If lesions appear at or above the ear leaf prior to tasseling, consult an agricultural field scout to determine economic threshold benefits.'
    },
    {
      id: 'grape_leaf_disease',
      crop: 'Grapevine',
      scientificCrop: 'Vitis vinifera',
      disease: 'Grape Downy Mildew',
      scientificName: 'Plasmopara viticola',
      status: 'Possible Disease Detected',
      severity: 'Moderate',
      confidenceRange: [83, 91],
      isHealthy: false,
      summary: 'Downy mildew is an oomycete disease that thrives in humid climates, threatening grapevine foliage, flower clusters, and young berries.',
      symptoms: [
        'Yellowish translucent "oil spots" on the upper leaf surface',
        'Dense, cottony white downy growth on the underside directly below oil spots',
        'Infected leaf areas later turn chocolate brown and necrotic',
        'Shoots become thickened, distorted, and eventually brown'
      ],
      nextSteps: [
        'Tuck canes and manage vineyard canopy to ensure maximum airflow and sunlight.',
        'Apply copper or phosphonate sprays following significant rain events if leaves remain wet.',
        'Remove shoot suckers near ground level where splash dispersal begins.',
        'Keep vineyard floor mowed low.'
      ],
      prevention: [
        'Plant vineyards on well-drained slopes with good air drainage.',
        'Select less susceptible grape cultivars suited for regional climate.',
        'Install drip irrigation rather than overhead sprinklers.',
        'Apply dormant sprays to suppress overwintering oospores in fallen leaves.'
      ],
      whenToSeekExpert: 'If berry clusters become infected with gray rot or extensive defoliation threatens ripening, contact an enology/viticulture advisor.'
    },
    {
      id: 'healthy_crop',
      crop: 'General Crop (Healthy)',
      scientificCrop: 'Plantae',
      disease: 'Healthy Crop Foliage',
      scientificName: 'Normal Vegetative Tissue',
      status: 'Healthy Crop',
      severity: 'Optimal',
      confidenceRange: [92, 98],
      isHealthy: true,
      summary: 'No significant pathogenic foliar symptoms detected. The leaf exhibits uniform chlorophyll pigmentation, intact vascular venation, and healthy cell turgor.',
      symptoms: [
        'Uniform green pigmentation without chlorosis or yellowing',
        'Absence of fungal spots, lesions, or water-soaked patches',
        'Intact leaf margins and healthy cuticle structure',
        'Normal leaf morphology consistent with healthy growth stage'
      ],
      nextSteps: [
        'Continue regular field scouting and routine crop monitoring.',
        'Maintain balanced moisture and avoid both drought and waterlogging.',
        'Ensure proper nutrient management based on crop growth phase.',
        'Document healthy baseline scans in your Crop Doctor history.'
      ],
      prevention: [
        'Maintain proactive crop scouting once per week.',
        'Keep field borders weed-free to minimize insect vector habitats.',
        'Use clean irrigation water and clean farm machinery between fields.',
        'Store organic mulch and amendments safely away from standing water.'
      ],
      whenToSeekExpert: 'No urgent consultation needed. Continue regular collaboration with your local farm advisor during routine seasonal checkups.'
    }
  ];

  function getRandomConfidence(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

      function pickConditionForImage(imageName = '') {
    const lower = (imageName || '').toLowerCase();
    
    // 1. Aphid infestation
    if (lower.includes('aphid') || lower.includes('pest') || lower.includes('cast-skin') || lower.includes('banana')) {
      return DEMO_CONDITIONS.find(c => c.id === 'aphid_infestation');
    }
    // 2. Maize ear problem
    if (lower.includes('maize') || lower.includes('corn-ear') || lower.includes('ear') || lower.includes('cob') || lower.includes('kernel')) {
      return DEMO_CONDITIONS.find(c => c.id === 'maize_ear_problem');
    }
    // 3. Leaf fungal disease
    if (lower.includes('leaf-fungal') || lower.includes('black-rot') || lower.includes('apple') || lower.includes('spot') || lower.includes('necrotic') || lower.includes('scorch')) {
      return DEMO_CONDITIONS.find(c => c.id === 'leaf_fungal_disease');
    }

    // Standard demo presets
    if (lower.includes('healthy')) {
      return DEMO_CONDITIONS.find(c => c.id === 'healthy_crop');
    }
    if (lower.includes('potato')) {
      return DEMO_CONDITIONS.find(c => c.id === 'potato_early_blight');
    }
    if (lower.includes('grape')) {
      return DEMO_CONDITIONS.find(c => c.id === 'grape_leaf_disease');
    }
    if (lower.includes('tomato')) {
      return DEMO_CONDITIONS.find(c => c.id === 'tomato_early_blight');
    }

    const randomIndex = Math.floor(Math.random() * DEMO_CONDITIONS.length);
    return DEMO_CONDITIONS[randomIndex];
  }

  async function analyzeCropImage(imageSource, imageName = '', onProgress = null) {
    const steps = [
      { percent: 20, msg: 'Reading crop imagery and color spectrum...' },
      { percent: 45, msg: 'Segmenting leaf venation and surface patterns...' },
      { percent: 75, msg: 'Evaluating against botanical neural network (Demo Dataset)...' },
      { percent: 95, msg: 'Synthesizing agronomic recommendations...' },
      { percent: 100, msg: 'Diagnosis complete!' }
    ];

    for (let i = 0; i < steps.length; i++) {
      if (typeof onProgress === 'function') {
        onProgress({
          step: i + 1,
          totalSteps: steps.length,
          percent: steps[i].percent,
          message: steps[i].msg
        });
      }
      await new Promise(resolve => setTimeout(resolve, 400));
    }

    const condition = pickConditionForImage(imageName);
    const confidence = getRandomConfidence(condition.confidenceRange[0], condition.confidenceRange[1]);
    const analysisId = 'CD-' + Date.now().toString(36).toUpperCase() + '-' + Math.floor(Math.random() * 899 + 100);

    const result = {
      id: analysisId,
      timestamp: new Date().toISOString(),
      formattedDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      crop: condition.crop,
      scientificCrop: condition.scientificCrop,
      conditionName: condition.disease,
      scientificName: condition.scientificName,
      status: condition.status,
      severity: condition.severity,
      confidence: confidence,
      isHealthy: condition.isHealthy,
      summary: condition.summary,
      symptoms: condition.symptoms,
      nextSteps: condition.nextSteps,
      prevention: condition.prevention,
      whenToSeekExpert: condition.whenToSeekExpert,
      imageSource: imageSource,
      isDemoAnalysis: true,
      engineVersion: 'Crop Doctor Botanical Neural Net v1.2 (Demo Edition)'
    };

    return result;
  }

  return {
    analyzeCropImage,
    getAllDemoConditions: () => [...DEMO_CONDITIONS],
    getConditionById: (id) => DEMO_CONDITIONS.find(c => c.id === id)
  };
})();
