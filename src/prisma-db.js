import { PrismaClient } from './generated/prisma';
const prisma = new PrismaClient();

const seedPins = async () => {
  const count = await prisma.pin.count();
  if (count === 0) {
    await prisma.pin.createMany({
      data: [
        { x: 100, y: 200, feedback: 'Feedback 1' },
        { x: 200, y: 300, feedback: 'Feedback 2' },
        { x: 400, y: 400, feedback: 'Feedback 3' },
      ],
    });
  }
};

// Run seed if needed
//seedPins();

export async function getpins(query) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  if (query) {
    return prisma.pin.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { description: { contains: query } },
        ],
      },
    });
  }
  return prisma.pin.findMany();
}

export async function getpin(id) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return prisma.pin.findUnique({
    where: { id },
  });
}

export async function addpin(x, y, feedback) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return prisma.pin.create({
    data: { x, y, feedback },
  });
}

export async function updatepin(id, x, y, feedback) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return prisma.pin.update({
    where: { id },
    data: { x, y, feedback },
  });
}

export async function deletePins() {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const deletePins = await prisma.pin.deleteMany({});
  console.log(`Deleted ${deletePins.count} pins.`);
}
