const http = require('http');

const options = {
  hostname: 'localhost',
  port: 9000,
  path: '/',
  method: 'GET'
};

console.log('🧪 Testing Docker Node.js application...\n');

// Test root endpoint
const req = http.request(options, (res) => {
  console.log(`✅ Status: ${res.statusCode}`);
  console.log(`📋 Headers: ${JSON.stringify(res.headers, null, 2)}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log(`📄 Response: ${data}`);
    console.log('\n🎉 Test completed successfully!');
  });
});

req.on('error', (err) => {
  console.error(`❌ Error: ${err.message}`);
});

req.end();
