# Portugal — Travel Back in Time (chatbot-connected version)

The existing historical website remains intact. Its **Ask the Historian** chat interface now talks to an OpenAI Responses API endpoint via the Vercel serverless function `api/chat.js`. It can also open specific periods, biographies and sections on the website.

## IMPORTANT: The chatbot needs a server and your own API key

A ChatGPT subscription is different from an OpenAI **API** key/billing. Obtain an API key through [the OpenAI developer platform](https://platform.openai.com/api-keys) and configure API billing/usage limits there if required. **Never place the key in `index.html`, `gpt.js`, `app.js`, the GitHub repository, or public Vercel configuration files.**

### Option A — Deploy with GitHub + Vercel (recommended)

1. Put **these project files in your GitHub repository's root** (the folder containing `index.html`, `api/`, `gpt.js`, `data/` and `vercel.json`). Do not upload another outer `portugal/` folder unless Vercel's Root Directory points inside it.
2. In [Vercel](https://vercel.com/), import the repository (or update your existing Vercel project). Choose **Other** as the framework preset.
3. In Vercel **Project → Settings → Environment Variables**, create `OPENAI_API_KEY` with your real OpenAI API key. Optionally set `OPENAI_MODEL` to `gpt-4o-mini` (already the code default). Select Production, Preview, Development as needed.
4. **Redeploy** the project after adding/changing env variables. For an existing deployment, use the Vercel Redeploy action; saving the environment variable alone does not retroactively modify a running deployment.
5. Visit the **Vercel deployment URL**, click **Ask the Historian**, and try "Who was Afonso Henriques?" and "Open the Roman period".

### Option B — Run locally

Install [Node.js](https://nodejs.org/) and the [Vercel CLI](https://vercel.com/docs/cli):

```bash
npm install -g vercel
vercel login
vercel link
```

Copy `.env.example` to `.env.local`, replace the placeholder API key, then run from the **project root**:

```bash
vercel dev
```

Open the local URL Vercel prints (often `http://localhost:3000`). **Opening `index.html` directly or using VS Code Live Server will not run `/api/chat`**, even if the site itself displays.

### What was fixed?

- Added default `gpt-4o-mini` model when `OPENAI_MODEL` is unset.
- Added secure `.env.example` and corrected `.gitignore`.
- Kept OpenAI requests server-side via `api/chat.js`, preventing keys from appearing in browser code.
- Improved missing-key, non-Vercel server, unauthorized-key, rate-limit, and timeout errors.
- Aligned period/person navigation with entries that are available in the on-page directory.
- Bounded conversation context so requests do not grow forever, and preserved message display as plain text.
- Added built-in, dependency-free API integration tests (`npm test`).

### Diagnostic tips

- **"The chatbot isn't connected yet"**: add `OPENAI_API_KEY` in Vercel settings and redeploy.
- **"I can't find /api/chat" / 404**: confirm site is running with Vercel, `api/chat.js` is present, and Vercel Root Directory is the project folder.
- **"credentials need attention"**: double-check the key in Vercel and API account access. Never paste the key into public places.
- **"API limit"**: check your OpenAI API billing/quota, usage limits and rate limits.
- **Failed 500**: check the Function logs in Vercel for the server-side error.
- **ChatGPT Plus** by itself does not include OpenAI API credit. API usage is billed separately according to the developer platform's pricing.

### Other APIs / assets

The website also has static content and external links (including images and reference resources) that operate independently of this chatbot. Images and API endpoints outside this project are not modified.

