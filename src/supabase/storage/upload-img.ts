import imageCompression from "browser-image-compression";
import { supabaseClient } from "../client";


function getStorage() {
    const { storage } = supabaseClient()
    // console.log("storage", storage);
    return storage;
}

export const uploadImage = async (file: File): Promise<string | null> => {

    const filePath = `${file.name}-${Date.now()}`;
    const compressedFile = await imageCompression(file, { maxSizeMB: 1 });

    const storage = getStorage()

    ///store image in storage
    const { error } = await storage.from('posts-images').upload(filePath, compressedFile)
    if (error) {
        console.error('Upload-Image failed')
        return null;
    }

    //get image url
    const { data } = storage.from('posts-images').getPublicUrl(filePath)

    const filePublicUrl = data.publicUrl
    return filePublicUrl
}