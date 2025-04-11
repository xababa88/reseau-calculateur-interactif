
import { cidrToSubnetMask, calculateNetworkAddress, calculateBroadcastAddress, calculateSubnetCidr, divideNetworkIntoSubnets } from './networkUtils';

export interface NetworkExercise {
  ip: string;
  cidr: number;
  subnetMask: string;
  question: string;
  answer: {
    networkAddress: string;
    broadcastAddress: string;
    cidr: number;
    numHosts: number;
  };
}

export interface SubnettingExercise {
  ip: string;
  cidr: number;
  subnetCount: number;
  question: string;
  answer: {
    networkAddress: string;
    newCidr: number;
    subnets: Array<{
      networkAddress: string;
      broadcastAddress: string;
    }>;
  };
}

type ExerciseType = 'network' | 'subnetting';

// Generate a random IP address
const generateRandomIp = (): string => {
  const octets = Array(4).fill(0).map(() => Math.floor(Math.random() * 256));
  return octets.join('.');
};

// Generate a random CIDR between min and max
const generateRandomCidr = (min = 16, max = 30): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate a random subnet count (power of 2)
const generateRandomSubnetCount = (maxBits = 4): number => {
  const bits = Math.floor(Math.random() * maxBits) + 1; // 1 to maxBits bits
  return Math.pow(2, bits); // 2, 4, 8, 16 subnets, etc.
};

// Generate an exercise with a random IP and subnet
export const generateNetworkExercise = (difficulty: 'easy' | 'medium' | 'hard'): NetworkExercise => {
  // Adjust CIDR range based on difficulty
  let minCidr, maxCidr;
  
  switch (difficulty) {
    case 'easy':
      minCidr = 24;
      maxCidr = 28;
      break;
    case 'medium':
      minCidr = 20;
      maxCidr = 27;
      break;
    case 'hard':
      minCidr = 16;
      maxCidr = 30;
      break;
    default:
      minCidr = 24;
      maxCidr = 28;
  }
  
  const ip = generateRandomIp();
  const cidr = generateRandomCidr(minCidr, maxCidr);
  const subnetMask = cidrToSubnetMask(cidr);
  const networkAddress = calculateNetworkAddress(ip, subnetMask);
  const broadcastAddress = calculateBroadcastAddress(ip, subnetMask);
  const numHosts = Math.pow(2, 32 - cidr) - 2;
  
  return {
    ip,
    cidr,
    subnetMask,
    question: `Calculez l'adresse réseau et l'adresse de diffusion pour l'adresse IP ${ip}/${cidr}`,
    answer: {
      networkAddress,
      broadcastAddress,
      cidr,
      numHosts,
    }
  };
};

// Generate an exercise for subnetting
export const generateSubnettingExercise = (difficulty: 'easy' | 'medium' | 'hard'): SubnettingExercise => {
  // Adjust CIDR and subnet count based on difficulty
  let minCidr, maxCidr, maxSubnetBits;
  
  switch (difficulty) {
    case 'easy':
      minCidr = 20;
      maxCidr = 24;
      maxSubnetBits = 2; // Up to 4 subnets
      break;
    case 'medium':
      minCidr = 16;
      maxCidr = 24;
      maxSubnetBits = 3; // Up to 8 subnets
      break;
    case 'hard':
      minCidr = 12;
      maxCidr = 20;
      maxSubnetBits = 4; // Up to 16 subnets
      break;
    default:
      minCidr = 20;
      maxCidr = 24;
      maxSubnetBits = 2;
  }
  
  // Generate random values
  const ip = generateRandomIp();
  const cidr = generateRandomCidr(minCidr, maxCidr);
  const subnetCount = generateRandomSubnetCount(maxSubnetBits);
  
  // Calculate network address
  const subnetMask = cidrToSubnetMask(cidr);
  const networkAddress = calculateNetworkAddress(ip, subnetMask);
  
  // Calculate new CIDR for subnetting
  const newCidr = calculateSubnetCidr(cidr, subnetCount);
  
  // Generate subnets
  const subnets = divideNetworkIntoSubnets(networkAddress, cidr, subnetCount)
    .map(subnet => ({
      networkAddress: subnet.networkAddress,
      broadcastAddress: subnet.broadcastAddress
    }));
  
  return {
    ip,
    cidr,
    subnetCount,
    question: `Découpez le réseau ${networkAddress}/${cidr} en ${subnetCount} sous-réseaux égaux. Donnez l'adresse réseau et l'adresse de diffusion pour chaque sous-réseau.`,
    answer: {
      networkAddress,
      newCidr,
      subnets
    }
  };
};

// Generate a set of exercises of specified type
export const generateExerciseSet = (
  count: number, 
  difficulty: 'easy' | 'medium' | 'hard', 
  type: ExerciseType = 'network'
): (NetworkExercise | SubnettingExercise)[] => {
  if (type === 'subnetting') {
    return Array(count).fill(0).map(() => generateSubnettingExercise(difficulty));
  }
  return Array(count).fill(0).map(() => generateNetworkExercise(difficulty));
};
