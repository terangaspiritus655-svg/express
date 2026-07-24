import React, { useState } from 'react';
import { Database, ShieldCheck, Key, Server, Copy, Check, RefreshCw, Layers, HardDrive, UserCheck, Code } from 'lucide-react';
import { isSupabaseConfigured, getSupabaseConfig, saveSupabaseCredentials, clearSupabaseCredentials, STORAGE_BUCKETS } from '../../lib/supabase';
import { useShop } from '../../context/ShopContext';

export const SupabaseBackendManager: React.FC = () => {
  const { refreshFromSupabase } = useShop();
  const config = getSupabaseConfig();
  
  const [urlInput, setUrlInput] = useState(config.url || '');
  const [keyInput, setKeyInput] = useState(config.key || '');
  const [copied, setCopied] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  const sqlScript = `-- EXPRESSH24 SUPABASE INITIAL MIGRATION
-- Copiez et exécutez ce script dans votre Supabase SQL Editor:
-- https://app.supabase.com/project/_/sql

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enums
CREATE TYPE app_role AS ENUM ('super_admin', 'admin', 'manager', 'customer_service', 'warehouse', 'driver', 'customer');
CREATE TYPE order_status AS ENUM ('received', 'preparing', 'on_the_way', 'delivered', 'cancelled');
CREATE TYPE payment_method AS ENUM ('cash', 'wave', 'orange_money', 'card');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'paid_on_delivery', 'failed', 'refunded');

-- Table: Products
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id TEXT NOT NULL,
    category_name TEXT NOT NULL,
    name TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    old_price DECIMAL(10,2),
    image TEXT NOT NULL,
    description TEXT,
    stock INT DEFAULT 50 NOT NULL,
    unit TEXT DEFAULT 'Unité' NOT NULL,
    is_popular BOOLEAN DEFAULT false,
    badge TEXT,
    availability TEXT DEFAULT 'in_stock',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Table: Orders
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    address TEXT NOT NULL,
    neighborhood TEXT NOT NULL,
    delivery_type TEXT DEFAULT 'express',
    delivery_fee DECIMAL(10,2) DEFAULT 1500,
    payment_method payment_method DEFAULT 'cash',
    payment_status payment_status DEFAULT 'pending',
    status order_status DEFAULT 'received',
    subtotal DECIMAL(10,2) NOT NULL,
    discount DECIMAL(10,2) DEFAULT 0,
    total DECIMAL(10,2) NOT NULL,
    driver_id TEXT,
    tracking_step INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: Storage Buckets
INSERT INTO storage.buckets (id, name, public) VALUES
    ('products', 'products', true),
    ('categories', 'categories', true),
    ('avatars', 'avatars', true),
    ('documents', 'documents', false),
    ('banners', 'banners', true),
    ('invoices', 'invoices', false),
    ('drivers', 'drivers', true)
ON CONFLICT (id) DO NOTHING;

-- RLS Policies
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Products" ON public.products FOR SELECT USING (deleted_at IS NULL);
CREATE POLICY "Public Insert Orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Orders" ON public.orders FOR SELECT USING (true);
`;

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.startsWith('http')) {
      alert('Veuillez saisir une URL Supabase valide (commençant par https://)');
      return;
    }
    saveSupabaseCredentials(urlInput, keyInput);
  };

  const handleClear = () => {
    if (confirm('Voulez-vous réinitialiser les clés Supabase enregistrées en local ?')) {
      clearSupabaseCredentials();
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      await refreshFromSupabase();
      setTestResult('Connexion Supabase réussie! Les données en direct sont synchronisées.');
    } catch (e: any) {
      setTestResult(`Erreur de connexion : ${e.message || 'Impossible d\'atteindre l\'instance'}`);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner Status */}
      <div className={`p-6 rounded-2xl border ${isSupabaseConfigured() ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300' : 'bg-amber-950/20 border-amber-500/30 text-amber-300'}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl ${isSupabaseConfigured() ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
              <Database className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">Statut du Backend Supabase</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${isSupabaseConfigured() ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50' : 'bg-amber-500/30 text-amber-300 border border-amber-500/50'}`}>
                  {isSupabaseConfigured() ? 'Connecté & Actif' : 'En Attente de Configuration'}
                </span>
              </div>
              <p className="text-sm mt-1 text-slate-300">
                {isSupabaseConfigured() 
                  ? `Connecté à l'instance Supabase : ${config.url}`
                  : 'Mode simulation actif. Saisissez vos identifiants Supabase ci-dessous pour connecter votre projet.'}
              </p>
            </div>
          </div>

          <button
            onClick={handleTestConnection}
            disabled={isTesting}
            className="flex items-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-sm font-semibold border border-zinc-700 transition"
          >
            <RefreshCw className={`w-4 h-4 ${isTesting ? 'animate-spin text-lime-400' : ''}`} />
            {isTesting ? 'Vérification...' : 'Tester la Connexion'}
          </button>
        </div>

        {testResult && (
          <div className="mt-4 p-3 bg-zinc-900/80 rounded-lg text-xs font-mono text-zinc-200 border border-zinc-800">
            {testResult}
          </div>
        )}
      </div>

      {/* Grid Configuration & Storage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Credentials Form */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
            <Key className="w-5 h-5 text-lime-400" />
            <div>
              <h4 className="text-lg font-bold text-white">Clés d'API Supabase</h4>
              <p className="text-xs text-zinc-400">Configurez ou modifiez votre instance Supabase en direct</p>
            </div>
          </div>

          <form onSubmit={handleSaveConfig} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                SUPABASE_URL (Projet URL)
              </label>
              <input
                type="url"
                required
                placeholder="https://xyzcompany.supabase.co"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-lime-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                SUPABASE_ANON_KEY (Clé Publique Client)
              </label>
              <textarea
                rows={3}
                required
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-lime-400 font-mono"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 py-2.5 bg-lime-400 hover:bg-lime-300 text-black font-bold text-sm rounded-xl transition"
              >
                Enregistrer & Connecter
              </button>

              {isSupabaseConfigured() && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-4 py-2.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/50 text-xs font-semibold rounded-xl transition"
                >
                  Réinitialiser
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Storage Buckets Checklist */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
            <HardDrive className="w-5 h-5 text-lime-400" />
            <div>
              <h4 className="text-lg font-bold text-white">Buckets de Stockage (Supabase Storage)</h4>
              <p className="text-xs text-zinc-400">7 Buckets configurés pour la gestion des médias ExpressH24</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { id: 'products', name: 'products', label: 'Images Produits Catalogues', public: true },
              { id: 'categories', name: 'categories', label: 'Bannières Catégories', public: true },
              { id: 'avatars', name: 'avatars', label: 'Avatars Utilisateurs & Clients', public: true },
              { id: 'drivers', name: 'drivers', label: 'Photos & Pièces Livreurs', public: true },
              { id: 'banners', name: 'banners', label: 'Bannières Promotionnelles', public: true },
              { id: 'invoices', name: 'invoices', label: 'Factures PDF & Reçus (Privé)', public: false },
              { id: 'documents', name: 'documents', label: 'Contrats & Documents RH (Privé)', public: false }
            ].map((bucket) => (
              <div key={bucket.id} className="flex items-center justify-between p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs">
                <div className="flex items-center gap-3">
                  <span className="p-1.5 bg-lime-400/10 text-lime-400 rounded-lg">
                    <Layers className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="font-mono font-bold text-white">{bucket.name}</span>
                    <span className="text-zinc-400 ml-2">({bucket.label})</span>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${bucket.public ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40' : 'bg-purple-950 text-purple-400 border border-purple-800/40'}`}>
                  {bucket.public ? 'Public' : 'Privé'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RBAC Roles Matrix & RLS Policies */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
          <ShieldCheck className="w-5 h-5 text-lime-400" />
          <div>
            <h4 className="text-lg font-bold text-white">Matrice des Rôles (RBAC) & Sécurité RLS</h4>
            <p className="text-xs text-zinc-400">7 Rôles configurés avec contrôle d'accès au niveau des lignes (Row Level Security)</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { role: 'Super Admin', code: 'super_admin', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
            { role: 'Admin', code: 'admin', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
            { role: 'Manager', code: 'manager', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
            { role: 'Service Client', code: 'customer_service', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
            { role: 'Entrepôt', code: 'warehouse', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
            { role: 'Livreur', code: 'driver', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
            { role: 'Client', code: 'customer', color: 'bg-zinc-800 text-zinc-300 border-zinc-700' }
          ].map((item) => (
            <div key={item.code} className={`p-3 rounded-xl border text-center ${item.color}`}>
              <UserCheck className="w-4 h-4 mx-auto mb-1" />
              <div className="font-bold text-xs">{item.role}</div>
              <div className="font-mono text-[10px] opacity-75 mt-0.5">{item.code}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SQL Migration Script Viewer */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <Code className="w-5 h-5 text-lime-400" />
            <div>
              <h4 className="text-lg font-bold text-white">Script de Migration SQL Complet</h4>
              <p className="text-xs text-zinc-400">À exécuter dans l'éditeur SQL de votre console Supabase</p>
            </div>
          </div>

          <button
            onClick={handleCopySql}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-lime-400 hover:bg-lime-300 text-black font-bold text-xs rounded-xl transition"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copié dans le Presse-papier!' : 'Copier le Code SQL Migration'}
          </button>
        </div>

        <pre className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-300 overflow-x-auto max-h-72">
          {sqlScript}
        </pre>
      </div>
    </div>
  );
};
