
// Convert IP address string to binary representation
export const ipToBinary = (ip: string): string[] => {
  try {
    const octets = ip.split('.');
    if (octets.length !== 4) return ['', '', '', ''];
    
    return octets.map(octet => {
      const num = parseInt(octet, 10);
      if (isNaN(num) || num < 0 || num > 255) return '';
      return num.toString(2).padStart(8, '0');
    });
  } catch (error) {
    console.error("Error converting IP to binary:", error);
    return ['', '', '', ''];
  }
};

// Convert binary array to IP address string
export const binaryToIp = (binaryOctets: string[]): string => {
  try {
    return binaryOctets
      .map(binary => binary ? parseInt(binary, 2).toString() : '0')
      .join('.');
  } catch (error) {
    console.error("Error converting binary to IP:", error);
    return '';
  }
};

// Calculate network address from IP and subnet mask
export const calculateNetworkAddress = (ip: string, subnetMask: string): string => {
  try {
    const ipOctets = ip.split('.').map(octet => parseInt(octet, 10));
    const maskOctets = subnetMask.split('.').map(octet => parseInt(octet, 10));
    
    if (ipOctets.length !== 4 || maskOctets.length !== 4) return '';
    
    const networkOctets = ipOctets.map((ipOctet, i) => ipOctet & maskOctets[i]);
    return networkOctets.join('.');
  } catch (error) {
    console.error("Error calculating network address:", error);
    return '';
  }
};

// Calculate broadcast address from IP and subnet mask
export const calculateBroadcastAddress = (ip: string, subnetMask: string): string => {
  try {
    const ipOctets = ip.split('.').map(octet => parseInt(octet, 10));
    const maskOctets = subnetMask.split('.').map(octet => parseInt(octet, 10));
    
    if (ipOctets.length !== 4 || maskOctets.length !== 4) return '';
    
    const invertedMaskOctets = maskOctets.map(octet => 255 - octet);
    const broadcastOctets = ipOctets.map((ipOctet, i) => ipOctet | invertedMaskOctets[i]);
    
    return broadcastOctets.join('.');
  } catch (error) {
    console.error("Error calculating broadcast address:", error);
    return '';
  }
};

// Calculate first usable host address
export const calculateFirstHostAddress = (networkAddress: string): string => {
  try {
    const octets = networkAddress.split('.');
    if (octets.length !== 4) return '';
    
    // First host is network address + 1
    const lastOctet = parseInt(octets[3], 10) + 1;
    return `${octets[0]}.${octets[1]}.${octets[2]}.${lastOctet}`;
  } catch (error) {
    console.error("Error calculating first host address:", error);
    return '';
  }
};

// Calculate last usable host address
export const calculateLastHostAddress = (broadcastAddress: string): string => {
  try {
    const octets = broadcastAddress.split('.');
    if (octets.length !== 4) return '';
    
    // Last host is broadcast address - 1
    const lastOctet = parseInt(octets[3], 10) - 1;
    return `${octets[0]}.${octets[1]}.${octets[2]}.${lastOctet}`;
  } catch (error) {
    console.error("Error calculating last host address:", error);
    return '';
  }
};

// Convert CIDR notation to subnet mask
export const cidrToSubnetMask = (cidr: number): string => {
  try {
    if (cidr < 0 || cidr > 32) return '';
    
    const mask = [];
    let fullOctets = Math.floor(cidr / 8);
    let remainingBits = cidr % 8;
    
    // Add full octets (all 1's)
    for (let i = 0; i < fullOctets; i++) {
      mask.push(255);
    }
    
    // Add partial octet if needed
    if (remainingBits > 0) {
      mask.push(256 - Math.pow(2, 8 - remainingBits));
    }
    
    // Fill remaining octets with 0
    while (mask.length < 4) {
      mask.push(0);
    }
    
    return mask.join('.');
  } catch (error) {
    console.error("Error converting CIDR to subnet mask:", error);
    return '';
  }
};

// Convert subnet mask to CIDR notation
export const subnetMaskToCidr = (subnetMask: string): number => {
  try {
    const octets = subnetMask.split('.');
    if (octets.length !== 4) return 0;
    
    let cidr = 0;
    for (const octet of octets) {
      const num = parseInt(octet, 10);
      
      // Count set bits in this octet
      let binaryOctet = num.toString(2);
      for (const bit of binaryOctet) {
        if (bit === '1') cidr++;
      }
    }
    
    return cidr;
  } catch (error) {
    console.error("Error converting subnet mask to CIDR:", error);
    return 0;
  }
};

// Calculate the number of hosts in a subnet
export const calculateNumberOfHosts = (cidr: number): number => {
  try {
    // Formula: 2^(32-CIDR) - 2
    return Math.pow(2, 32 - cidr) - 2;
  } catch (error) {
    console.error("Error calculating number of hosts:", error);
    return 0;
  }
};

// Check if an IP address is valid
export const isValidIp = (ip: string): boolean => {
  try {
    const octets = ip.split('.');
    if (octets.length !== 4) return false;
    
    for (const octet of octets) {
      const num = parseInt(octet, 10);
      if (isNaN(num) || num < 0 || num > 255) return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error validating IP address:", error);
    return false;
  }
};

// Check if a subnet mask is valid
export const isValidSubnetMask = (subnetMask: string): boolean => {
  try {
    const octets = subnetMask.split('.').map(octet => parseInt(octet, 10));
    if (octets.length !== 4) return false;
    
    // Convert to single binary string
    let binaryMask = '';
    for (const octet of octets) {
      if (isNaN(octet) || octet < 0 || octet > 255) return false;
      binaryMask += octet.toString(2).padStart(8, '0');
    }
    
    // Check that all 1's are contiguous from left
    const match = /^1*0*$/.test(binaryMask);
    return match;
  } catch (error) {
    console.error("Error validating subnet mask:", error);
    return false;
  }
};
