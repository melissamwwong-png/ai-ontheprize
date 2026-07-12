# ai.onthePrize

**A one-person law firm, run by four AI "employees" instead of hired staff.**

## The problem

Legal content is boring. Everyone knows it. The people posting it know it. The people scrolling past it definitely know it.

But in a legal niche, you can't just make it fun. You have to make it accurate. One wrong fact and you've torched your credibility. So most solo creators pick one: either they post dry, verified content nobody watches, or they post fun stuff and quietly hope nobody checks their sources.

ai.onthePrize refuses the tradeoff.

The claymation video makes it watchable, four clay lawyers acting out the case instead of a talking head reading a headline. The AI pipeline makes it defensible. Every hour, four AI roles work the case: one finds the story, one argues it, one formats it for social, and one fact-checks the whole thing before anything goes live. No human in the loop. No prompt required. Just a timestamped log proving the firm was in session while its only partner slept.

Fun content. Verified facts. Built by one person, running on its own.

That's the thing nobody else has figured out how to do yet.

## The departments

| Role | Job | AI does the work of |
|---|---|---|
| **The Bloodhound** | Hunts one real AI-law headline every hour, no prompting needed | Head of Research |
| **The Ghostwriter** | Writes the case/argument around that headline | Head of Copy |
| **The Remixer** | Reshapes the ruling into short-form content (TikTok/Instagram/LinkedIn) | Head of Distribution |
| **The Gavel** | Reviews and stamps every ruling APPROVED or DENIED before it goes live | General Counsel |

## The proof

The site's **Live Docket** section reads directly from a public Google Sheet that the automation writes to every hour — no backend, no login, no manual copy-paste:

- Live feed: [Docket CSV](https://docs.google.com/spreadsheets/d/1NZoVhLLWzGH1Hu62VJmE9k1PpYIbQushs1oVoYoukuc/gviz/tq?tqx=out:csv&sheet=Docket)
- Human-readable sheet: [Docket (Google Sheets)](https://docs.google.com/spreadsheets/d/1NZoVhLLWzGH1Hu62VJmE9k1PpYIbQushs1oVoYoukuc/edit)

Real timestamps on the Docket are the pitch: this firm keeps ruling on AI-law news whether or not anyone is watching.

## How it works (no backend required)

1. An hourly no-code trigger (Zapier or Make.com) fires every hour.
2. It finds one real AI-law headline and scores it for newsworthiness.
3. It writes a new row into the public **Docket** Google Sheet.
4. The site (`index.html`) reads that same Sheet client-side via Google's `gviz` CSV endpoint — no API key, no CORS issues, no server.
5. The Live Docket section on the site updates itself: pulse indicator, "last synced," "next sweep" countdown, and a scrolling ruling log.

## Stack

- Static single-file site: `index.html` (HTML/CSS/vanilla JS)
- Data source: Google Sheets (public, read-only CSV feed)
- Automation: Zapier / Make.com (no-code, hourly schedule)
- Hosting: Vercel

## Running locally

No build step — it's a single static file.

```bash
open index.html
```

Or serve it with any static file server:

```bash
npx serve .
```

## Disclaimer

Educational / satirical content. Not legal advice.
