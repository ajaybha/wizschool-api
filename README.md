# Wizschool API
This project is part of the Wizschool solution template (for Immutable zkEVM) covering a dApp for minting Non Fungible Token, backed up by a custom API backend and set of smart contracts.

1. [Wizschool smart contracts](https://github.com/ajaybha/wizschool-contracts)
2. [Wizschool API backend](https://github.com/ajaybha/wizschool-api) ** This project ** 
3. [Wizschool web application](https://github.com/ajaybha/wizschool-web) 

Before building this project locally, you will need to have `nodejs` and a package manager `npm`, `pnpm` or `yarn` installed. The deployment instructions below have been tested with WSL2 on windows.

# Intialize the project
After cloning the repository locally on your machine, navigate to the project root directory and execute the following commands from a shell or terminal windows with VSCode. 

> The project is build using nodejs and express along with Typescript. `mongo`, `prisma`, `cron` and `@imtbl-sdk` are few other noteworthy packages. Some level of familiarity will be expected from [prisma](https://www.prisma.io), which is a light weight ORM that supports quite a few standard relation and no-sql databases. 

Install the project dependencies by runnign the `npm install` commadn on the project root
```shell
npm install
``` 
After the packages are installed, its time to check the `.env.sample` file and work on getting all inputs required to fill the entries. 
1. `DATABASE_URL` will require you to create a MongoDB database (cloud or local) and provide the connection string in the specified format. 
2. `PUBLISHABLE_KEY` is webapp safe key required to connect to Immutable Blockchain APIs. Please follow the link [here](https://docs.immutable.com/api/zkevm/apikeys/)

# Seeding the database
The project has been built with MongoDB as the backend document store. For ease of operations, we strongly recommended going ahead with MongoDB Atlas, which is the cloud-hosted offering of MongoDB. It comes with a free tier (shared resources) which can suffice for smaller development projects. 

> You can chose to use some other relational or no-sql database, as long as that is supported by Prisma and the defined ER model in project can be mapped to the physial database schema. This will need some changes and might require fine tuning of the CRUD queries written in `prisma` which you can find in `prisma` folder. 

1. Please go ahead and setup a MongoDB and update the environment file with the MongoDB URL. 

2. The project contains a `seed` script to generate the data using the defined schema model. Before running the script, we strongly advise you to have a look at the defined ORM schema udner the `prisma` folder. Please also familiarise yourself with basic working knowledge of prisma, it is quite easy to learn the basics and start using it the project. 

2. Run the following set of `prisma` commands to generate schema, validate it and then run the seed script.

> Note: The seed script reads some constants by referncing set of environment variables. It is good practice to look at the `.env` file and update the variables. The `.env.sample` file contains the description of each of the variables.

```shell
npx prisma generate 
# generates the schema
npx prisma validate
# validates the schema 
npx prisma db seed
# runs the db seed script and generate the collections and documents in the mongodb database. 
```
You can use your tool of choice (CLI, mongodb web portal etc) to look at your collection and cross check that the data has been populated by the script.

# Running the project
At this stage, you are in position to run the project 
```shell
npm run start
# this will run the start command configured in the `package.json` file 
```
If all goes well, your api server should be running on port 3000 on localhost. 

# API design
The project follows REST API design principles to design APIs for the User, Collection, Sale and Asset entities. Please check the `routes` folder to see the routes defined and the `controllers` folder for the controllers that use `prisma` to fetch/update the data. 

# Blockchain data from Immutable
The API project also polls the Immutable [Blockchain Data API](https://www.immutable.com/products/blockchain-data-apis) to look for any updates to the specified smart contracts deployed on chain. 
Without going into specifics, various events are pulled from this API and we filter that for the udpate events we are interested in. 
Check the `blockchaindata.ts` under `api` to understand what data is being fetched, filtered & updated in our data store. 

> To keep things simple, we use `cron` to call the blockchain api at a scheduled interval. 
Better frameworks & pattern exist to do this in a more reliable & scalable fashion. A design backlog item to be sure. 




 
