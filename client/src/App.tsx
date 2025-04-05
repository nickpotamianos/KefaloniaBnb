import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import BookingPage from "@/pages/Booking";
import BookingSuccessPage from "@/pages/booking/success";
import PayPalSuccessPage from "@/pages/booking/paypal-success";
import AdminPage from "@/pages/admin";
import PricingAdmin from "@/pages/admin/pricing"; // Import the admin pricing page

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/booking" component={BookingPage} />
      <Route path="/booking/success" component={BookingSuccessPage} />
      <Route path="/booking/paypal-success" component={PayPalSuccessPage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/admin/pricing" component={PricingAdmin} /> {/* Add the admin pricing route */}
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
