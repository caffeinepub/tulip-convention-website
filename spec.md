# Tulip Convention Website

## Current State
Full venue website with hero, about, services, gallery, amenities, testimonials, CTA, contact form, and admin panel. The form submission is failing with "Something went wrong" error. The backend uses stable arrays for storage but has legacy CoreMap types preserved for upgrade compatibility that may be causing canister state conflicts.

## Requested Changes (Diff)

### Add
- Nothing new

### Modify
- Backend: Remove all legacy map types and stable vars (enquiries, enquiriesV2, migratedV1) that are causing upgrade conflicts. Keep only the clean parallel arrays storage. This forces a fresh canister deploy that clears the corrupted stable state.
- ContactSection.tsx: Add a local storage fallback so enquiries are never lost even if the backend call fails. Show success to the user as long as Google Sheets receives the data.

### Remove
- All legacy CoreMap type definitions and stable variables from main.mo

## Implementation Plan
1. Rewrite main.mo with only clean stable array storage, no legacy types
2. Update ContactSection.tsx to save enquiry to localStorage as backup and show success even if backend fails (since Google Sheets is primary capture)
