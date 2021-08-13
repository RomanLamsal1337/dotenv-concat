import * as fs from "fs"
import {mergeConfigs} from "./mergeConfigs"
import {readFileSync} from "fs"

jest.mock("fs")
const readFileSyncMock = readFileSync as jest.Mock

describe("mergeConfig", () => {
    it("should read a single file", async () => {
        // given
        const fileContents = "FOO=bar"
        readFileSyncMock.mockReturnValueOnce(fileContents)

        // when
        const merged = await mergeConfigs([''])

        // then
        expect(merged).toEqual({foo: "bar"})
    })
    it("should read a merge multiples files with collission", async () => {
        // given
        const key = "FoO"
        const firstValue = "foo"
        const secondValue = "bar"
        readFileSyncMock.mockReturnValueOnce(`${key}=${firstValue}`)
        readFileSyncMock.mockReturnValueOnce(`${key}=${secondValue}`)

        // when
        const merged = await mergeConfigs(['', ''])

        // then
        expect(merged).toEqual({[key.toLowerCase()]: secondValue})
    })
    it('should trim filename before trying to read file', async () => {
        // given
        const file = " .env.foo "
        readFileSyncMock.mockReturnValueOnce("")

        // when
        await mergeConfigs([file])

        // then
        expect(readFileSyncMock).toBeCalledWith(file.trim())
    })
    it('should read configs with a comment', async () => {
        // given
        const content = "FOO=bar"
        readFileSyncMock.mockReturnValueOnce(`# blabla\n${content}`)

        // when
        const merged = await mergeConfigs([''])

        // then
        expect(merged).toEqual({ foo: "bar" })
    })
})
