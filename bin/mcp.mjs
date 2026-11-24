#!/usr/bin/env node
/**
 * RoleSignal — Unified 6-ATS Jobs & Hiring Intelligence MCP Server (Zero-Dependency Node.js 18+ MCP stdio Server)
 *
 * Run locally via:
 *   npx -y github:yun87457-web/ats-jobs-hiring-intel-mcp
 *
 * Authentication (choose one):
 *   - APIFY_TOKEN   (Apify Standby Streamable HTTP MCP backend — Free tier available)
 *   - RAPIDAPI_KEY  (RapidAPI REST backend — Free Basic plan available)
 */
import readline from "node:readline";

const SERVER_NAME = "rolesignal-ats-jobs-intel-mcp";
const SERVER_VERSION = "1.1.1";
const APIFY_MCP_URL = process.env.MCP_ENDPOINT_OVERRIDE || "https://spiky-closet--ats-jobs-hiring-intel.apify.actor/mcp";
const APIFY_URL = "https://apify.com/spiky_closet/ats-jobs-hiring-intel";
const RAPIDAPI_URL = "https://rapidapi.com/HYunLe/api/unified-multi-ats-jobs-salary-hiring-intelligence";
const RAPIDAPI_HOST = "unified-multi-ats-jobs-salary-hiring-intelligence.p.rapidapi.com";
const REST_BASE_URL = process.env.REST_BASE_OVERRIDE || `https://${RAPIDAPI_HOST}`;
const TOOLS = [
  {
    "description": "Fetch live normalized job postings across 6 ATS platforms (Ashby, Greenhouse, Lever, SmartRecruiters, Workday, BambooHR) from company domains, work emails, career URLs, or ATS slugs. Extracts normalized annual USD salaries, equity signals, workplace type, seniority, department, and 80+ JD tech-stack signals.",
    "inputSchema": {
      "properties": {
        "companies": {
          "description": "Company domains, work emails, career URLs, or ATS slugs (e.g. ['ramp.com', 'stripe.com', 'workday:nvidia:wd5:NVIDIAExternalCareerSite']).",
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "company": {
          "description": "Single company convenience field.",
          "type": "string"
        },
        "departments": {
          "description": "Filter by department (e.g. ['Engineering', 'Sales']).",
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "excludeKeywords": {
          "description": "Exclude jobs matching ANY keyword.",
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "includeDescriptionText": {
          "default": false,
          "description": "Include plain-text job description excerpt.",
          "type": "boolean"
        },
        "keywords": {
          "description": "Keep jobs matching ANY keyword (title, department, location, JD).",
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "locations": {
          "description": "Filter by location substring (e.g. ['New York', 'London']).",
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "maxJobsPerCompany": {
          "default": 0,
          "description": "Max jobs per company (0 = unlimited).",
          "type": "integer"
        },
        "maxResults": {
          "default": 25,
          "description": "Hard cap on total returned jobs (default 25 for MCP).",
          "type": "integer"
        },
        "minSalaryUsd": {
          "default": 0,
          "description": "Minimum annualized USD salary floor.",
          "type": "integer"
        },
        "mustMentionTech": {
          "description": "Keep jobs mentioning ANY listed tech in JD (e.g. ['Python', 'Kubernetes', 'PyTorch']).",
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "postedWithinDays": {
          "default": 0,
          "description": "Keep only jobs published within the last N days (0 = disabled; excludes jobs with missing/unparseable publishedAt when > 0).",
          "type": "integer"
        },
        "remoteOnly": {
          "default": false,
          "description": "Return only remote roles.",
          "type": "boolean"
        },
        "titleKeywords": {
          "description": "Keep jobs whose title matches ANY keyword (case-insensitive substring match against title only).",
          "items": {
            "type": "string"
          },
          "type": "array"
        }
      },
      "type": "object"
    },
    "name": "get_company_jobs",
    "rapidapi": {
      "method": "POST",
      "path": "/jobs"
    }
  },
  {
    "description": "Auto-detect which ATS platform (Ashby, Greenhouse, Lever, SmartRecruiters, Workday, BambooHR), board slug, and public job board URL a company domain, work email, or career page uses.",
    "inputSchema": {
      "properties": {
        "company": {
          "description": "Company domain, work email, career URL, or ATS slug (e.g. 'ramp.com' or 'ceo@stripe.com').",
          "type": "string"
        }
      },
      "required": [
        "company"
      ],
      "type": "object"
    },
    "name": "detect_company_ats",
    "rapidapi": {
      "method": "GET",
      "path": "/detect"
    }
  },
  {
    "description": "Generate 1-row-per-company B2B hiring-signal summaries for 1-50 companies: total open roles, remote share %, department/seniority breakdown, median annualized USD salary, top JD tech stack, and executive/AI/sales/security hiring flags.",
    "inputSchema": {
      "properties": {
        "companies": {
          "description": "Company domains, work emails, career URLs, or ATS slugs.",
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "company": {
          "description": "Single company convenience field.",
          "type": "string"
        },
        "departments": {
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "keywords": {
          "description": "Optional role keywords to measure matchedJobs alongside totalOpenJobs.",
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "locations": {
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "minSalaryUsd": {
          "default": 0,
          "type": "integer"
        },
        "mustMentionTech": {
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "postedWithinDays": {
          "default": 0,
          "description": "Optional freshness window in days for matchedJobs.",
          "type": "integer"
        },
        "remoteOnly": {
          "default": false,
          "type": "boolean"
        },
        "titleKeywords": {
          "description": "Optional title-only keywords to measure matchedJobs.",
          "items": {
            "type": "string"
          },
          "type": "array"
        }
      },
      "type": "object"
    },
    "name": "screen_hiring_signals",
    "rapidapi": {
      "method": "POST",
      "path": "/screen"
    }
  }
];

function writeMsg(msg) {
  process.stdout.write(JSON.stringify(msg) + "\n");
}

async function proxyApifyMcp(payload, token) {
  const res = await fetch(APIFY_MCP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json, text/event-stream",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Apify MCP HTTP ${res.status}: ${text.slice(0, 300)}`);
  }
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("text/event-stream")) {
    const lines = text.split(/\r?\n/).filter((l) => l.startsWith("data:"));
    for (let i = lines.length - 1; i >= 0; i--) {
      const raw = lines[i].slice(5).trim();
      if (raw && raw !== "[DONE]") {
        try { return JSON.parse(raw); } catch {}
      }
    }
    throw new Error("Empty SSE response from Apify MCP endpoint");
  }
  return JSON.parse(text);
}

async function callRapidApi(tool, args, key) {
  const cfg = tool.rapidapi;
  let url = `${REST_BASE_URL}${cfg.path}`;
  const headers = {
    "x-rapidapi-key": key,
    "x-rapidapi-host": RAPIDAPI_HOST
  };
  const init = { method: cfg.method, headers };
  if (cfg.method === "GET") {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(args || {})) {
      if (v !== undefined && v !== null) qs.set(k, String(v));
    }
    if ([...qs.keys()].length > 0) url += `?${qs.toString()}`;
  } else {
    headers["Content-Type"] = "application/json";
    init.body = JSON.stringify(args || {});
  }
  const res = await fetch(url, init);
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`RapidAPI HTTP ${res.status}: ${text.slice(0, 300)}`);
  }
  try {
    return JSON.stringify(JSON.parse(text), null, 2);
  } catch {
    return text;
  }
}

async function handleRequest(msg) {
  const { id, method, params } = msg;
  const hasId = id !== undefined && id !== null;

  if (method === "initialize") {
    if (!hasId) return;
    return writeMsg({
      jsonrpc: "2.0",
      id,
      result: {
        protocolVersion: params?.protocolVersion || "2024-11-05",
        capabilities: { tools: {} },
        serverInfo: { name: SERVER_NAME, version: SERVER_VERSION }
      }
    });
  }

  if (method === "notifications/initialized" || method === "notifications/cancelled") {
    return;
  }

  if (method === "ping") {
    if (!hasId) return;
    return writeMsg({ jsonrpc: "2.0", id, result: {} });
  }

  if (method === "tools/list") {
    if (!hasId) return;
    const apifyToken = process.env.APIFY_TOKEN;
    if (apifyToken) {
      try {
        const remote = await proxyApifyMcp({ jsonrpc: "2.0", id, method: "tools/list", params: params || {} }, apifyToken);
        if (remote?.result?.tools) {
          return writeMsg({ jsonrpc: "2.0", id, result: remote.result });
        }
      } catch (err) {
        process.stderr.write(`[mcp] fallback to local schema: ${err.message}\n`);
      }
    }
    return writeMsg({
      jsonrpc: "2.0",
      id,
      result: {
        tools: TOOLS.map(({ name, description, inputSchema }) => ({ name, description, inputSchema }))
      }
    });
  }

  if (method === "tools/call") {
    if (!hasId) return;
    const toolName = params?.name;
    const args = params?.arguments || {};
    const apifyToken = process.env.APIFY_TOKEN;
    const rapidApiKey = process.env.RAPIDAPI_KEY;

    try {
      if (apifyToken) {
        const remote = await proxyApifyMcp({ jsonrpc: "2.0", id, method: "tools/call", params }, apifyToken);
        if (remote?.result) {
          return writeMsg({ jsonrpc: "2.0", id, result: remote.result });
        }
        if (remote?.error) {
          return writeMsg({ jsonrpc: "2.0", id, error: remote.error });
        }
      }
      if (rapidApiKey) {
        const tool = TOOLS.find((t) => t.name === toolName) || TOOLS[0];
        const out = await callRapidApi(tool, args, rapidApiKey);
        return writeMsg({
          jsonrpc: "2.0",
          id,
          result: { content: [{ type: "text", text: out }] }
        });
      }
      return writeMsg({
        jsonrpc: "2.0",
        id,
        result: {
          isError: true,
          content: [{
            type: "text",
            text: `Missing credentials. Set APIFY_TOKEN (free tier: ${APIFY_URL}) or RAPIDAPI_KEY (free plan: ${RAPIDAPI_URL}) in your MCP client env.`
          }]
        }
      });
    } catch (err) {
      return writeMsg({
        jsonrpc: "2.0",
        id,
        result: {
          isError: true,
          content: [{ type: "text", text: `Error calling ${toolName}: ${err.message}` }]
        }
      });
    }
  }

  if (hasId) {
    writeMsg({
      jsonrpc: "2.0",
      id,
      error: { code: -32601, message: `Method not found: ${method}` }
    });
  }
}

const rl = readline.createInterface({ input: process.stdin, crlfDelay: Infinity });
rl.on("line", (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;
  try {
    const msg = JSON.parse(trimmed);
    handleRequest(msg).catch((err) => {
      process.stderr.write(`[mcp] unhandled error: ${err.message}\n`);
    });
  } catch (err) {
    process.stderr.write(`[mcp] invalid JSON: ${err.message}\n`);
  }
});
