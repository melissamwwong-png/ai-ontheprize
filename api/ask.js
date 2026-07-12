// The "locked room": browser never sees the API key.
// It only talks to /api/ask, and this function talks to Anthropic on its behalf.
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({
      error:
        'ANTHROPIC_API_KEY is not set on this Vercel project. Add it under Project Settings > Environment Variables, then redeploy.',
    });
    return;
  }

  try {
    const { prompt, useSearch } = req.body || {};
    if (!prompt) {
      res.status(400).json({ error: 'Missing prompt' });
      return;
    }

    const payload = {
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    };
    if (useSearch) {
      payload.tools = [{ type: 'web_search_20250305', name: 'web_search' }];
    }

    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(payload),
    });

    const text = await r.text();
    if (!r.ok) {
      res.status(r.status).json({ error: text });
      return;
    }
    res.status(200).send(text);
  } catch (e) {
    res.status(500).json({ error: String(e && e.message ? e.message : e) });
  }
};
