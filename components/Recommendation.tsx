import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NutritionItem {
  name: string;
  category: string;
  energy: number;
  protein: number;
  fat: number;
  iron: number;
  vitaminA: number;
  cost: number;
}

interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
}

const DailyMenuRecommendations = () => {
  const nutritionData: NutritionItem[] = [
    {
      name: "Nasi",
      category: "Makanan Pokok",
      energy: 130,
      protein: 2.7,
      fat: 0.3,
      iron: 0.2,
      vitaminA: 0,
      cost: 2000,
    },
    {
      name: "Bayam",
      category: "Sayuran",
      energy: 23,
      protein: 2.9,
      fat: 0.4,
      iron: 2.7,
      vitaminA: 469,
      cost: 1500,
    },
    {
      name: "Telur",
      category: "Hewani",
      energy: 155,
      protein: 13,
      fat: 11,
      iron: 1.2,
      vitaminA: 98,
      cost: 3000,
    },
  ];

  const recipes: Recipe[] = [
    {
      title: "Nasi Bayam Telur Orak-arik",
      ingredients: [
        "1 porsi nasi (130 kcal)",
        "50 gram bayam, cincang kasar",
        "1 butir telur ayam",
        "1 siung bawang putih, cincang halus",
        "1 sdm minyak goreng",
        "Garam dan lada secukupnya",
      ],
      instructions: [
        "Panaskan minyak di wajan, tumis bawang putih hingga harum.",
        "Masukkan bayam, tumis hingga layu.",
        "Pecahkan telur, orak-arik hingga matang bersama bayam.",
        "Tambahkan nasi, garam, dan lada, aduk hingga rata dan panas.",
        "Sajikan hangat.",
      ],
    },
    {
      title: "Sup Bayam Telur",
      ingredients: [
        "50 gram bayam",
        "1 butir telur",
        "2 siung bawang putih",
        "500ml kaldu ayam",
        "Garam dan merica",
      ],
      instructions: [
        "Tumis bawang putih hingga harum",
        "Tambahkan kaldu, didihkan",
        "Masukkan bayam dan telur",
        "Bumbui dengan garam dan merica",
        "Sajikan hangat",
      ],
    },
    {
      title: "Telur Dadar Bayam",
      ingredients: [
        "2 butir telur",
        "30 gram bayam cincang",
        "Garam dan merica",
        "2 sdm minyak goreng",
      ],
      instructions: [
        "Kocok telur dengan bumbu",
        "Campurkan bayam cincang",
        "Goreng hingga matang",
        "Sajikan",
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Select defaultValue="hari-ke-1">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Pilih Hari" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hari-ke-1">Hari ke-1</SelectItem>
            <SelectItem value="hari-ke-2">Hari ke-2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tabel Nutrisi</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bahan Pangan</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Energy (kcal)</TableHead>
                <TableHead>Protein (g)</TableHead>
                <TableHead>Fat (g)</TableHead>
                <TableHead>Iron (mg)</TableHead>
                <TableHead>Vitamin A (μg)</TableHead>
                <TableHead>Estimasi Biaya (Rp)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nutritionData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.energy}</TableCell>
                  <TableCell>{item.protein}</TableCell>
                  <TableCell>{item.fat}</TableCell>
                  <TableCell>{item.iron}</TableCell>
                  <TableCell>{item.vitaminA}</TableCell>
                  <TableCell>{item.cost.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Alert>
        <AlertDescription>
          <div className="space-y-2">
            <p>Catatan Cuaca Terkini di Kudus:</p>
            <ul className="list-disc pl-6">
              <li>Tanggal: Minggu, 3 November 2024</li>
              <li>Prakiraan Cuaca: Badai petir di beberapa bagian area ini</li>
              <li>Suhu: Maksimum 30°C, Minimum 25°C</li>
            </ul>
          </div>
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Rekomendasi Resep</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="resep1">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="resep1">Resep 1</TabsTrigger>
              <TabsTrigger value="resep2">Resep 2</TabsTrigger>
              <TabsTrigger value="resep3">Resep 3</TabsTrigger>
            </TabsList>
            {recipes.map((recipe, index) => (
              <TabsContent key={index} value={`resep${index + 1}`}>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">{recipe.title}</h3>
                  <div>
                    <h4 className="font-medium mb-2">Bahan-bahan:</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      {recipe.ingredients.map((ingredient, idx) => (
                        <li key={idx}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Cara Memasak:</h4>
                    <ol className="list-decimal pl-6 space-y-1">
                      {recipe.instructions.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyMenuRecommendations;
