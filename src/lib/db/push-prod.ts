/**
 * Push schema to PRODUCTION database safely.
 *
 * - Reads DATABASE_URL_PROD from .env.local
 * - Sets DATABASE_URL = DATABASE_URL_PROD before invoking drizzle-kit
 * - Asks for confirmation before destructive changes
 *
 * Run: npm run db:push:prod
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import { spawn } from 'child_process';
import * as readline from 'readline';

async function main() {
  const prodUrl = process.env.DATABASE_URL_PROD;

  if (!prodUrl) {
    console.error('❌ DATABASE_URL_PROD is not set in .env.local');
    console.error('');
    console.error('Add this to your .env.local:');
    console.error('   DATABASE_URL_PROD="postgresql://..."');
    process.exit(1);
  }

  // Mask password for logging
  const masked = prodUrl.replace(/:[^@]+@/, ':***@');
  console.log('');
  console.log('🚨 You are about to push schema to PRODUCTION database:');
  console.log(`   ${masked.slice(0, 100)}...`);
  console.log('');

  // Confirmation prompt
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const answer = await new Promise<string>((resolve) => {
    rl.question('Type "PUSH PROD" to continue, anything else to cancel: ', resolve);
  });
  rl.close();

  if (answer.trim() !== 'PUSH PROD') {
    console.log('❌ Cancelled.');
    process.exit(0);
  }

  console.log('');
  console.log('🚀 Pushing schema to production...');
  console.log('');

  // Spawn drizzle-kit push with DATABASE_URL set to PROD
  const isWindows = process.platform === 'win32';
  const npx = isWindows ? 'npx.cmd' : 'npx';

  const child = spawn(npx, ['drizzle-kit', 'push'], {
    stdio: 'inherit',
    env: {
      ...process.env,
      DATABASE_URL: prodUrl,
    },
    shell: isWindows,
  });

  child.on('exit', (code) => {
    if (code === 0) {
      console.log('');
      console.log('✅ Schema pushed to production successfully.');
      console.log('   Run: npm run db:list-tables:prod   to verify');
    } else {
      console.log('');
      console.log(`❌ drizzle-kit exited with code ${code}`);
    }
    process.exit(code || 0);
  });

  child.on('error', (err) => {
    console.error('❌ Failed to spawn drizzle-kit:', err);
    process.exit(1);
  });
}

main();
