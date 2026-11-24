---
name: ats-jobs-hiring-intel
description: Auto-detect Ashby, Greenhouse, Lever, SmartRecruiters, Workday, and BambooHR job boards from company domains or work emails and extract open roles, normalized USD salaries, remote share, and 80+ hiring tech signals.
---

# Unified 6-ATS Jobs & Hiring Signals Skill (RoleSignal)

Use this skill whenever the user asks to inspect a company's open engineering/GTM roles, benchmark disclosed salaries and remote ratios, or detect internal tech stacks from job descriptions across Ashby, Greenhouse, Lever, SmartRecruiters, Workday, and BambooHR.

## Company Hiring Summary (`POST /screen`)
```bash
curl -s -X POST "https://unified-multi-ats-jobs-salary-hiring-intelligence.p.rapidapi.com/screen" \
  -H "Content-Type: application/json" \
  -H "x-rapidapi-key: $RAPIDAPI_KEY" \
  -H "x-rapidapi-host: unified-multi-ats-jobs-salary-hiring-intelligence.p.rapidapi.com" \
  -d '{"companies": ["ramp.com", "anthropic.com", "linear.app", "vercel.com"]}'
```

## Remote Streamable HTTP MCP (`mcp.json`)
```json
{
  "mcpServers": {
    "ats-jobs-hiring-intel": {
      "url": "https://spiky-closet--ats-jobs-hiring-intel.apify.actor/mcp",
      "headers": { "Authorization": "Bearer ${APIFY_TOKEN}" }
    }
  }
}
```
