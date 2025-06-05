
import { useState } from "react";
import { BookOpen, ChevronRight, Download, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock guides data
const guidesData = [
  {
    id: 1,
    title: "Kit de Emergência Familiar",
    category: "Preparação",
    difficulty: "Básico",
    estimatedTime: "30 minutos",
    description: "Lista completa de itens essenciais para manter sua família segura durante emergências.",
    content: {
      introduction: "Um kit de emergência bem preparado pode salvar vidas. Este guia ajuda você a montar um kit completo para sua família.",
      sections: [
        {
          title: "Água e Alimentação",
          items: [
            "4 litros de água por pessoa para 3 dias",
            "Alimentos não perecíveis para 3 dias por pessoa",
            "Abridores de lata manuais",
            "Utensílios descartáveis"
          ]
        },
        {
          title: "Medicamentos e Primeiros Socorros",
          items: [
            "Kit de primeiros socorros completo",
            "Medicamentos de uso contínuo (7 dias)",
            "Analgésicos e antitérmicos",
            "Termômetro digital"
          ]
        },
        {
          title: "Documentos e Comunicação",
          items: [
            "Cópias de documentos importantes em saco plástico",
            "Rádio portátil a pilha",
            "Lanterna com pilhas extras",
            "Carregador portátil para celular"
          ]
        },
        {
          title: "Roupas e Higiene",
          items: [
            "Roupas extras para cada membro da família",
            "Cobertores ou sacos de dormir",
            "Produtos de higiene pessoal",
            "Papel higiênico e toalhas"
          ]
        }
      ]
    }
  },
  {
    id: 2,
    title: "Segurança Durante Enchentes",
    category: "Emergência",
    difficulty: "Intermediário",
    estimatedTime: "15 minutos",
    description: "Procedimentos de segurança antes, durante e após enchentes.",
    content: {
      introduction: "Enchentes são uma das emergências mais comuns no Brasil. Saber como agir pode proteger você e sua família.",
      sections: [
        {
          title: "Antes da Enchente",
          items: [
            "Monitore alertas meteorológicos",
            "Identifique rotas de evacuação",
            "Tenha o kit de emergência preparado",
            "Proteja documentos importantes"
          ]
        },
        {
          title: "Durante a Enchente",
          items: [
            "Desligue energia elétrica e gás",
            "Vá para locais altos da casa",
            "Não dirija em áreas alagadas",
            "Mantenha-se informado pelo rádio"
          ]
        },
        {
          title: "Após a Enchente",
          items: [
            "Aguarde autorização para retornar",
            "Cuidado com energia elétrica molhada",
            "Descarte alimentos contaminados",
            "Documente danos para seguro"
          ]
        }
      ]
    }
  },
  {
    id: 3,
    title: "Proteção Contra Queimadas",
    category: "Prevenção",
    difficulty: "Básico",
    estimatedTime: "20 minutos",
    description: "Como proteger sua propriedade e família durante temporada de queimadas.",
    content: {
      introduction: "Queimadas podem se espalhar rapidamente. A preparação adequada é essencial para a segurança.",
      sections: [
        {
          title: "Preparação da Propriedade",
          items: [
            "Crie uma zona de defesa ao redor da casa",
            "Remova vegetação seca próxima à construção",
            "Mantenha mangueiras e água disponíveis",
            "Instale detectores de fumaça"
          ]
        },
        {
          title: "Plano de Evacuação",
          items: [
            "Identifique múltiplas rotas de saída",
            "Estabeleça ponto de encontro da família",
            "Prepare veículo com combustível",
            "Tenha contatos de emergência atualizados"
          ]
        }
      ]
    }
  },
  {
    id: 4,
    title: "Primeiros Socorros Básicos",
    category: "Emergência",
    difficulty: "Intermediário",
    estimatedTime: "45 minutos",
    description: "Técnicas essenciais de primeiros socorros para situações de emergência.",
    content: {
      introduction: "Conhecimentos básicos de primeiros socorros podem fazer a diferença entre a vida e a morte.",
      sections: [
        {
          title: "Avaliação Inicial",
          items: [
            "Verifique consciência da vítima",
            "Avalie respiração e pulso",
            "Identifique ferimentos visíveis",
            "Chame ajuda médica se necessário"
          ]
        },
        {
          title: "Procedimentos Básicos",
          items: [
            "Posição lateral de segurança",
            "Compressão para parar sangramentos",
            "RCP básico (apenas compressões)",
            "Tratamento de queimaduras leves"
          ]
        }
      ]
    }
  }
];

const Preparedness = () => {
  const [selectedGuide, setSelectedGuide] = useState<number | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Básico": return "bg-green-100 text-green-800";
      case "Intermediário": return "bg-yellow-100 text-yellow-800";
      case "Avançado": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Preparação": return "bg-blue-100 text-blue-800";
      case "Emergência": return "bg-red-100 text-red-800";
      case "Prevenção": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (selectedGuide) {
    const guide = guidesData.find(g => g.id === selectedGuide);
    if (!guide) return null;

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => setSelectedGuide(null)}
              className="mb-4"
            >
              ← Voltar aos guias
            </Button>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className={getCategoryColor(guide.category)}>{guide.category}</Badge>
                <Badge className={getDifficultyColor(guide.difficulty)}>{guide.difficulty}</Badge>
                <Badge variant="outline">{guide.estimatedTime}</Badge>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{guide.title}</h1>
              <p className="text-gray-600 mb-6">{guide.content.introduction}</p>
              
              <div className="space-y-4">
                {guide.content.sections.map((section, index) => (
                  <Collapsible
                    key={index}
                    open={expandedSection === `${guide.id}-${index}`}
                    onOpenChange={(open) => setExpandedSection(open ? `${guide.id}-${index}` : null)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between p-4 h-auto"
                      >
                        <span className="font-medium text-left">{section.title}</span>
                        <ChevronRight className={`w-4 h-4 transition-transform ${
                          expandedSection === `${guide.id}-${index}` ? 'rotate-90' : ''
                        }`} />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <ul className="space-y-2">
                          {section.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">💡 Dica Importante</h3>
                <p className="text-blue-800 text-sm">
                  Pratique regularmente os procedimentos descritos neste guia e mantenha seus suprimentos de emergência atualizados.
                </p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-red-600" />
            Guias de Preparação
          </h1>
          <p className="text-gray-600">
            Aprenda como se preparar para emergências e proteger sua família durante situações de crise.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {guidesData.map((guide) => (
            <Card key={guide.id} className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader className="pb-3">
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge className={getCategoryColor(guide.category)}>{guide.category}</Badge>
                  <Badge className={getDifficultyColor(guide.difficulty)}>{guide.difficulty}</Badge>
                </div>
                <CardTitle className="text-lg leading-tight">{guide.title}</CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  Tempo estimado: {guide.estimatedTime}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-gray-700 text-sm mb-4 flex-1">{guide.description}</p>
                <div className="space-y-2">
                  <Button 
                    className="w-full"
                    onClick={() => setSelectedGuide(guide.id)}
                  >
                    Ler Guia
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Baixar PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Números de Emergência</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">193</div>
              <div className="text-sm text-gray-600">Bombeiros</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">192</div>
              <div className="text-sm text-gray-600">SAMU</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">190</div>
              <div className="text-sm text-gray-600">Polícia</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">199</div>
              <div className="text-sm text-gray-600">Defesa Civil</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Preparedness;
