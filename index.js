const fs = require("fs")

const thisYear = new Date().getFullYear()

const start = new Date(`${thisYear}-01-01T00:00:00Z`).getTime()
const end = new Date(`${thisYear}-12-31T23:59:59Z`).getTime()

const progress = (Date.now() - start) / (end - start)

function bar() {
  const size = 30
  const done = Math.floor(progress * size)
  return "█".repeat(done) + "▁".repeat(size - done)
}

const progressText =
`⏳ Year progress { ${bar()} } ${(progress*100).toFixed(2)} %`

let readme = fs.readFileSync("README.md","utf8")

readme = readme.replace(
/<!-- YEAR_PROGRESS_START -->[\s\S]*<!-- YEAR_PROGRESS_END -->/,
`<!-- YEAR_PROGRESS_START -->
${progressText}
<!-- YEAR_PROGRESS_END -->`
)

fs.writeFileSync("README.md", readme)
