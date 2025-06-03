const { execSync } = require('child_process');

function getCommitDates(repoPath) {
  const options = { encoding: 'utf-8' };
  try {
    const output = execSync(`git -C "${repoPath}" log --date=short --pretty=format:%ad`, options);
    return output.split(/\n/).filter(Boolean);
  } catch (err) {
    console.error(`Failed to read git log for ${repoPath}: ${err.message}`);
    return [];
  }
}

function aggregateDates(dates) {
  return dates.reduce((acc, date) => {
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});
}

function formatStats(stats) {
  return Object.entries(stats)
    .sort(([d1], [d2]) => d1.localeCompare(d2))
    .map(([date, count]) => `${date}: ${count} commits`)
    .join('\n');
}

function collectMetrics(repoPaths) {
  repoPaths.forEach(repoPath => {
    const dates = getCommitDates(repoPath);
    const stats = aggregateDates(dates);
    console.log(`\nRepo: ${repoPath}`);
    console.log(formatStats(stats) || 'No commits found');
  });
}

const repoPaths = process.argv.slice(2);
if (repoPaths.length === 0) {
  console.error('Usage: node commitActivityByDate.js <repo_path1> <repo_path2> ...');
  process.exit(1);
}

collectMetrics(repoPaths);
