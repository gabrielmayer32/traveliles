## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)


# Côte Nord — Project Brief

## What this is
A static magazine website for Côte Nord, a French editorial magazine covering 
luxury travel, hospitality, gastronomy, and art de vivre in the Indian Ocean 
(Mauritius focus). Originally founded in 1994, this is a relaunch.

The site is for a non-technical editor who manages all content through a 
git-based CMS at `/admin`. No dashboards, no databases, no servers.

## Stack
- Astro 7 (static output)
- Sveltia CMS (git-based, admin UI at /admin)
- Cloudflare Pages (hosting, repo: gabrielmayer32/travel-iles)
- No framework, no database, no backend

## Content
Two types: articles and videos. Articles have a title, date, category, cover 
image, excerpt, body (markdown), author, tags. Videos have a title, date, 
category, videoSource (youtube or vimeo), videoId, thumbnail, excerpt.

Categories are placeholders until the client fills in her form — currently: 
Hôtellerie, Gastronomie, Art de vivre, Immobilier de luxe, Golf, Écotourisme, 
Culture.

## Design
None implemented yet. A designer will apply the full visual identity via Claude 
Design separately. Keep the codebase easy to style — semantic HTML, CSS custom 
properties for all tokens, no hardcoded colors or fonts.

The brand identity is:
- Navy blue (~#2B3A8F), white background, geometric sans-serif
- All-caps wide-set wordmark "CÔTE NORD"
- Clean, minimal, European luxury feel
- No serifs, no warm tones, no gradients

## CMS
Sveltia CMS. The editor logs in at /admin with her GitHub account via an OAuth 
worker. Config is at public/admin/config.yml. Any change she makes creates a 
git commit → Cloudflare Pages rebuilds automatically → live in ~30 seconds.

## Pending (waiting on client form answers)
- Final site name (may stay Côte Nord)
- Final tagline
- Final category list
- Domain name (currently travel-iles.pages.dev)
- Whether she needs newsletter, bilingual FR/EN, or a partners/advertisers page

## What to never change
- The CMS config structure — the editor depends on it
- The content collection schema — changing field names breaks existing content
- The /admin route — that's how she publishes