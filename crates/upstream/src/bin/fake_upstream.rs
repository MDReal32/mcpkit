//! A stand-in MCP server for the upstream tests, like the TypeScript `fake-mcp-server.mjs`: `echo` and `whoami` over
//! two `tools/list` pages. `fake-upstream <tools.json>` serves the tools of that file instead, so a test can prove the
//! program runs from a clone; `stamp`, `seen <NAME>...` and `fail` stand in for repository setup steps. The `env` tool
//! and `seen` report any variable, so a test can check that the child gets none of the test process's own.

use serde_json::{Value, json};
use std::io::{BufRead, Write};
use std::time::{SystemTime, UNIX_EPOCH};

fn default_tools() -> Value {
    json!([
        {
            "name": "echo",
            "description": "Echoes text",
            "inputSchema": { "type": "object", "properties": { "text": { "type": "string" } } },
        },
        { "name": "whoami", "description": "Reads TOKEN from the environment", "inputSchema": { "type": "object" } },
    ])
}

fn answer(message: &Value, tools: &Value) -> Option<Value> {
    let id = message.get("id")?.clone();
    let params = message.get("params").cloned().unwrap_or(Value::Null);
    let result = match message.get("method")?.as_str()? {
        "initialize" => json!({
            "protocolVersion": params["protocolVersion"],
            "capabilities": { "tools": {} },
            "serverInfo": { "name": "fake", "version": "1" },
        }),
        "tools/list" => match params["cursor"].as_str() {
            Some("page-2") => json!({ "tools": [tools[1]] }),
            _ => json!({ "tools": [tools[0]], "nextCursor": "page-2" }),
        },
        "tools/call" => {
            let text = match params["name"].as_str() {
                Some("whoami") => std::env::var("TOKEN").unwrap_or_else(|_| "undefined".to_owned()),
                Some("env") => params["arguments"]["name"]
                    .as_str()
                    .and_then(|name| std::env::var(name).ok())
                    .unwrap_or_else(|| "undefined".to_owned()),
                _ => params["arguments"]["text"].as_str().unwrap_or("undefined").to_owned(),
            };
            json!({ "content": [{ "type": "text", "text": text }] })
        }
        _ => return None,
    };
    Some(json!({ "jsonrpc": "2.0", "id": id, "result": result }))
}

fn serve(tools: &Value) -> std::io::Result<()> {
    let mut stdout = std::io::stdout().lock();
    for line in std::io::stdin().lock().lines() {
        let message: Value = serde_json::from_str(&line?)?;
        if let Some(reply) = answer(&message, tools) {
            writeln!(stdout, "{reply}")?;
            stdout.flush()?;
        }
    }
    Ok(())
}

fn main() -> std::io::Result<()> {
    let mode = std::env::args().nth(1);
    match mode.as_deref() {
        Some("stamp") => {
            let nanos = SystemTime::now()
                .duration_since(UNIX_EPOCH)
                .map_or(0, |elapsed| elapsed.as_nanos());
            std::fs::write("stamp.txt", nanos.to_string())
        }
        Some("seen") => {
            let seen: Vec<String> = std::env::args()
                .skip(2)
                .map(|name| std::env::var(name).unwrap_or_else(|_| "none".to_owned()))
                .collect();
            std::fs::write("seen.txt", seen.join(","))
        }
        Some("fail") => std::process::exit(3),
        Some(tools_file) => serve(&serde_json::from_str(&std::fs::read_to_string(tools_file)?)?),
        None => serve(&default_tools()),
    }
}
