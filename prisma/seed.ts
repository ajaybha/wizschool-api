
import { PrismaClient, SaleType, WalletType } from '@prisma/client';
import {contract_addr, account_addr} from "../src/utils/networks";


const prisma = new PrismaClient();

const baseUri_tokenImages = process.env.BASE_URI_TOKEN_IMAGES ? process.env.BASE_URI_TOKEN_IMAGES : "";
const baseUri_contractImages = process.env.BASE_URI_CONTRACT_IMAGES ? process.env.BASE_URI_CONTRACT_IMAGES : "";
const baseUri_token_external = process.env.BASE_URI_TOKEN_EXTERNAL ? process.env.BASE_URI_TOKEN_EXTERNAL : "";
const baseUri_contract_external = process.env.BASE_URI_CONTRACT_EXTERNAL ? process.env.BASE_URI_CONTRACT_EXTERNAL : "";

const bc_network = (process.env.NETWORK || 'localhost').toUpperCase();
const collection_contract_addr = contract_addr('collection', bc_network).toLowerCase();
const deployer_account_addr = account_addr('deployer', bc_network).toLowerCase();
const user1_account_addr = account_addr('user1', bc_network).toLowerCase();

console.log(`env vars: 
    network:${bc_network}
    collection-contract:${collection_contract_addr}
    deployer-account:${deployer_account_addr}
    user1-account:${user1_account_addr}`);

// this function is where we can seed data
async function run() {
  // insert users with no other assets or collections
  const users = await prisma.user.createMany( {
    data: [
        {
            // this is contract address
            name: "Brooms for the Wizards",
            address: collection_contract_addr,
            walletType: WalletType.Contract
        },
        {
            // this is deployer address
            name: "user account 1",
            address: user1_account_addr,
            walletType: WalletType.Contract
        }
    ]
  });
  const user = await prisma.user.upsert({
    where: { address: deployer_account_addr},
        update : {},
        create: {
            name: "Alice Inwon  (Local Deployer)",
            address: deployer_account_addr,
            email: "alice@mail.com",
            collection: {
                create: [
                    {
                        address: collection_contract_addr,
                        type: 'Erc721',
                        name: "Wizschool Broom NFT Collection for Wizards",
                        description: "A Broom NFT collection for the wizards of the Wizschool, on Immutable zkEVM",
                        image: `${baseUri_contractImages}/collection.webp`,
                        external_link: `${baseUri_contract_external}`,                        
                        sales: {
                            create: [
                                {
                                    startTime: "2024-07-22T00:00:00.594Z",
                                    endTime: "2024-08-31T00:00:00.594Z",
                                    mintSupply: 10,
                                    perWalletLimit:1,
                                    active: true
                                }
                            ]
                        },
                        assets: {
                            create: [
                                {
                                    tokenId: "1",
                                    minted: false,
                                    ownerAddress: collection_contract_addr,                                    
                                    name: "Wizschool Columbus #1",
                                    description: "Top broom for the Wizschool Wizard Racers",
                                    image: `${baseUri_tokenImages}/token1.webp`,
                                    external_url: `${baseUri_token_external}`,
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
                                    ],
                                },
                                {
                                    tokenId: "2",
                                    minted: false,
                                    ownerAddress: collection_contract_addr,
                                    name: "Wizschool Vasco #2",
                                    description: "Top broom for the Wizschool Wizard Explorers",
                                    image: `${baseUri_tokenImages}/token2.webp`,
                                    external_url: `${baseUri_token_external}`,
                                    attributes: [
                                        {
                                            trait_type: "Model",
                                            value: "Vasco 140"
                                        },
                                        {
                                            trait_type: "Speed",
                                            value: "Fast"
                                        },
                                        {
                                            trait_type: "Comfort",
                                            value: "90"
                                        }
                                    ],
                                }, 
                                {
                                    tokenId: "3",
                                    minted: false,
                                    ownerAddress: collection_contract_addr,
                                    name: "Wizschool Tenzing #3",
                                    description: "Top broom for the Wizschool Wizard Highflyers",
                                    image: `${baseUri_tokenImages}/token3.webp`,
                                    external_url: `${baseUri_token_external}`,
                                    attributes: [
                                        {
                                            trait_type: "Model",
                                            value: "Tenzing 8000"
                                        },
                                        {
                                            trait_type: "Speed",
                                            value: "Moderate"
                                        },
                                        {
                                            trait_type: "Comfort",
                                            value: "70"
                                        },
                                        {
                                            trait_type: "Altitude",
                                            value: "8848"
                                        }
                                    ],
                                },
                                {
                                    tokenId: "4",
                                    minted: false,
                                    ownerAddress: collection_contract_addr,                                    
                                    name: "Wizschool Columbus #4",
                                    description: "Top broom for the Wizschool Wizard Racers",
                                    image: `${baseUri_tokenImages}/token4.webp`,
                                    external_url: `${baseUri_token_external}`,
                                    attributes: [
                                        {
                                            trait_type: "Model",
                                            value: "Columbus 400"
                                        },
                                        {
                                            trait_type: "Speed",
                                            value: "Superfast"
                                        },
                                        {
                                            trait_type: "Comfort",
                                            value: "80"
                                        }
                                    ],
                                },
                                {
                                    tokenId: "5",
                                    minted: false,
                                    ownerAddress: collection_contract_addr,
                                    name: "Wizschool Vasco #5",
                                    description: "Top broom for the Wizschool Wizard Explorers",
                                    image: `${baseUri_tokenImages}/token5.webp`,
                                    external_url: `${baseUri_token_external}`,
                                    attributes: [
                                        {
                                            trait_type: "Model",
                                            value: "Vasco 340"
                                        },
                                        {
                                            trait_type: "Speed",
                                            value: "Superfast"
                                        },
                                        {
                                            trait_type: "Comfort",
                                            value: "90"
                                        }
                                    ],
                                }, 
                                {
                                    tokenId: "6",
                                    minted: false,
                                    ownerAddress: collection_contract_addr,
                                    name: "Wizschool Tenzing #6",
                                    description: "Top broom for the Wizschool Wizard Highflyers",
                                    image: `${baseUri_tokenImages}/token6.webp`,
                                    external_url: `${baseUri_token_external}`,
                                    attributes: [
                                        {
                                            trait_type: "Model",
                                            value: "Tenzing 600"
                                        },
                                        {
                                            trait_type: "Speed",
                                            value: "Moderate"
                                        },
                                        {
                                            trait_type: "Comfort",
                                            value: "70"
                                        },
                                        {
                                            trait_type: "Altitude",
                                            value: "6666"
                                        }
                                    ],
                                },
                                {
                                    tokenId: "7",
                                    minted: false,
                                    ownerAddress: collection_contract_addr,                                    
                                    name: "Wizschool Columbus #7",
                                    description: "Top broom for the Wizschool Wizard Racers",
                                    image: `${baseUri_tokenImages}/token7.webp`,
                                    external_url: `${baseUri_token_external}`,
                                    attributes: [
                                        {
                                            trait_type: "Model",
                                            value: "Columbus 600"
                                        },
                                        {
                                            trait_type: "Speed",
                                            value: "Superfast"
                                        },
                                        {
                                            trait_type: "Comfort",
                                            value: "70"
                                        }
                                    ],
                                },
                                {
                                    tokenId: "8",
                                    minted: false,
                                    ownerAddress: collection_contract_addr,
                                    name: "Wizschool Vasco #8",
                                    description: "Top broom for the Wizschool Wizard Explorers",
                                    image: `${baseUri_tokenImages}/token8.webp`,
                                    external_url: `${baseUri_token_external}`,
                                    attributes: [
                                        {
                                            trait_type: "Model",
                                            value: "Vasco 740"
                                        },
                                        {
                                            trait_type: "Speed",
                                            value: "Superfast"
                                        },
                                        {
                                            trait_type: "Comfort",
                                            value: "95"
                                        }
                                    ],
                                },
                                {
                                    tokenId: "9",
                                    minted: false,
                                    ownerAddress: collection_contract_addr,
                                    name: "Wizschool Tenzing #9",
                                    description: "Top broom for the Wizschool Wizard Highflyers",
                                    image: `${baseUri_tokenImages}/token9.webp`,
                                    external_url: `${baseUri_token_external}`,
                                    attributes: [
                                        {
                                            trait_type: "Model",
                                            value: "Tenzing 700"
                                        },
                                        {
                                            trait_type: "Speed",
                                            value: "Fast"
                                        },
                                        {
                                            trait_type: "Comfort",
                                            value: "70"
                                        },
                                        {
                                            trait_type: "Altitude",
                                            value: "7777"
                                        }
                                    ],
                                },
                                {
                                    tokenId: "10",
                                    minted: false,
                                    ownerAddress: collection_contract_addr,
                                    name: "Wizschool Gummy Bears #10",
                                    description: "Top broom for the Wizschool Wizard Funnybones",
                                    image: `${baseUri_tokenImages}/token10.webp`,
                                    external_url: `${baseUri_token_external}`,
                                    attributes: [
                                        {
                                            trait_type: "Model",
                                            value: "Funnybones 205"
                                        },
                                        {
                                            trait_type: "Speed",
                                            value: "Crawl"
                                        },
                                        {
                                            trait_type: "Comfort",
                                            value: "Uncomfortable"
                                        },
                                        {
                                            trait_type: "Altitude",
                                            value: "Underground"
                                        }
                                    ],
                                },
                            ]
                        }
                    }
                ]
            }
        },
    });

    console.log({user});
}

run()
    .catch((e)=> {
        console.log(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
    