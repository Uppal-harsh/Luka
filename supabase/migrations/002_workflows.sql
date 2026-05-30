-- ============================================================
-- 002_workflows.sql
-- ============================================================

CREATE TABLE public.workflows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  app_id UUID NOT NULL REFERENCES public.apps(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  enabled BOOLEAN DEFAULT TRUE,
  trigger JSONB NOT NULL,
  actions JSONB NOT NULL DEFAULT '[]',
  run_count INTEGER DEFAULT 0,
  last_run TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.workflow_runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workflow_id UUID NOT NULL REFERENCES public.workflows(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'running' CHECK (status IN ('running', 'success', 'error', 'skipped')),
  trigger_data JSONB DEFAULT '{}',
  steps_log JSONB DEFAULT '[]',
  error_msg TEXT,
  duration_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE INDEX idx_workflow_runs_workflow ON public.workflow_runs(workflow_id, created_at DESC);
