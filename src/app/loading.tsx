import BottomNav from "@/components/nav/BottomNav";
import SubNav from "@/components/nav/SubNav";
import TopLogo from "@/components/others/TopLogo";
import { OvalSpinner } from "../../utils/others/Spinner";

const loading = () => {
  return (
    <>
      <TopLogo backLinkTo="/" />
      <SubNav heading="Loading" />
      <div className=" absolute left-1/2 -translate-x-1/2 top-1/3">
        <OvalSpinner />
      </div>
      <BottomNav />
    </>
  );
};

export default loading;
