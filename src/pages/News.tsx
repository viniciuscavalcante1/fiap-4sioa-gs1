
import { useState } from "react";
import { Calendar, ExternalLink, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock news data
const newsData = [
  {
    id: 1,
    title: "Defesa Civil lança novo sistema de alertas por SMS",
    summary: "Sistema permitirá envio de alertas meteorológicos diretamente para celulares em áreas de risco.",
    date: "2024-06-05",
    source: "Ministério da Integração Nacional",
    category: "Tecnologia",
    verified: true,
    url: "#"
  },
  {
    id: 2,
    title: "Rio Grande do Sul recebe doações para reconstrução pós-enchentes",
    summary: "Mais de R$ 50 milhões foram arrecadados em campanhas nacionais para auxiliar famílias afetadas.",
    date: "2024-06-04",
    source: "Governo do Estado RS",
    category: "Doações",
    verified: true,
    url: "#"
  },
  {
    id: 3,
    title: "INPE registra redução de 15% nos focos de queimada na Amazônia",
    summary: "Dados mostram melhora nos índices em comparação com o mesmo período do ano anterior.",
    date: "2024-06-03",
    source: "INPE",
    category: "Meio Ambiente",
    verified: true,
    url: "#"
  },
  {
    id: 4,
    title: "Novo protocolo de evacuação em áreas de risco aprovado",
    summary: "Medida visa acelerar retirada de famílias em situações de emergência climática.",
    date: "2024-06-02",
    source: "Defesa Civil Nacional",
    category: "Prevenção",
    verified: true,
    url: "#"
  },
  {
    id: 5,
    title: "Campanha nacional de preparo para temporada de chuvas é lançada",
    summary: "Iniciativa busca conscientizar população sobre medidas preventivas durante período chuvoso.",
    date: "2024-06-01",
    source: "Ministério do Desenvolvimento Regional",
    category: "Prevenção",
    verified: true,
    url: "#"
  },
  {
    id: 6,
    title: "Aplicativo móvel conecta voluntários a organizações de socorro",
    summary: "Nova ferramenta facilita cadastro e mobilização de voluntários durante emergências.",
    date: "2024-05-31",
    source: "Cruz Vermelha Brasileira",
    category: "Tecnologia",
    verified: true,
    url: "#"
  }
];

const News = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Tecnologia": return "bg-blue-100 text-blue-800";
      case "Doações": return "bg-green-100 text-green-800";
      case "Meio Ambiente": return "bg-emerald-100 text-emerald-800";
      case "Prevenção": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredNews = newsData.filter(news =>
    news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    news.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    news.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-red-600" />
            Notícias Verificadas
          </h1>
          <p className="text-gray-600">
            Informações confiáveis sobre prevenção, resposta a emergências e políticas públicas.
          </p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar notícias por título, conteúdo ou categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* News Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map((news) => (
            <Card key={news.id} className="hover:shadow-lg transition-shadow h-full flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getCategoryColor(news.category)}>{news.category}</Badge>
                  {news.verified && (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      ✓ Verificado
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg leading-tight">{news.title}</CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  {new Date(news.date).toLocaleDateString('pt-BR')} • {news.source}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-gray-700 text-sm mb-4 flex-1">{news.summary}</p>
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Ler mais
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">Nenhuma notícia encontrada</h3>
            <p className="text-gray-500">Tente ajustar os termos de busca.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default News;
