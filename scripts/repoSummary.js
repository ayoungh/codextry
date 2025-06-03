const { execSync } = require('child_process');

function getCommitCount(repoPath) {
  const options = { encoding: 'utf-8' };
  try {
    const output = execSync(`git -C "${repoPath}" rev-list --all --count`, options);
    return parseInt(output.trim(), 10) || 0;
  } catch (err) {
    console.error(`Failed to read commit count for ${repoPath}: ${err.message}`);
    return 0;
  }
}

function getAuthorEmails(repoPath) {
  const options = { encoding: 'utf-8' };
  try {
    const output = execSync(`git -C "${repoPath}" log --pretty=format:%ae`, options);
    const emails = output.split(/\n/).filter(Boolean);
    return Array.from(new Set(emails));
  } catch (err) {
    console.error(`Failed to read authors for ${repoPath}: ${err.message}`);
    return [];
  }
}

function getCommitDates(repoPath) {
  const options = { encoding: 'utf-8' };
  try {
    const output = execSync(`git -C "${repoPath}" log --date=short --pretty=format:%ad`, options);
    return output.split(/\n/).filter(Boolean);
  } catch (err) {
    console.error(`Failed to read commit dates for ${repoPath}: ${err.message}`);
    return [];
  }
}

function collectMetrics(repoPaths) {
  repoPaths.forEach(repoPath => {
    const commitCount = getCommitCount(repoPath);
    const authors = getAuthorEmails(repoPath);
    const dates = getCommitDates(repoPath);
    const firstDate = dates[dates.length - 1] || 'N/A';
    const lastDate = dates[0] || 'N/A';

    console.log(`\nRepo: ${repoPath}`);
    console.log(`Total commits: ${commitCount}`);
    console.log(`Unique authors: ${authors.length}`);
    console.log(`First commit: ${firstDate}`);
    console.log(`Last commit: ${lastDate}`);
  });
}

const repoPaths = process.argv.slice(2);
if (repoPaths.length === 0) {
  console.error('Usage: node repoSummary.js <repo_path1> <repo_path2> ...');
  process.exit(1);
}

collectMetrics(repoPaths);
