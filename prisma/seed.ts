import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// this function is where we can seed data
async function run() {
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
                        primarySale: {
                            create: [
                                {
                                    startTime: "2024-07-22T09:00:00.594Z",
                                    endTime: "2024-08-22T09:00:00.594Z"
                                }
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

    // upsert a collection (for contract on chain)
    /*
    const collection = await prisma.collection.upsert( {
        where: { address: "0xff901b70eb902aefd9074e97a0bfca933d9de7bb"},
            update: {},
            create: {
                address: "0xff901b70eb902aefd9074e97a0bfca933d9de7bb",
                type: 'Erc721',
                ownerAddress: "0x4EFc5A06be496F33974D2A2758128a4aA8c94001",
                metadata: {
                    name: "Brooms for the Wizards",
                    description: "A Broom NFT collection for the wizards of the Wizschool, on Immutable zkEVM",
                    image: "https://ajaybha.github.io/wizschool-broom/collection.webp",
                    external_link: "https://ajaybha.github.io/wizschool-broom/",
                }
            },
    });
    */


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