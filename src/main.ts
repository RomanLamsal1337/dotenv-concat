import dotenv from "dotenv"
import {getBooleanInput, getInput, info, setFailed, setOutput} from "@actions/core"
import {readFileSync} from "fs"

async function main() {
    const files = getInput("paths").split(",")
    const configs = await Promise.all(files.map(async file => {
        const fileContent = readFileSync(file)
        return dotenv.parse(fileContent)
    }))
    const mergedConfigs = configs.reduce((acc, curr) => {
        Object.entries(curr).map(([key, value]) => acc[key.toLowerCase()] = value)
        return acc
    }, {})

    info("Env vars: " + JSON.stringify(mergedConfigs))

    Object.entries(mergedConfigs).forEach(([key, value]) => {
        setOutput(key, value)
    })
}

main().catch(e => setFailed(e))