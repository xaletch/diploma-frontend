import SvgSubscribe from '@/shared/icons/Subscribe'

interface SubscribeProps {
  isSubscribe?: boolean;
  name: "free";
}

export const Subscribe = ({ name }: SubscribeProps) => {
  return (
    <div className="flex items-center gap-1 text-white mt-px">
      <SvgSubscribe width={12} height={12} />
      <span className="text-10 font-normal">{name}</span>
    </div>
  )
}
