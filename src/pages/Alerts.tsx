
import { useState } from "react";
import { AlertTriangle, Filter, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock alerts data
const alertsData = [
  {
    id: 1,
    title: "Enchentes em Porto Alegre - RS",
    severity: "critical",
    date: "2024-06-05",
    time: "14:30",
    description: "Chuvas intensas nas últimas 24 horas causaram alagamentos em várias regiões da cidade. Níveis dos rios estão acima do normal. Abrigos emergenciais foram ativados nos ginásios municipais. Evite circular pelas áreas baixas da cidade.",
    location: "Porto Alegre, RS",
    source: "Defesa Civil RS",
    recommendations: [
      "Evite áreas alagadas",
      "Procure abrigos se necessário",
      "Mantenha-se informado pelos canais oficiais",
      "Não dirija em ruas alagadas"
    ]
  },
  {
    id: 2,
    title: "Queimadas no Pantanal - MT",
    severity: "high",
    date: "2024-06-04",
    time: "09:15",
    description: "Múltiplos focos de incêndio detectados na região pantaneira. Ventos fortes estão espalhando o fogo rapidamente. Equipes de combate ao fogo foram mobilizadas. Qualidade do ar prejudicada em cidades próximas.",
    location: "Pantanal, MT",
    source: "INPE",
    recommendations: [
      "Evite atividades ao ar livre",
      "Use máscara se necessário sair",
      "Mantenha janelas fechadas",
      "Hidrate-se constantemente"
    ]
  },
  {
    id: 3,
    title: "Deslizamento em Petrópolis - RJ",
    severity: "medium",
    date: "2024-06-03",
    time: "16:45",
    description: "Chuvas provocaram deslizamento de terra na região serrana. 20 famílias foram evacuadas preventivamente. Estradas de acesso à região estão interditadas. Não há feridos reportados até o momento.",
    location: "Petrópolis, RJ",
    source: "Defesa Civil RJ",
    recommendations: [
      "Evite áreas de risco",
      "Procure rotas alternativas",
      "Relate situações suspeitas às autoridades",
      "Mantenha kit de emergência preparado"
    ]
  },
  {
    id: 4,
    title: "Ondas de Calor em São Paulo - SP",
    severity: "medium",
    date: "2024-06-02",
    time: "11:00",
    description: "Temperaturas acima de 35°C previstas para os próximos dias. Aumento na demanda por energia elétrica. Risco de desidratação e problemas de saúde em grupos vulneráveis.",
    location: "São Paulo, SP",
    source: "INMET",
    recommendations: [
      "Beba bastante água",
      "Evite exposição ao sol entre 10h e 16h",
      "Use roupas leves e claras",
      "Procure locais climatizados"
    ]
  },
  {
    id: 5,
    title: "Seca na Região Nordeste",
    severity: "low",
    date: "2024-06-01",
    time: "08:30",
    description: "Período prolongado sem chuvas na região. Reservatórios em níveis baixos. Impacto na agricultura local. Medidas de economia de água foram implementadas.",
    location: "Região Nordeste",
    source: "ANA",
    recommendations: [
      "Economize água",
      "Reutilize água quando possível",
      "Evite desperdícios",
      "Armazene água adequadamente"
    ]
  }
];

const Alerts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [selectedAlert, setSelectedAlert] = useState<number | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-500 text-white";
      case "high": return "bg-orange-500 text-white";
      case "medium": return "bg-yellow-500 text-black";
      case "low": return "bg-blue-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
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
    const matchesSeverity = severityFilter === "all" || alert.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            Alertas de Emergência
          </h1>
          <p className="text-gray-600">
            Acompanhe situações de emergência e alertas em tempo real no Brasil.
          </p>
        </div>

        {/* Filters */}
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

        {/* Alerts List */}
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
                  {alert.location} • {new Date(alert.date).toLocaleDateString('pt-BR')} às {alert.time} • Fonte: {alert.source}
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
        </div>

        {filteredAlerts.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">Nenhum alerta encontrado</h3>
            <p className="text-gray-500">Tente ajustar os filtros de busca.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Alerts;
