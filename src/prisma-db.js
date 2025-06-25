import { PrismaClient } from './generated/prisma';
const prisma = new PrismaClient();

const seedPins = async () => {
  const count = await prisma.pin.count();
  if (count === 0) {
    await prisma.pin.createMany({
      data: [
        { x: 10000, y: 500, feedback: 'Feedback 1' },
        { x: 1000, y: 700, feedback: 'Feedback 2' },
        { x: 4000, y: 1000, feedback: 'Feedback 3' },
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

// export async function deletepin(id) {
//   await new Promise((resolve) => setTimeout(resolve, 1500));
//   return prisma.pin.delete({
//     where: { id },
//   });
// }

export async function deletePins() {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const deletePins = await prisma.pin.deleteMany({});
  console.log(`Deleted ${deletePins.count} pins.`);
}
