import Animation1 from '../../../public/Animation.gif';

export default function Loading() {
  // Or a custom loading skeleton component
  return <img src={Animation1.src} alt="my animation1" className='w-[500px] h-[500px]' />
}