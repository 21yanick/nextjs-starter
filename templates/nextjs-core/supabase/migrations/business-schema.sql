-- NextJS Core Template - Business Schema
-- Built on top of official Supabase schema (auth, storage already exist)

-- Enable required extensions (may already exist in Supabase image)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users profile table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  stripe_customer_id TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions table (SaaS)
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT UNIQUE NOT NULL,
  stripe_price_id TEXT NOT NULL,
  status TEXT NOT NULL,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table (E-Commerce) - Swiss optimized
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL, -- in Rappen (CHF cents)
  currency TEXT DEFAULT 'CHF',
  image_url TEXT,
  category TEXT,
  stock_quantity INTEGER DEFAULT 0,
  digital BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table (E-Commerce) - Swiss optimized
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, paid, shipped, delivered, cancelled
  total_amount INTEGER NOT NULL, -- in Rappen (CHF cents)
  currency TEXT DEFAULT 'CHF',
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_checkout_session_id TEXT UNIQUE,
  shipping_address JSONB,
  billing_address JSONB,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order items table (E-Commerce)
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL, -- snapshot in case product is deleted
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price INTEGER NOT NULL, -- in Rappen (CHF cents)
  total_price INTEGER NOT NULL, -- in Rappen (CHF cents)
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Appointments table (Booking Systems) - Swiss optimized
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  service_name TEXT NOT NULL,
  service_description TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  price INTEGER, -- in Rappen (CHF cents)
  currency TEXT DEFAULT 'CHF',
  status TEXT DEFAULT 'booked', -- booked, confirmed, completed, cancelled
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles (proper auth.uid() usage)
CREATE POLICY IF NOT EXISTS "Users can view own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY IF NOT EXISTS "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY IF NOT EXISTS "Users can insert own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- RLS Policies for subscriptions
CREATE POLICY IF NOT EXISTS "Users can view own subscriptions" 
  ON public.subscriptions FOR SELECT 
  USING (auth.uid() = user_id);

-- RLS Policies for products (public read)
CREATE POLICY IF NOT EXISTS "Anyone can view active products" 
  ON public.products FOR SELECT 
  USING (active = true);

-- RLS Policies for orders (users can view own orders)
CREATE POLICY IF NOT EXISTS "Users can view own orders" 
  ON public.orders FOR SELECT 
  USING (auth.uid() = customer_id);

CREATE POLICY IF NOT EXISTS "Users can create orders" 
  ON public.orders FOR INSERT 
  WITH CHECK (auth.uid() = customer_id);

-- RLS Policies for order_items (via order relationship)
CREATE POLICY IF NOT EXISTS "Users can view own order items" 
  ON public.order_items FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE orders.id = order_items.order_id 
      AND orders.customer_id = auth.uid()
    )
  );

-- RLS Policies for appointments (users can view/manage own appointments)
CREATE POLICY IF NOT EXISTS "Users can view own appointments" 
  ON public.appointments FOR SELECT 
  USING (auth.uid() = customer_id);

CREATE POLICY IF NOT EXISTS "Users can create appointments" 
  ON public.appointments FOR INSERT 
  WITH CHECK (auth.uid() = customer_id);

CREATE POLICY IF NOT EXISTS "Users can update own appointments" 
  ON public.appointments FOR UPDATE 
  USING (auth.uid() = customer_id);

-- Automatic profile creation trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger (IF NOT EXISTS equivalent)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Storage buckets (may already exist from Supabase base setup)
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('avatars', 'avatars', true),
  ('user-uploads', 'user-uploads', false),
  ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Success message
SELECT 'NextJS Core Template business schema initialized successfully on Supabase!' as result;