-- ============================================================
-- 003_rls_policies.sql
-- ============================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.import_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Owner can do all" ON public.apps FOR ALL USING (auth.uid() = owner_id);
CREATE POLICY "Public apps viewable" ON public.apps FOR SELECT USING (is_public = TRUE);

CREATE POLICY "Owner can manage versions" ON public.app_versions FOR ALL
  USING (EXISTS (SELECT 1 FROM public.apps WHERE apps.id = app_versions.app_id AND apps.owner_id = auth.uid()));

CREATE POLICY "Owner can manage entities" ON public.app_entities FOR ALL
  USING (EXISTS (SELECT 1 FROM public.apps WHERE apps.id = app_entities.app_id AND apps.owner_id = auth.uid()));

CREATE POLICY "Owner can manage data" ON public.app_data FOR ALL
  USING (EXISTS (SELECT 1 FROM public.apps WHERE apps.id = app_data.app_id AND apps.owner_id = auth.uid()));

CREATE POLICY "Owner can manage pages" ON public.app_pages FOR ALL
  USING (EXISTS (SELECT 1 FROM public.apps WHERE apps.id = app_pages.app_id AND apps.owner_id = auth.uid()));

CREATE POLICY "Owner can manage imports" ON public.import_jobs FOR ALL
  USING (EXISTS (SELECT 1 FROM public.apps WHERE apps.id = import_jobs.app_id AND apps.owner_id = auth.uid()));

CREATE POLICY "Users see own notifications" ON public.notifications FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Owner can manage workflows" ON public.workflows FOR ALL
  USING (EXISTS (SELECT 1 FROM public.apps WHERE apps.id = workflows.app_id AND apps.owner_id = auth.uid()));

CREATE POLICY "Owner can see runs" ON public.workflow_runs FOR ALL
  USING (EXISTS (
    SELECT 1
    FROM public.workflows w
    JOIN public.apps a ON a.id = w.app_id
    WHERE w.id = workflow_runs.workflow_id AND a.owner_id = auth.uid()
  ));
