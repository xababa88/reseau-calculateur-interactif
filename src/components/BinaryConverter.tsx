
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ipToBinary, binaryToIp, isValidIp } from '@/utils/networkUtils';

const BinaryConverter: React.FC = () => {
  const [ip, setIp] = useState('192.168.1.1');
  const [binaryOctets, setBinaryOctets] = useState<string[]>(['', '', '', '']);
  const [error, setError] = useState('');

  useEffect(() => {
    if (ip) {
      if (isValidIp(ip)) {
        setBinaryOctets(ipToBinary(ip));
        setError('');
      } else {
        setError('IP invalide. Format requis: x.x.x.x (0-255)');
      }
    }
  }, [ip]);

  const handleIpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIp(e.target.value);
  };

  const toggleBit = (octetIndex: number, bitIndex: number) => {
    const newBinaryOctets = [...binaryOctets];
    const octet = newBinaryOctets[octetIndex];
    
    if (!octet) return;
    
    // Toggle the bit at the specified index
    const bits = octet.split('');
    bits[bitIndex] = bits[bitIndex] === '1' ? '0' : '1';
    newBinaryOctets[octetIndex] = bits.join('');
    
    // Update binary octets
    setBinaryOctets(newBinaryOctets);
    
    // Update IP address
    setIp(binaryToIp(newBinaryOctets));
  };

  const renderBinaryOctet = (octet: string, octetIndex: number) => {
    if (!octet) return null;
    
    return (
      <div key={octetIndex} className="octet-container">
        {octet.split('').map((bit, bitIndex) => (
          <div
            key={`${octetIndex}-${bitIndex}`}
            className={`binary-bit cursor-pointer ${bit === '1' ? 'active' : ''}`}
            onClick={() => toggleBit(octetIndex, bitIndex)}
          >
            {bit}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-network-light">
      <h2 className="text-2xl font-semibold text-network-dark mb-4">Convertisseur IP ↔ Binaire</h2>
      
      <div className="mb-4">
        <Label htmlFor="ip-address" className="text-network-text mb-2 block">Adresse IP</Label>
        <Input
          id="ip-address"
          type="text"
          value={ip}
          onChange={handleIpChange}
          placeholder="192.168.1.1"
          className={`border-network-light ${error ? 'border-red-500' : ''}`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
      
      <div className="mt-6">
        <p className="text-network-text mb-2">Représentation Binaire:</p>
        <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
          {binaryOctets.map((octet, i) => renderBinaryOctet(octet, i))}
        </div>
        
        <div className="grid grid-cols-4 gap-1 mt-4 text-xs text-center text-gray-500">
          <div>Octet 1</div>
          <div>Octet 2</div>
          <div>Octet 3</div>
          <div>Octet 4</div>
        </div>
        
        <p className="mt-6 text-sm text-network-text italic">
          Cliquez sur les bits pour les modifier et voir le résultat en temps réel.
        </p>
      </div>
    </div>
  );
};

export default BinaryConverter;
