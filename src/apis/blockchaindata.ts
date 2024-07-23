import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import {config, blockchainData} from '@imtbl/sdk';

const PublishableKey = process.env.PUBLISHABLE_KEY;
const client = new blockchainData.BlockchainData({
    baseConfig: {
        environment: config.Environment.SANDBOX,
        publishableKey: PublishableKey
    }
});
// constants for polling request parameters
const chainName: string = process.env.SANDBOX_CHAIN_NAME ? process.env.SANDBOX_CHAIN_NAME : "";
const contractAddress: string = process.env.SANDBOX_DEFAULT_COLLECTION_CONTRACT_ADDR ? process.env.SANDBOX_DEFAULT_COLLECTION_CONTRACT_ADDR : "";

const pollActivities = async () => {
    console.log("polling blockchaindata api for chain activity");
    
    const response = await client.listActivities({
        chainName,
        contractAddress
    });
    
    // filter only the mint activity    
    response.result.filter(result => result.type == 'mint');
    console.log("Filtered mint activities");
    console.log(JSON.stringify(response, null, "\t"));
    
};

export {pollActivities};