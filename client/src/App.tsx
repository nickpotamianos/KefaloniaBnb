import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import BookingPage from "@/pages/Booking";
import BookingSuccessPage from "@/pages/booking/success";
import PayPalSuccessPage from "@/pages/booking/PayPalSuccess";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/booking" component={BookingPage} />
      <Route path="/booking/success" component={BookingSuccessPage} />
      <Route path="/booking/paypal-success" component={PayPalSuccessPage} />
      <Route path="*">
        <Home />
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
