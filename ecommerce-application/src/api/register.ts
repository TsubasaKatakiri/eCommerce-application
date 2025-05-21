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
    country: getCountryCode(data.billingValue),
    firstName: data.firstname,
    lastName: data.lastname,
    streetName: data.billingStreet,
    postalCode: data.billingPostal.toString(),
    city: data.billingCity,
  };

  const shippingAddress: BaseAddress = {
    country: getCountryCode(data.shippingValue),
    firstName: data.firstname,
    lastName: data.lastname,
    streetName: data.shippingStreet,
    postalCode: data.shippingPostal.toString(),
    city: data.shippingCity,
  };

  const customerDraft: CustomerDraft = {
    email: data.email,
    password: data.password,
    firstName: data.firstname,
    lastName: data.lastname,
    dateOfBirth: data.birthday,
    addresses: [billingAddress, shippingAddress],
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

function getCountryCode(data: string): string {
  const country: string = data.split(',')[0];
  let value: string = '';
  switch (country) {
    case 'United States': {
      value = 'US';
      break;
    }
    case 'Germany': {
      value = 'DE';
      break;
    }
    case 'Russia': {
      value = 'RU';
      break;
    }
    case 'Belarus': {
      value = 'BY';
      break;
    }
    case 'France': {
      value = 'FR';
      break;
    }
    case 'Spain': {
      value = 'ES';
      break;
    }
  }
  return value;
}
