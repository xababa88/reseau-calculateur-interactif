
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const Tutorial: React.FC = () => {
  return (
    <div className="mb-8">
      <Card className="border-network-light">
        <CardHeader className="bg-network-light">
          <CardTitle className="text-network-dark">Tutoriel: Calcul de Sous-réseau</CardTitle>
          <CardDescription>Apprenez à calculer les adresses réseau et de diffusion</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="basics">
            <TabsList className="grid grid-cols-1 md:grid-cols-4 mb-6">
              <TabsTrigger value="basics">Notions de base</TabsTrigger>
              <TabsTrigger value="calculations">Méthode de calcul</TabsTrigger>
              <TabsTrigger value="subnetting">Découpage en sous-réseaux</TabsTrigger>
              <TabsTrigger value="examples">Exemples</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basics" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-network-dark mb-2">Adresses IPv4</h3>
                <p className="mb-4 text-base">
                  Une adresse IPv4 est composée de 4 octets (32 bits), représentés en notation décimale pointée:
                  192.168.1.1
                </p>
                <p className="mb-2 text-base">Chaque octet représente 8 bits, avec des valeurs de 0 à 255.</p>
                <div className="p-4 bg-network-light rounded-md my-4">
                  <div className="flex flex-wrap justify-center gap-2 font-mono text-base">
                    <div className="flex flex-col items-center">
                      <div className="flex">
                        <span className="w-8 h-8 flex items-center justify-center border border-network bg-network text-white rounded-sm">1</span>
                        <span className="w-8 h-8 flex items-center justify-center border border-network bg-network text-white rounded-sm">1</span>
                        <span className="w-8 h-8 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-8 h-8 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-8 h-8 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-8 h-8 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-8 h-8 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-8 h-8 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                      </div>
                      <span className="mt-1 text-network-text">192</span>
                    </div>
                    <span className="text-xl">.</span>
                    <div className="flex flex-col items-center">
                      <div className="flex">
                        <span className="w-8 h-8 flex items-center justify-center border border-network bg-network text-white rounded-sm">1</span>
                        <span className="w-8 h-8 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-8 h-8 flex items-center justify-center border border-network bg-network text-white rounded-sm">1</span>
                        <span className="w-8 h-8 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-8 h-8 flex items-center justify-center border border-network bg-network text-white rounded-sm">1</span>
                        <span className="w-8 h-8 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-8 h-8 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-8 h-8 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                      </div>
                      <span className="mt-1 text-network-text">168</span>
                    </div>
                    <span className="text-xl">.</span>
                    <div className="flex flex-col items-center">
                      <div className="flex">
                        <span className="w-8 h-8 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-8 h-8 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-8 h-8 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-8 h-8 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-8 h-8 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-8 h-8 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-8 h-8 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-8 h-8 flex items-center justify-center border border-network bg-network text-white rounded-sm">1</span>
                      </div>
                      <span className="mt-1 text-network-text">1</span>
                    </div>
                    <span className="text-xl">.</span>
                    <div className="flex flex-col items-center">
                      <div className="flex">
                        <span className="w-8 h-8 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-8 h-8 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-8 h-8 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-8 h-8 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-8 h-8 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-8 h-8 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-8 h-8 flex items-center justify-center border border-network bg-network text-white rounded-sm">1</span>
                        <span className="w-8 h-8 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                      </div>
                      <span className="mt-1 text-network-text">2</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold text-network-dark mb-2">Masque de Sous-réseau</h3>
                <p className="mb-4 text-base">
                  Un masque de sous-réseau détermine quelle partie d'une adresse IP identifie le réseau et quelle partie identifie les hôtes.
                </p>
                <p className="mb-3 text-base">Il peut être exprimé de deux façons:</p>
                <ul className="list-disc list-inside mb-4 text-base">
                  <li className="mb-2">
                    <span className="font-medium">Notation décimale pointée</span>: 
                    <span className="ml-2 px-2 py-1 bg-network-light rounded font-mono">255.255.255.0</span>
                  </li>
                  <li>
                    <span className="font-medium">Notation CIDR</span>: 
                    <span className="ml-2 px-2 py-1 bg-network-light rounded font-mono">/24</span>
                    (indique le nombre de bits à 1 dans le masque)
                  </li>
                </ul>
                <p className="mt-2 text-base">
                  Dans un masque de sous-réseau, tous les bits à 1 représentent la partie réseau, tandis que tous les bits à 0 représentent la partie hôte.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold text-network-dark mb-2">Concepts Clés</h3>
                <div className="space-y-3">
                  <div className="p-3 border border-network-light rounded-md">
                    <p className="font-medium text-network-text">Adresse Réseau</p>
                    <p className="text-base">
                      L'adresse qui identifie le réseau entier. C'est la première adresse du bloc et elle ne peut pas être attribuée à un hôte.
                    </p>
                  </div>
                  
                  <div className="p-3 border border-network-light rounded-md">
                    <p className="font-medium text-network-text">Adresse de Diffusion</p>
                    <p className="text-base">
                      La dernière adresse du réseau, utilisée pour envoyer des paquets à tous les hôtes du réseau. Elle ne peut pas être attribuée à un hôte.
                    </p>
                  </div>
                  
                  <div className="p-3 border border-network-light rounded-md">
                    <p className="font-medium text-network-text">Plage d'Adresses Utilisables</p>
                    <p className="text-base">
                      Les adresses entre l'adresse réseau et l'adresse de diffusion, qui peuvent être attribuées aux appareils du réseau.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="calculations" className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-network-dark mb-3">Étape 1: Conversion en binaire</h3>
                <p className="mb-3 text-lg">
                  Convertissez l'adresse IP et le masque de sous-réseau en notation binaire:
                </p>
                <div className="p-4 bg-network-light rounded-md my-4">
                  <div className="mb-3">
                    <p className="text-lg font-medium mb-1">Adresse IP: 192.168.1.10</p>
                    <p className="font-mono text-lg md:text-xl">11000000.10101000.00000001.00001010</p>
                  </div>
                  <div>
                    <p className="text-lg font-medium mb-1">Masque: 255.255.255.0 (ou /24)</p>
                    <p className="font-mono text-lg md:text-xl">11111111.11111111.11111111.00000000</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-xl font-semibold text-network-dark mb-3">Étape 2: Calcul de l'adresse réseau</h3>
                <p className="mb-3 text-lg">
                  Effectuez un ET logique bit par bit entre l'adresse IP et le masque:
                </p>
                <div className="p-6 bg-network-light rounded-md my-4 font-mono text-lg md:text-xl">
                  <p className="mb-2">   IP: 11000000.10101000.00000001.00001010</p>
                  <p className="mb-2">Masque: 11111111.11111111.11111111.00000000</p>
                  <div className="my-2 border-t-2 border-network"></div>
                  <p className="font-bold">Réseau: 11000000.10101000.00000001.00000000</p>
                  <p className="mt-3 text-network-text font-bold">(192.168.1.0)</p>
                </div>
                <div className="p-4 bg-white border border-network-light rounded-md">
                  <p className="font-medium mb-2 text-lg">
                    Règle du ET logique:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-base">
                    <div className="p-2 bg-gray-50 rounded text-center">1 ET 1 = 1</div>
                    <div className="p-2 bg-gray-50 rounded text-center">1 ET 0 = 0</div>
                    <div className="p-2 bg-gray-50 rounded text-center">0 ET 1 = 0</div>
                    <div className="p-2 bg-gray-50 rounded text-center">0 ET 0 = 0</div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-xl font-semibold text-network-dark mb-3">Étape 3: Calcul de l'adresse de diffusion</h3>
                <p className="mb-3 text-lg">
                  Effectuez un OU logique bit par bit entre l'adresse réseau et l'inverse du masque:
                </p>
                <div className="p-6 bg-network-light rounded-md my-4 font-mono text-lg md:text-xl">
                  <p className="mb-2">      Réseau: 11000000.10101000.00000001.00000000</p>
                  <p className="mb-2">Inverse masque: 00000000.00000000.00000000.11111111</p>
                  <div className="my-2 border-t-2 border-network"></div>
                  <p className="font-bold">     Diffusion: 11000000.10101000.00000001.11111111</p>
                  <p className="mt-3 text-network-text font-bold">(192.168.1.255)</p>
                </div>
                <div className="p-4 bg-white border border-network-light rounded-md">
                  <p className="font-medium mb-2 text-lg">
                    Règle du OU logique:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-base">
                    <div className="p-2 bg-gray-50 rounded text-center">1 OU 1 = 1</div>
                    <div className="p-2 bg-gray-50 rounded text-center">1 OU 0 = 1</div>
                    <div className="p-2 bg-gray-50 rounded text-center">0 OU 1 = 1</div>
                    <div className="p-2 bg-gray-50 rounded text-center">0 OU 0 = 0</div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-xl font-semibold text-network-dark mb-3">Étape 4: Détermination de la plage d'adresses</h3>
                <div className="space-y-4">
                  <div className="p-4 border-2 border-network-light rounded-md">
                    <p className="font-medium text-lg">Adresse réseau</p>
                    <p className="font-mono text-lg md:text-xl">192.168.1.0</p>
                  </div>
                  
                  <div className="p-4 border-2 border-network-light rounded-md">
                    <p className="font-medium text-lg">Première adresse utilisable</p>
                    <p className="font-mono text-lg md:text-xl">192.168.1.1</p>
                    <p className="text-sm text-gray-500">(adresse réseau + 1)</p>
                  </div>
                  
                  <div className="p-4 border-2 border-network-light rounded-md">
                    <p className="font-medium text-lg">Dernière adresse utilisable</p>
                    <p className="font-mono text-lg md:text-xl">192.168.1.254</p>
                    <p className="text-sm text-gray-500">(adresse de diffusion - 1)</p>
                  </div>
                  
                  <div className="p-4 border-2 border-network-light rounded-md">
                    <p className="font-medium text-lg">Adresse de diffusion</p>
                    <p className="font-mono text-lg md:text-xl">192.168.1.255</p>
                  </div>
                  
                  <div className="p-4 bg-network-light rounded-md">
                    <p className="font-medium text-lg">Nombre d'adresses utilisables</p>
                    <p className="text-lg md:text-xl">254</p>
                    <p className="text-sm text-gray-600">(2³² ⁻ ²⁴ - 2)</p>
                    <p className="text-sm text-gray-600">(2⁸ - 2)</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="subnetting" className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-network-dark mb-3">Principe du découpage en sous-réseaux</h3>
                <p className="mb-3 text-lg">
                  Le découpage en sous-réseaux consiste à diviser un réseau IP en plusieurs sous-réseaux plus petits. Cela permet:
                </p>
                <ul className="list-disc list-inside mb-4 text-lg space-y-2">
                  <li>D'organiser logiquement votre réseau</li>
                  <li>D'améliorer les performances en réduisant le trafic de diffusion</li>
                  <li>D'augmenter la sécurité en séparant les différents types de ressources</li>
                  <li>De gérer plus efficacement l'allocation d'adresses IP</li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-xl font-semibold text-network-dark mb-3">Étape 1: Comprendre le principe des bits empruntés</h3>
                <p className="mb-3 text-lg">
                  Pour créer des sous-réseaux, on "emprunte" des bits de la partie hôte pour les utiliser comme bits de sous-réseau:
                </p>
                
                <div className="p-6 bg-network-light rounded-md my-5">
                  <p className="font-medium text-lg mb-3">Exemple avec un réseau /24 (192.168.1.0/24):</p>
                  <div className="mb-3">
                    <p className="mb-1 font-medium">Format original:</p>
                    <div className="flex">
                      <div className="bg-network p-2 text-white text-center w-full md:w-3/4 rounded-l-md font-mono">
                        Bits réseau (24 bits)
                      </div>
                      <div className="bg-blue-500 p-2 text-white text-center w-full md:w-1/4 rounded-r-md font-mono">
                        Bits hôte (8 bits)
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <p className="mb-1 font-medium">Après emprunt de 2 bits pour créer 4 sous-réseaux:</p>
                    <div className="flex">
                      <div className="bg-network p-2 text-white text-center w-full md:w-3/4 rounded-l-md font-mono">
                        Bits réseau (24 bits)
                      </div>
                      <div className="bg-green-500 p-2 text-white text-center w-full md:w-1/12 font-mono">
                        2 bits
                      </div>
                      <div className="bg-blue-500 p-2 text-white text-center w-full md:w-1/6 rounded-r-md font-mono">
                        6 bits
                      </div>
                    </div>
                    <div className="flex mt-1">
                      <div className="w-full md:w-3/4"></div>
                      <div className="text-center w-full md:w-1/12 text-sm">Sous-réseau</div>
                      <div className="text-center w-full md:w-1/6 text-sm">Hôte</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-4 border border-network-light rounded-md">
                  <p className="font-medium mb-3 text-lg">Formule importante:</p>
                  <ul className="list-disc list-inside space-y-2 text-lg">
                    <li>Avec <strong>n</strong> bits empruntés, vous pouvez créer <strong>2ⁿ</strong> sous-réseaux</li>
                    <li>Chaque sous-réseau aura <strong>2ᵐ - 2</strong> hôtes utilisables, où <strong>m</strong> est le nombre de bits restants pour la partie hôte</li>
                  </ul>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-xl font-semibold text-network-dark mb-3">Étape 2: Calcul du nouveau CIDR</h3>
                <p className="mb-3 text-lg">
                  Le CIDR (Classless Inter-Domain Routing) représente le nombre de bits à 1 dans le masque de sous-réseau.
                </p>
                
                <div className="p-4 bg-network-light rounded-md mb-4">
                  <p className="font-medium mb-2 text-lg">Formule:</p>
                  <p className="text-xl font-mono">Nouveau CIDR = CIDR original + bits empruntés</p>
                  <p className="mt-2 text-lg">Exemple: Un réseau /24 divisé en 4 sous-réseaux (2² = 4) aura un nouveau CIDR de /26 (24 + 2).</p>
                </div>
                
                <div className="mt-4 p-4 border border-network-light rounded-md">
                  <table className="w-full text-lg border-collapse">
                    <thead>
                      <tr>
                        <th className="border border-network-light p-2">Sous-réseaux voulus</th>
                        <th className="border border-network-light p-2">Bits empruntés</th>
                        <th className="border border-network-light p-2">Ajout au CIDR</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-network-light p-2 text-center">2</td>
                        <td className="border border-network-light p-2 text-center">1</td>
                        <td className="border border-network-light p-2 text-center">+1</td>
                      </tr>
                      <tr>
                        <td className="border border-network-light p-2 text-center">4</td>
                        <td className="border border-network-light p-2 text-center">2</td>
                        <td className="border border-network-light p-2 text-center">+2</td>
                      </tr>
                      <tr>
                        <td className="border border-network-light p-2 text-center">8</td>
                        <td className="border border-network-light p-2 text-center">3</td>
                        <td className="border border-network-light p-2 text-center">+3</td>
                      </tr>
                      <tr>
                        <td className="border border-network-light p-2 text-center">16</td>
                        <td className="border border-network-light p-2 text-center">4</td>
                        <td className="border border-network-light p-2 text-center">+4</td>
                      </tr>
                      <tr>
                        <td className="border border-network-light p-2 text-center">32</td>
                        <td className="border border-network-light p-2 text-center">5</td>
                        <td className="border border-network-light p-2 text-center">+5</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-xl font-semibold text-network-dark mb-3">Étape 3: Calculer les adresses des sous-réseaux</h3>
                
                <div className="p-4 bg-network-light rounded-md mb-5">
                  <h4 className="font-medium text-lg mb-3">Exemple: Diviser 192.168.1.0/24 en 4 sous-réseaux</h4>
                  
                  <div className="space-y-4 text-base md:text-lg">
                    <div>
                      <p className="mb-1"><strong>Étape 1:</strong> Calculer le nouveau CIDR</p>
                      <p className="ml-5">CIDR original = /24</p>
                      <p className="ml-5">Bits empruntés pour 4 sous-réseaux = 2 bits (car 2² = 4)</p>
                      <p className="ml-5">Nouveau CIDR = 24 + 2 = /26</p>
                      <p className="ml-5">Nouveau masque = 255.255.255.192</p>
                    </div>
                    
                    <div>
                      <p className="mb-1"><strong>Étape 2:</strong> Calculer l'"incrément" ou "pas" entre sous-réseaux</p>
                      <p className="ml-5">Le pas = 256 - 192 = 64 (pour le dernier octet)</p>
                    </div>
                    
                    <div>
                      <p className="mb-1"><strong>Étape 3:</strong> Calculer les adresses de chaque sous-réseau</p>
                      <table className="w-full mt-2 border-collapse">
                        <thead>
                          <tr>
                            <th className="border border-network-dark p-2">Sous-réseau</th>
                            <th className="border border-network-dark p-2">Adresse réseau</th>
                            <th className="border border-network-dark p-2">Première adresse</th>
                            <th className="border border-network-dark p-2">Dernière adresse</th>
                            <th className="border border-network-dark p-2">Adresse de diffusion</th>
                          </tr>
                        </thead>
                        <tbody className="font-mono">
                          <tr>
                            <td className="border border-network-dark p-2 text-center">1</td>
                            <td className="border border-network-dark p-2 text-center">192.168.1.0</td>
                            <td className="border border-network-dark p-2 text-center">192.168.1.1</td>
                            <td className="border border-network-dark p-2 text-center">192.168.1.62</td>
                            <td className="border border-network-dark p-2 text-center">192.168.1.63</td>
                          </tr>
                          <tr>
                            <td className="border border-network-dark p-2 text-center">2</td>
                            <td className="border border-network-dark p-2 text-center">192.168.1.64</td>
                            <td className="border border-network-dark p-2 text-center">192.168.1.65</td>
                            <td className="border border-network-dark p-2 text-center">192.168.1.126</td>
                            <td className="border border-network-dark p-2 text-center">192.168.1.127</td>
                          </tr>
                          <tr>
                            <td className="border border-network-dark p-2 text-center">3</td>
                            <td className="border border-network-dark p-2 text-center">192.168.1.128</td>
                            <td className="border border-network-dark p-2 text-center">192.168.1.129</td>
                            <td className="border border-network-dark p-2 text-center">192.168.1.190</td>
                            <td className="border border-network-dark p-2 text-center">192.168.1.191</td>
                          </tr>
                          <tr>
                            <td className="border border-network-dark p-2 text-center">4</td>
                            <td className="border border-network-dark p-2 text-center">192.168.1.192</td>
                            <td className="border border-network-dark p-2 text-center">192.168.1.193</td>
                            <td className="border border-network-dark p-2 text-center">192.168.1.254</td>
                            <td className="border border-network-dark p-2 text-center">192.168.1.255</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-network-light rounded-md">
                  <p className="font-medium mb-2 text-lg">Comment calculer l'incrément (pas):</p>
                  <ul className="list-disc list-inside text-base space-y-1">
                    <li>Déterminez l'octet variable (celui qui change pour chaque sous-réseau)</li>
                    <li>Calculez l'incrément: 256 - (valeur du dernier octet du masque)</li>
                    <li>Exemples:
                      <ul className="list-disc list-inside ml-4">
                        <li>Pour un masque /26 (255.255.255.192): Incrément = 256 - 192 = 64</li>
                        <li>Pour un masque /27 (255.255.255.224): Incrément = 256 - 224 = 32</li>
                        <li>Pour un masque /28 (255.255.255.240): Incrément = 256 - 240 = 16</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              
            </TabsContent>
            
            <TabsContent value="examples" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-network-dark mb-3">Exemple 1: Réseau /24</h3>
                <Card className="mb-4">
                  <CardContent className="p-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium text-network-text mb-1">Données</p>
                        <ul className="list-disc list-inside text-base">
                          <li>IP: 192.168.1.10</li>
                          <li>Masque: 255.255.255.0 (/24)</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-network-text mb-1">Résultats</p>
                        <ul className="list-disc list-inside text-base">
                          <li>Adresse réseau: 192.168.1.0</li>
                          <li>Adresse de diffusion: 192.168.1.255</li>
                          <li>Plage d'adresses: 192.168.1.1 - 192.168.1.254</li>
                          <li>Nombre d'hôtes: 254</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-network-dark mb-3">Exemple 2: Réseau /16</h3>
                <Card className="mb-4">
                  <CardContent className="p-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium text-network-text mb-1">Données</p>
                        <ul className="list-disc list-inside text-base">
                          <li>IP: 172.16.45.10</li>
                          <li>Masque: 255.255.0.0 (/16)</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-network-text mb-1">Résultats</p>
                        <ul className="list-disc list-inside text-base">
                          <li>Adresse réseau: 172.16.0.0</li>
                          <li>Adresse de diffusion: 172.16.255.255</li>
                          <li>Plage d'adresses: 172.16.0.1 - 172.16.255.254</li>
                          <li>Nombre d'hôtes: 65 534</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-network-dark mb-3">Exemple 3: Découpage d'un réseau /24 en 4 sous-réseaux</h3>
                <Card className="mb-4">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium text-network-text mb-1">Réseau d'origine</p>
                        <ul className="list-disc list-inside text-base">
                          <li>Réseau: 192.168.1.0/24</li>
                          <li>Masque: 255.255.255.0</li>
                        </ul>
                      </div>
                      
                      <div>
                        <p className="font-medium text-network-text mb-1">Configuration du découpage</p>
                        <ul className="list-disc list-inside text-base">
                          <li>Nombre de sous-réseaux souhaité: 4</li>
                          <li>Bits empruntés: 2 (car 2² = 4)</li>
                          <li>Nouveau CIDR: /26 (24 + 2)</li>
                          <li>Nouveau masque: 255.255.255.192</li>
                          <li>Incrément: 64 (256 - 192)</li>
                        </ul>
                      </div>
                      
                      <div>
                        <p className="font-medium text-network-text mb-1">Sous-réseaux résultants</p>
                        <table className="w-full mt-2 border-collapse text-base">
                          <thead>
                            <tr>
                              <th className="border border-network-light p-2">Sous-réseau</th>
                              <th className="border border-network-light p-2">Plage d'adresses</th>
                              <th className="border border-network-light p-2">Hôtes utilisables</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-network-light p-2">192.168.1.0/26</td>
                              <td className="border border-network-light p-2">192.168.1.0 - 192.168.1.63</td>
                              <td className="border border-network-light p-2">62</td>
                            </tr>
                            <tr>
                              <td className="border border-network-light p-2">192.168.1.64/26</td>
                              <td className="border border-network-light p-2">192.168.1.64 - 192.168.1.127</td>
                              <td className="border border-network-light p-2">62</td>
                            </tr>
                            <tr>
                              <td className="border border-network-light p-2">192.168.1.128/26</td>
                              <td className="border border-network-light p-2">192.168.1.128 - 192.168.1.191</td>
                              <td className="border border-network-light p-2">62</td>
                            </tr>
                            <tr>
                              <td className="border border-network-light p-2">192.168.1.192/26</td>
                              <td className="border border-network-light p-2">192.168.1.192 - 192.168.1.255</td>
                              <td className="border border-network-light p-2">62</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-network-dark mb-3">Astuce: Puissances de 2</h3>
                <p className="mb-3 text-base">
                  Pour faciliter les calculs, mémorisez ces valeurs de puissances de 2:
                </p>
                <table className="network-table w-full mb-4 text-base">
                  <thead>
                    <tr>
                      <th>Exposant</th>
                      <th>Valeur</th>
                      <th>CIDR</th>
                      <th>Nombre d'adresses</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2^1</td>
                      <td>2</td>
                      <td>/31</td>
                      <td>2</td>
                    </tr>
                    <tr>
                      <td>2^2</td>
                      <td>4</td>
                      <td>/30</td>
                      <td>4</td>
                    </tr>
                    <tr>
                      <td>2^3</td>
                      <td>8</td>
                      <td>/29</td>
                      <td>8</td>
                    </tr>
                    <tr>
                      <td>2^4</td>
                      <td>16</td>
                      <td>/28</td>
                      <td>16</td>
                    </tr>
                    <tr>
                      <td>2^5</td>
                      <td>32</td>
                      <td>/27</td>
                      <td>32</td>
                    </tr>
                    <tr>
                      <td>2^6</td>
                      <td>64</td>
                      <td>/26</td>
                      <td>64</td>
                    </tr>
                    <tr>
                      <td>2^7</td>
                      <td>128</td>
                      <td>/25</td>
                      <td>128</td>
                    </tr>
                    <tr>
                      <td>2^8</td>
                      <td>256</td>
                      <td>/24</td>
                      <td>256</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-sm text-gray-600">
                  Pour les adresses utilisables, soustrayez 2 du nombre d'adresses (pour l'adresse réseau et l'adresse de diffusion).
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="bg-gray-50 p-4">
          <p className="text-sm text-gray-600">
            💡 Astuce: Utilisez la section "Convertisseur IP ↔ Binaire" ci-dessus pour pratiquer la conversion d'adresses IP en binaire et vice-versa.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Tutorial;
