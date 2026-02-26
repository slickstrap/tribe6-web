INSERT INTO public.changelog (version, title, description, functions_affected, status)
VALUES (
  'v1.2.1',
  'Navigation & Portal Refinement',
  '### Home Redirection
- Logged-in users now treat the **Profile Portal** as their default home page.
- Brand logo and "Home" links redirect to `/profile` for authenticated users.

### Breadcrumb System
- Implemented a dynamic breadcrumb system for all internal, admin, and sample pages.
- Provides human-readable paths (e.g., Portal Home > Command Center > Dashboard).
- Integrated into Knowledge Base, Changelog, and Admin management views.

### UI & Navigation
- Added "Back to Portal" shortcuts and refined contextual navigation links.
- Fixed structural inconsistencies in protected public views.
- Restored conditional Navbar visibility for authorized resources.',
  '{"nav-logic", "breadcrumbs"}',
  'deployed'
);
