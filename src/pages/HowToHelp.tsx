import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Heart, DollarSign, Package, Users, Search, Clock, MapPin, AlertCircle, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";

interface Ngo {
  id: number;
  name: string;
  description: string;
  focus: string;
  website: string;
  verified: boolean;
}

interface SupplyNeed {
  id: number;
  organization: string;
  items: string[];
  urgency: string;
  location: string;
  contact: string;
  delivery_info: string;
}

interface VolunteerOpportunity {
  id: number;
  organization: string;
  role: string;
  description: string;
  requirements: string[];
  location: string;
  time_commitment: string;
  contact: string;
  urgent: boolean;
}

const fetchNgos = async (): Promise<Ngo[]> => {
  const res = await fetch("http://127.0.0.1:8000/api/organizations");
  if (!res.ok) throw new Error("Erro ao buscar ONGs");
  return res.json();
};

const fetchSupplyNeeds = async (): Promise<SupplyNeed[]> => {
  const res = await fetch("http://127.0.0.1:8000/api/supply-needs");
  if (!res.ok) throw new Error("Erro ao buscar necessidades de suprimentos");
  return res.json();
};

const fetchVolunteerOpportunities = async (): Promise<VolunteerOpportunity[]> => {
  const res = await fetch("http://127.0.0.1:8000/api/volunteer-opportunities");
  if (!res.ok) throw new Error("Erro ao buscar vagas de voluntariado");
  return res.json();
};


const HowToHelp = () => {
  const { data: ngosData = [], isLoading: isLoadingNgos, isError: isErrorNgos } = useQuery<Ngo[]>({
    queryKey: ['ngos'],
    queryFn: fetchNgos,
  });

  const { data: supplyNeeds = [], isLoading: isLoadingSupplies, isError: isErrorSupplies } = useQuery<SupplyNeed[]>({
    queryKey: ['supplyNeeds'],
    queryFn: fetchSupplyNeeds,
  });

  const { data: volunteerOpportunities = [], isLoading: isLoadingVolunteers, isError: isErrorVolunteers } = useQuery<VolunteerOpportunity[]>({
    queryKey: ['volunteerOpportunities'],
    queryFn: fetchVolunteerOpportunities,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "urgent": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      default: return "bg-green-100 text-green-800";
    }
  };

  const getUrgencyText = (urgency: string) => {
    switch (urgency) {
      case "urgent": return "URGENTE";
      case "high": return "ALTA";
      case "medium": return "MÉDIA";
      default: return "BAIXA";
    }
  };

  const filteredSupplies = supplyNeeds.filter(supply =>
    supply.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supply.items.some(item => item.toLowerCase().includes(searchTerm.toLowerCase())) ||
    supply.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredVolunteers = volunteerOpportunities.filter(opportunity =>
    opportunity.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opportunity.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opportunity.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            <Heart className="w-8 h-8 text-red-600" />
            Como Ajudar
          </h1>
          <p className="text-gray-600">
            Sua solidariedade pode fazer a diferença. Escolha como contribuir com quem precisa de ajuda.
          </p>
        </div>

        <Tabs defaultValue="donations" className="space-y-6" onValueChange={() => setSearchTerm("")}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="donations" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Quero doar para instituições
            </TabsTrigger>
            <TabsTrigger value="supplies" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Quero doar suprimentos
            </TabsTrigger>
            <TabsTrigger value="volunteer" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Quero ser voluntário
            </TabsTrigger>
          </TabsList>

          {/* Aba de Doações Monetárias */}
          <TabsContent value="donations" className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Doe para instituições</h2>
              <p className="text-gray-600 mb-6">
                As doações em dinheiro são muito eficazes pois permitem que as organizações
                comprem exatamente o que é necessário no momento e local adequados. Todas elas são confiáveis e foram verificadas pela nossa equipe. 100% do dinheiro irá para uma causa nobre. Ajude o país.
              </p>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {isLoadingNgos && [...Array(3)].map((_, i) => <Skeleton key={i} className="h-56 w-full" />)}
                {isErrorNgos && <p className="col-span-3 text-center text-red-600">Erro ao carregar as ONGs.</p>}
                {!isLoadingNgos && !isErrorNgos && ngosData.map((ngo) => (
                  <Card key={ngo.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-lg">{ngo.name}</CardTitle>
                        {ngo.verified && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            ✓ Verificado
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="text-sm text-gray-500">
                        {ngo.focus}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 text-sm mb-4">{ngo.description}</p>
                      <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                        <a href={ngo.website} target="_blank" rel="noopener noreferrer">
                          Doar Agora
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Aba de Doação de Suprimentos */}
          <TabsContent value="supplies" className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Doe Suprimentos</h2>
              <p className="text-gray-600 mb-4">
                Encontre organizações e pontos de coleta que precisam de suprimentos. Você pode ajudar. Até com as menores coisas.
              </p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por organização, item ou localização..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            {isLoadingSupplies && <div className="space-y-4">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-48 w-full" />)}</div>}
            {isErrorSupplies && <div className="text-center py-12 bg-red-50 text-red-700 rounded-lg"><AlertCircle className="w-12 h-12 mx-auto mb-4" /><h3 className="text-lg font-medium">Erro ao carregar necessidades</h3><p>Tente novamente mais tarde.</p></div>}
            {!isLoadingSupplies && !isErrorSupplies && <div className="space-y-4">
              {filteredSupplies.map((supply) => (
                <Card key={supply.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg">{supply.organization}</CardTitle>
                      <Badge className={getUrgencyColor(supply.urgency)}>{getUrgencyText(supply.urgency)}</Badge>
                    </div>
                    <CardDescription className="text-sm text-gray-500 flex items-center gap-4">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{supply.location}</span>
                      <span>{supply.contact}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Precisam destes itens:</h4>
                        <div className="flex flex-wrap gap-1">
                          {supply.items.map((item, index) => (<Badge key={index} variant="outline" className="text-xs">{item}</Badge>))}
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-gray-600"><Clock className="w-4 h-4 mt-0.5 flex-shrink-0" /><span>{supply.delivery_info}</span></div>
                      <Button asChild variant="outline" className="w-full"><a href={`tel:${supply.contact}`}>Entrar em Contato</a></Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filteredSupplies.length === 0 && <div className="text-center py-12"><Package className="w-12 h-12 text-gray-400 mx-auto mb-4" /><h3 className="text-lg font-medium text-gray-600">Nenhuma necessidade encontrada</h3><p className="text-gray-500">Tente ajustar os termos de busca.</p></div>}
            </div>}
          </TabsContent>

          {/* Aba de Voluntariado */}
          <TabsContent value="volunteer" className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Seja Voluntário</h2>
              <p className="text-gray-600 mb-4">Ofereça seu tempo e suas habilidades para ajudar diretamente. Você é gigante.</p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por função, organização ou localização..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            {isLoadingVolunteers && <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-64 w-full" />)}</div>}
            {isErrorVolunteers && <div className="text-center py-12 bg-red-50 text-red-700 rounded-lg"><AlertCircle className="w-12 h-12 mx-auto mb-4" /><h3 className="text-lg font-medium">Erro ao carregar vagas</h3><p>Tente novamente mais tarde.</p></div>}
            {!isLoadingVolunteers && !isErrorVolunteers && <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredVolunteers.map((opportunity) => (
                <Card key={opportunity.id} className="hover:shadow-lg transition-shadow flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg leading-tight">{opportunity.role}</CardTitle>
                      {opportunity.urgent && <Badge className="bg-red-100 text-red-800">URGENTE</Badge>}
                    </div>
                    <CardDescription className="text-sm text-gray-500">{opportunity.organization}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 flex-1 flex flex-col">
                    <p className="text-gray-700 text-sm flex-1">{opportunity.description}</p>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1 text-sm">Requisitos:</h4>
                      <div className="flex flex-wrap gap-1">{opportunity.requirements.map((req, index) => (<Badge key={index} variant="outline" className="text-xs">{req}</Badge>))}</div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 pt-2">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{opportunity.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{opportunity.time_commitment}</span>
                    </div>
                    <Button asChild variant="outline" className="w-full mt-4">
                      <a href={opportunity.contact.includes('@') ? `mailto:${opportunity.contact}` : `tel:${opportunity.contact}`}>
                        <Mail className="w-4 h-4 mr-2" />Candidatar-se
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
              {filteredVolunteers.length === 0 && <div className="text-center py-12 col-span-1 md:col-span-2 lg:col-span-3"><Users className="w-12 h-12 text-gray-400 mx-auto mb-4" /><h3 className="text-lg font-medium text-gray-600">Nenhuma vaga encontrada</h3><p className="text-gray-500">Tente ajustar os termos de busca.</p></div>}
            </div>}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default HowToHelp;