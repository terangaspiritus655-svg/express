import { Driver } from '../types';

export const INITIAL_DRIVERS: Driver[] = [
  {
    id: 'drv-1',
    name: 'Moussa Diop',
    phone: '+221 77 648 14 20',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    vehicle: 'Scooter Yamasaki 125cc (Jaune Express)',
    licensePlate: 'DK-8492-AB',
    status: 'available',
    rating: 4.9,
    totalDeliveries: 342,
    currentLocation: { lat: 14.7167, lng: -17.4677, quartier: 'Mermoz' }
  },
  {
    id: 'drv-2',
    name: 'Ousmane Sow',
    phone: '+221 78 512 30 90',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    vehicle: 'Scooter Honda Dio 110cc',
    licensePlate: 'DK-1029-CD',
    status: 'delivering',
    rating: 4.8,
    totalDeliveries: 289,
    currentOrderId: 'EXH-2026-8912',
    currentLocation: { lat: 14.7402, lng: -17.5132, quartier: 'Almadies' }
  },
  {
    id: 'drv-3',
    name: 'Ibrahima Ndiaye',
    phone: '+221 76 890 12 45',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    vehicle: 'Scooter TVS Apache Express',
    licensePlate: 'DK-5541-EF',
    status: 'available',
    rating: 5.0,
    totalDeliveries: 412,
    currentLocation: { lat: 14.6937, lng: -17.4441, quartier: 'Plateau' }
  }
];
