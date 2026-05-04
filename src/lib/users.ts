import { ObjectId } from "mongodb";
import { getDb } from "./mongodb";

export interface DbUser {
  _id: ObjectId;
  email: string;
  name?: string;
  image?: string;
  googleId?: string;
  passwordHash?: string;
  createdAt: Date;
}

export async function findOrCreateUser(data: {
  email: string;
  name?: string | null;
  image?: string | null;
  googleId?: string;
}): Promise<DbUser> {
  const db = await getDb();
  const users = db.collection<DbUser>("users");
  const email = data.email.toLowerCase();

  const existing = await users.findOne({ email });
  if (existing) {
    await users.updateOne(
      { _id: existing._id },
      {
        $set: {
          name: data.name ?? existing.name,
          image: data.image ?? existing.image,
        },
      },
    );
    return {
      ...existing,
      name: data.name ?? existing.name,
      image: data.image ?? existing.image,
    };
  }

  const newUser: Omit<DbUser, "_id"> = {
    email,
    name: data.name ?? undefined,
    image: data.image ?? undefined,
    googleId: data.googleId,
    createdAt: new Date(),
  };
  const result = await users.insertOne(newUser as DbUser);
  return { ...newUser, _id: result.insertedId } as DbUser;
}

export async function getUserByEmail(
  email: string,
): Promise<DbUser | null> {
  const db = await getDb();
  return db
    .collection<DbUser>("users")
    .findOne({ email: email.toLowerCase() });
}

export async function createUserWithPassword(data: {
  email: string;
  name?: string;
  passwordHash: string;
}): Promise<DbUser> {
  const db = await getDb();
  const users = db.collection<DbUser>("users");
  const email = data.email.toLowerCase();
  const existing = await users.findOne({ email });
  if (existing) throw new Error("EMAIL_EXISTS");
  const newUser: Omit<DbUser, "_id"> = {
    email,
    name: data.name,
    passwordHash: data.passwordHash,
    createdAt: new Date(),
  };
  const result = await users.insertOne(newUser as DbUser);
  return { ...newUser, _id: result.insertedId } as DbUser;
}
