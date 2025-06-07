import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, Filter, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";

interface Alert {
  id: number;
  title: string;
  severity: string;
  date: string;
  time: string;
  description: string;
  location: string;
  source: string;
  recommendations: string[];
}

const fetchAlerts = async (): Promise<Alert[]> => {
  const response = await fetch("http://127.0.0.1:8000/api/alerts");
  if (!response.ok) {
    throw new Error("Erro ao buscar os alertas da API");
  }
  return response.json();
};

const Alerts = () => {
  const { data: alertsData = [], isLoading, isError } = useQuery<Alert[]>({
    queryKey: ["alerts"],
    queryFn: fetchAlerts,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [selectedAlert, setSelectedAlert] = useState<number | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical": case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical": return "CRÍTICO";
      case "high": return "ALTO";
      case "medium": return "MÉDIO";
      case "low": return "BAIXO";
      default: return "BAIXO";
    }
  };

  const filteredAlerts = alertsData.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          alert.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === "all" || alert.severity.toLowerCase() === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-grow"> {/* E AQUI */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            Alertas
          </h1>
          <p className="text-gray-600">
            Acompanhe situações de emergência e alertas no Brasil.
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por localização ou tipo de alerta..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filtrar por severidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os níveis</SelectItem>
                  <SelectItem value="critical">Crítico</SelectItem>
                  <SelectItem value="high">Alto</SelectItem>
                  <SelectItem value="medium">Médio</SelectItem>
                  <SelectItem value="low">Baixo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardHeader><Skeleton className="h-5 w-3/4" /></CardHeader>
                <CardContent><Skeleton className="h-10 w-full" /></CardContent>
              </Card>
            ))}
          </div>
        )}

        {isError && (
          <div className="text-center py-12 bg-red-50 text-red-700 rounded-lg">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Erro ao carregar os dados</h3>
            <p>Não foi possível buscar os alertas. Tente novamente mais tarde.</p>
          </div>
        )}

        {/* Lista de alertas */}
        {!isLoading && !isError && (
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
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
                    {alert.location} • {new Date(alert.date).toLocaleDateString('pt-BR')} às {alert.time.substring(0,5)} • Fonte: {alert.source}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{alert.description}</p>

                  {selectedAlert === alert.id && (
                    <div className="border-t pt-4 mt-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Recomendações:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {alert.recommendations.map((recommendation, index) => (
                          <li key={index} className="text-gray-700 text-sm">{recommendation}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedAlert(selectedAlert === alert.id ? null : alert.id)}
                    className="mt-4"
                  >
                    {selectedAlert === alert.id ? "Ocultar detalhes" : "Ver detalhes"}
                  </Button>
                </CardContent>
              </Card>
            ))}

            {filteredAlerts.length === 0 && (
              <div className="text-center py-12">
                <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">Nenhum alerta encontrado</h3>
                <p className="text-gray-500">Tente ajustar os filtros de busca.</p>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Alerts;