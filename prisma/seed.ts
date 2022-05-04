import { PrismaClient } from '@prisma/client';
import { getUsersOldestFirst } from 'supertokens-node';
import { init } from '../src/api/auth';

init();

const prisma = new PrismaClient();

async function main() {
    console.log(`Start seeding ...`);
    const existingUsers = await getUsersOldestFirst();

    console.log(existingUsers.users);

    console.log(`Seeding finished.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
