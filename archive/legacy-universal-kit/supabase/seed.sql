-- Development seed data
-- Only run this in development!

-- Test user (password: password123)
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'test@example.com',
  '$2a$10$ZGCRfFOG8/FqhJK4WFOq/e6TgJoqOmKj4rZjFZOhZqXdYKfYxYq1e',
  NOW(),
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- Test profile (will be created automatically by trigger)
-- But we'll ensure it exists
INSERT INTO public.profiles (id, email, full_name)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'test@example.com',
  'Test User'
) ON CONFLICT (id) DO NOTHING;

-- Test subscription
INSERT INTO public.subscriptions (user_id, stripe_subscription_id, stripe_price_id, status, current_period_start, current_period_end)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'sub_test_123',
  'price_test_starter',
  'active',
  NOW(),
  NOW() + INTERVAL '1 month'
) ON CONFLICT (stripe_subscription_id) DO NOTHING;