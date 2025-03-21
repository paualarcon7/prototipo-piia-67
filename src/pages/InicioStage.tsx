
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Mic,
  Lock,
  CheckCircle
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const InicioStage = () => {
  const { id, moduleId } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoWatched, setVideoWatched] = useState(false);
  const [audioCompleted, setAudioCompleted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const progressInterval = useRef<number>();

  const simulateAudioProgress = () => {
    if (!videoWatched) return;
    
    setIsPlaying(true);
    let currentProgress = 0;
    progressInterval.current = window.setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);
      if (currentProgress >= 20) {
        clearInterval(progressInterval.current);
        setIsPlaying(false);
        setAudioCompleted(true);
      }
    }, 1000);
  };

  const handlePlayPause = () => {
    if (!videoWatched) return;

    if (isPlaying) {
      clearInterval(progressInterval.current);
      setIsPlaying(false);
    } else {
      simulateAudioProgress();
    }
  };

  const handleVideoLoad = () => {
    // Simular que el video ha sido visto
    setTimeout(() => {
      setVideoWatched(true);
    }, 2000);
  };

  const handleFinishRecording = () => {
    setIsDialogOpen(false);
    navigate(`/programa/${id}/modulo/${moduleId}`);
  };

  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-6 pb-32">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate(`/programa/${id}/modulo/${moduleId}`)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver al módulo
      </Button>

      <div className="bg-secondary/50 backdrop-blur-sm rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">ALMA - PARTE 1: ACTIVA TU ENERGÍA Y DETECTA TU FLUJO</h1>
        <p className="text-gray-300 mb-6">
          En esta primera etapa, exploraremos el concepto del estado de flujo y cómo 
          identificarlo en tu vida diaria. Comienza observando el siguiente video y 
          reflexiona sobre cómo este concepto se aplica a tu experiencia personal.
        </p>

        <div className="space-y-6">
          <div className="bg-secondary/70 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Video Introductorio</h2>
            <div className="aspect-video w-full mb-4">
              <iframe
                className="w-full h-full rounded-lg"
                src="https://www.instagram.com/p/C8S20NUNJRP/embed"
                allowFullScreen
                onLoad={handleVideoLoad}
              ></iframe>
            </div>
          </div>

          <div className={`bg-secondary/70 p-6 rounded-lg relative ${!videoWatched ? 'opacity-50' : ''}`}>
            <h2 className="text-lg font-semibold mb-4">Audio Complementario</h2>
            {!videoWatched && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  <span>Completa el video para desbloquear</span>
                </div>
              </div>
            )}
            <div className="flex flex-col items-center gap-4">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full transition-all"
                  style={{ width: `${(progress / 20) * 100}%` }}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePlayPause}
                  disabled={!videoWatched}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                <span className="text-sm text-gray-400">
                  {progress}s / 20s
                </span>
              </div>
            </div>
          </div>

          {videoWatched && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <Mic className="mr-2 h-4 w-4" />
                  Grabar mi reflexión
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Grabar Reflexión</DialogTitle>
                  <DialogDescription>
                    ¿Cómo le explicarías a tu mejor amigo qué es el estado de FLOW?
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center gap-6 p-6">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full w-16 h-16"
                  >
                    <Mic className="h-8 w-8" />
                  </Button>
                  <Button 
                    className="w-full" 
                    onClick={handleFinishRecording}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Finalizar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
};

export default InicioStage;
