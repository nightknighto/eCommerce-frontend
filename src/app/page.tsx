import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import TemplateLayout from "@/components/Layouts/DefaultLayout";
import MainLayout from "@/components/Layouts/MainLayout";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Home() {
  return (
    <MainLayout>
      <h1>hello world</h1>
    </MainLayout>
  );
}
