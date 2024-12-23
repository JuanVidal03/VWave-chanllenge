import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CreateShippingLabels from "./views/CreateShippingLabels/Index";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CreateShippingLabels/>
    </QueryClientProvider>
  );
};

export default App;
