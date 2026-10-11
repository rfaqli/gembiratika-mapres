import { db } from './index.js';
import { users } from './schema.js';
import { eq } from 'drizzle-orm';
import { adminDb } from '../lib/firebase-admin.js';

function getDocId(email: string) {
  return email.toLowerCase().replace(/[^a-z0-9_]/g, '_');
}

export async function createCustomUser(email: string, passwordHash: string, name?: string) {
  try {
    if (process.env.SQL_HOST || process.env.DATABASE_URL || process.env.POSTGRES_URL) {
      const result = await db.insert(users)
        .values({
          email,
          name: name || 'User',
          password: passwordHash,
          password_hash: passwordHash
        })
        .returning();
      if (result && result[0]) return result[0];
    }
  } catch (error) {
    console.warn("Postgres insert failed, saving to Firestore:", error);
  }

  try {
    const docId = getDocId(email);
    const userDoc = {
      id: docId,
      email,
      name: name || 'User',
      password: passwordHash,
      password_hash: passwordHash,
      role: email === 'rifkifadhilatilaqli@gmail.com' ? 'admin' : 'user',
      is_admin: email === 'rifkifadhilatilaqli@gmail.com',
      createdAt: new Date().toISOString(),
      created_at: new Date().toISOString()
    };
    await adminDb.collection('users').doc(docId).set(userDoc, { merge: true });
    return userDoc;
  } catch (err) {
    console.error("Firestore user creation failed:", err);
    throw err;
  }
}

export async function getUserByEmail(email: string) {
  try {
    if (process.env.SQL_HOST || process.env.DATABASE_URL || process.env.POSTGRES_URL) {
      const result = await db.select().from(users).where(eq(users.email, email));
      if (result && result[0]) return result[0];
    }
  } catch (error) {
    console.warn("Postgres query failed, fetching from Firestore:", error);
  }

  try {
    const docId = getDocId(email);
    const snapshot = await adminDb.collection('users').doc(docId).get();
    if (snapshot.exists) {
      return snapshot.data();
    }
    const querySnap = await adminDb.collection('users').where('email', '==', email).limit(1).get();
    if (!querySnap.empty) {
      return querySnap.docs[0].data();
    }
    return undefined;
  } catch (err) {
    console.error("Firestore query failed:", err);
    throw err;
  }
}

export async function updateUserPassword(email: string, passwordHash: string) {
  try {
    if (process.env.SQL_HOST || process.env.DATABASE_URL || process.env.POSTGRES_URL) {
      const result = await db.update(users)
        .set({ password: passwordHash })
        .where(eq(users.email, email))
        .returning();
      if (result && result[0]) return result[0];
    }
  } catch (error) {
    console.warn("Postgres update failed, updating in Firestore:", error);
  }

  try {
    const docId = getDocId(email);
    await adminDb.collection('users').doc(docId).set({
      password: passwordHash,
      password_hash: passwordHash,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return await getUserByEmail(email);
  } catch (err) {
    console.error("Firestore update password failed:", err);
    throw err;
  }
}

export async function updateUserProfile(email: string, data: { name: string; education: string; university: string; field: string; linkedin: string; }) {
  try {
    if (process.env.SQL_HOST || process.env.DATABASE_URL || process.env.POSTGRES_URL) {
      const result = await db.update(users)
        .set(data)
        .where(eq(users.email, email))
        .returning();
      if (result && result[0]) return result[0];
    }
  } catch (error) {
    console.warn("Postgres profile update failed, updating in Firestore:", error);
  }

  try {
    const docId = getDocId(email);
    await adminDb.collection('users').doc(docId).set({
      ...data,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return await getUserByEmail(email);
  } catch (err) {
    console.error("Firestore profile update failed:", err);
    throw err;
  }
}

export async function getUserProfile(email: string) {
  return getUserByEmail(email);
}

export async function getAllUsers() {
  try {
    if (process.env.SQL_HOST || process.env.DATABASE_URL || process.env.POSTGRES_URL) {
      const result = await db.select().from(users);
      if (result && result.length > 0) return result;
    }
  } catch (error) {
    console.warn("Postgres select all failed, fetching from Firestore:", error);
  }

  try {
    const snapshot = await adminDb.collection('users').get();
    return snapshot.docs.map(d => d.data());
  } catch (err) {
    console.error("Firestore getAllUsers failed:", err);
    throw err;
  }
}

