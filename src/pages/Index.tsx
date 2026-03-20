import { useState } from "react";
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
  const [sheetView, setSheetView] = useState<SheetView>(null);

  const handleScenarioChange = (s: Scenario) => {
    setScenario(s);
    setSheetView(null);
  };

  const closeSheet = () => setSheetView(null);

  const handleInvestNow = () => {
    setSheetView(scenarioToSheet[scenario]);
  };

  const renderSheetContent = () => {
    switch (sheetView) {
      case "inactive":
        return (
          <DematInactiveSheet
            onOpenGripDP={() => setSheetView("grip-dp-valid")}
            onAddAnotherDP={() => setSheetView("add-dp")}
            onNowActive={() => setSheetView("now-active-active")}
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
    <div className="max-w-md mx-auto min-h-screen bg-background relative">
      <ScenarioSwitcher current={scenario} onChange={handleScenarioChange} />
      <BondDetailPage onInvestNow={handleInvestNow} />
      <BottomSheet open={sheetView !== null} onClose={closeSheet}>
        {renderSheetContent()}
      </BottomSheet>
    </div>
  );
}
