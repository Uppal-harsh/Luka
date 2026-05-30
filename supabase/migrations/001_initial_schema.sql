-- ============================================================
-- 001_initial_schema.sql
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  github_username TEXT,
  github_token TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'team', 'enterprise')),
  preferred_lang TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TABLE public.apps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  icon TEXT DEFAULT '🚀',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'building', 'live', 'error', 'archived')),
  config JSONB NOT NULL DEFAULT '{}',
  resolved_config JSONB,
  schema_version TEXT DEFAULT '1.0',
  is_public BOOLEAN DEFAULT FALSE,
  github_repo TEXT,
  last_deployed TIMESTAMPTZ,
  deploy_url TEXT,
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_apps_owner ON public.apps(owner_id);
CREATE INDEX idx_apps_status ON public.apps(status);
CREATE INDEX idx_apps_config_gin ON public.apps USING GIN(config);
CREATE INDEX idx_apps_slug ON public.apps(slug);

CREATE TABLE public.app_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  app_id UUID NOT NULL REFERENCES public.apps(id) ON DELETE CASCADE,
  version INTEGER NOT NULL,
  config JSONB NOT NULL,
  diff_summary TEXT,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(app_id, version)
);

CREATE INDEX idx_app_versions_app ON public.app_versions(app_id);

CREATE TABLE public.app_entities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  app_id UUID NOT NULL REFERENCES public.apps(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  label TEXT,
  fields JSONB NOT NULL DEFAULT '[]',
  relations JSONB DEFAULT '[]',
  indexes JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.app_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  app_id UUID NOT NULL REFERENCES public.apps(id) ON DELETE CASCADE,
  entity_name TEXT NOT NULL,
  row_data JSONB NOT NULL DEFAULT '{}',
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_app_data_app_entity ON public.app_data(app_id, entity_name);
CREATE INDEX idx_app_data_gin ON public.app_data USING GIN(row_data);

CREATE TABLE public.app_pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  app_id UUID NOT NULL REFERENCES public.apps(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  layout JSONB NOT NULL DEFAULT '{}',
  is_home BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.import_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  app_id UUID NOT NULL REFERENCES public.apps(id) ON DELETE CASCADE,
  entity_name TEXT NOT NULL,
  file_name TEXT,
  storage_path TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'done', 'error')),
  row_count INTEGER,
  error_log JSONB DEFAULT '[]',
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  app_id UUID REFERENCES public.apps(id) ON DELETE SET NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  read BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON public.notifications(user_id, read, created_at DESC);
