import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, MapPin, Heart, BookOpen, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";

// Interface dos dados de Alerts
interface Alert {
  id: number;
  title: string;
  severity: string;
  date: string;
  summary?: string;
  description: string;
  location: string;
}

// Função para buscar os alertas do banco
const fetchAlerts = async (): Promise<Alert[]> => {
  const response = await fetch("http://127.0.0.1:8000/api/alerts");
  if (!response.ok) {
    throw new Error("Erro ao buscar os alertas da API");
  }
  return response.json();
};


const Index = () => {
  const { data: allAlerts = [], isLoading, isError } = useQuery<Alert[]>({
    queryKey: ["alerts"],
    queryFn: fetchAlerts,
  });

  // Apenas os três primeiros alertas são exibidos na home
  const latestAlerts = allAlerts.slice(0, 3);

  // Cores para o grau de alerta
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical": case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical": return "CRÍTICO";
      case "high": return "ALTO";
      case "medium": return "MÉDIO";
      default: return "BAIXO";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          {/* Logo */}
          <img
            src="/logo_bigger.png"
            alt="Logo SOS Crise"
            className="h-80 md:h-80 w-auto mx-auto mb-4"
          />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Conectando pessoas em situações de emergência com recursos essenciais e oportunidades de ajuda mútua no Brasil. Junte-se à Resistência!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
              <Link to="/alerts">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Ver Alertas
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/support-map">
                <MapPin className="w-5 h-5 mr-2" />
                Ver Mapa de Apoio
              </Link>
            </Button>
          </div>
        </section>

        {/* Alertas Recentes */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Alertas Recentes</h2>
            <Button asChild variant="outline">
              <Link to="/alerts">Ver Todos</Link>
            </Button>
          </div>
          <div className="grid gap-4 md:gap-6">
            {isLoading && (
              [...Array(3)].map((_, i) => (
                <Card key={i} className="border-l-4 border-l-gray-300">
                  <CardHeader><Skeleton className="h-5 w-3/4" /></CardHeader>
                  <CardContent><Skeleton className="h-10 w-full" /></CardContent>
                </Card>
              ))
            )}

            {isError && (
              <p className="text-red-600">Não foi possível carregar os alertas recentes.</p>
            )}

            {!isLoading && !isError && latestAlerts.map((alert) => (
              <Card key={alert.id} className="border-l-4 border-l-red-600 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <CardTitle className="text-lg">{alert.title}</CardTitle>
                    </div>
                    <Badge className={getSeverityColor(alert.severity)}>
                      {getSeverityText(alert.severity)}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm text-gray-500">
                    {alert.location} • {new Date(alert.date).toLocaleDateString('pt-BR')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{alert.description.substring(0, 150)}...</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Como Podemos Ajudar */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Como Podemos Ajudar</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
             <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <Link to="/alerts">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <CardTitle className="text-lg">Alertas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Acompanhe alertas emergentes e aja rápido</p>
                </CardContent>
              </Link>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <Link to="/support-map">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">Mapa de Apoio</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Encontre abrigos, hospitais e pontos de coleta</p>
                </CardContent>
              </Link>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <Link to="/how-to-help">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">Como Ajudar</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Doe, seja voluntário ou ofereça suprimentos</p>
                </CardContent>
              </Link>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <Link to="/preparedness">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">Guias de Preparo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Aprenda como se preparar para emergências</p>
                </CardContent>
              </Link>
            </Card>
          </div>
        </section>

        {/* Sobre */}
        <section className="bg-white rounded-lg p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-800">Sobre o SOS Crise</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            O SOS Crise é uma plataforma digital criada para conectar pessoas em eventos extremos,
            com recursos essenciais, informações verificadas e oportunidades de ajuda mútua. Nossa missão 
            é facilitar o acesso a informações críticas e coordenar esforços de solidariedade durante 
            crises no Brasil!
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;