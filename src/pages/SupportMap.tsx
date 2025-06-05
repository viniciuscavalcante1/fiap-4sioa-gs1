
import { useState } from "react";
import { MapPin, Filter, List, Navigation } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock support points data
const supportPoints = [
  {
    id: 1,
    name: "Ginásio Municipal Centro",
    type: "shelter",
    address: "Rua das Flores, 123 - Centro, Porto Alegre/RS",
    phone: "(51) 3333-4444",
    services: ["Abrigo temporário", "Alimentação", "Primeiros socorros"],
    capacity: "200 pessoas",
    status: "available",
    hours: "24h"
  },
  {
    id: 2,
    name: "Hospital Regional Norte",
    type: "hospital",
    address: "Av. Brasil, 456 - Zona Norte, Porto Alegre/RS",
    phone: "(51) 3555-6666",
    services: ["Emergência 24h", "UTI", "Cirurgia"],
    status: "available",
    hours: "24h"
  },
  {
    id: 3,
    name: "Centro de Doações Solidário",
    type: "donation_collection",
    address: "Rua da Esperança, 789 - Bela Vista, Porto Alegre/RS",
    phone: "(51) 3777-8888",
    services: ["Coleta de alimentos", "Roupas", "Material de higiene"],
    neededItems: ["Água potável", "Alimentos não perecíveis", "Cobertores"],
    status: "urgent",
    hours: "8h às 18h"
  },
  {
    id: 4,
    name: "Posto de Distribuição Vila Nova",
    type: "aid_distribution",
    address: "Praça da Comunidade, 321 - Vila Nova, Porto Alegre/RS",
    phone: "(51) 3999-0000",
    services: ["Distribuição de alimentos", "Kit higiene", "Roupas"],
    status: "available",
    hours: "9h às 17h"
  },
  {
    id: 5,
    name: "UBS Centro",
    type: "health_clinic",
    address: "Rua da Saúde, 654 - Centro, Porto Alegre/RS",
    phone: "(51) 3111-2222",
    services: ["Consultas básicas", "Vacinação", "Medicamentos"],
    status: "available",
    hours: "7h às 19h"
  }
];

const SupportMap = () => {
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const getTypeInfo = (type: string) => {
    switch (type) {
      case "shelter":
        return { label: "Abrigo", color: "bg-blue-500 text-white", icon: "🏠" };
      case "hospital":
        return { label: "Hospital", color: "bg-red-500 text-white", icon: "🏥" };
      case "donation_collection":
        return { label: "Coleta de Doações", color: "bg-green-500 text-white", icon: "📦" };
      case "aid_distribution":
        return { label: "Distribuição", color: "bg-purple-500 text-white", icon: "🤝" };
      case "health_clinic":
        return { label: "Posto de Saúde", color: "bg-orange-500 text-white", icon: "🏥" };
      default:
        return { label: "Outro", color: "bg-gray-500 text-white", icon: "📍" };
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "available":
        return { label: "Disponível", color: "bg-green-100 text-green-800" };
      case "urgent":
        return { label: "Urgente", color: "bg-red-100 text-red-800" };
      case "full":
        return { label: "Lotado", color: "bg-yellow-100 text-yellow-800" };
      default:
        return { label: "Indisponível", color: "bg-gray-100 text-gray-800" };
    }
  };

  const filteredPoints = supportPoints.filter(point => {
    const matchesType = typeFilter === "all" || point.type === typeFilter;
    const matchesSearch = point.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         point.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            <MapPin className="w-8 h-8 text-red-600" />
            Mapa de Apoio
          </h1>
          <p className="text-gray-600">
            Encontre abrigos, pontos de coleta, hospitais e locais de distribuição de ajuda.
          </p>
        </div>

        {/* Filters and View Toggle */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar por nome ou endereço..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Tipo de local" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="shelter">Abrigos</SelectItem>
                  <SelectItem value="hospital">Hospitais</SelectItem>
                  <SelectItem value="donation_collection">Coleta de Doações</SelectItem>
                  <SelectItem value="aid_distribution">Distribuição</SelectItem>
                  <SelectItem value="health_clinic">Postos de Saúde</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4 mr-2" />
              Lista
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("map")}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Mapa
            </Button>
          </div>
        </div>

        {viewMode === "map" && (
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6 h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">Mapa Interativo</h3>
              <p className="text-gray-500">Integração com mapas será implementada em breve.</p>
            </div>
          </div>
        )}

        {/* Support Points List */}
        {viewMode === "list" && (
          <div className="space-y-4">
            {filteredPoints.map((point) => {
              const typeInfo = getTypeInfo(point.type);
              const statusInfo = getStatusInfo(point.status);
              
              return (
                <Card key={point.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{typeInfo.icon}</span>
                        <Badge className={typeInfo.color}>{typeInfo.label}</Badge>
                      </div>
                      <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
                    </div>
                    <CardTitle className="text-lg">{point.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {point.address} • {point.hours}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">Serviços oferecidos:</h4>
                        <div className="flex flex-wrap gap-1">
                          {point.services.map((service, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {point.neededItems && (
                        <div>
                          <h4 className="font-medium text-gray-800 mb-1">Itens necessários:</h4>
                          <div className="flex flex-wrap gap-1">
                            {point.neededItems.map((item, index) => (
                              <Badge key={index} variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {point.capacity && (
                        <div>
                          <span className="font-medium text-gray-800">Capacidade: </span>
                          <span className="text-gray-600">{point.capacity}</span>
                        </div>
                      )}
                      
                      <div className="flex flex-col sm:flex-row gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Navigation className="w-4 h-4 mr-2" />
                          Como chegar
                        </Button>
                        {point.phone && (
                          <Button variant="outline" size="sm" className="flex-1">
                            Ligar: {point.phone}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {filteredPoints.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">Nenhum local encontrado</h3>
            <p className="text-gray-500">Tente ajustar os filtros de busca.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SupportMap;
