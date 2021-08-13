import {readFileSync} from "fs"
import dotenv from "dotenv"

export const mergeConfigs = async (files: string[]) => {
    const configs = await Promise.all(files.map(async file => {
        const fileContent = readFileSync(file.trim())
        return dotenv.parse(fileContent)
    }))
    return configs.reduce((acc, curr) => {
        Object.entries(curr).map(([key, value]) => acc[key.toLowerCase()] = value)
        return acc
    }, {})
}
