import { createClient } from "@supabase/supabase-js";

const url = "https://kftjgamqtehphboqwiow.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmdGpnYW1xdGVocGhib3F3aW93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyODE0MTgsImV4cCI6MjA4MDg1NzQxOH0.GtC11LIwFKBdy_4I0o41G3xtIk3ElzWbJJr-W7Txz5Q";

const supabase = createClient(url, key); //connection to the supabase

export  default function uploadFile(file){
    return new Promise((resolve, reject)=>{
        const timestamp = Date.now();
        const filename = timestamp + "_" + file.name; //to avoid same name file upload issue
        supabase.storage.from("images").upload(filename,file,{   //"images" is the bucket name of the supabase storage
            cacheControl:"3600",
            upsert:false
        }).then(()=>{
            const publicUrl = supabase.storage.from("images").getPublicUrl(filename).data.publicUrl;
            resolve(publicUrl);
    }).catch((error)=>{
        reject(error);
    });
}
)};

