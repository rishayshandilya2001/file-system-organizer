let fs=require("fs")
let path=require("path")
let inputarray=process.argv.slice(2)
console.log(inputarray)
let command=inputarray[0]
let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}
switch(command)
{
    case "tree":
        {
            treefn(inputarray[1])
          break;
        }

    case "organize":
        {
            organize(inputarray[1])
            break;
        }
    
    case "help":
        {
            help(inputarray[1])
            break;
        }
    
    default:
        {
        console.log("🙏input right command");
        break;
        }
}

function treefn(dirpath)
{
    console.log("tree command implemented for ",dirpath)
}

function organize(dirpath) {
   let newpath=path.join(dirpath,"organized_files")
   if(fs.existsSync(newpath)==false)
   {
    fs.mkdirSync(newpath)
   }
   makefolders(dirpath,newpath)
}
function help(dirpath)
{
    console.log(`list of all commands
    node main.js tree directorypath
    node main.js organize directorypath
    node main.js help`);
    console.log("help implemented for ",dirpath)
}

function makefolders(dirpath,newpath)
{
    
//  for(x in types)
//  {
//     let newfolderpath=path.join(dirpath,x)
//     fs.mkdirSync(newfolderpath)
//  }
 let content=fs.readdirSync(dirpath)

 for(let i=0;i<content.length;i++)
 {
    let childadress=path.join(dirpath,content[i])
    let isfile=fs.lstatSync(childadress).isFile()
    if(isfile)
    {
        
        let extension=path.extname(childadress)
        extension=extension.slice(1)
        let finalextension=checkext(extension)
        organizefiles(childadress,newpath,finalextension)
    }
     
 }
}

function organizefiles(src,dest,ext)
{
  let destpath=path.join(dest,ext)
  if(fs.existsSync(destpath)==false)
  {
    fs.mkdirSync(destpath)
  }
  fs.copyFileSync(src,destpath)
}


function checkext(ext) {
    for (let type in types) {
        if (types[type].includes(ext)) {
            return type;
        }
    }
    return 'others'; // If the extension doesn't match any type
}
