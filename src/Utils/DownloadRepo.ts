import https from 'https';
import fs from 'fs';
import Logging from '../library/Logging';
import { rejects } from 'assert';
import { error } from 'console';

export async function downloadRepo(url: string, dest: string) {
    const file = fs.createWriteStream(dest);

    https
        .request(url, function (response) {
            if (response.statusCode !== 200) {
                throw new Error(`Failed to download zip: ${response.statusCode} ${response.statusMessage}`);
            }

            response.pipe(file);
            file.on('finish', function () {
                file.close(); // close() is async, call cb after close completes.
                Logging.info(`The repo has been successefuly downloaded on following location ${dest}`);
            });
        })
        .on('error', function (err) {
            // Handle errors
            fs.unlink(dest, () => Logging.error(err)); // Delete the file async. (But we don't check the result)
        });
}
