import { json, error } from '@sveltejs/kit';
import { Storage } from '@google-cloud/storage';

import { GCLOUD_PROJECT_ID, GCLOUD_PRIVATE_KEY_ID, GCLOUD_PRIVATE_KEY, GCLOUD_CLIENT_EMAIL, GCLOUD_CLIENT_ID, GCLOUD_CERT_URL} from '$env/static/private';

const storage = new Storage({
    projectId: 'higherfinearts',
    credentials: {
        "type": "service_account",
        "project_id": GCLOUD_PROJECT_ID,
        "private_key_id": GCLOUD_PRIVATE_KEY_ID,
        "private_key": GCLOUD_PRIVATE_KEY,
        "client_email": GCLOUD_CLIENT_EMAIL,
        "client_id": GCLOUD_CLIENT_ID,
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": GCLOUD_CERT_URL,
        "universe_domain": "googleapis.com"
    }      
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