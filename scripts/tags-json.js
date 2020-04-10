#!/usr/bin/env node

"use strict"

console.time("tags-json")
const fs = require("fs")

let tags = {}

// Retrieve list of doc files.
const sysPath = __dirname + "/../source/content/"
let docs = getAllFiles(sysPath)

// Pick out the web path and tag list for each doc.
docs.forEach(function(file) {
  let webPath = file.replace(sysPath, "").replace(/\.[^/.]+$/, "")
  tags[webPath] = getTags(file)
})

// Write this to a JSON file.
let data = JSON.stringify(tags, null, 2)
fs.writeFileSync("static/tags.json", data)

// Output run time and a message.
console.timeEnd("tags-json")
console.log("🤘 Updated tags.json.")

/**
 * Retrieve doc tags from a markdown file.
 * @param {string} file
 *   A file name.
 * @return {string} tags
 *   List of comma-separated doc tags.
 */
function getTags(file) {
  let tags = ""
  try {
    let data = fs.readFileSync(file, "utf8")
    let matches = data.match(/(?<=tags: )\[(.*?)\]/)
    if (matches) {
      tags = matches[1]
    }
  } catch (e) {
    console.log("Error: ", e.stack)
  }
  return tags
}

/**
 * Recursively list all files.
 * @param {string} dir
 * @param {array} filelist
 */
function getAllFiles(dir, filelist) {
  let files = fs.readdirSync(dir)
  filelist = filelist || []

  files.forEach(function(file) {
    if (fs.statSync(dir + file).isDirectory()) {
      filelist = getAllFiles(dir + file + "/", filelist)
    } else {
      filelist.push(dir + file)
    }
  })

  return filelist
}
