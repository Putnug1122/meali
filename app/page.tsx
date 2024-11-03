"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dynamic from "next/dynamic";
import { LatLngExpression } from "leaflet";
import Image from "next/image";
import Lottie from "lottie-react";
import cookingAnimation from "@/public/images/lottie.json";

const LoadingAnimation = () => {
  // Ensure the animation data is imported correctly
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: cookingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="w-64 h-64 flex items-center justify-center">
        <Lottie {...defaultOptions} style={{ width: "100%", height: "100%" }} />
      </div>
      <p className="text-lg font-medium">Sedang menyiapkan rekomendasi...</p>
    </div>
  );
};

// Mock data for provinces, districts, and sub-districts
const provinces = ["DKI Jakarta", "Jawa Barat", "Jawa Tengah"];
const districts = ["Jakarta Selatan", "Jakarta Pusat", "Jakarta Timur"];
const subDistricts = ["Kebayoran Baru", "Menteng", "Kuningan"];

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full rounded-lg bg-gray-100" />,
});

interface FoodRecommendationAIProps {
  name: string;
  ingredients: string[];
  image: string;
}

interface FoodIngredientProps {
  name: string;
  kalori: string;
  protein: string;
}

export default function FoodRecommendationAI() {
  const [step, setStep] = useState(0);
  const [budget, setBudget] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [subDistrict, setSubDistrict] = useState("");
  const [center, setCenter] = useState<LatLngExpression>([-6.2088, 106.8456]); // Jakarta coordinates
  const [radius, setRadius] = useState(2000);
  const [priceEstimate, setPriceEstimate] = useState("");
  const [recommendations, setRecommendations] = useState<
    FoodRecommendationAIProps[]
  >([]);
  const [ingredients, setIngredients] = useState<FoodIngredientProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const stepVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const handleNext = async () => {
    if (step === 3) {
      setIsLoading(true);
      setStep(4); // Move this before the timeout

      // Simulate API call with setTimeout
      setTimeout(() => {
        setIngredients([
          { name: "Ayam", kalori: "165 kcal", protein: "31g" },
          { name: "Brokoli", kalori: "31 kcal", protein: "2.5g" },
          { name: "Quinoa", kalori: "120 kcal", protein: "4.4g" },
        ]);
        setRecommendations([
          {
            name: "Ayam Panggang dengan Brokoli",
            ingredients: ["Ayam", "Brokoli", "Minyak Zaitun", "Bawang Putih"],
            image: "/images/ayam-panggang.jpg",
          },
          {
            name: "Quinoa Bowl dengan Sayuran",
            ingredients: ["Quinoa", "Brokoli", "Wortel", "Kacang Polong"],
            image: "/images/quinoa-salad-foto-resep-utama.jpg",
          },
          {
            name: "Sup Ayam dan Sayuran",
            ingredients: ["Ayam", "Brokoli", "Wortel", "Seledri"],
            image: "/images/sup.jpeg",
          },
        ]);
        setIsLoading(false);
      }, 4000);
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E4F2E5]">
      <AnimatePresence mode="wait">
        {step === 0 ? (
          <motion.div
            key="welcome"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={stepVariants}
            transition={{ duration: 0.5 }}
            className="text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex justify-center items-center"
            >
              <Image
                src="/images/dish.svg"
                width={100}
                height={100}
                alt="logo"
                className="mx-auto"
              />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-5xl font-bold tracking-tight"
            >
              Selamat Datang di Meali
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-xl text-gray-600"
            >
              Buat menu sehat di era digital
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Button
                onClick={() => setStep(1)}
                className="px-8 py-6 text-lg bg-primary"
              >
                Mulai
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <Card className="w-full max-w-4xl mx-4">
            <CardHeader>
              <CardTitle>Rekomendasi Makanan AI</CardTitle>
              <CardDescription>
                Dapatkan rekomendasi makanan berdasarkan budget dan lokasi Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <h2 className="text-lg font-semibold">
                      Langkah 1: Masukkan Budget dan Perkiraan Harga
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label
                          htmlFor="budget"
                          className="block text-sm font-medium mb-1"
                        >
                          Budget
                        </label>
                        <Input
                          id="budget"
                          type="number"
                          placeholder="Masukkan budget Anda"
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="priceEstimate"
                          className="block text-sm font-medium mb-1"
                        >
                          Perkiraan Harga
                        </label>
                        <Input
                          id="priceEstimate"
                          type="number"
                          placeholder="Masukkan perkiraan harga"
                          value={priceEstimate}
                          onChange={(e) => setPriceEstimate(e.target.value)}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <h2 className="text-lg font-semibold">
                      Langkah 2: Pilih Lokasi Anda
                    </h2>
                    <Select onValueChange={setProvince}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Provinsi" />
                      </SelectTrigger>
                      <SelectContent>
                        {provinces.map((p) => (
                          <SelectItem key={p} value={p}>
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select onValueChange={setDistrict}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Kota/Kabupaten" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((d) => (
                          <SelectItem key={d} value={d}>
                            {d}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select onValueChange={setSubDistrict}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Kecamatan" />
                      </SelectTrigger>
                      <SelectContent>
                        {subDistricts.map((sd) => (
                          <SelectItem key={sd} value={sd}>
                            {sd}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <MapComponent
                      center={center}
                      radius={radius}
                      setCenter={setCenter}
                    />
                    <div>
                      <label
                        htmlFor="radius"
                        className="block text-sm font-medium mb-1"
                      >
                        Radius Area
                      </label>
                      <div className="flex items-center">
                        <Input
                          id="radius"
                          type="number"
                          placeholder="Masukkan radius"
                          value={radius}
                          onChange={(e) => setRadius(Number(e.target.value))}
                          className="flex-grow"
                        />
                        <span className="ml-2 text-sm text-gray-500">
                          meter
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <h2 className="text-lg font-semibold">
                      Langkah 3: Konfirmasi Pilihan Anda
                    </h2>
                    <div className="space-y-2">
                      <p>
                        <strong>Budget:</strong> Rp {budget}
                      </p>
                      <p>
                        <strong>Perkiraan Harga:</strong> Rp {priceEstimate}
                      </p>
                      <p>
                        <strong>Lokasi:</strong> {province}, {district},{" "}
                        {subDistrict}
                      </p>
                      <p>
                        <strong>Radius:</strong> {radius} meter
                      </p>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {isLoading ? (
                      <LoadingAnimation />
                    ) : (
                      <>
                        <h2 className="text-lg font-semibold">
                          Langkah 4: Rekomendasi
                        </h2>
                        <div>
                          <h3 className="text-md  font-semibold mb-2">
                            Top 3 Bahan Makanan Rekomendasi
                          </h3>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Nama Bahan</TableHead>
                                <TableHead>Kalori</TableHead>
                                <TableHead>Protein</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {ingredients.map((ingredient, index) => (
                                <TableRow key={index}>
                                  <TableCell>{ingredient.name}</TableCell>
                                  <TableCell>{ingredient.kalori}</TableCell>
                                  <TableCell>{ingredient.protein}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                        <div>
                          <h3 className="text-md font-semibold mb-2">
                            Top 3 Rekomendasi Resep
                          </h3>
                          <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                          >
                            {recommendations.map((recipe, index) => (
                              <AccordionItem
                                value={`item-${index}`}
                                key={index}
                              >
                                <AccordionTrigger>
                                  {recipe.name}
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="flex flex-col md:flex-row gap-4">
                                    <Image
                                      src={recipe.image}
                                      alt={recipe.name}
                                      width={300}
                                      height={200}
                                      className="rounded-md object-cover"
                                    />
                                    <div>
                                      <h3 className="font-medium mb-2">
                                        Bahan-bahan:
                                      </h3>
                                      <ul className="list-disc list-inside">
                                        {recipe.ingredients.map(
                                          (ingredient, idx) => (
                                            <li key={idx}>{ingredient}</li>
                                          )
                                        )}
                                      </ul>
                                    </div>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
            <CardFooter className="flex justify-between">
              {step > 1 && (
                <Button onClick={() => setStep(step - 1)}>Kembali</Button>
              )}
              {step < 4 ? (
                <Button onClick={handleNext}>Lanjut</Button>
              ) : (
                <Button onClick={() => setStep(0)}>Mulai Ulang</Button>
              )}
            </CardFooter>
          </Card>
        )}
      </AnimatePresence>
    </div>
  );
}
