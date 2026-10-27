# Legends n Myths

Landing page for **Legends n Myths**, a kids' channel of Asian and Southeast-Asian legends told as
two-minute shadow-puppet shorts. The hero is a live wayang screen: it plays the first legend,
*Sangkuriang*, in six captioned scenes, and you hold the lamp. Move your mouse or finger (or use the
arrow keys) and every shadow swings, grows and softens by how close its puppet is held to the light.

The look comes from the channel's video engine (the `shadow-puppet-video` skill): the same lamp
gradient, ink, gel colours and typefaces. Design decisions are written down in [DESIGN.md](DESIGN.md).

## Stack

React 18 + TypeScript + Vite, plain CSS. Every puppet is an SVG drawn in code, so there are no image assets.

```sh
npm install
npm run dev        # local dev server
npm run build      # type-check + production build into dist/
npm run preview    # serve the build
```

The build uses a relative base path, so `dist/` can be hosted from any sub-path (GitHub Pages, Vercel, Netlify).
`npm run build` also prerenders every page to static HTML (`scripts/prerender.mjs`), so the pages read
without JavaScript; React then hydrates them.

## Pages

| URL | Page |
|---|---|
| `/` | Landing page |
| `/privacy/` | Privacy Policy (also covers the YouTube API Services / TikTok Content Posting API upload tool) |
| `/terms/` | Terms of Service |

Use the full `/privacy/` and `/terms/` URLs of the deployed site wherever a platform asks for them
(Google Cloud OAuth consent screen, TikTok for Developers app).

## Where things live

| Path | What |
|---|---|
| `src/content.ts` | Channel links and contact email, the hero story beats, the episode programme, workshop steps, notes for parents |
| `src/legal.ts` | Privacy Policy and Terms of Service text and their effective date |
| `src/components/LegalPage.tsx`, `SiteChrome.tsx` | Policy page layout; shared header and footer |
| `src/components/puppets.tsx` | Puppet silhouettes, ink, gels and lamp colours |
| `src/components/ShadowStage.tsx` | The interactive shadow screen |
| `src/components/PuppetTile.tsx` | A single puppet on lamp-lit cloth (programme, explorer, finale) |
| `src/styles.css` | Theme tokens (light parchment / dark lamplight) and layout |

Channels: [YouTube @Legends-n-Myths](https://www.youtube.com/@Legends-n-Myths) and [TikTok @legendsmyths3](https://www.tiktok.com/@legendsmyths3).
Set `CHANNEL.email` in `src/content.ts` to show a contact email on the policy pages (they point to the channels until then).

## Agent skills

Project skills for Claude Code are installed under `.agents/skills/` (symlinked into `.claude/skills/`)
and recorded in `skills-lock.json`. They were installed with the `skills` CLI:

```sh
npx -y skills add vercel-labs/skills --skill find-skills --agent claude-code
npx -y skills add obra/superpowers --agent claude-code --all
npx -y skills add pbakaus/impeccable --agent claude-code --all
npx -y skills add https://github.com/iamneilroberts/claude-skills/tree/main/skills/task-observer --agent claude-code --all
npx -y skills add leonxlnx/taste-skill --agent claude-code --all
npx -y skills add vercel-labs/agent-skills --agent claude-code --all
npx -y skills add microsoft/playwright-cli --agent claude-code --all
npx -y skills add thedotmack/claude-mem --agent claude-code --all
```

- `thedotmack/claude-mem` is mainly a Claude Code plugin with a background memory worker. The skills
  above are its skill files only; for persistent memory, install the plugin itself
  (`/plugin marketplace add thedotmack/claude-mem`, then `/plugin install claude-mem`).
- `voltagent/awesome-design-md` has no skills. It is a collection of `DESIGN.md` files, so this
  project follows its format in [DESIGN.md](DESIGN.md) instead.
- From `microsoft/playwright-cli`, only `playwright-cli` is kept; that repo's internal `dev` skill is for maintaining the CLI itself.
