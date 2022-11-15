import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Spinner from './components/Spinner';
import useFetch from './hooks/useFetch';

function App() {
	const { t } = useTranslation();

	const [car_coast, setCar_coast] = useState(6000000);
	const [initail_payment, setInitail_payment] = useState(400000);
	const [initail_payment_percent, setInitail_payment_percent] = useState(10);
	const [lease_term, setLease_term] = useState(24);
	const [total_sum, setTotal_sum] = useState(5000000);
	const [monthly_payment_from, setMonthly_payment_from] = useState(30000);

	const { loading, fetchData } = useFetch();

	useEffect(() => {
		setInitail_payment((car_coast * initail_payment_percent) / 100);
	}, [initail_payment_percent, car_coast]);

	useEffect(() => {
		setTotal_sum(initail_payment + monthly_payment_from * lease_term);
	}, [initail_payment, monthly_payment_from, lease_term]);

	useEffect(() => {
		setMonthly_payment_from(
			(car_coast - initail_payment) *
				((0.035 * Math.pow(1 + 0.035, lease_term)) / (Math.pow(1 + 0.035, lease_term) - 1))
		);
	}, [car_coast, initail_payment, lease_term]);

	const handleSubmit = (e) => {
		e.preventDefault();
		fetchData(
			JSON.stringify({
				car_coast,
				initail_payment,
				initail_payment_percent,
				lease_term,
				total_sum,
				monthly_payment_from,
			})
		);
	};

	const serifClass =
		'font-serif text-[22px] text-[#333333] placeholder:text-[#575757] md:text-[54px]';
	const inputClass =
		' border border-[2px] border-[#F3F3F4] bg-[#F3F3F4] rounded-2xl p-5 w-full md:text-[30px] focus:bg-white outline-none disabled:opacity-40';
	const labelClass =
		' absolute m-0 top-5 right-[20px] text-[#575757] md:text-[30px] disabled:text-opacity-40';
	const extraLabel = ' bg-[#E0E0E0]/40 rounded-xl p-[14px] top-[8px] right-[6px] w-[6rem]';
	const extraInput = ' focus:bg-white outline-none';
	const caption = 'font-sans text-[14px] leading-[136%] text-[#333E48] md:text-[16px]';

	return (
		<section className='m-5 flex h-full flex-col justify-center gap-4 overflow-scroll md:m-8 lg:m-12'>
			<header>
				<div className='pb-4 font-serif text-[32px] leading-[90%] md:w-[750px] md:text-[54px]'>
					{t('header')}
				</div>
			</header>
			<main className='md:mb-10'>
				<form id='form' className='grid grid-cols-1 gap-8 lg:grid-cols-3' onSubmit={handleSubmit}>
					<div>
						<p className={caption}>{t('carPrice')}</p>
						<div className='relative mt-2'>
							<input
								disabled={loading}
								type='text'
								className={serifClass.concat(inputClass)}
								onChange={(e) => setCar_coast(e.target.value)}
								value={car_coast}
								placeholder={car_coast.toLocaleString('ru-RU', {
									style: 'currency',
									currency: 'RUB',
									maximumFractionDigits: 0,
								})}
							/>
							<label className={serifClass.concat(labelClass)}>₽</label>
							<input
								disabled={loading}
								type='range'
								min='1000000'
								max='6000000'
								step='10000'
								value={car_coast}
								onChange={(e) => setCar_coast(e.target.value)}
								className='absolute bottom-0 left-5 right-5 w-[100%-40px]'
							/>
						</div>
					</div>
					<div>
						<p className={caption}>{t('initialFee')}</p>
						<div className='relative mt-2 w-full'>
							<p
								className={serifClass.concat(
									inputClass,
									' cursor-default',
									loading && ' opacity-40'
								)}>
								{initail_payment.toLocaleString('ru-RU', {
									style: 'currency',
									currency: 'RUB',
									maximumFractionDigits: 0,
								})}
							</p>
							<input
								disabled={loading}
								className={serifClass.concat(labelClass, extraLabel, extraInput)}
								onChange={(e) => setInitail_payment_percent(e.target.value)}
								value={initail_payment_percent}
							/>
							<label className='absolute top-[8px] right-[20px] py-[14px] font-serif text-[22px] text-[#333333] md:text-[30px]'>
								%
							</label>
							<input
								disabled={loading}
								type='range'
								min='10'
								max='60'
								step='1'
								value={initail_payment_percent}
								onChange={(e) => setInitail_payment_percent(e.target.value)}
								className='absolute bottom-0 left-5 right-5 w-[100%-40px]'
							/>
						</div>
					</div>
					<div>
						<p className={caption}>{t('leasingTerm')}</p>
						<div className='relative mt-2'>
							<input
								disabled={loading}
								type='text'
								value={lease_term}
								onChange={(e) => setLease_term(e.target.value)}
								className={serifClass.concat(inputClass)}
							/>
							<label className={serifClass.concat(labelClass)}>мес.</label>
							<input
								disabled={loading}
								type='range'
								min='1'
								max='60'
								step='1'
								value={lease_term}
								onChange={(e) => setLease_term(e.target.value)}
								className='absolute bottom-0 left-5 right-5 w-[100%-40px]'
							/>
						</div>
					</div>
				</form>
			</main>
			<div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
				<div>
					<p className={caption}>{t('totalLeaseAgreement')}</p>

					<p className={serifClass}>
						{total_sum.toLocaleString('ru-RU', {
							style: 'currency',
							currency: 'RUB',
							maximumFractionDigits: 0,
						})}
					</p>
				</div>
				<div>
					<p className={caption}>{t('monthlyPayment')}</p>
					<p className={serifClass}>
						{monthly_payment_from.toLocaleString('ru-RU', {
							style: 'currency',
							currency: 'RUB',
							maximumFractionDigits: 0,
						})}
					</p>
				</div>
				<div className='flex items-center'>
					<button
						type='submit'
						form='form'
						disabled={loading}
						className='w-full rounded-[40px] bg-[#FF9514] px-6 py-3 font-serif text-[22px] text-white hover:bg-[#111111] active:bg-[#575757] md:text-[30px]'>
						{loading ? <Spinner /> : t('submit')}
					</button>
				</div>
			</div>
		</section>
	);
}
export default App;
