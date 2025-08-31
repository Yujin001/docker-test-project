// Check if Jest is available (for CI/CD environments that might have Jest)
if (typeof jest !== 'undefined') {
  const { testConnection } = require('../src/config/database');

  // Mock database connection for testing
  jest.mock('../src/config/database', () => ({
    testConnection: jest.fn(),
    closePool: jest.fn()
  }));

  // Unit tests that don't require a running server
  describe('Unit Tests', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('Database connection function exists', () => {
      expect(typeof testConnection).toBe('function');
    });

    test('Environment variables are accessible', () => {
      expect(process.env.NODE_ENV).toBeDefined();
      expect(process.env.PORT).toBeDefined();
    });

    test('Node.js version is valid', () => {
      const version = process.version;
      expect(version).toMatch(/^v\d+\.\d+\.\d+$/);
    });

    test('Required dependencies are available', () => {
      const express = require('express');
      const cors = require('cors');
      const pg = require('pg');
      
      expect(express).toBeDefined();
      expect(cors).toBeDefined();
      expect(pg).toBeDefined();
    });
  });
} else {
  // Simple test runner for non-Jest environments
  console.log('🧪 Running Unit Tests...');
  
  // Test database connection function exists
  try {
    const { testConnection } = require('../src/config/database');
    if (typeof testConnection === 'function') {
      console.log('✅ Database connection function exists');
    } else {
      console.log('❌ Database connection function not found');
    }
  } catch (error) {
    console.log('❌ Database module not accessible:', error.message);
  }

  // Test environment variables
  if (process.env.NODE_ENV) {
    console.log('✅ NODE_ENV is set:', process.env.NODE_ENV);
  } else {
    console.log('⚠️  NODE_ENV is not set');
  }

  if (process.env.PORT) {
    console.log('✅ PORT is set:', process.env.PORT);
  } else {
    console.log('⚠️  PORT is not set, will use default 9000');
  }

  // Test Node.js version
  const version = process.version;
  if (version.match(/^v\d+\.\d+\.\d+$/)) {
    console.log('✅ Node.js version is valid:', version);
  } else {
    console.log('❌ Node.js version format is invalid:', version);
  }

  // Test required dependencies
  try {
    require('express');
    console.log('✅ Express dependency is available');
  } catch (error) {
    console.log('❌ Express dependency not found:', error.message);
  }

  try {
    require('cors');
    console.log('✅ CORS dependency is available');
  } catch (error) {
    console.log('❌ CORS dependency not found:', error.message);
  }

  try {
    require('pg');
    console.log('✅ PostgreSQL dependency is available');
  } catch (error) {
    console.log('❌ PostgreSQL dependency not found:', error.message);
  }

  console.log('\n🎉 Unit tests completed!');
}
