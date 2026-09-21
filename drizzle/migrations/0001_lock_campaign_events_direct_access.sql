CREATE POLICY "Campaign events are server managed"
ON public.campaign_events
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);