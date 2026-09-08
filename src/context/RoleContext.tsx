'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'FARMER' | 'FPO' | 'BUYER' | 'HUB_OPERATOR' | 'TRANSPORTER' | 'ADMIN';

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  userId: string;
  userName: string;
  userPhone: string;
  fpoId?: string;
  loginAs: (role: UserRole, id: string, name: string, phone: string, fpoId?: string) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>('FARMER');
  const [userId, setUserId] = useState<string>('u_farmer_1');
  const [userName, setUserName] = useState<string>('Ramesh Patil');
  const [userPhone, setUserPhone] = useState<string>('9876543210');
  const [fpoId, setFpoId] = useState<string | undefined>('fpo_nashik_1');

  useEffect(() => {
    const savedRole = localStorage.getItem('kisanbandhan_role') as UserRole;
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    localStorage.setItem('kisanbandhan_role', newRole);

    if (newRole === 'FARMER') {
      setUserId('u_farmer_1');
      setUserName('Ramesh Patil');
      setUserPhone('9876543210');
      setFpoId('fpo_nashik_1');
    } else if (newRole === 'FPO') {
      setUserId('u_fpo_1');
      setUserName('Sanjay Deshmukh');
      setUserPhone('9876543219');
      setFpoId('fpo_nashik_1');
    } else if (newRole === 'BUYER') {
      setUserId('u_buyer_2');
      setUserName('Annapurna Hotel & Catering');
      setUserPhone('9822233344');
      setFpoId(undefined);
    } else if (newRole === 'HUB_OPERATOR') {
      setUserId('u_hub_1');
      setUserName('Rajesh Kulkarni (Hub Supervisor)');
      setUserPhone('9900088877');
      setFpoId(undefined);
    } else if (newRole === 'TRANSPORTER') {
      setUserId('u_partner_1');
      setUserName('Vikram Shinde Fleet');
      setUserPhone('9900011122');
      setFpoId(undefined);
    } else if (newRole === 'ADMIN') {
      setUserId('u_admin_1');
      setUserName('Ministry Governance Admin');
      setUserPhone('9000000000');
      setFpoId(undefined);
    }
  };

  const loginAs = (newRole: UserRole, id: string, name: string, phone: string, fpoIdInput?: string) => {
    setRoleState(newRole);
    setUserId(id);
    setUserName(name);
    setUserPhone(phone);
    setFpoId(fpoIdInput);
    localStorage.setItem('kisanbandhan_role', newRole);
  };

  return (
    <RoleContext.Provider value={{ role, setRole, userId, userName, userPhone, fpoId, loginAs }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}
