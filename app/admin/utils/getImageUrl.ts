
export function getImageUrl(path?: string){

  if (!path){
    return "";
  }

   const fixedPath = path.replace(/\\/g, "/");

  if (fixedPath.startsWith("http")){
    return fixedPath;
  } 

  return `http://localhost:5000/${fixedPath}`;

};