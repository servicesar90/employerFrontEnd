export const handlestring =(string, length)=>{
    let cutString = string;
    if(string.length >length){
         cutString = `${string.slice(0,length)}...`;
    }
    return cutString;
}

