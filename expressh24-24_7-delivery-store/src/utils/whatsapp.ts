import { CartItem, CustomerInfo } from '../types';

export const EXPRESS_H24_WHATSAPP_NUMBER = '221776481420';

export function createProductWhatsAppUrl(productName: string, quantity: number, priceFcfa: number, customer?: Partial<CustomerInfo>): string {
  const text = `Bonjour ExpressH24,

Je souhaite commander :

Nom du produit : ${productName}
Quantité : ${quantity}
Prix : ${priceFcfa.toLocaleString('fr-FR')} FCFA

Adresse : ${customer?.address ? `${customer.address} (${customer.district || ''})` : '[À préciser]'}
Téléphone : ${customer?.phone || '[À préciser]'}

Merci !`;

  return `https://wa.me/${EXPRESS_H24_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function createCartWhatsAppUrl(
  items: CartItem[],
  subtotal: number,
  deliveryFee: number,
  total: number,
  customer: CustomerInfo,
  paymentMethodName: string
): string {
  const itemsList = items
    .map(
      (item) =>
        `• ${item.product.name}\n  Quantité : ${item.quantity}\n  Prix unitaire : ${item.product.price.toLocaleString('fr-FR')} FCFA`
    )
    .join('\n\n');

  const text = `Bonjour ExpressH24,

Je souhaite passer la commande suivante :

--- PRODUITS ---
${itemsList}

Sous-total : ${subtotal.toLocaleString('fr-FR')} FCFA
Frais de livraison : ${deliveryFee.toLocaleString('fr-FR')} FCFA
TOTAL À PAYER : ${total.toLocaleString('fr-FR')} FCFA

--- LIVRAISON & CLIENT ---
Nom : ${customer.name}
Téléphone : ${customer.phone}
Adresse : ${customer.address}
Quartier : ${customer.district}
${customer.instructions ? `Instructions : ${customer.instructions}\n` : ''}Paiement : ${paymentMethodName}

Merci de confirmer ma commande ExpressH24 !`;

  return `https://wa.me/${EXPRESS_H24_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
