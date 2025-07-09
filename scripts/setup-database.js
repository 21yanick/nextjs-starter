const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up database...');

// Check if .env.local exists
if (!fs.existsSync('.env.local')) {
  console.log('📝 Creating .env.local from .env.example...');
  fs.copyFileSync('.env.example', '.env.local');
  console.log('✅ .env.local created. Please update it with your values.');
}

// Check if Docker is running
exec('docker ps', (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Docker is not running or not installed.');
    console.log('Please install Docker and make sure it\'s running.');
    process.exit(1);
  }

  console.log('✅ Docker is running');
  
  // Start Supabase services
  console.log('🐳 Starting Supabase services...');
  exec('docker-compose up -d', (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Failed to start Supabase services:', error);
      process.exit(1);
    }
    
    console.log('✅ Supabase services started');
    console.log('⏳ Waiting for services to be ready...');
    
    // Wait for services to be ready
    setTimeout(() => {
      console.log('✅ Database setup completed!');
      console.log('');
      console.log('🎉 Next steps:');
      console.log('1. Open Supabase Studio: http://localhost:54323');
      console.log('2. Run: npm run dev');
      console.log('3. Visit: http://localhost:3000');
    }, 10000);
  });
});