import { BaseAddress } from '@commercetools/platform-sdk';
import './address-card.css';
import Cross from '../../assets/svg/cross.svg?react';
import Edit from '../../assets/svg/edit.svg?react';

interface Properties {
  address: BaseAddress;
  type: 'billing' | 'shipping';
  isDefault: boolean;
  onEdit: (address: BaseAddress) => void;
  onDelete: (addressId: string) => void;
  onSetDefault: (addressId: string, type: 'billing' | 'shipping') => void;
}

const AddressCard: React.FC<Properties> = ({address, type, isDefault, onEdit, onDelete, onSetDefault}: Properties) => {
    return (
        <div className={`address-card ${isDefault ? 'address-card__default' : ''}`}>
            <div className='address-card_radio'>
                <input
                    type="radio"
                    name={`default-${type}`}
                    checked={isDefault}
                    onChange={() => onSetDefault(address.id!, type)}
                />
            </div>
            <div className='address-card_data'>
                <p>{address.firstName} {address.lastName}</p>
                <p>{address.streetName}</p>
                <p>{address.city}, {address.postalCode}</p>
                <p>{countryCodeToName(address.country)}</p>
                <div className='address-card_buttons'>
                    <button onClick={() => onEdit(address)} className='address-card_button'><Edit/></button>
                    <button onClick={() => onDelete(address.id!)} className='address-card_button'><Cross/></button>
                </div>
            </div>
        </div>
    );
};

export default AddressCard;

function countryCodeToName(code: string): string{
  let value = '';
  switch (code) {
    case 'US': {
      value = 'United States';
      break;
    }
    case 'DE': {
      value = 'Germany';
      break;
    }
    case 'RU': {
      value = 'Russia';
      break;
    }
    case 'BY': {
      value = 'Belarus';
      break;
    }
    case 'FR': {
      value = 'France';
      break;
    }
    case 'ES': {
      value = 'Spain';
      break;
    }
  }
  return value;
}