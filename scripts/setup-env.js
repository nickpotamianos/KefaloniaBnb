#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Define the path to the example and actual .env files
const envExamplePath = path.join(__dirname, '..', '.env.example');
const envPath = path.join(__dirname, '..', '.env');

// Check if .env already exists
if (fs.existsSync(envPath)) {
  console.log('\x1b[33m%s\x1b[0m', '⚠️  A .env file already exists!');
  rl.question('Do you want to overwrite it? (y/N): ', (answer) => {
    if (answer.toLowerCase() !== 'y') {
      console.log('Setup cancelled. Your .env file was not modified.');
      rl.close();
      return;
    }
    createEnvFile();
  });
} else {
  createEnvFile();
}

function createEnvFile() {
  // Read the example file
  fs.readFile(envExamplePath, 'utf8', (err, data) => {
    if (err) {
      console.error('\x1b[31m%s\x1b[0m', '❌ Error reading .env.example file:', err);
      rl.close();
      return;
    }

    console.log('\x1b[36m%s\x1b[0m', '🔧 Setting up your development environment');
    console.log('\x1b[36m%s\x1b[0m', '📝 Please provide the following values (press Enter to use default):');
    
    // Parse the example file line by line
    const lines = data.split('\n');
    const envVars = {};
    const questions = [];
    
    lines.forEach(line => {
      // Skip comments and empty lines
      if (line.startsWith('#') || line.trim() === '') return;
      
      // Extract variable name and default value
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const [, name, defaultValue] = match;
        questions.push({ name, defaultValue });
      }
    });
    
    // Ask questions sequentially
    function askQuestion(index) {
      if (index >= questions.length) {
        // All questions answered, write the .env file
        writeEnvFile();
        return;
      }
      
      const { name, defaultValue } = questions[index];
      
      // Skip non-sensitive values
      if (name === 'BASE_PRICE_PER_NIGHT' || 
          name === 'CLEANING_FEE' || 
          name === 'ADDITIONAL_GUEST_FEE' ||
          name === 'MIN_NIGHTS') {
        envVars[name] = defaultValue;
        askQuestion(index + 1);
        return;
      }
      
      let prompt = `${name} [${defaultValue}]: `;
      
      // Special prompts for sensitive information
      if (name === 'STRIPE_PUBLIC_KEY') {
        prompt = `${name} (your Stripe publishable key, starts with pk_test_): `;
      } else if (name === 'STRIPE_SECRET_KEY') {
        prompt = `${name} (your Stripe secret key, starts with sk_test_): `;
      }
      
      rl.question(prompt, (answer) => {
        envVars[name] = answer.trim() || defaultValue;
        askQuestion(index + 1);
      });
    }
    
    function writeEnvFile() {
      // Construct the .env content
      let envContent = '';
      
      lines.forEach(line => {
        if (line.startsWith('#') || line.trim() === '') {
          // Keep comments and empty lines as is
          envContent += line + '\n';
        } else {
          const match = line.match(/^([^=]+)=/);
          if (match) {
            const name = match[1];
            if (envVars[name]) {
              envContent += `${name}=${envVars[name]}\n`;
            } else {
              envContent += line + '\n';
            }
          } else {
            envContent += line + '\n';
          }
        }
      });
      
      // Write to .env file
      fs.writeFile(envPath, envContent, 'utf8', (err) => {
        if (err) {
          console.error('\x1b[31m%s\x1b[0m', '❌ Error writing .env file:', err);
          rl.close();
          return;
        }
        
        console.log('\x1b[32m%s\x1b[0m', '✅ .env file created successfully!');
        console.log('\x1b[32m%s\x1b[0m', '🚀 You can now run your application with npm run dev');
        rl.close();
      });
    }
    
    // Start asking questions
    askQuestion(0);
  });
}