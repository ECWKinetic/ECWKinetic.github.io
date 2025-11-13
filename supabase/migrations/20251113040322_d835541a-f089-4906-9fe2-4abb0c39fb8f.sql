-- Create function to update timestamps
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create user profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  full_name text,
  user_type text check (user_type in ('talent', 'customer')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies: Users can read/update their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, user_type)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'user_type'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create talent profiles table
create table public.talent_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null unique,
  skills text[],
  experience_years integer,
  availability text,
  linkedin_url text,
  resume_url text,
  bio text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.talent_profiles enable row level security;

create policy "Talent can view own profile"
  on public.talent_profiles for select
  using (auth.uid() = user_id);

create policy "Talent can update own profile"
  on public.talent_profiles for update
  using (auth.uid() = user_id);

create policy "Talent can insert own profile"
  on public.talent_profiles for insert
  with check (auth.uid() = user_id);

-- Create project briefs table
create table public.project_briefs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  company_name text,
  project_title text not null,
  project_description text not null,
  required_skills text[],
  budget_range text,
  timeline text,
  status text default 'draft' check (status in ('draft', 'submitted', 'in_review', 'matched')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.project_briefs enable row level security;

create policy "Users can view own briefs"
  on public.project_briefs for select
  using (auth.uid() = user_id);

create policy "Users can create own briefs"
  on public.project_briefs for insert
  with check (auth.uid() = user_id);

create policy "Users can update own briefs"
  on public.project_briefs for update
  using (auth.uid() = user_id);

-- Add timestamp update triggers
create trigger update_profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.update_updated_at_column();

create trigger update_talent_profiles_updated_at
  before update on public.talent_profiles
  for each row
  execute function public.update_updated_at_column();

create trigger update_project_briefs_updated_at
  before update on public.project_briefs
  for each row
  execute function public.update_updated_at_column();