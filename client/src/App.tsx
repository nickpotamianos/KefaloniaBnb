import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { HelmetProvider } from 'react-helmet-async';
import { lazy, Suspense } from "react";
import Home from "@/pages/Home";

// Code-split: these routes load on-demand when navigated to
const BookingPage = lazy(() => import("@/pages/Booking"));
const BookingSuccessPage = lazy(() => import("@/pages/booking/success"));
const PayPalSuccessPage = lazy(() => import("@/pages/booking/paypal-success"));
const AdminPage = lazy(() => import("@/pages/admin"));
const PricingAdmin = lazy(() => import("@/pages/admin/pricing"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogIndex = lazy(() => import("@/pages/BlogIndex"));
const AboutVilla = lazy(() => import("@/pages/AboutVilla"));

function Router() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F6F2]" />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/booking" component={BookingPage} />
        <Route path="/booking/success" component={BookingSuccessPage} />
        <Route path="/booking/paypal-success" component={PayPalSuccessPage} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/admin/pricing" component={PricingAdmin} />
        <Route path="/about" component={AboutVilla} />
        <Route path="/blog" component={BlogIndex} />
        <Route path="/blog/:slug" component={Blog} />
        <Route path="*">
          <Home />
        </Route>
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Router />
        <Toaster />
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
