import {endGroup, getInput, info, setFailed, setOutput, startGroup,} from "@actions/core"
import {mergeConfigs} from "./mergeConfigs"

async function main() {
    const files = getInput("paths").split(",")

    const mergedConfigs = mergeConfigs(files)

    startGroup("Outputs")

    Object.entries(mergedConfigs).forEach(([key, value]) => {
        info(`${key}: ${value}`)
        setOutput(key, value)
    })

    endGroup()
}

main().catch(e => setFailed(e))
