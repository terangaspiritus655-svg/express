import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { INITIAL_PRODUCTS } from './src/data/products.js';
import { INITIAL_DRIVERS } from './src/data/drivers.js';
import { INITIAL_COUPONS } from './src/data/coupons.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory persistent database for runtime session
  let products = [...INITIAL_PRODUCTS];
  let drivers = [...INITIAL_DRIVERS];
  let coupons = [...INITIAL_COUPONS];
  let orders: any[] = [
    {
      id: 'EXH-2026-8912',
      createdAt: new Date().toISOString(),
      customerName: 'Awa Seck',
      customerPhone: '+221 77 123 45 67',
      customerEmail: 'awa.seck@gmail.com',
      address: 'Villa 142, Rue Mermoz Pyrotechnie',
      neighborhood: 'Mermoz / Pyrotechnie',
      instructions: 'Appeler avant d\'arriver à la grille',
      deliveryType: 'express',
      deliveryFee: 1500,
      paymentMethod: 'wave',
      paymentStatus: 'paid',
      status: 'on_the_way',
      items: [
        { product: INITIAL_PRODUCTS[0], quantity: 1 },
        { product: INITIAL_PRODUCTS[10], quantity: 2 }
      ],
      subtotal: 2200,
      discount: 0,
      total: 3700,
      driverId: 'drv-2',
      estimatedMinutes: 15,
      trackingStep: 3
    }
  ];

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'ExpressH24 Senegal API' });
  });

  // Products API
  app.get('/api/products', (req, res) => {
    res.json(products);
  });

  app.post('/api/products', (req, res) => {
    const newProd = {
      ...req.body,
      id: `prod-${Date.now()}`
    };
    products.unshift(newProd);
    res.status(201).json(newProd);
  });

  app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const index = products.findIndex((p) => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...req.body };
      res.json(products[index]);
    } else {
      res.status(404).json({ error: 'Produit non trouvé' });
    }
  });

  app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    products = products.filter((p) => p.id !== id);
    res.json({ success: true, message: 'Produit supprimé' });
  });

  // Orders API
  app.get('/api/orders', (req, res) => {
    res.json(orders);
  });

  app.get('/api/orders/:id', (req, res) => {
    const order = orders.find((o) => o.id === req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: 'Commande introuvable' });
    }
  });

  app.post('/api/orders', (req, res) => {
    const orderData = req.body;
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const newOrder = {
      ...orderData,
      id: `EXH-2026-${randomDigits}`,
      createdAt: new Date().toISOString(),
      status: 'received',
      trackingStep: 1,
      estimatedMinutes: orderData.deliveryType === 'express' ? 15 : 35
    };
    orders.unshift(newOrder);
    res.status(201).json(newOrder);
  });

  app.patch('/api/orders/:id/status', (req, res) => {
    const { id } = req.params;
    const { status, driverId } = req.body;
    const orderIndex = orders.findIndex((o) => o.id === id);

    if (orderIndex !== -1) {
      let trackingStep = orders[orderIndex].trackingStep;
      if (status === 'received') trackingStep = 1;
      if (status === 'preparing') trackingStep = 2;
      if (status === 'on_the_way') trackingStep = 3;
      if (status === 'delivered') trackingStep = 4;

      orders[orderIndex] = {
        ...orders[orderIndex],
        status,
        trackingStep,
        ...(driverId ? { driverId } : {})
      };
      res.json(orders[orderIndex]);
    } else {
      res.status(404).json({ error: 'Commande introuvable' });
    }
  });

  // Drivers API
  app.get('/api/drivers', (req, res) => {
    res.json(drivers);
  });

  // Coupons API
  app.get('/api/coupons', (req, res) => {
    res.json(coupons);
  });

  // WhatsApp formatted link helper
  app.post('/api/whatsapp-link', (req, res) => {
    const { items, total, customerName, address, phone, neighborhood } = req.body;
    const phoneTarget = '221776481420';

    let message = `Bonjour ExpressH24 🚀,\nJe souhaite commander :\n\n`;
    items.forEach((item: any, idx: number) => {
      message += `${idx + 1}. ${item.product.name}\n   Qté : ${item.quantity} x ${item.product.price} FCFA\n`;
    });
    message += `\n💰 Total : ${total} FCFA\n`;
    message += `📍 Adresse : ${address || 'Dakar'} (${neighborhood || ''})\n`;
    message += `📞 Téléphone : ${phone || ''}\n`;
    if (customerName) message += `👤 Nom : ${customerName}\n`;
    message += `\nMerci de me confirmer la livraison express !`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneTarget}?text=${encoded}`;

    res.json({ url: whatsappUrl, message });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
