
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from 'sonner';
import { Slider } from "@/components/ui/slider";
import {
  cidrToSubnetMask,
  isValidIp,
  calculateNetworkAddress,
  divideNetworkIntoSubnets,
  getMaxPossibleSubnets
} from '@/utils/networkUtils';

const SubnetDivider: React.FC = () => {
  const [ipAddress, setIpAddress] = useState<string>('192.168.1.0');
  const [cidr, setCidr] = useState<number>(24);
  const [subnetCount, setSubnetCount] = useState<number>(2);
  const [subnets, setSubnets] = useState<any[]>([]);
  const [maxSubnets, setMaxSubnets] = useState<number>(64);
  
  const handleCalculate = () => {
    if (!isValidIp(ipAddress)) {
      toast.error("L'adresse IP entrée n'est pas valide");
      return;
    }
    
    const subnetMask = cidrToSubnetMask(cidr);
    const networkAddress = calculateNetworkAddress(ipAddress, subnetMask);
    
    const calculatedSubnets = divideNetworkIntoSubnets(networkAddress, cidr, subnetCount);
    
    if (calculatedSubnets.length === 0) {
      toast.error("Impossible de découper le réseau. Vérifiez vos entrées.");
      return;
    }
    
    setSubnets(calculatedSubnets);
    toast.success(`${calculatedSubnets.length} sous-réseaux générés`);
  };
  
  // Update max subnets when CIDR changes
  const handleCidrChange = (value: number) => {
    setCidr(value);
    const newMaxSubnets = getMaxPossibleSubnets(value);
    setMaxSubnets(newMaxSubnets);
    
    // Ensure subnet count doesn't exceed the maximum
    if (subnetCount > newMaxSubnets) {
      setSubnetCount(newMaxSubnets);
    }
  };
  
  return (
    <div className="mb-8">
      <Card className="border-network-light">
        <CardHeader className="bg-network-light">
          <CardTitle className="text-network-dark">Découpage en Sous-réseaux</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <Label htmlFor="ip-address" className="mb-2 block">Adresse IP du réseau</Label>
              <Input
                id="ip-address"
                placeholder="192.168.1.0"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="cidr" className="mb-2 block">CIDR (/{cidr})</Label>
              <div className="flex items-center space-x-2">
                <Slider
                  min={8}
                  max={30}
                  step={1}
                  value={[cidr]}
                  onValueChange={(value) => handleCidrChange(value[0])}
                  className="flex-1"
                />
                <span className="w-10 text-center">/{cidr}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Masque: {cidrToSubnetMask(cidr)}</p>
            </div>
            
            <div>
              <Label htmlFor="subnet-count" className="mb-2 block">Nombre de sous-réseaux ({subnetCount})</Label>
              <div className="flex items-center space-x-2">
                <Slider
                  min={2}
                  max={Math.min(maxSubnets, 64)} // Limiter à 64 ou moins pour l'interface
                  step={1}
                  value={[subnetCount]}
                  onValueChange={(value) => setSubnetCount(value[0])}
                  className="flex-1"
                />
                <span className="w-10 text-center">{subnetCount}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Max: {maxSubnets > 64 ? '64+' : maxSubnets}</p>
            </div>
          </div>
          
          <div className="flex justify-center mb-8">
            <Button onClick={handleCalculate} className="bg-network hover:bg-network-dark">
              Diviser le réseau
            </Button>
          </div>
          
          {subnets.length > 0 && (
            <>
              <Separator className="my-6" />
              
              <div className="overflow-x-auto">
                <Table className="network-table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Adresse réseau</TableHead>
                      <TableHead>Masque</TableHead>
                      <TableHead>CIDR</TableHead>
                      <TableHead>Plage d'adresses</TableHead>
                      <TableHead>Diffusion</TableHead>
                      <TableHead>Nb. hôtes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subnets.map((subnet) => (
                      <TableRow key={subnet.index}>
                        <TableCell className="font-medium">{subnet.index}</TableCell>
                        <TableCell className="font-mono">{subnet.networkAddress}</TableCell>
                        <TableCell className="font-mono">{subnet.subnetMask}</TableCell>
                        <TableCell className="font-mono">/{subnet.cidr}</TableCell>
                        <TableCell className="font-mono">
                          {subnet.firstHost} - {subnet.lastHost}
                        </TableCell>
                        <TableCell className="font-mono">{subnet.broadcastAddress}</TableCell>
                        <TableCell>{subnet.numHosts}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-4 p-4 bg-network-light rounded-md text-sm">
                <p><strong>Note:</strong> Un réseau /24 divisé en 4 sous-réseaux devient 4 réseaux /26. Chaque bit emprunté à la partie hôte double le nombre de sous-réseaux.</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SubnetDivider;
