-- Run this whole file once in Supabase → SQL Editor → New query → Run.

-- 1. Where each device's push subscription is stored.
create table if not exists push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  endpoint text not null unique,
  p256dh text not null,
  auth_key text not null,
  created_at timestamptz not null default now()
);
alter table push_subscriptions enable row level security;
create policy "own push subscriptions" on push_subscriptions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 2. Prevents sending the same reminder twice.
create table if not exists notification_log (
  user_id uuid not null,
  ref_key text not null,
  sent_at timestamptz not null default now(),
  primary key (user_id, ref_key)
);
alter table notification_log enable row level security;
-- No policies added on purpose: this table is only ever touched by the
-- server (using the service_role key, which bypasses RLS) — regular users
-- have no reason to read or write it directly.

-- 3. The free cron job — runs every 5 minutes, inside Supabase, at no cost.
-- Requires the pg_cron and pg_net extensions (both included on the free tier).
create extension if not exists pg_cron with schema extensions;
create extension if not exists pg_net with schema extensions;

select cron.schedule(
  'amigo-send-reminders',
  '*/5 * * * *',
  $$
  select net.http_post(
    url := 'https://amigo-lilac.vercel.app/api/send-reminders',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-cron-secret', 'YOUR-CRON-SECRET'
    ),
    body := '{}'::jsonb
  );
  $$
);

-- To check it's running later: select * from cron.job_run_details order by start_time desc limit 10;
-- To stop it:                  select cron.unschedule('amigo-send-reminders');
