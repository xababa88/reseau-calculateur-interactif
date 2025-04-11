
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Network, BookOpen, GraduationCap, Layers } from "lucide-react";
import BinaryConverter from '@/components/BinaryConverter';
import IPCalculator from '@/components/IPCalculator';
import PracticeExercises from '@/components/PracticeExercises';
import Tutorial from '@/components/Tutorial';
import SubnetDivider from '@/components/SubnetDivider';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-network-dark text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Calculateur Interactif de Réseau</h1>
          <p className="text-network-light">
            Calculez facilement les adresses réseau, masques de sous-réseau, et pratiquez avec des exercices
          </p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-5 mb-8">
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" /> Calculateur
            </TabsTrigger>
            <TabsTrigger value="binary" className="flex items-center gap-2">
              <Network className="h-4 w-4" /> Convertisseur Binaire
            </TabsTrigger>
            <TabsTrigger value="subnetting" className="flex items-center gap-2">
              <Layers className="h-4 w-4" /> Découpage
            </TabsTrigger>
            <TabsTrigger value="practice" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" /> Exercices
            </TabsTrigger>
            <TabsTrigger value="tutorial" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" /> Tutoriel
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculator">
            <IPCalculator />
          </TabsContent>
          
          <TabsContent value="binary">
            <BinaryConverter />
          </TabsContent>
          
          <TabsContent value="subnetting">
            <SubnetDivider />
          </TabsContent>
          
          <TabsContent value="practice">
            <PracticeExercises />
          </TabsContent>
          
          <TabsContent value="tutorial">
            <Tutorial />
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-gray-100 py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p className="mb-2">Calculateur Interactif de Réseau © 2025</p>
          <p>Un outil éducatif pour apprendre et pratiquer le découpage réseau</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
