import type { BaseAddress, CustomerDraft, CustomerSignInResult } from '@commercetools/platform-sdk';
import type { Data } from '../pages/signup/sign-up-page';

export const registerUser = async (data: Data): Promise<CustomerSignInResult> => {
  const apiHost = import.meta.env.VITE_API_HOST;
  const projectKey = import.meta.env.VITE_PROJECT_KEY;

  const accessToken = sessionStorage.getItem('anonymousToken');
  if (!accessToken) {
    throw new Error('Please obtain an anonymous token first.');
  }

  const billingAddress: BaseAddress = {
    country: data.billingCountry,
    firstName: data.firstName,
    lastName: data.lastName,
    streetName: data.billingStreet,
    postalCode: data.billingPostal.toString(),
    city: data.billingCity,
  };

  let addresses: BaseAddress[] = [];
  let defaultBillingAddress: number | undefined = undefined;
  let defaultShippingAddress: number | undefined = undefined;

  if (data.isSameAddress) {
    addresses = [billingAddress];
    if (data.defaultBillingAddress) {
      defaultBillingAddress = 0;
    }
    if (data.defaultShippingAddress) {
      defaultShippingAddress = 0;
    }
  } else {
    const shippingAddress: BaseAddress = {
      country: data.shippingCountry,
      firstName: data.firstName,
      lastName: data.lastName,
      streetName: data.shippingStreet,
      postalCode: data.shippingPostal,
      city: data.shippingCity,
    };
    addresses = [billingAddress, shippingAddress];
    if (data.defaultBillingAddress) {
      defaultBillingAddress = 0;
    }
    if (data.defaultShippingAddress) {
      defaultShippingAddress = 1;
    }
  }

  const customerDraft: CustomerDraft = {
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: data.dateOfBirth,
    addresses,
    defaultBillingAddress,
    defaultShippingAddress,
  };

  try {
    const response = await fetch(`${apiHost}${projectKey}/me/signup`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerDraft),
    });

    if (response.ok) {
      const result: CustomerSignInResult = await response.json();
      return result;
    } else {
      throw new Error(`Registration failed`);
    }
  } catch {
    throw new Error('An error occurred. Please try again.');
  }
};