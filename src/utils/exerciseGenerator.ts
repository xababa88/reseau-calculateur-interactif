
import { cidrToSubnetMask, calculateNetworkAddress, calculateBroadcastAddress } from './networkUtils';

interface NetworkExercise {
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

// Generate a random IP address
const generateRandomIp = (): string => {
  const octets = Array(4).fill(0).map(() => Math.floor(Math.random() * 256));
  return octets.join('.');
};

// Generate a random CIDR between min and max
const generateRandomCidr = (min = 16, max = 30): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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

// Generate a set of exercises
export const generateExerciseSet = (count: number, difficulty: 'easy' | 'medium' | 'hard'): NetworkExercise[] => {
  return Array(count).fill(0).map(() => generateNetworkExercise(difficulty));
};
