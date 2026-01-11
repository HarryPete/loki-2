import Image from 'next/image';
import star from '../../assets/star.png';

const Rating = ({ value = 0 }) => {
  const safeValue = Math.max(0, Math.floor(Number(value) || 0));

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: safeValue }).map((_, index) => (
        <Image
          key={index}
          src={star}
          alt="rating star"
          width={24}
          height={24}
        />
      ))}
    </div>
  );
};

export default Rating;
