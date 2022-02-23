#!/usr/bin/env node
const { encode, decode } = require('gpt-3-encoder')

const decoded = encode(process.argv[2]).map((token) => decode([token]))

console.log(JSON.stringify(decoded))
