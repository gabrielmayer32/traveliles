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


# Travel-Îles — Project Brief

## What this is
A static magazine website for Travel-Îles, a French editorial magazine covering 
travel, hospitality, gastronomy, culture, regional stories, and art de vivre in 
the Indian Ocean (Mauritius focus). The site is video-first, with articles 
supporting and extending the editorial coverage.

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
category, videoSource (youtube, vimeo, facebook, or instagram), videoId, 
thumbnail, excerpt.

Categories are confirmed:
- Un visage, une histoire
- Les gardiens du Savoir Faire
- 24heures avec....
- Maurice demain
- Mémoires de l'Île
- Saveurs
- Nos régions
- Art & culture
- Activités & événements
- Nos Ambassadeurs régionaux
- Nos adresses

## Design
None implemented yet. A designer will apply the full visual identity via Claude 
Design separately. Keep the codebase easy to style — semantic HTML, CSS custom 
properties for all tokens, no hardcoded colors or fonts.

The brand identity is:
- Navy blue (~#2B3A8F), white background, geometric sans-serif
- All-caps wide-set wordmark "TRAVEL-ÎLES"
- Clean, minimal, European luxury feel
- No serifs, no warm tones, no gradients

## CMS
Sveltia CMS. The editor logs in at /admin with her GitHub account via an OAuth 
worker. Config is at public/admin/config.yml. Any change she makes creates a 
git commit → Cloudflare Pages rebuilds automatically → live in ~30 seconds.

## Resolved client decisions
- Final site name: Travel-Îles
- Category list: confirmed 11-category set above
- Video sources: YouTube, Vimeo, Facebook, Instagram
- Editorial positioning: video-first

## Pending
- Domain name (currently travel-iles.pages.dev)
- Whether she needs newsletter, bilingual FR/EN, or a partners/advertisers page

## What to never change
- The CMS config structure — the editor depends on it
- The content collection schema — changing field names breaks existing content
- The /admin route — that's how she publishes
