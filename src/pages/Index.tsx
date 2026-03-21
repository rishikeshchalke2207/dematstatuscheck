import { useState, useEffect } from "react";
import ScenarioSwitcher, { type Scenario } from "@/components/ScenarioSwitcher";
import BondDetailPage from "@/components/BondDetailPage";
import BottomSheet from "@/components/BottomSheet";
import DematInactiveSheet from "@/components/DematInactiveSheet";
import OpenGripDPFlow from "@/components/OpenGripDPFlow";
import AddAnotherDPFlow from "@/components/AddAnotherDPFlow";
import NowActiveFlow from "@/components/NowActiveFlow";

type SheetView = "inactive" | "grip-dp-valid" | "grip-dp-invalid" | "add-dp" | "now-active-active" | "now-active-inactive" | null;

const scenarioToSheet: Record<Scenario, SheetView> = {
  "default": "inactive",
  "grip-dp-valid": "grip-dp-valid",
  "grip-dp-invalid": "grip-dp-invalid",
  "add-another-dp": "add-dp",
  "now-active-active": "now-active-active",
  "now-active-inactive": "now-active-inactive",
};

export default function Index() {
  const [scenario, setScenario] = useState<Scenario>("default");
  const [sheetView, setSheetView] = useState<SheetView>("inactive");

  const handleScenarioChange = (s: Scenario) => {
    setScenario(s);
    // Always open the 3-option sheet first
    setSheetView("inactive");
  };

  const closeSheet = () => setSheetView(null);

  const handleInvestNow = () => {
    // Always show the 3-option sheet first
    setSheetView("inactive");
  };

  // Route "Open Grip DP" click based on selected scenario
  const getGripDPHandler = () => {
    if (scenario === "grip-dp-valid") return () => setSheetView("grip-dp-valid");
    if (scenario === "grip-dp-invalid") return () => setSheetView("grip-dp-invalid");
    return () => setSheetView("grip-dp-valid"); // default
  };

  // Route "My Demat is now Active" click based on selected scenario
  const getNowActiveHandler = () => {
    if (scenario === "now-active-inactive") return () => setSheetView("now-active-inactive");
    return () => setSheetView("now-active-active"); // default
  };

  const renderSheetContent = () => {
    switch (sheetView) {
      case "inactive":
        return (
          <DematInactiveSheet
            onOpenGripDP={getGripDPHandler()}
            onAddAnotherDP={() => setSheetView("add-dp")}
            onNowActive={getNowActiveHandler()}
            onMaybeLater={closeSheet}
          />
        );
      case "grip-dp-valid":
        return <OpenGripDPFlow onBack={() => setSheetView("inactive")} onDone={closeSheet} kraValid={true} />;
      case "grip-dp-invalid":
        return <OpenGripDPFlow onBack={() => setSheetView("inactive")} onDone={closeSheet} kraValid={false} />;
      case "add-dp":
        return <AddAnotherDPFlow onBack={() => setSheetView("inactive")} />;
      case "now-active-active":
        return (
          <NowActiveFlow
            onBack={() => setSheetView("inactive")}
            onDone={closeSheet}
            onSwitchToGripDP={() => setSheetView("grip-dp-valid")}
            onSwitchToAddDP={() => setSheetView("add-dp")}
            isActive={true}
          />
        );
      case "now-active-inactive":
        return (
          <NowActiveFlow
            onBack={() => setSheetView("inactive")}
            onDone={closeSheet}
            onSwitchToGripDP={() => setSheetView("grip-dp-valid")}
            onSwitchToAddDP={() => setSheetView("add-dp")}
            isActive={false}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-muted flex items-start justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-background relative shadow-2xl">
        <ScenarioSwitcher current={scenario} onChange={handleScenarioChange} />
        <BondDetailPage onInvestNow={handleInvestNow} />
        <BottomSheet open={sheetView !== null} onClose={closeSheet}>
          {renderSheetContent()}
        </BottomSheet>
      </div>
    </div>
  );
}
