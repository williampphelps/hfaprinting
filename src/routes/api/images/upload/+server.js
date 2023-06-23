import { json, error } from '@sveltejs/kit';
import { Storage } from '@google-cloud/storage';
import { randomUUID } from 'crypto';

import { GCLOUD_CREDENTIALS } from '$env/static/private';

const storage = new Storage({
    projectId: 'higherfinearts',
    credentials: JSON.parse(Buffer.from(GCLOUD_CREDENTIALS, 'base64').toString())    
});
export async function POST(event) {
    let session = await event.locals.getSession();

    if (session) {

        let fileName = session.user.id + "/" + randomUUID();

        const file = await storage.bucket('images-higherfinearts').file(fileName);

        const [url] = await file.getSignedUrl({
            version: 'v4',
            action: 'write',
            expires: Date.now() + 15 * 60 * 1000,
            contentType: 'application/octet-stream',
            method: 'PUT',

        });
        return json({
            url: url,
            file: fileName
        })
    } else {
        throw error(401, 'Not Authorized')
    }
}