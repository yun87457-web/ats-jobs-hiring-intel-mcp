#!/usr/bin/env python3
import os, sys, json, urllib.request

key = os.environ.get("RAPIDAPI_KEY")
if not key:
    sys.exit("Set RAPIDAPI_KEY first (free tier: https://rapidapi.com/HYunLe/api/unified-multi-ats-jobs-salary-hiring-intelligence)")
companies = sys.argv[1:] or ["ramp.com", "linear.app"]
req = urllib.request.Request(
    "https://unified-multi-ats-jobs-salary-hiring-intelligence.p.rapidapi.com/screen",
    data=json.dumps({"companies": companies}).encode(),
    headers={"Content-Type": "application/json", "x-rapidapi-key": key, "x-rapidapi-host": "unified-multi-ats-jobs-salary-hiring-intelligence.p.rapidapi.com"},
)
with urllib.request.urlopen(req, timeout=25) as r:
    print(json.dumps(json.loads(r.read().decode()), indent=2))
