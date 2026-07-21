export interface DakarDistrict {
  id: string;
  name: string;
  zone: 'Centre' | 'Almadies/Ngor' | 'Banlieue Proche' | 'Grande Banlieue';
  deliveryFeeExpress: number; // In FCFA
  deliveryFeeStandard: number; // In FCFA
  estimatedExpressTime: string; // e.g. "15-20 min"
  isAvailable247: boolean;
}

export const DAKAR_DISTRICTS: DakarDistrict[] = [
  { id: 'almadies', name: 'Les Almadies', zone: 'Almadies/Ngor', deliveryFeeExpress: 1500, deliveryFeeStandard: 1000, estimatedExpressTime: '15-20 min', isAvailable247: true },
  { id: 'ngor', name: 'Ngor / Virage', zone: 'Almadies/Ngor', deliveryFeeExpress: 1500, deliveryFeeStandard: 1000, estimatedExpressTime: '15-20 min', isAvailable247: true },
  { id: 'yoff', name: 'Yoff / Tonghor / Nord Foire', zone: 'Almadies/Ngor', deliveryFeeExpress: 1500, deliveryFeeStandard: 1000, estimatedExpressTime: '15-20 min', isAvailable247: true },
  { id: 'mermoz', name: 'Mermoz / Pyrotechnie', zone: 'Centre', deliveryFeeExpress: 1500, deliveryFeeStandard: 1000, estimatedExpressTime: '15-20 min', isAvailable247: true },
  { id: 'sacre_coeur', name: 'Sacré-Cœur 1, 2, 3 / VDN', zone: 'Centre', deliveryFeeExpress: 1500, deliveryFeeStandard: 1000, estimatedExpressTime: '15-20 min', isAvailable247: true },
  { id: 'ouakam', name: 'Ouakam / Cité Mamelles', zone: 'Almadies/Ngor', deliveryFeeExpress: 1500, deliveryFeeStandard: 1000, estimatedExpressTime: '15-20 min', isAvailable247: true },
  { id: 'point_e', name: 'Point E / Amitié', zone: 'Centre', deliveryFeeExpress: 1500, deliveryFeeStandard: 1000, estimatedExpressTime: '15-20 min', isAvailable247: true },
  { id: 'fann', name: 'Fann Résidence / Fann Hock', zone: 'Centre', deliveryFeeExpress: 1500, deliveryFeeStandard: 1000, estimatedExpressTime: '15-20 min', isAvailable247: true },
  { id: 'plateau', name: 'Dakar Plateau / Sandaga', zone: 'Centre', deliveryFeeExpress: 2000, deliveryFeeStandard: 1500, estimatedExpressTime: '20-25 min', isAvailable247: true },
  { id: 'medina', name: 'Médina / Fass / Colobane', zone: 'Centre', deliveryFeeExpress: 1500, deliveryFeeStandard: 1000, estimatedExpressTime: '15-20 min', isAvailable247: true },
  { id: 'liberte', name: 'Sicap Liberté 1 à 6', zone: 'Centre', deliveryFeeExpress: 1500, deliveryFeeStandard: 1000, estimatedExpressTime: '15-20 min', isAvailable247: true },
  { id: 'dieuppeul', name: 'Dieuppeul / Derklé / Castors', zone: 'Centre', deliveryFeeExpress: 1500, deliveryFeeStandard: 1000, estimatedExpressTime: '15-20 min', isAvailable247: true },
  { id: 'grand_yoff', name: 'Grand Yoff / HLM Grand Yoff', zone: 'Centre', deliveryFeeExpress: 1500, deliveryFeeStandard: 1000, estimatedExpressTime: '15-20 min', isAvailable247: true },
  { id: 'hlm', name: 'HLM / Hann Maristes', zone: 'Centre', deliveryFeeExpress: 1500, deliveryFeeStandard: 1000, estimatedExpressTime: '15-20 min', isAvailable247: true },
  { id: 'parcelles', name: 'Parcelles Assainies (U1 à U26)', zone: 'Banlieue Proche', deliveryFeeExpress: 2000, deliveryFeeStandard: 1500, estimatedExpressTime: '20-25 min', isAvailable247: true },
  { id: 'guediawaye', name: 'Guédiawaye / Golf Sud', zone: 'Banlieue Proche', deliveryFeeExpress: 2000, deliveryFeeStandard: 1500, estimatedExpressTime: '20-25 min', isAvailable247: true },
  { id: 'pikine', name: 'Pikine / Dagoudane / Icotaf', zone: 'Banlieue Proche', deliveryFeeExpress: 2000, deliveryFeeStandard: 1500, estimatedExpressTime: '25-30 min', isAvailable247: true },
  { id: 'keur_massar', name: 'Keur Massar / Jaxaay', zone: 'Grande Banlieue', deliveryFeeExpress: 2500, deliveryFeeStandard: 2000, estimatedExpressTime: '30-35 min', isAvailable247: true },
  { id: 'rufisque', name: 'Rufisque / Bargny', zone: 'Grande Banlieue', deliveryFeeExpress: 3000, deliveryFeeStandard: 2500, estimatedExpressTime: '35-40 min', isAvailable247: true },
  { id: 'diamniadio', name: 'Diamniadio', zone: 'Grande Banlieue', deliveryFeeExpress: 3500, deliveryFeeStandard: 3000, estimatedExpressTime: '40-45 min', isAvailable247: true }
];
