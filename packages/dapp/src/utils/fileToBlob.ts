export const fileToBlob = ({obj,fileName}) => {
  const blob = new Blob([JSON.stringify(obj)], {type : 'application/json'})
  const blobFile = new File([blob], `${fileName}.json`)
  return blobFile
}