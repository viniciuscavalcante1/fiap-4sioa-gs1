
import { useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, MapPin, Heart, BookOpen, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock data for latest alerts
const latestAlerts = [
  {
    id: 1,
    title: "Enchentes em Porto Alegre - RS",
    severity: "critical",
    date: "2024-06-05",
    summary: "Chuvas intensas causaram alagamentos em várias regiões da cidade. Abrigos emergenciais foram ativados.",
    location: "Porto Alegre, RS"
  },
  {
    id: 2,
    title: "Queimadas no Pantanal - MT",
    severity: "high",
    date: "2024-06-04",
    summary: "Focos de incêndio detectados na região pantaneira. Equipes de combate ao fogo mobilizadas.",
    location: "Pantanal, MT"
  },
  {
    id: 3,
    title: "Deslizamento em Petrópolis - RJ",
    severity: "medium",
    date: "2024-06-03",
    summary: "Chuvas provocaram deslizamento de terra. Famílias evacuadas preventivamente.",
    location: "Petrópolis, RJ"
  }
];

const Index = () => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-500 text-white";
      case "high": return "bg-orange-500 text-white";
      case "medium": return "bg-yellow-500 text-black";
      default: return "bg-gray-500 text-white";
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
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
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            <span className="text-red-600">SOS</span> Crise
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Plataforma digital para informações críticas, doações e conectar voluntários durante eventos extremos e crises no Brasil.
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
                Mapa de Apoio
              </Link>
            </Button>
          </div>
        </section>

        {/* Latest Alerts */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Alertas Recentes</h2>
            <Button asChild variant="outline">
              <Link to="/alerts">Ver Todos</Link>
            </Button>
          </div>
          <div className="grid gap-4 md:gap-6">
            {latestAlerts.map((alert) => (
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
                  <p className="text-gray-700">{alert.summary}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Access Cards */}
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
                  <p className="text-gray-600">Acompanhe situações de emergência em tempo real</p>
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
                  <p className="text-gray-600">Encontre abrigos, pontos de coleta e hospitais</p>
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

        {/* About Section */}
        <section className="bg-white rounded-lg p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-800">Sobre o SOS Crise</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            O SOS Crise é uma plataforma digital criada para conectar pessoas em situações de emergência 
            com recursos essenciais, informações verificadas e oportunidades de ajuda mútua. Nossa missão 
            é facilitar o acesso a informações críticas e coordenar esforços de solidariedade durante 
            crises e eventos extremos no Brasil.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
