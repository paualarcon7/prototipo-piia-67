
import { Trophy, Flame, CheckCircle2, Lock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { workDays } from "@/constants/workDays";

const Home = () => {
  const navigate = useNavigate();
  const streak = {
    current: 1,
    best: 1
  };
  const activePrograms = [{
    id: 1,
    name: "Elementia",
    description: "Programa para que alcances tu máximo potencial a través de las metodologías del alto rendimiento",
    progress: 100,
    color: "from-[#02b1bb] to-[#003438]",
    status: "completed"
  }, {
    id: 2,
    name: "Elementia 2",
    description: "Descubre tu poder interior y desarrolla habilidades extraordinarias para el éxito",
    progress: 35,
    color: "from-[#FF4081] to-[#C23A3A]",
    status: "in-progress"
  }, {
    id: 3,
    name: "Elementia 3",
    description: "Transforma tu mentalidad y alcanza nuevos niveles de excelencia personal",
    progress: 0,
    color: "from-[#8E9196] to-[#333333]",
    status: "blocked"
  }];
  const days = [{
    name: "Vie",
    completed: false
  }, {
    name: "Sáb",
    completed: false
  }, {
    name: "Dom",
    completed: false
  }, {
    name: "Lun",
    completed: true
  }, {
    name: "Mar",
    completed: false
  }, {
    name: "Ayer",
    completed: false
  }, {
    name: "Hoy",
    completed: false
  }];

  // Encontrar el día actual de trabajo
  const currentDay = workDays.find(day => day.status === 'current');

  return <div className="container mx-auto px-4 py-4 space-y-4 pb-20">
      <h1 className="text-xl font-bold mb-4">Bienvenido de vuelta</h1>
      
      {/* Current Work Day Card */}
      {currentDay && <Card className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-none text-white mb-6">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">Tu entrenamiento de hoy</h3>
                <p className="text-sm text-gray-300 mb-2">Día {currentDay.day}: {currentDay.title}</p>
                <p className="text-sm text-gray-400">{currentDay.description}</p>
              </div>
            </div>
            <Button onClick={() => navigate(`/programa/2/modulo/1`)} className="w-full text-white bg-[#ff4081]">
              Comenzar actividades del día
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>}
      
      {/* Streak Card */}
      <Card className="bg-[#221F26] border-none text-white">
        <CardContent className="pt-4">
          {/* Days of the week */}
          <div className="flex justify-between items-center mb-6 px-2">
            {days.map((day, index) => <div key={index} className="flex flex-col items-center gap-1.5">
                <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-2 ${day.completed ? 'bg-[#FF4081] border-[#FF4081]' : 'border-gray-600 border-dashed'} flex items-center justify-center`}>
                  {day.completed && <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-white" />}
                </div>
                <span className="text-xs md:text-sm">{day.name}</span>
              </div>)}
          </div>

          {/* Streak Stats */}
          <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center border-t border-gray-700 pt-4 space-y-2 md:space-y-0">
            <div className="flex items-center gap-2">
              <span className="text-sm md:text-xl">Mi racha actual</span>
              <Flame className="h-5 w-5 md:h-6 md:w-6 text-orange-500" />
              <span className="text-sm md:text-xl">x{streak.current}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm md:text-xl">Mi mejor racha</span>
              <Flame className="h-5 w-5 md:h-6 md:w-6 text-yellow-500" />
              <span className="text-sm md:text-xl">x{streak.best}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Programs Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Programas Activos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activePrograms.map(program => <Card key={program.id} className={`overflow-hidden border-none cursor-pointer transition-transform hover:scale-[1.02] ${program.status === 'blocked' ? 'opacity-75' : ''}`} onClick={() => program.status !== 'blocked' && navigate(`/programa/${program.id}`)}>
              <div className={`bg-gradient-to-r ${program.color} p-6 text-white relative`}>
                <CardTitle className="text-xl mb-2 flex items-center gap-2">
                  {program.name}
                  {program.status === 'completed' && <CheckCircle2 className="h-5 w-5 text-white" />}
                  {program.status === 'blocked' && <Lock className="h-5 w-5 text-white" />}
                </CardTitle>
                <CardDescription className="text-white/90 text-sm">
                  {program.description}
                </CardDescription>
              </div>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progreso</span>
                    <span>{program.progress}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className={`bg-gradient-to-r ${program.color} h-2 rounded-full transition-all duration-300`} style={{
                  width: `${program.progress}%`,
                  opacity: program.status === 'blocked' ? '0.5' : '1'
                }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </div>;
};

export default Home;
