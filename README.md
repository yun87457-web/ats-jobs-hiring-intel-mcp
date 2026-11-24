# Unified 6-ATS Jobs, Salary & Hiring Intelligence — REST API & MCP Server

[![Unified 6-ATS Jobs & Hiring Intel MCP connector](https://glama.ai/mcp/connectors/io.github.yun87457-web/ats-jobs-hiring-intel-mcp/badges/score.svg)](https://glama.ai/mcp/connectors/io.github.yun87457-web/ats-jobs-hiring-intel-mcp)

Extract normalized job postings, parsed USD salary & equity ranges, workplace types (`remote`, `hybrid`, `onsite`), and `135+` JD tech-stack hiring signals across **Ashby, Greenhouse, Lever, SmartRecruiters, Workday, and BambooHR** from any company domain or work email.

## Access Channels

- **Apify Store (Batch + Standby + 5,000 Free Jobs/mo):** https://apify.com/spiky_closet/ats-jobs-hiring-intel
- **RapidAPI Hub (REST API, Free Basic Plan):** https://rapidapi.com/HYunLe/api/unified-multi-ats-jobs-salary-hiring-intelligence
- **Official MCP Registry:** `io.github.yun87457-web/ats-jobs-hiring-intel-mcp`

## Verified Performance (50-Company Batch Benchmark)

- **50 mixed companies (`summaryMode: true`):** `42.42 s` runtime, `113.3 MB` peak RAM, `0` errors, automatic deduplication, word-boundary keyword exclusions, and `$0` billing on unfound/non-ATS domains.

## MCP Tools (Streamable HTTP)

Endpoint: `https://spiky-closet--ats-jobs-hiring-intel.apify.actor/mcp`

| Tool | Description |
|---|---|
| `detect_company_ats` | Auto-detect which of the 6 ATS platforms a company uses from a domain or work email (`<400 ms`). |
| `get_company_jobs` | Fetch and filter open roles by `titleKeywords`, `keywords`, `excludeKeywords`, `remoteOnly`, `minSalaryUsd`, `postedWithinDays`, and `mustMentionTech`. |
| `screen_hiring_signals` | Batch score multiple companies by open role count, median USD salary, remote share, department mix, and top tech stack signals. |

## Claude Desktop / Cursor MCP Configuration

```json
{
  "mcpServers": {
    "ats-jobs-hiring-intel": {
      "url": "https://spiky-closet--ats-jobs-hiring-intel.apify.actor/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_APIFY_TOKEN"
      }
    }
  }
}
```

## REST Quick Start (cURL)

```bash
curl -s -X POST "https://unified-multi-ats-jobs-salary-hiring-intelligence.p.rapidapi.com/screen" \
  -H "x-rapidapi-key: YOUR_RAPIDAPI_KEY" \
  -H "x-rapidapi-host: unified-multi-ats-jobs-salary-hiring-intelligence.p.rapidapi.com" \
  -H "Content-Type: application/json" \
  -d '{"companies": ["ramp.com", "datadoghq.com", "stripe.com"]}'
```

## Free n8n Workflow Template

Import the ready-to-run workflow (**Weekly 6-ATS Hiring Velocity, Salary & JD Tech Signal Monitor**): [`n8n-template.json`](./n8n-template.json)

1. Download [`n8n-template.json`](./n8n-template.json) and click **Import from File** in n8n.
2. Add a Generic Header Auth credential (`x-rapidapi-key`) using your free RapidAPI key.
3. Replace the sample domain list and connect your Slack channel.

## Ready-to-Run Presets (Apify Public Tasks)
- [Ashby Job Board, Salary & Tech Stack Scraper](https://apify.com/spiky_closet/ats-jobs-hiring-intel/examples/ashby-job-board-salary-scraper)
- [Greenhouse Careers, Salary & Hiring Signal Scraper](https://apify.com/spiky_closet/ats-jobs-hiring-intel/examples/greenhouse-careers-hiring-scraper)
- [Multi-ATS Company Hiring Velocity & Tech Summary](https://apify.com/spiky_closet/ats-jobs-hiring-intel/examples/multi-ats-hiring-velocity-summary)
