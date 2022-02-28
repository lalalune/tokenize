#!/usr/bin/env node

// Imports
const { readFileSync } = require("fs");
const { encode, decode } = require("gpt-3-encoder");
const R = ({ compose, map, of, prop } = require("ramda"));
const readline = require("readline");

// decoded :: String -> String[]
const decoded = (text) => R.map(R.compose(decode, R.of), encode(text));

// decodedJSON :: String -> String
const decodedJSON = R.compose(JSON.stringify, decoded);

// readFromStdinStream :: String
const readFromStdinStream = () => readFileSync(0).toString();

// output :: String -> IO
const output = compose(console.log, decodedJSON);

// readFromStdinTTY :: (String -> IO) -> void
function readFromStdinTTY(output) {
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  rl.on("line", output);
}

// main :: IO
(function main() {
  const input = R.prop(2, process.argv);

  if (process.stdin.isTTY && !input) {
    readFromStdinTTY(output);
  } else {
    output(input ?? readFromStdinStream());
  }
}) ();
