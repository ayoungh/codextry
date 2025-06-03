# Git User Metrics Scripts

This repository contains a simple Node.js script to gather commit statistics for Bitbucket (or any Git) users from local repositories. The script reads Git history and aggregates commit counts by author email.

## Requirements
- Node.js installed on your machine
- Git installed

## Usage
1. Clone this repository or copy `scripts/userMetrics.js` to your workspace.
2. Run the script and pass one or more paths to local Git repositories:

```bash
node scripts/userMetrics.js /path/to/repo1 /path/to/repo2
```

The script prints commit counts for each author in every repository and totals across all specified repos.

## Example Output
```
Repo: /path/to/repo1
alice@example.com: 10 commits
bob@example.com: 5 commits

Repo: /path/to/repo2
bob@example.com: 7 commits

=== Combined Totals ===
alice@example.com: 10 commits
bob@example.com: 12 commits
```
