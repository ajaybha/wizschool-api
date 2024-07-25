import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import {config, blockchainData} from '@imtbl/sdk';
import { stringify } from 'querystring';

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

const prisma = new PrismaClient();
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
        await processMintEvent(resultItem);
    }
    
};

const processMintEvent = async (mintEvent:MintActivityResult) => {
    const tokenIdParam:string = mintEvent.details.asset.token_id;
    const contractAddr:string = mintEvent.details.asset.contract_address;
    const ownerAddr:string = mintEvent.details.to;
    const updatedTime:Date = new Date(mintEvent.updated_at);

    // if we have an asset with matching
    // tokenid, collectionAddress
    // and this is recent update from chain
    const updateAsset = await prisma.asset.updateMany({
        where: {
            tokenId: tokenIdParam,
            collectionAddress: contractAddr,
            updatedAt: {
                lt: updatedTime
            }
        },
        data: {
            ownerAddress: ownerAddr,
            minted: true
        }
    });
    if(updateAsset.count > 0) {
        console.log("updated asset");
    } else {
        console.log("check if user wallet exits");
        let userExist = await prisma.user.findUnique({
            where: {
                address: ownerAddr,
            },
            select: {
                address: true
            }
        });
        if(userExist === null) {
            console.log("user does not exist, create new wallet entry");
            await prisma.user.create( {
                data: {
                    address: ownerAddr
                }
            });
        }
        console.log("check if asset exists");
        let assetExist = await prisma.asset.findUnique({
            where: {
                tokenId: tokenIdParam,
                collectionAddress: contractAddr
            },
            select: {
                tokenId: true,
                collectionAddress: true
            }
        });
        if(assetExist === null) {
            console.log("asset does not exist, create new");
            await prisma.asset.create({
                data: {
                    tokenId: tokenIdParam,
                    ownerAddress: ownerAddr,
                    collectionAddress: contractAddr,
                    minted: true,
                    name: `Wizschool Columbus ${tokenIdParam}`,
                    description: "Top broom for the Wizschool Wizard Racers",
                    image: `https://ajaybha.github.io/wizschool-broom/tokens/${tokenIdParam}.webp`,
                    external_url: "https://ajaybha.github.io/wizschool-broom/",
                    attributes: [
                        {
                            trait_type: "Model",
                            value: "Columbus 100"
                        },
                        {
                            trait_type: "Speed",
                            value: "Superfast"
                        },
                        {
                            trait_type: "Comfort",
                            value: "40"
                        }
                    ]                   
                }
            });
            
            console.log("new asset created");
        } 
        else {
            console.log("Asset already exists and is already upto date - skipped update");
        }
    }
    
};

export {pollActivities};