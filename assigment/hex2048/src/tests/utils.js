const { getFieldPoints } = require("../fieldUtils")

const getDataValue = e => e.evaluate(e => e.getAttribute("data-value"))
const getDataStatus = e => e.evaluate(e => e.getAttribute("data-status"))
const setRngServerUrl = async page => {
  await page.waitForSelector("#url-server")
  await page.select("#url-server", "localhost:13337")
}

async function readDOMField(page, radius) {
  const fieldPoints = getFieldPoints(radius)

  return await Promise.all(
    fieldPoints.map(async ({ x, y, z }) => {
      const element = await page.waitForSelector(`[data-x="${x}"][data-y="${y}"][data-z="${z}"]`)
      const value = parseInt(await getDataValue(element, "data-value"))
      return { x, y, z, value }
    }),
  )
}

module.exports = {
  getDataStatus,
  readDOMField,
  setRngServerUrl,
}
