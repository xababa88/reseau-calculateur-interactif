
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { AlertCircle, CheckCircle, RefreshCw, Network, Layers } from "lucide-react";
import { generateExerciseSet, NetworkExercise, SubnettingExercise } from '@/utils/exerciseGenerator';
import { isValidIp } from '@/utils/networkUtils';

const PracticeExercises: React.FC = () => {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [networkExercises, setNetworkExercises] = useState<NetworkExercise[]>([]);
  const [subnettingExercises, setSubnettingExercises] = useState<SubnettingExercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exerciseType, setExerciseType] = useState<'network' | 'subnetting'>('network');
  
  const [userNetworkAnswers, setUserNetworkAnswers] = useState<{ 
    networkAddress: string;
    broadcastAddress: string;
    submitted: boolean;
    correct: boolean;
  }>({
    networkAddress: '',
    broadcastAddress: '',
    submitted: false,
    correct: false,
  });
  
  const [userSubnettingAnswers, setUserSubnettingAnswers] = useState<{
    subnets: Array<{
      networkAddress: string;
      broadcastAddress: string;
    }>;
    submitted: boolean;
    correct: boolean;
  }>({
    subnets: [],
    submitted: false,
    correct: false,
  });
  
  const [showHint, setShowHint] = useState(false);
  
  const generateNewExercises = () => {
    if (exerciseType === 'network') {
      const newExercises = generateExerciseSet(5, difficulty, 'network') as NetworkExercise[];
      setNetworkExercises(newExercises);
      setCurrentIndex(0);
      resetUserNetworkAnswers();
    } else {
      const newExercises = generateExerciseSet(3, difficulty, 'subnetting') as SubnettingExercise[];
      setSubnettingExercises(newExercises);
      setCurrentIndex(0);
      resetUserSubnettingAnswers(newExercises[0]?.subnetCount || 2);
    }
    setShowHint(false);
    toast.success(`Exercices générés en difficulté ${difficulty}`);
  };
  
  const resetUserNetworkAnswers = () => {
    setUserNetworkAnswers({
      networkAddress: '',
      broadcastAddress: '',
      submitted: false,
      correct: false,
    });
  };
  
  const resetUserSubnettingAnswers = (subnetCount: number) => {
    setUserSubnettingAnswers({
      subnets: Array(subnetCount).fill(0).map(() => ({
        networkAddress: '',
        broadcastAddress: ''
      })),
      submitted: false,
      correct: false,
    });
  };
  
  const handleDifficultyChange = (value: string) => {
    setDifficulty(value as 'easy' | 'medium' | 'hard');
  };
  
  const handleExerciseTypeChange = (value: string) => {
    setExerciseType(value as 'network' | 'subnetting');
    setCurrentIndex(0);
    setShowHint(false);
  };
  
  const handleNetworkSubmit = () => {
    if (!networkExercises.length) {
      toast.error("Générez d'abord des exercices");
      return;
    }
    
    const currentExercise = networkExercises[currentIndex];
    const isNetworkCorrect = userNetworkAnswers.networkAddress === currentExercise.answer.networkAddress;
    const isBroadcastCorrect = userNetworkAnswers.broadcastAddress === currentExercise.answer.broadcastAddress;
    
    const correct = isNetworkCorrect && isBroadcastCorrect;
    
    setUserNetworkAnswers(prev => ({
      ...prev,
      submitted: true,
      correct,
    }));
    
    if (correct) {
      toast.success("Bravo! Réponse correcte!");
    } else {
      toast.error("Incorrect. Vérifiez vos calculs.");
    }
  };
  
  const handleSubnettingSubmit = () => {
    if (!subnettingExercises.length) {
      toast.error("Générez d'abord des exercices");
      return;
    }
    
    const currentExercise = subnettingExercises[currentIndex];
    let correct = true;
    
    // Check if each subnet answer is correct
    for (let i = 0; i < currentExercise.answer.subnets.length; i++) {
      if (i >= userSubnettingAnswers.subnets.length) {
        correct = false;
        break;
      }
      
      const expectedNetwork = currentExercise.answer.subnets[i].networkAddress;
      const expectedBroadcast = currentExercise.answer.subnets[i].broadcastAddress;
      const userNetwork = userSubnettingAnswers.subnets[i].networkAddress;
      const userBroadcast = userSubnettingAnswers.subnets[i].broadcastAddress;
      
      if (userNetwork !== expectedNetwork || userBroadcast !== expectedBroadcast) {
        correct = false;
      }
    }
    
    setUserSubnettingAnswers(prev => ({
      ...prev,
      submitted: true,
      correct,
    }));
    
    if (correct) {
      toast.success("Bravo! Réponse correcte!");
    } else {
      toast.error("Incorrect. Vérifiez vos calculs.");
    }
  };
  
  const handleNextExercise = () => {
    if (exerciseType === 'network') {
      if (currentIndex < networkExercises.length - 1) {
        setCurrentIndex(prev => prev + 1);
        resetUserNetworkAnswers();
      } else {
        toast.info("C'était le dernier exercice. Générez-en de nouveaux!");
      }
    } else {
      if (currentIndex < subnettingExercises.length - 1) {
        const nextExercise = subnettingExercises[currentIndex + 1];
        setCurrentIndex(prev => prev + 1);
        resetUserSubnettingAnswers(nextExercise.subnetCount);
      } else {
        toast.info("C'était le dernier exercice. Générez-en de nouveaux!");
      }
    }
    setShowHint(false);
  };
  
  const toggleHint = () => {
    setShowHint(prev => !prev);
  };
  
  const handleSubnetInputChange = (index: number, field: 'networkAddress' | 'broadcastAddress', value: string) => {
    setUserSubnettingAnswers(prev => {
      const newSubnets = [...prev.subnets];
      newSubnets[index] = {
        ...newSubnets[index],
        [field]: value
      };
      return {
        ...prev,
        subnets: newSubnets
      };
    });
  };

  // Get current exercise based on type  
  const currentNetworkExercise = networkExercises[currentIndex];
  const currentSubnettingExercise = subnettingExercises[currentIndex];
  
  return (
    <div className="mb-8">
      <Card className="border-network-light">
        <CardHeader className="bg-network-light">
          <CardTitle className="text-network-dark">Exercices Pratiques</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs value={exerciseType} onValueChange={handleExerciseTypeChange} className="mb-6">
            <TabsList>
              <TabsTrigger value="network" className="flex items-center gap-2">
                <Network className="h-4 w-4" /> Calculs Basiques
              </TabsTrigger>
              <TabsTrigger value="subnetting" className="flex items-center gap-2">
                <Layers className="h-4 w-4" /> Découpage en Sous-réseaux
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
            <div className="w-full md:w-1/3">
              <Select value={difficulty} onValueChange={handleDifficultyChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Difficulté" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Facile</SelectItem>
                  <SelectItem value="medium">Moyen</SelectItem>
                  <SelectItem value="hard">Difficile</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={generateNewExercises} 
              className="w-full md:w-auto bg-network hover:bg-network-dark"
            >
              <RefreshCw className="w-4 h-4 mr-2" /> Générer des exercices
            </Button>
          </div>
          
          {exerciseType === 'network' && networkExercises.length > 0 && (
            <div>
              <div className="text-sm text-network-text mb-4">
                Exercice {currentIndex + 1} sur {networkExercises.length}
              </div>
              
              <Card className="bg-gray-50 mb-6">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{currentNetworkExercise.question}</h3>
                  <div className="p-2 bg-white rounded border border-network-light mb-4">
                    <p className="font-mono text-network-dark text-center text-lg">
                      {currentNetworkExercise.ip}/{currentNetworkExercise.cidr}
                    </p>
                  </div>
                  
                  {showHint && (
                    <div className="p-3 bg-network-light rounded-md mb-4">
                      <p className="text-sm text-network-dark">
                        <span className="font-semibold">Indice:</span> Le masque de sous-réseau est {currentNetworkExercise.subnetMask}
                      </p>
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Adresse réseau:</label>
                    <Input
                      value={userNetworkAnswers.networkAddress}
                      onChange={(e) => setUserNetworkAnswers(prev => ({ ...prev, networkAddress: e.target.value }))}
                      placeholder="192.168.1.0"
                      disabled={userNetworkAnswers.submitted}
                      className={`${
                        userNetworkAnswers.submitted 
                          ? userNetworkAnswers.networkAddress === currentNetworkExercise.answer.networkAddress
                            ? 'border-green-500 bg-green-50'
                            : 'border-red-500 bg-red-50'
                          : ''
                      }`}
                    />
                    {userNetworkAnswers.submitted && userNetworkAnswers.networkAddress !== currentNetworkExercise.answer.networkAddress && (
                      <p className="text-red-500 text-xs mt-1">
                        Réponse correcte: {currentNetworkExercise.answer.networkAddress}
                      </p>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Adresse de diffusion:</label>
                    <Input
                      value={userNetworkAnswers.broadcastAddress}
                      onChange={(e) => setUserNetworkAnswers(prev => ({ ...prev, broadcastAddress: e.target.value }))}
                      placeholder="192.168.1.255"
                      disabled={userNetworkAnswers.submitted}
                      className={`${
                        userNetworkAnswers.submitted 
                          ? userNetworkAnswers.broadcastAddress === currentNetworkExercise.answer.broadcastAddress
                            ? 'border-green-500 bg-green-50'
                            : 'border-red-500 bg-red-50'
                          : ''
                      }`}
                    />
                    {userNetworkAnswers.submitted && userNetworkAnswers.broadcastAddress !== currentNetworkExercise.answer.broadcastAddress && (
                      <p className="text-red-500 text-xs mt-1">
                        Réponse correcte: {currentNetworkExercise.answer.broadcastAddress}
                      </p>
                    )}
                  </div>
                  
                  {userNetworkAnswers.submitted && (
                    <div className={`p-3 rounded-md ${userNetworkAnswers.correct ? 'bg-green-100' : 'bg-red-100'}`}>
                      <div className="flex items-center">
                        {userNetworkAnswers.correct ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                        )}
                        <p className={userNetworkAnswers.correct ? 'text-green-700' : 'text-red-700'}>
                          {userNetworkAnswers.correct ? 'Bravo! Réponse correcte!' : 'Incorrect. Revoyez vos calculs.'}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <div className="flex flex-col md:flex-row justify-between gap-3">
                <Button 
                  variant="outline" 
                  onClick={toggleHint}
                  disabled={userNetworkAnswers.submitted || showHint}
                >
                  {showHint ? "Cacher l'indice" : "Afficher un indice"}
                </Button>
                
                <div className="flex gap-3">
                  {!userNetworkAnswers.submitted ? (
                    <Button 
                      onClick={handleNetworkSubmit} 
                      className="bg-network hover:bg-network-dark"
                      disabled={
                        !isValidIp(userNetworkAnswers.networkAddress) || 
                        !isValidIp(userNetworkAnswers.broadcastAddress)
                      }
                    >
                      Vérifier la réponse
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleNextExercise}
                      className="bg-network hover:bg-network-dark"
                    >
                      Exercice suivant
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {exerciseType === 'subnetting' && subnettingExercises.length > 0 && (
            <div>
              <div className="text-sm text-network-text mb-4">
                Exercice {currentIndex + 1} sur {subnettingExercises.length}
              </div>
              
              <Card className="bg-gray-50 mb-6">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{currentSubnettingExercise.question}</h3>
                  <div className="p-2 bg-white rounded border border-network-light mb-4">
                    <p className="font-mono text-network-dark text-center text-lg">
                      Réseau d'origine: {currentSubnettingExercise.answer.networkAddress}/{currentSubnettingExercise.cidr}
                    </p>
                  </div>
                  
                  {showHint && (
                    <div className="p-3 bg-network-light rounded-md mb-4">
                      <p className="text-sm text-network-dark">
                        <span className="font-semibold">Indice:</span> Le nouveau CIDR sera /{currentSubnettingExercise.answer.newCidr}
                      </p>
                    </div>
                  )}
                  
                  <div className="space-y-6">
                    {userSubnettingAnswers.subnets.map((subnet, index) => (
                      <div key={index} className="p-4 border border-network-light rounded-md">
                        <h4 className="font-medium mb-3">Sous-réseau {index + 1}</h4>
                        
                        <div className="mb-3">
                          <label className="block text-sm font-medium mb-1">
                            Adresse réseau:
                          </label>
                          <Input
                            value={subnet.networkAddress}
                            onChange={(e) => handleSubnetInputChange(index, 'networkAddress', e.target.value)}
                            placeholder="192.168.1.0"
                            disabled={userSubnettingAnswers.submitted}
                            className={`${
                              userSubnettingAnswers.submitted
                                ? subnet.networkAddress === currentSubnettingExercise.answer.subnets[index]?.networkAddress
                                  ? 'border-green-500 bg-green-50'
                                  : 'border-red-500 bg-red-50'
                                : ''
                            }`}
                          />
                          {userSubnettingAnswers.submitted && subnet.networkAddress !== currentSubnettingExercise.answer.subnets[index]?.networkAddress && (
                            <p className="text-red-500 text-xs mt-1">
                              Réponse correcte: {currentSubnettingExercise.answer.subnets[index]?.networkAddress}
                            </p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Adresse de diffusion:
                          </label>
                          <Input
                            value={subnet.broadcastAddress}
                            onChange={(e) => handleSubnetInputChange(index, 'broadcastAddress', e.target.value)}
                            placeholder="192.168.1.63"
                            disabled={userSubnettingAnswers.submitted}
                            className={`${
                              userSubnettingAnswers.submitted
                                ? subnet.broadcastAddress === currentSubnettingExercise.answer.subnets[index]?.broadcastAddress
                                  ? 'border-green-500 bg-green-50'
                                  : 'border-red-500 bg-red-50'
                                : ''
                            }`}
                          />
                          {userSubnettingAnswers.submitted && subnet.broadcastAddress !== currentSubnettingExercise.answer.subnets[index]?.broadcastAddress && (
                            <p className="text-red-500 text-xs mt-1">
                              Réponse correcte: {currentSubnettingExercise.answer.subnets[index]?.broadcastAddress}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {userSubnettingAnswers.submitted && (
                    <div className={`p-3 rounded-md mt-4 ${userSubnettingAnswers.correct ? 'bg-green-100' : 'bg-red-100'}`}>
                      <div className="flex items-center">
                        {userSubnettingAnswers.correct ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                        )}
                        <p className={userSubnettingAnswers.correct ? 'text-green-700' : 'text-red-700'}>
                          {userSubnettingAnswers.correct ? 'Bravo! Réponses correctes!' : 'Incorrect. Revoyez vos calculs.'}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <div className="flex flex-col md:flex-row justify-between gap-3">
                <Button 
                  variant="outline" 
                  onClick={toggleHint}
                  disabled={userSubnettingAnswers.submitted || showHint}
                >
                  {showHint ? "Cacher l'indice" : "Afficher un indice"}
                </Button>
                
                <div className="flex gap-3">
                  {!userSubnettingAnswers.submitted ? (
                    <Button 
                      onClick={handleSubnettingSubmit} 
                      className="bg-network hover:bg-network-dark"
                      disabled={
                        userSubnettingAnswers.subnets.some(subnet => 
                          !isValidIp(subnet.networkAddress) || !isValidIp(subnet.broadcastAddress)
                        )
                      }
                    >
                      Vérifier les réponses
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleNextExercise}
                      className="bg-network hover:bg-network-dark"
                    >
                      Exercice suivant
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {((exerciseType === 'network' && networkExercises.length === 0) || 
            (exerciseType === 'subnetting' && subnettingExercises.length === 0)) && (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Aucun exercice généré pour le moment.</p>
              <Button 
                onClick={generateNewExercises} 
                className="bg-network hover:bg-network-dark"
                size="lg"
              >
                <RefreshCw className="w-5 h-5 mr-2" /> Générer des exercices
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-gray-50 text-sm text-gray-500 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div>
              <h4 className="font-medium mb-1">Calculs basiques:</h4>
              <ul className="list-disc list-inside">
                <li>Facile: masques /24 à /28</li>
                <li>Moyen: masques /20 à /27</li>
                <li>Difficile: masques /16 à /30</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-1">Découpage en sous-réseaux:</h4>
              <ul className="list-disc list-inside">
                <li>Facile: 2-4 sous-réseaux</li>
                <li>Moyen: 4-8 sous-réseaux</li>
                <li>Difficile: 8-16 sous-réseaux</li>
              </ul>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PracticeExercises;
