import { Cart } from '@/types/cart';
import { CollapseWrapper } from '../ui/CollapseWrapper';
import { formatEuroPrice } from '@/lib/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { useDiscountLogic } from '@/hooks/useDiscountLogic';

interface DiscountSectionProps {
  cart: Cart | null;
}

const DiscountSection = ({ cart }: DiscountSectionProps) => {
  const {
    isAddingDiscount,
    discountMessageError,
    contentMessageHeight,
    triggerHeight,
    isTriggerShowDelay,
    discountLoading,
    contentMessageRef,
    triggerRef,
    setCodeDiscount,
    setIsAddingDiscount,
    handleSubmitDiscount,
    handleRemoveDiscount,
  } = useDiscountLogic();

  return (
    <div className="flex flex-col mb-5 border-b w-full relative">
      {cart?.summary_discount &&
        cart.summary_discount.map((discount) => {
          return (
            <div
              key={discount.id}
              className="flex justify-between text-[16px] leading-normal font-roboto-condensed px-5 pt-5 pb-3"
            >
              <span className="font-medium text-[#363a42]">
                {discount.name}
              </span>
              <div className="flex-center gap-1">
                <span className="font-[400] text-red-400">
                  - {formatEuroPrice(discount.value ?? 0)}
                </span>
                <a
                  role="button"
                  className={`py-[2.5px] px-1 ${
                    discountLoading && 'pointer-events-none'
                  }`}
                  onClick={() => handleRemoveDiscount(discount.id)}
                >
                  <DeleteIcon
                    className={`!text-[1.2rem] ${
                      discountLoading && 'text-[#D9D9D9]'
                    }`}
                  />
                </a>
              </div>
            </div>
          );
        })}
      <CollapseWrapper
        isOpen={isTriggerShowDelay}
        contentHeight={triggerHeight}
        className="mb-4"
      >
        <div ref={triggerRef} className="flex min-h-max h-[22.5px]">
          <a
            role="button"
            className="leading-tight text-[15px] font-roboto-condensed"
            onClick={() => setIsAddingDiscount(true)}
          >
            Vous avez un code promo ?
          </a>
        </div>
      </CollapseWrapper>
      <CollapseWrapper
        isOpen={isAddingDiscount}
        contentHeight={contentMessageHeight}
      >
        <div className="flex flex-col min-h-max" ref={contentMessageRef}>
          <form
            onSubmit={handleSubmitDiscount}
            method="POST"
            className="flex w-full"
          >
            <input
              type="text"
              name="discount_name"
              id="discount_name"
              placeholder="Code promo"
              onChange={(e) => setCodeDiscount(e.target.value)}
              disabled={discountLoading}
              className="outline-none leading-none border border-black ps-[20px] py-[1px] placeholder:font-thin placeholder:font-roboto-condensed placeholder:text-[15px] placeholder:ms-4 w-full"
            />
            <button
              type="submit"
              className={`${
                discountLoading ? 'bg-[#d9d9d9]' : 'bg-black'
              } font-roboto-condensed font-semibold text-[1rem] py-2 px-5 text-white`}
              disabled={discountLoading}
            >
              Ajouter
            </button>
          </form>
          {discountMessageError && (
            <div className="flex bg-red-500 text-white relative font-roboto-condensed font-[200] text-[13px] mt-4 mb-2">
              <div className="flex min-w-[20px] min-h-[20px] w-[20px] h-[20px] rotate-45 absolute -top-[5px] left-5 bg-red-500" />
              <span className="my-3 mx-5 relative">
                <ErrorOutlineOutlinedIcon className="text-[24px] me-4" />
                {discountMessageError}
              </span>
            </div>
          )}
          <a
            role="button"
            className="text-center font-extralight font-roboto-condensed my-4 text-[15px]"
            onClick={() => setIsAddingDiscount(false)}
          >
            Fermer
          </a>
        </div>
      </CollapseWrapper>
    </div>
  );
};

export default DiscountSection;
