
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  calculateNumberOfHosts
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

  // Setup available CIDR options
  const cidrOptions = Array.from({ length: 31 }, (_, i) => i + 1);

  useEffect(() => {
    calculateNetwork();
  }, [ip, cidr, subnetMask, inputMode]);

  const calculateNetwork = () => {
    let hasErrors = false;
    const newErrors = { ip: '', mask: '' };
    
    // Validate IP
    if (!isValidIp(ip)) {
      newErrors.ip = 'IP invalide. Format requis: x.x.x.x (0-255)';
      hasErrors = true;
    }

    // Use the correct subnet mask based on input mode
    let effectiveSubnetMask = subnetMask;
    if (inputMode === 'cidr') {
      effectiveSubnetMask = cidrToSubnetMask(cidr);
    } else {
      // Validate subnet mask when in mask mode
      if (!isValidSubnetMask(subnetMask)) {
        newErrors.mask = 'Masque de sous-réseau invalide';
        hasErrors = true;
      }
    }

    setErrors(newErrors);
    
    if (hasErrors) return;
    
    try {
      // Calculate network details
      const networkAddress = calculateNetworkAddress(ip, effectiveSubnetMask);
      const broadcastAddress = calculateBroadcastAddress(ip, effectiveSubnetMask);
      const firstHostAddress = calculateFirstHostAddress(networkAddress);
      const lastHostAddress = calculateLastHostAddress(broadcastAddress);
      const effectiveCidr = inputMode === 'cidr' ? cidr : subnetMaskToCidr(subnetMask);
      const numHosts = calculateNumberOfHosts(effectiveCidr);
      
      // Convert addresses to binary
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
    
    // Update subnet mask for consistency
    setSubnetMask(cidrToSubnetMask(newCidr));
  };

  const handleInputModeChange = (value: string) => {
    setInputMode(value as 'cidr' | 'mask');
  };

  return (
    <div className="mb-8">
      <Card className="border-network-light">
        <CardHeader className="bg-network-light">
          <CardTitle className="text-network-dark">Calculateur de Sous-réseau</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
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
            </div>
            
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
          </div>
          
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
        </CardContent>
      </Card>
    </div>
  );
};

export default IPCalculator;
