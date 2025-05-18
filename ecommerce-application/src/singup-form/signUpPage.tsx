import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './singupPage.css';

type Data={
	billingCity:string,
	billingPostal: number,
	billingStreet: string,
	billingValue: string,
	birthday:string,
	commonAddress: boolean,
	defaultBillingAddress:boolean,
	defaultShippingAddress: boolean,
	email: string,
	firstname: string,
	lastname: string,
	password: string,
	shippingCity: string,
	shippingPostal: number,
	shippingStreet: string,
	shippingValue: string
}
/*
const clientId: string ="YoiwRaSBvj3yNdFx2Wu_vYgy"
const clientSecret: string = "BHH278dO3Zv2kGDhjmBo_lD3zTxsdmkU"
const projectKey: string = "tsukisakura"

async function getAnonymousToken(): Promise<void> {
	const response = await fetch('https://auth.europe-west1.gcp.commercetools.com/oauth/tsukisakura/anonymous/token',
		{	method: 'POST',
		headers: {
			'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`),
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: `grant_type= client_credentials&scope=manage_my_profile:${projectKey}`
	});
	const tokenData = await response.json();
	localStorage.setItem('anonymousToken', tokenData.access_token);
}
*/
const SignUpPage = () => {
    const {
				register,
				handleSubmit,
				formState: { errors }
			} = useForm<Data>();
		
			const onSubmit = (data: Data): void => {
				console.log(data);
				addCustomer(data);
			};
		

			const [billingValue, setbillingValue] = useState<string>('');
			const [shippingValue, setshippingValue] = useState<string>('');
			const [defaultShippingAddress, setdefaultShippingAddress] = useState<boolean>(false);
			const [defaultBillingAddress, setdefaultBillingAddress] = useState<boolean>(false);
			const [commonAddress, setcommonAddress] = useState<boolean>(false);
			const [showPassword,setShowPassword] = useState<boolean>(false)
			
			const countries: ((number|string)[])[] = [['Germany',
					 5], ['United States', 5], ['Russia', 6], ['Belarus', 6], ['France', 5], ['Spain',5]];
	 
			let options = countries.map((country, index) => {
				return ( 
					<option className="singup-form__option" value={country[index]} key={index}>{countries[index][0]}</option> 
				)
			});
	
			return (
				<div>
					<Link to="/" className="singup-form__label">go back to the main page</Link>
					<form className="singup-form__wrapper" onSubmit={handleSubmit(onSubmit)}>
					 <h1 className="singup-form__title">Sin Up</h1> 
					 <p className="singup-form__register">Have you not registered yet?</p>
					<div className="singup-form__group">
						<label className='singup-form__label'>Email</label>
						<div className='singup-form__input-group'>
							<input className='singup-form__input' placeholder="email" {...register('email', {pattern: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i, required: true })}/>
							{errors.email?.type === "required" && (
							<p className="singup-form__error">Email is required.</p>
							)}
							{errors.email?.type === "pattern" && (
							<p className="singup-form__error">Email is not valid.</p>
							)}
						</div>
					</div>
		
					<div className="singup-form__group">
					<label className='singup-form__label'>Password</label>
					<div className='singup-form__input-group'>
					
						<div className='singup-form__input-password'>
						<input className='singup-form__input' type={showPassword ? "text" : "password"} placeholder="password"  {...register('password', { pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, required: true })} /> 
						<button
							type="button"
							className="singup-form__password-button"
							onClick={() => {
								setShowPassword((prev) => !prev);
							}}>
							{showPassword ? "Hide" : "Show"}
						</button>
						</div>
						{errors.password?.type === "required" && (
							<p className="singup-form__error">Password is required.</p>
						)}
						{errors.password?.type === "pattern" && (
							<p className="singup-form__error">The password must contain at least 8 characters. Of these: 1 uppercase letter, 1 lowercase letter and 1 digit.</p>
						)}
					 </div>
				</div>
		
					<div className="singup-form__group">
						<label className='singup-form__label'>Firstname</label>
						<div className='singup-form__input-group'>
						<input className='singup-form__input' placeholder="firstname" {...register('firstname', { pattern: /^(?=.*?[A-Za-z]).{1,}$/, required: true })} /> 
					{errors.firstname?.type === "required" && (
						<p className="singup-form__error">Firstname is required.</p>
					)}
					{errors.firstname?.type === "pattern" && (
						<p className="singup-form__error">The firstname must contain at least one character and not have any special characters or numbers.</p>
					)}
					</div>
				</div>
		
					<div className="singup-form__group">
					<label className='singup-form__label'>Lastname</label>
						<div className='singup-form__input-group'>
						<input className='singup-form__input' placeholder="lastname" {...register('lastname', { pattern: /^(?=.*?[A-Za-z]).{1,}$/, required: true })} /> 
					{errors.lastname?.type === "required" && (
						<p className="singup-form__error">Lastname is required.</p>
					)}
					{errors.lastname?.type === "pattern" && (
						<p className="singup-form__error">The lastname must contain at least one character and not have any special characters or numbers.</p>
					)}
					</div>
				</div>
		
					<div className="singup-form__group">
					<label className='singup-form__label'>Birthday</label>
						<div className='singup-form__input-group'>
						<input className='singup-form__input' type="date" placeholder="birthday"  {...register('birthday', {required: true })} /> 
					{errors.birthday?.type === "required" && (
						<p className="singup-form__error">Birthday is required.</p>
					)}
					</div>
				</div>
		
				<div className='singup-form__address'>
					<fieldset className='singup-form__fielset'>
					<legend className='singup-form__legend'>Billing Address</legend>
		
					<div className="singup-form__group">
					
					<label className='singup-form__label'>Street</label>
					<div className='singup-form__input-group'>
					<input className='singup-form__input' placeholder="street" {...register('billingStreet', { pattern: /^(?=.*?[A-Za-z]).{1,}$/, required: true })} /> 
						{errors.billingStreet?.type === "required" && (
						<p className="singup-form__error">Street is required.</p>
					)}
					{errors.billingStreet?.type === "pattern" && (
						<p className="singup-form__error">The Street must contain at least one character and not have any special characters or numbers..</p>
					)}
					</div>
				 </div>
		
					<div className="singup-form__group">
					<label className='singup-form__label'>City</label>
					<div className='singup-form__input-group'>
					<input className='singup-form__input' placeholder="city" {...register('billingCity', { pattern: /^(?=.*?[A-Za-z]).{1,}$/, required: true })} /> 
						{errors.billingCity?.type === "required" && (
						<p className="singup-form__error">City is required.</p>
					)}
					{errors.billingCity?.type === "pattern" && (
						<p className="singup-form__error">The city must contain at least one character and not have any special characters or numbers..</p>
					)}
					 </div>
					</div>
		
					<div className="singup-form__group">
						<label className='singup-form__label'>Country</label>
						<div className='singup-form__input-group'>
						<select className='singup-form__select' value={billingValue} {...register('billingValue')} onChange={(event) => setbillingValue(event.target.value)}>
							{options}
						</select>
						</div>
					</div>
		
					<div className="singup-form__group">
					<label className='singup-form__label'>Postal</label>
						<div className='singup-form__input-group'>
							<input className='singup-form__input' placeholder="postal" {...register('billingPostal', { pattern:/^[0-9].{5}$/, required: true })} /> 
							{errors.billingPostal?.type === "required" && (
								<p className="singup-form__error">postal is required.</p>
							)}
							{errors.billingPostal?.type === "pattern" && (
								<p className="singup-form__error">The postal must contain {billingValue} digits</p>
							)}	
								</div>
						</div>
		
					<div className="singup-form__group">
						<label className='singup-form__label-chetbox'>
							<input className='singup-form__checkbox' type="checkbox" {...register('defaultBillingAddress')} checked={defaultBillingAddress} onChange={() => setdefaultBillingAddress(!defaultBillingAddress)} />
								<div className='singup-form__custom-checkbox'></div>
								Use this as the default billing address
							</label>
						</div>
					</fieldset>
					
					<fieldset className='singup-form__fielset'>
					<legend className='singup-form__legend'>Shipping Address</legend>
					
					<div className="singup-form__group">
					
					<label className='singup-form__label'>Street</label>
						<div className='singup-form__input-group'>
							<input className='singup-form__input' placeholder="street" {...register('shippingStreet', { pattern: /^(?=.*?[A-Za-z]).{1,}$/, required: true })} /> 
								{errors.shippingStreet?.type === "required" && (
								<p className="singup-form__error">Street is required.</p>
							)}
							{errors.shippingStreet?.type === "pattern" && (
								<p className="singup-form__error">The Street must contain at least one character and not have any special characters or numbers.</p>
							)}
						</div>
					 </div>
						<div className="singup-form__group">
							<label className='singup-form__label'>City</label>
							<div className='singup-form__input-group'>
								<input className='singup-form__input' placeholder="city" {...register('shippingCity', { pattern: /^(?=.*?[A-Za-z]).{1,}$/, required: true })} /> 
								{errors.shippingCity?.type === "required" && (
								<p className="singup-form__error">City is required.</p>
							)}
							{errors.shippingCity?.type === "pattern" && (
								<p className="singup-form__error">The city must contain at least one character and not have any special characters or numbers..</p>
							)}
						</div>
					</div>
		
				 <div className="singup-form__group">
					<label className='singup-form__label'>Country</label>
					<div className='singup-form__input-group'>
					<select className='singup-form__select' value={shippingValue} {...register('shippingValue')} onChange={(event) => setshippingValue(event.target.value)}>
					{options}
					</select>
					</div>
				 </div>
		
				 <div className="singup-form__group">
					<label className='singup-form__label'>Postal</label>
					<div className='singup-form__input-group'>
					<input className='singup-form__input' placeholder="postal" {...register('shippingPostal', { pattern:/^[0-9].{5}$/, required: true })} /> 
					{errors.shippingPostal?.type === "required" && (
								<p className="singup-form__error">postal is required.</p>
							)}
							{errors.shippingPostal?.type === "pattern" && (
								<p className="singup-form__error">The postal must contain {shippingValue} digits</p>
							)}	
					</div>
				 </div>
		
					<div className="singup-form__group">
						<label className='singup-form__label-chetbox'>
						<input className='singup-form__checkbox' type="checkbox" {...register('defaultShippingAddress')} checked={defaultShippingAddress} onChange={() => setdefaultShippingAddress(!defaultShippingAddress)} />
						<div className='singup-form__custom-checkbox'></div>	
						Use this as the default shipping address
						</label>
					</div>
				</fieldset>  
				</div>
		
				 <div className="singup-form__group-commonaddress">
					<label className='singup-form__label-checkbox'>
						<input className='singup-form__checkbox' type="checkbox" {...register('commonAddress')} checked={commonAddress} onChange={() => setcommonAddress(!commonAddress)} />
						<div className='singup-form__custom-checkbox'></div>
						Use the same address for both shipping and billing.
					</label>
					</div>
						<div className="singup-form__group">
							<button className="singup-form__submit" type="submit">Submit</button>
					</div>
			 </form>
			 </div>
			 );
}

export const addCustomer = async function (customer: Data) {
	 fetch('https://api.europe-west1.gcp.commercetools.com/tsukisakura/customers', {
			method: 'POST', 
			body: JSON.stringify(customer),
			headers: {
				'Content-type': 'application/json;',
			  Authorization: "Bearer"+' ' + localStorage.getItem("token"),
			}
		})
			.then((response) => response.json())
			.then((data) => {
				localStorage.setItem('token', data.access);
				localStorage.setItem('refresh', data.refresh);
				console.log(data, localStorage)
			}
		)
};


export default SignUpPage;