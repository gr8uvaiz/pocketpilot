import { Loader2 } from "lucide-react";

const GlobalLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-sm">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
};

export default GlobalLoader;
