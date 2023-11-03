import BottomNav from "@/components/nav/BottomNav";
import SubNav from "@/components/nav/SubNav";
import TopLogo from "@/components/others/TopLogo";
import { OvalSpinner, RingSpinner } from "../../utils/others/Spinner";

const loading = () => {
  return (
    <>
      <TopLogo />
      <SubNav heading="Loading" />
      <div className=" absolute left-1/2 -translate-x-1/2 top-1/3">
        <OvalSpinner />
      </div>
      <BottomNav />
    </>
  );
};

export default loading;
