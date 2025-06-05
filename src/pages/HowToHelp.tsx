
import { useState } from "react";
import { Heart, DollarSign, Package, Users, Search, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock NGOs data
const ngosData = [
  {
    id: 1,
    name: "Cruz Vermelha Brasileira",
    description: "Organização humanitária que atua em emergências e desastres naturais.",
    focus: "Emergências e desastres",
    website: "https://cruzvermelha.org.br",
    verified: true
  },
  {
    id: 2,
    name: "SOS Mata Atlântica",
    description: "Defesa da Mata Atlântica e conscientização ambiental.",
    focus: "Meio ambiente",
    website: "https://sosma.org.br",
    verified: true
  },
  {
    id: 3,
    name: "ActionAid Brasil",
    description: "Combate à pobreza e promoção da justiça social.",
    focus: "Justiça social",
    website: "https://actionaid.org.br",
    verified: true
  }
];

// Mock supply needs data
const supplyNeeds = [
  {
    id: 1,
    organization: "Centro Comunitário Vila Esperança",
    items: ["Água potável (garrafões)", "Alimentos não perecíveis", "Fraldas descartáveis"],
    urgency: "high",
    location: "Porto Alegre, RS",
    contact: "(51) 3333-4444",
    deliveryInfo: "Aceita doações de segunda a sexta, 8h às 17h"
  },
  {
    id: 2,
    organization: "Abrigo Solidário Centro",
    items: ["Cobertores", "Roupas de inverno", "Produtos de higiene"],
    urgency: "medium",
    location: "São Paulo, SP",
    contact: "(11) 5555-6666",
    deliveryInfo: "Recebe doações diariamente, 24h"
  },
  {
    id: 3,
    organization: "Casa de Apoio São João",
    items: ["Medicamentos básicos", "Máscaras", "Álcool em gel"],
    urgency: "urgent",
    location: "Rio de Janeiro, RJ",
    contact: "(21) 7777-8888",
    deliveryInfo: "Entrega prioritária necessária"
  }
];

// Mock volunteer opportunities data
const volunteerOpportunities = [
  {
    id: 1,
    organization: "Hospital Regional Norte",
    role: "Profissional de Saúde - Enfermagem",
    description: "Auxílio no atendimento a vítimas de enchentes. Experiência em primeiros socorros necessária.",
    requirements: ["Formação em enfermagem", "Experiência mínima 1 ano"],
    location: "Porto Alegre, RS",
    timeCommitment: "Turnos de 6h",
    contact: "voluntarios@hospitalregional.org.br",
    urgent: true
  },
  {
    id: 2,
    organization: "ONG Mãos Solidárias",
    role: "Apoio Psicológico",
    description: "Atendimento psicológico para famílias afetadas por desastres naturais.",
    requirements: ["Formação em psicologia", "CRP ativo"],
    location: "São Paulo, SP",
    timeCommitment: "4h por semana",
    contact: "psicologia@maossolidarias.org",
    urgent: false
  },
  {
    id: 3,
    organization: "Centro de Distribuição Solidário",
    role: "Logística e Organização",
    description: "Triagem, organização e distribuição de doações recebidas.",
    requirements: ["Disponibilidade", "Trabalho em equipe"],
    location: "Rio de Janeiro, RJ",
    timeCommitment: "Flexível",
    contact: "(21) 9999-0000",
    urgent: false
  }
];

const HowToHelp = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "urgent": return "bg-red-500 text-white";
      case "high": return "bg-orange-500 text-white";
      case "medium": return "bg-yellow-500 text-black";
      default: return "bg-green-500 text-white";
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            <Heart className="w-8 h-8 text-red-600" />
            Como Ajudar
          </h1>
          <p className="text-gray-600">
            Sua solidariedade pode fazer a diferença. Escolha como contribuir com as vítimas de emergências.
          </p>
        </div>

        <Tabs defaultValue="donations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="donations" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Doações Monetárias
            </TabsTrigger>
            <TabsTrigger value="supplies" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Doação de Suprimentos
            </TabsTrigger>
            <TabsTrigger value="volunteer" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Voluntariado
            </TabsTrigger>
          </TabsList>

          {/* Monetary Donations */}
          <TabsContent value="donations" className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Doações Monetárias</h2>
              <p className="text-gray-600 mb-6">
                As doações em dinheiro são extremamente eficazes pois permitem que as organizações 
                comprem exatamente o que é necessário no momento e local adequados.
              </p>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {ngosData.map((ngo) => (
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
                      <Button className="w-full bg-red-600 hover:bg-red-700">
                        Doar Agora
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Supply Donations */}
          <TabsContent value="supplies" className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Doação de Suprimentos</h2>
              <p className="text-gray-600 mb-4">
                Conecte-se diretamente com organizações que precisam de itens específicos.
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

            <div className="space-y-4">
              {filteredSupplies.map((supply) => (
                <Card key={supply.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg">{supply.organization}</CardTitle>
                      <Badge className={getUrgencyColor(supply.urgency)}>
                        {getUrgencyText(supply.urgency)}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm text-gray-500 flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {supply.location}
                      </span>
                      <span>{supply.contact}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Itens necessários:</h4>
                        <div className="flex flex-wrap gap-1">
                          {supply.items.map((item, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{supply.deliveryInfo}</span>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        Entrar em Contato
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Volunteer */}
          <TabsContent value="volunteer" className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Oportunidades de Voluntariado</h2>
              <p className="text-gray-600 mb-4">
                Doe seu tempo e habilidades para ajudar diretamente as comunidades afetadas.
              </p>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por área de atuação, organização ou localização..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-4">
              {filteredVolunteers.map((opportunity) => (
                <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg">{opportunity.role}</CardTitle>
                      {opportunity.urgent && (
                        <Badge className="bg-red-500 text-white">
                          URGENTE
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-sm text-gray-500">
                      {opportunity.organization} • {opportunity.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-gray-700 text-sm">{opportunity.description}</p>
                      
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">Requisitos:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {opportunity.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {opportunity.timeCommitment}
                        </span>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        Candidatar-se: {opportunity.contact}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default HowToHelp;
