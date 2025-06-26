import multer from 'multer';
import path from 'path';
import crypto from 'crypto';


const uploadFloder = path.resolve(__dirname, '..', '..', 'uploads');
export default{
    directory: uploadFloder,
    storage: multer.diskStorage({
        destination: uploadFloder,
        filename(request, file, callback){
            const fileHash = crypto.randomBytes(10).toString('hex');
            const filename = `${fileHash}-${file.originalname}`;
            callback(null, filename);
        }
    })
}