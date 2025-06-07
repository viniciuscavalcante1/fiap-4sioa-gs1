import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MapPin, Filter, List, Navigation } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";

interface SupportPoint {
  id: number;
  name: string;
  type: string;
  address: string;
  phone?: string;
  services: string[];
  capacity?: string;
  status: string;
  hours: string;
  needed_items?: string[];
  latitude?: number;
  longitude?: number;
}

const fetchSupportPoints = async (): Promise<SupportPoint[]> => {
  const response = await fetch("http://127.0.0.1:8000/api/support-points");
  if (!response.ok) {
    throw new Error("Erro ao buscar os pontos de apoio da API");
  }
  return response.json();
};

const SupportMap = () => {
  const { data: supportPoints = [], isLoading, isError } = useQuery<SupportPoint[]>({
    queryKey: ["supportPoints"],
    queryFn: fetchSupportPoints,
  });

  const [typeFilter, setTypeFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "map">("map");

  const getTypeInfo = (type: string) => {
    switch (type) {
      case "shelter":
        return { label: "Abrigo", color: "bg-blue-100 text-blue-800", icon: "🏠" };
      case "hospital":
        return { label: "Hospital", color: "bg-red-100 text-red-800", icon: "🏥" };
      case "donation_collection":
        return { label: "Coleta de Doações", color: "bg-green-100 text-green-800", icon: "📦" };
      case "aid_distribution":
        return { label: "Distribuição", color: "bg-purple-100 text-purple-800", icon: "🤝" };
      case "health_clinic":
        return { label: "Posto de Saúde", color: "bg-orange-100 text-orange-800", icon: "🏥" };
      default:
        return { label: "Outro", color: "bg-gray-100 text-gray-800", icon: "📍" };
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            <MapPin className="w-8 h-8 text-red-600" />
            Mapa de Apoio
          </h1>
          <p className="text-gray-600">
            Ajude. E seja ajudado. Encontre abrigos, pontos de coleta e hospitais.
          </p>
        </div>

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
              Ver na Lista
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("map")}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Ver no Mapa
            </Button>
          </div>
        </div>

        {isLoading && (
          <div className="text-center py-12">
            <p>Carregando mapa e pontos de apoio...</p>
            <Skeleton className="h-96 w-full mt-4" />
          </div>
        )}

        {isError && (
          <div className="text-center py-12 bg-red-50 text-red-700 rounded-lg">
            <MapPin className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Erro ao carregar os dados</h3>
            <p>Não foi possível buscar os pontos de apoio. Tente novamente mais tarde.</p>
          </div>
        )}

        {!isLoading && !isError && viewMode === "map" && (
          <div className="bg-white rounded-lg p-1 shadow-sm mb-6 h-[500px]">
            <MapContainer center={[-23.5505, -46.6333]} zoom={11} scrollWheelZoom={true} style={{ height: "100%", width: "100%", borderRadius: "inherit" }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filteredPoints.map(point => (
                point.latitude && point.longitude && (
                  <Marker key={point.id} position={[point.latitude, point.longitude]}>
                    <Popup>
                      <div className="space-y-1">
                        <p className="font-bold">{point.name}</p>
                        <p className="text-sm">{point.address}</p>
                        <div className="flex gap-2 pt-1">
                          <Badge className={getTypeInfo(point.type).color}>{getTypeInfo(point.type).label}</Badge>
                          <Badge className={getStatusInfo(point.status).color}>{getStatusInfo(point.status).label}</Badge>
                        </div>
                        <p className="text-sm pt-1">Horário: {point.hours}</p>
                      </div>
                    </Popup>
                  </Marker>
                )
              ))}
            </MapContainer>
          </div>
        )}

        {!isLoading && !isError && viewMode === "list" && (
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
                      
                      {point.needed_items && point.needed_items.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-800 mb-1">Estão precisando de:</h4>
                          <div className="flex flex-wrap gap-1">
                            {point.needed_items.map((item, index) => (
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
                        <Button asChild variant="outline" size="sm" className="flex-1">
                          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(point.address)}`} target="_blank" rel="noopener noreferrer">
                            <Navigation className="w-4 h-4 mr-2" />
                            Como chegar
                          </a>
                        </Button>
                        {point.phone && (
                          <Button asChild variant="outline" size="sm" className="flex-1">
                            <a href={`tel:${point.phone}`}>
                              Ligar: {point.phone}
                            </a>
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

        {!isLoading && !isError && filteredPoints.length === 0 && (
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