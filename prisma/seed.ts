import { PrismaClient, SaleType, WalletType } from '@prisma/client';

const prisma = new PrismaClient();

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
    where: { address: "0x4EFc5A06be496F33974D2A2758128a4aA8c94001"},
        update : {},
        create: {
            name: "Alice Inwon",
            address: "0x4EFc5A06be496F33974D2A2758128a4aA8c94001",
            email: "alice@mail.com",
            collection: {
                create: [
                    {
                        address: "0xff901b70eb902aefd9074e97a0bfca933d9de7bb",
                        type: 'Erc721',
                        metadata: {
                            name: "Brooms for the Wizards",
                            description: "A Broom NFT collection for the wizards of the Wizschool, on Immutable zkEVM",
                            image: "https://ajaybha.github.io/wizschool-broom/collection.webp",
                            external_link: "https://ajaybha.github.io/wizschool-broom/",
                        },
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
                                    metadata: {
                                        name: "Wizschool Columbus 100",
                                        description: "Top broom for the Wizschool Wizard Racers",
                                        image: "https://ajaybha.github.io/wizschool-broom/tokens/token1.webp",
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
                                    },

                                },
                                {
                                    tokenId: "2",
                                    minted: false,
                                    ownerAddress: "0xff901b70eb902aefd9074e97a0bfca933d9de7bb",
                                    metadata: {
                                        name: "Wizschool Vasco 140",
                                        description: "Top broom for the Wizschool Wizard Explorers",
                                        image: "https://ajaybha.github.io/wizschool-broom/tokens/token2.webp",
                                        external_url: "https://ajaybha.github.io/wizschool-broom/",
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
                                        ]
                                    },
                                }, 
                                {
                                    tokenId: "3",
                                    minted: false,
                                    ownerAddress: "0xff901b70eb902aefd9074e97a0bfca933d9de7bb",
                                    metadata: {
                                        name: "Wizschool Tenzing 8000",
                                        description: "Top broom for the Wizschool Wizard Highflyers",
                                        image: "https://ajaybha.github.io/wizschool-broom/tokens/token3.webp",
                                        external_url: "https://ajaybha.github.io/wizschool-broom/",
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
                                        ]
                                    },
                                },
                            ]
                        }
                    },
                    {
                        address: "0x2c440fa7ca1ea2ffeebd2b50b2d1d3ba100239e1",
                        type: 'Erc721',
                        metadata: {
                            name: "Magic Wands for the Wizards",
                            description: "A Magic Wand NFT collection for the wizards of the Wizschool, on Immutable zkEVM",
                            image: "https://ajaybha.github.io/wizschool-broom/collection.webp",
                            external_link: "https://ajaybha.github.io/wizschool-broom/",
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