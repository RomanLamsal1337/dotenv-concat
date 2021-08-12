import {getInput, setFailed, setOutput, } from "@actions/core"
import {mergeConfigs} from "./mergeConfigs"

async function main() {
    const files = getInput("paths").split(",")

    const mergedConfigs = mergeConfigs(files)

    Object.entries(mergedConfigs).forEach(([key, value]) => {
        setOutput(key, value)
    })
}

main().catch(e => setFailed(e))
