ALTER TABLE usage RENAME TO usage_legacy;

CREATE TABLE usage (
  tool TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0
);

INSERT INTO usage (tool, count)
SELECT tool, SUM(count) FROM usage_legacy GROUP BY tool;

CREATE TABLE usage_merge_check (
  merged_every_use INTEGER NOT NULL CHECK (merged_every_use = 1)
);

INSERT INTO usage_merge_check (merged_every_use)
SELECT COALESCE((SELECT SUM(count) FROM usage), 0) = COALESCE((SELECT SUM(count) FROM usage_legacy), 0)
  AND (SELECT COUNT(*) FROM usage) = (SELECT COUNT(DISTINCT tool) FROM usage_legacy);

DROP TABLE usage_merge_check;

DROP TABLE usage_legacy;
