#!/usr/bin/env node

"use strict"

console.time("tags-json")
const fs = require("fs")

let tags = {}

// Retrieve list of doc files.
const sysPath = __dirname + "/../source/content/"
let docs = getAllFiles(sysPath)

// Pick out the web path, tag list and title for each doc.
docs.forEach(function(file) {
  let webPath = file.replace(sysPath, "").replace(/\.[^/.]+$/, "")
  tags[webPath] = {
    title: getContent(file, "title"),
    tags: getContent(file, "tags"),
  }
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
 * @param {string} field
 *   A field from the doc (title or tags).
 * @return {string} tags
 *   List of comma-separated doc tags.
 */
function getContent(file, field) {
  let content = ""

  if (field == "tags") {
    var regex = new RegExp(/(?<=tags: )\[(.*?)\]/)
  } else if (field == "title") {
    var regex = new RegExp(/(?<=title: )(.*)/)
  }

  try {
    let data = fs.readFileSync(file, "utf8")
    let matches = data.match(regex)
    if (matches) {
      content = matches[1]
    }
  } catch (e) {
    console.log("Error: ", e.stack)
  }

  return content
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
