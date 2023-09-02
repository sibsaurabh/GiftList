const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to prompt user for input
function promptInput(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

const serverUrl = 'http://localhost:1225';

async function main() {
  const name = await promptInput('Enter the name to send the gift : ');
  const merkleTree = new MerkleTree(niceList);
  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name : name,
    proof : proof
  });

  console.log({ gift });
  rl.close();
}

main();