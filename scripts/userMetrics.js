const { execSync } = require('child_process');

function getCommitEmails(repoPath) {
  const options = { encoding: 'utf-8' };
  try {
    const output = execSync(`git -C "${repoPath}" log --pretty=format:%ae`, options);
    return output.split(/\n/).filter(Boolean);
  } catch (err) {
    console.error(`Failed to read git log for ${repoPath}: ${err.message}`);
    return [];
  }
}

function aggregateEmails(emails) {
  return emails.reduce((acc, email) => {
    acc[email] = (acc[email] || 0) + 1;
    return acc;
  }, {});
}

function formatStats(stats) {
  return Object.entries(stats)
    .sort((a, b) => b[1] - a[1])
    .map(([email, count]) => `${email}: ${count} commits`)
    .join('\n');
}

function collectMetrics(repoPaths) {
  const totals = {};
  repoPaths.forEach(repoPath => {
    const emails = getCommitEmails(repoPath);
    const stats = aggregateEmails(emails);
    console.log(`\nRepo: ${repoPath}`);
    console.log(formatStats(stats) || 'No commits found');
    // merge into totals
    Object.entries(stats).forEach(([email, count]) => {
      totals[email] = (totals[email] || 0) + count;
    });
  });

  console.log('\n=== Combined Totals ===');
  console.log(formatStats(totals) || 'No data');
}

const repoPaths = process.argv.slice(2);
if (repoPaths.length === 0) {
  console.error('Usage: node userMetrics.js <repo_path1> <repo_path2> ...');
  process.exit(1);
}

collectMetrics(repoPaths);
