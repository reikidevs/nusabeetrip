/**
 * Script to verify all image files exist
 */
import { existsSync } from 'fs';
import path from 'path';

const images = {
  tours: [
    '/images/West%20Trip/West%20trip%20%20kelingking%20beach.jpeg',
    '/images/East%20Trip/East%20trip%20DIAMOND%20BEACH.jpeg',
    '/images/West%20Trip/West%20Trip%20Kelingking%20Manta%20Snorkeling.png',
    '/images/East%20Trip/East%20Trip%20Diamond%20Beach%20Snorkeling.png',
    '/images/Mix%20Trip%20Diamond%20Kelingking.png',
    '/images/Snorkeling%20%2B%20Manta%20Rays/snorkeling%201.jpeg',
  ],
  rentals: [
    '/images/Vehicle%20Rentals/Yamaha%20N-Max.webp',
    '/images/Vehicle%20Rentals/Honda%20Vario.png',
    '/images/Vehicle%20Rentals/Honda%20Scoopy.webp',
    '/images/Vehicle%20Rentals/Car%20with%20Driver.jpg',
  ]
};

console.log('🔍 Verifying image files exist...\n');

let allExist = true;

console.log('📦 TOUR IMAGES:');
images.tours.forEach((img) => {
  const decodedPath = decodeURIComponent(img);
  const filePath = path.join(process.cwd(), 'public', decodedPath);
  const exists = existsSync(filePath);
  const status = exists ? '✅' : '❌';
  console.log(`${status} ${img}`);
  if (!exists) {
    console.log(`   File path: ${filePath}`);
    allExist = false;
  }
});

console.log('\n🚗 RENTAL IMAGES:');
images.rentals.forEach((img) => {
  const decodedPath = decodeURIComponent(img);
  const filePath = path.join(process.cwd(), 'public', decodedPath);
  const exists = existsSync(filePath);
  const status = exists ? '✅' : '❌';
  console.log(`${status} ${img}`);
  if (!exists) {
    console.log(`   File path: ${filePath}`);
    allExist = false;
  }
});

if (allExist) {
  console.log('\n✅ All image files exist!');
} else {
  console.log('\n❌ Some image files are missing!');
  process.exit(1);
}
