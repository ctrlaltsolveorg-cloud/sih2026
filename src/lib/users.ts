import { getDb } from './db';
import { supabase } from './supabase';
import { UserRole } from '@/context/AuthContext';

export interface UserInput {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  district?: string;
  state?: string;
  address?: string;
}

/**
 * Check if a user with given email already exists in SQLite DB
 */
export function checkUserExistsByEmail(email: string): boolean {
  if (!email) return false;
  const db = getDb();
  const row = db.prepare('SELECT id FROM users WHERE LOWER(email) = ?').get(email.toLowerCase().trim());
  return !!row;
}

/**
 * Insert new user row into SQLite DB & sync with Supabase
 */
export async function registerUserRow(input: UserInput) {
  const { name, email, phone, role, district, state, address } = input;
  const db = getDb();

  const userId = input.id || `u_${role.toLowerCase()}_${Date.now()}`;
  const userEmail = email.toLowerCase().trim();
  const userPhone = phone || `98${Math.floor(10000000 + Math.random() * 90000000)}`;
  const userDistrict = district || 'Nashik';
  const userState = state || 'Maharashtra';
  const userAddress = address || `${userDistrict}, ${userState}`;

  // 1. Check existing in SQLite
  const existing = db.prepare('SELECT id FROM users WHERE LOWER(email) = ?').get(userEmail);
  if (existing) {
    return {
      success: false,
      isExisting: true,
      user: db.prepare('SELECT * FROM users WHERE LOWER(email) = ?').get(userEmail),
      message: 'यह ईमेल पहले से पंजीकृत है! (User already registered with this email.)',
    };
  }

  // 2. Insert into SQLite `users` table
  db.prepare(`
    INSERT INTO users (id, name, phone, email, role, village, district, state, address)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    userId,
    name,
    userPhone,
    userEmail,
    role,
    'Village Hub',
    userDistrict,
    userState,
    userAddress
  );

  // 3. Create role-specific profile row
  if (role === 'FARMER') {
    db.prepare(`
      INSERT OR IGNORE INTO farmer_profiles (user_id, farm_name, fpo_id, total_land_acres, verification_status)
      VALUES (?, ?, ?, ?, ?)
    `).run(userId, `${name}'s Agro Farm`, 'fpo_nashik_1', 5.5, 'VERIFIED');
  }

  // 4. Sync to Supabase `users` table
  let supabaseStatus = 'Supabase Synced';
  try {
    const { error } = await supabase.from('users').insert([
      {
        id: userId,
        name,
        email: userEmail,
        phone: userPhone,
        role,
        district: userDistrict,
        state: userState,
        address: userAddress,
      },
    ]);
    if (error) {
      supabaseStatus = `SQLite Saved (Supabase Note: ${error.message})`;
    }
  } catch (err: any) {
    supabaseStatus = `SQLite Saved (${err.message})`;
  }

  return {
    success: true,
    isExisting: false,
    user: {
      id: userId,
      name,
      email: userEmail,
      phone: userPhone,
      role,
      district: userDistrict,
      state: userState,
      address: userAddress,
    },
    supabaseStatus,
  };
}
