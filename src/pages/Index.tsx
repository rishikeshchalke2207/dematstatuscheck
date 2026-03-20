import { useState } from "react";
import ScenarioSwitcher, { type Scenario } from "@/components/ScenarioSwitcher";
import BondDetailPage from "@/components/BondDetailPage";
import BottomSheet from "@/components/BottomSheet";
import DematInactiveSheet from "@/components/DematInactiveSheet";
import OpenGripDPFlow from "@/components/OpenGripDPFlow";
import AddAnotherDPFlow from "@/components/AddAnotherDPFlow";
import NowActiveFlow from "@/components/NowActiveFlow";

type SheetView = "inactive" | "grip-dp" | "add-dp" | "now-active" | null;

export default function Index() {
  const [scenario, setScenario] = useState<Scenario>("bond-detail");
  const [sheetView, setSheetView] = useState<SheetView>(null);

  const handleScenarioChange = (s: Scenario) => {
    setScenario(s);
    if (s === "bond-detail") setSheetView("inactive");
    else if (s === "open-grip-dp") setSheetView("grip-dp");
    else if (s === "add-another-dp") setSheetView("add-dp");
    else if (s === "now-active") setSheetView("now-active");
  };

  const closeSheet = () => setSheetView(null);

  const renderSheetContent = () => {
    switch (sheetView) {
      case "inactive":
        return (
          <DematInactiveSheet
            onOpenGripDP={() => setSheetView("grip-dp")}
            onAddAnotherDP={() => setSheetView("add-dp")}
            onNowActive={() => setSheetView("now-active")}
            onMaybeLater={closeSheet}
          />
        );
      case "grip-dp":
        return <OpenGripDPFlow onBack={() => setSheetView("inactive")} onDone={closeSheet} />;
      case "add-dp":
        return <AddAnotherDPFlow onBack={() => setSheetView("inactive")} />;
      case "now-active":
        return (
          <NowActiveFlow
            onBack={() => setSheetView("inactive")}
            onDone={closeSheet}
            onSwitchToGripDP={() => setSheetView("grip-dp")}
            onSwitchToAddDP={() => setSheetView("add-dp")}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background relative">
      <ScenarioSwitcher current={scenario} onChange={handleScenarioChange} />
      <BondDetailPage onInvestNow={() => setSheetView("inactive")} />
      <BottomSheet open={sheetView !== null} onClose={closeSheet}>
        {renderSheetContent()}
      </BottomSheet>
    </div>
  );
}
