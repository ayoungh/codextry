const { execSync } = require('child_process');

function getNumstat(repoPath) {
  const options = { encoding: 'utf-8' };
  try {
    const output = execSync(`git -C "${repoPath}" log --format=%ae --numstat`, options);
    return output.split(/\n/);
  } catch (err) {
    console.error(`Failed to read git log for ${repoPath}: ${err.message}`);
    return [];
  }
}

function aggregateLines(lines) {
  const stats = {};
  let currentEmail = null;
  lines.forEach(line => {
    if (!line.trim()) return;
    if (line.includes('@')) {
      currentEmail = line.trim();
      if (!stats[currentEmail]) {
        stats[currentEmail] = { added: 0, deleted: 0 };
      }
    } else {
      const parts = line.split(/\t/);
      if (parts.length >= 3 && currentEmail) {
        const added = parseInt(parts[0], 10) || 0;
        const deleted = parseInt(parts[1], 10) || 0;
        stats[currentEmail].added += added;
        stats[currentEmail].deleted += deleted;
      }
    }
  });
  return stats;
}

function formatStats(stats) {
  return Object.entries(stats)
    .sort((a, b) => (b[1].added + b[1].deleted) - (a[1].added + a[1].deleted))
    .map(([email, { added, deleted }]) => `${email}: +${added} / -${deleted}`)
    .join('\n');
}

function collectMetrics(repoPaths) {
  repoPaths.forEach(repoPath => {
    const lines = getNumstat(repoPath);
    const stats = aggregateLines(lines);
    console.log(`\nRepo: ${repoPath}`);
    console.log(formatStats(stats) || 'No commits found');
  });
}

const repoPaths = process.argv.slice(2);
if (repoPaths.length === 0) {
  console.error('Usage: node linesChangedByUser.js <repo_path1> <repo_path2> ...');
  process.exit(1);
}

collectMetrics(repoPaths);
