CREATE TABLE IF NOT EXISTS usage (
  day TEXT NOT NULL,
  tool TEXT NOT NULL,
  version TEXT NOT NULL,
  os TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (day, tool, version, os)
);
