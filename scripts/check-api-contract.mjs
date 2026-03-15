import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const repoRoot = process.cwd();
const srcRoot = join(repoRoot, 'src');
const bannedFiles = ['src/types/player.ts'];
const bannedImportPatterns = [
  "from '@/types/player'",
  'from "./player"',
  "from './player'",
];
const bannedTypeNames = [
  'Player',
  'NflTeam',
  'PassingStat',
  'RushingStat',
  'ReceivingStat',
  'KickingStat',
  'ScoringConfig',
  'SeasonSummary',
  'PlayersResponse',
  'PlayerDetail',
  'PlayerStatsParams',
  'PlayerStatsResponse',
  'RosterHistoryResponse',
  'PlayerScoresParams',
  'PlayerScoresResponse',
  'ScoringConfigsResponse',
  'TeamsParams',
  'TeamsResponse',
  'SeasonsResponse',
];

const errors = [];

for (const file of bannedFiles) {
  if (existsSync(join(repoRoot, file))) {
    errors.push(`${file} should not exist; import API DTOs from @football/api-contract instead.`);
  }
}

function visit(dir) {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      visit(fullPath);
      continue;
    }

    if (!fullPath.endsWith('.ts') && !fullPath.endsWith('.tsx')) {
      continue;
    }

    const relPath = relative(repoRoot, fullPath);
    const source = readFileSync(fullPath, 'utf8');

    if (
      relPath.includes('.test.') ||
      relPath.includes('.stories.') ||
      !(
        relPath.startsWith('src/types/') ||
        relPath === 'src/lib/api-client.ts'
      )
    ) {
      continue;
    }

    if (bannedImportPatterns.some((pattern) => source.includes(pattern))) {
      errors.push(`${relPath} imports local player DTOs; use @football/api-contract instead.`);
    }

    for (const typeName of bannedTypeNames) {
      const declaration = new RegExp(`\\b(?:export\\s+)?(?:interface|type)\\s+${typeName}\\b`);
      if (declaration.test(source)) {
        errors.push(`${relPath} redeclares ${typeName}; use @football/api-contract instead.`);
      }
    }
  }
}

visit(srcRoot);

if (errors.length > 0) {
  console.error('API contract guard failed:\n');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log('API contract guard passed.');
