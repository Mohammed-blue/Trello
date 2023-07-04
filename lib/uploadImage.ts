import { ID, storage } from '@/appwrite';

const uploadImage = async (file: File) => {
    if (!file) return;

    const fileUploaded = await storage.createFile(
        '64837e3cca2cd1809e14',
        ID.unique(),
        file
    );

    return fileUploaded;
}

export default uploadImage
