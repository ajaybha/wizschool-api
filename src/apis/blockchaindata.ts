import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import {config, blockchainData} from '@imtbl/sdk';

/***
 * The default type definitions from SDK don't resolve
 * quick/dirty happy path strong-type definition for the result JSON object
 */

interface MintActivityResult {
    blockchain_metadata:
    {
        block_number: number,
        log_index: number,
        transaction_hash: string,
        transaction_index: number
    },
    chain: {
        id: string,
        name: string
    },
    details: {
        amount: number,
        asset:
        {
            token_id: string,
            contract_type: string,
            contract_address: string
        },
        to:string,
    },
    id: string,
    indexed_at: string,
    type: string,
    updated_at: string
};

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
    //console.log("Filtered mint activities");
    //console.log(JSON.stringify(response.result, null, '\t'));
    const resultArray: MintActivityResult[] = JSON.parse(JSON.stringify(response.result));
    for(var resultItem of resultArray) {
        console.log(JSON.stringify(resultItem,null, '\t'));
    }
    
};

export {pollActivities};