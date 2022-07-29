import { PrismaClient, Prisma } from '@prisma/client';
import { getUsersOldestFirst } from 'supertokens-node';
import { generateUsername } from '../src/lib/util';
import * as Auth from '../src/api/auth';

Auth.init();

const prisma = new PrismaClient();

async function main() {
    console.log(`Start seeding...`);

    const existingUsers = await getUsersOldestFirst();

    console.log(existingUsers.users);

    const users: Prisma.UserCreateInput[] = existingUsers.users.map(({ user }) => {
        const name = generateUsername(user.id);

        return {
            id: user.id,
            name,
            plan: 'FREE',
        };
    });

    console.log('Generating users...');

    await prisma.user.createMany({
        data: users,
    });

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
