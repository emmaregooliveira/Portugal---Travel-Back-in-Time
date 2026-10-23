import fs from 'fs';
import path from 'path';

const tools = [
  { type: 'function', name: 'go_to_period', description: 'Open a timeline period page.',
    parameters: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] } },
  { type: 'function', name: 'go_to_person', description: 'Open a person page (English Wikipedia title).',
    parameters: { type: 'object', properties: { wikipedia_title: { type: 'string' } }, required: ['wikipedia_title'] } },
  { type: 'function', name: 'go_to_page', description: 'Open a top-level page.',
    parameters: { type: 'object', properties: { page: { type: 'string', enum: ['home', 'timeline', 'people', 'resources'] } }, required: ['page'] } }
];

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  const tl = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data/timeline.json'), 'utf8'));
  const ctx = tl.map(p => `${p.id}: ${p.title} (${p.dates}) - ${p.summary}`).join('\n');
  const input = (req.body?.messages || []).slice(-10)
    .filter(m => ['user', 'assistant'].includes(m.role) && typeof m.content === 'string')
    .map(m => ({ role: m.role, content: m.content.slice(0, 1000) }));
  const r = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL, input, tools,
      instructions: `You are a concise guide on a Portuguese history website. Answer from the site's timeline when you can and say when you're unsure. When the visitor wants to go somewhere or see a topic, call a go_to_* tool (use the period ids below).\n${ctx}`
    })
  });
  const d = await r.json();
  if (!r.ok) return res.status(502).json({ error: d.error?.message || 'OpenAI error' });
  let text = '', action = null;
  for (const o of d.output || []) {
    if (o.type === 'message') text += o.content.map(c => c.text || '').join('');
    if (o.type === 'function_call') action = { name: o.name, args: JSON.parse(o.arguments) };
  }
  res.json({ text: text || (action ? 'Taking you there…' : ''), action });
}
