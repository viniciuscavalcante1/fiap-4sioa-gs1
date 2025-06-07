import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Calendar, ExternalLink, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  date: string;
  source: string;
  category: string;
  verified: boolean;
  url: string;
}

const fetchNews = async (): Promise<NewsItem[]> => {
  const response = await fetch("http://127.0.0.1:8000/api/news");
  if (!response.ok) {
    throw new Error("Erro ao buscar as notícias da API");
  }
  return response.json();
};

const News = () => {
  const { data: newsData = [], isLoading, isError } = useQuery<NewsItem[]>({
    queryKey: ["news"],
    queryFn: fetchNews,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Tecnologia": return "bg-blue-100 text-blue-800";
      case "Doações": return "bg-emerald-100 text-emerald-800";
      case "Meio Ambiente": return "bg-green-100 text-green-800";
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-red-600" />
            Notícias Verificadas
          </h1>
          <p className="text-gray-600">
            Últimas notícias de fontes confiáveis, sobre o meio ambiente, as crises, e tecnologia.
          </p>
        </div>

        {/* Pesquisa */}
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

        {isLoading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="h-full flex flex-col">
                <CardHeader><Skeleton className="h-5 w-3/4" /></CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <Skeleton className="h-10 w-full mb-4" />
                  <Skeleton className="h-9 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {isError && (
          <div className="text-center py-12 bg-red-50 text-red-700 rounded-lg">
            <Calendar className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Erro ao carregar as notícias</h3>
            <p>Não foi possível buscar as notícias. Tente novamente mais tarde.</p>
          </div>
        )}

        {/* Notícias */}
        {!isLoading && !isError && (
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
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <a href={news.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Ler mais
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}

            {filteredNews.length === 0 && (
              <div className="text-center py-12 col-span-1 md:col-span-2 lg:col-span-3">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">Nenhuma notícia encontrada</h3>
                <p className="text-gray-500">Tente ajustar os termos de busca.</p>
              </div>
            )}
          </div>
        )}

      </main>

      <Footer />
    </div>
  );  
};

export default News;