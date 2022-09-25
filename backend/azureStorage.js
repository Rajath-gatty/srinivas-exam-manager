const {BlobServiceClient, StorageSharedKeyCredential} = require("@azure/storage-blob");

exports.containerClient = (containerName='student-profiles') => {
    const account=process.env.AZURE_ACCOUNT_NAME;
    const accountKey=process.env.AZURE_API_KEY;
    const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
    const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`, 
    sharedKeyCredential
    );
    const containerClient = blobServiceClient.getContainerClient(containerName);
    return containerClient;
}