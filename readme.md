# Git User Metrics Scripts

This repository contains simple Node.js utilities for gathering Git statistics from local repositories. They can help managers understand how their teams are using Bitbucket (or any Git service).

## Requirements
- Node.js installed on your machine
- Git installed

## Scripts

### userMetrics.js
Count commits by author.
```bash
node scripts/userMetrics.js /path/to/repo1 /path/to/repo2
```

### commitActivityByDate.js
Show commit counts grouped by date.
```bash
node scripts/commitActivityByDate.js /path/to/repo1 /path/to/repo2
```

### linesChangedByUser.js
Summarize lines added and deleted by each contributor.
```bash
node scripts/linesChangedByUser.js /path/to/repo1 /path/to/repo2
```

### repoSummary.js
Display overall repository statistics such as total commits and date range.
```bash
node scripts/repoSummary.js /path/to/repo1 /path/to/repo2
```

## Example Output from userMetrics.js
```text
Repo: /path/to/repo1
alice@example.com: 10 commits
bob@example.com: 5 commits

Repo: /path/to/repo2
bob@example.com: 7 commits

=== Combined Totals ===
alice@example.com: 10 commits
bob@example.com: 12 commits
```
