import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { 
  ipToBinary, 
  isValidIp, 
  isValidSubnetMask, 
  cidrToSubnetMask, 
  subnetMaskToCidr, 
  calculateNetworkAddress, 
  calculateBroadcastAddress,
  calculateFirstHostAddress,
  calculateLastHostAddress,
  calculateNumberOfHosts,
  divideNetworkIntoSubnets,
  getMaxPossibleSubnets
} from '@/utils/networkUtils';

interface IPInfoProps {
  label: string;
  value: string;
  binary?: string[];
}

const IPInfo: React.FC<IPInfoProps> = ({ label, value, binary }) => (
  <div className="mb-4">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium">{value}</p>
    {binary && (
      <p className="mt-1 text-xs font-mono text-gray-500">
        {binary.join('.')}
      </p>
    )}
  </div>
);

const IPCalculator: React.FC = () => {
  const [ip, setIp] = useState('192.168.1.10');
  const [inputMode, setInputMode] = useState<'cidr' | 'mask'>('cidr');
  const [cidr, setCidr] = useState(24);
  const [subnetMask, setSubnetMask] = useState('255.255.255.0');
  const [networkInfo, setNetworkInfo] = useState({
    networkAddress: '',
    broadcastAddress: '',
    firstHostAddress: '',
    lastHostAddress: '',
    numHosts: 0,
    ipBinary: ['', '', '', ''],
    maskBinary: ['', '', '', ''],
    networkBinary: ['', '', '', ''],
    broadcastBinary: ['', '', '', ''],
  });
  const [errors, setErrors] = useState({
    ip: '',
    mask: ''
  });

  const [subnetCount, setSubnetCount] = useState<number>(2);
  const [subnets, setSubnets] = useState<any[]>([]);
  const [maxSubnets, setMaxSubnets] = useState<number>(64);
  const [calculatorMode, setCalculatorMode] = useState<'basic' | 'subnet'>('basic');

  const cidrOptions = Array.from({ length: 31 }, (_, i) => i + 1);

  useEffect(() => {
    calculateNetwork();
  }, [ip, cidr, subnetMask, inputMode]);

  const calculateNetwork = () => {
    let hasErrors = false;
    const newErrors = { ip: '', mask: '' };
    
    if (!isValidIp(ip)) {
      newErrors.ip = 'IP invalide. Format requis: x.x.x.x (0-255)';
      hasErrors = true;
    }

    let effectiveSubnetMask = subnetMask;
    if (inputMode === 'cidr') {
      effectiveSubnetMask = cidrToSubnetMask(cidr);
    } else {
      if (!isValidSubnetMask(subnetMask)) {
        newErrors.mask = 'Masque de sous-réseau invalide';
        hasErrors = true;
      }
    }

    setErrors(newErrors);
    
    if (hasErrors) return;
    
    try {
      const networkAddress = calculateNetworkAddress(ip, effectiveSubnetMask);
      const broadcastAddress = calculateBroadcastAddress(ip, effectiveSubnetMask);
      const firstHostAddress = calculateFirstHostAddress(networkAddress);
      const lastHostAddress = calculateLastHostAddress(broadcastAddress);
      const effectiveCidr = inputMode === 'cidr' ? cidr : subnetMaskToCidr(subnetMask);
      const numHosts = calculateNumberOfHosts(effectiveCidr);
      
      const ipBinary = ipToBinary(ip);
      const maskBinary = ipToBinary(effectiveSubnetMask);
      const networkBinary = ipToBinary(networkAddress);
      const broadcastBinary = ipToBinary(broadcastAddress);
      
      setNetworkInfo({
        networkAddress,
        broadcastAddress,
        firstHostAddress,
        lastHostAddress,
        numHosts,
        ipBinary,
        maskBinary,
        networkBinary,
        broadcastBinary
      });

      const newMaxSubnets = getMaxPossibleSubnets(effectiveCidr);
      setMaxSubnets(newMaxSubnets);
      
      if (subnetCount > newMaxSubnets) {
        setSubnetCount(newMaxSubnets);
      }
    } catch (error) {
      console.error("Error calculating network info:", error);
      toast.error("Une erreur s'est produite lors du calcul.");
    }
  };

  const handleIpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIp(e.target.value);
  };

  const handleSubnetMaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubnetMask(e.target.value);
  };

  const handleCidrChange = (value: string) => {
    const newCidr = parseInt(value, 10);
    setCidr(newCidr);
    
    setSubnetMask(cidrToSubnetMask(newCidr));
  };

  const handleInputModeChange = (value: string) => {
    setInputMode(value as 'cidr' | 'mask');
  };

  const handleCalculateSubnets = () => {
    if (!isValidIp(ip)) {
      toast.error("L'adresse IP entrée n'est pas valide");
      return;
    }
    
    const effectiveSubnetMask = inputMode === 'cidr' ? cidrToSubnetMask(cidr) : subnetMask;
    const networkAddress = calculateNetworkAddress(ip, effectiveSubnetMask);
    const effectiveCidr = inputMode === 'cidr' ? cidr : subnetMaskToCidr(subnetMask);
    
    const calculatedSubnets = divideNetworkIntoSubnets(networkAddress, effectiveCidr, subnetCount);
    
    if (calculatedSubnets.length === 0) {
      toast.error("Impossible de découper le réseau. Vérifiez vos entrées.");
      return;
    }
    
    setSubnets(calculatedSubnets);
    toast.success(`${calculatedSubnets.length} sous-réseaux générés`);
  };

  return (
    <div className="mb-8">
      <Card className="border-network-light">
        <CardHeader className="bg-network-light">
          <CardTitle className="text-network-dark">Calculateur de Sous-réseau</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs value={calculatorMode} onValueChange={(value) => setCalculatorMode(value as 'basic' | 'subnet')} className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Calcul de base</TabsTrigger>
              <TabsTrigger value="subnet">Découpage en sous-réseaux</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <div className="mb-6">
                <Label htmlFor="ip-address" className="text-network-text mb-2 block">Adresse IP</Label>
                <Input
                  id="ip-address"
                  type="text"
                  value={ip}
                  onChange={handleIpChange}
                  placeholder="192.168.1.1"
                  className={`border-network-light ${errors.ip ? 'border-red-500' : ''}`}
                />
                {errors.ip && <p className="text-red-500 text-sm mt-1">{errors.ip}</p>}
              </div>
              
              <div className="mb-6">
                <Label className="text-network-text mb-2 block">Mode de Masque</Label>
                <Tabs value={inputMode} onValueChange={handleInputModeChange} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="cidr">Notation CIDR</TabsTrigger>
                    <TabsTrigger value="mask">Masque de Sous-réseau</TabsTrigger>
                  </TabsList>
                  <TabsContent value="cidr" className="mt-4">
                    <Select value={cidr.toString()} onValueChange={handleCidrChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionnez CIDR" />
                      </SelectTrigger>
                      <SelectContent>
                        {cidrOptions.map((option) => (
                          <SelectItem key={option} value={option.toString()}>
                            /{option} ({cidrToSubnetMask(option)})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TabsContent>
                  <TabsContent value="mask" className="mt-4">
                    <Input
                      type="text"
                      value={subnetMask}
                      onChange={handleSubnetMaskChange}
                      placeholder="255.255.255.0"
                      className={`border-network-light ${errors.mask ? 'border-red-500' : ''}`}
                    />
                    {errors.mask && <p className="text-red-500 text-sm mt-1">{errors.mask}</p>}
                  </TabsContent>
                </Tabs>
              </div>

              {calculatorMode === 'subnet' && (
                <div className="mb-6">
                  <Label htmlFor="subnet-count" className="mb-2 block">Nombre de sous-réseaux ({subnetCount})</Label>
                  <div className="flex items-center space-x-2">
                    <Slider
                      min={2}
                      max={Math.min(maxSubnets, 64)}
                      step={1}
                      value={[subnetCount]}
                      onValueChange={(value) => setSubnetCount(value[0])}
                      className="flex-1"
                    />
                    <span className="w-10 text-center">{subnetCount}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Max: {maxSubnets > 64 ? '64+' : maxSubnets}</p>
                  <div className="mt-4">
                    <Button onClick={handleCalculateSubnets} className="bg-network hover:bg-network-dark">
                      Diviser le réseau
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            {calculatorMode === 'basic' && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-network-dark mb-4">Résultats:</h3>
                
                <IPInfo 
                  label="Adresse IP"
                  value={ip} 
                  binary={networkInfo.ipBinary} 
                />
                
                <IPInfo 
                  label={inputMode === 'cidr' ? `Masque de sous-réseau (/${cidr})` : `Masque de sous-réseau (/${subnetMaskToCidr(subnetMask)})`}
                  value={inputMode === 'cidr' ? cidrToSubnetMask(cidr) : subnetMask} 
                  binary={networkInfo.maskBinary} 
                />
                
                <IPInfo 
                  label="Adresse Réseau"
                  value={networkInfo.networkAddress} 
                  binary={networkInfo.networkBinary} 
                />
                
                <IPInfo 
                  label="Adresse de Diffusion"
                  value={networkInfo.broadcastAddress} 
                  binary={networkInfo.broadcastBinary} 
                />
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <IPInfo 
                    label="Première adresse hôte"
                    value={networkInfo.firstHostAddress} 
                  />
                  
                  <IPInfo 
                    label="Dernière adresse hôte"
                    value={networkInfo.lastHostAddress} 
                  />
                </div>
                
                <div className="mt-4 p-2 bg-network-light rounded text-center">
                  <p className="text-network-dark font-medium">Nombre d'adresses hôtes utilisables:</p>
                  <p className="text-xl font-bold text-network-dark">{networkInfo.numHosts.toLocaleString()}</p>
                </div>
              </div>
            )}
          </div>
          
          {calculatorMode === 'basic' && (
            <div className="mt-8">
              <h3 className="text-lg font-medium text-network-dark mb-4">Table de Calcul IP</h3>
              <div className="overflow-x-auto">
                <table className="network-table w-full">
                  <thead>
                    <tr>
                      <th className="w-1/4">Type</th>
                      <th className="w-1/4">Adresse</th>
                      <th className="w-1/2">Représentation Binaire</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>IP</td>
                      <td>{ip}</td>
                      <td className="font-mono text-xs">{networkInfo.ipBinary.join('.')}</td>
                    </tr>
                    <tr>
                      <td>Masque</td>
                      <td>{inputMode === 'cidr' ? cidrToSubnetMask(cidr) : subnetMask}</td>
                      <td className="font-mono text-xs">{networkInfo.maskBinary.join('.')}</td>
                    </tr>
                    <tr>
                      <td>Réseau</td>
                      <td>{networkInfo.networkAddress}</td>
                      <td className="font-mono text-xs">{networkInfo.networkBinary.join('.')}</td>
                    </tr>
                    <tr>
                      <td>Diffusion</td>
                      <td>{networkInfo.broadcastAddress}</td>
                      <td className="font-mono text-xs">{networkInfo.broadcastBinary.join('.')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {calculatorMode === 'subnet' && subnets.length > 0 && (
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

export default IPCalculator;
