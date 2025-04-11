
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
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="basics">Notions de base</TabsTrigger>
              <TabsTrigger value="calculations">Méthode de calcul</TabsTrigger>
              <TabsTrigger value="examples">Exemples</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basics" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-network-dark mb-2">Adresses IPv4</h3>
                <p className="mb-4">
                  Une adresse IPv4 est composée de 4 octets (32 bits), représentés en notation décimale pointée:
                  192.168.1.1
                </p>
                <p className="mb-2">Chaque octet représente 8 bits, avec des valeurs de 0 à 255.</p>
                <div className="p-3 bg-network-light rounded-md my-4">
                  <div className="flex flex-wrap justify-center gap-2 font-mono text-sm">
                    <div className="flex flex-col items-center">
                      <div className="flex">
                        <span className="w-7 h-7 flex items-center justify-center border border-network bg-network text-white rounded-sm">1</span>
                        <span className="w-7 h-7 flex items-center justify-center border border-network bg-network text-white rounded-sm">1</span>
                        <span className="w-7 h-7 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-7 h-7 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-7 h-7 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-7 h-7 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-7 h-7 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-7 h-7 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                      </div>
                      <span className="mt-1 text-network-text">192</span>
                    </div>
                    <span className="text-xl">.</span>
                    <div className="flex flex-col items-center">
                      <div className="flex">
                        <span className="w-7 h-7 flex items-center justify-center border border-network bg-network text-white rounded-sm">1</span>
                        <span className="w-7 h-7 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-7 h-7 flex items-center justify-center border border-network bg-network text-white rounded-sm">1</span>
                        <span className="w-7 h-7 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-7 h-7 flex items-center justify-center border border-network bg-network text-white rounded-sm">1</span>
                        <span className="w-7 h-7 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-7 h-7 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-7 h-7 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                      </div>
                      <span className="mt-1 text-network-text">168</span>
                    </div>
                    <span className="text-xl">.</span>
                    <div className="flex flex-col items-center">
                      <div className="flex">
                        <span className="w-7 h-7 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-7 h-7 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-7 h-7 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-7 h-7 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-7 h-7 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-7 h-7 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-7 h-7 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-7 h-7 flex items-center justify-center border border-network bg-network text-white rounded-sm">1</span>
                      </div>
                      <span className="mt-1 text-network-text">1</span>
                    </div>
                    <span className="text-xl">.</span>
                    <div className="flex flex-col items-center">
                      <div className="flex">
                        <span className="w-7 h-7 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-7 h-7 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-7 h-7 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-7 h-7 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-7 h-7 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-7 h-7 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                        <span className="w-7 h-7 flex items-center justify-center border border-network bg-network text-white rounded-sm">1</span>
                        <span className="w-7 h-7 flex items-center justify-center border border-network bg-network text-white rounded-sm">0</span>
                      </div>
                      <span className="mt-1 text-network-text">2</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold text-network-dark mb-2">Masque de Sous-réseau</h3>
                <p className="mb-4">
                  Un masque de sous-réseau détermine quelle partie d'une adresse IP identifie le réseau et quelle partie identifie les hôtes.
                </p>
                <p className="mb-3">Il peut être exprimé de deux façons:</p>
                <ul className="list-disc list-inside mb-4">
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
                <p className="mt-2">
                  Dans un masque de sous-réseau, tous les bits à 1 représentent la partie réseau, tandis que tous les bits à 0 représentent la partie hôte.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold text-network-dark mb-2">Concepts Clés</h3>
                <div className="space-y-3">
                  <div className="p-3 border border-network-light rounded-md">
                    <p className="font-medium text-network-text">Adresse Réseau</p>
                    <p className="text-sm">
                      L'adresse qui identifie le réseau entier. C'est la première adresse du bloc et elle ne peut pas être attribuée à un hôte.
                    </p>
                  </div>
                  
                  <div className="p-3 border border-network-light rounded-md">
                    <p className="font-medium text-network-text">Adresse de Diffusion</p>
                    <p className="text-sm">
                      La dernière adresse du réseau, utilisée pour envoyer des paquets à tous les hôtes du réseau. Elle ne peut pas être attribuée à un hôte.
                    </p>
                  </div>
                  
                  <div className="p-3 border border-network-light rounded-md">
                    <p className="font-medium text-network-text">Plage d'Adresses Utilisables</p>
                    <p className="text-sm">
                      Les adresses entre l'adresse réseau et l'adresse de diffusion, qui peuvent être attribuées aux appareils du réseau.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="calculations" className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-network-dark mb-3">Étape 1: Conversion en binaire</h3>
                <p className="mb-3 text-base">
                  Convertissez l'adresse IP et le masque de sous-réseau en notation binaire:
                </p>
                <div className="p-4 bg-network-light rounded-md my-4">
                  <div className="mb-3">
                    <p className="text-base font-medium mb-1">Adresse IP: 192.168.1.10</p>
                    <p className="font-mono text-base md:text-lg">11000000.10101000.00000001.00001010</p>
                  </div>
                  <div>
                    <p className="text-base font-medium mb-1">Masque: 255.255.255.0 (ou /24)</p>
                    <p className="font-mono text-base md:text-lg">11111111.11111111.11111111.00000000</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-xl font-semibold text-network-dark mb-3">Étape 2: Calcul de l'adresse réseau</h3>
                <p className="mb-3 text-base">
                  Effectuez un ET logique bit par bit entre l'adresse IP et le masque:
                </p>
                <div className="p-6 bg-network-light rounded-md my-4 font-mono text-base md:text-lg">
                  <p className="mb-2">   IP: 11000000.10101000.00000001.00001010</p>
                  <p className="mb-2">Masque: 11111111.11111111.11111111.00000000</p>
                  <div className="my-2 border-t-2 border-network"></div>
                  <p className="font-bold">Réseau: 11000000.10101000.00000001.00000000</p>
                  <p className="mt-3 text-network-text font-bold">(192.168.1.0)</p>
                </div>
                <div className="p-4 bg-white border border-network-light rounded-md">
                  <p className="font-medium mb-2 text-base">
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
                <p className="mb-3 text-base">
                  Effectuez un OU logique bit par bit entre l'adresse réseau et l'inverse du masque:
                </p>
                <div className="p-6 bg-network-light rounded-md my-4 font-mono text-base md:text-lg">
                  <p className="mb-2">      Réseau: 11000000.10101000.00000001.00000000</p>
                  <p className="mb-2">Inverse masque: 00000000.00000000.00000000.11111111</p>
                  <div className="my-2 border-t-2 border-network"></div>
                  <p className="font-bold">     Diffusion: 11000000.10101000.00000001.11111111</p>
                  <p className="mt-3 text-network-text font-bold">(192.168.1.255)</p>
                </div>
                <div className="p-4 bg-white border border-network-light rounded-md">
                  <p className="font-medium mb-2 text-base">
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
            
            <TabsContent value="examples" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-network-dark mb-3">Exemple 1: Réseau /24</h3>
                <Card className="mb-4">
                  <CardContent className="p-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium text-network-text mb-1">Données</p>
                        <ul className="list-disc list-inside">
                          <li>IP: 192.168.1.10</li>
                          <li>Masque: 255.255.255.0 (/24)</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-network-text mb-1">Résultats</p>
                        <ul className="list-disc list-inside">
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
                        <ul className="list-disc list-inside">
                          <li>IP: 172.16.45.10</li>
                          <li>Masque: 255.255.0.0 (/16)</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-network-text mb-1">Résultats</p>
                        <ul className="list-disc list-inside">
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
                <h3 className="text-lg font-semibold text-network-dark mb-3">Exemple 3: Réseau /28</h3>
                <Card className="mb-4">
                  <CardContent className="p-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium text-network-text mb-1">Données</p>
                        <ul className="list-disc list-inside">
                          <li>IP: 10.0.0.18</li>
                          <li>Masque: 255.255.255.240 (/28)</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-network-text mb-1">Résultats</p>
                        <ul className="list-disc list-inside">
                          <li>Adresse réseau: 10.0.0.16</li>
                          <li>Adresse de diffusion: 10.0.0.31</li>
                          <li>Plage d'adresses: 10.0.0.17 - 10.0.0.30</li>
                          <li>Nombre d'hôtes: 14</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-network-dark mb-3">Astuce: Puissances de 2</h3>
                <p className="mb-3">
                  Pour faciliter les calculs, mémorisez ces valeurs de puissances de 2:
                </p>
                <table className="network-table w-full mb-4">
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
