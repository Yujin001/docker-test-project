const http = require('http');

const BASE_URL = 'http://localhost:9000';
const API_BASE = `${BASE_URL}/api/users`;

// Test configuration
const config = {
  timeout: 5000,
  retries: 3
};

// Utility function to make HTTP requests
function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const response = {
            statusCode: res.statusCode,
            headers: res.headers,
            body: JSON.parse(body)
          };
          resolve(response);
        } catch (error) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: body
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.setTimeout(config.timeout);
    req.end();
  });
}

// Test functions
async function testHealthCheck() {
  console.log('\n🏥 Testing Health Check...');
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 9000,
      path: '/health',
      method: 'GET'
    });
    
    if (response.statusCode === 200) {
      console.log('✅ Health check passed');
      console.log(`   Status: ${response.body.status}`);
      console.log(`   Database: ${response.body.database}`);
    } else {
      console.log('❌ Health check failed');
      console.log(`   Status Code: ${response.statusCode}`);
    }
  } catch (error) {
    console.log('❌ Health check error:', error.message);
  }
}

async function testGetAllUsers() {
  console.log('\n👥 Testing Get All Users...');
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 9000,
      path: '/api/users',
      method: 'GET'
    });
    
    if (response.statusCode === 200) {
      console.log('✅ Get all users passed');
      console.log(`   Count: ${response.body.count}`);
      if (response.body.data && response.body.data.length > 0) {
        console.log(`   First user: ${response.body.data[0].name} (${response.body.data[0].email})`);
      }
    } else {
      console.log('❌ Get all users failed');
      console.log(`   Status Code: ${response.statusCode}`);
    }
  } catch (error) {
    console.log('❌ Get all users error:', error.message);
  }
}

async function testCreateUser() {
  console.log('\n➕ Testing Create User...');
  try {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      age: 25
    };

    const response = await makeRequest({
      hostname: 'localhost',
      port: 9000,
      path: '/api/users',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, userData);
    
    if (response.statusCode === 201) {
      console.log('✅ Create user passed');
      console.log(`   Created: ${response.body.data.name} (${response.body.data.email})`);
      return response.body.data.id; // Return ID for update/delete tests
    } else {
      console.log('❌ Create user failed');
      console.log(`   Status Code: ${response.statusCode}`);
      console.log(`   Error: ${response.body.error || 'Unknown error'}`);
      return null;
    }
  } catch (error) {
    console.log('❌ Create user error:', error.message);
    return null;
  }
}

async function testGetUserById(userId) {
  if (!userId) return;
  
  console.log('\n🔍 Testing Get User by ID...');
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 9000,
      path: `/api/users/${userId}`,
      method: 'GET'
    });
    
    if (response.statusCode === 200) {
      console.log('✅ Get user by ID passed');
      console.log(`   User: ${response.body.data.name} (${response.body.data.email})`);
    } else {
      console.log('❌ Get user by ID failed');
      console.log(`   Status Code: ${response.statusCode}`);
    }
  } catch (error) {
    console.log('❌ Get user by ID error:', error.message);
  }
}

async function testUpdateUser(userId) {
  if (!userId) return;
  
  console.log('\n✏️ Testing Update User...');
  try {
    const userData = {
      name: 'Updated Test User',
      email: 'updated.test@example.com',
      age: 26
    };

    const response = await makeRequest({
      hostname: 'localhost',
      port: 9000,
      path: `/api/users/${userId}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    }, userData);
    
    if (response.statusCode === 200) {
      console.log('✅ Update user passed');
      console.log(`   Updated: ${response.body.data.name} (${response.body.data.email})`);
    } else {
      console.log('❌ Update user failed');
      console.log(`   Status Code: ${response.statusCode}`);
      console.log(`   Error: ${response.body.error || 'Unknown error'}`);
    }
  } catch (error) {
    console.log('❌ Update user error:', error.message);
  }
}

async function testDeleteUser(userId) {
  if (!userId) return;
  
  console.log('\n🗑️ Testing Delete User...');
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 9000,
      path: `/api/users/${userId}`,
      method: 'DELETE'
    });
    
    if (response.statusCode === 200) {
      console.log('✅ Delete user passed');
      console.log(`   Deleted: ${response.body.data.name} (${response.body.data.email})`);
    } else {
      console.log('❌ Delete user failed');
      console.log(`   Status Code: ${response.statusCode}`);
      console.log(`   Error: ${response.body.error || 'Unknown error'}`);
    }
  } catch (error) {
    console.log('❌ Delete user error:', error.message);
  }
}

async function testUserCount() {
  console.log('\n📊 Testing User Count...');
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 9000,
      path: '/api/users/count',
      method: 'GET'
    });
    
    if (response.statusCode === 200) {
      console.log('✅ User count passed');
      console.log(`   Total users: ${response.body.count}`);
    } else {
      console.log('❌ User count failed');
      console.log(`   Status Code: ${response.statusCode}`);
    }
  } catch (error) {
    console.log('❌ User count error:', error.message);
  }
}

async function testSearchUsers() {
  console.log('\n🔎 Testing Search Users...');
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 9000,
      path: '/api/users/search?q=john',
      method: 'GET'
    });
    
    if (response.statusCode === 200) {
      console.log('✅ Search users passed');
      console.log(`   Search results: ${response.body.count}`);
      console.log(`   Query: ${response.body.query}`);
    } else {
      console.log('❌ Search users failed');
      console.log(`   Status Code: ${response.statusCode}`);
    }
  } catch (error) {
    console.log('❌ Search users error:', error.message);
  }
}

// Main test runner
async function runTests() {
  console.log('🚀 Starting API Tests...');
  console.log(`📍 Testing against: ${BASE_URL}`);
  
  try {
    // Run tests in sequence
    await testHealthCheck();
    await testGetAllUsers();
    await testUserCount();
    await testSearchUsers();
    
    const userId = await testCreateUser();
    await testGetUserById(userId);
    await testUpdateUser(userId);
    await testDeleteUser(userId);
    
    console.log('\n🎉 All tests completed!');
    
  } catch (error) {
    console.error('\n💥 Test suite failed:', error.message);
  }
}

// Check if server is running before starting tests
async function checkServer() {
  try {
    await makeRequest({
      hostname: 'localhost',
      port: 9000,
      path: '/health',
      method: 'GET'
    });
    return true;
  } catch (error) {
    return false;
  }
}

// Main execution
async function main() {
  const serverRunning = await checkServer();
  
  if (!serverRunning) {
    console.log('❌ Server is not running on localhost:9000');
    console.log('💡 Please start the server first:');
    console.log('   docker-compose up --build');
    console.log('   or');
    console.log('   docker-compose -f compose.dev.yaml up --build');
    process.exit(1);
  }
  
  await runTests();
}

// Run tests if this file is executed directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  runTests,
  checkServer
};
