
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { toast } from 'sonner';
import { AlertCircle, CheckCircle, RefreshCw } from "lucide-react";
import { generateExerciseSet } from '@/utils/exerciseGenerator';
import { isValidIp } from '@/utils/networkUtils';

interface Exercise {
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

const PracticeExercises: React.FC = () => {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ 
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
  const [showHint, setShowHint] = useState(false);
  
  const generateNewExercises = () => {
    const newExercises = generateExerciseSet(5, difficulty);
    setExercises(newExercises);
    setCurrentIndex(0);
    resetUserAnswers();
    setShowHint(false);
    toast.success(`${newExercises.length} exercices générés en difficulté ${difficulty}`);
  };
  
  const resetUserAnswers = () => {
    setUserAnswers({
      networkAddress: '',
      broadcastAddress: '',
      submitted: false,
      correct: false,
    });
  };
  
  const handleDifficultyChange = (value: string) => {
    setDifficulty(value as 'easy' | 'medium' | 'hard');
  };
  
  const handleSubmit = () => {
    if (!exercises.length) {
      toast.error("Générez d'abord des exercices");
      return;
    }
    
    const currentExercise = exercises[currentIndex];
    const isNetworkCorrect = userAnswers.networkAddress === currentExercise.answer.networkAddress;
    const isBroadcastCorrect = userAnswers.broadcastAddress === currentExercise.answer.broadcastAddress;
    
    const correct = isNetworkCorrect && isBroadcastCorrect;
    
    setUserAnswers(prev => ({
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
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
      resetUserAnswers();
      setShowHint(false);
    } else {
      toast.info("C'était le dernier exercice. Générez-en de nouveaux!");
    }
  };
  
  const toggleHint = () => {
    setShowHint(prev => !prev);
  };
  
  const currentExercise = exercises[currentIndex];
  
  return (
    <div className="mb-8">
      <Card className="border-network-light">
        <CardHeader className="bg-network-light">
          <CardTitle className="text-network-dark">Exercices Pratiques</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
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
          
          {exercises.length > 0 ? (
            <div>
              <div className="text-sm text-network-text mb-4">
                Exercice {currentIndex + 1} sur {exercises.length}
              </div>
              
              <Card className="bg-gray-50 mb-6">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{currentExercise.question}</h3>
                  <div className="p-2 bg-white rounded border border-network-light mb-4">
                    <p className="font-mono text-network-dark text-center text-lg">
                      {currentExercise.ip}/{currentExercise.cidr}
                    </p>
                  </div>
                  
                  {showHint && (
                    <div className="p-3 bg-network-light rounded-md mb-4">
                      <p className="text-sm text-network-dark">
                        <span className="font-semibold">Indice:</span> Le masque de sous-réseau est {currentExercise.subnetMask}
                      </p>
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Adresse réseau:</label>
                    <Input
                      value={userAnswers.networkAddress}
                      onChange={(e) => setUserAnswers(prev => ({ ...prev, networkAddress: e.target.value }))}
                      placeholder="192.168.1.0"
                      disabled={userAnswers.submitted}
                      className={`${
                        userAnswers.submitted 
                          ? userAnswers.networkAddress === currentExercise.answer.networkAddress
                            ? 'border-green-500 bg-green-50'
                            : 'border-red-500 bg-red-50'
                          : ''
                      }`}
                    />
                    {userAnswers.submitted && userAnswers.networkAddress !== currentExercise.answer.networkAddress && (
                      <p className="text-red-500 text-xs mt-1">
                        Réponse correcte: {currentExercise.answer.networkAddress}
                      </p>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Adresse de diffusion:</label>
                    <Input
                      value={userAnswers.broadcastAddress}
                      onChange={(e) => setUserAnswers(prev => ({ ...prev, broadcastAddress: e.target.value }))}
                      placeholder="192.168.1.255"
                      disabled={userAnswers.submitted}
                      className={`${
                        userAnswers.submitted 
                          ? userAnswers.broadcastAddress === currentExercise.answer.broadcastAddress
                            ? 'border-green-500 bg-green-50'
                            : 'border-red-500 bg-red-50'
                          : ''
                      }`}
                    />
                    {userAnswers.submitted && userAnswers.broadcastAddress !== currentExercise.answer.broadcastAddress && (
                      <p className="text-red-500 text-xs mt-1">
                        Réponse correcte: {currentExercise.answer.broadcastAddress}
                      </p>
                    )}
                  </div>
                  
                  {userAnswers.submitted && (
                    <div className={`p-3 rounded-md ${userAnswers.correct ? 'bg-green-100' : 'bg-red-100'}`}>
                      <div className="flex items-center">
                        {userAnswers.correct ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                        )}
                        <p className={userAnswers.correct ? 'text-green-700' : 'text-red-700'}>
                          {userAnswers.correct ? 'Bravo! Réponse correcte!' : 'Incorrect. Revoyez vos calculs.'}
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
                  disabled={userAnswers.submitted || showHint}
                >
                  {showHint ? "Cacher l'indice" : "Afficher un indice"}
                </Button>
                
                <div className="flex gap-3">
                  {!userAnswers.submitted ? (
                    <Button 
                      onClick={handleSubmit} 
                      className="bg-network hover:bg-network-dark"
                      disabled={
                        !isValidIp(userAnswers.networkAddress) || 
                        !isValidIp(userAnswers.broadcastAddress)
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
          ) : (
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
          <ul className="list-disc list-inside">
            <li>Facile: masques /24 à /28</li>
            <li>Moyen: masques /20 à /27</li>
            <li>Difficile: masques /16 à /30</li>
          </ul>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PracticeExercises;
