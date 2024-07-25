import { PrismaClient, SaleType, WalletType } from '@prisma/client';

const prisma = new PrismaClient();
const baseUri_tokenImages = process.env.BASE_URI_TOKEN_IMAGES ? process.env.BASE_URI_TOKEN_IMAGES : "";
const baseUri_contractImages = process.env.BASE_URI_CONTRACT_IMAGES ? process.env.BASE_URI_CONTRACT_IMAGES : "";
const baseUri_token_external = process.env.BASE_URI_TOKEN_EXTERNAL ? process.env.BASE_URI_TOKEN_EXTERNAL : "";
const baseUri_contract_external = process.env.BASE_URI_CONTRACT_EXTERNAL ? process.env.BASE_URI_CONTRACT_EXTERNAL : "";
// this function is where we can seed data
async function run() {
  // insert the user (walletType: Contract) a
  const contractWallets = await prisma.user.createMany( {
    data: [
        {
            name: "Brooms for the Wizards",
            address: "0xff901b70eb902aefd9074e97a0bfca933d9de7bb",
            walletType: WalletType.Contract
        },
        {
            name: "Magic Wands for the Wizards",
            address: "0x2c440fa7ca1ea2ffeebd2b50b2d1d3ba100239e1",
            walletType: WalletType.Contract
        },
    ]
    
  });
  const user = await prisma.user.upsert({
    where: { address: "0x4efc5a06be496f33974d2a2758128a4aa8c94001"},
        update : {},
        create: {
            name: "Alice Inwon",
            address: "0x4efc5a06be496f33974d2a2758128a4aa8c94001",
            email: "alice@mail.com",
            collection: {
                create: [
                    {
                        address: "0xff901b70eb902aefd9074e97a0bfca933d9de7bb",
                        type: 'Erc721',
                        name: "Brooms for the Wizards",
                        description: "A Broom NFT collection for the wizards of the Wizschool, on Immutable zkEVM",
                        image: `${baseUri_contractImages}/collection.webp`,
                        external_link: `${baseUri_contract_external}`,
                        
                        sales: {
                            create: [
                                {
                                    startTime: "2024-07-22T09:00:00.594Z",
                                    endTime: "2024-08-22T09:00:00.594Z",
                                    mintSupply: 10,
                                    active: true
                                },
                                {
                                    startTime: "2024-09-01T09:00:00.594Z",
                                    endTime: "2024-10-31T09:00:00.594Z",
                                    saleType: SaleType.Secondary
                                }
                            ]
                        },
                        assets: {
                            create: [
                                {
                                    tokenId: "1",
                                    minted: false,
                                    ownerAddress: "0xff901b70eb902aefd9074e97a0bfca933d9de7bb",                                    
                                    name: "Wizschool Columbus 100",
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
                                    ownerAddress: "0xff901b70eb902aefd9074e97a0bfca933d9de7bb",
                                    name: "Wizschool Vasco 140",
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
                                    ownerAddress: "0xff901b70eb902aefd9074e97a0bfca933d9de7bb",
                                    name: "Wizschool Tenzing 8000",
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
                            ]
                        }
                    },
                    {
                        address: "0x2c440fa7ca1ea2ffeebd2b50b2d1d3ba100239e1",
                        type: 'Erc721',
                        name: "Magic Wands for the Wizards",
                        description: "A Magic Wand NFT collection for the wizards of the Wizschool, on Immutable zkEVM",
                        image: `${baseUri_contractImages}/collection.webp`,
                        external_link: `${baseUri_contract_external}`,
                    
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