import { Web3Storage, getFilesFromPath } from 'web3.storage'

export class Storage {
  private client
  constructor(apiToken:string) {
    this.client = new Web3Storage({ token: apiToken })
  }

  add = async (fileBlob:Blob) => {
    // const files = await getFilesFromPath(path)
    const rootCid = await this.client.put(fileBlob)
    localStorage.setItem("rootCid", rootCid);

  }

  remove = async (rootCid) => {
    // const files = await getFilesFromPath('./files')
    // const rootCid = await this.client.put(files)
  }

  get = async (rootCid) => {
    const res = await this.client.get(rootCid) 
    const files = await res.files()
    return files
  }

}