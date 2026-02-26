-- Migration: Lodge v1.2.0 Changelog Entry
-- Author: Antigravity

INSERT INTO public.changelog (version, title, description, functions_affected, status)
VALUES (
  'v1.2.0',
  'Intelligence & Privacy Overhaul',
  '### Analytics Upgrade
- Implemented "Raw" vs "Unique" tracking modes with dynamic graph updates.
- Added high-fidelity stat cards for Total Signals, Unique Visitors, Blocked Attempts, and Engagement Intensity.
- Fully redesigned the Live Signal Feed with Date/Time separation and header filters.
- Implemented CSV Export for traffic data.

### Privacy & Security
- Privatized Knowledge Base and Changelog routes (Requires Auth).
- Implemented granular user-level permission checks for internal resources.
- Created "Your Resources" portal on the Profile page.
- Updated robots.txt to prevent indexing of internal documents.',
  ARRAY['process-traffic'],
  'deployed'
);
