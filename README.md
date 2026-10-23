# Portugal – Travel Back in Time
DESN31927 Project 1. Static site + one Vercel function (`api/chat.js`).

## APIs
- **Wikipedia REST (GET)** `/api/rest_v1/page/summary/{title}` – People cards, person pages, "where from" photo, links to the full article
- **Wikipedia REST search (GET)** `/w/rest.php/v1/search/title?q=` – People search box
- **OpenAI Responses API (POST)** via `/api/chat` – chatbot + navigation tools (`go_to_period`, `go_to_person`, `go_to_page`)

## Deploy
1. Push to GitHub, import in Vercel.
2. Env vars: `OPENAI_API_KEY`, `OPENAI_MODEL` (model name from OpenAI docs).
3. Local: `vercel dev`. Never commit keys.

## Add your Figma assets to `images/`
`hero.jpg`, `azores.jpg` (person page side strip), `resources-side.jpg`, and one `<period-id>.jpg` per period (ids in `data/timeline.json`). Missing images fall back to a parchment gradient.

## To do
Fill the `TODO` summaries/events/changes in `data/timeline.json`; replace Resources placeholders; add `quote` / `place` to `data/people.json` where you have them.
