import { json, error } from '@sveltejs/kit';
import { Storage } from '@google-cloud/storage';

import { GCLOUD_CREDENTIALS } from '$env/static/private';

const storage = new Storage({
    projectId: 'higherfinearts',
    credentials: JSON.parse(Buffer.from(GCLOUD_CREDENTIALS, 'base64').toString())
});
export async function GET(event) {
    let session = await event.locals.getSession()
    let options = {};

    if (session) {
        options = {
            prefix: session.user.id + "/"
        }
    }
    const [files] = await storage.bucket('images-higherfinearts').getFiles(options);
    let fileList = [];
    files.forEach(file => {
        fileList.push({
            name: file.name,
            time: file.metadata.timeCreated
        })
    })

    fileList.sort(function(x, y){
        return x.time - y.time;
    })

    
    return json({
        "files": fileList
    });
}