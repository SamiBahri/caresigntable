import React from 'react';
import CaresignEventsTable from '@/components/table'; // Assurez-vous que le chemin est correct
import LanguageIconTransition from '@/components/transition';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebare';
import ResearchInput from '@/components/search';
import Navbar from '@/components/navbar';

const Page = () => {
  return (
    <div className="container mx-auto p-4 relative">
      {/* Ajoutez cette ligne pour l'arrière-plan */}
      <SidebarProvider>
        <AppSidebar />
        <main>
          <Navbar />
          <LanguageIconTransition />
          <SidebarTrigger />
          <CaresignEventsTable />
        </main>
      </SidebarProvider>
      {/* Appel du composant ici */}
    </div>
  );
};

export default Page;
