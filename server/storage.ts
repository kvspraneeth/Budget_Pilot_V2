// import { type User, type InsertUser } from "@shared/schema";
// import { randomUUID } from "crypto";

// // modify the interface with any CRUD methods
// // you might need

// export interface IStorage {
//   getUser(id: string): Promise<User | undefined>;
//   getUserByUsername(username: string): Promise<User | undefined>;
//   createUser(user: InsertUser): Promise<User>;
// }

// export class MemStorage implements IStorage {
//   private users: Map<string, User>;

//   constructor() {
//     this.users = new Map();
//   }

//   async getUser(id: string): Promise<User | undefined> {
//     return this.users.get(id);
//   }

//   async getUserByUsername(username: string): Promise<User | undefined> {
//     return Array.from(this.users.values()).find(
//       (user) => user.username === username,
//     );
//   }

//   async createUser(insertUser: InsertUser): Promise<User> {
//     const id = randomUUID();
//     const user: User = { ...insertUser, id };
//     this.users.set(id, user);
//     return user;
//   }
// }

// export const storage = new MemStorage();
import { users, type User, type InsertUser } from "../shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByGoogleId(googleId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByGoogleId(googleId: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.googleId, googleId));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
}

export const storage = new DatabaseStorage();
