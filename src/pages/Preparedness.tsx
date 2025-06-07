import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Download, AlertCircle, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface GuideSummary {
  id: number;
  title: string;
  category: string;
  difficulty: string;
  estimated_time: string;
  description: string;
}

interface GuideDetail extends GuideSummary {
  content_md: string;
}

const fetchGuidesSummary = async (): Promise<GuideSummary[]> => {
  const res = await fetch("http://127.0.0.1:8000/api/preparedness-guides");
  if (!res.ok) throw new Error("Erro ao buscar a lista de guias");
  return res.json();
};

const fetchGuideDetail = async (guideId: number): Promise<GuideDetail> => {
  const res = await fetch(`http://127.0.0.1:8000/api/preparedness-guides/${guideId}`);
  if (!res.ok) throw new Error("Erro ao buscar os detalhes do guia");
  return res.json();
};

const Preparedness = () => {
  const [selectedGuideId, setSelectedGuideId] = useState<number | null>(null);

  const { data: guidesData = [], isLoading: isLoadingList, isError: isErrorList } = useQuery<GuideSummary[]>({
    queryKey: ['guidesSummary'],
    queryFn: fetchGuidesSummary,
  });

  const { data: guideDetail, isLoading: isLoadingDetail, isError: isErrorDetail } = useQuery<GuideDetail>({
    queryKey: ['guideDetail', selectedGuideId],
    queryFn: () => fetchGuideDetail(selectedGuideId!),
    enabled: !!selectedGuideId,
  });

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

  if (selectedGuideId) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <Button
            variant="outline"
            onClick={() => setSelectedGuideId(null)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para todos os guias
          </Button>

          {isLoadingDetail && (
              <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm">
                  <Skeleton className="h-8 w-1/2 mb-6" />
                  <Skeleton className="h-4 w-1/4 mb-4" />
                  <Skeleton className="h-64 w-full" />
              </div>
          )}

          {isErrorDetail && (
            <div className="text-center py-12 bg-red-50 text-red-700 rounded-lg">
                <AlertCircle className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-lg font-medium">Erro ao carregar o guia.</h3>
            </div>
          )}

          {guideDetail && (
            <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className={getCategoryColor(guideDetail.category)}>{guideDetail.category}</Badge>
                <Badge className={getDifficultyColor(guideDetail.difficulty)}>{guideDetail.difficulty}</Badge>
                <Badge variant="outline">{guideDetail.estimated_time}</Badge>
              </div>

              <h1 className="text-3xl font-bold text-gray-800 mb-6">{guideDetail.title}</h1>

              <article className="prose prose-lg max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {guideDetail.content_md}
                </ReactMarkdown>
              </article>
            </div>
          )}
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-red-600" />
            Como se preparar e evitar crises
          </h1>
          <p className="text-gray-600">
            Aprenda como se preparar para emergências e proteger sua família durante situações de crise. E como evitá-las, é claro.
          </p>
        </div>

        {isLoadingList && <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{[...Array(6)].map((_, i) => <Skeleton key={i} className="h-64 w-full" />)}</div>}
        {isErrorList && <div className="text-center py-12 bg-red-50 text-red-700 rounded-lg"><AlertCircle className="w-12 h-12 mx-auto mb-4" /><h3 className="text-lg font-medium">Erro ao carregar os guias.</h3></div>}

        {!isLoadingList && !isErrorList && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {guidesData.map((guide) => (
              <Card key={guide.id} className="hover:shadow-lg transition-shadow h-full flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge className={getCategoryColor(guide.category)}>{guide.category}</Badge>
                    <Badge className={getDifficultyColor(guide.difficulty)}>{guide.difficulty}</Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">{guide.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-gray-700 text-sm mb-4 flex-1">{guide.description}</p>
                  <Button 
                    className="w-full mt-auto"
                    onClick={() => setSelectedGuideId(guide.id)}
                  >
                    Ler Guia
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

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