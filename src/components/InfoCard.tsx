import Shimmer from './Shimmer';

type Props = {
  label: string;
  data: string;
  footer: string;
  isLoading?: boolean;
};

const InfoCard = ({ label, data, footer, isLoading = false }: Props) => {
  return (
    <div className="shadow rounded-lg bg-white p-7 pt-6 col-span-1">
      <div className="text-gray-500 text-lg font-medium">{label}</div>
      {isLoading ? (
        <div className="mt-2 mb-1">
          <Shimmer height="32px" width="80%" />
        </div>
      ) : (
        <div className="text-2xl font-bold mt-2 mb-1">{data}</div>
      )}
      {isLoading ? (
        <div className="mt-1">
          <Shimmer height="20px" width="50%" />
        </div>
      ) : (
        <div className="text-gray-500 text-sm font-medium">{footer}</div>
      )}
    </div>
  );
};

export default InfoCard;
