import LogoImg from '../assets/logo.svg';

export default function Navbar() {
  return (
    <div className='bg-violet-600 relative z-1 p-3 flex'>
      <img src={LogoImg} alt='logo' className='h-7' />
      <div className='flex text-white ml-8 items-center col-span-2 space-x-4'>
        <p className='font-semibold'>Settings</p>
        <p className='font-semibold'>File</p>
        <p className='font-semibold'>Premium</p>
        <p className='font-semibold'>Tutorials</p>
      </div>
    </div>
  );
}
