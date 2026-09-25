import { expect, type APIRequestContext } from '@playwright/test';
import type { UserData } from '../testData/userData';

const MONTH_INDEX: Record<string, string> = {
  January: '1',
  February: '2',
  March: '3',
  April: '4',
  May: '5',
  June: '6',
  July: '7',
  August: '8',
  September: '9',
  October: '10',
  November: '11',
  December: '12',
};

export async function createUser(request: APIRequestContext, user: UserData): Promise<void> {
  const response = await request.post('/api/createAccount', {
    form: {
      name: user.name,
      email: user.email,
      password: user.password,
      title: user.title.replace('.', ''),
      birth_date: user.birthDay,
      birth_month: MONTH_INDEX[user.birthMonth],
      birth_year: user.birthYear,
      firstname: user.firstName,
      lastname: user.lastName,
      company: user.company,
      address1: user.address,
      address2: user.address2,
      country: user.country,
      zipcode: user.zipcode,
      state: user.state,
      city: user.city,
      mobile_number: user.mobileNumber,
    },
  });
  const body = await response.json();
  expect(body.responseCode, `createAccount failed: ${body.message}`).toBe(201);
}

export async function deleteUser(request: APIRequestContext, email: string, password: string): Promise<void> {
  const response = await request.delete('/api/deleteAccount', {
    form: { email, password },
  });
  const body = await response.json();
  expect(body.responseCode, `deleteAccount failed: ${body.message}`).toBe(200);
}
