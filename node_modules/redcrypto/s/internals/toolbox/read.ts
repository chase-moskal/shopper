
import {readFile} from "fs/promises"

export const read = async(path: string) => readFile(path, "utf8")
