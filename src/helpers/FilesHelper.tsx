import * as FileSystem from 'expo-file-system';


export type FilesContextProps = {
    writeFile: (path: string, data: string) => Promise<void>
    readFile: (path: string) => Promise<string>
}

const base_path = FileSystem.documentDirectory

export const writeFile = async (path: string, data: string) => {
    const res = await FileSystem.writeAsStringAsync(`${base_path}${path}`, data)
    console.log(res)
}

export const readFile = async (path: string) => {
    const res = await FileSystem.readAsStringAsync(`${base_path}${path}`)
    return res
}

